import { Button } from "@/components/ui/button"
import { HomeIcon } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
        <p className="text-gray-600 max-w-md">
          Desculpe, não conseguimos encontrar a página que você está procurando. Por favor, verifique a URL ou retorne à página inicial.
        </p>
        <Button asChild>
          <Link href="/" className="inline-flex items-center gap-2">
            <HomeIcon className="w-4 h-4" />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  )
}