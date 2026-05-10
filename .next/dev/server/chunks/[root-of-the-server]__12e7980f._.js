module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/lib/config/validation.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfigHotReloader",
    ()=>ConfigHotReloader,
    "ConfigValidationError",
    ()=>ConfigValidationError,
    "configHotReloader",
    ()=>configHotReloader,
    "environmentConfigManager",
    ()=>environmentConfigManager,
    "getConfig",
    ()=>getConfig,
    "getConfigHealthStatus",
    ()=>getConfigHealthStatus,
    "getEnvironmentConfig",
    ()=>getEnvironmentConfig,
    "refreshConfig",
    ()=>refreshConfig,
    "secureConfigStore",
    ()=>secureConfigStore,
    "validateEnvironmentConfig",
    ()=>validateEnvironmentConfig,
    "validateRuntimeConfig",
    ()=>validateRuntimeConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
;
;
// Environment variable schema with validation rules
const envSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    // Firebase Configuration
    NEXT_PUBLIC_FIREBASE_API_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Firebase API key is required"),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Firebase auth domain is required"),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Firebase project ID is required"),
    NEXT_PUBLIC_FIREBASE_APP_ID: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Firebase app ID is required"),
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Firebase storage bucket is required"),
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Firebase messaging sender ID is required"),
    // Firebase Admin Configuration
    FIREBASE_PROJECT_ID: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Firebase admin project ID is required"),
    FIREBASE_CLIENT_EMAIL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email("Firebase client email must be valid email"),
    FIREBASE_PRIVATE_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Firebase private key is required"),
    // Supabase Configuration
    NEXT_PUBLIC_SUPABASE_URL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url("Supabase URL must be valid URL"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Supabase anon key is required"),
    SUPABASE_SERVICE_ROLE_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Supabase service role key is required"),
    // Payment Configuration
    PAYSTACK_SECRET_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Paystack secret key is required"),
    // External API Keys
    GEOAPIFY_API_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Geoapify API key is required"),
    RAPIDAPI_LOCAL_BUSINESS_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    SCRAPERBEE_API_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    // Encryption Configuration
    CREDENTIALS_ENCRYPTION_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Credentials encryption key is required").refine((key)=>{
        try {
            const decoded = Buffer.from(key, "base64");
            return decoded.length === 32;
        } catch  {
            return false;
        }
    }, "Credentials encryption key must be a valid 32-byte base64 encoded string"),
    // Optional Environment Configuration
    NODE_ENV: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "development",
        "production",
        "test"
    ]).default("development"),
    NEXT_PUBLIC_APP_URL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url().optional()
});
class ConfigValidationError extends Error {
    errors;
    constructor(message, errors){
        super(message), this.errors = errors;
        this.name = "ConfigValidationError";
    }
}
function validateEnvironmentConfig() {
    try {
        return envSchema.parse(process.env);
    } catch (error) {
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
            const errorMessages = error.errors.map((err)=>`${err.path.join(".")}: ${err.message}`).join("\n");
            throw new ConfigValidationError(`Environment configuration validation failed:\n${errorMessages}`, error);
        }
        throw error;
    }
}
// Type-safe configuration access with environment support
let cachedConfig = null;
let cachedEnvironmentConfig = null;
function getConfig() {
    if (!cachedConfig) {
        cachedConfig = validateEnvironmentConfig();
    }
    return cachedConfig;
}
function getEnvironmentConfig() {
    if (!cachedEnvironmentConfig) {
        cachedEnvironmentConfig = environmentConfigManager.getConfig();
    }
    return cachedEnvironmentConfig;
}
function refreshConfig() {
    cachedConfig = null;
    cachedEnvironmentConfig = null;
}
class ConfigHotReloader {
    static instance = null;
    isEnabled = false;
    reloadCallbacks = new Set();
    static getInstance() {
        if (!ConfigHotReloader.instance) {
            ConfigHotReloader.instance = new ConfigHotReloader();
        }
        return ConfigHotReloader.instance;
    }
    enable() {
        if (this.isEnabled) return;
        this.isEnabled = true;
        // Watch .env files for changes
        const envFiles = [
            '.env.local',
            '.env',
            `.env.${("TURBOPACK compile-time value", "development")}`
        ];
        envFiles.forEach((file)=>{
            const filePath = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"])(process.cwd(), file);
            if ((0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"])(filePath)) {
                (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["watchFile"])(filePath, {
                    interval: 1000
                }, ()=>{
                    this.handleConfigChange();
                });
            }
        });
        // Watch environment-specific config files
        const configFile = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"])(process.cwd(), `config.${("TURBOPACK compile-time value", "development") || 'development'}.json`);
        if ((0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"])(configFile)) {
            (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["watchFile"])(configFile, {
                interval: 1000
            }, ()=>{
                this.handleEnvironmentConfigChange();
            });
        }
    }
    disable() {
        if (!this.isEnabled) return;
        this.isEnabled = false;
        // Stop watching files
        const envFiles = [
            '.env.local',
            '.env',
            `.env.${("TURBOPACK compile-time value", "development")}`
        ];
        envFiles.forEach((file)=>{
            const filePath = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"])(process.cwd(), file);
            (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["unwatchFile"])(filePath);
        });
        const configFile = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"])(process.cwd(), `config.${("TURBOPACK compile-time value", "development") || 'development'}.json`);
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["unwatchFile"])(configFile);
    }
    onReload(callback) {
        this.reloadCallbacks.add(callback);
    }
    offReload(callback) {
        this.reloadCallbacks.delete(callback);
    }
    handleConfigChange() {
        try {
            // Refresh cached configuration
            refreshConfig();
            // Notify callbacks
            this.reloadCallbacks.forEach((callback)=>{
                try {
                    callback();
                } catch (error) {
                    console.warn('Config reload callback failed:', error);
                }
            });
            console.log('Configuration reloaded successfully');
        } catch (error) {
            console.error('Failed to reload configuration:', error);
        }
    }
    handleEnvironmentConfigChange() {
        try {
            // Refresh environment configuration
            cachedEnvironmentConfig = null;
            // Notify callbacks
            this.reloadCallbacks.forEach((callback)=>{
                try {
                    callback();
                } catch (error) {
                    console.warn('Environment config reload callback failed:', error);
                }
            });
            console.log('Environment configuration reloaded successfully');
        } catch (error) {
            console.error('Failed to reload environment configuration:', error);
        }
    }
}
const configHotReloader = ConfigHotReloader.getInstance();
// Default environment configurations
const defaultEnvironmentConfigs = {
    development: {
        database: {
            connectionPoolSize: 5,
            queryTimeout: 30000,
            enableLogging: true
        },
        security: {
            sessionTimeout: 3600000,
            maxLoginAttempts: 10,
            enableTwoFactor: false
        },
        performance: {
            cacheSize: 100,
            rateLimitWindow: 60000,
            maxConcurrentRequests: 50
        },
        monitoring: {
            enableMetrics: true,
            logLevel: "debug",
            enableTracing: true
        }
    },
    production: {
        database: {
            connectionPoolSize: 20,
            queryTimeout: 15000,
            enableLogging: false
        },
        security: {
            sessionTimeout: 1800000,
            maxLoginAttempts: 5,
            enableTwoFactor: true
        },
        performance: {
            cacheSize: 1000,
            rateLimitWindow: 60000,
            maxConcurrentRequests: 200
        },
        monitoring: {
            enableMetrics: true,
            logLevel: "warn",
            enableTracing: false
        }
    },
    test: {
        database: {
            connectionPoolSize: 2,
            queryTimeout: 5000,
            enableLogging: false
        },
        security: {
            sessionTimeout: 600000,
            maxLoginAttempts: 100,
            enableTwoFactor: false
        },
        performance: {
            cacheSize: 10,
            rateLimitWindow: 1000,
            maxConcurrentRequests: 10
        },
        monitoring: {
            enableMetrics: false,
            logLevel: "error",
            enableTracing: false
        }
    },
    staging: {
        database: {
            connectionPoolSize: 10,
            queryTimeout: 20000,
            enableLogging: true
        },
        security: {
            sessionTimeout: 2700000,
            maxLoginAttempts: 7,
            enableTwoFactor: true
        },
        performance: {
            cacheSize: 500,
            rateLimitWindow: 60000,
            maxConcurrentRequests: 100
        },
        monitoring: {
            enableMetrics: true,
            logLevel: "info",
            enableTracing: true
        }
    }
};
class SecureConfigStore {
    store = new Map();
    encryptionKey;
    configFilePath;
    watchers = new Map();
    hotReloadCallbacks = new Map();
    constructor(){
        this.encryptionKey = this.generateEncryptionKey();
        this.configFilePath = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"])(process.cwd(), '.secure-config.json');
        this.loadFromDisk();
    }
    generateEncryptionKey() {
        const baseKey = process.env.CREDENTIALS_ENCRYPTION_KEY || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomBytes"])(32).toString('base64');
        return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])('sha256').update(baseKey).digest('hex');
    }
    set(key, value, options = {}) {
        const { encrypt = true, environment, hotReloadable = false } = options;
        this.store.set(key, {
            value: encrypt ? this.encryptValue(value) : value,
            isEncrypted: encrypt,
            lastAccessed: new Date(),
            accessCount: 0,
            environment,
            isHotReloadable: hotReloadable
        });
        // Set up hot reloading if enabled
        if (hotReloadable) {
            this.setupHotReload(key);
        }
        this.saveToDisk();
    }
    get(key, environment) {
        const item = this.store.get(key);
        if (!item) return null;
        // Check environment match if specified
        if (environment && item.environment && item.environment !== environment) {
            return null;
        }
        // Update access tracking
        item.lastAccessed = new Date();
        item.accessCount++;
        return item.isEncrypted ? this.decryptValue(item.value) : item.value;
    }
    has(key, environment) {
        const item = this.store.get(key);
        if (!item) return false;
        if (environment && item.environment && item.environment !== environment) {
            return false;
        }
        return true;
    }
    delete(key) {
        // Clean up hot reload watcher
        this.cleanupHotReload(key);
        const result = this.store.delete(key);
        this.saveToDisk();
        return result;
    }
    clear() {
        // Clean up all watchers
        this.watchers.forEach((cleanup)=>cleanup());
        this.watchers.clear();
        this.hotReloadCallbacks.clear();
        this.store.clear();
        this.saveToDisk();
    }
    getAccessStats(key) {
        const item = this.store.get(key);
        return item ? {
            lastAccessed: item.lastAccessed,
            accessCount: item.accessCount
        } : null;
    }
    // Hot reload functionality
    onConfigChange(key, callback) {
        this.hotReloadCallbacks.set(key, callback);
    }
    setupHotReload(key) {
        if (this.watchers.has(key)) return;
        const configPath = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"])(process.cwd(), `.env.${key}`);
        if (!(0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"])(configPath)) return;
        const watcher = ()=>{
            try {
                const newValue = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["readFileSync"])(configPath, 'utf8').trim();
                const currentItem = this.store.get(key);
                if (currentItem) {
                    const currentValue = currentItem.isEncrypted ? this.decryptValue(currentItem.value) : currentItem.value;
                    if (newValue !== currentValue) {
                        this.set(key, newValue, {
                            encrypt: currentItem.isEncrypted,
                            environment: currentItem.environment,
                            hotReloadable: true
                        });
                        // Trigger callback
                        const callback = this.hotReloadCallbacks.get(key);
                        if (callback) {
                            callback(newValue);
                        }
                    }
                }
            } catch (error) {
                console.warn(`Hot reload failed for config key ${key}:`, error);
            }
        };
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["watchFile"])(configPath, {
            interval: 1000
        }, watcher);
        this.watchers.set(key, ()=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["unwatchFile"])(configPath, watcher));
    }
    cleanupHotReload(key) {
        const cleanup = this.watchers.get(key);
        if (cleanup) {
            cleanup();
            this.watchers.delete(key);
        }
        this.hotReloadCallbacks.delete(key);
    }
    encryptValue(value) {
        try {
            const algorithm = 'aes-256-cbc';
            const iv = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomBytes"])(16);
            const cipher = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createCipheriv"])(algorithm, Buffer.from(this.encryptionKey, 'hex').slice(0, 32), iv);
            let encrypted = cipher.update(value, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            // Prepend IV to encrypted data
            return iv.toString('hex') + ':' + encrypted;
        } catch (error) {
            console.warn('Encryption failed, storing as plain text:', error);
            return value;
        }
    }
    decryptValue(encrypted) {
        try {
            const algorithm = 'aes-256-cbc';
            const parts = encrypted.split(':');
            if (parts.length !== 2) {
                // Fallback for non-encrypted values
                return encrypted;
            }
            const iv = Buffer.from(parts[0], 'hex');
            const encryptedData = parts[1];
            const decipher = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createDecipheriv"])(algorithm, Buffer.from(this.encryptionKey, 'hex').slice(0, 32), iv);
            let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        } catch (error) {
            console.warn('Decryption failed, returning encrypted value:', error);
            return encrypted;
        }
    }
    saveToDisk() {
        try {
            const data = Array.from(this.store.entries()).map(([key, value])=>({
                    key,
                    ...value
                }));
            (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["writeFileSync"])(this.configFilePath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.warn('Failed to save secure config to disk:', error);
        }
    }
    loadFromDisk() {
        try {
            if ((0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"])(this.configFilePath)) {
                const data = JSON.parse((0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["readFileSync"])(this.configFilePath, 'utf8'));
                data.forEach((item)=>{
                    this.store.set(item.key, {
                        value: item.value,
                        isEncrypted: item.isEncrypted,
                        lastAccessed: new Date(item.lastAccessed),
                        accessCount: item.accessCount || 0,
                        environment: item.environment,
                        isHotReloadable: item.isHotReloadable
                    });
                    // Restore hot reload watchers
                    if (item.isHotReloadable) {
                        this.setupHotReload(item.key);
                    }
                });
            }
        } catch (error) {
            console.warn('Failed to load secure config from disk:', error);
        }
    }
}
const secureConfigStore = new SecureConfigStore();
// Environment-specific configuration manager
class EnvironmentConfigManager {
    currentEnvironment;
    environmentConfig;
    configPath;
    constructor(){
        this.currentEnvironment = ("TURBOPACK compile-time value", "development") || 'development';
        this.configPath = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"])(process.cwd(), `config.${this.currentEnvironment}.json`);
        this.environmentConfig = this.loadEnvironmentConfig();
    }
    loadEnvironmentConfig() {
        const defaultConfig = defaultEnvironmentConfigs[this.currentEnvironment] || {};
        try {
            if ((0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"])(this.configPath)) {
                const fileConfig = JSON.parse((0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["readFileSync"])(this.configPath, 'utf8'));
                return this.mergeConfigs(defaultConfig, fileConfig);
            }
        } catch (error) {
            console.warn(`Failed to load environment config for ${this.currentEnvironment}:`, error);
        }
        return {
            environment: this.currentEnvironment,
            ...defaultConfig
        };
    }
    mergeConfigs(defaultConfig, fileConfig) {
        const merged = {
            ...defaultConfig
        };
        Object.keys(fileConfig).forEach((key)=>{
            if (typeof fileConfig[key] === 'object' && !Array.isArray(fileConfig[key])) {
                merged[key] = {
                    ...merged[key],
                    ...fileConfig[key]
                };
            } else {
                merged[key] = fileConfig[key];
            }
        });
        return merged;
    }
    getConfig() {
        return this.environmentConfig;
    }
    updateConfig(updates) {
        this.environmentConfig = this.mergeConfigs(this.environmentConfig, updates);
        this.saveEnvironmentConfig();
    }
    saveEnvironmentConfig() {
        try {
            (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["writeFileSync"])(this.configPath, JSON.stringify(this.environmentConfig, null, 2));
        } catch (error) {
            console.warn('Failed to save environment config:', error);
        }
    }
    getCurrentEnvironment() {
        return this.currentEnvironment;
    }
    switchEnvironment(environment) {
        this.currentEnvironment = environment;
        this.configPath = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"])(process.cwd(), `config.${environment}.json`);
        this.environmentConfig = this.loadEnvironmentConfig();
    }
}
const environmentConfigManager = new EnvironmentConfigManager();
function validateRuntimeConfig(config) {
    try {
        envSchema.partial().parse(config);
        return true;
    } catch  {
        return false;
    }
}
function getConfigHealthStatus() {
    const result = {
        isValid: true,
        missingRequired: [],
        invalidValues: [],
        warnings: [],
        environmentConfig: {
            isValid: true,
            environment: ("TURBOPACK compile-time value", "development") || 'development',
            warnings: []
        }
    };
    try {
        validateEnvironmentConfig();
    } catch (error) {
        result.isValid = false;
        if (error instanceof ConfigValidationError) {
            error.errors.errors.forEach((err)=>{
                const path = err.path.join(".");
                if (err.code === "invalid_type" && err.received === "undefined") {
                    result.missingRequired.push(path);
                } else {
                    result.invalidValues.push(`${path}: ${err.message}`);
                }
            });
        }
    }
    // Validate environment-specific configuration
    try {
        const envConfig = getEnvironmentConfig();
        // Check for potential performance issues in production
        if (envConfig.environment === 'production') {
            if (envConfig.database?.enableLogging) {
                result.environmentConfig.warnings.push('Database logging is enabled in production - may impact performance');
            }
            if (envConfig.monitoring?.logLevel === 'debug') {
                result.environmentConfig.warnings.push('Debug logging is enabled in production - may impact performance');
            }
            if (!envConfig.security?.enableTwoFactor) {
                result.environmentConfig.warnings.push('Two-factor authentication is disabled in production');
            }
        }
        // Check for development-specific issues
        if (envConfig.environment === 'development') {
            if (envConfig.security?.enableTwoFactor) {
                result.environmentConfig.warnings.push('Two-factor authentication is enabled in development - may slow down testing');
            }
        }
    } catch (error) {
        result.environmentConfig.isValid = false;
        result.environmentConfig.warnings.push(`Environment config validation failed: ${error instanceof Error ? error.message : String(error)}`);
    }
    // Add warnings for optional but recommended values
    if (!process.env.RAPIDAPI_LOCAL_BUSINESS_KEY) {
        result.warnings.push("RAPIDAPI_LOCAL_BUSINESS_KEY is not set - some lead generation features may be limited");
    }
    if (!process.env.SCRAPERBEE_API_KEY) {
        result.warnings.push("SCRAPERBEE_API_KEY is not set - web scraping features may be limited");
    }
    // Check secure config store health
    try {
        const secureStoreStats = secureConfigStore.getAccessStats('test-key');
    // If we can access stats, the store is working
    } catch (error) {
        result.warnings.push('Secure configuration store may not be functioning properly');
    }
    return result;
}
}),
"[project]/lib/config/startup.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StartupValidator",
    ()=>StartupValidator,
    "startupValidator",
    ()=>startupValidator,
    "validateStartup",
    ()=>validateStartup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config/validation.ts [app-route] (ecmascript)");
;
class StartupValidator {
    static instance = null;
    isValidated = false;
    validationErrors = [];
    static getInstance() {
        if (!StartupValidator.instance) {
            StartupValidator.instance = new StartupValidator();
        }
        return StartupValidator.instance;
    }
    async validateStartupConfiguration() {
        const errors = [];
        const warnings = [];
        try {
            // Validate environment variables
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateEnvironmentConfig"])();
            // Get detailed health status
            const healthStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getConfigHealthStatus"])();
            if (!healthStatus.isValid) {
                errors.push(...healthStatus.missingRequired.map((key)=>`Missing required environment variable: ${key}`));
                errors.push(...healthStatus.invalidValues);
            }
            warnings.push(...healthStatus.warnings);
            warnings.push(...healthStatus.environmentConfig.warnings);
            // Validate Firebase configuration
            await this.validateFirebaseConfig();
            // Validate encryption setup
            this.validateEncryptionConfig();
            // Validate environment-specific configuration
            this.validateEnvironmentSpecificConfig();
            // Enable hot reload in development
            if ("TURBOPACK compile-time truthy", 1) {
                try {
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["configHotReloader"].enable();
                    warnings.push('Configuration hot reload enabled for development');
                } catch (error) {
                    warnings.push('Failed to enable configuration hot reload');
                }
            }
            this.isValidated = errors.length === 0;
            this.validationErrors = errors;
            return {
                success: this.isValidated,
                errors,
                warnings,
                environment: ("TURBOPACK compile-time value", "development") || 'development'
            };
        } catch (error) {
            const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConfigValidationError"] ? error.message : `Startup validation failed: ${error instanceof Error ? error.message : String(error)}`;
            errors.push(errorMessage);
            this.isValidated = false;
            this.validationErrors = errors;
            return {
                success: false,
                errors,
                warnings,
                environment: ("TURBOPACK compile-time value", "development") || 'development'
            };
        }
    }
    async validateFirebaseConfig() {
        try {
            // Basic Firebase configuration validation
            const requiredFirebaseVars = [
                "FIREBASE_PROJECT_ID",
                "FIREBASE_CLIENT_EMAIL",
                "FIREBASE_PRIVATE_KEY"
            ];
            for (const varName of requiredFirebaseVars){
                if (!process.env[varName]) {
                    throw new Error(`Missing Firebase configuration: ${varName}`);
                }
            }
            // Validate private key format
            const privateKey = process.env.FIREBASE_PRIVATE_KEY;
            if (privateKey && !privateKey.includes("BEGIN PRIVATE KEY")) {
                throw new Error("FIREBASE_PRIVATE_KEY appears to be in invalid format");
            }
        } catch (error) {
            throw new Error(`Firebase configuration validation failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    validateEncryptionConfig() {
        try {
            const encryptionKey = process.env.CREDENTIALS_ENCRYPTION_KEY;
            if (!encryptionKey) {
                throw new Error("CREDENTIALS_ENCRYPTION_KEY is required");
            }
            // Validate key format and length
            const keyBuffer = Buffer.from(encryptionKey, "base64");
            if (keyBuffer.length !== 32) {
                throw new Error("CREDENTIALS_ENCRYPTION_KEY must be exactly 32 bytes when base64 decoded");
            }
        } catch (error) {
            throw new Error(`Encryption configuration validation failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    validateEnvironmentSpecificConfig() {
        try {
            const envConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEnvironmentConfig"])();
            // Validate environment-specific settings
            if (envConfig.environment === 'production') {
                // Production-specific validations
                if (envConfig.database?.enableLogging) {
                    throw new Error('Database logging should be disabled in production for performance');
                }
                if (envConfig.monitoring?.logLevel === 'debug') {
                    throw new Error('Debug logging should not be enabled in production');
                }
                if (envConfig.database?.connectionPoolSize && envConfig.database.connectionPoolSize < 10) {
                    throw new Error('Production database connection pool size should be at least 10');
                }
            }
            // Validate required configuration sections
            if (!envConfig.database) {
                throw new Error('Database configuration is required');
            }
            if (!envConfig.security) {
                throw new Error('Security configuration is required');
            }
            if (!envConfig.monitoring) {
                throw new Error('Monitoring configuration is required');
            }
        } catch (error) {
            throw new Error(`Environment-specific configuration validation failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    isConfigurationValid() {
        return this.isValidated;
    }
    getValidationErrors() {
        return [
            ...this.validationErrors
        ];
    }
    // Force re-validation (useful for testing or config changes)
    reset() {
        this.isValidated = false;
        this.validationErrors = [];
    }
}
async function validateStartup() {
    const validator = StartupValidator.getInstance();
    const result = await validator.validateStartupConfiguration();
    if (!result.success) {
        console.error("❌ Startup configuration validation failed:");
        result.errors.forEach((error)=>console.error(`  - ${error}`));
        throw new Error("Application startup failed due to configuration errors");
    }
    if (result.warnings.length > 0) {
        console.warn("⚠️  Configuration warnings:");
        result.warnings.forEach((warning)=>console.warn(`  - ${warning}`));
    }
    console.log("✅ Configuration validation passed");
}
const startupValidator = StartupValidator.getInstance();
}),
"[project]/lib/config/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Configuration validation and management
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config/validation.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$startup$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config/startup.ts [app-route] (ecmascript)");
;
;
;
}),
"[project]/lib/firebase/admin.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "firebaseAdminAuth",
    ()=>firebaseAdminAuth,
    "firebaseAdminDb",
    ()=>firebaseAdminDb
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/app [external] (firebase-admin/app, esm_import, [project]/node_modules/firebase-admin)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/auth [external] (firebase-admin/auth, esm_import, [project]/node_modules/firebase-admin)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/firestore [external] (firebase-admin/firestore, esm_import, [project]/node_modules/firebase-admin)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/config/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config/validation.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
// Get validated configuration
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getConfig"])();
let privateKey = config.FIREBASE_PRIVATE_KEY;
if (privateKey && privateKey.startsWith("\"")) {
    privateKey = privateKey.slice(1, -1);
}
if (privateKey) {
    privateKey = privateKey.replace(/\\n/g, "\n");
}
if (!(0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["getApps"])().length) {
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["initializeApp"])({
        credential: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["cert"])({
            projectId: config.FIREBASE_PROJECT_ID,
            clientEmail: config.FIREBASE_CLIENT_EMAIL,
            privateKey
        })
    });
}
const firebaseAdminAuth = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["getAuth"])();
const firebaseAdminDb = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["getFirestore"])();
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/database/connection-manager.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ConnectionPoolError",
    ()=>ConnectionPoolError,
    "connectionManager",
    ()=>connectionManager,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase/admin.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
class ConnectionPoolError extends Error {
    code;
    details;
    constructor(message, code, details){
        super(message), this.code = code, this.details = details;
        this.name = "ConnectionPoolError";
    }
}
// Connection manager class
class DatabaseConnectionManager {
    db;
    config;
    metrics;
    healthCheckTimer;
    constructor(config = {}){
        this.db = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["firebaseAdminDb"];
        this.config = {
            maxConnections: config.maxConnections || 100,
            connectionTimeout: config.connectionTimeout || 30000,
            retryAttempts: config.retryAttempts || 3,
            retryDelay: config.retryDelay || 1000,
            healthCheckInterval: config.healthCheckInterval || 60000 // 1 minute
        };
        this.metrics = {
            activeConnections: 0,
            totalRequests: 0,
            failedRequests: 0,
            averageResponseTime: 0,
            lastHealthCheck: new Date()
        };
        this.startHealthCheck();
    }
    // Execute database operation with retry logic and metrics
    async executeWithRetry(operation, operationName, retryAttempts) {
        const startTime = Date.now();
        const attempts = retryAttempts || this.config.retryAttempts;
        let lastError = null;
        this.metrics.activeConnections++;
        this.metrics.totalRequests++;
        try {
            for(let attempt = 1; attempt <= attempts; attempt++){
                try {
                    const result = await Promise.race([
                        operation(),
                        this.createTimeoutPromise()
                    ]);
                    // Update metrics on success
                    const responseTime = Date.now() - startTime;
                    this.updateAverageResponseTime(responseTime);
                    return result;
                } catch (error) {
                    lastError = error instanceof Error ? error : new Error(String(error));
                    // Don't retry on certain errors
                    if (this.isNonRetryableError(lastError)) {
                        break;
                    }
                    // Wait before retry (exponential backoff)
                    if (attempt < attempts) {
                        const delay = this.config.retryDelay * Math.pow(2, attempt - 1);
                        await this.sleep(delay);
                    }
                }
            }
            // All attempts failed
            this.metrics.failedRequests++;
            throw new ConnectionPoolError(`Operation ${operationName} failed after ${attempts} attempts: ${lastError?.message}`, "OPERATION_FAILED", {
                operationName,
                attempts,
                lastError: lastError?.message,
                responseTime: Date.now() - startTime
            });
        } finally{
            this.metrics.activeConnections--;
        }
    }
    // Create timeout promise
    createTimeoutPromise() {
        return new Promise((_, reject)=>{
            setTimeout(()=>{
                reject(new ConnectionPoolError(`Operation timed out after ${this.config.connectionTimeout}ms`, "TIMEOUT", {
                    timeout: this.config.connectionTimeout
                }));
            }, this.config.connectionTimeout);
        });
    }
    // Check if error should not be retried
    isNonRetryableError(error) {
        const nonRetryableCodes = [
            "PERMISSION_DENIED",
            "INVALID_ARGUMENT",
            "NOT_FOUND",
            "ALREADY_EXISTS",
            "FAILED_PRECONDITION"
        ];
        return nonRetryableCodes.some((code)=>error.message.includes(code));
    }
    // Sleep utility
    sleep(ms) {
        return new Promise((resolve)=>setTimeout(resolve, ms));
    }
    // Update average response time
    updateAverageResponseTime(responseTime) {
        const totalRequests = this.metrics.totalRequests;
        const currentAverage = this.metrics.averageResponseTime;
        // Calculate new average using incremental formula
        this.metrics.averageResponseTime = (currentAverage * (totalRequests - 1) + responseTime) / totalRequests;
    }
    // Health check functionality
    startHealthCheck() {
        this.healthCheckTimer = setInterval(async ()=>{
            try {
                await this.performHealthCheck();
            } catch (error) {
                console.error("Database health check failed:", error);
            }
        }, this.config.healthCheckInterval);
    }
    // Perform health check
    async performHealthCheck() {
        try {
            // Simple read operation to test connectivity
            await this.db.collection("_health_check").limit(1).get();
            this.metrics.lastHealthCheck = new Date();
        } catch (error) {
            throw new ConnectionPoolError(`Health check failed: ${error instanceof Error ? error.message : "Unknown error"}`, "HEALTH_CHECK_FAILED", {
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }
    // Get connection metrics
    getMetrics() {
        return {
            ...this.metrics
        };
    }
    // Get connection status
    getStatus() {
        const timeSinceLastCheck = Date.now() - this.metrics.lastHealthCheck.getTime();
        const isHealthy = timeSinceLastCheck < this.config.healthCheckInterval * 2;
        return {
            isHealthy,
            activeConnections: this.metrics.activeConnections,
            config: this.config,
            metrics: this.metrics
        };
    }
    // Shutdown connection manager
    shutdown() {
        if (this.healthCheckTimer) {
            clearInterval(this.healthCheckTimer);
            this.healthCheckTimer = undefined;
        }
    }
    // Get database instance (for direct access when needed)
    getDatabase() {
        return this.db;
    }
}
const connectionManager = new DatabaseConnectionManager();
const __TURBOPACK__default__export__ = connectionManager;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/database/performance-monitor.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Database performance monitoring
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "performanceMonitor",
    ()=>performanceMonitor
]);
class DatabasePerformanceMonitor {
    metrics = [];
    slowQueryThreshold = 1000 // 1 second
    ;
    maxMetricsHistory = 1000;
    startTime = new Date();
    // Record a query execution
    recordQuery(queryType, collection, duration, success, error) {
        const metric = {
            queryType,
            collection,
            duration,
            timestamp: new Date(),
            success,
            error
        };
        this.metrics.push(metric);
        // Keep only recent metrics
        if (this.metrics.length > this.maxMetricsHistory) {
            this.metrics = this.metrics.slice(-this.maxMetricsHistory);
        }
    }
    // Get performance statistics
    getStats() {
        const now = new Date();
        const timeWindow = 60000 // 1 minute
        ;
        const recentMetrics = this.metrics.filter((m)=>now.getTime() - m.timestamp.getTime() < timeWindow);
        const totalQueries = recentMetrics.length;
        const successfulQueries = recentMetrics.filter((m)=>m.success);
        const failedQueries = recentMetrics.filter((m)=>!m.success);
        const averageResponseTime = totalQueries > 0 ? recentMetrics.reduce((sum, m)=>sum + m.duration, 0) / totalQueries : 0;
        const slowQueries = recentMetrics.filter((m)=>m.duration > this.slowQueryThreshold);
        const errorRate = totalQueries > 0 ? failedQueries.length / totalQueries : 0;
        const queriesPerSecond = totalQueries / (timeWindow / 1000);
        return {
            totalQueries,
            averageResponseTime,
            slowQueries,
            errorRate,
            queriesPerSecond,
            lastReset: this.startTime
        };
    }
    // Get slow queries
    getSlowQueries(limit = 10) {
        return this.metrics.filter((m)=>m.duration > this.slowQueryThreshold).sort((a, b)=>b.duration - a.duration).slice(0, limit);
    }
    // Get queries by collection
    getQueriesByCollection() {
        const counts = {};
        for (const metric of this.metrics){
            counts[metric.collection] = (counts[metric.collection] || 0) + 1;
        }
        return counts;
    }
    // Reset metrics
    reset() {
        this.metrics = [];
        this.startTime = new Date();
    }
    // Set slow query threshold
    setSlowQueryThreshold(threshold) {
        this.slowQueryThreshold = threshold;
    }
}
const performanceMonitor = new DatabasePerformanceMonitor();
const __TURBOPACK__default__export__ = performanceMonitor;
}),
"[project]/lib/monitoring/logger.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CorrelationManager",
    ()=>CorrelationManager,
    "LogLevel",
    ()=>LogLevel,
    "logger",
    ()=>logger
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
var LogLevel = /*#__PURE__*/ function(LogLevel) {
    LogLevel["DEBUG"] = "debug";
    LogLevel["INFO"] = "info";
    LogLevel["WARN"] = "warn";
    LogLevel["ERROR"] = "error";
    LogLevel["AUDIT"] = "audit";
    return LogLevel;
}({});
class StructuredLogger {
    sensitiveFields = [
        'password',
        'token',
        'apiKey',
        'secret',
        'authorization',
        'cookie',
        'session',
        'key',
        'credential',
        'auth'
    ];
    sanitizeData(data) {
        if (typeof data !== 'object' || data === null) {
            return data;
        }
        if (Array.isArray(data)) {
            return data.map((item)=>this.sanitizeData(item));
        }
        const sanitized = {};
        for (const [key, value] of Object.entries(data)){
            const lowerKey = key.toLowerCase();
            const isSensitive = this.sensitiveFields.some((field)=>lowerKey.includes(field));
            if (isSensitive) {
                sanitized[key] = '[REDACTED]';
            } else if (typeof value === 'object') {
                sanitized[key] = this.sanitizeData(value);
            } else {
                sanitized[key] = value;
            }
        }
        return sanitized;
    }
    formatLogEntry(level, message, context, error) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            message,
            requestId: context?.requestId || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])(),
            ...context && {
                userId: context.userId,
                endpoint: context.endpoint,
                duration: context.duration,
                metadata: context.metadata ? this.sanitizeData(context.metadata) : undefined
            },
            ...error && {
                error: {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                }
            }
        };
        return JSON.stringify(this.sanitizeData(logEntry));
    }
    info(message, context) {
        const logEntry = this.formatLogEntry("info", message, context);
        console.log(logEntry);
    }
    warn(message, context) {
        const logEntry = this.formatLogEntry("warn", message, context);
        console.warn(logEntry);
    }
    error(message, error, context) {
        const logEntry = this.formatLogEntry("error", message, context, error);
        console.error(logEntry);
    }
    debug(message, context) {
        if ("TURBOPACK compile-time truthy", 1) {
            const logEntry = this.formatLogEntry("debug", message, context);
            console.debug(logEntry);
        }
    }
    audit(event) {
        const logEntry = {
            timestamp: event.timestamp.toISOString(),
            level: "audit",
            type: event.type,
            action: event.action,
            userId: event.userId,
            resource: event.resource,
            requestId: event.requestId,
            metadata: event.metadata ? this.sanitizeData(event.metadata) : undefined
        };
        console.log(JSON.stringify(logEntry));
    }
}
const logger = new StructuredLogger();
class CorrelationManager {
    static correlationIds = new Map();
    static generateCorrelationId() {
        return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])();
    }
    static setCorrelationId(key, correlationId) {
        this.correlationIds.set(key, correlationId);
    }
    static getCorrelationId(key) {
        return this.correlationIds.get(key);
    }
    static clearCorrelationId(key) {
        this.correlationIds.delete(key);
    }
}
}),
"[project]/lib/monitoring/metrics.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PerformanceMonitor",
    ()=>PerformanceMonitor,
    "metricsCollector",
    ()=>metricsCollector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/monitoring/logger.ts [app-route] (ecmascript)");
;
class InMemoryMetricsCollector {
    metrics = [];
    counters = new Map();
    gauges = new Map();
    histograms = new Map();
    incrementCounter(name, tags) {
        const key = this.getMetricKey(name, tags);
        const currentValue = this.counters.get(key) || 0;
        this.counters.set(key, currentValue + 1);
        this.recordMetric({
            name,
            type: 'counter',
            value: currentValue + 1,
            tags,
            timestamp: new Date()
        });
    }
    recordHistogram(name, value, tags) {
        const key = this.getMetricKey(name, tags);
        const values = this.histograms.get(key) || [];
        values.push(value);
        this.histograms.set(key, values);
        this.recordMetric({
            name,
            type: 'histogram',
            value,
            tags,
            timestamp: new Date()
        });
    }
    recordGauge(name, value, tags) {
        const key = this.getMetricKey(name, tags);
        this.gauges.set(key, value);
        this.recordMetric({
            name,
            type: 'gauge',
            value,
            tags,
            timestamp: new Date()
        });
    }
    startTimer(name) {
        const startTime = Date.now();
        return {
            end: ()=>{
                const duration = Date.now() - startTime;
                this.recordHistogram(name, duration, {
                    unit: 'milliseconds'
                });
                return duration;
            }
        };
    }
    getMetricKey(name, tags) {
        if (!tags) return name;
        const tagString = Object.entries(tags).sort(([a], [b])=>a.localeCompare(b)).map(([key, value])=>`${key}=${value}`).join(',');
        return `${name}{${tagString}}`;
    }
    recordMetric(metric) {
        this.metrics.push(metric);
        // Keep only last 1000 metrics to prevent memory issues
        if (this.metrics.length > 1000) {
            this.metrics = this.metrics.slice(-1000);
        }
        // Log metrics in development for debugging
        if ("TURBOPACK compile-time truthy", 1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug(`Metric recorded: ${metric.name}=${metric.value}`, {
                requestId: 'metrics-system',
                endpoint: 'metrics',
                metadata: {
                    metricType: metric.type,
                    tags: metric.tags
                }
            });
        }
    }
    // Get metrics for health checks and monitoring
    getMetrics() {
        return [
            ...this.metrics
        ];
    }
    getCounters() {
        return new Map(this.counters);
    }
    getGauges() {
        return new Map(this.gauges);
    }
    getHistograms() {
        return new Map(this.histograms);
    }
    // Get summary statistics for histograms
    getHistogramStats(name, tags) {
        const key = this.getMetricKey(name, tags);
        const values = this.histograms.get(key);
        if (!values || values.length === 0) {
            return null;
        }
        const sorted = [
            ...values
        ].sort((a, b)=>a - b);
        const count = sorted.length;
        const min = sorted[0];
        const max = sorted[count - 1];
        const avg = sorted.reduce((sum, val)=>sum + val, 0) / count;
        const percentile = (p)=>{
            const index = Math.ceil(p / 100 * count) - 1;
            return sorted[Math.max(0, index)];
        };
        return {
            count,
            min,
            max,
            avg,
            p50: percentile(50),
            p95: percentile(95),
            p99: percentile(99)
        };
    }
}
const metricsCollector = new InMemoryMetricsCollector();
class PerformanceMonitor {
    static trackApiCall(endpoint, method) {
        const timer = metricsCollector.startTimer('api_request_duration');
        metricsCollector.incrementCounter('api_requests_total', {
            endpoint,
            method
        });
        return {
            end: (statusCode)=>{
                const duration = timer.end();
                metricsCollector.incrementCounter('api_responses_total', {
                    endpoint,
                    method,
                    status_code: statusCode.toString()
                });
                return duration;
            }
        };
    }
    static trackDatabaseQuery(operation, table) {
        const timer = metricsCollector.startTimer('database_query_duration');
        metricsCollector.incrementCounter('database_queries_total', {
            operation,
            table: table || 'unknown'
        });
        return {
            end: (success)=>{
                const duration = timer.end();
                metricsCollector.incrementCounter('database_query_results_total', {
                    operation,
                    table: table || 'unknown',
                    success: success.toString()
                });
                return duration;
            }
        };
    }
    static trackExternalApiCall(service, endpoint) {
        const timer = metricsCollector.startTimer('external_api_duration');
        metricsCollector.incrementCounter('external_api_calls_total', {
            service,
            endpoint
        });
        return {
            end: (success, statusCode)=>{
                const duration = timer.end();
                metricsCollector.incrementCounter('external_api_results_total', {
                    service,
                    endpoint,
                    success: success.toString(),
                    status_code: statusCode?.toString() || 'unknown'
                });
                return duration;
            }
        };
    }
    static recordMemoryUsage() {
        if (typeof process !== 'undefined' && process.memoryUsage) {
            const memUsage = process.memoryUsage();
            metricsCollector.recordGauge('memory_usage_bytes', memUsage.heapUsed, {
                type: 'heap_used'
            });
            metricsCollector.recordGauge('memory_usage_bytes', memUsage.heapTotal, {
                type: 'heap_total'
            });
            metricsCollector.recordGauge('memory_usage_bytes', memUsage.rss, {
                type: 'rss'
            });
        }
    }
    static recordActiveConnections(count) {
        metricsCollector.recordGauge('active_connections', count);
    }
}
}),
"[project]/lib/monitoring/alerting.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertSeverity",
    ()=>AlertSeverity,
    "alertingSystem",
    ()=>alertingSystem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/monitoring/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/monitoring/metrics.ts [app-route] (ecmascript)");
;
;
var AlertSeverity = /*#__PURE__*/ function(AlertSeverity) {
    AlertSeverity["LOW"] = "low";
    AlertSeverity["MEDIUM"] = "medium";
    AlertSeverity["HIGH"] = "high";
    AlertSeverity["CRITICAL"] = "critical";
    return AlertSeverity;
}({});
class AlertingSystem {
    alerts = [];
    alertRules = [];
    lastAlertTimes = new Map();
    constructor(){
        this.setupDefaultRules();
        this.startMonitoring();
    }
    setupDefaultRules() {
        // High error rate alert
        this.addRule({
            name: 'high_error_rate',
            condition: ()=>{
                const errorCount = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getCounters().get('api_responses_total{status_code=500}') || 0;
                const totalCount = Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getCounters().entries()).filter(([key])=>key.startsWith('api_responses_total')).reduce((sum, [, value])=>sum + value, 0);
                return totalCount > 10 && errorCount / totalCount > 0.1; // 10% error rate
            },
            severity: "high",
            message: 'High error rate detected (>10%)',
            cooldownMinutes: 5
        });
        // Slow response time alert
        this.addRule({
            name: 'slow_response_time',
            condition: ()=>{
                const stats = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getHistogramStats('api_request_duration');
                return stats !== null && stats.p95 > 5000; // 5 seconds
            },
            severity: "medium",
            message: 'Slow API response times detected (P95 > 5s)',
            cooldownMinutes: 10
        });
        // High memory usage alert
        this.addRule({
            name: 'high_memory_usage',
            condition: ()=>{
                const heapUsed = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getGauges().get('memory_usage_bytes{type=heap_used}') || 0;
                const heapTotal = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getGauges().get('memory_usage_bytes{type=heap_total}') || 1;
                return heapUsed / heapTotal > 0.9; // 90% memory usage
            },
            severity: "high",
            message: 'High memory usage detected (>90%)',
            cooldownMinutes: 5
        });
        // Database connection issues
        this.addRule({
            name: 'database_errors',
            condition: ()=>{
                const failedQueries = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getCounters().get('database_query_results_total{success=false}') || 0;
                const totalQueries = Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getCounters().entries()).filter(([key])=>key.startsWith('database_query_results_total')).reduce((sum, [, value])=>sum + value, 0);
                return totalQueries > 5 && failedQueries / totalQueries > 0.2; // 20% failure rate
            },
            severity: "critical",
            message: 'High database error rate detected (>20%)',
            cooldownMinutes: 2
        });
        // External API failures
        this.addRule({
            name: 'external_api_failures',
            condition: ()=>{
                const failedCalls = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getCounters().get('external_api_results_total{success=false}') || 0;
                return failedCalls > 5; // More than 5 failures
            },
            severity: "medium",
            message: 'Multiple external API failures detected',
            cooldownMinutes: 15
        });
    }
    addRule(rule) {
        this.alertRules.push(rule);
    }
    removeRule(name) {
        this.alertRules = this.alertRules.filter((rule)=>rule.name !== name);
    }
    checkRules() {
        for (const rule of this.alertRules){
            try {
                if (rule.condition(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"])) {
                    this.triggerAlert(rule);
                }
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(`Error checking alert rule ${rule.name}`, error instanceof Error ? error : new Error(String(error)), {
                    requestId: 'alerting-system',
                    endpoint: 'alert-check',
                    metadata: {
                        ruleName: rule.name
                    }
                });
            }
        }
    }
    triggerAlert(rule) {
        const now = new Date();
        const lastAlertTime = this.lastAlertTimes.get(rule.name);
        // Check cooldown period
        if (lastAlertTime && rule.cooldownMinutes) {
            const cooldownMs = rule.cooldownMinutes * 60 * 1000;
            if (now.getTime() - lastAlertTime.getTime() < cooldownMs) {
                return; // Still in cooldown period
            }
        }
        const alert = {
            id: `${rule.name}-${now.getTime()}`,
            name: rule.name,
            severity: rule.severity,
            message: rule.message,
            timestamp: now,
            metadata: {
                ruleName: rule.name,
                metrics: this.getRelevantMetrics(rule.name)
            }
        };
        this.alerts.push(alert);
        this.lastAlertTimes.set(rule.name, now);
        // Log the alert
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(`ALERT: ${alert.message}`, undefined, {
            requestId: `alert-${alert.id}`,
            endpoint: 'alerting-system',
            metadata: {
                alertId: alert.id,
                severity: alert.severity,
                ruleName: rule.name
            }
        });
        // Create audit event for critical alerts
        if (alert.severity === "critical" || alert.severity === "high") {
            const auditEvent = {
                type: 'system_alert',
                action: 'alert_triggered',
                resource: rule.name,
                metadata: {
                    alertId: alert.id,
                    severity: alert.severity,
                    message: alert.message
                },
                timestamp: now,
                requestId: `alert-${alert.id}`
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].audit(auditEvent);
        }
        // In a real implementation, this would send notifications
        this.sendNotification(alert);
    }
    getRelevantMetrics(ruleName) {
        const counters = Object.fromEntries(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getCounters());
        const gauges = Object.fromEntries(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getGauges());
        // Return relevant metrics based on rule name
        switch(ruleName){
            case 'high_error_rate':
                return {
                    counters: Object.fromEntries(Object.entries(counters).filter(([key])=>key.includes('api_responses_total')))
                };
            case 'slow_response_time':
                return {
                    responseTimeStats: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getHistogramStats('api_request_duration')
                };
            case 'high_memory_usage':
                return {
                    gauges: Object.fromEntries(Object.entries(gauges).filter(([key])=>key.includes('memory_usage_bytes')))
                };
            case 'database_errors':
                return {
                    counters: Object.fromEntries(Object.entries(counters).filter(([key])=>key.includes('database_query_results_total')))
                };
            case 'external_api_failures':
                return {
                    counters: Object.fromEntries(Object.entries(counters).filter(([key])=>key.includes('external_api_results_total')))
                };
            default:
                return {
                    counters,
                    gauges
                };
        }
    }
    sendNotification(alert) {
        // In a real implementation, this would integrate with:
        // - Email services (SendGrid, AWS SES)
        // - Slack/Teams webhooks
        // - PagerDuty/OpsGenie
        // - SMS services
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(`Alert notification would be sent: ${alert.message}`, {
            requestId: `alert-${alert.id}`,
            endpoint: 'notification-system',
            metadata: {
                alertId: alert.id,
                severity: alert.severity,
                notificationChannels: this.getNotificationChannels(alert.severity)
            }
        });
    }
    getNotificationChannels(severity) {
        switch(severity){
            case "critical":
                return [
                    'email',
                    'sms',
                    'slack',
                    'pagerduty'
                ];
            case "high":
                return [
                    'email',
                    'slack'
                ];
            case "medium":
                return [
                    'slack'
                ];
            case "low":
                return [
                    'email'
                ];
            default:
                return [
                    'email'
                ];
        }
    }
    resolveAlert(alertId) {
        const alert = this.alerts.find((a)=>a.id === alertId);
        if (alert && !alert.resolved) {
            alert.resolved = true;
            alert.resolvedAt = new Date();
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(`Alert resolved: ${alert.message}`, {
                requestId: `alert-${alert.id}`,
                endpoint: 'alerting-system',
                metadata: {
                    alertId: alert.id,
                    resolvedAt: alert.resolvedAt
                }
            });
            return true;
        }
        return false;
    }
    getActiveAlerts() {
        return this.alerts.filter((alert)=>!alert.resolved);
    }
    getAllAlerts() {
        return [
            ...this.alerts
        ];
    }
    startMonitoring() {
        // Check rules every 30 seconds
        setInterval(()=>{
            this.checkRules();
        }, 30000);
        // Clean up old resolved alerts every hour
        setInterval(()=>{
            const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
            this.alerts = this.alerts.filter((alert)=>!alert.resolved || alert.resolvedAt && alert.resolvedAt > oneHourAgo);
        }, 60 * 60 * 1000);
    }
}
const alertingSystem = new AlertingSystem();
}),
"[project]/lib/monitoring/health-checks.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HealthStatus",
    ()=>HealthStatus,
    "healthCheckManager",
    ()=>healthCheckManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/monitoring/metrics.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$alerting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/monitoring/alerting.ts [app-route] (ecmascript)");
;
;
var HealthStatus = /*#__PURE__*/ function(HealthStatus) {
    HealthStatus["HEALTHY"] = "healthy";
    HealthStatus["DEGRADED"] = "degraded";
    HealthStatus["UNHEALTHY"] = "unhealthy";
    return HealthStatus;
}({});
class HealthCheckManager {
    checks = new Map();
    startTime = Date.now();
    constructor(){
        this.registerDefaultChecks();
    }
    registerDefaultChecks() {
        // Database connectivity check
        this.register('database', async ()=>{
            const start = Date.now();
            try {
                // In a real implementation, this would test actual database connectivity
                // For now, we'll check if we have recent database metrics
                const recentQueries = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getCounters().get('database_queries_total') || 0;
                const failedQueries = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getCounters().get('database_query_results_total{success=false}') || 0;
                const errorRate = recentQueries > 0 ? failedQueries / recentQueries : 0;
                if (errorRate > 0.5) {
                    return {
                        name: 'database',
                        status: "unhealthy",
                        message: `High database error rate: ${(errorRate * 100).toFixed(1)}%`,
                        duration: Date.now() - start,
                        timestamp: new Date(),
                        metadata: {
                            errorRate,
                            totalQueries: recentQueries,
                            failedQueries
                        }
                    };
                } else if (errorRate > 0.1) {
                    return {
                        name: 'database',
                        status: "degraded",
                        message: `Elevated database error rate: ${(errorRate * 100).toFixed(1)}%`,
                        duration: Date.now() - start,
                        timestamp: new Date(),
                        metadata: {
                            errorRate,
                            totalQueries: recentQueries,
                            failedQueries
                        }
                    };
                }
                return {
                    name: 'database',
                    status: "healthy",
                    message: 'Database connectivity is normal',
                    duration: Date.now() - start,
                    timestamp: new Date(),
                    metadata: {
                        errorRate,
                        totalQueries: recentQueries
                    }
                };
            } catch (error) {
                return {
                    name: 'database',
                    status: "unhealthy",
                    message: `Database check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
                    duration: Date.now() - start,
                    timestamp: new Date()
                };
            }
        });
        // External APIs health check
        this.register('external_apis', async ()=>{
            const start = Date.now();
            try {
                const totalCalls = Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getCounters().entries()).filter(([key])=>key.startsWith('external_api_calls_total')).reduce((sum, [, value])=>sum + value, 0);
                const failedCalls = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getCounters().get('external_api_results_total{success=false}') || 0;
                const errorRate = totalCalls > 0 ? failedCalls / totalCalls : 0;
                if (errorRate > 0.3) {
                    return {
                        name: 'external_apis',
                        status: "unhealthy",
                        message: `High external API error rate: ${(errorRate * 100).toFixed(1)}%`,
                        duration: Date.now() - start,
                        timestamp: new Date(),
                        metadata: {
                            errorRate,
                            totalCalls,
                            failedCalls
                        }
                    };
                } else if (errorRate > 0.1) {
                    return {
                        name: 'external_apis',
                        status: "degraded",
                        message: `Elevated external API error rate: ${(errorRate * 100).toFixed(1)}%`,
                        duration: Date.now() - start,
                        timestamp: new Date(),
                        metadata: {
                            errorRate,
                            totalCalls,
                            failedCalls
                        }
                    };
                }
                return {
                    name: 'external_apis',
                    status: "healthy",
                    message: 'External APIs are responding normally',
                    duration: Date.now() - start,
                    timestamp: new Date(),
                    metadata: {
                        errorRate,
                        totalCalls
                    }
                };
            } catch (error) {
                return {
                    name: 'external_apis',
                    status: "unhealthy",
                    message: `External API check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
                    duration: Date.now() - start,
                    timestamp: new Date()
                };
            }
        });
        // Memory usage check
        this.register('memory', async ()=>{
            const start = Date.now();
            try {
                const heapUsed = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getGauges().get('memory_usage_bytes{type=heap_used}') || 0;
                const heapTotal = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getGauges().get('memory_usage_bytes{type=heap_total}') || 1;
                const memoryUsage = heapUsed / heapTotal;
                if (memoryUsage > 0.9) {
                    return {
                        name: 'memory',
                        status: "unhealthy",
                        message: `Critical memory usage: ${(memoryUsage * 100).toFixed(1)}%`,
                        duration: Date.now() - start,
                        timestamp: new Date(),
                        metadata: {
                            memoryUsage,
                            heapUsed,
                            heapTotal
                        }
                    };
                } else if (memoryUsage > 0.8) {
                    return {
                        name: 'memory',
                        status: "degraded",
                        message: `High memory usage: ${(memoryUsage * 100).toFixed(1)}%`,
                        duration: Date.now() - start,
                        timestamp: new Date(),
                        metadata: {
                            memoryUsage,
                            heapUsed,
                            heapTotal
                        }
                    };
                }
                return {
                    name: 'memory',
                    status: "healthy",
                    message: `Memory usage is normal: ${(memoryUsage * 100).toFixed(1)}%`,
                    duration: Date.now() - start,
                    timestamp: new Date(),
                    metadata: {
                        memoryUsage,
                        heapUsed,
                        heapTotal
                    }
                };
            } catch (error) {
                return {
                    name: 'memory',
                    status: "unhealthy",
                    message: `Memory check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
                    duration: Date.now() - start,
                    timestamp: new Date()
                };
            }
        });
        // Response time check
        this.register('response_time', async ()=>{
            const start = Date.now();
            try {
                const stats = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getHistogramStats('api_request_duration');
                if (!stats || stats.count === 0) {
                    return {
                        name: 'response_time',
                        status: "healthy",
                        message: 'No recent API requests to analyze',
                        duration: Date.now() - start,
                        timestamp: new Date()
                    };
                }
                if (stats.p95 > 10000) {
                    return {
                        name: 'response_time',
                        status: "unhealthy",
                        message: `Very slow response times: P95 = ${stats.p95}ms`,
                        duration: Date.now() - start,
                        timestamp: new Date(),
                        metadata: stats
                    };
                } else if (stats.p95 > 5000) {
                    return {
                        name: 'response_time',
                        status: "degraded",
                        message: `Slow response times: P95 = ${stats.p95}ms`,
                        duration: Date.now() - start,
                        timestamp: new Date(),
                        metadata: stats
                    };
                }
                return {
                    name: 'response_time',
                    status: "healthy",
                    message: `Response times are normal: P95 = ${stats.p95}ms`,
                    duration: Date.now() - start,
                    timestamp: new Date(),
                    metadata: stats
                };
            } catch (error) {
                return {
                    name: 'response_time',
                    status: "unhealthy",
                    message: `Response time check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
                    duration: Date.now() - start,
                    timestamp: new Date()
                };
            }
        });
    }
    register(name, check) {
        this.checks.set(name, check);
    }
    unregister(name) {
        this.checks.delete(name);
    }
    async runCheck(name) {
        const check = this.checks.get(name);
        if (!check) {
            return null;
        }
        try {
            return await check();
        } catch (error) {
            return {
                name,
                status: "unhealthy",
                message: `Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
                duration: 0,
                timestamp: new Date()
            };
        }
    }
    async runAllChecks() {
        const results = [];
        for (const [name] of this.checks){
            const result = await this.runCheck(name);
            if (result) {
                results.push(result);
            }
        }
        return results;
    }
    async getSystemHealth() {
        const checks = await this.runAllChecks();
        // Determine overall system status
        const hasUnhealthy = checks.some((check)=>check.status === "unhealthy");
        const hasDegraded = checks.some((check)=>check.status === "degraded");
        let overallStatus;
        if (hasUnhealthy) {
            overallStatus = "unhealthy";
        } else if (hasDegraded) {
            overallStatus = "degraded";
        } else {
            overallStatus = "healthy";
        }
        // Calculate metrics
        const counters = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getCounters();
        const totalRequests = Array.from(counters.entries()).filter(([key])=>key.startsWith('api_responses_total')).reduce((sum, [, value])=>sum + value, 0);
        const errorRequests = Array.from(counters.entries()).filter(([key])=>key.includes('status_code=5')).reduce((sum, [, value])=>sum + value, 0);
        const errorRate = totalRequests > 0 ? errorRequests / totalRequests : 0;
        const responseStats = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getHistogramStats('api_request_duration');
        const heapUsed = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getGauges().get('memory_usage_bytes{type=heap_used}') || 0;
        const heapTotal = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getGauges().get('memory_usage_bytes{type=heap_total}') || 1;
        const memoryUsage = heapUsed / heapTotal;
        const activeConnections = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getGauges().get('active_connections') || 0;
        // Get alert counts
        const activeAlerts = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$alerting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["alertingSystem"].getActiveAlerts();
        const criticalAlerts = activeAlerts.filter((alert)=>alert.severity === 'critical').length;
        const highAlerts = activeAlerts.filter((alert)=>alert.severity === 'high').length;
        return {
            status: overallStatus,
            timestamp: new Date(),
            version: process.env.npm_package_version || '1.0.0',
            uptime: Date.now() - this.startTime,
            checks,
            metrics: {
                requests: {
                    total: totalRequests,
                    errors: errorRequests,
                    errorRate
                },
                performance: {
                    avgResponseTime: responseStats?.avg || 0,
                    p95ResponseTime: responseStats?.p95 || 0
                },
                resources: {
                    memoryUsage,
                    activeConnections
                }
            },
            alerts: {
                active: activeAlerts.length,
                critical: criticalAlerts,
                high: highAlerts
            }
        };
    }
}
const healthCheckManager = new HealthCheckManager();
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/api/response-formatter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiErrorCode",
    ()=>ApiErrorCode,
    "ApiResponseFormatter",
    ()=>ApiResponseFormatter,
    "PerformanceTracker",
    ()=>PerformanceTracker,
    "getCorrelationId",
    ()=>getCorrelationId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/monitoring/logger.ts [app-route] (ecmascript)");
;
;
var ApiErrorCode = /*#__PURE__*/ function(ApiErrorCode) {
    // Client Errors (4xx)
    ApiErrorCode["VALIDATION_ERROR"] = "VALIDATION_ERROR";
    ApiErrorCode["AUTHENTICATION_ERROR"] = "AUTHENTICATION_ERROR";
    ApiErrorCode["AUTHORIZATION_ERROR"] = "AUTHORIZATION_ERROR";
    ApiErrorCode["NOT_FOUND"] = "NOT_FOUND";
    ApiErrorCode["CONFLICT"] = "CONFLICT";
    ApiErrorCode["RATE_LIMIT_EXCEEDED"] = "RATE_LIMIT_EXCEEDED";
    ApiErrorCode["PAYLOAD_TOO_LARGE"] = "PAYLOAD_TOO_LARGE";
    ApiErrorCode["UNSUPPORTED_MEDIA_TYPE"] = "UNSUPPORTED_MEDIA_TYPE";
    // Server Errors (5xx)
    ApiErrorCode["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    ApiErrorCode["DATABASE_ERROR"] = "DATABASE_ERROR";
    ApiErrorCode["EXTERNAL_SERVICE_ERROR"] = "EXTERNAL_SERVICE_ERROR";
    ApiErrorCode["CONFIGURATION_ERROR"] = "CONFIGURATION_ERROR";
    ApiErrorCode["SERVICE_UNAVAILABLE"] = "SERVICE_UNAVAILABLE";
    ApiErrorCode["TIMEOUT_ERROR"] = "TIMEOUT_ERROR";
    return ApiErrorCode;
}({});
class ApiResponseFormatter {
    static API_VERSION = '1.0';
    /**
   * Create a successful response
   */ static success(data, meta, statusCode = 200, correlationId) {
        const response = {
            success: true,
            data,
            meta,
            timestamp: new Date().toISOString(),
            correlationId: correlationId || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CorrelationManager"].generateCorrelationId(),
            version: this.API_VERSION
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response, {
            status: statusCode,
            headers: {
                'X-Correlation-ID': response.correlationId,
                'X-API-Version': this.API_VERSION
            }
        });
    }
    /**
   * Create an error response
   */ static error(code, message, statusCode, details, field, correlationId) {
        const response = {
            success: false,
            error: {
                code,
                message,
                details: ("TURBOPACK compile-time truthy", 1) ? details : "TURBOPACK unreachable",
                field
            },
            timestamp: new Date().toISOString(),
            correlationId: correlationId || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CorrelationManager"].generateCorrelationId(),
            version: this.API_VERSION
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response, {
            status: statusCode,
            headers: {
                'X-Correlation-ID': response.correlationId,
                'X-API-Version': this.API_VERSION
            }
        });
    }
    /**
   * Create a paginated response
   */ static paginated(data, pagination, performance, correlationId) {
        return this.success(data, {
            pagination,
            performance
        }, 200, correlationId);
    }
    /**
   * Create a response with warnings
   */ static successWithWarnings(data, warnings, meta, correlationId) {
        return this.success(data, {
            ...meta,
            warnings
        }, 200, correlationId);
    }
    /**
   * Create a deprecated endpoint response
   */ static deprecated(data, deprecation, meta, correlationId) {
        const response = this.success(data, {
            ...meta,
            deprecation
        }, 200, correlationId);
        // Add deprecation headers
        const headers = new Headers(response.headers);
        headers.set('Deprecation', 'true');
        if (deprecation.sunsetDate) {
            headers.set('Sunset', deprecation.sunsetDate);
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](response.body, {
            status: response.status,
            headers
        });
    }
    /**
   * Handle validation errors with field-specific details
   */ static validationError(errors, correlationId) {
        const details = errors.reduce((acc, error)=>{
            acc[error.field] = {
                message: error.message,
                code: error.code || 'INVALID_VALUE'
            };
            return acc;
        }, {});
        return this.error("VALIDATION_ERROR", 'Validation failed', 400, {
            fields: details
        }, undefined, correlationId);
    }
    /**
   * Common error responses
   */ static notFound(resource = 'Resource', correlationId) {
        return this.error("NOT_FOUND", `${resource} not found`, 404, undefined, undefined, correlationId);
    }
    static unauthorized(message = 'Authentication required', correlationId) {
        return this.error("AUTHENTICATION_ERROR", message, 401, undefined, undefined, correlationId);
    }
    static forbidden(message = 'Access denied', correlationId) {
        return this.error("AUTHORIZATION_ERROR", message, 403, undefined, undefined, correlationId);
    }
    static rateLimitExceeded(retryAfter, correlationId) {
        const response = this.error("RATE_LIMIT_EXCEEDED", 'Rate limit exceeded', 429, retryAfter ? {
            retryAfter
        } : undefined, undefined, correlationId);
        if (retryAfter) {
            const headers = new Headers(response.headers);
            headers.set('Retry-After', retryAfter.toString());
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](response.body, {
                status: response.status,
                headers
            });
        }
        return response;
    }
    static internalServerError(message = 'Internal server error', correlationId) {
        return this.error("INTERNAL_SERVER_ERROR", message, 500, undefined, undefined, correlationId);
    }
    static serviceUnavailable(message = 'Service temporarily unavailable', correlationId) {
        return this.error("SERVICE_UNAVAILABLE", message, 503, undefined, undefined, correlationId);
    }
}
function getCorrelationId(request) {
    return request.headers.get('X-Correlation-ID') || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CorrelationManager"].generateCorrelationId();
}
class PerformanceTracker {
    startTime;
    queryCount = 0;
    cacheHit = false;
    constructor(){
        this.startTime = Date.now();
    }
    incrementQueryCount() {
        this.queryCount++;
    }
    setCacheHit(hit) {
        this.cacheHit = hit;
    }
    getMetrics() {
        return {
            executionTime: Date.now() - this.startTime,
            queryCount: this.queryCount > 0 ? this.queryCount : undefined,
            cacheHit: this.cacheHit
        };
    }
}
}),
"[project]/lib/api/versioning.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiVersionManager",
    ()=>ApiVersionManager,
    "FeatureFlags",
    ()=>FeatureFlags,
    "ResponseTransformer",
    ()=>ResponseTransformer,
    "withApiVersioning",
    ()=>withApiVersioning
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
class ApiVersionManager {
    static CURRENT_VERSION = {
        major: 1,
        minor: 0,
        patch: 0
    };
    static SUPPORTED_VERSIONS = [
        {
            major: 1,
            minor: 0,
            patch: 0
        }
    ];
    /**
   * Extract API version from request
   */ static getRequestedVersion(request) {
        // Check Accept header first (preferred method)
        const acceptHeader = request.headers.get('Accept');
        if (acceptHeader) {
            const versionMatch = acceptHeader.match(/application\/vnd\.leadflow\.v(\d+)(?:\.(\d+))?(?:\.(\d+))?/);
            if (versionMatch) {
                return {
                    major: parseInt(versionMatch[1]) || 1,
                    minor: parseInt(versionMatch[2]) || 0,
                    patch: parseInt(versionMatch[3]) || 0
                };
            }
        }
        // Check X-API-Version header
        const versionHeader = request.headers.get('X-API-Version');
        if (versionHeader) {
            const parts = versionHeader.split('.').map(Number);
            return {
                major: parts[0] || 1,
                minor: parts[1] || 0,
                patch: parts[2] || 0
            };
        }
        // Check query parameter
        const versionParam = request.nextUrl.searchParams.get('version');
        if (versionParam) {
            const parts = versionParam.split('.').map(Number);
            return {
                major: parts[0] || 1,
                minor: parts[1] || 0,
                patch: parts[2] || 0
            };
        }
        // Default to current version
        return this.CURRENT_VERSION;
    }
    /**
   * Check if a version is supported
   */ static checkCompatibility(version) {
        const versionString = this.versionToString(version);
        const currentString = this.versionToString(this.CURRENT_VERSION);
        // Check if version is in supported list
        const isSupported = this.SUPPORTED_VERSIONS.some((v)=>this.compareVersions(v, version) === 0);
        if (!isSupported) {
            return {
                supported: false,
                deprecated: true,
                breakingChanges: [
                    'Version no longer supported'
                ]
            };
        }
        // Check for deprecation (versions older than current major version)
        const isDeprecated = version.major < this.CURRENT_VERSION.major;
        let sunsetDate;
        let migrationGuide;
        if (isDeprecated) {
            // Set sunset date to 6 months from now for deprecated versions
            sunsetDate = new Date();
            sunsetDate.setMonth(sunsetDate.getMonth() + 6);
            migrationGuide = `/docs/migration/v${version.major}-to-v${this.CURRENT_VERSION.major}`;
        }
        return {
            supported: true,
            deprecated: isDeprecated,
            sunsetDate,
            migrationGuide
        };
    }
    /**
   * Get current API version
   */ static getCurrentVersion() {
        return {
            ...this.CURRENT_VERSION
        };
    }
    /**
   * Get all supported versions
   */ static getSupportedVersions() {
        return [
            ...this.SUPPORTED_VERSIONS
        ];
    }
    /**
   * Compare two versions
   * Returns: -1 if v1 < v2, 0 if equal, 1 if v1 > v2
   */ static compareVersions(v1, v2) {
        if (v1.major !== v2.major) {
            return v1.major - v2.major;
        }
        if (v1.minor !== v2.minor) {
            return v1.minor - v2.minor;
        }
        return v1.patch - v2.patch;
    }
    /**
   * Convert version object to string
   */ static versionToString(version) {
        return `${version.major}.${version.minor}.${version.patch}`;
    }
    /**
   * Parse version string to object
   */ static parseVersion(versionString) {
        const parts = versionString.split('.').map(Number);
        return {
            major: parts[0] || 1,
            minor: parts[1] || 0,
            patch: parts[2] || 0
        };
    }
}
class ResponseTransformer {
    /**
   * Transform response data based on requested API version
   */ static transformForVersion(data, requestedVersion, currentVersion) {
        // If versions match, no transformation needed
        if (ApiVersionManager.compareVersions(requestedVersion, currentVersion) === 0) {
            return data;
        }
        // Apply version-specific transformations
        return this.applyVersionTransformations(data, requestedVersion, currentVersion);
    }
    /**
   * Apply specific transformations based on version differences
   */ static applyVersionTransformations(data, requestedVersion, currentVersion) {
        let transformedData = {
            ...data
        };
        // Example transformations for different versions
        // In a real implementation, you would have specific transformation rules
        // If requesting older version, apply backward compatibility transformations
        if (ApiVersionManager.compareVersions(requestedVersion, currentVersion) < 0) {
            transformedData = this.applyBackwardCompatibility(transformedData, requestedVersion);
        }
        return transformedData;
    }
    /**
   * Apply backward compatibility transformations
   */ static applyBackwardCompatibility(data, targetVersion) {
        // Example: Remove fields that didn't exist in older versions
        if (targetVersion.major === 1 && targetVersion.minor === 0) {
            // Remove fields introduced in v1.1+
            if (data && typeof data === 'object') {
                const { newFieldIntroducedInV11, ...compatibleData } = data;
                return compatibleData;
            }
        }
        return data;
    }
}
function withApiVersioning(handler) {
    return async (request, ...args)=>{
        const requestedVersion = ApiVersionManager.getRequestedVersion(request);
        const compatibility = ApiVersionManager.checkCompatibility(requestedVersion);
        if (!compatibility.supported) {
            throw new Error(`API version ${ApiVersionManager.versionToString(requestedVersion)} is not supported`);
        }
        // Add version information to request headers for downstream processing
        const modifiedRequest = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextRequest"](request.url, {
            method: request.method,
            headers: {
                ...Object.fromEntries(request.headers.entries()),
                'X-Requested-API-Version': ApiVersionManager.versionToString(requestedVersion),
                'X-API-Compatibility-Status': compatibility.deprecated ? 'deprecated' : 'current'
            },
            body: request.body
        });
        return handler(modifiedRequest, requestedVersion, ...args);
    };
}
class FeatureFlags {
    static FEATURE_VERSIONS = {
        'pagination': {
            major: 1,
            minor: 0,
            patch: 0
        },
        'streaming': {
            major: 1,
            minor: 1,
            patch: 0
        },
        'bulk_operations': {
            major: 1,
            minor: 2,
            patch: 0
        },
        'webhooks': {
            major: 2,
            minor: 0,
            patch: 0
        }
    };
    /**
   * Check if a feature is available in the requested version
   */ static isFeatureAvailable(feature, requestedVersion) {
        const featureVersion = this.FEATURE_VERSIONS[feature];
        if (!featureVersion) {
            return false; // Unknown features are not available
        }
        return ApiVersionManager.compareVersions(requestedVersion, featureVersion) >= 0;
    }
    /**
   * Get all available features for a version
   */ static getAvailableFeatures(requestedVersion) {
        return Object.entries(this.FEATURE_VERSIONS).filter(([_, version])=>ApiVersionManager.compareVersions(requestedVersion, version) >= 0).map(([feature])=>feature);
    }
}
}),
"[project]/lib/monitoring/error-handler.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppError",
    ()=>AppError,
    "CentralizedErrorHandler",
    ()=>CentralizedErrorHandler,
    "ErrorCode",
    ()=>ErrorCode,
    "withErrorHandling",
    ()=>withErrorHandling
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/monitoring/logger.ts [app-route] (ecmascript)");
;
;
;
var ErrorCode = /*#__PURE__*/ function(ErrorCode) {
    ErrorCode["VALIDATION_ERROR"] = "VALIDATION_ERROR";
    ErrorCode["AUTHENTICATION_ERROR"] = "AUTHENTICATION_ERROR";
    ErrorCode["AUTHORIZATION_ERROR"] = "AUTHORIZATION_ERROR";
    ErrorCode["NOT_FOUND"] = "NOT_FOUND";
    ErrorCode["RATE_LIMIT_EXCEEDED"] = "RATE_LIMIT_EXCEEDED";
    ErrorCode["EXTERNAL_SERVICE_ERROR"] = "EXTERNAL_SERVICE_ERROR";
    ErrorCode["DATABASE_ERROR"] = "DATABASE_ERROR";
    ErrorCode["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    ErrorCode["CONFIGURATION_ERROR"] = "CONFIGURATION_ERROR";
    return ErrorCode;
}({});
class AppError extends Error {
    code;
    statusCode;
    details;
    constructor(code, message, statusCode = 500, details){
        super(message), this.code = code, this.statusCode = statusCode, this.details = details;
        this.name = 'AppError';
    }
}
class CentralizedErrorHandler {
    static handleError(error, request, context) {
        const correlationId = context?.requestId || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CorrelationManager"].generateCorrelationId();
        const timestamp = new Date().toISOString();
        // Determine error details
        let errorCode;
        let statusCode;
        let userMessage;
        let details;
        if (error instanceof AppError) {
            errorCode = error.code;
            statusCode = error.statusCode;
            userMessage = error.message;
            details = error.details;
        } else {
            // Handle unknown errors
            errorCode = "INTERNAL_SERVER_ERROR";
            statusCode = 500;
            userMessage = 'An unexpected error occurred';
            details = undefined;
        }
        // Create log context
        const logContext = {
            requestId: correlationId,
            endpoint: request?.nextUrl?.pathname || 'unknown',
            userId: context?.userId,
            metadata: {
                method: request?.method,
                userAgent: request?.headers.get('user-agent'),
                ip: request?.headers.get('x-forwarded-for') || request?.headers.get('x-real-ip'),
                ...details
            }
        };
        // Log the error
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(`${errorCode}: ${error.message}`, error, logContext);
        // Create audit event for security-related errors
        if (this.isSecurityError(errorCode)) {
            const auditEvent = {
                type: 'security_error',
                action: errorCode,
                userId: context?.userId,
                resource: request?.nextUrl?.pathname,
                metadata: {
                    ip: request?.headers.get('x-forwarded-for') || request?.headers.get('x-real-ip'),
                    userAgent: request?.headers.get('user-agent')
                },
                timestamp: new Date(),
                requestId: correlationId
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].audit(auditEvent);
        }
        // Create error response
        const errorResponse = {
            error: {
                code: errorCode,
                message: userMessage,
                details: ("TURBOPACK compile-time truthy", 1) ? details : "TURBOPACK unreachable",
                correlationId,
                timestamp
            }
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(errorResponse, {
            status: statusCode,
            headers: {
                'X-Correlation-ID': correlationId
            }
        });
    }
    static handleAsyncError(error, context) {
        const correlationId = context?.requestId || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CorrelationManager"].generateCorrelationId();
        const logContext = {
            requestId: correlationId,
            endpoint: context?.endpoint || 'async-operation',
            userId: context?.userId,
            metadata: context?.metadata
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(`Async error: ${error.message}`, error, logContext);
        // For critical errors, we might want to send alerts
        if (this.isCriticalError(error)) {
            this.sendCriticalErrorAlert(error, logContext);
        }
    }
    static isSecurityError(errorCode) {
        return [
            "AUTHENTICATION_ERROR",
            "AUTHORIZATION_ERROR",
            "RATE_LIMIT_EXCEEDED"
        ].includes(errorCode);
    }
    static isCriticalError(error) {
        if (error instanceof AppError) {
            return [
                "DATABASE_ERROR",
                "CONFIGURATION_ERROR"
            ].includes(error.code);
        }
        return true; // Unknown errors are considered critical
    }
    static sendCriticalErrorAlert(error, context) {
        // In a real implementation, this would send alerts to monitoring systems
        // For now, we'll just log it as a critical alert
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error('CRITICAL ERROR ALERT', error, {
            ...context,
            metadata: {
                ...context.metadata,
                alertType: 'critical',
                requiresImmedateAttention: true
            }
        });
    }
}
function withErrorHandling(fn, context) {
    return async (...args)=>{
        try {
            return await fn(...args);
        } catch (error) {
            CentralizedErrorHandler.handleAsyncError(error instanceof Error ? error : new Error(String(error)), context);
            throw error;
        }
    };
}
}),
"[project]/lib/monitoring/correlation-middleware.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addCorrelationHeaders",
    ()=>addCorrelationHeaders,
    "withCorrelationId",
    ()=>withCorrelationId,
    "withRequestTracking",
    ()=>withRequestTracking
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/monitoring/logger.ts [app-route] (ecmascript)");
;
function withCorrelationId(request) {
    // Check if correlation ID already exists in headers
    let correlationId = request.headers.get('x-correlation-id');
    if (!correlationId) {
        correlationId = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CorrelationManager"].generateCorrelationId();
    }
    // Store correlation ID for this request
    const requestKey = `${request.method}-${request.nextUrl.pathname}-${Date.now()}`;
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CorrelationManager"].setCorrelationId(requestKey, correlationId);
    return correlationId;
}
function addCorrelationHeaders(response, correlationId) {
    response.headers.set('X-Correlation-ID', correlationId);
    return response;
}
function withRequestTracking(handler, endpoint) {
    return async (request, ...args)=>{
        const startTime = Date.now();
        const correlationId = withCorrelationId(request);
        try {
            const response = await handler(request, ...args);
            const duration = Date.now() - startTime;
            // Add correlation ID to response
            addCorrelationHeaders(response, correlationId);
            // Log successful request
            const { logger } = await __turbopack_context__.A("[project]/lib/monitoring/logger.ts [app-route] (ecmascript, async loader)");
            logger.info('Request completed successfully', {
                requestId: correlationId,
                endpoint,
                duration,
                metadata: {
                    method: request.method,
                    statusCode: response.status,
                    userAgent: request.headers.get('user-agent'),
                    ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
                }
            });
            return response;
        } catch (error) {
            const duration = Date.now() - startTime;
            // Import error handler dynamically to avoid circular dependencies
            const { CentralizedErrorHandler } = await __turbopack_context__.A("[project]/lib/monitoring/error-handler.ts [app-route] (ecmascript, async loader)");
            return CentralizedErrorHandler.handleError(error instanceof Error ? error : new Error(String(error)), request, {
                requestId: correlationId,
                endpoint,
                duration
            });
        }
    };
}
}),
"[project]/lib/validation/schemas.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiKeySchema",
    ()=>apiKeySchema,
    "createCampaignSchema",
    ()=>createCampaignSchema,
    "createLeadSchema",
    ()=>createLeadSchema,
    "credentialsSchema",
    ()=>credentialsSchema,
    "emailSchema",
    ()=>emailSchema,
    "fileUploadSchema",
    ()=>fileUploadSchema,
    "generateLeadsSchema",
    ()=>generateLeadsSchema,
    "leadFiltersSchema",
    ()=>leadFiltersSchema,
    "nonEmptyStringSchema",
    ()=>nonEmptyStringSchema,
    "paginationSchema",
    ()=>paginationSchema,
    "phoneSchema",
    ()=>phoneSchema,
    "sanitizePatterns",
    ()=>sanitizePatterns,
    "sendCampaignSchema",
    ()=>sendCampaignSchema,
    "sessionSchema",
    ()=>sessionSchema,
    "updateCampaignSchema",
    ()=>updateCampaignSchema,
    "updateLeadSchema",
    ()=>updateLeadSchema,
    "uuidSchema",
    ()=>uuidSchema,
    "webhookSchema",
    ()=>webhookSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
const emailSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email('Invalid email format');
const phoneSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/, 'Invalid phone format');
const uuidSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid('Invalid UUID format');
const nonEmptyStringSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Field cannot be empty').trim();
const sanitizePatterns = {
    xss: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|javascript:/gi,
    sqlInjection: /('|(\\')|(;)|(\\)|(--)|(\s+(or|and)\s+))/gi,
    htmlTags: /<[^>]*>/g,
    specialChars: /[<>'"&]/g
};
const createLeadSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: nonEmptyStringSchema.max(255, 'Name too long'),
    email: emailSchema.optional().nullable(),
    phone: phoneSchema.optional().nullable(),
    source: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(500, 'Source too long').optional().nullable(),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'new',
        'contacted',
        'qualified',
        'converted',
        'lost'
    ]).default('new'),
    tags: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(50, 'Tag too long')).max(20, 'Too many tags').default([]),
    notes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(2000, 'Notes too long').optional().nullable(),
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].unknown()).default({})
});
const updateLeadSchema = createLeadSchema.partial();
const leadFiltersSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'new',
        'contacted',
        'qualified',
        'converted',
        'lost'
    ]).optional(),
    tags: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional(),
    search: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(255, 'Search term too long').optional(),
    page: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().min(1).default(1),
    limit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().min(1).max(100).default(20)
});
const createCampaignSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: nonEmptyStringSchema.max(255, 'Campaign name too long'),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'email',
        'sms'
    ]),
    subject: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(255, 'Subject too long').optional().nullable(),
    content: nonEmptyStringSchema.max(10000, 'Content too long'),
    scheduled_at: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime().optional().nullable()
});
const updateCampaignSchema = createCampaignSchema.partial();
const sendCampaignSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    campaignId: uuidSchema
});
const generateLeadsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(100, 'Category too long').default('restaurant'),
    location: nonEmptyStringSchema.max(255, 'Location too long'),
    searchMode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'random',
        'nearest',
        'explore'
    ]).default('random'),
    excludePlaceIds: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(255, 'Place ID too long')).max(100, 'Too many excluded places').default([])
});
const credentialsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    ultramsgInstanceId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(255, 'Instance ID too long').optional(),
    ultramsgToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(500, 'Token too long').optional(),
    gmailAddress: emailSchema.optional(),
    gmailAppPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(255, 'App password too long').optional()
}).refine((data)=>data.ultramsgInstanceId || data.ultramsgToken || data.gmailAddress || data.gmailAppPassword, {
    message: 'At least one credential must be provided'
});
const sessionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    token: nonEmptyStringSchema.max(2000, 'Token too long'),
    refreshToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(2000, 'Refresh token too long').optional()
});
const apiKeySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    key: nonEmptyStringSchema.max(500, 'API key too long'),
    service: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'geoapify',
        'rapidapi',
        'scraperbee',
        'ultramsg'
    ])
});
const paginationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    page: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().min(1).default(1),
    limit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().min(1).max(100).default(20),
    sort: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(50, 'Sort field too long').optional(),
    order: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'asc',
        'desc'
    ]).default('desc')
});
const fileUploadSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    filename: nonEmptyStringSchema.max(255, 'Filename too long'),
    contentType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(100, 'Content type too long'),
    size: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(1).max(10 * 1024 * 1024)
});
const webhookSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    event: nonEmptyStringSchema.max(100, 'Event type too long'),
    data: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].unknown()),
    timestamp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive(),
    signature: nonEmptyStringSchema.max(500, 'Signature too long')
});
}),
"[project]/lib/validation/input-validator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InputValidator",
    ()=>InputValidator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/schemas.ts [app-route] (ecmascript)");
;
class InputValidator {
    /**
   * Validate request data against a Zod schema
   */ static validateRequest(schema, data) {
        try {
            const result = schema.safeParse(data);
            if (result.success) {
                return {
                    success: true,
                    data: result.data
                };
            }
            const errors = result.error.errors.map((err)=>({
                    field: err.path.join('.'),
                    message: err.message,
                    code: err.code
                }));
            return {
                success: false,
                errors
            };
        } catch (error) {
            return {
                success: false,
                errors: [
                    {
                        field: 'root',
                        message: 'Invalid input format',
                        code: 'invalid_type'
                    }
                ]
            };
        }
    }
    /**
   * Sanitize input to prevent XSS and injection attacks
   */ static sanitizeInput(input, type = 'all') {
        if (typeof input !== 'string') {
            return '';
        }
        let sanitized = input;
        switch(type){
            case 'xss':
                sanitized = sanitized.replace(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizePatterns"].xss, '');
                break;
            case 'sql':
                sanitized = sanitized.replace(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizePatterns"].sqlInjection, '');
                break;
            case 'html':
                sanitized = sanitized.replace(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizePatterns"].htmlTags, '');
                break;
            case 'special':
                sanitized = sanitized.replace(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizePatterns"].specialChars, (match)=>{
                    const escapeMap = {
                        '<': '&lt;',
                        '>': '&gt;',
                        '"': '&quot;',
                        "'": '&#x27;',
                        '&': '&amp;'
                    };
                    return escapeMap[match] || match;
                });
                break;
            case 'all':
                // Apply all sanitization patterns
                sanitized = sanitized.replace(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizePatterns"].xss, '');
                sanitized = sanitized.replace(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizePatterns"].sqlInjection, '');
                sanitized = sanitized.replace(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizePatterns"].specialChars, (match)=>{
                    const escapeMap = {
                        '<': '&lt;',
                        '>': '&gt;',
                        '"': '&quot;',
                        "'": '&#x27;',
                        '&': '&amp;'
                    };
                    return escapeMap[match] || match;
                });
                break;
        }
        return sanitized.trim();
    }
    /**
   * Validate API key format and service
   */ static validateApiKey(key, service) {
        if (!key || typeof key !== 'string') {
            return false;
        }
        // Basic format validation based on service
        switch(service){
            case 'geoapify':
                return /^[a-f0-9]{32}$/.test(key);
            case 'rapidapi':
                return /^[a-zA-Z0-9]{50,}$/.test(key);
            case 'scraperbee':
                return /^[a-zA-Z0-9-]{20,}$/.test(key);
            case 'ultramsg':
                return /^[a-zA-Z0-9]{10,}$/.test(key);
            default:
                return key.length >= 10 && key.length <= 500;
        }
    }
    /**
   * Sanitize object recursively
   */ static sanitizeObject(obj, type = 'all') {
        if (obj === null || obj === undefined) {
            return obj;
        }
        if (typeof obj === 'string') {
            return this.sanitizeInput(obj, type);
        }
        if (Array.isArray(obj)) {
            return obj.map((item)=>this.sanitizeObject(item, type));
        }
        if (typeof obj === 'object') {
            const sanitized = {};
            for (const [key, value] of Object.entries(obj)){
                sanitized[key] = this.sanitizeObject(value, type);
            }
            return sanitized;
        }
        return obj;
    }
    /**
   * Validate and sanitize request body
   */ static validateAndSanitize(schema, data, sanitizationType = 'all') {
        // First sanitize the data
        const sanitizedData = this.sanitizeObject(data, sanitizationType);
        // Then validate
        return this.validateRequest(schema, sanitizedData);
    }
    /**
   * Check for common injection patterns
   */ static hasInjectionPatterns(input) {
        if (typeof input !== 'string') {
            return false;
        }
        const injectionPatterns = [
            // SQL injection patterns
            /(\b(union|select|insert|update|delete|drop|create|alter|exec|execute)\b)/gi,
            /(\b(or|and)\s+\d+\s*=\s*\d+)/gi,
            /(;|\||&|`|\$\(|\$\{)/g,
            // XSS patterns
            /<script[^>]*>.*?<\/script>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi,
            // Command injection patterns
            /(\||&|;|`|\$\(|\$\{)/g,
            // Path traversal patterns
            /\.\.[\/\\]/g
        ];
        return injectionPatterns.some((pattern)=>pattern.test(input));
    }
    /**
   * Validate file upload
   */ static validateFileUpload(file) {
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'text/csv',
            'application/json',
            'text/plain'
        ];
        const maxSize = 10 * 1024 * 1024 // 10MB
        ;
        if (!allowedTypes.includes(file.type)) {
            return {
                success: false,
                errors: [
                    {
                        field: 'type',
                        message: 'File type not allowed',
                        code: 'invalid_file_type'
                    }
                ]
            };
        }
        if (file.size > maxSize) {
            return {
                success: false,
                errors: [
                    {
                        field: 'size',
                        message: 'File size exceeds limit',
                        code: 'file_too_large'
                    }
                ]
            };
        }
        // Sanitize filename
        const sanitizedFilename = this.sanitizeInput(file.name, 'special').replace(/[^a-zA-Z0-9.-]/g, '_');
        return {
            success: true,
            data: {
                filename: sanitizedFilename,
                contentType: file.type,
                size: file.size
            }
        };
    }
    /**
   * Validate request headers for security
   */ static validateHeaders(headers) {
        const sanitizedHeaders = {};
        const errors = [];
        for (const [key, value] of Object.entries(headers)){
            if (typeof value !== 'string') {
                continue;
            }
            // Check for injection patterns in headers
            if (this.hasInjectionPatterns(value)) {
                errors.push({
                    field: key,
                    message: 'Invalid header value',
                    code: 'invalid_header'
                });
                continue;
            }
            sanitizedHeaders[key] = this.sanitizeInput(value, 'special');
        }
        return {
            success: errors.length === 0,
            data: sanitizedHeaders,
            errors: errors.length > 0 ? errors : undefined
        };
    }
}
}),
"[project]/lib/rate-limiting/storage.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rateLimitStorage",
    ()=>rateLimitStorage
]);
// In-memory storage for rate limiting (in production, use Redis)
class RateLimitStorage {
    storage = new Map();
    generateKey(key) {
        return `${key.type}:${key.identifier}:${key.window}`;
    }
    async get(key) {
        const storageKey = this.generateKey(key);
        const entry = this.storage.get(storageKey);
        if (!entry) {
            return null;
        }
        // Check if the window has expired
        if (Date.now() > entry.resetTime.getTime()) {
            this.storage.delete(storageKey);
            return null;
        }
        return entry;
    }
    async set(key, entry) {
        const storageKey = this.generateKey(key);
        this.storage.set(storageKey, entry);
    }
    async increment(key) {
        const existing = await this.get(key);
        const now = new Date();
        if (!existing) {
            // Create new entry
            const resetTime = new Date(now.getTime() + key.window * 1000);
            const entry = {
                count: 1,
                windowStart: now,
                resetTime
            };
            await this.set(key, entry);
            return entry;
        }
        // Increment existing entry
        existing.count += 1;
        await this.set(key, existing);
        return existing;
    }
    async reset(key) {
        const storageKey = this.generateKey(key);
        this.storage.delete(storageKey);
    }
    // Cleanup expired entries (should be called periodically)
    cleanup() {
        const now = Date.now();
        for (const [key, entry] of this.storage.entries()){
            if (now > entry.resetTime.getTime()) {
                this.storage.delete(key);
            }
        }
    }
}
const rateLimitStorage = new RateLimitStorage();
// Cleanup expired entries every 5 minutes
setInterval(()=>{
    rateLimitStorage.cleanup();
}, 5 * 60 * 1000);
}),
"[project]/lib/rate-limiting/rate-limiter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rateLimiter",
    ()=>rateLimiter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$storage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/rate-limiting/storage.ts [app-route] (ecmascript)");
;
class MultiTierRateLimiter {
    async checkLimit(identifier, limits) {
        // Check all limits and return the most restrictive result
        let mostRestrictive = {
            allowed: true,
            remaining: Infinity,
            resetTime: new Date(Date.now() + 60000)
        };
        for (const limit of limits){
            const key = {
                type: limit.tier,
                identifier,
                window: limit.window
            };
            const entry = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$storage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rateLimitStorage"].get(key);
            const now = new Date();
            if (!entry) {
                // No existing entry, all good
                const remaining = limit.maxRequests - 1 // Account for this request
                ;
                const resetTime = new Date(now.getTime() + limit.window * 1000);
                if (remaining < mostRestrictive.remaining) {
                    mostRestrictive = {
                        allowed: true,
                        remaining,
                        resetTime
                    };
                }
                continue;
            }
            const remaining = Math.max(0, limit.maxRequests - entry.count);
            const allowed = entry.count < limit.maxRequests;
            if (!allowed || remaining < mostRestrictive.remaining) {
                mostRestrictive = {
                    allowed,
                    remaining,
                    resetTime: entry.resetTime,
                    retryAfter: allowed ? undefined : Math.ceil((entry.resetTime.getTime() - now.getTime()) / 1000)
                };
            }
            // If any limit is exceeded, deny the request
            if (!allowed) {
                mostRestrictive.allowed = false;
                break;
            }
        }
        return mostRestrictive;
    }
    async incrementCounter(identifier, limits) {
        // Increment counters for all applicable limits
        for (const limit of limits){
            const key = {
                type: limit.tier,
                identifier,
                window: limit.window
            };
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$storage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rateLimitStorage"].increment(key);
        }
    }
    async resetCounter(identifier, limits) {
        // Reset counters for all applicable limits
        for (const limit of limits){
            const key = {
                type: limit.tier,
                identifier,
                window: limit.window
            };
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$storage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rateLimitStorage"].reset(key);
        }
    }
    async getUsage(identifier, limits) {
        // Return usage stats for the most restrictive limit
        let mostRestrictive = {
            current: 0,
            limit: Infinity,
            resetTime: new Date(Date.now() + 60000),
            windowStart: new Date()
        };
        for (const limit of limits){
            const key = {
                type: limit.tier,
                identifier,
                window: limit.window
            };
            const entry = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$storage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rateLimitStorage"].get(key);
            if (entry) {
                const remaining = Math.max(0, limit.maxRequests - entry.count);
                if (remaining < mostRestrictive.limit - mostRestrictive.current) {
                    mostRestrictive = {
                        current: entry.count,
                        limit: limit.maxRequests,
                        resetTime: entry.resetTime,
                        windowStart: entry.windowStart
                    };
                }
            }
        }
        return mostRestrictive;
    }
}
const rateLimiter = new MultiTierRateLimiter();
}),
"[project]/lib/rate-limiting/config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RATE_LIMIT_CONFIG",
    ()=>RATE_LIMIT_CONFIG,
    "getRateLimitsForEndpoint",
    ()=>getRateLimitsForEndpoint,
    "getRateLimitsForUser",
    ()=>getRateLimitsForUser
]);
const RATE_LIMIT_CONFIG = {
    // Global limits apply to all requests
    global: [
        {
            window: 60,
            maxRequests: 1000,
            tier: 'global'
        },
        {
            window: 3600,
            maxRequests: 10000,
            tier: 'global'
        }
    ],
    // User limits based on subscription plan
    user: {
        free: [
            {
                window: 60,
                maxRequests: 10,
                tier: 'user'
            },
            {
                window: 3600,
                maxRequests: 100,
                tier: 'user'
            },
            {
                window: 86400,
                maxRequests: 500,
                tier: 'user'
            }
        ],
        starter: [
            {
                window: 60,
                maxRequests: 30,
                tier: 'user'
            },
            {
                window: 3600,
                maxRequests: 500,
                tier: 'user'
            },
            {
                window: 86400,
                maxRequests: 2000,
                tier: 'user'
            }
        ],
        pro: [
            {
                window: 60,
                maxRequests: 100,
                tier: 'user'
            },
            {
                window: 3600,
                maxRequests: 2000,
                tier: 'user'
            },
            {
                window: 86400,
                maxRequests: 10000,
                tier: 'user'
            }
        ]
    },
    // IP-based limits to prevent abuse
    ip: [
        {
            window: 60,
            maxRequests: 60,
            tier: 'ip'
        },
        {
            window: 3600,
            maxRequests: 1000,
            tier: 'ip'
        }
    ],
    // Endpoint-specific limits for expensive operations
    endpoint: {
        '/api/leads/generate': [
            {
                window: 60,
                maxRequests: 5,
                tier: 'endpoint'
            },
            {
                window: 3600,
                maxRequests: 20,
                tier: 'endpoint'
            }
        ],
        '/api/leads/import': [
            {
                window: 60,
                maxRequests: 2,
                tier: 'endpoint'
            },
            {
                window: 3600,
                maxRequests: 10,
                tier: 'endpoint'
            }
        ],
        '/api/campaigns/email/send': [
            {
                window: 60,
                maxRequests: 10,
                tier: 'endpoint'
            },
            {
                window: 3600,
                maxRequests: 100,
                tier: 'endpoint'
            }
        ],
        '/api/campaigns/sms/send': [
            {
                window: 60,
                maxRequests: 5,
                tier: 'endpoint'
            },
            {
                window: 3600,
                maxRequests: 50,
                tier: 'endpoint'
            }
        ]
    }
};
function getRateLimitsForUser(subscriptionPlan) {
    return RATE_LIMIT_CONFIG.user[subscriptionPlan] || RATE_LIMIT_CONFIG.user.free;
}
function getRateLimitsForEndpoint(endpoint) {
    return RATE_LIMIT_CONFIG.endpoint[endpoint] || [];
}
}),
"[project]/lib/api/handler-wrapper.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createApiHandler",
    ()=>createApiHandler,
    "createHealthCheckHandler",
    ()=>createHealthCheckHandler,
    "createPaginatedHandler",
    ()=>createPaginatedHandler,
    "createStreamingHandler",
    ()=>createStreamingHandler,
    "extractFilterParams",
    ()=>extractFilterParams,
    "extractPaginationParams",
    ()=>extractPaginationParams,
    "extractSortParams",
    ()=>extractSortParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2d$formatter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/response-formatter.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$versioning$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/versioning.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$error$2d$handler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/monitoring/error-handler.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$correlation$2d$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/monitoring/correlation-middleware.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/monitoring/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$input$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/input-validator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$rate$2d$limiter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/rate-limiting/rate-limiter.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/rate-limiting/config.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
function createApiHandler(handler, options = {}) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$correlation$2d$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withRequestTracking"])(async (request1)=>{
        const correlationId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2d$formatter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCorrelationId"])(request1);
        const performance = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2d$formatter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PerformanceTracker"]();
        try {
            // Get API version information
            const requestedVersion = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$versioning$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiVersionManager"].getRequestedVersion(request1);
            const compatibility = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$versioning$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiVersionManager"].checkCompatibility(requestedVersion);
            // Check if version is supported
            if (!compatibility.supported) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2d$formatter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiResponseFormatter"].error(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2d$formatter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiErrorCode"].UNSUPPORTED_MEDIA_TYPE, `API version ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$versioning$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiVersionManager"].versionToString(requestedVersion)} is not supported`, 400, {
                    supportedVersions: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$versioning$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiVersionManager"].getSupportedVersions().map((v)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$versioning$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiVersionManager"].versionToString(v))
                }, undefined, correlationId);
            }
            // Extract user information (this would typically come from authentication middleware)
            const userId = request1.headers.get('x-user-id');
            const userPlan = request1.headers.get('x-subscription-plan') || 'free';
            // Rate limiting check
            if (options.rateLimit && userId) {
                performance.incrementQueryCount();
                const rateLimits = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRateLimitsForUser"])(userPlan);
                const rateLimitResult = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$rate$2d$limiter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rateLimiter"].checkLimit(userId, rateLimits);
                if (!rateLimitResult.allowed) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2d$formatter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiResponseFormatter"].rateLimitExceeded(rateLimitResult.retryAfter, correlationId);
                }
            }
            // Input validation
            if (options.validateInput && options.schema) {
                try {
                    const body = await request1.json();
                    const validationResult = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$input$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["inputValidator"].validateRequest(options.schema, body);
                    if (!validationResult.success) {
                        const errors = validationResult.errors?.map((error)=>({
                                field: error.path?.join('.') || 'unknown',
                                message: error.message,
                                code: error.code
                            })) || [];
                        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2d$formatter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiResponseFormatter"].validationError(errors, correlationId);
                    }
                } catch (error) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2d$formatter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiResponseFormatter"].error(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2d$formatter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiErrorCode"].VALIDATION_ERROR, 'Invalid JSON in request body', 400, undefined, undefined, correlationId);
                }
            }
            // Create API context
            const context = {
                correlationId,
                requestedVersion,
                compatibility,
                performance,
                userId: userId || undefined,
                userPlan
            };
            // Execute the handler
            const result = await handler(request1, context);
            // If handler returns NextResponse directly, return it
            if (result instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]) {
                return result;
            }
            // Transform response data for version compatibility
            const transformedData = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$versioning$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResponseTransformer"].transformForVersion(result, requestedVersion, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$versioning$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiVersionManager"].getCurrentVersion());
            // Create response with performance metrics
            const meta = {
                performance: performance.getMetrics(),
                ...compatibility.deprecated && {
                    deprecation: {
                        deprecated: true,
                        deprecatedSince: compatibility.sunsetDate ? new Date(compatibility.sunsetDate.getTime() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
                        sunsetDate: compatibility.sunsetDate?.toISOString(),
                        migrationGuide: compatibility.migrationGuide
                    }
                },
                ...options.deprecation && {
                    deprecation: {
                        deprecated: options.deprecation.deprecated,
                        sunsetDate: options.deprecation.sunsetDate,
                        migrationGuide: options.deprecation.migrationGuide
                    }
                }
            };
            // Return formatted response
            if (compatibility.deprecated || options.deprecation?.deprecated) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2d$formatter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiResponseFormatter"].deprecated(transformedData, meta.deprecation, {
                    performance: meta.performance
                }, correlationId);
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2d$formatter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiResponseFormatter"].success(transformedData, meta, 200, correlationId);
        } catch (error) {
            // Handle different types of errors
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$error$2d$handler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2d$formatter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiResponseFormatter"].error(error.code, error.message, error.statusCode, error.details, undefined, correlationId);
            }
            // Log unexpected errors
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error('Unexpected API error', error, {
                requestId: correlationId,
                endpoint: request1.nextUrl.pathname,
                method: request1.method,
                metadata: {
                    userAgent: request1.headers.get('user-agent'),
                    ip: request1.headers.get('x-forwarded-for')
                }
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2d$formatter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiResponseFormatter"].internalServerError('An unexpected error occurred', correlationId);
        }
    }, request.nextUrl.pathname);
}
function createPaginatedHandler(handler, options = {}) {
    return createApiHandler(async (request1, context)=>{
        const result = await handler(request1, context);
        const totalPages = Math.ceil(result.total / result.limit);
        const hasNext = result.page < totalPages;
        const hasPrevious = result.page > 1;
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2d$formatter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiResponseFormatter"].paginated(result.data, {
            page: result.page,
            limit: result.limit,
            total: result.total,
            totalPages,
            hasNext,
            hasPrevious
        }, context.performance.getMetrics(), context.correlationId);
    }, options);
}
function createStreamingHandler(handler, options = {}) {
    return createApiHandler(async (request1, context)=>{
        const stream = await handler(request1, context);
        // For streaming responses, we return the stream directly
        // The response formatting is handled within the stream
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](stream, {
            headers: {
                'Content-Type': 'application/json',
                'Transfer-Encoding': 'chunked',
                'X-Correlation-ID': context.correlationId,
                'X-API-Version': __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$versioning$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiVersionManager"].versionToString(context.requestedVersion)
            }
        });
    }, options);
}
function createHealthCheckHandler(handler, options = {}) {
    return createApiHandler(async (request1, context)=>{
        const result = await handler(request1, context);
        const statusCode = result.status === 'healthy' ? 200 : result.status === 'degraded' ? 200 : 503;
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2d$formatter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiResponseFormatter"].success(result, {
            performance: context.performance.getMetrics()
        }, statusCode, context.correlationId);
    }, options);
}
function extractPaginationParams(request1) {
    const { searchParams } = request1.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')));
    return {
        page,
        limit
    };
}
function extractSortParams(request1) {
    const { searchParams } = request1.nextUrl;
    const sortBy = searchParams.get('sortBy') || undefined;
    const sortOrder = searchParams.get('sortOrder') === 'desc' ? 'desc' : 'asc';
    return {
        sortBy,
        sortOrder
    };
}
function extractFilterParams(request1) {
    const { searchParams } = request1.nextUrl;
    const filters = {};
    for (const [key, value] of searchParams.entries()){
        if (![
            'page',
            'limit',
            'sortBy',
            'sortOrder'
        ].includes(key)) {
            filters[key] = value;
        }
    }
    return filters;
}
}),
"[project]/app/api/health/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/config/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config/validation.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$startup$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config/startup.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2f$connection$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/database/connection-manager.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2f$performance$2d$monitor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/database/performance-monitor.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$health$2d$checks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/monitoring/health-checks.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/monitoring/metrics.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$handler$2d$wrapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/handler-wrapper.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2f$connection$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2f$connection$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
async function healthHandler(request, context) {
    const timer = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PerformanceMonitor"].trackApiCall('/api/health', 'GET');
    try {
        // Get comprehensive system health using new monitoring system
        const systemHealth = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$health$2d$checks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["healthCheckManager"].getSystemHealth();
        // Get legacy health checks for backward compatibility
        const configHealth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getConfigHealthStatus"])();
        const startupValidation = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$startup$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["startupValidator"].validateStartupConfiguration();
        const dbStatus = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2f$connection$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectionManager"].getStatus();
        const dbMetrics = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2f$connection$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectionManager"].getMetrics();
        const perfStats = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2f$performance$2d$monitor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["performanceMonitor"].getStats();
        // Combine new and legacy health information
        const healthData = {
            // New comprehensive health status
            status: systemHealth.status,
            timestamp: systemHealth.timestamp.toISOString(),
            version: systemHealth.version,
            uptime: systemHealth.uptime,
            // Detailed health checks
            checks: {
                ...systemHealth.checks,
                // Legacy compatibility fields
                configuration: {
                    isValid: configHealth.isValid,
                    missingRequired: configHealth.missingRequired,
                    invalidValues: configHealth.invalidValues,
                    warnings: configHealth.warnings
                },
                startup: {
                    isValid: startupValidation.success,
                    errors: startupValidation.errors,
                    warnings: startupValidation.warnings
                },
                database: {
                    isHealthy: dbStatus.isHealthy,
                    activeConnections: dbStatus.activeConnections,
                    totalRequests: dbMetrics.totalRequests,
                    failedRequests: dbMetrics.failedRequests,
                    averageResponseTime: dbMetrics.averageResponseTime,
                    lastHealthCheck: dbMetrics.lastHealthCheck,
                    performance: {
                        totalQueries: perfStats.totalQueries,
                        averageResponseTime: perfStats.averageResponseTime,
                        errorRate: perfStats.errorRate,
                        queriesPerSecond: perfStats.queriesPerSecond,
                        slowQueriesCount: perfStats.slowQueries.length
                    }
                },
                services: {
                    firebase: process.env.FIREBASE_PROJECT_ID ? "configured" : "missing",
                    database: dbStatus.isHealthy ? "healthy" : "unhealthy",
                    encryption: process.env.CREDENTIALS_ENCRYPTION_KEY ? "configured" : "missing",
                    geoapify: process.env.GEOAPIFY_API_KEY ? "configured" : "missing",
                    rapidapi: process.env.RAPIDAPI_LOCAL_BUSINESS_KEY ? "configured" : "optional",
                    scraperbee: process.env.SCRAPERBEE_API_KEY ? "configured" : "optional"
                }
            },
            // Performance metrics
            metrics: systemHealth.metrics,
            // Active alerts
            alerts: systemHealth.alerts
        };
        timer.end(healthData.status === 'healthy' ? 200 : healthData.status === 'degraded' ? 200 : 503);
        return healthData;
    } catch (error) {
        timer.end(500);
        throw error; // Let the wrapper handle the error formatting
    }
}
const GET = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$handler$2d$wrapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createHealthCheckHandler"])(healthHandler);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__12e7980f._.js.map