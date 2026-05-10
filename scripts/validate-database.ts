#!/usr/bin/env tsx

import { database } from "../lib/database"
import { connectionManager } from "../lib/database/connection-manager"
import { performanceMonitor } from "../lib/database/performance-monitor"

async function validateDatabase() {
  console.log("🔍 Validating database implementation...")

  try {
    // Test connection manager
    console.log("\n📊 Connection Manager Status:")
    const status = connectionManager.getStatus()
    console.log(`- Healthy: ${status.isHealthy}`)
    console.log(`- Active Connections: ${status.activeConnections}`)
    console.log(`- Max Connections: ${status.config.maxConnections}`)

    // Test performance monitor
    console.log("\n📈 Performance Monitor:")
    const stats = performanceMonitor.getStats()
    console.log(`- Total Queries: ${stats.totalQueries}`)
    console.log(`- Average Response Time: ${stats.averageResponseTime.toFixed(2)}ms`)
    console.log(`- Error Rate: ${(stats.errorRate * 100).toFixed(2)}%`)

    // Test basic database operations (without actually creating data)
    console.log("\n🗄️ Database Interface Validation:")
    
    // Check if database methods exist
    const methods = [
      'createUser',
      'getUserById', 
      'updateUser',
      'createLeads',
      'getLeadsByUser',
      'updateLead',
      'deleteLead',
      'createCampaign',
      'getCampaignsByUser',
      'updateCampaign',
      'deleteCampaign',
      'transaction',
      'batch'
    ]

    for (const method of methods) {
      const exists = typeof (database as any)[method] === 'function'
      console.log(`- ${method}: ${exists ? '✅' : '❌'}`)
    }

    console.log("\n✅ Database implementation validation completed successfully!")
    
  } catch (error) {
    console.error("\n❌ Database validation failed:", error)
    process.exit(1)
  }
}

// Run validation
validateDatabase().catch(console.error)