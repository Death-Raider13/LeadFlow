import { NextRequest, NextResponse } from "next/server"
import { enhancedEncryption } from "@/lib/encryption"
import { getServerUser } from "@/lib/firebase/server-auth"

// Get user's encryption key information
export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    // Get user's key information
    const userKeyInfo = enhancedEncryption.getUserKeyInfo(user.uid)
    
    if (!userKeyInfo) {
      return NextResponse.json({
        hasKey: false,
        message: "No encryption key found for user"
      })
    }
    
    return NextResponse.json({
      hasKey: true,
      keyInfo: {
        version: userKeyInfo.keyVersion,
        createdAt: userKeyInfo.metadata.createdAt,
        algorithm: userKeyInfo.metadata.algorithm,
        isActive: userKeyInfo.metadata.isActive,
        rotatedAt: userKeyInfo.metadata.rotatedAt
      }
    })
    
  } catch (error) {
    console.error("Key management error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Rotate user's encryption key
export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    const { action } = await request.json()
    
    if (action === "rotate") {
      // Rotate the user's encryption key
      await enhancedEncryption.rotateUserKey(user.uid)
      
      // Get updated key information
      const updatedKeyInfo = enhancedEncryption.getUserKeyInfo(user.uid)
      
      return NextResponse.json({
        success: true,
        message: "Encryption key rotated successfully",
        newKeyInfo: updatedKeyInfo ? {
          version: updatedKeyInfo.keyVersion,
          createdAt: updatedKeyInfo.metadata.createdAt,
          algorithm: updatedKeyInfo.metadata.algorithm,
          isActive: updatedKeyInfo.metadata.isActive,
          rotatedAt: updatedKeyInfo.metadata.rotatedAt
        } : null
      })
      
    } else if (action === "validate") {
      // Validate key integrity
      const isValid = await enhancedEncryption.validateKeyIntegrity()
      
      return NextResponse.json({
        success: true,
        keyIntegrityValid: isValid,
        message: isValid ? "Key integrity validation passed" : "Key integrity validation failed"
      })
      
    } else {
      return NextResponse.json(
        { error: "Invalid action. Supported actions: rotate, validate" },
        { status: 400 }
      )
    }
    
  } catch (error) {
    console.error("Key management operation error:", error)
    return NextResponse.json(
      { 
        error: "Key management operation failed",
        message: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

// Get encryption statistics (admin only - simplified for demo)
export async function PUT(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    // In a real implementation, check if user is admin
    // For demo purposes, allow any authenticated user to see stats
    
    const stats = enhancedEncryption.getKeyStatistics()
    
    return NextResponse.json({
      success: true,
      statistics: stats
    })
    
  } catch (error) {
    console.error("Encryption statistics error:", error)
    return NextResponse.json(
      { error: "Failed to get encryption statistics" },
      { status: 500 }
    )
  }
}