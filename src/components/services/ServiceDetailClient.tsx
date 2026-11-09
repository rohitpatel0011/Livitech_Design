"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
  Building2,
  HelpCircle,
  Loader2,
  Check,
} from "lucide-react";
import {
  ServiceItem,
  CORE_SERVICES,
  BIHAR_CITIES,
} from "@/data/livitectData";

interface ServiceDetailClientProps {
  service: ServiceItem;
}

export default function ServiceDetailClient({
  service,
}: ServiceDetailClientProps) {
  // Gallery slider state
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Booking Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCity, setSelectedCity] = useState("Patna (Kankarbagh / Bailey Rd / Danapur)");
  const [plotArea, setPlotArea] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const prevImage = () => {
    setActiveImageIdx((prev) =>
      prev === 0 ? service.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % service.images.length);
  };

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          city: selectedCity,
          plotArea,
          notes,
          service: service.title,
          source: `service-detail-${service.slug}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Form submission failed. Please try again.");
      }

      setSubmitSuccess(
        data.message ||
          "Aapki enquiry submit ho chuki hai. Hamare Patna Studio architect aapse jaldi contact karenge."
      );
      // Reset form
      setFullName("");
      setPhone("");
      setPlotArea("");
      setNotes("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError("Submission failed. Please call our Patna helpline.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Other active services excluding current
  const otherServices = CORE_SERVICES.filter((s) => s.id !== service.id);

  const whatsappMessage = encodeURIComponent(
    `Hello Livitech Design (livitechdesign.in) Team! I am interested in ${service.title} for my project in Bihar. Please share details and pricing.`
  );

  return (
    <div className="bg-surface-muted/40 min-h-screen">
      {/* 1. SEMANTIC BREADCRUMB */}
      <nav
        aria-label="Breadcrumb"
        className="bg-surface border-b border-border py-3 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm text-ink-subtle">
            <li>
              <Link
                href="/"
                className="hover:text-brand transition-colors font-medium"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-border-subtle">
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </li>
            <li>
              <Link
                href="/#services"
                className="hover:text-brand transition-colors font-medium"
              >
                Services
              </Link>
            </li>
            <li aria-hidden="true" className="text-border-subtle">
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </li>
            <li
              aria-current="page"
              className="font-bold text-ink truncate max-w-[200px] sm:max-w-none"
            >
              {service.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* 2. MAIN CONTENT & STICKY BOOKING GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT 8 COLUMNS: Gallery, Details, Deliverables, Stepper, Samples, FAQ */}
          <article className="lg:col-span-8 space-y-12">
            {/* Header Area */}
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-brand-light text-brand text-xs font-extrabold uppercase tracking-wider border border-brand/20">
                  {service.badge}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface text-ink-muted text-xs font-semibold border border-border">
                  <Clock className="w-3.5 h-3.5 text-brand" />
                  Turnaround: {service.turnaroundTime || "3 – 7 Working Days"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface text-ink-muted text-xs font-semibold border border-border">
                  <MapPin className="w-3.5 h-3.5 text-brand" />
                  Kankarbagh Studio & On-Site Bihar
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
                {service.heroSubtitle || service.shortDesc}
              </p>

              {/* Trust Highlight Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm font-semibold text-ink-muted">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface border border-border shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                  <span>Licensed COA & Structural Engineers</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface border border-border shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                  <span>Patna Municipal Bye-Laws Ready</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface border border-border shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                  <span>Digital CAD + High-Res 3D Prints</span>
                </div>
              </div>
            </header>

            {/* INTERACTIVE MULTI-IMAGE SHOWCASE GALLERY */}
            <section
              aria-labelledby="gallery-heading"
              className="bg-surface rounded-2xl border border-border p-3 sm:p-4 shadow-booking space-y-3"
            >
              <h2 id="gallery-heading" className="sr-only">
                {service.title} Visual Showcase Gallery
              </h2>

              {/* Main Active Image View */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden bg-ink">
                <Image
                  src={service.images[activeImageIdx]}
                  alt={`${service.title} presentation photo ${
                    activeImageIdx + 1
                  }`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Counter Pill */}
                <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-md bg-black/65 backdrop-blur-md text-white text-xs font-bold">
                  {activeImageIdx + 1} / {service.images.length} Photos
                </span>

                {/* Prev/Next Arrow Buttons */}
                <button
                  type="button"
                  onClick={prevImage}
                  aria-label="Previous showcase image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/55 hover:bg-brand text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next showcase image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/55 hover:bg-brand text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnail Selector Strip */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
                {service.images.map((imgUrl, idx) => {
                  const isActive = idx === activeImageIdx;
                  return (
                    <button
                      key={imgUrl}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      aria-label={`View image ${idx + 1}`}
                      className={`relative w-20 h-16 sm:w-24 sm:h-18 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        isActive
                          ? "border-brand ring-2 ring-brand/30 scale-102"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`Thumbnail preview ${idx + 1}`}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </section>

            {/* SECTION: WHAT YOU GET (Detailed Deliverable Cards) */}
            {service.detailedDeliverables &&
              service.detailedDeliverables.length > 0 && (
                <section
                  aria-labelledby="deliverables-heading"
                  className="space-y-6 pt-2"
                >
                  <div className="border-b border-border pb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-brand">
                      Exact Output & Drawings
                    </span>
                    <h2
                      id="deliverables-heading"
                      className="text-2xl sm:text-3xl font-extrabold text-ink mt-1"
                    >
                      What You Get with this Service
                    </h2>
                    <p className="text-sm text-ink-muted mt-1">
                      Har package ke sath certified site sheets aur high-resolution
                      digital files milti hain taaki aapke thekedar aur mistri ko
                      kaam mein koi confusion na ho.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {service.detailedDeliverables.map((item, index) => (
                      <figure
                        key={item.title + index}
                        className="bg-surface rounded-2xl border border-border overflow-hidden shadow-booking flex flex-col group hover:border-brand/40 transition-colors"
                      >
                        <div className="relative aspect-[16/10] w-full bg-ink overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 40vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-md bg-brand text-white text-[11px] font-bold shadow-sm">
                              {item.specTag}
                            </span>
                          </div>
                        </div>
                        <figcaption className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-ink group-hover:text-brand transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-ink-muted mt-1.5 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                          <div className="pt-3 mt-3 border-t border-border flex items-center gap-1.5 text-xs font-semibold text-brand">
                            <Check className="w-3.5 h-3.5" />
                            <span>Included in Standard Package</span>
                          </div>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              )}

            {/* SECTION: HOW IT WORKS (3-Step Workflow Stepper) */}
            {service.workflowSteps && service.workflowSteps.length > 0 && (
              <section
                aria-labelledby="workflow-heading"
                className="space-y-6 pt-2"
              >
                <div className="border-b border-border pb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-brand">
                    Step-by-Step Delivery
                  </span>
                  <h2
                    id="workflow-heading"
                    className="text-2xl sm:text-3xl font-extrabold text-ink mt-1"
                  >
                    How We Work on Your Project
                  </h2>
                  <p className="text-sm text-ink-muted mt-1">
                    Plot measurement se lekar final print delivery tak — transparent
                    aur structured process.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {service.workflowSteps.map((step) => (
                    <article
                      key={step.step}
                      className="bg-surface rounded-2xl border border-border p-5 shadow-booking flex flex-col justify-between space-y-4 relative"
                    >
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-900">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 30vw"
                          className="object-cover"
                        />
                        <span className="absolute top-2.5 left-2.5 w-8 h-8 rounded-lg bg-brand text-white text-xs font-black flex items-center justify-center shadow">
                          {step.step}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-base font-extrabold text-ink">
                          {step.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-ink-muted mt-1.5 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* SECTION: REAL BIHAR SAMPLE PROJECTS */}
            {service.sampleProjects && service.sampleProjects.length > 0 && (
              <section
                aria-labelledby="samples-heading"
                className="space-y-6 pt-2"
              >
                <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-brand">
                      Real Executed Work
                    </span>
                    <h2
                      id="samples-heading"
                      className="text-2xl sm:text-3xl font-extrabold text-ink mt-1"
                    >
                      Sample Projects Across Bihar
                    </h2>
                  </div>
                  <span className="text-xs font-medium text-ink-subtle">
                    Kankarbagh · Bailey Rd · Muzaffarpur · Danapur
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {service.sampleProjects.map((proj, idx) => (
                    <div
                      key={proj.title + idx}
                      className="bg-surface rounded-2xl border border-border overflow-hidden shadow-booking group hover:border-brand/40 transition-colors flex flex-col"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
                        <Image
                          src={proj.image}
                          alt={proj.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 30vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-brand-light" />
                          {proj.location}
                        </span>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-ink">
                            {proj.title}
                          </h3>
                          <p className="text-xs text-ink-muted mt-1">
                            {proj.specs}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SECTION: FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
            {service.faqs && service.faqs.length > 0 && (
              <section aria-labelledby="faqs-heading" className="space-y-6 pt-2">
                <div className="border-b border-border pb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-brand">
                    Got Questions?
                  </span>
                  <h2
                    id="faqs-heading"
                    className="text-2xl sm:text-3xl font-extrabold text-ink mt-1"
                  >
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="space-y-3">
                  {service.faqs.map((faq, idx) => (
                    <details
                      key={idx}
                      className="group bg-surface rounded-xl border border-border p-4 sm:p-5 shadow-xs transition-colors open:border-brand/40 open:bg-surface"
                    >
                      <summary className="font-bold text-ink text-sm sm:text-base cursor-pointer list-none flex items-center justify-between gap-3 focus-visible:outline-brand">
                        <span className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-brand shrink-0" />
                          <span>{faq.q}</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-ink-muted group-open:rotate-90 transition-transform shrink-0" />
                      </summary>
                      <p className="mt-3 text-xs sm:text-sm text-ink-muted leading-relaxed pl-6 border-l-2 border-brand/30">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* RIGHT 4 COLUMNS: STICKY INSTANT BOOKING & CONSULTATION WIDGET */}
          <aside
            aria-label="Instant Booking & Consultation Widget"
            className="lg:col-span-4 lg:sticky lg:top-24 space-y-6"
          >
            <div className="bg-surface rounded-2xl border-2 border-brand/30 p-5 sm:p-6 shadow-booking relative">
              {/* Badge & Rate Banner */}
              <div className="border-b border-border pb-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded bg-brand-light text-brand">
                    Instant Quote & Studio Visit
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Active in Bihar
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-xs text-ink-subtle uppercase font-bold">
                    Indicative Pricing / Estimate:
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-ink mt-0.5">
                    {service.indicativeRate || "Starting at ₹15 / sq.ft"}
                  </p>
                </div>
              </div>

              {/* Lead Submission Form */}
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="service-lead-name"
                    className="block text-xs font-bold uppercase text-ink-subtle mb-1"
                  >
                    Your Full Name <span className="text-brand">*</span>
                  </label>
                  <input
                    type="text"
                    id="service-lead-name"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    autoComplete="name"
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm font-medium text-ink bg-surface-muted/50 focus:bg-surface focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="service-lead-phone"
                    className="block text-xs font-bold uppercase text-ink-subtle mb-1"
                  >
                    WhatsApp / Phone Number <span className="text-brand">*</span>
                  </label>
                  <input
                    type="tel"
                    id="service-lead-phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm font-medium text-ink bg-surface-muted/50 focus:bg-surface focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>

                {/* City Selection */}
                <div>
                  <label
                    htmlFor="service-lead-city"
                    className="block text-xs font-bold uppercase text-ink-subtle mb-1"
                  >
                    Project City / Region
                  </label>
                  <select
                    id="service-lead-city"
                    name="city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm font-semibold text-ink bg-surface-muted/50 focus:bg-surface focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  >
                    {BIHAR_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Plot Area */}
                <div>
                  <label
                    htmlFor="service-lead-area"
                    className="block text-xs font-bold uppercase text-ink-subtle mb-1"
                  >
                    Plot / Built-up Size (Optional)
                  </label>
                  <input
                    type="text"
                    id="service-lead-area"
                    name="plotArea"
                    value={plotArea}
                    onChange={(e) => setPlotArea(e.target.value)}
                    placeholder="e.g. 1500 sq.ft or 3 Kattha"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm font-medium text-ink bg-surface-muted/50 focus:bg-surface focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>

                {/* Requirement / Message */}
                <div>
                  <label
                    htmlFor="service-lead-notes"
                    className="block text-xs font-bold uppercase text-ink-subtle mb-1"
                  >
                    Specific Requirements (Optional)
                  </label>
                  <textarea
                    id="service-lead-notes"
                    name="notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="G+2 Villa, commercial complex, structural checking..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm font-medium text-ink bg-surface-muted/50 focus:bg-surface focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand resize-none"
                  />
                </div>

                {/* Submit Feedback */}
                {submitSuccess && (
                  <div
                    role="alert"
                    className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{submitSuccess}</span>
                  </div>
                )}

                {submitError && (
                  <div
                    role="alert"
                    className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800"
                  >
                    {submitError}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-brand hover:bg-brand-dark text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-booking transition-all cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Book Consultation / Request Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Direct WhatsApp Callout */}
              <div className="mt-4 pt-4 border-t border-border space-y-2.5">
                <a
                  href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat Directly on WhatsApp</span>
                </a>

                <a
                  href="tel:+919876543210"
                  className="w-full py-2.5 px-3 rounded-xl bg-surface border border-border hover:border-brand/40 text-ink font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-brand" />
                  <span>Call Architect Studio: +91 98765 43210</span>
                </a>
              </div>

              {/* Studio Address Footnote */}
              <div className="mt-4 pt-3 border-t border-border flex items-start gap-2 text-[11px] text-ink-subtle">
                <Building2 className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                <span>
                  <strong>Patna Studio:</strong> 301, Dharmrath Palace,
                  Kankarbagh, Patna, Bihar – 800020
                </span>
              </div>
            </div>

            {/* Quality Guarantee Mini Card */}
            <div className="bg-surface rounded-2xl border border-border p-4 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-ink">
                <ShieldCheck className="w-4 h-4 text-brand" />
                <span>Livitech Design Quality Commitment</span>
              </div>
              <ul className="text-[11px] text-ink-muted space-y-1.5 pl-6 list-disc">
                <li>Government & Municipal Authority Bye-Law Compliance</li>
                <li>Zero-cost revision on preliminary 2D layouts</li>
                <li>Direct engineer phone support throughout planning</li>
              </ul>
            </div>
          </aside>
        </div>

        {/* 3. BOTTOM SECTION: EXPLORE OTHER ACTIVE SERVICES */}
        <section
          aria-labelledby="other-services-heading"
          className="mt-16 pt-12 border-t border-border"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-brand">
                More Capabilities
              </span>
              <h2
                id="other-services-heading"
                className="text-2xl sm:text-3xl font-extrabold text-ink mt-1"
              >
                Explore Other Certified Architectural Services
              </h2>
            </div>
            <Link
              href="/#services"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand hover:text-brand-dark"
            >
              <span>View All Services on Homepage</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherServices.map((other) => (
              <Link
                key={other.id}
                href={`/services/${other.slug}`}
                className="group bg-surface rounded-2xl border border-border hover:border-brand/40 p-4 shadow-booking flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-ink mb-3.5">
                    <Image
                      src={other.images[0]}
                      alt={other.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-brand text-white text-[10px] font-bold">
                      {other.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-ink group-hover:text-brand transition-colors">
                    {other.title}
                  </h3>
                  <p className="text-xs text-ink-muted mt-1 line-clamp-2">
                    {other.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-bold text-brand">
                  <span>{other.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
