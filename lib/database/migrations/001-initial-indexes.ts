import { createMigration } from "../migrations"
import { Transaction } from "firebase-admin/firestore"

// Initial database indexes migration
export const initialIndexesMigration = createMigration(
  "001-initial-indexes",
  "Create initial database indexes",
  1,
  "Creates indexes for common query patterns on leads, campaigns, and profiles collections",
  
  // Up migration - create indexes
  async (tx: Transaction) => {
    // Note: Firestore indexes are typically created through the Firebase console
    // or using the Firebase CLI. This migration serves as documentation
    // and could trigger index creation through the Admin SDK if needed.
    
    // For now, we'll create a metadata document to track this migration
    const indexesDoc = tx.get(
      tx.firestore.collection("_database_metadata").doc("indexes")
    )
    
    tx.set(tx.firestore.collection("_database_metadata").doc("indexes"), {
      created_indexes: [
        {
          collection: "leads",
          fields: ["user_id", "status"],
          description: "Query leads by user and status"
        },
        {
          collection: "leads", 
          fields: ["user_id", "created_at"],
          description: "Query leads by user ordered by creation date"
        },
        {
          collection: "campaigns",
          fields: ["user_id", "type"],
          description: "Query campaigns by user and type"
        },
        {
          collection: "campaigns",
          fields: ["user_id", "status"],
          description: "Query campaigns by user and status"
        },
        {
          collection: "campaign_recipients",
          fields: ["campaign_id", "status"],
          description: "Query campaign recipients by campaign and status"
        }
      ],
      created_at: new Date()
    })
  },
  
  // Down migration - remove indexes
  async (tx: Transaction) => {
    // Remove the metadata document
    tx.delete(tx.firestore.collection("_database_metadata").doc("indexes"))
  }
)