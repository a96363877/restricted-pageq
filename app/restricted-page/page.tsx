export default function RestrictedPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Restricted Page</h1>
      <p className="mb-4">You can see this page because you meet all three conditions:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>You came from Google Ads</li>
        <li>You're using a mobile phone</li>
        <li>Your IP and location are in Kuwait</li>
      </ul>
      <p>This content is specifically for our Kuwait mobile users from our ad campaigns.</p>
    </div>
  )
}

