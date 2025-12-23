module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/supabase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://qvqsobnykfouvqfspkqs.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2cXNvYm55a2ZvdXZxZnNwa3FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwODI3MDEsImV4cCI6MjA3OTY1ODcwMX0.3Vnk707KgvhCbLDmFYEVr2j3WnYdq6qLAshVOL0CEmQ"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // The "setAll" method was called from a Server Component.
                }
            }
        }
    });
}
}),
"[project]/app/api/leads/generate/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const { category = "restaurant", location, searchMode = "random", excludePlaceIds = [] } = await request.json();
        if (!location || !location.trim()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Location is required"
            }, {
                status: 400
            });
        }
        const geoapifyKey = process.env.GEOAPIFY_API_KEY;
        if (!geoapifyKey) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "GEOAPIFY_API_KEY is not configured"
            }, {
                status: 500
            });
        }
        const rapidapiKey = process.env.RAPIDAPI_LOCAL_BUSINESS_KEY || "";
        const scraperbeeKey = process.env.SCRAPERBEE_API_KEY || "";
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const categoryMap = {
            restaurant: "catering.restaurant",
            cafe: "catering.cafe",
            hotel: "accommodation.hotel",
            hospital: "healthcare.hospital",
            school: "education.school",
            supermarket: "commercial.supermarket",
            bank: "service.bank",
            pharmacy: "healthcare.pharmacy",
            gym: "sport.fitness",
            bar: "catering.bar"
        };
        const geoapifyCategory = categoryMap[category] || category;
        const geocodeUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&apiKey=${geoapifyKey}`;
        const geocodeResponse = await fetch(geocodeUrl);
        if (!geocodeResponse.ok) {
            throw new Error(`Geocoding failed: ${geocodeResponse.status}`);
        }
        const geocodeData = await geocodeResponse.json();
        if (!geocodeData.features || geocodeData.features.length === 0) {
            throw new Error("Location not found. Please try a different location.");
        }
        const coords = geocodeData.features[0].geometry.coordinates;
        let lon = coords[0];
        let lat = coords[1];
        let radius = 5000;
        let offset = 0;
        if (searchMode === "random") {
            radius = Math.floor(Math.random() * (8000 - 3000 + 1)) + 3000;
            const possibleOffsets = [
                0,
                10,
                20,
                30,
                40
            ];
            offset = possibleOffsets[Math.floor(Math.random() * possibleOffsets.length)];
            const shift = 0.01;
            lon += (Math.random() - 0.5) * shift;
            lat += (Math.random() - 0.5) * shift;
        } else if (searchMode === "explore") {
            const shift = 0.03;
            lon += (Math.random() - 0.5) * shift;
            lat += (Math.random() - 0.5) * shift;
            radius = 7000;
        }
        const placesUrl = `https://api.geoapify.com/v2/places?categories=${geoapifyCategory}&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&limit=20&offset=${offset}&apiKey=${geoapifyKey}`;
        const placesResponse = await fetch(placesUrl);
        if (!placesResponse.ok) {
            throw new Error(`Geoapify search failed: ${placesResponse.status}`);
        }
        const placesData = await placesResponse.json();
        if (!placesData.features || placesData.features.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                places: [],
                leadsCreated: 0
            });
        }
        let places = [
            ...placesData.features
        ];
        if (searchMode !== "nearest" && excludePlaceIds && excludePlaceIds.length > 0) {
            const excludeSet = new Set(excludePlaceIds);
            places = places.filter((place)=>!excludeSet.has(place.properties.place_id));
        }
        if (searchMode !== "nearest") {
            for(let i = places.length - 1; i > 0; i--){
                const j = Math.floor(Math.random() * (i + 1));
                [places[i], places[j]] = [
                    places[j],
                    places[i]
                ];
            }
        }
        places = places.slice(0, 10);
        const detailedPlaces = [];
        for (const place of places){
            const placeId = place.properties.place_id;
            const placeName = place.properties.name || "Unnamed Place";
            const detailsUrl = `https://api.geoapify.com/v2/place-details?id=${placeId}&apiKey=${geoapifyKey}`;
            const detailsResponse = await fetch(detailsUrl);
            const detailsData = await detailsResponse.json();
            const geoapifyContact = detailsData.features?.[0]?.properties?.datasource?.raw || {};
            const finalContact = {
                ...geoapifyContact
            };
            const sources = [
                "geoapify"
            ];
            const hasPhone = finalContact.phone;
            const hasEmail = finalContact.email;
            const hasWebsite = finalContact.website;
            if ((!hasPhone || !hasEmail) && rapidapiKey) {
                try {
                    const query = `${placeName} ${location}`;
                    const rapidUrl = `https://local-business-data.p.rapidapi.com/search?query=${encodeURIComponent(query)}&lat=${lat}&lng=${lon}&limit=1&language=en&extract_emails_and_contacts=true`;
                    const rapidResponse = await fetch(rapidUrl, {
                        method: "GET",
                        headers: {
                            "x-rapidapi-host": "local-business-data.p.rapidapi.com",
                            "x-rapidapi-key": rapidapiKey
                        }
                    });
                    if (rapidResponse.ok) {
                        const rapidData = await rapidResponse.json();
                        if (rapidData.data && rapidData.data.length > 0) {
                            const rapidPlace = rapidData.data[0];
                            if (!hasPhone && rapidPlace.phone_number) {
                                finalContact.phone = rapidPlace.phone_number;
                                sources.push("rapidapi");
                            }
                            if (!hasEmail && rapidPlace.email) {
                                finalContact.email = rapidPlace.email;
                                sources.push("rapidapi");
                            }
                            if (!hasWebsite && rapidPlace.website) {
                                finalContact.website = rapidPlace.website;
                                sources.push("rapidapi");
                            }
                        }
                    }
                } catch (rapidError) {
                    console.error("RapidAPI error:", rapidError);
                }
            }
            const needsScraping = (!finalContact.phone || !finalContact.email) && finalContact.website && scraperbeeKey;
            if (needsScraping) {
                try {
                    const scraperbeeUrl = `https://app.scrapingbee.com/api/v1/?api_key=${scraperbeeKey}&url=${encodeURIComponent(finalContact.website)}&ai_query=${encodeURIComponent("Extract all contact information including email addresses, phone numbers, WhatsApp numbers, and social media links (Facebook, Instagram, Twitter, LinkedIn)")}&render_js=false`;
                    const scraperbeeResponse = await fetch(scraperbeeUrl);
                    console.log("ScraperBee status:", scraperbeeResponse.status);
                    if (scraperbeeResponse.ok) {
                        const html = await scraperbeeResponse.text();
                        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
                        const emails = html.match(emailRegex);
                        const phoneRegex = /[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}/g;
                        const phones = html.match(phoneRegex);
                        const socialRegex = {
                            facebook: /(?:https?:\/\/)?(?:www\.)?facebook\.com\/[a-zA-Z0-9.]+/g,
                            instagram: /(?:https?:\/\/)?(?:www\.)?instagram\.com\/[a-zA-Z0-9._]+/g,
                            twitter: /(?:https?:\/\/)?(?:www\.)?(?:twitter|x)\.com\/[a-zA-Z0-9_]+/g,
                            linkedin: /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:company|in)\/[a-zA-Z0-9-]+/g
                        };
                        const social = {};
                        for (const [platform, regex] of Object.entries(socialRegex)){
                            const matches = html.match(regex);
                            if (matches && matches.length > 0) {
                                social[platform] = matches[0];
                            }
                        }
                        if (!finalContact.email && emails && emails.length > 0) {
                            finalContact.email = emails[0];
                            sources.push("scraperbee");
                        }
                        if (!finalContact.phone && phones && phones.length > 0) {
                            finalContact.phone = phones[0];
                            sources.push("scraperbee");
                        }
                        if (Object.keys(social).length > 0) {
                            ;
                            finalContact.social = social;
                            if (!sources.includes("scraperbee")) sources.push("scraperbee");
                        }
                    }
                } catch (scraperbeeError) {
                    console.error("ScraperBee error:", scraperbeeError);
                }
            }
            const placeData = {
                placeId,
                name: placeName,
                address: place.properties.formatted || "No address",
                category: place.properties.categories?.join(", ") || geoapifyCategory,
                contact: finalContact,
                sources: Array.from(new Set(sources))
            };
            detailedPlaces.push(placeData);
        }
        const leadsToInsert = detailedPlaces.map((place)=>({
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
                    sources: place.sources
                }
            }));
        let insertError = null;
        if (leadsToInsert.length > 0) {
            const { error } = await supabase.from("leads").insert(leadsToInsert);
            if (error) {
                console.error("Error inserting leads:", error);
                insertError = error.message;
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            places: detailedPlaces,
            leadsCreated: leadsToInsert.length,
            insertError
        });
    } catch (error) {
        console.error("Lead generation error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message ?? "Failed to generate leads"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d2d1b249._.js.map