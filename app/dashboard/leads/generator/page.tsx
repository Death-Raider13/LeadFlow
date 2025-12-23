"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface GeneratedPlace {
  placeId?: string
  name: string
  address: string
  category: string
  contact: {
    phone?: string
    email?: string
    website?: string
    social?: {
      facebook?: string
      instagram?: string
      twitter?: string
      linkedin?: string
    }
    [key: string]: any
  }
  sources: string[]
}

export default function LeadGeneratorPage() {
  const [category, setCategory] = useState("restaurant")
  const [location, setLocation] = useState("Lagos, Nigeria")
  const [searchMode, setSearchMode] = useState<"random" | "nearest" | "explore">("random")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<GeneratedPlace[]>([])
  const [leadsCreated, setLeadsCreated] = useState<number | null>(null)
  const [seenPlaceIds, setSeenPlaceIds] = useState<string[]>([])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResults([])
    setLeadsCreated(null)

    try {
      const response = await fetch("/api/leads/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, location, searchMode, excludePlaceIds: seenPlaceIds }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to generate leads")
        return
      }
      const newResults: GeneratedPlace[] = data.places || []

      setResults(newResults)
      if (searchMode !== "nearest") {
        setSeenPlaceIds((prev) => {
          const set = new Set(prev)
          for (const place of newResults) {
            if (place.placeId) {
              set.add(place.placeId)
            }
          }
          return Array.from(set)
        })
      }
      setLeadsCreated(typeof data.leadsCreated === "number" ? data.leadsCreated : null)
      if (data.insertError) {
        setError(data.insertError)
      }
    } catch (err: any) {
      setError(err.message || "Failed to generate leads")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearHistory = () => {
    setSeenPlaceIds([])
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Lead Generator</h1>
        <p className="text-muted-foreground">Find businesses by category and location and save them as leads.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="category">
                  Category
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">Restaurants</SelectItem>
                    <SelectItem value="cafe">Cafes</SelectItem>
                    <SelectItem value="hotel">Hotels</SelectItem>
                    <SelectItem value="hospital">Hospitals</SelectItem>
                    <SelectItem value="school">Schools</SelectItem>
                    <SelectItem value="supermarket">Supermarkets</SelectItem>
                    <SelectItem value="bank">Banks</SelectItem>
                    <SelectItem value="pharmacy">Pharmacies</SelectItem>
                    <SelectItem value="gym">Gyms</SelectItem>
                    <SelectItem value="bar">Bars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="location">
                  Location
                </label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Lagos, Nigeria"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="searchMode">
                  Search Variety Mode
                </label>
                <Select value={searchMode} onValueChange={(value) => setSearchMode(value as typeof searchMode)}>
                  <SelectTrigger id="searchMode">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="random">Random Results (Different Each Time)</SelectItem>
                    <SelectItem value="nearest">Nearest First (Consistent)</SelectItem>
                    <SelectItem value="explore">Explore Mode (Random Area)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Random/Explore avoid repeating seen places until you clear history.
                </p>
              </div>
              <div className="space-y-2 text-right">
                <Button type="button" variant="outline" onClick={handleClearHistory} className="w-full sm:w-auto">
                  🔄 Clear Seen Places History
                </Button>
                {seenPlaceIds.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {seenPlaceIds.length} business{seenPlaceIds.length === 1 ? "" : "es"} remembered (won&apos;t show again)
                  </p>
                )}
              </div>
            </div>

            {error && <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</p>}

            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? "Searching..." : "Search & Save Leads"}
            </Button>

            {leadsCreated !== null && (
              <p className="text-sm text-muted-foreground mt-2">
                {leadsCreated} lead{leadsCreated === 1 ? "" : "s"} saved to your account.
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Results</h2>
            <div className="space-y-4">
              {results.map((place, index) => {
                const hasContact =
                  place.contact?.phone || place.contact?.email || place.contact?.website || place.contact?.social

                return (
                  <div key={`${place.name}-${index}`} className="border rounded-lg p-4 space-y-2">
                    <div className="text-sm text-muted-foreground mb-1">
                      {place.sources.map((s) => (
                        <span key={s} className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs mr-1">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="font-semibold">
                      {index + 1}. {place.name}
                    </div>
                    <div className="text-sm text-muted-foreground">{place.address}</div>
                    <div className="text-xs text-muted-foreground">Category: {place.category}</div>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Contact:</span>{" "}
                      {hasContact ? (
                        <div className="mt-1 space-y-1">
                          {place.contact.phone && <div>📞 {place.contact.phone}</div>}
                          {place.contact.email && <div>📧 {place.contact.email}</div>}
                          {place.contact.website && (
                            <div>
                              🌐 <a href={place.contact.website} target="_blank" rel="noreferrer" className="underline">
                                {place.contact.website}
                              </a>
                            </div>
                          )}
                          {place.contact.social?.facebook && (
                            <div>
                              📘 <a href={place.contact.social.facebook} target="_blank" rel="noreferrer" className="underline">
                                Facebook
                              </a>
                            </div>
                          )}
                          {place.contact.social?.instagram && (
                            <div>
                              📷 <a href={place.contact.social.instagram} target="_blank" rel="noreferrer" className="underline">
                                Instagram
                              </a>
                            </div>
                          )}
                          {place.contact.social?.twitter && (
                            <div>
                              🐦 <a href={place.contact.social.twitter} target="_blank" rel="noreferrer" className="underline">
                                Twitter
                              </a>
                            </div>
                          )}
                          {place.contact.social?.linkedin && (
                            <div>
                              💼 <a href={place.contact.social.linkedin} target="_blank" rel="noreferrer" className="underline">
                                LinkedIn
                              </a>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="italic text-muted-foreground">No contact information available</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
