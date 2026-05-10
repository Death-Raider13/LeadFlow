import { z } from 'zod'

// Base validation schemas
export const emailSchema = z.string().email('Invalid email format')
export const phoneSchema = z.string().regex(/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/, 'Invalid phone format')
export const uuidSchema = z.string().uuid('Invalid UUID format')
export const nonEmptyStringSchema = z.string().min(1, 'Field cannot be empty').trim()

// Sanitization patterns
export const sanitizePatterns = {
  xss: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|javascript:/gi,
  sqlInjection: /('|(\\')|(;)|(\\)|(--)|(\s+(or|and)\s+))/gi,
  htmlTags: /<[^>]*>/g,
  specialChars: /[<>'"&]/g,
} as const

// Lead validation schemas
export const createLeadSchema = z.object({
  name: nonEmptyStringSchema.max(255, 'Name too long'),
  email: emailSchema.optional().nullable(),
  phone: phoneSchema.optional().nullable(),
  source: z.string().max(500, 'Source too long').optional().nullable(),
  status: z.enum(['new', 'contacted', 'qualified', 'converted', 'lost']).default('new'),
  tags: z.array(z.string().max(50, 'Tag too long')).max(20, 'Too many tags').default([]),
  notes: z.string().max(2000, 'Notes too long').optional().nullable(),
  metadata: z.record(z.unknown()).default({}),
})

export const updateLeadSchema = createLeadSchema.partial()

export const leadFiltersSchema = z.object({
  status: z.enum(['new', 'contacted', 'qualified', 'converted', 'lost']).optional(),
  tags: z.array(z.string()).optional(),
  search: z.string().max(255, 'Search term too long').optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

// Campaign validation schemas
export const createCampaignSchema = z.object({
  name: nonEmptyStringSchema.max(255, 'Campaign name too long'),
  type: z.enum(['email', 'sms']),
  subject: z.string().max(255, 'Subject too long').optional().nullable(),
  content: nonEmptyStringSchema.max(10000, 'Content too long'),
  scheduled_at: z.string().datetime().optional().nullable(),
})

export const updateCampaignSchema = createCampaignSchema.partial()

export const sendCampaignSchema = z.object({
  campaignId: uuidSchema,
})

// Lead generation validation schemas
export const generateLeadsSchema = z.object({
  category: z.string().max(100, 'Category too long').default('restaurant'),
  location: nonEmptyStringSchema.max(255, 'Location too long'),
  searchMode: z.enum(['random', 'nearest', 'explore']).default('random'),
  excludePlaceIds: z.array(z.string().max(255, 'Place ID too long')).max(100, 'Too many excluded places').default([]),
})

// Integration credentials validation schemas
export const credentialsSchema = z.object({
  ultramsgInstanceId: z.string().max(255, 'Instance ID too long').optional(),
  ultramsgToken: z.string().max(500, 'Token too long').optional(),
  gmailAddress: emailSchema.optional(),
  gmailAppPassword: z.string().max(255, 'App password too long').optional(),
}).refine(
  (data) => data.ultramsgInstanceId || data.ultramsgToken || data.gmailAddress || data.gmailAppPassword,
  { message: 'At least one credential must be provided' }
)

// Authentication validation schemas
export const sessionSchema = z.object({
  token: nonEmptyStringSchema.max(2000, 'Token too long'),
  refreshToken: z.string().max(2000, 'Refresh token too long').optional(),
})

// API key validation schemas
export const apiKeySchema = z.object({
  key: nonEmptyStringSchema.max(500, 'API key too long'),
  service: z.enum(['geoapify', 'rapidapi', 'scraperbee', 'ultramsg']),
})

// Pagination schema
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.string().max(50, 'Sort field too long').optional(),
  order: z.enum(['asc', 'desc']).default('desc'),
})

// File upload validation schemas
export const fileUploadSchema = z.object({
  filename: nonEmptyStringSchema.max(255, 'Filename too long'),
  contentType: z.string().max(100, 'Content type too long'),
  size: z.number().int().min(1).max(10 * 1024 * 1024), // 10MB max
})

// Webhook validation schemas
export const webhookSchema = z.object({
  event: nonEmptyStringSchema.max(100, 'Event type too long'),
  data: z.record(z.unknown()),
  timestamp: z.number().int().positive(),
  signature: nonEmptyStringSchema.max(500, 'Signature too long'),
})

export type CreateLeadInput = z.infer<typeof createLeadSchema>
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>
export type LeadFiltersInput = z.infer<typeof leadFiltersSchema>
export type CreateCampaignInput = z.infer<typeof createCampaignSchema>
export type UpdateCampaignInput = z.infer<typeof updateCampaignSchema>
export type SendCampaignInput = z.infer<typeof sendCampaignSchema>
export type GenerateLeadsInput = z.infer<typeof generateLeadsSchema>
export type CredentialsInput = z.infer<typeof credentialsSchema>
export type SessionInput = z.infer<typeof sessionSchema>
export type ApiKeyInput = z.infer<typeof apiKeySchema>
export type PaginationInput = z.infer<typeof paginationSchema>
export type FileUploadInput = z.infer<typeof fileUploadSchema>
export type WebhookInput = z.infer<typeof webhookSchema>