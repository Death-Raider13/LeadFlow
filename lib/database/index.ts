import { firebaseAdminDb } from "@/lib/firebase/admin"
import { Lead, Campaign, Profile, CampaignRecipient } from "@/lib/types"
import { connectionManager } from "./connection-manager"
import { performanceMonitor } from "./performance-monitor"
import { PaginationManager, ResourceOptimizer } from "./pagination"
import { 
  CollectionReference, 
  DocumentReference, 
  Query, 
  Transaction,
  WriteBatch,
  Timestamp,
  FieldValue
} from "firebase-admin/firestore"

// Database interfaces from design document
export interface DatabaseLayer {
  // User operations
  createUser(user: CreateUserRequest): Promise<Profile>
  getUserById(id: string): Promise<Profile | null>
  updateUser(id: string, updates: Partial<Profile>): Promise<Profile>
  
  // Lead operations
  createLeads(leads: CreateLeadRequest[]): Promise<Lead[]>
  getLeadsByUser(userId: string, filters: LeadFilters): Promise<PaginatedResult<Lead>>
  updateLead(id: string, updates: Partial<Lead>): Promise<Lead>
  deleteLead(id: string): Promise<void>
  
  // Campaign operations
  createCampaign(campaign: CreateCampaignRequest): Promise<Campaign>
  getCampaignsByUser(userId: string, filters: CampaignFilters): Promise<PaginatedResult<Campaign>>
  updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign>
  deleteCampaign(id: string): Promise<void>
  
  // Campaign recipient operations
  createCampaignRecipients(recipients: CreateCampaignRecipientRequest[]): Promise<CampaignRecipient[]>
  getCampaignRecipients(campaignId: string): Promise<CampaignRecipient[]>
  updateCampaignRecipient(id: string, updates: Partial<CampaignRecipient>): Promise<CampaignRecipient>
  
  // Transaction support
  transaction<T>(callback: (tx: Transaction) => Promise<T>): Promise<T>
  batch(): WriteBatch
}

export interface CreateUserRequest {
  id: string
  full_name?: string
  company_name?: string
  subscription_plan?: "free" | "starter" | "pro" | "enterprise"
  email_credits?: number
  sms_credits?: number
}

export interface CreateLeadRequest {
  user_id: string
  name: string
  email?: string
  phone?: string
  source?: string
  status?: "new" | "contacted" | "qualified" | "converted" | "lost"
  tags?: string[]
  notes?: string
  metadata?: Record<string, unknown>
}

export interface CreateCampaignRequest {
  user_id: string
  name: string
  type: "email" | "sms"
  subject?: string
  content: string
  status?: "draft" | "scheduled" | "sent" | "cancelled"
  scheduled_at?: string
}

export interface CreateCampaignRecipientRequest {
  campaign_id: string
  lead_id: string
  status?: "pending" | "sent" | "delivered" | "opened" | "clicked" | "failed"
}

export interface LeadFilters {
  status?: string
  tags?: string[]
  source?: string
  search?: string
  page?: number
  limit?: number
}

export interface CampaignFilters {
  type?: "email" | "sms"
  status?: string
  page?: number
  limit?: number
}

export interface PaginatedResult<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    hasNext: boolean
  }
}

// Database error types
export class DatabaseError extends Error {
  constructor(
    message: string,
    public code: string,
    public operation: string,
    public details?: Record<string, any>
  ) {
    super(message)
    this.name = "DatabaseError"
  }
}

export class ValidationError extends DatabaseError {
  constructor(message: string, field: string, value: any) {
    super(message, "VALIDATION_ERROR", "validation", { field, value })
    this.name = "ValidationError"
  }
}

export class NotFoundError extends DatabaseError {
  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`, "NOT_FOUND", "read", { resource, id })
    this.name = "NotFoundError"
  }
}

// Collection names
export const COLLECTIONS = {
  PROFILES: "profiles",
  LEADS: "leads", 
  CAMPAIGNS: "campaigns",
  CAMPAIGN_RECIPIENTS: "campaign_recipients"
} as const

// Helper functions for data conversion
function timestampToString(timestamp: Timestamp | FieldValue | string): string {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toISOString()
  }
  if (typeof timestamp === "string") {
    return timestamp
  }
  return new Date().toISOString()
}

function convertFirestoreDoc<T>(doc: any, id: string): T {
  const data = doc.data()
  if (!data) {
    throw new NotFoundError("Document", id)
  }
  
  // Convert Firestore timestamps to ISO strings
  const converted = { ...data, id }
  if (data.created_at) {
    converted.created_at = timestampToString(data.created_at)
  }
  if (data.updated_at) {
    converted.updated_at = timestampToString(data.updated_at)
  }
  if (data.sent_at) {
    converted.sent_at = timestampToString(data.sent_at)
  }
  if (data.opened_at) {
    converted.opened_at = timestampToString(data.opened_at)
  }
  if (data.clicked_at) {
    converted.clicked_at = timestampToString(data.clicked_at)
  }
  if (data.scheduled_at) {
    converted.scheduled_at = timestampToString(data.scheduled_at)
  }
  
  return converted as T
}

// Main database implementation
class FirestoreDatabase implements DatabaseLayer {
  private db = firebaseAdminDb

  // User operations
  async createUser(user: CreateUserRequest): Promise<Profile> {
    const startTime = Date.now()
    try {
      const result = await connectionManager.executeWithRetry(async () => {
        const now = Timestamp.now()
        const userData = {
          full_name: user.full_name || null,
          company_name: user.company_name || null,
          subscription_plan: user.subscription_plan || "free",
          stripe_customer_id: null,
          stripe_subscription_id: null,
          email_credits: user.email_credits || 100,
          sms_credits: user.sms_credits || 10,
          accepted_policy: null,
          paystack_customer_code: null,
          paystack_subscription_code: null,
          paystack_email_token: null,
          created_at: now,
          updated_at: now
        }

        const docRef = this.db.collection(COLLECTIONS.PROFILES).doc(user.id)
        await docRef.set(userData)
        
        return convertFirestoreDoc<Profile>(await docRef.get(), user.id)
      }, "createUser")
      
      performanceMonitor.recordQuery(
        "create",
        COLLECTIONS.PROFILES,
        Date.now() - startTime,
        true
      )
      
      return result
    } catch (error) {
      performanceMonitor.recordQuery(
        "create",
        COLLECTIONS.PROFILES,
        Date.now() - startTime,
        false,
        error instanceof Error ? error.message : "Unknown error"
      )
      throw error
    }
  }

  async getUserById(id: string): Promise<Profile | null> {
    return connectionManager.executeWithRetry(async () => {
      const doc = await this.db.collection(COLLECTIONS.PROFILES).doc(id).get()
      if (!doc.exists) {
        return null
      }
      return convertFirestoreDoc<Profile>(doc, id)
    }, "getUserById")
  }

  async updateUser(id: string, updates: Partial<Profile>): Promise<Profile> {
    try {
      const docRef = this.db.collection(COLLECTIONS.PROFILES).doc(id)
      const updateData = {
        ...updates,
        updated_at: Timestamp.now()
      }
      
      // Remove undefined values
      Object.keys(updateData).forEach(key => {
        if (updateData[key as keyof typeof updateData] === undefined) {
          delete updateData[key as keyof typeof updateData]
        }
      })

      await docRef.update(updateData)
      return convertFirestoreDoc<Profile>(await docRef.get(), id)
    } catch (error) {
      throw new DatabaseError(
        `Failed to update user: ${error instanceof Error ? error.message : "Unknown error"}`,
        "UPDATE_FAILED", 
        "update",
        { userId: id }
      )
    }
  }

  // Lead operations
  async createLeads(leads: CreateLeadRequest[]): Promise<Lead[]> {
    try {
      const batch = this.db.batch()
      const now = Timestamp.now()
      const createdLeads: Lead[] = []

      for (const lead of leads) {
        const docRef = this.db.collection(COLLECTIONS.LEADS).doc()
        const leadData = {
          user_id: lead.user_id,
          name: lead.name,
          email: lead.email || null,
          phone: lead.phone || null,
          source: lead.source || null,
          status: lead.status || "new",
          tags: lead.tags || [],
          notes: lead.notes || null,
          metadata: lead.metadata || {},
          created_at: now,
          updated_at: now
        }

        batch.set(docRef, leadData)
        createdLeads.push({
          id: docRef.id,
          user_id: leadData.user_id,
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          source: leadData.source,
          status: leadData.status,
          tags: leadData.tags,
          notes: leadData.notes,
          metadata: leadData.metadata,
          created_at: now.toDate().toISOString(),
          updated_at: now.toDate().toISOString()
        })
      }

      await batch.commit()
      return createdLeads
    } catch (error) {
      throw new DatabaseError(
        `Failed to create leads: ${error instanceof Error ? error.message : "Unknown error"}`,
        "CREATE_FAILED",
        "create",
        { leadCount: leads.length }
      )
    }
  }

  async getLeadsByUser(userId: string, filters: LeadFilters = {}): Promise<PaginatedResult<Lead>> {
    const startTime = Date.now()
    try {
      // Validate pagination options
      const paginationOptions = PaginationManager.validatePaginationOptions(filters)
      
      // Generate query key for deduplication
      const queryKey = ResourceOptimizer.generateQueryKey(
        COLLECTIONS.LEADS,
        { userId, ...filters },
        paginationOptions
      )

      return await ResourceOptimizer.deduplicateQuery(queryKey, async () => {
        let query: Query = this.db.collection(COLLECTIONS.LEADS).where("user_id", "==", userId)

        // Apply filters
        if (filters.status) {
          query = query.where("status", "==", filters.status)
        }
        if (filters.source) {
          query = query.where("source", "==", filters.source)
        }
        if (filters.tags && filters.tags.length > 0) {
          query = query.where("tags", "array-contains-any", filters.tags)
        }

        // Apply search filter (requires composite index)
        if (filters.search) {
          // For now, we'll do client-side filtering for search
          // In production, consider using Algolia or similar for full-text search
        }

        // Use enhanced pagination
        const result = await PaginationManager.paginateQuery(
          query,
          {
            page: paginationOptions.page,
            limit: paginationOptions.limit,
            sortField: 'created_at',
            sortDirection: 'desc'
          },
          (doc) => convertFirestoreDoc<Lead>(doc, doc.id)
        )

        // Apply client-side search filter if needed
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase()
          result.data = result.data.filter(lead => 
            lead.name.toLowerCase().includes(searchTerm) ||
            (lead.email && lead.email.toLowerCase().includes(searchTerm)) ||
            (lead.phone && lead.phone.includes(searchTerm))
          )
        }

        performanceMonitor.recordQuery(
          "read",
          COLLECTIONS.LEADS,
          Date.now() - startTime,
          true
        )

        return result
      })
    } catch (error) {
      performanceMonitor.recordQuery(
        "read",
        COLLECTIONS.LEADS,
        Date.now() - startTime,
        false,
        error instanceof Error ? error.message : "Unknown error"
      )
      throw new DatabaseError(
        `Failed to get leads: ${error instanceof Error ? error.message : "Unknown error"}`,
        "READ_FAILED",
        "read",
        { userId, filters }
      )
    }
  }

  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
    try {
      const docRef = this.db.collection(COLLECTIONS.LEADS).doc(id)
      const updateData = {
        ...updates,
        updated_at: Timestamp.now()
      }
      
      // Remove undefined values and id
      Object.keys(updateData).forEach(key => {
        if (updateData[key as keyof typeof updateData] === undefined || key === "id") {
          delete updateData[key as keyof typeof updateData]
        }
      })

      await docRef.update(updateData)
      return convertFirestoreDoc<Lead>(await docRef.get(), id)
    } catch (error) {
      throw new DatabaseError(
        `Failed to update lead: ${error instanceof Error ? error.message : "Unknown error"}`,
        "UPDATE_FAILED",
        "update", 
        { leadId: id }
      )
    }
  }

  async deleteLead(id: string): Promise<void> {
    try {
      await this.db.collection(COLLECTIONS.LEADS).doc(id).delete()
    } catch (error) {
      throw new DatabaseError(
        `Failed to delete lead: ${error instanceof Error ? error.message : "Unknown error"}`,
        "DELETE_FAILED",
        "delete",
        { leadId: id }
      )
    }
  }

  // Campaign operations
  async createCampaign(campaign: CreateCampaignRequest): Promise<Campaign> {
    try {
      const now = Timestamp.now()
      const docRef = this.db.collection(COLLECTIONS.CAMPAIGNS).doc()
      const campaignData = {
        user_id: campaign.user_id,
        name: campaign.name,
        type: campaign.type,
        subject: campaign.subject || null,
        content: campaign.content,
        status: campaign.status || "draft",
        scheduled_at: campaign.scheduled_at ? Timestamp.fromDate(new Date(campaign.scheduled_at)) : null,
        sent_at: null,
        created_at: now,
        updated_at: now
      }

      await docRef.set(campaignData)
      return convertFirestoreDoc<Campaign>(await docRef.get(), docRef.id)
    } catch (error) {
      throw new DatabaseError(
        `Failed to create campaign: ${error instanceof Error ? error.message : "Unknown error"}`,
        "CREATE_FAILED",
        "create",
        { userId: campaign.user_id }
      )
    }
  }

  async getCampaignsByUser(userId: string, filters: CampaignFilters = {}): Promise<PaginatedResult<Campaign>> {
    const startTime = Date.now()
    try {
      // Validate pagination options
      const paginationOptions = PaginationManager.validatePaginationOptions(filters)
      
      // Generate query key for deduplication
      const queryKey = ResourceOptimizer.generateQueryKey(
        COLLECTIONS.CAMPAIGNS,
        { userId, ...filters },
        paginationOptions
      )

      return await ResourceOptimizer.deduplicateQuery(queryKey, async () => {
        let query: Query = this.db.collection(COLLECTIONS.CAMPAIGNS).where("user_id", "==", userId)

        // Apply filters
        if (filters.type) {
          query = query.where("type", "==", filters.type)
        }
        if (filters.status) {
          query = query.where("status", "==", filters.status)
        }

        // Use enhanced pagination
        const result = await PaginationManager.paginateQuery(
          query,
          {
            page: paginationOptions.page,
            limit: paginationOptions.limit,
            sortField: 'created_at',
            sortDirection: 'desc'
          },
          (doc) => convertFirestoreDoc<Campaign>(doc, doc.id)
        )

        performanceMonitor.recordQuery(
          "read",
          COLLECTIONS.CAMPAIGNS,
          Date.now() - startTime,
          true
        )

        return result
      })
    } catch (error) {
      performanceMonitor.recordQuery(
        "read",
        COLLECTIONS.CAMPAIGNS,
        Date.now() - startTime,
        false,
        error instanceof Error ? error.message : "Unknown error"
      )
      throw new DatabaseError(
        `Failed to get campaigns: ${error instanceof Error ? error.message : "Unknown error"}`,
        "READ_FAILED",
        "read",
        { userId, filters }
      )
    }
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign> {
    const startTime = Date.now()
    try {
      const result = await connectionManager.executeWithRetry(async () => {
        const docRef = this.db.collection(COLLECTIONS.CAMPAIGNS).doc(id)
        const updateData: any = {
          ...updates,
          updated_at: Timestamp.now()
        }
        
        // Handle timestamp fields - convert string dates to Timestamps
        if (updates.scheduled_at && typeof updates.scheduled_at === 'string') {
          updateData.scheduled_at = Timestamp.fromDate(new Date(updates.scheduled_at))
        }
        if (updates.sent_at && typeof updates.sent_at === 'string') {
          updateData.sent_at = Timestamp.fromDate(new Date(updates.sent_at))
        }
        
        // Remove undefined values and id
        Object.keys(updateData).forEach(key => {
          if (updateData[key] === undefined || key === "id") {
            delete updateData[key]
          }
        })

        await docRef.update(updateData)
        return convertFirestoreDoc<Campaign>(await docRef.get(), id)
      }, "updateCampaign")
      
      performanceMonitor.recordQuery(
        "update",
        COLLECTIONS.CAMPAIGNS,
        Date.now() - startTime,
        true
      )
      
      return result
    } catch (error) {
      performanceMonitor.recordQuery(
        "update",
        COLLECTIONS.CAMPAIGNS,
        Date.now() - startTime,
        false,
        error instanceof Error ? error.message : "Unknown error"
      )
      throw error
    }
  }

  async deleteCampaign(id: string): Promise<void> {
    try {
      await this.db.collection(COLLECTIONS.CAMPAIGNS).doc(id).delete()
    } catch (error) {
      throw new DatabaseError(
        `Failed to delete campaign: ${error instanceof Error ? error.message : "Unknown error"}`,
        "DELETE_FAILED",
        "delete",
        { campaignId: id }
      )
    }
  }

  // Campaign recipient operations
  async createCampaignRecipients(recipients: CreateCampaignRecipientRequest[]): Promise<CampaignRecipient[]> {
    try {
      const batch = this.db.batch()
      const now = Timestamp.now()
      const createdRecipients: CampaignRecipient[] = []

      for (const recipient of recipients) {
        const docRef = this.db.collection(COLLECTIONS.CAMPAIGN_RECIPIENTS).doc()
        const recipientData = {
          campaign_id: recipient.campaign_id,
          lead_id: recipient.lead_id,
          status: recipient.status || "pending",
          sent_at: null,
          opened_at: null,
          clicked_at: null,
          created_at: now
        }

        batch.set(docRef, recipientData)
        createdRecipients.push({
          id: docRef.id,
          campaign_id: recipientData.campaign_id,
          lead_id: recipientData.lead_id,
          status: recipientData.status,
          sent_at: null,
          opened_at: null,
          clicked_at: null,
          created_at: now.toDate().toISOString()
        })
      }

      await batch.commit()
      return createdRecipients
    } catch (error) {
      throw new DatabaseError(
        `Failed to create campaign recipients: ${error instanceof Error ? error.message : "Unknown error"}`,
        "CREATE_FAILED",
        "create",
        { recipientCount: recipients.length }
      )
    }
  }

  async getCampaignRecipients(campaignId: string): Promise<CampaignRecipient[]> {
    try {
      const snapshot = await this.db
        .collection(COLLECTIONS.CAMPAIGN_RECIPIENTS)
        .where("campaign_id", "==", campaignId)
        .orderBy("created_at", "desc")
        .get()

      return snapshot.docs.map(doc => convertFirestoreDoc<CampaignRecipient>(doc, doc.id))
    } catch (error) {
      throw new DatabaseError(
        `Failed to get campaign recipients: ${error instanceof Error ? error.message : "Unknown error"}`,
        "READ_FAILED",
        "read",
        { campaignId }
      )
    }
  }

  async updateCampaignRecipient(id: string, updates: Partial<CampaignRecipient>): Promise<CampaignRecipient> {
    const startTime = Date.now()
    try {
      const result = await connectionManager.executeWithRetry(async () => {
        const docRef = this.db.collection(COLLECTIONS.CAMPAIGN_RECIPIENTS).doc(id)
        const updateData: any = { ...updates }
        
        // Handle timestamp fields - convert string dates to Timestamps
        if (updates.sent_at && typeof updates.sent_at === 'string') {
          updateData.sent_at = Timestamp.fromDate(new Date(updates.sent_at))
        }
        if (updates.opened_at && typeof updates.opened_at === 'string') {
          updateData.opened_at = Timestamp.fromDate(new Date(updates.opened_at))
        }
        if (updates.clicked_at && typeof updates.clicked_at === 'string') {
          updateData.clicked_at = Timestamp.fromDate(new Date(updates.clicked_at))
        }
        
        // Remove undefined values and id
        Object.keys(updateData).forEach(key => {
          if (updateData[key] === undefined || key === "id") {
            delete updateData[key]
          }
        })

        await docRef.update(updateData)
        return convertFirestoreDoc<CampaignRecipient>(await docRef.get(), id)
      }, "updateCampaignRecipient")
      
      performanceMonitor.recordQuery(
        "update",
        COLLECTIONS.CAMPAIGN_RECIPIENTS,
        Date.now() - startTime,
        true
      )
      
      return result
    } catch (error) {
      performanceMonitor.recordQuery(
        "update",
        COLLECTIONS.CAMPAIGN_RECIPIENTS,
        Date.now() - startTime,
        false,
        error instanceof Error ? error.message : "Unknown error"
      )
      throw error
    }
  }

  // Transaction support
  async transaction<T>(callback: (tx: Transaction) => Promise<T>): Promise<T> {
    try {
      return await this.db.runTransaction(callback)
    } catch (error) {
      throw new DatabaseError(
        `Transaction failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        "TRANSACTION_FAILED",
        "transaction"
      )
    }
  }

  batch(): WriteBatch {
    return this.db.batch()
  }

  // Streaming operations for large datasets
  async streamLeadsByUser(
    userId: string,
    processor: (leads: Lead[]) => Promise<void>,
    options: { batchSize?: number; filters?: Omit<LeadFilters, 'page' | 'limit'> } = {}
  ): Promise<{ totalProcessed: number; totalErrors: number }> {
    try {
      let query: Query = this.db.collection(COLLECTIONS.LEADS).where("user_id", "==", userId)

      // Apply filters
      if (options.filters?.status) {
        query = query.where("status", "==", options.filters.status)
      }
      if (options.filters?.source) {
        query = query.where("source", "==", options.filters.source)
      }
      if (options.filters?.tags && options.filters.tags.length > 0) {
        query = query.where("tags", "array-contains-any", options.filters.tags)
      }

      query = query.orderBy("created_at", "desc")

      let totalProcessed = 0
      let totalErrors = 0
      let lastDoc: any = null
      const batchSize = options.batchSize || 100

      while (true) {
        let batchQuery = query.limit(batchSize)
        if (lastDoc) {
          batchQuery = batchQuery.startAfter(lastDoc)
        }

        const snapshot = await batchQuery.get()
        if (snapshot.empty) break

        const leads = snapshot.docs.map(doc => convertFirestoreDoc<Lead>(doc, doc.id))
        
        try {
          await processor(leads)
          totalProcessed += leads.length
        } catch (error) {
          totalErrors += leads.length
          throw error
        }

        lastDoc = snapshot.docs[snapshot.docs.length - 1]
        
        // Break if we got fewer documents than requested (end of data)
        if (snapshot.docs.length < batchSize) break
      }

      return { totalProcessed, totalErrors }
    } catch (error) {
      throw new DatabaseError(
        `Failed to stream leads: ${error instanceof Error ? error.message : "Unknown error"}`,
        "STREAM_FAILED",
        "stream",
        { userId }
      )
    }
  }

  async streamCampaignsByUser(
    userId: string,
    processor: (campaigns: Campaign[]) => Promise<void>,
    options: { batchSize?: number; filters?: Omit<CampaignFilters, 'page' | 'limit'> } = {}
  ): Promise<{ totalProcessed: number; totalErrors: number }> {
    try {
      let query: Query = this.db.collection(COLLECTIONS.CAMPAIGNS).where("user_id", "==", userId)

      // Apply filters
      if (options.filters?.type) {
        query = query.where("type", "==", options.filters.type)
      }
      if (options.filters?.status) {
        query = query.where("status", "==", options.filters.status)
      }

      query = query.orderBy("created_at", "desc")

      let totalProcessed = 0
      let totalErrors = 0
      let lastDoc: any = null
      const batchSize = options.batchSize || 100

      while (true) {
        let batchQuery = query.limit(batchSize)
        if (lastDoc) {
          batchQuery = batchQuery.startAfter(lastDoc)
        }

        const snapshot = await batchQuery.get()
        if (snapshot.empty) break

        const campaigns = snapshot.docs.map(doc => convertFirestoreDoc<Campaign>(doc, doc.id))
        
        try {
          await processor(campaigns)
          totalProcessed += campaigns.length
        } catch (error) {
          totalErrors += campaigns.length
          throw error
        }

        lastDoc = snapshot.docs[snapshot.docs.length - 1]
        
        // Break if we got fewer documents than requested (end of data)
        if (snapshot.docs.length < batchSize) break
      }

      return { totalProcessed, totalErrors }
    } catch (error) {
      throw new DatabaseError(
        `Failed to stream campaigns: ${error instanceof Error ? error.message : "Unknown error"}`,
        "STREAM_FAILED",
        "stream",
        { userId }
      )
    }
  }
}

// Export singleton instance
export const database = new FirestoreDatabase()
export default database

// Export pagination and streaming utilities
export { PaginationManager, ResourceOptimizer, BatchProcessor } from './pagination'
export { StreamingProcessor, FirestoreDataStream, BatchTransformStream, ResultCollectorStream } from './streaming'
export { QueryOptimizer, OptimizedQueryBuilder, DatabasePerformanceMonitor } from './query-optimizer'
export type { PaginationOptions, CursorPaginationOptions, StreamOptions, ProcessingStats } from './pagination'
export type { StreamingOptions, DataStreamOptions } from './streaming'
export type { QueryOptimizationOptions, QueryPerformanceMetrics, IndexRecommendation } from './query-optimizer'