import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { BIHAR_SEO_CITIES, getCityBySlug } from "@/data/citySeoData";
import { CORE_SERVICES } from "@/data/livitectData";
import {
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  Building2,
  Calculator,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  Compass,
  FileCheck2,
} from "lucide-react";

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return BIHAR_SEO_CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityBySlug(city);
  if (!cityData) {
    return { title: "Location Not Found | Livitech Design" };
  }

  const canonicalUrl = `https://livitechdesign.in/locations/${cityData.slug}`;

  return {
    title: `${cityData.heroHeadline} | Livitech Design`,
    description: cityData.heroDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${cityData.heroHeadline} — Livitech Design`,
      description: cityData.heroDescription,
      url: canonicalUrl,
      siteName: "Livitech Design",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cityData.heroHeadline} | Livitech Design`,
      description: cityData.heroDescription,
    },
  };
}

export default async function CitySeoPage({ params }: PageProps) {
  const { city } = await params;
  const cityData = getCityBySlug(city);
  if (!cityData) notFound();

  const otherCities = BIHAR_SEO_CITIES.filter((c) => c.slug !== cityData.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Livitech Design ${cityData.cityName}`,
    description: cityData.heroDescription,
    url: `https://livitechdesign.in/locations/${cityData.slug}`,
    telephone: "+91-9876543210",
    priceRange: cityData.avgConstructionRate,
    address: {
      "@type": "PostalAddress",
      streetAddress: "301, Dharmrath Palace, Kankarbagh",
      addressLocality: "Patna",
      addressRegion: "Bihar",
      postalCode: "800020",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${cityData.cityName}, Bihar`,
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Livitech Design",
      url: "https://livitechdesign.in",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cityData.localFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <>
      {/* Schema Injection for Google & AI Search (AEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-surface pb-24">
        {/* Breadcrumb & City Header */}
        <div className="bg-surface-muted border-b border-border py-10 lg:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs font-semibold text-ink-subtle mb-4"
            >
              <Link href="/" className="hover:text-brand transition-colors">
                Home
              </Link>
              <span>/</span>
              <span>Locations</span>
              <span>/</span>
              <span className="text-brand font-bold">
                {cityData.cityName}, Bihar
              </span>
            </nav>

            <div className="max-w-3xl space-y-4">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight leading-[1.15]">
                {cityData.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
                Verified service zone in {cityData.cityName}, Bihar — {cityData.heroDescription}
              </p>

              {/* Rate Highlight Box */}
              <div className="pt-2">
                <div className="inline-flex flex-wrap items-center gap-2 p-3 bg-surface rounded-2xl border border-border shadow-xs text-xs">
                  <span className="font-bold text-ink">
                    Estimated Construction Rate ({cityData.cityName}):
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-brand text-white font-extrabold text-xs">
                    {cityData.avgConstructionRate}
                  </span>
                  <span className="text-ink-subtle">
                    (Varies with structural & finishing specifications)
                  </span>
                </div>
              </div>

              {/* Popular Local Areas Chips */}
              <div className="pt-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink-subtle block mb-2">
                  Key Coverage Areas in {cityData.cityName}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {cityData.popularLocalAreas.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1 rounded-lg bg-surface border border-border text-xs font-bold text-ink hover:border-brand/40 transition-colors"
                    >
                      📍 {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content & Services Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column (8 Cols): Services, Local Context & FAQs */}
            <div className="lg:col-span-8 space-y-12">
              {/* How Livitech Design Works in this city */}
              <div className="bg-surface-muted rounded-3xl border border-border p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand" />
                  <h2 className="text-xl sm:text-2xl font-extrabold text-ink">
                    How Livitech Design Supports Clients in {cityData.cityName}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                  Chahe aapko apna naya residential villa design karwana ho,
                  material ka exact BOQ calculate karwana ho, ya commercial complex
                  ke liye architectural planning karni ho — Livitech Design Patna
                  Kankarbagh Central Studio se {cityData.cityName} ke homeowners
                  aur builders ko corporate engineering standards ke sath
                  dedicated support provide karta hai.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="flex items-start gap-2.5 bg-surface p-4 rounded-2xl border border-border">
                    <Compass className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-xs font-extrabold text-ink">
                        100% Vastu 2D & 3D Plans
                      </h3>
                      <p className="text-[11px] text-ink-muted mt-0.5">
                        Scientific daylighting, ventilation, and directional harmony.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-surface p-4 rounded-2xl border border-border">
                    <FileCheck2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-xs font-extrabold text-ink">
                        Zero Hidden Cost BOQ
                      </h3>
                      <p className="text-[11px] text-ink-muted mt-0.5">
                        Itemized sheets with exact cement bags and TMT steel tons.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-surface p-4 rounded-2xl border border-border">
                    <ShieldCheck className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-xs font-extrabold text-ink">
                        Bank DPR & Valuation
                      </h3>
                      <p className="text-[11px] text-ink-muted mt-0.5">
                        Approved formats for SBI, HDFC, ICICI, and Canara Bank loans.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-surface p-4 rounded-2xl border border-border">
                    <Building2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-xs font-extrabold text-ink">
                        On-Site Civil Audits
                      </h3>
                      <p className="text-[11px] text-ink-muted mt-0.5">
                        Licensed civil engineers inspect foundation and slab reinforcement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Services List */}
              <div>
                <div className="mb-6">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-brand">
                    End-to-End Solutions
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mt-1">
                    Available Services in {cityData.cityName}
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-muted mt-1">
                    Explore our specialized offerings calibrated for North Indian
                    and Bihar climate conditions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {CORE_SERVICES.map((srv) => (
                    <Link
                      key={srv.id}
                      href={`/services/${srv.slug}`}
                      className="group bg-surface rounded-2xl border border-border p-5 hover:border-brand/50 shadow-booking hover:shadow-booking-hover transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <span className="inline-block px-2.5 py-0.5 rounded bg-brand-light text-brand text-[10px] font-extrabold uppercase">
                          {srv.badge}
                        </span>
                        <h3 className="text-base font-extrabold text-ink group-hover:text-brand transition-colors">
                          {srv.title}
                        </h3>
                        <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">
                          {srv.shortDesc}
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-bold text-brand">
                        <span>Explore Service Details</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Local FAQs (AEO Optimized) */}
              <div className="space-y-4">
                <div className="pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-brand">
                    Answers for Homeowners
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-ink mt-1">
                    Frequently Asked Questions — {cityData.cityName} Construction
                  </h2>
                </div>

                <div className="space-y-3">
                  {cityData.localFaqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="bg-surface-muted rounded-2xl border border-border p-5 sm:p-6"
                    >
                      <h3 className="text-sm sm:text-base font-extrabold text-ink">
                        {faq.q}
                      </h3>
                      <p className="text-xs sm:text-sm text-ink-muted mt-2 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Bihar Cities (Internal Linking for SEO) */}
              <div className="pt-6 border-t border-border space-y-3">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-ink">
                  Also Serving Other Major Districts in Bihar:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {otherCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/locations/${c.slug}`}
                      className="px-3 py-1.5 rounded-xl bg-surface-muted hover:bg-brand-light text-xs font-semibold text-ink border border-border transition-colors"
                    >
                      {c.cityName} Construction & Architecture →
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (4 Cols): Sticky Booking & Contact Widget */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div className="bg-surface rounded-3xl border-2 border-brand/30 shadow-booking p-6 sm:p-7 space-y-5">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand">
                    Start Your Project in {cityData.cityName}
                  </span>
                  <h3 className="text-xl font-extrabold text-ink mt-1">
                    Book Free Consultation
                  </h3>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                    Connect with our Senior Architects & Civil Engineers at the
                    Patna Kankarbagh Studio for your project in {cityData.cityName}.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <Link
                    href="/#cost-estimator"
                    className="w-full bg-brand hover:bg-brand-dark text-white font-extrabold text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-booking hover:shadow-booking-hover transition-all cursor-pointer"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Calculate Construction Cost</span>
                  </Link>

                  <a
                    href={`https://wa.me/919876543210?text=Hello%20Livitech%20Design,%20I%20want%20to%20consult%20about%20architectural%20design%20and%20construction%20in%20${encodeURIComponent(
                      cityData.cityName
                    )}.%20Please%20guide%20me.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Inquiry ({cityData.cityName})</span>
                  </a>

                  <a
                    href="tel:+919876543210"
                    className="w-full bg-surface-muted hover:bg-brand-light text-ink font-bold text-xs py-3 px-4 rounded-xl border border-border flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 text-brand" />
                    <span>Call Patna HQ Desk</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-border text-xs text-ink-muted space-y-2">
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span>
                      <strong>HQ Address:</strong> 301, Dharmrath Palace,
                      Kankarbagh, Patna, Bihar – 800020
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span>Online video & on-site visits across Bihar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand shrink-0" />
                    <span>Licensed structural engineers & Vastu experts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
