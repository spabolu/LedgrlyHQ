import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Navigation() {
  return (
    <nav className="border-b border-blue-100 px-4 py-4 bg-white/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
            <Image src="/ledgrly.svg" alt="Ledgrly" width={64} height={64} />
          </span>
          <span className="font-bold text-gray-900 text-xl md:text-2xl">
            Ledgrly
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="#features"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            How It Works
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            asChild
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg"
          >
            <Link href="/onboarding" passHref>
              Connect Your Shop
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
