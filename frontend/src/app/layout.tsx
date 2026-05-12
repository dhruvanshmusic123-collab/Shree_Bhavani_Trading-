import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import { COMPANY } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shreebhavanitrading.com"),
  title: {
    default: `${COMPANY.name} | ${COMPANY.tagline}`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Shree Bhavani Trading Corporation – Authorized distributors of UPVC, CPVC, SWR pipes, valves, adhesives, waterproofing chemicals, and sanitary products in Ahmedabad since 1994.",
  keywords: [
    "plumbing materials ahmedabad",
    "UPVC pipes ahmedabad",
    "CPVC pipes",
    "SWR pipes",
    "ball valves",
    "butterfly valves",
    "waterproofing chemicals",
    "pipe fittings ahmedabad",
    "wholesale plumbing",
    "shree bhavani trading",
    "piping solutions gujarat",
    "Supreme pipes ahmedabad",
    "Zoloto valves",
  ],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: COMPANY.name,
    title: `${COMPANY.name} | ${COMPANY.tagline}`,
    description: "Trusted wholesale distributor of piping, plumbing, valves & drainage systems in Ahmedabad since 1994.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} | ${COMPANY.tagline}`,
    description: "Trusted wholesale distributor of piping, plumbing, valves & drainage systems in Ahmedabad since 1994.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "https://shreebhavanitrading.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0F172A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: COMPANY.name,
              description: "Authorized distributors of piping, plumbing, drainage, valves, adhesives, and waterproofing products.",
              url: "https://shreebhavanitrading.com",
              telephone: ["+91-9824017613", "+91-7575001652"],
              email: COMPANY.email.primary,
              foundingDate: "1994",
              address: {
                "@type": "PostalAddress",
                streetAddress: "3,4,5,6 Centre Plaza, Near Milk Palace, Near H.P Petrol Pump, Sattadhar Cross Road, Sola Road",
                addressLocality: "Ghatlodia",
                addressRegion: "Gujarat",
                postalCode: "380061",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "23.0766",
                longitude: "72.5450",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
                  opens: "09:00",
                  closes: "19:00",
                },
              ],
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="bg-dark text-white antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingButtons />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1E293B",
              color: "#F8FAFC",
              border: "1px solid rgba(255,255,255,0.1)",
            },
            success: { iconTheme: { primary: "#EA580C", secondary: "#fff" } },
          }}
        />
      </body>
    </html>
  );
}
