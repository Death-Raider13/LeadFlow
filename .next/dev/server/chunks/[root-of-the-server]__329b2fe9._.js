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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

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
"[project]/lib/auth/enhanced-auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "EnhancedAuthSystem",
    ()=>EnhancedAuthSystem,
    "enhancedAuth",
    ()=>enhancedAuth,
    "validateSessionWithAudit",
    ()=>validateSessionWithAudit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase/admin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
class EnhancedAuthSystem {
    static instance = null;
    auditLogs = [];
    activeSessions = new Map();
    static getInstance() {
        if (!EnhancedAuthSystem.instance) {
            EnhancedAuthSystem.instance = new EnhancedAuthSystem();
        }
        return EnhancedAuthSystem.instance;
    }
    // Validate session with enhanced integrity checking
    async validateSession(token) {
        const sessionId = this.generateSessionId();
        try {
            // Verify token integrity and expiration
            const decodedToken = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["firebaseAdminAuth"].verifySessionCookie(token, true);
            // Check if token is expired
            const now = Date.now() / 1000;
            if (decodedToken.exp <= now) {
                return {
                    user: null,
                    isValid: false,
                    expiresAt: new Date(decodedToken.exp * 1000),
                    permissions: [],
                    sessionId
                };
            }
            // Get user permissions
            const permissions = await this.getUserPermissions(decodedToken.uid);
            // Update session tracking
            this.updateSessionAccess(sessionId, decodedToken.uid);
            return {
                user: {
                    uid: decodedToken.uid,
                    email: decodedToken.email || null,
                    displayName: decodedToken.name || null,
                    emailVerified: decodedToken.email_verified || false,
                    customClaims: decodedToken
                },
                isValid: true,
                expiresAt: new Date(decodedToken.exp * 1000),
                permissions,
                sessionId
            };
        } catch (error) {
            // Log failed validation attempt
            this.logAuditEvent({
                sessionId,
                userId: "unknown",
                action: "access",
                metadata: {
                    ipAddress: "unknown",
                    userAgent: "unknown",
                    timestamp: new Date(),
                    sessionId,
                    loginMethod: "token"
                },
                success: false,
                errorMessage: error instanceof Error ? error.message : String(error)
            });
            return {
                user: null,
                isValid: false,
                expiresAt: new Date(),
                permissions: [],
                sessionId
            };
        }
    }
    // Refresh token with validation
    async refreshToken(refreshToken) {
        const sessionId = this.generateSessionId();
        try {
            // Verify the refresh token
            const decodedToken = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["firebaseAdminAuth"].verifyIdToken(refreshToken);
            // Create new session cookie
            const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
            ;
            const sessionCookie = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["firebaseAdminAuth"].createSessionCookie(refreshToken, {
                expiresIn
            });
            const expiresAt = new Date(Date.now() + expiresIn);
            // Log successful refresh
            this.logAuditEvent({
                sessionId,
                userId: decodedToken.uid,
                action: "refresh",
                metadata: {
                    ipAddress: "unknown",
                    userAgent: "unknown",
                    timestamp: new Date(),
                    sessionId,
                    loginMethod: "token"
                },
                success: true
            });
            return {
                accessToken: sessionCookie,
                refreshToken: refreshToken,
                expiresAt,
                sessionId
            };
        } catch (error) {
            this.logAuditEvent({
                sessionId,
                userId: "unknown",
                action: "refresh",
                metadata: {
                    ipAddress: "unknown",
                    userAgent: "unknown",
                    timestamp: new Date(),
                    sessionId,
                    loginMethod: "token"
                },
                success: false,
                errorMessage: error instanceof Error ? error.message : String(error)
            });
            throw new Error(`Token refresh failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    // Revoke session
    async revokeSession(sessionId) {
        try {
            const session = this.activeSessions.get(sessionId);
            if (session) {
                // Revoke all refresh tokens for the user
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["firebaseAdminAuth"].revokeRefreshTokens(session.userId);
                // Remove from active sessions
                this.activeSessions.delete(sessionId);
                // Log revocation
                this.logAuditEvent({
                    sessionId,
                    userId: session.userId,
                    action: "revoke",
                    metadata: session.metadata,
                    success: true
                });
            }
        } catch (error) {
            this.logAuditEvent({
                sessionId,
                userId: "unknown",
                action: "revoke",
                metadata: {
                    ipAddress: "unknown",
                    userAgent: "unknown",
                    timestamp: new Date(),
                    sessionId,
                    loginMethod: "token"
                },
                success: false,
                errorMessage: error instanceof Error ? error.message : String(error)
            });
            throw error;
        }
    }
    // Audit login with metadata
    async auditLogin(userId, metadata) {
        // Store session information
        this.activeSessions.set(metadata.sessionId, {
            userId,
            createdAt: metadata.timestamp,
            lastAccessed: metadata.timestamp,
            metadata
        });
        // Log login event
        this.logAuditEvent({
            sessionId: metadata.sessionId,
            userId,
            action: "login",
            metadata,
            success: true
        });
    }
    // Get user permissions (placeholder implementation)
    async getUserPermissions(userId) {
        // In a real implementation, this would fetch from database
        // For now, return basic permissions
        return [
            {
                resource: "leads",
                action: "read",
                granted: true
            },
            {
                resource: "leads",
                action: "write",
                granted: true
            },
            {
                resource: "campaigns",
                action: "read",
                granted: true
            },
            {
                resource: "campaigns",
                action: "write",
                granted: true
            }
        ];
    }
    // Generate unique session ID
    generateSessionId() {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(32).toString("hex");
    }
    // Update session access time
    updateSessionAccess(sessionId, userId) {
        const session = this.activeSessions.get(sessionId);
        if (session) {
            session.lastAccessed = new Date();
        }
    }
    // Log audit events
    logAuditEvent(event) {
        this.auditLogs.push(event);
        // In production, this should write to a persistent audit log
        console.log(`[AUTH AUDIT] ${event.action.toUpperCase()} - User: ${event.userId}, Session: ${event.sessionId}, Success: ${event.success}`);
        // Keep only last 1000 audit logs in memory
        if (this.auditLogs.length > 1000) {
            this.auditLogs = this.auditLogs.slice(-1000);
        }
    }
    // Get audit logs for a user
    getAuditLogs(userId) {
        if (userId) {
            return this.auditLogs.filter((log)=>log.userId === userId);
        }
        return [
            ...this.auditLogs
        ];
    }
    // Get active sessions
    getActiveSessions(userId) {
        const sessions = Array.from(this.activeSessions.entries()).map(([sessionId, session])=>({
                sessionId,
                ...session
            }));
        if (userId) {
            return sessions.filter((session)=>session.userId === userId);
        }
        return sessions;
    }
    // Clean up expired sessions
    cleanupExpiredSessions() {
        const now = new Date();
        const maxAge = 24 * 60 * 60 * 1000 // 24 hours
        ;
        for (const [sessionId, session] of this.activeSessions.entries()){
            if (now.getTime() - session.lastAccessed.getTime() > maxAge) {
                this.activeSessions.delete(sessionId);
                this.logAuditEvent({
                    sessionId,
                    userId: session.userId,
                    action: "logout",
                    metadata: session.metadata,
                    success: true
                });
            }
        }
    }
}
const enhancedAuth = EnhancedAuthSystem.getInstance();
async function validateSessionWithAudit(token, ipAddress, userAgent) {
    const result = await enhancedAuth.validateSession(token);
    if (result.isValid && result.user) {
        // Log successful access
        await enhancedAuth.auditLogin(result.user.uid, {
            ipAddress,
            userAgent,
            timestamp: new Date(),
            sessionId: result.sessionId,
            loginMethod: "token"
        });
    }
    return result;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/security/cookie-config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SecureCookieManager",
    ()=>SecureCookieManager
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
class SecureCookieManager {
    static COOKIE_SECRET = process.env.COOKIE_SECRET || 'default-secret-change-in-production';
    static SESSION_COOKIE_NAME = 'firebaseSession';
    static CSRF_COOKIE_NAME = 'csrf-token';
    /**
   * Get secure cookie configuration based on environment
   */ static getSecureConfig(isProduction = ("TURBOPACK compile-time value", "development") === 'production') {
        return {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax',
            path: '/',
            priority: 'high'
        };
    }
    /**
   * Create a secure session cookie
   */ static createSessionCookie(response, sessionToken, maxAge = 60 * 60 * 24 * 14 // 14 days
    ) {
        const config = this.getSecureConfig();
        // Sign the cookie value for integrity
        const signedValue = this.signCookieValue(sessionToken);
        response.cookies.set(this.SESSION_COOKIE_NAME, signedValue, {
            ...config,
            maxAge
        });
        // Set additional security headers
        response.headers.set('X-Content-Type-Options', 'nosniff');
        response.headers.set('X-Frame-Options', 'DENY');
        response.headers.set('X-XSS-Protection', '1; mode=block');
        return response;
    }
    /**
   * Create a CSRF protection cookie
   */ static createCSRFCookie(response) {
        const config = this.getSecureConfig();
        const csrfToken = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(32).toString('hex');
        response.cookies.set(this.CSRF_COOKIE_NAME, csrfToken, {
            ...config,
            httpOnly: false,
            maxAge: 60 * 60 * 24
        });
        return {
            response,
            csrfToken
        };
    }
    /**
   * Clear session cookie securely
   */ static clearSessionCookie(response) {
        const config = this.getSecureConfig();
        response.cookies.set(this.SESSION_COOKIE_NAME, '', {
            ...config,
            maxAge: 0,
            expires: new Date(0)
        });
        return response;
    }
    /**
   * Clear all authentication cookies
   */ static clearAllAuthCookies(response) {
        const config = this.getSecureConfig();
        const cookiesToClear = [
            this.SESSION_COOKIE_NAME,
            this.CSRF_COOKIE_NAME,
            'auth-token',
            'refresh-token'
        ];
        cookiesToClear.forEach((cookieName)=>{
            response.cookies.set(cookieName, '', {
                ...config,
                maxAge: 0,
                expires: new Date(0)
            });
        });
        return response;
    }
    /**
   * Validate cookie integrity
   */ static validateCookie(cookieValue) {
        if (!cookieValue) {
            return {
                isValid: false,
                error: 'Cookie value is missing'
            };
        }
        try {
            // Check if cookie is signed
            if (cookieValue.startsWith('s:')) {
                const unsignedValue = this.unsignCookieValue(cookieValue);
                if (!unsignedValue) {
                    return {
                        isValid: false,
                        error: 'Cookie signature is invalid'
                    };
                }
                return {
                    isValid: true,
                    value: unsignedValue
                };
            }
            // For unsigned cookies, return as-is but mark as potentially insecure
            return {
                isValid: true,
                value: cookieValue
            };
        } catch (error) {
            return {
                isValid: false,
                error: `Cookie validation failed: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
   * Sign cookie value for integrity protection
   */ static signCookieValue(value) {
        const signature = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac('sha256', this.COOKIE_SECRET).update(value).digest('base64').replace(/=+$/, '');
        return `s:${value}.${signature}`;
    }
    /**
   * Unsign and validate cookie value
   */ static unsignCookieValue(signedValue) {
        if (!signedValue.startsWith('s:')) {
            return null;
        }
        const value = signedValue.slice(2);
        const lastDotIndex = value.lastIndexOf('.');
        if (lastDotIndex === -1) {
            return null;
        }
        const originalValue = value.slice(0, lastDotIndex);
        const signature = value.slice(lastDotIndex + 1);
        const expectedSignature = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac('sha256', this.COOKIE_SECRET).update(originalValue).digest('base64').replace(/=+$/, '');
        // Use timing-safe comparison
        if (this.timingSafeEqual(signature, expectedSignature)) {
            return originalValue;
        }
        return null;
    }
    /**
   * Timing-safe string comparison
   */ static timingSafeEqual(a, b) {
        if (a.length !== b.length) {
            return false;
        }
        let result = 0;
        for(let i = 0; i < a.length; i++){
            result |= a.charCodeAt(i) ^ b.charCodeAt(i);
        }
        return result === 0;
    }
    /**
   * Check if cookie configuration is secure
   */ static validateCookieConfig(options) {
        const warnings = [];
        let isSecure = true;
        // Check for production security requirements
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        // Check for general security best practices
        if (!options.path) {
            warnings.push('Cookie should have explicit path');
        }
        if (options.maxAge && options.maxAge > 60 * 60 * 24 * 30) {
            warnings.push('Cookie maxAge is longer than 30 days, consider shorter duration');
        }
        return {
            isSecure,
            warnings
        };
    }
    /**
   * Get cookie security headers
   */ static getSecurityHeaders() {
        return {
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
        };
    }
    /**
   * Apply security headers to response
   */ static applySecurityHeaders(response) {
        const headers = this.getSecurityHeaders();
        Object.entries(headers).forEach(([key, value])=>{
            response.headers.set(key, value);
        });
        return response;
    }
}
}),
"[project]/lib/firebase/server-auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "SESSION_COOKIE_NAME",
    ()=>SESSION_COOKIE_NAME,
    "createEnhancedSession",
    ()=>createEnhancedSession,
    "getServerUser",
    ()=>getServerUser,
    "revokeEnhancedSession",
    ()=>revokeEnhancedSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$enhanced$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/enhanced-auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2f$cookie$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/security/cookie-config.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$enhanced$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$enhanced$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const SESSION_COOKIE_NAME = "firebaseSession";
async function getServerUser() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const headersList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["headers"])();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionCookie) {
        return null;
    }
    try {
        // Validate cookie integrity first
        const cookieValidation = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2f$cookie$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SecureCookieManager"].validateCookie(sessionCookie);
        if (!cookieValidation.isValid) {
            console.warn("Invalid cookie detected:", cookieValidation.error);
            return null;
        }
        const validatedCookieValue = cookieValidation.value || sessionCookie;
        // Get client IP and user agent for audit logging
        const ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
        const userAgent = headersList.get("user-agent") || "unknown";
        // Use enhanced authentication with audit logging
        const authResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$enhanced$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateSessionWithAudit"])(validatedCookieValue, ipAddress, userAgent);
        return authResult.isValid ? authResult.user : null;
    } catch (error) {
        console.error("Enhanced authentication error:", error);
        return null;
    }
}
async function createEnhancedSession(idToken, ipAddress, userAgent) {
    try {
        // Create session cookie with enhanced tracking
        const tokenPair = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$enhanced$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["enhancedAuth"].refreshToken(idToken);
        return {
            sessionCookie: tokenPair.accessToken,
            expiresAt: tokenPair.expiresAt
        };
    } catch (error) {
        throw new Error(`Failed to create enhanced session: ${error instanceof Error ? error.message : String(error)}`);
    }
}
async function revokeEnhancedSession(sessionId) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$enhanced$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["enhancedAuth"].revokeSession(sessionId);
    } catch (error) {
        console.error("Failed to revoke session:", error);
        throw error;
    }
}
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
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
            /(\||`|\$\(|\$\{)/g,
            // XSS patterns
            /<script[^>]*>.*?<\/script>/gi,
            /javascript:/gi,
            // Command injection patterns
            /(\||`|\$\(|\$\{)/g,
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
"[project]/lib/validation/middleware.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createValidationErrorResponse",
    ()=>createValidationErrorResponse,
    "createValidationMiddleware",
    ()=>createValidationMiddleware,
    "getValidatedData",
    ()=>getValidatedData,
    "validateRuntimeType",
    ()=>validateRuntimeType,
    "withValidation",
    ()=>withValidation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$input$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/input-validator.ts [app-route] (ecmascript)");
;
;
function createValidationMiddleware(options = {}) {
    return async function validationMiddleware(request, handler) {
        const { bodySchema, querySchema, sanitizationType = 'all', validateHeaders = true } = options;
        const validatedRequest = request;
        const errors = [];
        try {
            // Validate and sanitize request body
            if (bodySchema && (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH')) {
                try {
                    const body = await request.json();
                    const bodyResult = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$input$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InputValidator"].validateAndSanitize(bodySchema, body, sanitizationType);
                    if (!bodyResult.success) {
                        errors.push(...bodyResult.errors || []);
                    } else {
                        validatedRequest.validatedBody = bodyResult.data;
                    }
                } catch (error) {
                    errors.push({
                        field: 'body',
                        message: 'Invalid JSON format',
                        code: 'invalid_json'
                    });
                }
            }
            // Validate and sanitize query parameters
            if (querySchema) {
                const searchParams = request.nextUrl.searchParams;
                const query = {};
                for (const [key, value] of searchParams.entries()){
                    query[key] = value;
                }
                const queryResult = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$input$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InputValidator"].validateAndSanitize(querySchema, query, sanitizationType);
                if (!queryResult.success) {
                    errors.push(...queryResult.errors || []);
                } else {
                    validatedRequest.validatedQuery = queryResult.data;
                }
            }
            // Validate headers
            if (validateHeaders) {
                const headers = {};
                request.headers.forEach((value, key)=>{
                    headers[key] = value;
                });
                const headersResult = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$input$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InputValidator"].validateHeaders(headers);
                if (!headersResult.success) {
                    errors.push(...headersResult.errors || []);
                } else {
                    validatedRequest.validatedHeaders = headersResult.data;
                }
            }
            // Return validation errors if any
            if (errors.length > 0) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Validation failed',
                    details: errors,
                    timestamp: new Date().toISOString()
                }, {
                    status: 400
                });
            }
            // Call the actual handler with validated request
            return await handler(validatedRequest);
        } catch (error) {
            console.error('Validation middleware error:', error);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Internal validation error',
                timestamp: new Date().toISOString()
            }, {
                status: 500
            });
        }
    };
}
function withValidation(handler, options = {}) {
    const middleware = createValidationMiddleware(options);
    return async function validatedHandler(request) {
        return await middleware(request, handler);
    };
}
function getValidatedData(request) {
    return {
        body: request.validatedBody,
        query: request.validatedQuery,
        headers: request.validatedHeaders
    };
}
function createValidationErrorResponse(message, errors, status = 400) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: message,
        details: errors,
        timestamp: new Date().toISOString()
    }, {
        status
    });
}
function validateRuntimeType(data, schema, errorMessage = 'Type validation failed') {
    const result = schema.safeParse(data);
    if (!result.success) {
        throw new Error(`${errorMessage}: ${result.error.message}`);
    }
    return result.data;
}
}),
"[project]/lib/validation/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Export all validation schemas
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/schemas.ts [app-route] (ecmascript)");
// Export input validator
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$input$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/input-validator.ts [app-route] (ecmascript)");
// Export validation middleware
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/middleware.ts [app-route] (ecmascript)");
;
;
;
}),
"[project]/lib/external-api/response-validator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExternalApiValidator",
    ()=>ExternalApiValidator,
    "baseApiResponseSchema",
    ()=>baseApiResponseSchema,
    "geoapifyGeocodeResponseSchema",
    ()=>geoapifyGeocodeResponseSchema,
    "geoapifyPlaceDetailsResponseSchema",
    ()=>geoapifyPlaceDetailsResponseSchema,
    "geoapifyPlacesResponseSchema",
    ()=>geoapifyPlacesResponseSchema,
    "paystackResponseSchema",
    ()=>paystackResponseSchema,
    "rapidApiBusinessResponseSchema",
    ()=>rapidApiBusinessResponseSchema,
    "scraperbeeResponseSchema",
    ()=>scraperbeeResponseSchema,
    "stripeWebhookResponseSchema",
    ()=>stripeWebhookResponseSchema,
    "ultramsgResponseSchema",
    ()=>ultramsgResponseSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
const baseApiResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const geoapifyGeocodeResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('FeatureCollection'),
    features: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('Feature'),
        geometry: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('Point'),
            coordinates: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()).length(2)
        }),
        properties: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            formatted: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            country: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
            city: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
            state: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
        }).passthrough()
    }))
});
const geoapifyPlacesResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('FeatureCollection'),
    features: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('Feature'),
        properties: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            place_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
            formatted: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
            categories: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional()
        }).passthrough()
    }))
});
const geoapifyPlaceDetailsResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('FeatureCollection'),
    features: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('Feature'),
        properties: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            place_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
            datasource: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
                raw: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].unknown()).optional()
            }).optional()
        }).passthrough()
    }))
});
const rapidApiBusinessResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    data: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        phone_number: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        website: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
    })).optional(),
    error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const scraperbeeResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string();
const ultramsgResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    sent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const paystackResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    data: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].unknown()).optional()
});
const stripeWebhookResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    object: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    data: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        object: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].unknown())
    })
});
class ExternalApiValidator {
    static DEFAULT_TIMEOUT = 10000 // 10 seconds
    ;
    static DEFAULT_RETRIES = 3;
    static RETRY_DELAY_BASE = 1000 // 1 second
    ;
    /**
   * Validate API response against schema
   */ static validateResponse(schema, data, apiName) {
        try {
            const result = schema.safeParse(data);
            if (result.success) {
                return {
                    success: true,
                    data: result.data
                };
            }
            const errorMessage = `${apiName} API response validation failed: ${result.error.message}`;
            console.error(errorMessage, {
                data,
                errors: result.error.errors
            });
            return {
                success: false,
                error: errorMessage
            };
        } catch (error) {
            const errorMessage = `${apiName} API response validation error: ${error instanceof Error ? error.message : String(error)}`;
            console.error(errorMessage);
            return {
                success: false,
                error: errorMessage
            };
        }
    }
    /**
   * Make validated API call with retry logic and fallback
   */ static async makeValidatedApiCall(url, options, schema, apiName, callOptions = {}) {
        const { timeout = this.DEFAULT_TIMEOUT, retries = this.DEFAULT_RETRIES, fallbackData, validateResponse = true } = callOptions;
        let lastError = null;
        for(let attempt = 0; attempt <= retries; attempt++){
            try {
                // Add timeout to fetch options
                const controller = new AbortController();
                const timeoutId = setTimeout(()=>controller.abort(), timeout);
                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                if (!response.ok) {
                    throw new Error(`${apiName} API returned ${response.status}: ${response.statusText}`);
                }
                const contentType = response.headers.get('content-type');
                let data;
                if (contentType?.includes('application/json')) {
                    data = await response.json();
                } else {
                    data = await response.text();
                }
                // Validate response if requested
                if (validateResponse) {
                    const validation = this.validateResponse(schema, data, apiName);
                    if (!validation.success && fallbackData) {
                        console.warn(`${apiName} validation failed, using fallback data`);
                        return {
                            success: true,
                            data: fallbackData,
                            fallbackData
                        };
                    }
                    return validation;
                }
                return {
                    success: true,
                    data: data
                };
            } catch (error) {
                lastError = error instanceof Error ? error : new Error(String(error));
                console.warn(`${apiName} API call attempt ${attempt + 1} failed:`, lastError.message);
                // If this is the last attempt, don't wait
                if (attempt < retries) {
                    const delay = this.RETRY_DELAY_BASE * Math.pow(2, attempt) // Exponential backoff
                    ;
                    await new Promise((resolve)=>setTimeout(resolve, delay));
                }
            }
        }
        // All retries failed
        const errorMessage = `${apiName} API call failed after ${retries + 1} attempts: ${lastError?.message}`;
        console.error(errorMessage);
        // Return fallback data if available
        if (fallbackData) {
            console.warn(`${apiName} API failed, using fallback data`);
            return {
                success: true,
                data: fallbackData,
                fallbackData
            };
        }
        return {
            success: false,
            error: errorMessage
        };
    }
    /**
   * Validate Geoapify geocoding response
   */ static async validateGeoapifyGeocode(url, apiKey) {
        return this.makeValidatedApiCall(url, {
            method: 'GET'
        }, geoapifyGeocodeResponseSchema, 'Geoapify Geocode', {
            fallbackData: {
                type: 'FeatureCollection',
                features: []
            }
        });
    }
    /**
   * Validate Geoapify places response
   */ static async validateGeoapifyPlaces(url) {
        return this.makeValidatedApiCall(url, {
            method: 'GET'
        }, geoapifyPlacesResponseSchema, 'Geoapify Places', {
            fallbackData: {
                type: 'FeatureCollection',
                features: []
            }
        });
    }
    /**
   * Validate RapidAPI business data response
   */ static async validateRapidApiBusiness(url, headers) {
        return this.makeValidatedApiCall(url, {
            method: 'GET',
            headers
        }, rapidApiBusinessResponseSchema, 'RapidAPI Business', {
            fallbackData: {
                status: 'error',
                data: []
            }
        });
    }
    /**
   * Validate ScraperBee response
   */ static async validateScraperBee(url) {
        return this.makeValidatedApiCall(url, {
            method: 'GET'
        }, scraperbeeResponseSchema, 'ScraperBee', {
            fallbackData: ''
        });
    }
    /**
   * Validate UltraMsg response
   */ static async validateUltraMsg(url, body) {
        return this.makeValidatedApiCall(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }, ultramsgResponseSchema, 'UltraMsg', {
            fallbackData: {
                sent: false,
                message: 'Service unavailable'
            }
        });
    }
    /**
   * Validate Paystack response
   */ static async validatePaystack(url, options) {
        return this.makeValidatedApiCall(url, options, paystackResponseSchema, 'Paystack', {
            fallbackData: {
                status: false,
                message: 'Service unavailable'
            }
        });
    }
    /**
   * Check if API response indicates rate limiting
   */ static isRateLimited(response) {
        return response.status === 429 || response.status === 503 || response.headers.get('x-ratelimit-remaining') === '0';
    }
    /**
   * Extract rate limit information from response headers
   */ static extractRateLimitInfo(response) {
        const limit = response.headers.get('x-ratelimit-limit');
        const remaining = response.headers.get('x-ratelimit-remaining');
        const reset = response.headers.get('x-ratelimit-reset');
        return {
            limit: limit ? parseInt(limit, 10) : undefined,
            remaining: remaining ? parseInt(remaining, 10) : undefined,
            resetTime: reset ? new Date(parseInt(reset, 10) * 1000) : undefined
        };
    }
    /**
   * Sanitize API response to remove sensitive data
   */ static sanitizeApiResponse(data, sensitiveFields = [
        'key',
        'token',
        'secret',
        'password'
    ]) {
        if (typeof data !== 'object' || data === null) {
            return data;
        }
        if (Array.isArray(data)) {
            return data.map((item)=>this.sanitizeApiResponse(item, sensitiveFields));
        }
        const sanitized = {};
        for (const [key, value] of Object.entries(data)){
            if (sensitiveFields.some((field)=>key.toLowerCase().includes(field))) {
                sanitized[key] = '[REDACTED]';
            } else {
                sanitized[key] = this.sanitizeApiResponse(value, sensitiveFields);
            }
        }
        return sanitized;
    }
}
}),
"[project]/lib/external-api/circuit-breaker.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CircuitBreaker",
    ()=>CircuitBreaker,
    "CircuitBreakerManager",
    ()=>CircuitBreakerManager,
    "CircuitBreakerState",
    ()=>CircuitBreakerState,
    "circuitBreakerManager",
    ()=>circuitBreakerManager
]);
var CircuitBreakerState = /*#__PURE__*/ function(CircuitBreakerState) {
    CircuitBreakerState["CLOSED"] = "CLOSED";
    CircuitBreakerState["OPEN"] = "OPEN";
    CircuitBreakerState["HALF_OPEN"] = "HALF_OPEN";
    return CircuitBreakerState;
}({});
class CircuitBreaker {
    name;
    state;
    failureCount;
    successCount;
    totalRequests;
    lastFailureTime;
    nextAttemptTime;
    options;
    constructor(name, options = {}){
        this.name = name;
        this.state = "CLOSED";
        this.failureCount = 0;
        this.successCount = 0;
        this.totalRequests = 0;
        this.options = {
            failureThreshold: options.failureThreshold ?? 5,
            recoveryTimeout: options.recoveryTimeout ?? 60000,
            monitoringPeriod: options.monitoringPeriod ?? 300000,
            expectedErrors: options.expectedErrors ?? [
                'ECONNREFUSED',
                'ETIMEDOUT',
                'ENOTFOUND'
            ]
        };
    }
    /**
   * Execute a function with circuit breaker protection
   */ async execute(fn) {
        if (this.state === "OPEN") {
            if (this.shouldAttemptReset()) {
                this.state = "HALF_OPEN";
                console.log(`Circuit breaker ${this.name} transitioning to HALF_OPEN`);
            } else {
                throw new Error(`Circuit breaker ${this.name} is OPEN. Next attempt at ${this.nextAttemptTime?.toISOString()}`);
            }
        }
        this.totalRequests++;
        try {
            const result = await fn();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure(error);
            throw error;
        }
    }
    /**
   * Handle successful execution
   */ onSuccess() {
        this.successCount++;
        if (this.state === "HALF_OPEN") {
            console.log(`Circuit breaker ${this.name} transitioning to CLOSED after successful request`);
            this.reset();
        }
    }
    /**
   * Handle failed execution
   */ onFailure(error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        // Check if this is an expected error that should trigger the circuit breaker
        const isExpectedError = this.options.expectedErrors?.some((expectedError)=>errorMessage.includes(expectedError)) ?? true;
        if (!isExpectedError) {
            // Don't count unexpected errors (like validation errors) towards circuit breaker
            return;
        }
        this.failureCount++;
        this.lastFailureTime = new Date();
        console.warn(`Circuit breaker ${this.name} recorded failure (${this.failureCount}/${this.options.failureThreshold}): ${errorMessage}`);
        if (this.state === "HALF_OPEN") {
            console.log(`Circuit breaker ${this.name} transitioning to OPEN after failure in HALF_OPEN state`);
            this.trip();
        } else if (this.failureCount >= this.options.failureThreshold) {
            console.log(`Circuit breaker ${this.name} transitioning to OPEN after ${this.failureCount} failures`);
            this.trip();
        }
    }
    /**
   * Trip the circuit breaker (open it)
   */ trip() {
        this.state = "OPEN";
        this.nextAttemptTime = new Date(Date.now() + this.options.recoveryTimeout);
    }
    /**
   * Reset the circuit breaker (close it)
   */ reset() {
        this.state = "CLOSED";
        this.failureCount = 0;
        this.nextAttemptTime = undefined;
    }
    /**
   * Check if we should attempt to reset the circuit breaker
   */ shouldAttemptReset() {
        return this.nextAttemptTime ? Date.now() >= this.nextAttemptTime.getTime() : false;
    }
    /**
   * Get current circuit breaker statistics
   */ getStats() {
        return {
            state: this.state,
            failureCount: this.failureCount,
            successCount: this.successCount,
            totalRequests: this.totalRequests,
            lastFailureTime: this.lastFailureTime,
            nextAttemptTime: this.nextAttemptTime
        };
    }
    /**
   * Check if circuit breaker is available for requests
   */ isAvailable() {
        return this.state === "CLOSED" || this.state === "HALF_OPEN" && this.shouldAttemptReset();
    }
    /**
   * Manually reset the circuit breaker
   */ manualReset() {
        console.log(`Circuit breaker ${this.name} manually reset`);
        this.reset();
    }
    /**
   * Get failure rate over the monitoring period
   */ getFailureRate() {
        if (this.totalRequests === 0) {
            return 0;
        }
        return this.failureCount / this.totalRequests;
    }
}
class CircuitBreakerManager {
    static instance;
    circuitBreakers = new Map();
    static getInstance() {
        if (!CircuitBreakerManager.instance) {
            CircuitBreakerManager.instance = new CircuitBreakerManager();
        }
        return CircuitBreakerManager.instance;
    }
    /**
   * Get or create a circuit breaker for a service
   */ getCircuitBreaker(serviceName, options) {
        if (!this.circuitBreakers.has(serviceName)) {
            this.circuitBreakers.set(serviceName, new CircuitBreaker(serviceName, options));
        }
        return this.circuitBreakers.get(serviceName);
    }
    /**
   * Get all circuit breaker statistics
   */ getAllStats() {
        const stats = {};
        for (const [name, breaker] of this.circuitBreakers){
            stats[name] = breaker.getStats();
        }
        return stats;
    }
    /**
   * Reset all circuit breakers
   */ resetAll() {
        for (const breaker of this.circuitBreakers.values()){
            breaker.manualReset();
        }
    }
    /**
   * Get services that are currently unavailable
   */ getUnavailableServices() {
        const unavailable = [];
        for (const [name, breaker] of this.circuitBreakers){
            if (!breaker.isAvailable()) {
                unavailable.push(name);
            }
        }
        return unavailable;
    }
}
const circuitBreakerManager = CircuitBreakerManager.getInstance();
}),
"[project]/lib/external-api/exponential-backoff.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExponentialBackoff",
    ()=>ExponentialBackoff,
    "createRetryFunction",
    ()=>createRetryFunction,
    "isRetryableError",
    ()=>isRetryableError
]);
class ExponentialBackoff {
    options;
    constructor(options = {}){
        this.options = {
            initialDelay: options.initialDelay ?? 1000,
            maxDelay: options.maxDelay ?? 30000,
            multiplier: options.multiplier ?? 2,
            maxRetries: options.maxRetries ?? 3,
            jitter: options.jitter ?? true
        };
    }
    /**
   * Execute a function with exponential backoff retry logic
   */ async execute(fn, shouldRetry) {
        let lastError;
        for(let attempt = 0; attempt <= this.options.maxRetries; attempt++){
            try {
                const result = await fn();
                // Log successful retry if this wasn't the first attempt
                if (attempt > 0) {
                    console.log(`Operation succeeded after ${attempt} retries`);
                }
                return result;
            } catch (error) {
                lastError = error instanceof Error ? error : new Error(String(error));
                // Don't retry on the last attempt
                if (attempt === this.options.maxRetries) {
                    break;
                }
                // Check if we should retry this error
                if (shouldRetry && !shouldRetry(lastError, attempt)) {
                    break;
                }
                // Calculate delay for next attempt
                const delay = this.calculateDelay(attempt);
                console.warn(`Operation failed (attempt ${attempt + 1}/${this.options.maxRetries + 1}), retrying in ${delay}ms:`, lastError.message);
                // Wait before retrying
                await this.sleep(delay);
            }
        }
        throw lastError;
    }
    /**
   * Calculate delay for the given attempt
   */ calculateDelay(attempt) {
        // Calculate exponential delay
        let delay = this.options.initialDelay * Math.pow(this.options.multiplier, attempt);
        // Cap at maximum delay
        delay = Math.min(delay, this.options.maxDelay);
        // Add jitter if enabled
        if (this.options.jitter) {
            // Add random jitter of ±25%
            const jitterRange = delay * 0.25;
            const jitter = (Math.random() - 0.5) * 2 * jitterRange;
            delay = Math.max(0, delay + jitter);
        }
        return Math.floor(delay);
    }
    /**
   * Sleep for the specified number of milliseconds
   */ sleep(ms) {
        return new Promise((resolve)=>setTimeout(resolve, ms));
    }
    /**
   * Get the options used by this backoff instance
   */ getOptions() {
        return {
            ...this.options
        };
    }
}
function isRetryableError(error) {
    const retryableErrors = [
        'ECONNREFUSED',
        'ETIMEDOUT',
        'ENOTFOUND',
        'ECONNRESET',
        'EPIPE',
        'EHOSTUNREACH',
        'EAI_AGAIN'
    ];
    const retryableStatusCodes = [
        408,
        429,
        500,
        502,
        503,
        504
    ];
    // Check for network errors
    if (retryableErrors.some((code)=>error.message.includes(code))) {
        return true;
    }
    // Check for HTTP status codes (if error has status property)
    const httpError = error;
    if (httpError.status && retryableStatusCodes.includes(httpError.status)) {
        return true;
    }
    return false;
}
function createRetryFunction(options, shouldRetry) {
    const backoff = new ExponentialBackoff(options);
    return (fn)=>backoff.execute(fn, shouldRetry);
}
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
"[project]/lib/external-api/cache-manager.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CacheKeyGenerator",
    ()=>CacheKeyGenerator,
    "ExternalApiCacheManager",
    ()=>ExternalApiCacheManager,
    "ServiceCacheManager",
    ()=>ServiceCacheManager,
    "serviceCacheManager",
    ()=>serviceCacheManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/monitoring/metrics.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/monitoring/logger.ts [app-route] (ecmascript)");
;
;
class ExternalApiCacheManager {
    cache = new Map();
    options;
    stats = {
        hits: 0,
        misses: 0,
        evictions: 0
    };
    cleanupTimer;
    constructor(options = {}){
        this.options = {
            defaultTtl: 300000,
            maxSize: 1000,
            cleanupInterval: 60000,
            enableMetrics: true,
            ...options
        };
        // Start cleanup timer
        this.startCleanupTimer();
        // Record initial metrics
        if (this.options.enableMetrics) {
            this.recordMetrics();
        }
    }
    /**
   * Get cached data
   */ get(key) {
        const entry = this.cache.get(key);
        if (!entry) {
            this.stats.misses++;
            this.recordCacheMetric('miss', key);
            return null;
        }
        // Check if entry has expired
        if (this.isExpired(entry)) {
            this.cache.delete(key);
            this.stats.misses++;
            this.recordCacheMetric('miss', key, 'expired');
            return null;
        }
        // Update access statistics
        entry.accessCount++;
        entry.lastAccessed = Date.now();
        this.stats.hits++;
        this.recordCacheMetric('hit', key);
        return entry.data;
    }
    /**
   * Set cached data
   */ set(key, data, ttl, tags) {
        const now = Date.now();
        const entryTtl = ttl || this.options.defaultTtl;
        // Check if we need to evict entries
        if (this.cache.size >= this.options.maxSize && !this.cache.has(key)) {
            this.evictLeastRecentlyUsed();
        }
        const entry = {
            data,
            timestamp: now,
            ttl: entryTtl,
            accessCount: 0,
            lastAccessed: now,
            tags
        };
        this.cache.set(key, entry);
        this.recordCacheMetric('set', key);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug(`Cache entry set: ${key}`, {
            requestId: 'cache-manager',
            endpoint: 'cache',
            metadata: {
                ttl: entryTtl,
                tags,
                cacheSize: this.cache.size
            }
        });
    }
    /**
   * Delete cached data
   */ delete(key) {
        const deleted = this.cache.delete(key);
        if (deleted) {
            this.recordCacheMetric('delete', key);
        }
        return deleted;
    }
    /**
   * Clear all cached data
   */ clear() {
        const size = this.cache.size;
        this.cache.clear();
        this.recordCacheMetric('clear', 'all', undefined, size);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info('Cache cleared', {
            requestId: 'cache-manager',
            endpoint: 'cache',
            metadata: {
                entriesCleared: size
            }
        });
    }
    /**
   * Invalidate cache entries by tags
   */ invalidateByTags(tags) {
        let invalidated = 0;
        const tagSet = new Set(tags);
        for (const [key, entry] of this.cache.entries()){
            if (entry.tags && entry.tags.some((tag)=>tagSet.has(tag))) {
                this.cache.delete(key);
                invalidated++;
            }
        }
        if (invalidated > 0) {
            this.recordCacheMetric('invalidate', 'tags', undefined, invalidated);
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(`Cache invalidated by tags: ${tags.join(', ')}`, {
                requestId: 'cache-manager',
                endpoint: 'cache',
                metadata: {
                    tags,
                    entriesInvalidated: invalidated
                }
            });
        }
        return invalidated;
    }
    /**
   * Get cache statistics
   */ getStats() {
        const totalRequests = this.stats.hits + this.stats.misses;
        const hitRate = totalRequests > 0 ? this.stats.hits / totalRequests : 0;
        return {
            size: this.cache.size,
            hits: this.stats.hits,
            misses: this.stats.misses,
            hitRate,
            evictions: this.stats.evictions,
            totalMemoryUsage: this.estimateMemoryUsage()
        };
    }
    /**
   * Get cache keys matching a pattern
   */ getKeys(pattern) {
        const keys = Array.from(this.cache.keys());
        return pattern ? keys.filter((key)=>pattern.test(key)) : keys;
    }
    /**
   * Check if cache has a key
   */ has(key) {
        const entry = this.cache.get(key);
        return entry ? !this.isExpired(entry) : false;
    }
    /**
   * Get cache entry info without accessing the data
   */ getEntryInfo(key) {
        const entry = this.cache.get(key);
        if (!entry || this.isExpired(entry)) {
            return null;
        }
        return {
            timestamp: entry.timestamp,
            ttl: entry.ttl,
            accessCount: entry.accessCount,
            lastAccessed: entry.lastAccessed,
            tags: entry.tags
        };
    }
    /**
   * Cleanup expired entries
   */ cleanup() {
        let cleaned = 0;
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()){
            if (this.isExpired(entry)) {
                this.cache.delete(key);
                cleaned++;
            }
        }
        if (cleaned > 0) {
            this.recordCacheMetric('cleanup', 'expired', undefined, cleaned);
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug(`Cache cleanup completed: ${cleaned} entries removed`, {
                requestId: 'cache-manager',
                endpoint: 'cache',
                metadata: {
                    entriesRemoved: cleaned,
                    remainingEntries: this.cache.size
                }
            });
        }
        return cleaned;
    }
    /**
   * Destroy the cache manager
   */ destroy() {
        if (this.cleanupTimer) {
            clearInterval(this.cleanupTimer);
            this.cleanupTimer = undefined;
        }
        this.clear();
    }
    /**
   * Check if an entry has expired
   */ isExpired(entry) {
        return Date.now() - entry.timestamp > entry.ttl;
    }
    /**
   * Evict least recently used entry
   */ evictLeastRecentlyUsed() {
        let oldestKey = null;
        let oldestTime = Date.now();
        for (const [key, entry] of this.cache.entries()){
            if (entry.lastAccessed < oldestTime) {
                oldestTime = entry.lastAccessed;
                oldestKey = key;
            }
        }
        if (oldestKey) {
            this.cache.delete(oldestKey);
            this.stats.evictions++;
            this.recordCacheMetric('evict', oldestKey);
        }
    }
    /**
   * Start cleanup timer
   */ startCleanupTimer() {
        this.cleanupTimer = setInterval(()=>{
            this.cleanup();
            if (this.options.enableMetrics) {
                this.recordMetrics();
            }
        }, this.options.cleanupInterval);
    }
    /**
   * Record cache metrics
   */ recordCacheMetric(operation, key, reason, count) {
        if (!this.options.enableMetrics) return;
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].incrementCounter('cache_operations_total', {
            operation,
            reason: reason || 'normal'
        });
        if (count !== undefined) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].recordHistogram('cache_operation_count', count, {
                operation
            });
        }
    }
    /**
   * Record general cache metrics
   */ recordMetrics() {
        if (!this.options.enableMetrics) return;
        const stats = this.getStats();
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].recordGauge('cache_size', stats.size);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].recordGauge('cache_hit_rate', stats.hitRate);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].recordGauge('cache_memory_usage_bytes', stats.totalMemoryUsage);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].recordGauge('cache_hits_total', stats.hits);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].recordGauge('cache_misses_total', stats.misses);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].recordGauge('cache_evictions_total', stats.evictions);
    }
    /**
   * Estimate memory usage (rough calculation)
   */ estimateMemoryUsage() {
        let totalSize = 0;
        for (const [key, entry] of this.cache.entries()){
            // Rough estimation: key size + JSON string size of data + metadata
            totalSize += key.length * 2; // UTF-16 characters
            totalSize += JSON.stringify(entry.data).length * 2;
            totalSize += 200; // Estimated overhead for entry metadata
        }
        return totalSize;
    }
}
class ServiceCacheManager {
    cacheManagers = new Map();
    /**
   * Get or create cache manager for a service
   */ getServiceCache(serviceName, options) {
        if (!this.cacheManagers.has(serviceName)) {
            const serviceOptions = {
                ...options,
                // Service-specific defaults
                defaultTtl: this.getServiceDefaultTtl(serviceName)
            };
            this.cacheManagers.set(serviceName, new ExternalApiCacheManager(serviceOptions));
        }
        return this.cacheManagers.get(serviceName);
    }
    /**
   * Clear cache for a specific service
   */ clearServiceCache(serviceName) {
        const cache = this.cacheManagers.get(serviceName);
        if (cache) {
            cache.clear();
        }
    }
    /**
   * Get stats for all services
   */ getAllStats() {
        const stats = {};
        for (const [serviceName, cache] of this.cacheManagers.entries()){
            stats[serviceName] = cache.getStats();
        }
        return stats;
    }
    /**
   * Cleanup all service caches
   */ cleanupAll() {
        const results = {};
        for (const [serviceName, cache] of this.cacheManagers.entries()){
            results[serviceName] = cache.cleanup();
        }
        return results;
    }
    /**
   * Destroy all cache managers
   */ destroy() {
        for (const cache of this.cacheManagers.values()){
            cache.destroy();
        }
        this.cacheManagers.clear();
    }
    /**
   * Get service-specific default TTL
   */ getServiceDefaultTtl(serviceName) {
        const serviceTtls = {
            geoapify: 600000,
            rapidapi: 300000,
            scraperbee: 180000,
            default: 300000
        };
        return serviceTtls[serviceName] || serviceTtls.default;
    }
}
const serviceCacheManager = new ServiceCacheManager();
class CacheKeyGenerator {
    /**
   * Generate cache key for API requests
   */ static forApiRequest(service, endpoint, params, method = 'GET') {
        const paramString = params ? JSON.stringify(params) : '';
        const hash = this.simpleHash(`${method}:${endpoint}:${paramString}`);
        return `${service}:${hash}`;
    }
    /**
   * Generate cache key for user-specific data
   */ static forUserData(service, userId, dataType, params) {
        const paramString = params ? JSON.stringify(params) : '';
        const hash = this.simpleHash(`${dataType}:${paramString}`);
        return `${service}:user:${userId}:${hash}`;
    }
    /**
   * Generate cache key for search results
   */ static forSearchResults(service, query, filters) {
        const filterString = filters ? JSON.stringify(filters) : '';
        const hash = this.simpleHash(`${query}:${filterString}`);
        return `${service}:search:${hash}`;
    }
    /**
   * Simple hash function for cache keys
   */ static simpleHash(str) {
        let hash = 0;
        for(let i = 0; i < str.length; i++){
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(36);
    }
}
}),
"[project]/lib/external-api/resilient-client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResilientApiClient",
    ()=>ResilientApiClient,
    "createResilientClient",
    ()=>createResilientClient,
    "externalApiClients",
    ()=>externalApiClients
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$circuit$2d$breaker$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/external-api/circuit-breaker.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$exponential$2d$backoff$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/external-api/exponential-backoff.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$cache$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/external-api/cache-manager.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/monitoring/metrics.ts [app-route] (ecmascript)");
;
;
;
;
class ResilientApiClient {
    circuitBreaker;
    backoff;
    options;
    cacheManager;
    constructor(options){
        this.options = {
            timeout: 10000,
            fallbackEnabled: true,
            ...options
        };
        this.circuitBreaker = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$circuit$2d$breaker$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["circuitBreakerManager"].getCircuitBreaker(options.serviceName, options.circuitBreakerOptions);
        this.backoff = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$exponential$2d$backoff$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExponentialBackoff"](options.backoffOptions);
        // Initialize cache manager for this service
        this.cacheManager = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$cache$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serviceCacheManager"].getServiceCache(options.serviceName, {
            enableMetrics: true,
            ...options.cacheOptions
        });
    }
    /**
   * Make a resilient HTTP request with circuit breaker and retry logic
   */ async request(requestOptions, fallbackOptions) {
        const cacheKey = fallbackOptions?.cacheKey || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$cache$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CacheKeyGenerator"].forApiRequest(this.options.serviceName, requestOptions.url, requestOptions.body, requestOptions.method);
        // Check cache first for GET requests (or if explicitly enabled)
        const enableCache = this.options.cacheOptions?.enableCache !== false;
        if (enableCache && (requestOptions.method === 'GET' || !requestOptions.method)) {
            const cached = this.cacheManager.get(cacheKey);
            if (cached) {
                return cached;
            }
        }
        // Track external API call performance
        const performanceTracker = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PerformanceMonitor"].trackExternalApiCall(this.options.serviceName, requestOptions.url);
        try {
            // Execute request with circuit breaker protection
            const result = await this.circuitBreaker.execute(async ()=>{
                // Execute request with exponential backoff
                return await this.backoff.execute(()=>this.makeHttpRequest(requestOptions), (error, attempt)=>{
                    // Only retry on retryable errors and if we haven't exceeded max attempts
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$exponential$2d$backoff$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isRetryableError"])(error) && attempt < (this.options.backoffOptions?.maxRetries ?? 3);
                });
            });
            // Cache successful response if caching is enabled
            if (enableCache && (requestOptions.method === 'GET' || !requestOptions.method)) {
                const cacheTtl = fallbackOptions?.cacheTtl || this.options.cacheOptions?.defaultTtl;
                const cacheTags = fallbackOptions?.cacheTags;
                this.cacheManager.set(cacheKey, result, cacheTtl, cacheTags);
            }
            performanceTracker.end(true);
            return result;
        } catch (error) {
            performanceTracker.end(false, error?.status);
            console.error(`Request failed for ${this.options.serviceName}:`, error);
            // Try fallback mechanisms
            if (this.options.fallbackEnabled && fallbackOptions) {
                return await this.handleFallback(cacheKey, fallbackOptions, error);
            }
            throw error;
        }
    }
    /**
   * Make the actual HTTP request
   */ async makeHttpRequest(options) {
        const controller = new AbortController();
        const timeout = options.timeout || this.options.timeout;
        // Set up timeout
        const timeoutId = setTimeout(()=>controller.abort(), timeout);
        try {
            const response = await fetch(options.url, {
                method: options.method || 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                body: options.body ? JSON.stringify(options.body) : undefined,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
                error.status = response.status;
                throw error;
            }
            const data = await response.json();
            return data;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error(`Request timeout after ${timeout}ms`);
            }
            throw error;
        }
    }
    /**
   * Handle fallback mechanisms
   */ async handleFallback(cacheKey, fallbackOptions, originalError) {
        // Try cached response first
        if (fallbackOptions.useCachedResponse) {
            const cached = this.cacheManager.get(cacheKey);
            if (cached) {
                console.log(`Using cached response for ${this.options.serviceName}`);
                return cached;
            }
        }
        // Try fallback function
        if (fallbackOptions.fallbackFn) {
            try {
                console.log(`Using fallback function for ${this.options.serviceName}`);
                return await fallbackOptions.fallbackFn();
            } catch (fallbackError) {
                console.error(`Fallback function failed for ${this.options.serviceName}:`, fallbackError);
            }
        }
        // Use fallback value
        if (fallbackOptions.fallbackValue !== undefined) {
            console.log(`Using fallback value for ${this.options.serviceName}`);
            return fallbackOptions.fallbackValue;
        }
        // No fallback available, throw original error
        throw originalError;
    }
    /**
   * Cache a response with tags for invalidation
   */ cacheResponse(key, data, ttl, tags) {
        this.cacheManager.set(key, data, ttl, tags);
    }
    /**
   * Get cached response
   */ getCachedResponse(key) {
        return this.cacheManager.get(key);
    }
    /**
   * Invalidate cache entries by tags
   */ invalidateCache(tags) {
        return this.cacheManager.invalidateByTags(tags);
    }
    /**
   * Clear all cached responses for this service
   */ clearCache() {
        this.cacheManager.clear();
    }
    /**
   * Get cache statistics
   */ getCacheStats() {
        return this.cacheManager.getStats();
    }
    /**
   * Get circuit breaker stats
   */ getStats() {
        return {
            circuitBreaker: this.circuitBreaker.getStats(),
            backoffOptions: this.backoff.getOptions(),
            cache: this.cacheManager.getStats()
        };
    }
    /**
   * Check if the service is available
   */ isAvailable() {
        return this.circuitBreaker.isAvailable();
    }
    /**
   * Manually reset the circuit breaker
   */ reset() {
        this.circuitBreaker.manualReset();
        this.clearCache();
    }
}
function createResilientClient(options) {
    return new ResilientApiClient(options);
}
const externalApiClients = {
    geoapify: createResilientClient({
        serviceName: 'geoapify',
        circuitBreakerOptions: {
            failureThreshold: 3,
            recoveryTimeout: 30000
        },
        backoffOptions: {
            initialDelay: 1000,
            maxDelay: 10000,
            maxRetries: 2
        },
        cacheOptions: {
            defaultTtl: 600000,
            maxSize: 500,
            enableCache: true
        }
    }),
    rapidApi: createResilientClient({
        serviceName: 'rapidapi',
        circuitBreakerOptions: {
            failureThreshold: 5,
            recoveryTimeout: 60000
        },
        backoffOptions: {
            initialDelay: 2000,
            maxDelay: 15000,
            maxRetries: 3
        },
        cacheOptions: {
            defaultTtl: 300000,
            maxSize: 1000,
            enableCache: true
        }
    }),
    scraperBee: createResilientClient({
        serviceName: 'scraperbee',
        circuitBreakerOptions: {
            failureThreshold: 3,
            recoveryTimeout: 45000
        },
        backoffOptions: {
            initialDelay: 1500,
            maxDelay: 12000,
            maxRetries: 2
        },
        cacheOptions: {
            defaultTtl: 180000,
            maxSize: 300,
            enableCache: true
        }
    })
};
}),
"[project]/lib/external-api/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Export response validator
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$response$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/external-api/response-validator.ts [app-route] (ecmascript)");
// Export circuit breaker
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$circuit$2d$breaker$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/external-api/circuit-breaker.ts [app-route] (ecmascript)");
// Export exponential backoff
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$exponential$2d$backoff$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/external-api/exponential-backoff.ts [app-route] (ecmascript)");
// Export resilient client
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$resilient$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/external-api/resilient-client.ts [app-route] (ecmascript)");
// Export cache manager
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$cache$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/external-api/cache-manager.ts [app-route] (ecmascript)");
;
;
;
;
;
}),
"[project]/app/api/leads/generate/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$server$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase/server-auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase/admin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/firestore [external] (firebase-admin/firestore, esm_import, [project]/node_modules/firebase-admin)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plans$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/plans.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/validation/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/middleware.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/schemas.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/external-api/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$response$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/external-api/response-validator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$circuit$2d$breaker$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/external-api/circuit-breaker.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$server$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$server$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
const POST = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withValidation"])(async (request)=>{
    try {
        const { body } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getValidatedData"])(request);
        const { category, location, searchMode, excludePlaceIds } = body;
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
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$server$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerUser"])();
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        // Fetch user profile from Firestore to get subscription plan
        const profileSnap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["firebaseAdminDb"].collection("profiles").where("user_id", "==", user.uid).limit(1).get();
        const profile = profileSnap.docs.length > 0 ? profileSnap.docs[0].data() : null;
        const currentPlan = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plans$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PLANS"].find((p)=>p.id === profile?.subscription_plan) || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plans$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PLANS"][0];
        if (currentPlan.leadLimit !== null) {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            const leadsSnap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["firebaseAdminDb"].collection("leads").where("user_id", "==", user.uid).where("created_at", ">=", __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["Timestamp"].fromDate(startOfMonth)).where("created_at", "<", __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["Timestamp"].fromDate(startOfNextMonth)).get();
            const usedThisMonth = leadsSnap.docs.length;
            if (usedThisMonth >= currentPlan.leadLimit) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Lead limit reached",
                    message: `You have reached your monthly lead limit of ${currentPlan.leadLimit} leads for the ${currentPlan.name} plan. Consider upgrading your plan to generate more leads.`
                }, {
                    status: 403
                });
            }
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
        // Use validated API call with circuit breaker
        const geoapifyBreaker = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$circuit$2d$breaker$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["circuitBreakerManager"].getCircuitBreaker('geoapify-geocode');
        const geocodeResult = await geoapifyBreaker.execute(async ()=>{
            return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$response$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExternalApiValidator"].validateGeoapifyGeocode(geocodeUrl, geoapifyKey);
        });
        if (!geocodeResult.success) {
            throw new Error("Location not found. Please try a different location.");
        }
        const geocodeData = geocodeResult.data;
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
        // Use validated API call with circuit breaker
        const placesBreaker = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$circuit$2d$breaker$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["circuitBreakerManager"].getCircuitBreaker('geoapify-places');
        const placesResult = await placesBreaker.execute(async ()=>{
            return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$response$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExternalApiValidator"].validateGeoapifyPlaces(placesUrl);
        });
        if (!placesResult.success) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                places: [],
                leadsCreated: 0
            });
        }
        const placesData = placesResult.data;
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
            // Use validated API call for place details
            const detailsBreaker = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$circuit$2d$breaker$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["circuitBreakerManager"].getCircuitBreaker('geoapify-details');
            const detailsResult = await detailsBreaker.execute(async ()=>{
                return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$response$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExternalApiValidator"].makeValidatedApiCall(detailsUrl, {
                    method: 'GET'
                }, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$response$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExternalApiValidator"].geoapifyPlaceDetailsResponseSchema, 'Geoapify Details', {
                    fallbackData: {
                        type: 'FeatureCollection',
                        features: []
                    }
                });
            });
            const detailsData = detailsResult.success ? detailsResult.data : {
                type: 'FeatureCollection',
                features: []
            };
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
                    // Use validated API call with circuit breaker for RapidAPI
                    const rapidBreaker = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$circuit$2d$breaker$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["circuitBreakerManager"].getCircuitBreaker('rapidapi-business');
                    const rapidResult = await rapidBreaker.execute(async ()=>{
                        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$response$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExternalApiValidator"].validateRapidApiBusiness(rapidUrl, {
                            "x-rapidapi-host": "local-business-data.p.rapidapi.com",
                            "x-rapidapi-key": rapidapiKey
                        });
                    });
                    if (rapidResult.success && rapidResult.data?.data && rapidResult.data.data.length > 0) {
                        const rapidPlace = rapidResult.data.data[0];
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
                } catch (rapidError) {
                    console.error("RapidAPI error:", rapidError);
                }
            }
            const needsScraping = (!finalContact.phone || !finalContact.email) && finalContact.website && scraperbeeKey;
            if (needsScraping) {
                try {
                    const scraperbeeUrl = `https://app.scrapingbee.com/api/v1/?api_key=${scraperbeeKey}&url=${encodeURIComponent(finalContact.website)}&ai_query=${encodeURIComponent("Extract all contact information including email addresses, phone numbers, WhatsApp numbers, and social media links (Facebook, Instagram, Twitter, LinkedIn)")}&render_js=false`;
                    // Use validated API call with circuit breaker for ScraperBee
                    const scraperbeeBreaker = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$circuit$2d$breaker$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["circuitBreakerManager"].getCircuitBreaker('scraperbee');
                    const scraperbeeResult = await scraperbeeBreaker.execute(async ()=>{
                        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$external$2d$api$2f$response$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExternalApiValidator"].validateScraperBee(scraperbeeUrl);
                    });
                    console.log("ScraperBee result:", scraperbeeResult.success);
                    if (scraperbeeResult.success && scraperbeeResult.data) {
                        const html = scraperbeeResult.data;
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
        let leadsToInsert = detailedPlaces.map((place)=>({
                user_id: user.uid,
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
                },
                created_at: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["Timestamp"].now(),
                updated_at: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["Timestamp"].now()
            }));
        let insertError = null;
        if (currentPlan.leadLimit !== null && leadsToInsert.length > 0) {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            const leadsSnap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["firebaseAdminDb"].collection("leads").where("user_id", "==", user.uid).where("created_at", ">=", __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["Timestamp"].fromDate(startOfMonth)).where("created_at", "<", __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["Timestamp"].fromDate(startOfNextMonth)).get();
            const usedThisMonth = leadsSnap.docs.length;
            const remaining = Math.max(0, currentPlan.leadLimit - usedThisMonth);
            if (remaining <= 0) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Lead limit reached",
                    message: `You have reached your monthly lead limit of ${currentPlan.leadLimit} leads for the ${currentPlan.name} plan. Consider upgrading your plan to generate more leads.`
                }, {
                    status: 403
                });
            }
            if (leadsToInsert.length > remaining) {
                leadsToInsert = leadsToInsert.slice(0, remaining);
            }
        }
        if (leadsToInsert.length > 0) {
            try {
                const batch = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["firebaseAdminDb"].batch();
                const leadsRef = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["firebaseAdminDb"].collection("leads");
                leadsToInsert.forEach((lead)=>{
                    const docRef = leadsRef.doc() // Auto-generate ID
                    ;
                    batch.set(docRef, lead);
                });
                await batch.commit();
            } catch (error) {
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
}, {
    bodySchema: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateLeadsSchema"],
    validateHeaders: false
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__329b2fe9._.js.map