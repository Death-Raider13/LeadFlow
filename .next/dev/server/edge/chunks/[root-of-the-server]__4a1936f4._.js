(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__4a1936f4._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/ [middleware-edge] (unsupported edge import 'crypto', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`crypto`));
}),
"[project]/ [middleware-edge] (unsupported edge import 'fs', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`fs`));
}),
"[project]/ [middleware-edge] (unsupported edge import 'path', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`path`));
}),
"[project]/lib/config/validation.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = /*#__PURE__*/ __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [middleware-edge] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$crypto$272c$__ecmascript$29$__ = __turbopack_context__.i("[project]/ [middleware-edge] (unsupported edge import 'crypto', ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__ = __turbopack_context__.i("[project]/ [middleware-edge] (unsupported edge import 'fs', ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$path$272c$__ecmascript$29$__ = __turbopack_context__.i("[project]/ [middleware-edge] (unsupported edge import 'path', ecmascript)");
;
;
;
;
// Environment variable schema with validation rules
const envSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    // Firebase Configuration
    NEXT_PUBLIC_FIREBASE_API_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Firebase API key is required"),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Firebase auth domain is required"),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Firebase project ID is required"),
    NEXT_PUBLIC_FIREBASE_APP_ID: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Firebase app ID is required"),
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Firebase storage bucket is required"),
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Firebase messaging sender ID is required"),
    // Firebase Admin Configuration
    FIREBASE_PROJECT_ID: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Firebase admin project ID is required"),
    FIREBASE_CLIENT_EMAIL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email("Firebase client email must be valid email"),
    FIREBASE_PRIVATE_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Firebase private key is required"),
    // Supabase Configuration
    NEXT_PUBLIC_SUPABASE_URL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url("Supabase URL must be valid URL"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Supabase anon key is required"),
    SUPABASE_SERVICE_ROLE_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Supabase service role key is required"),
    // Payment Configuration
    PAYSTACK_SECRET_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Paystack secret key is required"),
    // External API Keys
    GEOAPIFY_API_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Geoapify API key is required"),
    RAPIDAPI_LOCAL_BUSINESS_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    SCRAPERBEE_API_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    // Encryption Configuration
    CREDENTIALS_ENCRYPTION_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Credentials encryption key is required").refine((key)=>{
        try {
            const decoded = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(key, "base64");
            return decoded.length === 32;
        } catch  {
            return false;
        }
    }, "Credentials encryption key must be a valid 32-byte base64 encoded string"),
    // Optional Environment Configuration
    NODE_ENV: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "development",
        "production",
        "test"
    ]).default("development"),
    NEXT_PUBLIC_APP_URL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url().optional()
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
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
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
            const filePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$path$272c$__ecmascript$29$__["join"])(process.cwd(), file);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["existsSync"])(filePath)) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["watchFile"])(filePath, {
                    interval: 1000
                }, ()=>{
                    this.handleConfigChange();
                });
            }
        });
        // Watch environment-specific config files
        const configFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$path$272c$__ecmascript$29$__["join"])(process.cwd(), `config.${("TURBOPACK compile-time value", "development") || 'development'}.json`);
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["existsSync"])(configFile)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["watchFile"])(configFile, {
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
            const filePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$path$272c$__ecmascript$29$__["join"])(process.cwd(), file);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["unwatchFile"])(filePath);
        });
        const configFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$path$272c$__ecmascript$29$__["join"])(process.cwd(), `config.${("TURBOPACK compile-time value", "development") || 'development'}.json`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["unwatchFile"])(configFile);
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
        this.configFilePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$path$272c$__ecmascript$29$__["join"])(process.cwd(), '.secure-config.json');
        this.loadFromDisk();
    }
    generateEncryptionKey() {
        const baseKey = process.env.CREDENTIALS_ENCRYPTION_KEY || (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$crypto$272c$__ecmascript$29$__["randomBytes"])(32).toString('base64');
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$crypto$272c$__ecmascript$29$__["createHash"])('sha256').update(baseKey).digest('hex');
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
        const configPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$path$272c$__ecmascript$29$__["join"])(process.cwd(), `.env.${key}`);
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["existsSync"])(configPath)) return;
        const watcher = ()=>{
            try {
                const newValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["readFileSync"])(configPath, 'utf8').trim();
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["watchFile"])(configPath, {
            interval: 1000
        }, watcher);
        this.watchers.set(key, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["unwatchFile"])(configPath, watcher));
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
            const iv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$crypto$272c$__ecmascript$29$__["randomBytes"])(16);
            const cipher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$crypto$272c$__ecmascript$29$__["createCipheriv"])(algorithm, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(this.encryptionKey, 'hex').slice(0, 32), iv);
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
            const iv = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(parts[0], 'hex');
            const encryptedData = parts[1];
            const decipher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$crypto$272c$__ecmascript$29$__["createDecipheriv"])(algorithm, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(this.encryptionKey, 'hex').slice(0, 32), iv);
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["writeFileSync"])(this.configFilePath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.warn('Failed to save secure config to disk:', error);
        }
    }
    loadFromDisk() {
        try {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["existsSync"])(this.configFilePath)) {
                const data = JSON.parse((0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["readFileSync"])(this.configFilePath, 'utf8'));
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
        this.configPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$path$272c$__ecmascript$29$__["join"])(process.cwd(), `config.${this.currentEnvironment}.json`);
        this.environmentConfig = this.loadEnvironmentConfig();
    }
    loadEnvironmentConfig() {
        const defaultConfig = defaultEnvironmentConfigs[this.currentEnvironment] || {};
        try {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["existsSync"])(this.configPath)) {
                const fileConfig = JSON.parse((0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["readFileSync"])(this.configPath, 'utf8'));
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["writeFileSync"])(this.configPath, JSON.stringify(this.environmentConfig, null, 2));
        } catch (error) {
            console.warn('Failed to save environment config:', error);
        }
    }
    getCurrentEnvironment() {
        return this.currentEnvironment;
    }
    switchEnvironment(environment) {
        this.currentEnvironment = environment;
        this.configPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$path$272c$__ecmascript$29$__["join"])(process.cwd(), `config.${environment}.json`);
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
"[project]/lib/config/startup.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StartupValidator",
    ()=>StartupValidator,
    "startupValidator",
    ()=>startupValidator,
    "validateStartup",
    ()=>validateStartup
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = /*#__PURE__*/ __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config/validation.ts [middleware-edge] (ecmascript)");
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["validateEnvironmentConfig"])();
            // Get detailed health status
            const healthStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getConfigHealthStatus"])();
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
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["configHotReloader"].enable();
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
            const errorMessage = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ConfigValidationError"] ? error.message : `Startup validation failed: ${error instanceof Error ? error.message : String(error)}`;
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
            const keyBuffer = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(encryptionKey, "base64");
            if (keyBuffer.length !== 32) {
                throw new Error("CREDENTIALS_ENCRYPTION_KEY must be exactly 32 bytes when base64 decoded");
            }
        } catch (error) {
            throw new Error(`Encryption configuration validation failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    validateEnvironmentSpecificConfig() {
        try {
            const envConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getEnvironmentConfig"])();
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
"[project]/lib/config/index.ts [middleware-edge] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Configuration validation and management
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$validation$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config/validation.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$startup$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config/startup.ts [middleware-edge] (ecmascript)");
;
;
;
}),
"[project]/lib/middleware/config-validation.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "configValidationMiddleware",
    ()=>configValidationMiddleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/config/index.ts [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$startup$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config/startup.ts [middleware-edge] (ecmascript)");
;
;
async function configValidationMiddleware(request) {
    // Skip validation for static assets and API routes that don't need config
    const { pathname } = request.nextUrl;
    if (pathname.startsWith("/_next/") || pathname.startsWith("/favicon") || pathname.includes(".") || pathname === "/api/health" // Allow health checks even with config issues
    ) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    try {
        // Validate configuration on first request
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$startup$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["startupValidator"].isConfigurationValid()) {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$startup$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["startupValidator"].validateStartupConfiguration();
            if (!result.success) {
                // Return configuration error page for non-API routes
                if (!pathname.startsWith("/api/")) {
                    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"](`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Configuration Error</title>
                <style>
                  body { font-family: Arial, sans-serif; margin: 40px; }
                  .error { color: #d32f2f; }
                  .warning { color: #f57c00; }
                  pre { background: #f5f5f5; padding: 20px; border-radius: 4px; }
                </style>
              </head>
              <body>
                <h1>Application Configuration Error</h1>
                <p>The application cannot start due to configuration issues:</p>
                <div class="error">
                  <h3>Errors:</h3>
                  <pre>${result.errors.join("\n")}</pre>
                </div>
                ${result.warnings.length > 0 ? `
                <div class="warning">
                  <h3>Warnings:</h3>
                  <pre>${result.warnings.join("\n")}</pre>
                </div>
                ` : ""}
                <p>Please check your environment variables and restart the application.</p>
              </body>
            </html>
            `, {
                        status: 500,
                        headers: {
                            "Content-Type": "text/html"
                        }
                    });
                } else {
                    // Return JSON error for API routes
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: "Configuration Error",
                        message: "Application configuration is invalid",
                        details: result.errors,
                        warnings: result.warnings
                    }, {
                        status: 500
                    });
                }
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    } catch (error) {
        console.error("Configuration validation middleware error:", error);
        if (!pathname.startsWith("/api/")) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"](`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Configuration Error</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; }
              .error { color: #d32f2f; }
            </style>
          </head>
          <body>
            <h1>Configuration Validation Failed</h1>
            <div class="error">
              <p>An unexpected error occurred during configuration validation:</p>
              <pre>${error instanceof Error ? error.message : String(error)}</pre>
            </div>
            <p>Please check your environment configuration and restart the application.</p>
          </body>
        </html>
        `, {
                status: 500,
                headers: {
                    "Content-Type": "text/html"
                }
            });
        } else {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Configuration Validation Failed",
                message: error instanceof Error ? error.message : String(error)
            }, {
                status: 500
            });
        }
    }
}
}),
"[project]/lib/rate-limiting/storage.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/rate-limiting/rate-limiter.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rateLimiter",
    ()=>rateLimiter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$storage$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/rate-limiting/storage.ts [middleware-edge] (ecmascript)");
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
            const entry = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$storage$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["rateLimitStorage"].get(key);
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
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$storage$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["rateLimitStorage"].increment(key);
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
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$storage$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["rateLimitStorage"].reset(key);
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
            const entry = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$storage$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["rateLimitStorage"].get(key);
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
"[project]/lib/rate-limiting/config.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/rate-limiting/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getClientIP",
    ()=>getClientIP,
    "rateLimitMiddleware",
    ()=>rateLimitMiddleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$rate$2d$limiter$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/rate-limiting/rate-limiter.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/rate-limiting/config.ts [middleware-edge] (ecmascript)");
;
;
;
async function rateLimitMiddleware(request, context) {
    const { userId, subscriptionPlan, ipAddress, endpoint } = context;
    try {
        // Collect all applicable rate limits
        const allLimits = [];
        // Global limits
        allLimits.push({
            identifier: 'global',
            limits: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RATE_LIMIT_CONFIG"].global
        });
        // IP-based limits
        allLimits.push({
            identifier: ipAddress,
            limits: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RATE_LIMIT_CONFIG"].ip
        });
        // User-based limits (if authenticated)
        if (userId && subscriptionPlan) {
            allLimits.push({
                identifier: userId,
                limits: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getRateLimitsForUser"])(subscriptionPlan)
            });
        }
        // Endpoint-specific limits
        const endpointLimits = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getRateLimitsForEndpoint"])(endpoint);
        if (endpointLimits.length > 0) {
            allLimits.push({
                identifier: `${endpoint}:${userId || ipAddress}`,
                limits: endpointLimits
            });
        }
        // Check all limits
        for (const { identifier, limits } of allLimits){
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$rate$2d$limiter$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["rateLimiter"].checkLimit(identifier, limits);
            if (!result.allowed) {
                // Rate limit exceeded
                const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: {
                        code: 'RATE_LIMIT_EXCEEDED',
                        message: 'Rate limit exceeded. Please try again later.',
                        details: {
                            remaining: result.remaining,
                            resetTime: result.resetTime.toISOString(),
                            retryAfter: result.retryAfter
                        }
                    }
                }, {
                    status: 429
                });
                // Add rate limit headers
                response.headers.set('X-RateLimit-Limit', limits[0]?.maxRequests.toString() || '0');
                response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
                response.headers.set('X-RateLimit-Reset', Math.floor(result.resetTime.getTime() / 1000).toString());
                if (result.retryAfter) {
                    response.headers.set('Retry-After', result.retryAfter.toString());
                }
                return response;
            }
        }
        // All limits passed, increment counters
        for (const { identifier, limits } of allLimits){
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$rate$2d$limiter$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["rateLimiter"].incrementCounter(identifier, limits);
        }
        return null // Continue to next middleware/handler
        ;
    } catch (error) {
        console.error('Rate limiting error:', error);
        // On error, allow the request to continue (fail open)
        return null;
    }
}
function getClientIP(request) {
    // Try to get real IP from various headers (for production behind proxies)
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const cfConnectingIP = request.headers.get('cf-connecting-ip');
    if (cfConnectingIP) return cfConnectingIP;
    if (realIP) return realIP;
    if (forwarded) return forwarded.split(',')[0].trim();
    // Fallback to request IP (Next.js doesn't have request.ip in edge runtime)
    return '127.0.0.1';
}
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$middleware$2f$config$2d$validation$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/middleware/config-validation.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$middleware$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/rate-limiting/middleware.ts [middleware-edge] (ecmascript)");
;
;
;
const SESSION_COOKIE_NAME = "firebaseSession";
async function middleware(request) {
    // First, validate configuration
    const configResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$middleware$2f$config$2d$validation$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["configValidationMiddleware"])(request);
    if (configResponse.status !== 200) {
        return configResponse;
    }
    // Apply rate limiting to API routes
    if (request.nextUrl.pathname.startsWith("/api/")) {
        const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
        let userId;
        let subscriptionPlan;
        // Extract user info from session if available
        if (sessionCookie) {
            // In a real implementation, decode the session to get user info
            // For now, use headers as fallback
            userId = request.headers.get('x-user-id') || undefined;
            subscriptionPlan = request.headers.get('x-subscription-plan') || 'free';
        }
        const rateLimitResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$middleware$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["rateLimitMiddleware"])(request, {
            userId,
            subscriptionPlan,
            ipAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limiting$2f$middleware$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getClientIP"])(request),
            endpoint: request.nextUrl.pathname
        });
        if (rateLimitResponse) {
            return rateLimitResponse;
        }
    }
    // Then proceed with authentication middleware
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const isAuthenticated = Boolean(sessionCookie);
    const { pathname } = request.nextUrl;
    if (!isAuthenticated && pathname.startsWith("/dashboard")) {
        const url = request.nextUrl.clone();
        url.pathname = "/auth/login";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    if (isAuthenticated && pathname.startsWith("/auth/")) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__4a1936f4._.js.map