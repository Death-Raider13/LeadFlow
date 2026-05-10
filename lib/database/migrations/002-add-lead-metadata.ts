import { createMigration } from "../migrations"
import { Transaction } from "firebase-admin/firestore"

// Add metadata fields to existing leads
export const addLeadMetadataMigration = createMigration(
  "002-add-lead-metadata",
  "Add metadata fields to existing leads",
  2,
  "Ensures all existing leads have proper metadata structure and default values",
  
  // Up migration - add metadata fields
  async (tx: Transaction) => {
    // Get all leads that don't have metadata field
    const leadsSnapshot = await tx.get(
      tx.firestore.collection("leads").where("metadata", "==", null)
    )
    
    // Update each lead to have empty metadata object
    for (const doc of leadsSnapshot.docs) {
      tx.update(doc.ref, {
        metadata: {},
        updated_at: new Date()
      })
    }
    
    // Record migration in metadata
    tx.set(tx.firestore.collection("_database_metadata").doc("lead_metadata_migration"), {
      leads_updated: leadsSnapshot.size,
      completed_at: new Date()
    })
  },
  
  // Down migration - remove metadata fields
  async (tx: Transaction) => {
    // This is a destructive operation, so we'll just remove the migration record
    // In practice, you might want to backup the data first
    tx.delete(tx.firestore.collection("_database_metadata").doc("lead_metadata_migration"))
  }
)