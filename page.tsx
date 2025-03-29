import Link from "next/link"

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <p className="mb-4">This page demonstrates route restrictions based on specific conditions.</p>
      <div className="flex gap-4">
        <Link href="/restricted-page" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Try Restricted Page
        </Link>
        <Link href="/fallback-page" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          View Fallback Page
        </Link>
      </div>
    </div>
  )
}

