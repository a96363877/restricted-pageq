import { LoadingSpinner } from "../components/loading-spinner"

export default function FallbackPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Not Available</h1>
      <p className="mb-4">
        This content is only available to mobile users in Kuwait who came from our Google Ads campaigns.
      </p>
      <p>Please ensure you're:</p>
      <ul className="list-disc pl-6 mt-2 mb-6">
        <li>Located in Kuwait</li>
        <li>Using a mobile device</li>
        <li>Coming from our Google Ads campaign</li>
      </ul>

      <div className="flex items-center gap-2 text-blue-600">
        <LoadingSpinner size="small" />
        <span>Checking your eligibility again...</span>
      </div>
    </div>
  )
}

