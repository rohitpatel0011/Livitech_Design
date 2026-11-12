import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://livitechdesign.in"),
  title: "Livitech Design | Architecture, 3D Elevation & Planning in Patna, Bihar (livitechdesign.in)",
  description:
    "Plan. Design. Estimate. Supervise. Architectural 2D Vastu naksha, 3D modern elevation design, itemized BOQ cost estimation & site consultation across Bihar by Livitech Design (livitechdesign.in).",
  keywords: [
    "Livitech Design",
    "livitechdesign.in",
    "Best architect in Patna",
    "3D elevation design Patna",
    "Modern house exterior design Bihar",
    "Architectural 2D naksha Patna",
    "House construction cost calculator Patna",
    "Structural engineer consultation Bihar",
  ],
  openGraph: {
    title: "Livitech Design | Architecture, 3D Elevation & Planning in Patna, Bihar",
    description:
      "Vastu 2D floor plans, photorealistic 3D elevations, and accurate BOQ estimation by licensed Patna architects at livitechdesign.in.",
    url: "https://livitechdesign.in",
    siteName: "Livitech Design",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/logo/favicon.ico" },
      { url: "/logo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/logo/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/logo/favicon.ico",
  },
  manifest: "/logo/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-surface text-ink antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
