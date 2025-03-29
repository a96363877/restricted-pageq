"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AccessVerificationPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading state
    const loadingTimer = setTimeout(() => {
      setLoading(false)

      // Generate a random delay between 2-10 seconds
      const randomDelay = Math.floor(Math.random() * 9) + 2
      setCountdown(randomDelay)

      // Set up the countdown after loading
      const countdownTimer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null) return null
          if (prev <= 1) {
            clearInterval(countdownTimer)
            // Navigate when countdown reaches 0
            router.push("/fallback-page")
            return 0
          }
          return prev - 1
        })
      }, 1000)

      // Clean up the countdown timer
      return () => clearInterval(countdownTimer)
    }, 1500) // Show loading state for 1.5 seconds

    // Clean up the loading timer
    return () => clearTimeout(loadingTimer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">{loading ? "Checking access..." : "Processing..."}</h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-16 h-16 mb-4">
              {/* Loading spinner */}
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-100 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600">Please wait while we verify your access...</p>
          </div>
        ) : countdown !== null ? (
          <>
            <div className="mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-blue-600">{countdown}</span>
              </div>
              <p className="text-gray-600">
                You'll be transferred in {countdown} second{countdown !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000"
                style={{ width: `${(countdown / 10) * 100}%` }}
              ></div>
            </div>
          </>
        ) : (
          <p className="text-gray-600">Moving you now...</p>
        )}

        <p className="text-gray-500 text-sm mt-4">
          This content is only available to mobile users in Kuwait who came from our Google Ads campaigns.
        </p>
      </div>
    </div>
  )
}

