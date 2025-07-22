import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-4 py-8 border-t border-blue-100 bg-white/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <span className="w-8 h-8 flex items-center justify-center">
            <Image src="/ledgrly.svg" alt="Ledgrly" width={64} height={64} />
          </span>
          <span className="text-xl font-bold text-gray-900">Ledgrly</span>
        </div>

        <div className="max-w-xl mx-auto text-center text-sm text-gray-500">
          <p>
            <span>Made with ❤️ for sellers on Etsy.</span>
          </p>
          <p>
            Etsy is a trademark of Etsy, Inc. This product is unaffiliated and
            not endorsed by Etsy.
          </p>
        </div>

        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <Link
            href="mailto:hello@thecarbon.net"
            className="hover:text-gray-900"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
} 