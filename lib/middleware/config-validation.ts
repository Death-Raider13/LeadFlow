import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { startupValidator } from "@/lib/config"

// Configuration validation middleware
export async function configValidationMiddleware(request: NextRequest) {
  // Skip validation for static assets and API routes that don't need config
  const { pathname } = request.nextUrl
  
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".") ||
    pathname === "/api/health" // Allow health checks even with config issues
  ) {
    return NextResponse.next()
  }
  
  try {
    // Validate configuration on first request
    if (!startupValidator.isConfigurationValid()) {
      const result = await startupValidator.validateStartupConfiguration()
      
      if (!result.success) {
        // Return configuration error page for non-API routes
        if (!pathname.startsWith("/api/")) {
          return new NextResponse(
            `
            <!DOCTYPE html>
            <html>
              <head>
                <title>Configuration Error</title>
                <style>
                  body { font-family: Arial, sans-serif; margin: 40px; }
                  .error { color: #d32f2f; }
                  .warning { color: #f57c00; }
                  pre { background: #f5f5f5; padding: 20px; border-radius: 4px; }
                </style>
              </head>
              <body>
                <h1>Application Configuration Error</h1>
                <p>The application cannot start due to configuration issues:</p>
                <div class="error">
                  <h3>Errors:</h3>
                  <pre>${result.errors.join("\n")}</pre>
                </div>
                ${result.warnings.length > 0 ? `
                <div class="warning">
                  <h3>Warnings:</h3>
                  <pre>${result.warnings.join("\n")}</pre>
                </div>
                ` : ""}
                <p>Please check your environment variables and restart the application.</p>
              </body>
            </html>
            `,
            {
              status: 500,
              headers: {
                "Content-Type": "text/html",
              },
            }
          )
        } else {
          // Return JSON error for API routes
          return NextResponse.json(
            {
              error: "Configuration Error",
              message: "Application configuration is invalid",
              details: result.errors,
              warnings: result.warnings,
            },
            { status: 500 }
          )
        }
      }
    }
    
    return NextResponse.next()
    
  } catch (error) {
    console.error("Configuration validation middleware error:", error)
    
    if (!pathname.startsWith("/api/")) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Configuration Error</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; }
              .error { color: #d32f2f; }
            </style>
          </head>
          <body>
            <h1>Configuration Validation Failed</h1>
            <div class="error">
              <p>An unexpected error occurred during configuration validation:</p>
              <pre>${error instanceof Error ? error.message : String(error)}</pre>
            </div>
            <p>Please check your environment configuration and restart the application.</p>
          </body>
        </html>
        `,
        {
          status: 500,
          headers: {
            "Content-Type": "text/html",
          },
        }
      )
    } else {
      return NextResponse.json(
        {
          error: "Configuration Validation Failed",
          message: error instanceof Error ? error.message : String(error),
        },
        { status: 500 }
      )
    }
  }
}