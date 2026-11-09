import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://livitechdesign.in"),
  title: "Livitect | Architecture, 3D Elevation & Construction in Patna, Bihar (livitechdesign.in)",
  description:
    "More Than Walls. Architectural 2D Vastu naksha, 3D modern elevation design, itemized BOQ cost estimation & site consultation across Bihar by Livitect (livitechdesign.in).",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/brand/livitect-icon-square.png",
  },
  keywords: [
    "Livitect",
    "More Than Walls",
    "livitechdesign.in",
    "Best architect in Patna",
    "3D elevation design Patna",
    "Modern house exterior design Bihar",
    "Architectural 2D naksha Patna",
    "House construction cost calculator Patna",
    "Structural engineer consultation Bihar",
  ],
  openGraph: {
    title: "Livitect | More Than Walls - Architecture & Construction in Bihar",
    description:
      "More Than Walls. Vastu 2D floor plans, photorealistic 3D elevations, and accurate BOQ estimation by licensed architects at livitechdesign.in.",
    url: "https://livitechdesign.in",
    siteName: "Livitect",
    images: [
      {
        url: "/brand/livitect-logo-terracotta.png",
        width: 266,
        height: 203,
        alt: "Livitect - More Than Walls",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
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
