import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BIHAR_SEO_CITIES } from "@/data/citySeoData";
import {
  MapPin,
  Building2,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Service Locations in Bihar | Livitech Design Central Patna HQ",
  description:
    "Explore Livitech Design's architectural and construction service network across Bihar: Patna, Bihta, Muzaffarpur, Gaya, Bhagalpur, Darbhanga, Begusarai, Ara, and Purnia.",
  alternates: {
    canonical: "https://livitechdesign.in/locations",
  },
  openGraph: {
    title: "Service Locations in Bihar | Livitech Design",
    description:
      "Architecture, civil engineering, and construction services across Bihar districts.",
    url: "https://livitechdesign.in/locations",
    siteName: "Livitech Design",
    locale: "en_IN",
    type: "website",
  },
};

export default function LocationsIndexPage() {
  return (
    <div className="bg-surface pb-24">
      {/* Header Banner */}
      <div className="bg-surface-muted border-b border-border py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold text-ink-subtle mb-4"
          >
            <Link href="/" className="hover:text-brand transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand font-bold">Locations</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-brand" />
              <span>Bihar Regional Coverage & Desks</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
              Architecture & Construction Across Bihar
            </h1>

            <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
              Headquartered at Kankarbagh, Patna, Livitech Design delivers
              licensed civil engineering, Vastu 2D/3D floor planning, and
              transparent itemized BOQ estimation across all key Bihar districts.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-ink">
              <ShieldCheck className="w-4 h-4 text-brand" />
              <span>Central Studio: 301, Dharmrath Palace, Kankarbagh, Patna</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cities Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BIHAR_SEO_CITIES.map((city) => (
            <div
              key={city.slug}
              className="bg-surface rounded-3xl border border-border p-6 shadow-booking hover:shadow-booking-hover transition-all flex flex-col justify-between group hover:border-brand/40"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-brand-light flex items-center justify-center text-brand font-black text-sm">
                      📍
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-ink group-hover:text-brand transition-colors">
                        {city.cityName}
                      </h2>
                      <span className="text-[11px] font-bold text-ink-subtle uppercase">
                        {city.state}
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-brand text-white text-[10px] font-extrabold">
                    Active Desk
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface-muted border border-border">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-subtle block">
                    Avg. Construction Rate ({city.cityName}):
                  </span>
                  <span className="text-sm font-black text-brand">
                    {city.avgConstructionRate}
                  </span>
                </div>

                <p className="text-xs text-ink-muted leading-relaxed line-clamp-3">
                  {city.heroDescription}
                </p>

                {/* Local Area Chips */}
                <div>
                  <span className="text-[11px] font-bold text-ink block mb-2">
                    Key Areas Covered:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {city.popularLocalAreas.slice(0, 4).map((area) => (
                      <span
                        key={area}
                        className="px-2 py-0.5 rounded-md bg-surface border border-border text-[11px] text-ink-muted"
                      >
                        {area}
                      </span>
                    ))}
                    {city.popularLocalAreas.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md bg-brand-light/60 text-brand text-[11px] font-bold">
                        +{city.popularLocalAreas.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-border">
                <Link
                  href={`/locations/${city.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-sm transition-all"
                >
                  <span>Explore {city.cityName} Services & FAQs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Patna Central HQ Feature Box */}
        <div className="mt-16 rounded-3xl bg-ink text-white p-8 sm:p-12 border border-border shadow-booking">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-dark border border-brand-accent/30 text-brand-light text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-brand-accent" />
                Central Headquarters
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                Visit Our Studio at Kankarbagh, Patna
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
                Meet our chief architects, review physical material samples, and
                explore 3D VR walkthroughs for your upcoming project.
              </p>
              <div className="text-xs text-neutral-300 space-y-1">
                <p>
                  <strong>Address:</strong> 301, Dharmrath Palace, Kankarbagh,
                  Patna, Bihar – 800020
                </p>
                <p>
                  <strong>Hours:</strong> Monday – Saturday: 9:30 AM to 7:30 PM
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-extrabold text-sm py-3.5 px-6 rounded-xl shadow-sm transition-all"
              >
                <span>Book Patna Studio Visit</span>
              </Link>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm py-3.5 px-6 rounded-xl border border-white/20 backdrop-blur-md transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-brand-light" />
                <span>Call +91 98765 43210</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
