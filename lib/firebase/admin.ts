import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import { getConfig } from "@/lib/config"

// Get validated configuration
const config = getConfig()

let privateKey = config.FIREBASE_PRIVATE_KEY

if (privateKey && privateKey.startsWith("\"")) {
  privateKey = privateKey.slice(1, -1)
}

if (privateKey) {
  privateKey = privateKey.replace(/\\n/g, "\n")
}

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: config.FIREBASE_PROJECT_ID,
      clientEmail: config.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  })
}

export const firebaseAdminAuth = getAuth()
export const firebaseAdminDb = getFirestore()
