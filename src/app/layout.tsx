import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ledgrly - Bookkeeping Software for Businesses on Etsy",
  description: "Finally, bookkeeping that speaks Etsy. Connect your shop, track expenses, and get tax-ready in minutes. Automated bookkeeping for makers, creators, and craft sellers - no manual spreadsheets required.",
  keywords: [
    "Etsy bookkeeping",
    "handmade business accounting",
    "craft seller bookkeeping", 
    "Etsy shop accounting",
    "small business bookkeeping",
    "maker accounting software",
    "creative business finances",
    "Etsy tax preparation",
    "handmade tax software",
    "craft business expenses"
  ],
  authors: [{ name: "Saketh Pabolu" }],
  creator: "Ledgrly",
  publisher: "Ledgrly",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ledgrlyHQ.com",
    siteName: "Ledgrly",
    title: "Ledgrly - Bookkeeping Software for Etsy Sellers & Handmade Businesses",
    description: "Finally, bookkeeping that speaks Etsy. Connect your shop, track expenses, and get tax-ready in minutes. Automated bookkeeping for makers, creators, and craft sellers.",
    // images: [
    //   {
    //     url: "/ledgrly-og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Ledgrly - Bookkeeping Software for Etsy Sellers",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ledgrly - Bookkeeping Software for Etsy Sellers & Handmade Businesses",
    description: "Finally, bookkeeping that speaks Etsy. Connect your shop, track expenses, and get tax-ready in minutes.",
    // images: ["/ledgrly-twitter-image.jpg"],
    // creator: "@ledgrly",
  },
  alternates: {
    canonical: "https://ledgrlyHQ.com",
  },
  category: "Business Software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Ledgrly",
    "description": "Bookkeeping software specifically designed for Etsy sellers and handmade businesses. Automate expense tracking, connect your shop, and get tax-ready in minutes.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free waitlist signup"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Etsy sellers, handmade business owners, craft sellers, makers, creators"
    },
    "featureList": [
      "Etsy shop integration",
      "Automated expense tracking", 
      "Tax preparation",
      "Historical data import",
      "Real-time bookkeeping"
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Ledgrly"
    },
    "url": "https://ledgrlyHQ.com"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
