import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CORE_SERVICES } from "@/data/livitectData";
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  ShieldCheck,
  PhoneCall,
  Calculator,
} from "lucide-react";

export const metadata: Metadata = {
  title: "All Construction & Architectural Services | Livitech Design Patna",
  description:
    "Explore Livitech Design's end-to-end services in Bihar: Turnkey Residential Construction, Commercial Complexes, Maintenance, Luxury Interior, 2D/3D Vastu Architecture, and 440+ Quality Check Contractor Services.",
  alternates: {
    canonical: "https://livitechdesign.in/services",
  },
  openGraph: {
    title: "All Construction & Architectural Services | Livitech Design",
    description:
      "Turnkey construction, 2D/3D Vastu naksha, BOQ estimation, and commercial architecture across Bihar.",
    url: "https://livitechdesign.in/services",
    siteName: "Livitech Design",
    locale: "en_IN",
    type: "website",
  },
};

export default function ServicesIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Livitech Design Construction & Architectural Services",
    description:
      "End-to-end architectural, engineering, and turnkey construction services across Bihar.",
    url: "https://livitechdesign.in/services",
    provider: {
      "@type": "LocalBusiness",
      name: "Livitech Design",
      telephone: "+91-9876543210",
      address: {
        "@type": "PostalAddress",
        streetAddress: "301, Dharmrath Palace, Kankarbagh",
        addressLocality: "Patna",
        addressRegion: "Bihar",
        postalCode: "800020",
        addressCountry: "IN",
      },
    },
    hasPart: CORE_SERVICES.map((s) => ({
      "@type": "Service",
      name: s.title,
      description: s.shortDesc,
      url: `https://livitechdesign.in/services/${s.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-surface pb-24">
        {/* Header Hero Banner */}
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
              <span className="text-brand font-bold">Services</span>
            </nav>

            <div className="max-w-3xl space-y-4">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
                Our Construction & Design Services
              </h1>

              <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
                End-to-end architectural planning and turnkey construction — from residential duplex homes and luxury interiors to commercial complexes and 440+ quality-audited contracting, Livitech Design brings licensed engineering precision to Bihar and Northern India.
              </p>

              <div className="pt-2 flex flex-wrap gap-3 text-xs font-semibold text-ink">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border">
                  <ShieldCheck className="w-4 h-4 text-brand" />
                  Price-Freeze Guarantee
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border">
                  <Building2 className="w-4 h-4 text-brand" />
                  100% Vastu & 3D BIM
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border">
                  <CheckCircle2 className="w-4 h-4 text-brand" />
                  440+ Quality Audits
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Services Catalog Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_SERVICES.map((srv, idx) => (
              <div
                key={srv.id}
                className="bg-surface rounded-3xl border border-border overflow-hidden shadow-booking hover:shadow-booking-hover transition-all flex flex-col justify-between group hover:border-brand/40"
              >
                <div>
                  {/* Service Image Header */}
                  <div className="relative h-56 w-full bg-ink overflow-hidden">
                    <Image
                      src={srv.images[0]}
                      alt={srv.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-lg bg-brand text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                        {srv.badge}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h2 className="text-xl font-extrabold leading-snug">
                        {srv.title}
                      </h2>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3">
                      {srv.shortDesc}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2 pt-2 border-t border-border">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-ink block">
                        Core Inclusions:
                      </span>
                      {srv.deliverables.slice(0, 4).map((d, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-start gap-2 text-xs text-ink-muted"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <Link
                    href={`/services/${srv.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-sm transition-all"
                  >
                    <span>View Full Service Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href={`https://wa.me/919876543210?text=Hello%20Livitech%20Design,%20I%20am%20interested%20in%20your%20${encodeURIComponent(
                      srv.title
                    )}%20service.%20Please%20share%20details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-surface-muted hover:bg-brand-light text-ink font-bold text-xs py-2 px-4 rounded-xl border border-border transition-colors"
                  >
                    <span>Instant WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Consultation Banner */}
          <div className="mt-16 rounded-3xl bg-ink p-8 sm:p-12 text-white border border-border shadow-booking">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                  Need Help Choosing the Right Service?
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Talk to Our Senior Architects in Kankarbagh, Patna
                </h3>
                <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
                  Schedule a free 30-minute consultation. We review your plot
                  dimensions, provide preliminary 2D orientation advice, and
                  calculate transparent BOQ material costs before you start.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/#cost-estimator"
                  className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-extrabold text-sm py-3.5 px-6 rounded-xl shadow-sm transition-all"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculate Project Cost</span>
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
    </>
  );
}
