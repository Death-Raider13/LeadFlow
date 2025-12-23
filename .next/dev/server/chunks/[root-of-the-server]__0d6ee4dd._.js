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
"[project]/lib/plans.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PLANS",
    ()=>PLANS
]);
const PLANS = [
    {
        id: "free",
        name: "Free",
        description: "Perfect for getting started",
        priceMonthly: 0,
        priceYearly: 0,
        emailCredits: 50,
        smsCredits: 20,
        leadLimit: 100,
        features: [
            "Up to 100 leads/month",
            "50 emails/month",
            "20 WhatsApp messages/month",
            "Basic analytics",
            "Lead capture forms"
        ]
    },
    {
        id: "starter",
        name: "Starter",
        description: "For growing businesses",
        // NGN 5,000/month, yearly with ~20% discount (12 * 5000 * 0.8 = 48,000)
        priceMonthly: 5000,
        priceYearly: 48000,
        emailCredits: 300,
        smsCredits: 150,
        leadLimit: 1000,
        paystackPlanCodes: {
            monthly: "PLN_0qpdsze9g1wyx8n",
            yearly: "PLN_zom6by8dep9kce3"
        },
        features: [
            "Up to 1,000 leads/month",
            "300 emails/month",
            "150 WhatsApp messages/month",
            "Advanced analytics",
            "CSV import/export",
            "Email templates"
        ]
    },
    {
        id: "pro",
        name: "Pro",
        description: "For scaling teams",
        // NGN 10,000/month, yearly with ~20% discount (12 * 10000 * 0.8 = 96,000)
        priceMonthly: 10000,
        priceYearly: 96000,
        emailCredits: 500,
        smsCredits: 500,
        leadLimit: null,
        paystackPlanCodes: {
            monthly: "PLN_wzel3treojqbl04",
            yearly: "PLN_1ezppnexsor12t2"
        },
        highlighted: true,
        features: [
            "Unlimited leads generation",
            "500 emails/month",
            "500 WhatsApp messages/month",
            "Priority support",
            "Custom branding",
            "API access",
            "Team collaboration"
        ]
    }
];
}),
"[project]/app/api/stripe/create-checkout/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plans$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/plans.ts [app-route] (ecmascript)");
;
;
;
function getBaseUrl(request) {
    // Try origin header first
    const origin = request.headers.get("origin");
    if (origin && origin.startsWith("http")) {
        return origin;
    }
    // Try host header with protocol detection
    const host = request.headers.get("host");
    const protocol = request.headers.get("x-forwarded-proto") || "https";
    if (host) {
        return `${protocol}://${host}`;
    }
    // Fallback to referer
    const referer = request.headers.get("referer");
    if (referer) {
        const url = new URL(referer);
        return url.origin;
    }
    // Last resort fallback
    return "https://localhost:3000";
}
async function POST(request) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const { planId, billingCycle, email } = await request.json();
        const plan = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plans$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PLANS"].find((p)=>p.id === planId);
        if (!plan || plan.id === "free") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid plan"
            }, {
                status: 400
            });
        }
        const baseUrl = getBaseUrl(request);
        const amount = (billingCycle === "yearly" ? plan.priceYearly : plan.priceMonthly) * 100;
        const planCode = billingCycle === "yearly" ? plan.paystackPlanCodes?.yearly : plan.paystackPlanCodes?.monthly;
        const secretKey = process.env.PAYSTACK_SECRET_KEY;
        if (!secretKey) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "PAYSTACK_SECRET_KEY is not configured"
            }, {
                status: 500
            });
        }
        const payload = {
            email,
            amount,
            currency: "NGN",
            callback_url: `${baseUrl}/dashboard/billing`,
            metadata: {
                userId: user.id,
                planId: plan.id,
                billingCycle
            }
        };
        if (planCode) {
            payload.plan = planCode;
        }
        const initializeResponse = await fetch("https://api.paystack.co/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${secretKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        if (!initializeResponse.ok) {
            const errorText = await initializeResponse.text();
            console.error("Paystack initialize error:", errorText);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Failed to create checkout session"
            }, {
                status: 500
            });
        }
        const initializeData = await initializeResponse.json();
        if (!initializeData.status || !initializeData.data?.authorization_url) {
            console.error("Paystack initialize response error:", initializeData);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Failed to create checkout session"
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            url: initializeData.data.authorization_url
        });
    } catch (error) {
        console.error("Paystack checkout error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to create checkout session"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0d6ee4dd._.js.map