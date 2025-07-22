import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="px-4 py-16 relative" id="get-started">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-blue-50"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Start Streamlining Your Bookkeeping Today
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Connect your Etsy shop and let Ledgrly automatically organize your finances.
          Get started in minutes!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Button
            asChild
            type="button"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-lg font-semibold shadow-lg transform hover:scale-102 transition-all duration-200"
          >
            <Link
              href="/onboarding"
            >
              CONNECT YOUR ETSY SHOP
            </Link>
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Secure connection • Start organizing immediately
        </p>
      </div>
    </section>
  );
}
