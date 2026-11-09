import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { EXTERIOR_DESIGNS } from "@/data/livitectData";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  MessageSquare,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "60+ Creative House Elevation Designs 2026 | Livitech Design Patna",
  description:
    "Explore 60+ modern front elevation designs, G+1 & G+2 villas, duplexes, and commercial facades designed for Bihar homes by Livitech Design (livitechdesign.in).",
  alternates: {
    canonical: "https://livitechdesign.in/exterior-designs",
  },
  openGraph: {
    title: "60+ Creative House Elevation Designs | Livitech Design",
    description:
      "Modern front elevation, 3D architectural facade renders, and Vastu-compliant exterior designs.",
    url: "https://livitechdesign.in/exterior-designs",
    siteName: "Livitech Design",
    locale: "en_IN",
    type: "website",
  },
};

export default function ExteriorDesignsIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Modern House Elevation & Facade Designs",
    description:
      "Curated 60+ architectural elevation concepts and facade designs by Livitech Design.",
    url: "https://livitechdesign.in/exterior-designs",
    hasPart: EXTERIOR_DESIGNS.map((post) => ({
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      url: `https://livitechdesign.in/exterior-designs/${post.slug}`,
      image: post.coverImage,
      datePublished: post.publishDate,
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
              <span className="text-brand font-bold">Exterior Designs</span>
            </nav>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand" />
                <span>3D Architectural Elevation & Facade Showcase</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
                60+ Modern House Exterior Designs
              </h1>

              <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
                Your home’s exterior is its first impression. Explore our curated
                collection of Vastu-aligned G+1 & G+2 villas, duplex front
                elevations, and commercial facades crafted by Livitech Design
                for Bihar homeowners.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-ink">
                <span className="px-3 py-1 rounded-full bg-surface border border-border">
                  G+1 & G+2 Villas
                </span>
                <span className="px-3 py-1 rounded-full bg-surface border border-border">
                  Luxury Duplexes
                </span>
                <span className="px-3 py-1 rounded-full bg-surface border border-border">
                  Commercial Facades
                </span>
                <span className="px-3 py-1 rounded-full bg-surface border border-border">
                  Modern Wooden Louvers & Stone Cladding
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Elevation Concepts Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EXTERIOR_DESIGNS.map((post) => (
              <article
                key={post.id}
                className="bg-surface rounded-3xl border border-border overflow-hidden shadow-booking hover:shadow-booking-hover transition-all flex flex-col justify-between group hover:border-brand/40"
              >
                <div>
                  {/* Cover Image */}
                  <div className="relative h-60 w-full bg-ink overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-brand text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                        {post.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-white/90">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.publishDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <h2 className="text-lg sm:text-xl font-extrabold text-ink group-hover:text-brand transition-colors leading-snug">
                      <Link href={`/exterior-designs/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/exterior-designs/${post.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-surface-muted hover:bg-brand hover:text-white text-ink font-bold text-xs py-3 px-4 rounded-xl border border-border hover:border-brand transition-all"
                  >
                    <span>View Design Gallery & Specs</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Custom Elevation Inquiry Banner */}
          <div className="mt-16 rounded-3xl bg-surface-muted border-2 border-brand/25 p-8 sm:p-12 shadow-booking">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  Have a Specific Plot Size in Mind?
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-ink">
                  Get a Custom 3D Front Elevation for Your Home
                </h3>
                <p className="text-sm text-ink-muted max-w-2xl leading-relaxed">
                  Send us your plot dimensions and floor layout. Our Patna
                  Studio architects will deliver a custom photorealistic 3D front
                  elevation with day and night lighting simulations in 5 to 7 days.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <a
                  href={`https://wa.me/919876543210?text=Hello%20Livitech%20Design,%20I%20want%20a%20custom%203D%20elevation%20design%20for%20my%20plot.%20Please%20guide%20me.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white font-extrabold text-sm py-3.5 px-6 rounded-xl shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Plot Details</span>
                </a>

                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-sm transition-all"
                >
                  <span>Book Architect Consultation</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
