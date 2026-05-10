import { Timestamp } from "firebase-admin/firestore"

/**
 * Recursively serializes Firestore data by converting Timestamps to ISO strings.
 * This ensures data can be passed from Server Components to Client Components.
 */
export function serializeFirestoreData(data: any): any {
  if (data === null || data === undefined) {
    return data
  }

  // Handle Arrays
  if (Array.isArray(data)) {
    return data.map((item) => serializeFirestoreData(item))
  }

  // Handle Firestore Timestamps (Admin SDK)
  if (data instanceof Timestamp || (data && typeof data.toDate === "function" && data._seconds !== undefined)) {
    return data.toDate().toISOString()
  }

  // Handle Dates
  if (data instanceof Date) {
    return data.toISOString()
  }

  // Handle Objects
  if (typeof data === "object") {
    const serialized: any = {}
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        serialized[key] = serializeFirestoreData(data[key])
      }
    }
    return serialized
  }

  return data
}
