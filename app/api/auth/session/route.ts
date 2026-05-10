import { NextResponse, type NextRequest } from "next/server"
import { firebaseAdminAuth } from "@/lib/firebase/admin"
import { SESSION_COOKIE_NAME } from "@/lib/firebase/server-auth"
import { SecureCookieManager } from "@/lib/security/cookie-config"

const SESSION_MAX_AGE = 60 * 60 * 24 * 14 // 14 days

export async function POST(request: NextRequest) {
  try {
    const { idToken } = (await request.json()) as { idToken?: string }

    if (!idToken) {
      return NextResponse.json({ error: "Missing idToken" }, { status: 400 })
    }

    const decoded = await firebaseAdminAuth.verifyIdToken(idToken)

    const expiresIn = SESSION_MAX_AGE * 1000
    const sessionCookie = await firebaseAdminAuth.createSessionCookie(idToken, { expiresIn })

    let response = NextResponse.json({ success: true, uid: decoded.uid })

    // Use secure cookie configuration
    response = SecureCookieManager.createSessionCookie(response, sessionCookie, SESSION_MAX_AGE)
    
    // Apply security headers
    response = SecureCookieManager.applySecurityHeaders(response)

    return response
  } catch (error) {
    console.error("Error creating session cookie", error)
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 })
  }
}

export async function DELETE() {
  let response = NextResponse.json({ success: true })

  // Use secure cookie clearing
  response = SecureCookieManager.clearAllAuthCookies(response)
  
  // Apply security headers
  response = SecureCookieManager.applySecurityHeaders(response)

  return response
}
