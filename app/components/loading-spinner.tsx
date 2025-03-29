export function LoadingSpinner({
  size = "medium",
  color = "blue",
}: { size?: "small" | "medium" | "large"; color?: string }) {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  }

  const colorClasses = {
    blue: "border-blue-600",
    red: "border-red-600",
    green: "border-green-600",
    purple: "border-purple-600",
    gray: "border-gray-600",
  }

  const spinnerSize = sizeClasses[size]
  const spinnerColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue

  return (
    <div className="flex justify-center items-center">
      <div className={`${spinnerSize} relative`}>
        <div
          className={`absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-r-transparent ${spinnerColor} rounded-full animate-spin`}
        ></div>
      </div>
    </div>
  )
}

