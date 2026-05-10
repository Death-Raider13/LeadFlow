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
"[project]/lib/encryption.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EnhancedEncryptionService",
    ()=>EnhancedEncryptionService,
    "decryptWithKey",
    ()=>decryptWithKey,
    "encryptWithKey",
    ()=>encryptWithKey,
    "enhancedEncryption",
    ()=>enhancedEncryption,
    "generateRandomKey",
    ()=>generateRandomKey,
    "unwrapUserKey",
    ()=>unwrapUserKey,
    "wrapUserKey",
    ()=>wrapUserKey
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/config/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config/validation.ts [app-route] (ecmascript)");
;
;
class EnhancedEncryptionService {
    static instance = null;
    keyVersions = new Map();
    userKeys = new Map();
    currentKeyVersion = 1;
    algorithm = "aes-256-gcm";
    static getInstance() {
        if (!EnhancedEncryptionService.instance) {
            EnhancedEncryptionService.instance = new EnhancedEncryptionService();
        }
        return EnhancedEncryptionService.instance;
    }
    constructor(){
        // Initialize with master key
        this.initializeMasterKey();
    }
    // Initialize master key and key versioning
    initializeMasterKey() {
        try {
            const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getConfig"])();
            const masterKey = Buffer.from(config.CREDENTIALS_ENCRYPTION_KEY, "base64");
            if (masterKey.length !== 32) {
                throw new Error("Master key must be exactly 32 bytes");
            }
            // Store current master key version
            this.keyVersions.set(this.currentKeyVersion, masterKey);
            console.log(`Encryption service initialized with key version ${this.currentKeyVersion}`);
        } catch (error) {
            throw new Error(`Failed to initialize encryption service: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    // Encrypt user data with per-user key isolation
    async encryptUserData(userId, data) {
        try {
            // Get or create user-specific key
            const userKey = await this.getUserKey(userId);
            // Get the actual key bytes from the wrapped key
            const keyBytes = Buffer.from(this.unwrapUserKeyFromMaster(userKey.wrappedKey), 'base64');
            // Encrypt with user key
            const iv = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(12) // 12 bytes for GCM
            ;
            const cipher = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createCipheriv(this.algorithm, keyBytes, iv);
            const encrypted = Buffer.concat([
                cipher.update(data, "utf8"),
                cipher.final()
            ]);
            const authTag = cipher.getAuthTag();
            return {
                ciphertext: encrypted.toString("base64"),
                iv: iv.toString("base64"),
                authTag: authTag.toString("base64"),
                keyVersion: userKey.keyVersion,
                algorithm: this.algorithm,
                userId: userId
            };
        } catch (error) {
            throw new Error(`Encryption failed for user ${userId}: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    // Decrypt user data with key version support
    async decryptUserData(userId, encrypted) {
        try {
            // Validate that the encrypted data belongs to this user
            if (encrypted.userId && encrypted.userId !== userId) {
                throw new Error("Encrypted data does not belong to the specified user");
            }
            // Get user key for the specific version
            const userKey = await this.getUserKey(userId, encrypted.keyVersion);
            // Get the actual key bytes from the wrapped key
            const keyBytes = Buffer.from(this.unwrapUserKeyFromMaster(userKey.wrappedKey), 'base64');
            const iv = Buffer.from(encrypted.iv, "base64");
            const authTag = Buffer.from(encrypted.authTag, "base64");
            const ciphertext = Buffer.from(encrypted.ciphertext, "base64");
            const decipher = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createDecipheriv(encrypted.algorithm, keyBytes, iv);
            decipher.setAuthTag(authTag);
            const decrypted = Buffer.concat([
                decipher.update(ciphertext),
                decipher.final()
            ]);
            return decrypted.toString("utf8");
        } catch (error) {
            throw new Error(`Decryption failed for user ${userId}: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    // Rotate user key to new version
    async rotateUserKey(userId) {
        try {
            const currentUserKey = this.userKeys.get(userId);
            if (!currentUserKey) {
                throw new Error(`No existing key found for user ${userId}`);
            }
            // Generate new user key
            const newUserKey = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(32);
            const newKeyVersion = this.currentKeyVersion;
            // Wrap new key with current master key
            const wrappedNewKey = this.wrapUserKeyWithMaster(newUserKey.toString("base64"), newKeyVersion);
            // Update user key info
            const newUserKeyInfo = {
                userId,
                keyVersion: newKeyVersion,
                wrappedKey: wrappedNewKey,
                metadata: {
                    version: newKeyVersion,
                    createdAt: new Date(),
                    algorithm: this.algorithm,
                    isActive: true,
                    rotatedAt: new Date()
                }
            };
            // Mark old key as inactive
            currentUserKey.metadata.isActive = false;
            currentUserKey.metadata.rotatedAt = new Date();
            // Store new key
            this.userKeys.set(userId, newUserKeyInfo);
            console.log(`User key rotated for ${userId}: v${currentUserKey.keyVersion} -> v${newKeyVersion}`);
        } catch (error) {
            throw new Error(`Key rotation failed for user ${userId}: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    // Validate key integrity
    async validateKeyIntegrity() {
        try {
            // Test master key integrity
            for (const [version, key] of this.keyVersions.entries()){
                if (key.length !== 32) {
                    console.error(`Master key version ${version} has invalid length: ${key.length}`);
                    return false;
                }
                // Test encryption/decryption round trip
                const testData = "integrity-test-data";
                const testKey = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(32).toString("base64");
                try {
                    const encrypted = encryptWithKey(testKey, testData);
                    const decrypted = decryptWithKey(testKey, encrypted);
                    if (decrypted !== testData) {
                        console.error(`Key integrity test failed for version ${version}`);
                        return false;
                    }
                } catch (error) {
                    console.error(`Key integrity test error for version ${version}:`, error);
                    return false;
                }
            }
            // Test user key integrity
            for (const [userId, userKeyInfo] of this.userKeys.entries()){
                try {
                    // Verify user key can be unwrapped
                    const unwrapped = this.unwrapUserKeyFromMaster(userKeyInfo.wrappedKey);
                    if (!unwrapped || unwrapped.length === 0) {
                        console.error(`User key integrity failed for ${userId}`);
                        return false;
                    }
                } catch (error) {
                    console.error(`User key integrity test failed for ${userId}:`, error);
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.error("Key integrity validation error:", error);
            return false;
        }
    }
    // Get or create user-specific key
    async getUserKey(userId, version) {
        const existingKey = this.userKeys.get(userId);
        // If requesting specific version, validate it matches
        if (version && existingKey && existingKey.keyVersion !== version) {
            throw new Error(`User key version mismatch: requested ${version}, have ${existingKey.keyVersion}`);
        }
        // Return existing key if available
        if (existingKey && (!version || existingKey.keyVersion === version)) {
            return existingKey;
        }
        // Create new user key
        const userKey = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(32);
        const keyVersion = version || this.currentKeyVersion;
        // Wrap user key with master key
        const wrappedKey = this.wrapUserKeyWithMaster(userKey.toString("base64"), keyVersion);
        const userKeyInfo = {
            userId,
            keyVersion,
            wrappedKey,
            metadata: {
                version: keyVersion,
                createdAt: new Date(),
                algorithm: this.algorithm,
                isActive: true
            }
        };
        this.userKeys.set(userId, userKeyInfo);
        console.log(`Created new user key for ${userId} (version ${keyVersion})`);
        return userKeyInfo;
    }
    // Wrap user key with master key
    wrapUserKeyWithMaster(userKeyBase64, keyVersion) {
        const masterKey = this.keyVersions.get(keyVersion);
        if (!masterKey) {
            throw new Error(`Master key version ${keyVersion} not found`);
        }
        const iv = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(12);
        const cipher = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createCipheriv(this.algorithm, masterKey, iv);
        const encrypted = Buffer.concat([
            cipher.update(userKeyBase64, "utf8"),
            cipher.final()
        ]);
        const authTag = cipher.getAuthTag();
        return {
            ciphertext: encrypted.toString("base64"),
            iv: iv.toString("base64"),
            authTag: authTag.toString("base64"),
            keyVersion,
            algorithm: this.algorithm
        };
    }
    // Unwrap user key from master key
    unwrapUserKeyFromMaster(wrappedKey) {
        const masterKey = this.keyVersions.get(wrappedKey.keyVersion);
        if (!masterKey) {
            throw new Error(`Master key version ${wrappedKey.keyVersion} not found`);
        }
        const iv = Buffer.from(wrappedKey.iv, "base64");
        const authTag = Buffer.from(wrappedKey.authTag, "base64");
        const ciphertext = Buffer.from(wrappedKey.ciphertext, "base64");
        const decipher = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createDecipheriv(wrappedKey.algorithm, masterKey, iv);
        decipher.setAuthTag(authTag);
        const decrypted = Buffer.concat([
            decipher.update(ciphertext),
            decipher.final()
        ]);
        return decrypted.toString("utf8");
    }
    // Get user key information
    getUserKeyInfo(userId) {
        return this.userKeys.get(userId) || null;
    }
    // List all user keys (for admin purposes)
    getAllUserKeys() {
        return Array.from(this.userKeys.values());
    }
    // Get key statistics
    getKeyStatistics() {
        const userKeys = Array.from(this.userKeys.values());
        const activeKeys = userKeys.filter((key)=>key.metadata.isActive);
        const dates = userKeys.map((key)=>key.metadata.createdAt);
        return {
            totalUsers: userKeys.length,
            activeKeys: activeKeys.length,
            keyVersions: Array.from(this.keyVersions.keys()),
            oldestKey: dates.length > 0 ? new Date(Math.min(...dates.map((d)=>d.getTime()))) : null,
            newestKey: dates.length > 0 ? new Date(Math.max(...dates.map((d)=>d.getTime()))) : null
        };
    }
}
function generateRandomKey() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(32).toString("base64");
}
function encryptWithKey(keyBase64, plaintext) {
    const key = Buffer.from(keyBase64, "base64");
    if (key.length !== 32) {
        throw new Error("Encryption key must be 32 bytes (base64-encoded)");
    }
    const iv = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(12);
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
// Get master key from validated configuration
function getMasterKey() {
    try {
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getConfig"])();
        const key = Buffer.from(config.CREDENTIALS_ENCRYPTION_KEY, "base64");
        if (key.length !== 32) {
            throw new Error("CREDENTIALS_ENCRYPTION_KEY must be a 32-byte key encoded in base64");
        }
        return key;
    } catch (error) {
        throw new Error(`Failed to get master encryption key: ${error instanceof Error ? error.message : String(error)}`);
    }
}
function wrapUserKey(userKeyBase64) {
    const enhancedService = EnhancedEncryptionService.getInstance();
    const wrappedKey = enhancedService['wrapUserKeyWithMaster'](userKeyBase64, 1);
    return {
        ciphertext: wrappedKey.ciphertext,
        iv: wrappedKey.iv,
        authTag: wrappedKey.authTag
    };
}
function unwrapUserKey(payload) {
    const enhancedService = EnhancedEncryptionService.getInstance();
    const wrappedKey = {
        ...payload,
        keyVersion: 1,
        algorithm: "aes-256-gcm"
    };
    return enhancedService['unwrapUserKeyFromMaster'](wrappedKey);
}
const enhancedEncryption = EnhancedEncryptionService.getInstance();
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
"[project]/app/api/integrations/credentials/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$server$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase/server-auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase/admin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/firestore [external] (firebase-admin/firestore, esm_import, [project]/node_modules/firebase-admin)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$encryption$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/encryption.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/validation/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/middleware.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/schemas.ts [app-route] (ecmascript)");
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
async function GET() {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$server$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerUser"])();
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const integrationsSnap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["firebaseAdminDb"].collection("user_integrations").where("user_id", "==", user.uid).limit(1).get();
        const data = integrationsSnap.docs.length > 0 ? integrationsSnap.docs[0].data() : null;
        const hasWhatsApp = !!(data && data.ultramsg_instance_enc && data.ultramsg_token_enc);
        const hasGmail = !!(data && data.gmail_address_enc && data.gmail_app_password_enc);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            hasWhatsApp,
            hasGmail
        });
    } catch (err) {
        console.error("Integrations GET error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Unexpected error"
        }, {
            status: 500
        });
    }
}
const POST = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withValidation"])(async (request)=>{
    try {
        const { body } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getValidatedData"])(request);
        const { ultramsgInstanceId, ultramsgToken, gmailAddress, gmailAppPassword } = body;
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$server$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerUser"])();
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        // Check if user already has integrations
        const integrationsSnap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["firebaseAdminDb"].collection("user_integrations").where("user_id", "==", user.uid).limit(1).get();
        const existing = integrationsSnap.docs.length > 0 ? integrationsSnap.docs[0].data() : null;
        const existingDocId = integrationsSnap.docs.length > 0 ? integrationsSnap.docs[0].id : null;
        let userKeyBase64;
        let wrappedUserKeyPayload;
        if (existing && existing.user_key_enc) {
            userKeyBase64 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$encryption$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["unwrapUserKey"])(existing.user_key_enc);
            wrappedUserKeyPayload = existing.user_key_enc;
        } else {
            userKeyBase64 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$encryption$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateRandomKey"])();
            wrappedUserKeyPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$encryption$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["wrapUserKey"])(userKeyBase64);
        }
        const payload = {
            user_id: user.uid,
            user_key_enc: wrappedUserKeyPayload,
            updated_at: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["Timestamp"].now()
        };
        if (ultramsgInstanceId) {
            payload.ultramsg_instance_enc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$encryption$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encryptWithKey"])(userKeyBase64, ultramsgInstanceId);
        }
        if (ultramsgToken) {
            payload.ultramsg_token_enc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$encryption$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encryptWithKey"])(userKeyBase64, ultramsgToken);
        }
        if (gmailAddress) {
            payload.gmail_address_enc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$encryption$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encryptWithKey"])(userKeyBase64, gmailAddress);
        }
        if (gmailAppPassword) {
            payload.gmail_app_password_enc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$encryption$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encryptWithKey"])(userKeyBase64, gmailAppPassword);
        }
        if (!existing) {
            payload.created_at = __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["Timestamp"].now();
            // Create new document
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["firebaseAdminDb"].collection("user_integrations").add(payload);
        } else {
            // Update existing document
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["firebaseAdminDb"].collection("user_integrations").doc(existingDocId).update(payload);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (err) {
        console.error("Integrations POST error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err.message ?? "Unexpected error"
        }, {
            status: 500
        });
    }
}, {
    bodySchema: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["credentialsSchema"],
    validateHeaders: true
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__67384ea9._.js.map