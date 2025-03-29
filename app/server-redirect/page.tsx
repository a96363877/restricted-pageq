export default function ServerRedirectPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
      <p>
        You are being redirected to the appropriate page. This page uses server-side redirection with randomized timing.
      </p>
      <p className="mt-4 text-sm text-gray-500">If you are not redirected automatically, please wait a moment.</p>
    </div>
  )
}

