import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { PLANS } from "@/lib/plans"

interface GenerateRequestBody {
  category?: string
  location?: string
  searchMode?: "random" | "nearest" | "explore"
  excludePlaceIds?: string[]
}

export async function POST(request: NextRequest) {
  try {
    const { category = "restaurant", location, searchMode = "random", excludePlaceIds = [] } =
      (await request.json()) as GenerateRequestBody

    if (!location || !location.trim()) {
      return NextResponse.json({ error: "Location is required" }, { status: 400 })
    }

    const geoapifyKey = process.env.GEOAPIFY_API_KEY
    if (!geoapifyKey) {
      return NextResponse.json({ error: "GEOAPIFY_API_KEY is not configured" }, { status: 500 })
    }

    const rapidapiKey = process.env.RAPIDAPI_LOCAL_BUSINESS_KEY || ""
    const scraperbeeKey = process.env.SCRAPERBEE_API_KEY || ""

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: profile } = await supabase.from("profiles").select("subscription_plan").eq("id", user.id).single()

    const currentPlan = PLANS.find((p) => p.id === profile?.subscription_plan) || PLANS[0]

    if (currentPlan.leadLimit !== null) {
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
      const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString()

      const { data: monthlyLeads, error: leadsError } = await supabase
        .from("leads")
        .select("id, created_at", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("created_at", startOfMonth)
        .lt("created_at", startOfNextMonth)

      if (leadsError) {
        console.error("Error counting monthly leads:", leadsError)
        return NextResponse.json({ error: "Failed to check lead quota" }, { status: 500 })
      }

      const usedThisMonth = (monthlyLeads as any)?.length ?? (monthlyLeads as any)?.count ?? 0

      if (usedThisMonth >= currentPlan.leadLimit) {
        return NextResponse.json(
          {
            error: "Lead limit reached",
            message: `You have reached your monthly lead limit of ${currentPlan.leadLimit} leads for the ${currentPlan.name} plan. Consider upgrading your plan to generate more leads.",
          },
          { status: 403 },
        )
      }
    }

    const categoryMap: Record<string, string> = {
      restaurant: "catering.restaurant",
      cafe: "catering.cafe",
      hotel: "accommodation.hotel",
      hospital: "healthcare.hospital",
      school: "education.school",
      supermarket: "commercial.supermarket",
      bank: "service.bank",
      pharmacy: "healthcare.pharmacy",
      gym: "sport.fitness",
      bar: "catering.bar",
    }

    const geoapifyCategory = categoryMap[category] || category

    const geocodeUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&apiKey=${geoapifyKey}`
    const geocodeResponse = await fetch(geocodeUrl)

    if (!geocodeResponse.ok) {
      throw new Error(`Geocoding failed: ${geocodeResponse.status}`)
    }

    const geocodeData: any = await geocodeResponse.json()

    if (!geocodeData.features || geocodeData.features.length === 0) {
      throw new Error("Location not found. Please try a different location.")
    }

    const coords = geocodeData.features[0].geometry.coordinates
    let lon = coords[0]
    let lat = coords[1]

    let radius = 5000
    let offset = 0

    if (searchMode === "random") {
      radius = Math.floor(Math.random() * (8000 - 3000 + 1)) + 3000

      const possibleOffsets = [0, 10, 20, 30, 40]
      offset = possibleOffsets[Math.floor(Math.random() * possibleOffsets.length)]

      const shift = 0.01
      lon += (Math.random() - 0.5) * shift
      lat += (Math.random() - 0.5) * shift
    } else if (searchMode === "explore") {
      const shift = 0.03
      lon += (Math.random() - 0.5) * shift
      lat += (Math.random() - 0.5) * shift
      radius = 7000
    }

    const placesUrl = `https://api.geoapify.com/v2/places?categories=${geoapifyCategory}&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&limit=20&offset=${offset}&apiKey=${geoapifyKey}`
    const placesResponse = await fetch(placesUrl)

    if (!placesResponse.ok) {
      throw new Error(`Geoapify search failed: ${placesResponse.status}`)
    }

    const placesData: any = await placesResponse.json()

    if (!placesData.features || placesData.features.length === 0) {
      return NextResponse.json({ places: [], leadsCreated: 0 })
    }

    let places: any[] = [...placesData.features]

    if (searchMode !== "nearest" && excludePlaceIds && excludePlaceIds.length > 0) {
      const excludeSet = new Set(excludePlaceIds)
      places = places.filter((place) => !excludeSet.has(place.properties.place_id))
    }

    if (searchMode !== "nearest") {
      for (let i = places.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[places[i], places[j]] = [places[j], places[i]]
      }
    }

    places = places.slice(0, 10)

    const detailedPlaces: any[] = []

    for (const place of places) {
      const placeId = place.properties.place_id
      const placeName = place.properties.name || "Unnamed Place"

      const detailsUrl = `https://api.geoapify.com/v2/place-details?id=${placeId}&apiKey=${geoapifyKey}`
      const detailsResponse = await fetch(detailsUrl)
      const detailsData: any = await detailsResponse.json()

      const geoapifyContact = detailsData.features?.[0]?.properties?.datasource?.raw || {}
      const finalContact: any = { ...geoapifyContact }
      const sources: string[] = ["geoapify"]

      const hasPhone = finalContact.phone
      const hasEmail = finalContact.email
      const hasWebsite = finalContact.website

      if ((!hasPhone || !hasEmail) && rapidapiKey) {
        try {
          const query = `${placeName} ${location}`
          const rapidUrl = `https://local-business-data.p.rapidapi.com/search?query=${encodeURIComponent(
            query,
          )}&lat=${lat}&lng=${lon}&limit=1&language=en&extract_emails_and_contacts=true`

          const rapidResponse = await fetch(rapidUrl, {
            method: "GET",
            headers: {
              "x-rapidapi-host": "local-business-data.p.rapidapi.com",
              "x-rapidapi-key": rapidapiKey,
            },
          })

          if (rapidResponse.ok) {
            const rapidData: any = await rapidResponse.json()

            if (rapidData.data && rapidData.data.length > 0) {
              const rapidPlace = rapidData.data[0]

              if (!hasPhone && rapidPlace.phone_number) {
                finalContact.phone = rapidPlace.phone_number
                sources.push("rapidapi")
              }
              if (!hasEmail && rapidPlace.email) {
                finalContact.email = rapidPlace.email
                sources.push("rapidapi")
              }
              if (!hasWebsite && rapidPlace.website) {
                finalContact.website = rapidPlace.website
                sources.push("rapidapi")
              }
            }
          }
        } catch (rapidError) {
          console.error("RapidAPI error:", rapidError)
        }
      }

      const needsScraping = (!finalContact.phone || !finalContact.email) && finalContact.website && scraperbeeKey

      if (needsScraping) {
        try {
          const scraperbeeUrl = `https://app.scrapingbee.com/api/v1/?api_key=${scraperbeeKey}&url=${encodeURIComponent(
            finalContact.website,
          )}&ai_query=${encodeURIComponent(
            "Extract all contact information including email addresses, phone numbers, WhatsApp numbers, and social media links (Facebook, Instagram, Twitter, LinkedIn)",
          )}&render_js=false`

          const scraperbeeResponse = await fetch(scraperbeeUrl)

          console.log("ScraperBee status:", scraperbeeResponse.status)

          if (scraperbeeResponse.ok) {
            const html = await scraperbeeResponse.text()

            const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g
            const emails = html.match(emailRegex)

            const phoneRegex = /[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}/g
            const phones = html.match(phoneRegex)

            const socialRegex: Record<string, RegExp> = {
              facebook: /(?:https?:\/\/)?(?:www\.)?facebook\.com\/[a-zA-Z0-9.]+/g,
              instagram: /(?:https?:\/\/)?(?:www\.)?instagram\.com\/[a-zA-Z0-9._]+/g,
              twitter: /(?:https?:\/\/)?(?:www\.)?(?:twitter|x)\.com\/[a-zA-Z0-9_]+/g,
              linkedin: /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:company|in)\/[a-zA-Z0-9-]+/g,
            }

            const social: Record<string, string> = {}
            for (const [platform, regex] of Object.entries(socialRegex)) {
              const matches = html.match(regex)
              if (matches && matches.length > 0) {
                social[platform] = matches[0]
              }
            }

            if (!finalContact.email && emails && emails.length > 0) {
              finalContact.email = emails[0]
              sources.push("scraperbee")
            }

            if (!finalContact.phone && phones && phones.length > 0) {
              finalContact.phone = phones[0]
              sources.push("scraperbee")
            }

            if (Object.keys(social).length > 0) {
              ;(finalContact as any).social = social
              if (!sources.includes("scraperbee")) sources.push("scraperbee")
            }
          }
        } catch (scraperbeeError) {
          console.error("ScraperBee error:", scraperbeeError)
        }
      }

      const placeData = {
        placeId,
        name: placeName,
        address: place.properties.formatted || "No address",
        category: place.properties.categories?.join(", ") || geoapifyCategory,
        contact: finalContact,
        sources: Array.from(new Set(sources)),
      }

      detailedPlaces.push(placeData)
    }

    let leadsToInsert = detailedPlaces.map((place) => ({
      user_id: user.id,
      name: place.name,
      email: place.contact.email || null,
      phone: place.contact.phone || null,
      source: place.sources.join(","),
      status: "new",
      notes: null,
      metadata: {
        address: place.address,
        category: place.category,
        contact: place.contact,
        sources: place.sources,
      },
    }))

    let insertError: string | null = null

    if (currentPlan.leadLimit !== null && leadsToInsert.length > 0) {
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
      const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString()

      const { count } = await supabase
        .from("leads")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("created_at", startOfMonth)
        .lt("created_at", startOfNextMonth)

      const usedThisMonth = count || 0
      const remaining = Math.max(0, currentPlan.leadLimit - usedThisMonth)

      if (remaining <= 0) {
        return NextResponse.json(
          {
            error: "Lead limit reached",
            message: `You have reached your monthly lead limit of ${currentPlan.leadLimit} leads for the ${currentPlan.name} plan. Consider upgrading your plan to generate more leads.",
          },
          { status: 403 },
        )
      }

      if (leadsToInsert.length > remaining) {
        leadsToInsert = leadsToInsert.slice(0, remaining)
      }
    }

    if (leadsToInsert.length > 0) {
      const { error } = await supabase.from("leads").insert(leadsToInsert)
      if (error) {
        console.error("Error inserting leads:", error)
        insertError = error.message
      }
    }

    return NextResponse.json({ places: detailedPlaces, leadsCreated: leadsToInsert.length, insertError })
  } catch (error: any) {
    console.error("Lead generation error:", error)
    return NextResponse.json({ error: error.message ?? "Failed to generate leads" }, { status: 500 })
  }
}
