import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Only apply restrictions to specific routes
  if (path === "/restricted-page" || path.startsWith("/restricted-section")) {
    // Check if user is from Google company
    const isFromGoogleCompany = await checkGoogleCompany(request)

    // If user is from Google, block access completely
    if (isFromGoogleCompany) {
      // Send to blocked page instead of returning a 403 status
      return NextResponse.redirect(new URL("/blocked", request.url))
    }

    // Check all three conditions for regular access
    const meetsAllRestrictions = await checkAllRestrictions(request)

    if (!meetsAllRestrictions) {
      // For most cases, send to the verification page
      const url = new URL("/access-verification", request.url)

      // Add a random seed to prevent caching
      url.searchParams.set("seed", Math.random().toString(36).substring(2, 8))

      return NextResponse.redirect(url)
    }
  }

  // Continue with the request if restrictions are met
  return NextResponse.next()
}

async function checkGoogleCompany(request: NextRequest): Promise<boolean> {
  // Get client IP address
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || request.ip || "0.0.0.0"

  try {
    // Check if IP belongs to Google's corporate network
    // Method 1: Use a geolocation API that provides organization info
    const response = await fetch(`https://ipapi.co/${ip}/json/`)

    if (!response.ok) {
      console.error("Failed to fetch IP data")
      return false
    }

    const data = await response.json()

    // Check if organization or ASN belongs to Google
    const org = (data.org || "").toLowerCase()
    const asn = (data.asn || "").toLowerCase()

    if (org.includes("google") || asn.includes("google") || org.includes("alphabet")) {
      console.log("Blocked access from Google company IP")
      return true
    }

    // Method 2: Check Google corporate email domain if authenticated
    const userEmail = getUserEmailFromSession(request)
    if (userEmail && userEmail.endsWith("@google.com")) {
      console.log("Blocked access from Google company email")
      return true
    }

    // Method 3: Check for Google corporate VPN or network signatures
    const userAgent = request.headers.get("user-agent") || ""
    if (userAgent.includes("GoogleCorporate") || userAgent.includes("GoogleWorkspace")) {
      console.log("Blocked access from Google corporate user agent")
      return true
    }

    return false
  } catch (error) {
    console.error("Error checking Google company:", error)
    return false
  }
}

// Helper function to get user email from session (if available)
function getUserEmailFromSession(request: NextRequest): string | null {
  // This is a placeholder - implement based on your authentication system
  // For example, you might extract this from a JWT token or session cookie

  // Example implementation:
  // const session = request.cookies.get('session')?.value
  // if (session) {
  //   try {
  //     const decoded = JSON.parse(atob(session.split('.')[1]))
  //     return decoded.email || null
  //   } catch (e) {
  //     return null
  //   }
  // }

  return null
}

async function checkAllRestrictions(request: NextRequest): Promise<boolean> {
  // 1. Check if user is coming from Google Ads
  const isFromGoogleAds = checkGoogleAdsReferrer(request)

  // 2. Check if user is on a mobile phone
  const isOnMobilePhone = checkMobileDevice(request)

  // 3. Check if user's IP and location are in Kuwait
  const isInKuwait = await checkKuwaitLocation(request)

  // All conditions must be true
  return isFromGoogleAds && isOnMobilePhone && isInKuwait
}

function checkGoogleAdsReferrer(request: NextRequest): boolean {
  const referer = request.headers.get("referer") || ""

  // Check for Google Ads referrers
  // Google Ads URLs typically contain gclid parameter or come from google domains
  return referer.includes("gclid=") || referer.includes("google.com") || referer.includes("googleadservices.com")
}

function checkMobileDevice(request: NextRequest): boolean {
  const userAgent = request.headers.get("user-agent") || ""

  // Common mobile device detection regex
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

  return mobileRegex.test(userAgent)
}

async function checkKuwaitLocation(request: NextRequest): Promise<boolean> {
  // Get client IP address
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || request.ip || "0.0.0.0"

  try {
    // Use a geolocation API to check the location
    const response = await fetch(`https://ipapi.co/${ip}/json/`)

    if (!response.ok) {
      console.error("Failed to fetch geolocation data")
      return false
    }

    const data = await response.json()

    // Check if the country is Kuwait (country code: KW)
    return data.country === "KW" || data.country_code === "KW"
  } catch (error) {
    console.error("Error checking location:", error)
    return false
  }
}

// Configure which paths should be processed by this middleware
export const config = {
  matcher: ["/restricted-page", "/restricted-section/:path*"],
}

