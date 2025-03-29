export default function BlockedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>

        <p className="mb-6 text-gray-600">
          We've detected that you're accessing this site from Google's corporate network. Access to this content is not
          available for Google employees or from Google's network.
        </p>

        <div className="p-4 bg-gray-100 rounded-md text-sm text-gray-700">
          If you believe this is an error, please contact support with your IP address and details.
        </div>
      </div>
    </div>
  )
}

