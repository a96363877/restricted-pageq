import { type NextRequest, NextResponse } from "next/server"

// This is an alternative server-side approach using a Route Handler
export async function GET(request: NextRequest) {
  // Generate a random delay between 1-10 seconds
  const randomDelay = Math.floor(Math.random() * 10) + 1

  // Create a response with navigation to another page
  const response = NextResponse.redirect(new URL("/fallback-page", request.url))

  // Set headers to control caching and revalidation
  response.headers.set("Cache-Control", `s-maxage=${randomDelay}, stale-while-revalidate`)

  return response
}

