// Enhanced authentication system exports
export {
  EnhancedAuthSystem,
  enhancedAuth,
  validateSessionWithAudit,
  type AuthResult,
  type AuthUser,
  type Permission,
  type LoginMetadata,
  type SessionAuditLog,
  type TokenPair
} from "./enhanced-auth"

export {
  SessionCleanupService,
  sessionCleanup
} from "./session-cleanup"

// Re-export server auth utilities
export {
  getServerUser,
  createEnhancedSession,
  revokeEnhancedSession,
  SESSION_COOKIE_NAME
} from "../firebase/server-auth"