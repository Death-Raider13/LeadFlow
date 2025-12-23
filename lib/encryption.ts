import crypto from "crypto"

// Master key must be a 32-byte key, provided as base64 in env CREDENTIALS_ENCRYPTION_KEY
const MASTER_KEY_ENV = process.env.CREDENTIALS_ENCRYPTION_KEY

if (!MASTER_KEY_ENV) {
  // We intentionally do not throw at import time to avoid breaking build if env is missing.
  // The API routes that depend on this should validate and throw a clear error instead.
  console.warn("CREDENTIALS_ENCRYPTION_KEY is not set. Encryption helpers will fail until it is configured.")
}

function getMasterKey(): Buffer {
  if (!MASTER_KEY_ENV) {
    throw new Error("CREDENTIALS_ENCRYPTION_KEY is not configured")
  }
  const key = Buffer.from(MASTER_KEY_ENV, "base64")
  if (key.length !== 32) {
    throw new Error("CREDENTIALS_ENCRYPTION_KEY must be a 32-byte key encoded in base64")
  }
  return key
}

export function generateRandomKey(): string {
  // 32 random bytes, returned as base64
  return crypto.randomBytes(32).toString("base64")
}

export interface EncryptedPayload {
  ciphertext: string
  iv: string
  authTag: string
}

export function encryptWithKey(keyBase64: string, plaintext: string): EncryptedPayload {
  const key = Buffer.from(keyBase64, "base64")
  if (key.length !== 32) {
    throw new Error("Encryption key must be 32 bytes (base64-encoded)")
  }

  const iv = crypto.randomBytes(12) // recommended IV size for GCM
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)

  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()])
  const authTag = cipher.getAuthTag()

  return {
    ciphertext: encrypted.toString("base64"),
    iv: iv.toString("base64"),
    authTag: authTag.toString("base64"),
  }
}

export function decryptWithKey(keyBase64: string, payload: EncryptedPayload): string {
  const key = Buffer.from(keyBase64, "base64")
  if (key.length !== 32) {
    throw new Error("Encryption key must be 32 bytes (base64-encoded)")
  }

  const iv = Buffer.from(payload.iv, "base64")
  const authTag = Buffer.from(payload.authTag, "base64")
  const ciphertext = Buffer.from(payload.ciphertext, "base64")

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)
  decipher.setAuthTag(authTag)

  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()])
  return decrypted.toString("utf8")
}

// Wrap/unwrap per-user data key using master key

export function wrapUserKey(userKeyBase64: string): EncryptedPayload {
  const masterKey = getMasterKey()
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv("aes-256-gcm", masterKey, iv)

  const encrypted = Buffer.concat([cipher.update(userKeyBase64, "utf8"), cipher.final()])
  const authTag = cipher.getAuthTag()

  return {
    ciphertext: encrypted.toString("base64"),
    iv: iv.toString("base64"),
    authTag: authTag.toString("base64"),
  }
}

export function unwrapUserKey(payload: EncryptedPayload): string {
  const masterKey = getMasterKey()

  const iv = Buffer.from(payload.iv, "base64")
  const authTag = Buffer.from(payload.authTag, "base64")
  const ciphertext = Buffer.from(payload.ciphertext, "base64")

  const decipher = crypto.createDecipheriv("aes-256-gcm", masterKey, iv)
  decipher.setAuthTag(authTag)

  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()])
  return decrypted.toString("utf8")
}
