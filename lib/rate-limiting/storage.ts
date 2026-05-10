import { RateLimitKey, RateLimitEntry } from './types'

// In-memory storage for rate limiting (in production, use Redis)
class RateLimitStorage {
  private storage = new Map<string, RateLimitEntry>()
  
  private generateKey(key: RateLimitKey): string {
    return `${key.type}:${key.identifier}:${key.window}`
  }
  
  async get(key: RateLimitKey): Promise<RateLimitEntry | null> {
    const storageKey = this.generateKey(key)
    const entry = this.storage.get(storageKey)
    
    if (!entry) {
      return null
    }
    
    // Check if the window has expired
    if (Date.now() > entry.resetTime.getTime()) {
      this.storage.delete(storageKey)
      return null
    }
    
    return entry
  }
  
  async set(key: RateLimitKey, entry: RateLimitEntry): Promise<void> {
    const storageKey = this.generateKey(key)
    this.storage.set(storageKey, entry)
  }
  
  async increment(key: RateLimitKey): Promise<RateLimitEntry> {
    const existing = await this.get(key)
    const now = new Date()
    
    if (!existing) {
      // Create new entry
      const resetTime = new Date(now.getTime() + key.window * 1000)
      const entry: RateLimitEntry = {
        count: 1,
        windowStart: now,
        resetTime,
      }
      await this.set(key, entry)
      return entry
    }
    
    // Increment existing entry
    existing.count += 1
    await this.set(key, existing)
    return existing
  }
  
  async reset(key: RateLimitKey): Promise<void> {
    const storageKey = this.generateKey(key)
    this.storage.delete(storageKey)
  }
  
  // Cleanup expired entries (should be called periodically)
  cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.storage.entries()) {
      if (now > entry.resetTime.getTime()) {
        this.storage.delete(key)
      }
    }
  }
}

export const rateLimitStorage = new RateLimitStorage()

// Cleanup expired entries every 5 minutes
setInterval(() => {
  rateLimitStorage.cleanup()
}, 5 * 60 * 1000)