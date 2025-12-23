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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/encryption.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decryptWithKey",
    ()=>decryptWithKey,
    "encryptWithKey",
    ()=>encryptWithKey,
    "generateRandomKey",
    ()=>generateRandomKey,
    "unwrapUserKey",
    ()=>unwrapUserKey,
    "wrapUserKey",
    ()=>wrapUserKey
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
// Master key must be a 32-byte key, provided as base64 in env CREDENTIALS_ENCRYPTION_KEY
const MASTER_KEY_ENV = process.env.CREDENTIALS_ENCRYPTION_KEY;
if (!MASTER_KEY_ENV) {
    // We intentionally do not throw at import time to avoid breaking build if env is missing.
    // The API routes that depend on this should validate and throw a clear error instead.
    console.warn("CREDENTIALS_ENCRYPTION_KEY is not set. Encryption helpers will fail until it is configured.");
}
function getMasterKey() {
    if (!MASTER_KEY_ENV) {
        throw new Error("CREDENTIALS_ENCRYPTION_KEY is not configured");
    }
    const key = Buffer.from(MASTER_KEY_ENV, "base64");
    if (key.length !== 32) {
        throw new Error("CREDENTIALS_ENCRYPTION_KEY must be a 32-byte key encoded in base64");
    }
    return key;
}
function generateRandomKey() {
    // 32 random bytes, returned as base64
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(32).toString("base64");
}
function encryptWithKey(keyBase64, plaintext) {
    const key = Buffer.from(keyBase64, "base64");
    if (key.length !== 32) {
        throw new Error("Encryption key must be 32 bytes (base64-encoded)");
    }
    const iv = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(12) // recommended IV size for GCM
    ;
    const cipher = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createCipheriv("aes-256-gcm", key, iv);
    const encrypted = Buffer.concat([
        cipher.update(plaintext, "utf8"),
        cipher.final()
    ]);
    const authTag = cipher.getAuthTag();
    return {
        ciphertext: encrypted.toString("base64"),
        iv: iv.toString("base64"),
        authTag: authTag.toString("base64")
    };
}
function decryptWithKey(keyBase64, payload) {
    const key = Buffer.from(keyBase64, "base64");
    if (key.length !== 32) {
        throw new Error("Encryption key must be 32 bytes (base64-encoded)");
    }
    const iv = Buffer.from(payload.iv, "base64");
    const authTag = Buffer.from(payload.authTag, "base64");
    const ciphertext = Buffer.from(payload.ciphertext, "base64");
    const decipher = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([
        decipher.update(ciphertext),
        decipher.final()
    ]);
    return decrypted.toString("utf8");
}
function wrapUserKey(userKeyBase64) {
    const masterKey = getMasterKey();
    const iv = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(12);
    const cipher = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createCipheriv("aes-256-gcm", masterKey, iv);
    const encrypted = Buffer.concat([
        cipher.update(userKeyBase64, "utf8"),
        cipher.final()
    ]);
    const authTag = cipher.getAuthTag();
    return {
        ciphertext: encrypted.toString("base64"),
        iv: iv.toString("base64"),
        authTag: authTag.toString("base64")
    };
}
function unwrapUserKey(payload) {
    const masterKey = getMasterKey();
    const iv = Buffer.from(payload.iv, "base64");
    const authTag = Buffer.from(payload.authTag, "base64");
    const ciphertext = Buffer.from(payload.ciphertext, "base64");
    const decipher = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createDecipheriv("aes-256-gcm", masterKey, iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([
        decipher.update(ciphertext),
        decipher.final()
    ]);
    return decrypted.toString("utf8");
}
}),
"[project]/app/api/campaigns/sms/send/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$encryption$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/encryption.ts [app-route] (ecmascript)");
;
;
;
async function sendUltraMsgMessage(phone, message, instanceId, token) {
    const cleanPhone = phone.replace(/[^0-9+]/g, "");
    const response = await fetch(`https://api.ultramsg.com/${instanceId}/messages/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token,
            to: cleanPhone,
            body: message
        })
    });
    const data = await response.json();
    return data;
}
async function POST(request) {
    try {
        const { campaignId } = await request.json();
        if (!campaignId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "campaignId is required"
            }, {
                status: 400
            });
        }
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const { data: campaign, error: campaignError } = await supabase.from("campaigns").select("*").eq("id", campaignId).eq("user_id", user.id).eq("type", "sms").single();
        if (campaignError || !campaign) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Campaign not found"
            }, {
                status: 404
            });
        }
        const { data: recipientsData, error: recipientsError } = await supabase.from("campaign_recipients").select("*, leads(*)").eq("campaign_id", campaignId);
        if (recipientsError) {
            console.error("Error fetching recipients:", recipientsError);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Failed to load recipients"
            }, {
                status: 500
            });
        }
        const recipients = (recipientsData || []).filter((r)=>r.leads && r.leads.phone);
        if (recipients.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "No recipients with phone numbers"
            }, {
                status: 400
            });
        }
        const { data: integration, error: integrationError } = await supabase.from("user_integrations").select("user_key_enc, ultramsg_instance_enc, ultramsg_token_enc").eq("user_id", user.id).single();
        if (integrationError || !integration) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "WhatsApp integration not configured"
            }, {
                status: 400
            });
        }
        const userKeyBase64 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$encryption$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["unwrapUserKey"])(integration.user_key_enc);
        const instanceId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$encryption$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decryptWithKey"])(userKeyBase64, integration.ultramsg_instance_enc);
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$encryption$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decryptWithKey"])(userKeyBase64, integration.ultramsg_token_enc);
        let sent = 0;
        let failed = 0;
        const errors = [];
        for (const r of recipients){
            const lead = r.leads;
            const recipientPhone = lead.phone;
            const recipientName = lead.name || recipientPhone;
            const message = (campaign.content || "").replace(/{name}/g, recipientName).replace(/{business_name}/g, recipientName);
            try {
                const result = await sendUltraMsgMessage(recipientPhone, message, instanceId, token);
                if (result.sent || result.id || result.success) {
                    sent++;
                } else {
                    failed++;
                    errors.push({
                        phone: recipientPhone,
                        error: JSON.stringify(result)
                    });
                }
            } catch (err) {
                failed++;
                errors.push({
                    phone: recipientPhone,
                    error: err.message || "Failed to send"
                });
            }
            await new Promise((resolve)=>setTimeout(resolve, 1000 + Math.random() * 2000));
        }
        const now = new Date().toISOString();
        await supabase.from("campaigns").update({
            status: "sent",
            sent_at: now,
            updated_at: now
        }).eq("id", campaignId).eq("user_id", user.id);
        await supabase.from("campaign_recipients").update({
            status: "sent",
            sent_at: now
        }).eq("campaign_id", campaignId);
        const { data: profile } = await supabase.from("profiles").select("sms_credits").eq("id", user.id).single();
        if (profile) {
            const remaining = Math.max(0, (profile.sms_credits || 0) - sent);
            await supabase.from("profiles").update({
                sms_credits: remaining,
                updated_at: now
            }).eq("id", user.id);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            sent,
            failed,
            errors
        });
    } catch (err) {
        console.error("SMS/WhatsApp campaign send error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err.message ?? "Unexpected error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0d7461d5._.js.map