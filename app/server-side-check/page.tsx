import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Alternative approach using Server Components
export default function ServerSideCheckPage() {
  // Get cookies from the request
  const cookieStore = cookies()
  const session = cookieStore.get("session")

  // Check if user meets restrictions
  const userMeetsRestrictions = !!session

  // If user doesn't meet restrictions, redirect to fallback page
  if (!userMeetsRestrictions) {
    redirect("/fallback-page")
  }

  // If user meets restrictions, show the page content
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Server-Side Check Page</h1>
      <p>This page uses Server Components to check restrictions.</p>
      <p>You can only see this if you meet the restrictions.</p>
    </div>
  )
}

