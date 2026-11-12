"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Compass,
  FileCheck2,
  HardHat,
  Send,
  Loader2,
  MessageSquare,
} from "lucide-react";
import {
  TRUST_METRICS,
  CORE_SERVICES,
  BIHAR_CITIES,
} from "@/data/livitectData";

const REGIONAL_HUBS = [
  { name: "Patna Central HQ", area: "Kankarbagh & Bailey Road", status: "Open Now · Main Office" },
  { name: "Bihta & Greater Patna", area: "IIT Bihta & Airport Belt", status: "Field Engineer Team" },
  { name: "Muzaffarpur", area: "Mithila Regional Desk", status: "Consultation Hub" },
  { name: "Gaya & Bodhgaya", area: "South Bihar Hub", status: "Consultation Desk" },
  { name: "Bhagalpur", area: "Silk City East Bihar", status: "Partner Architect Hub" },
  { name: "Ranchi, Jharkhand", area: "Lalpur & Main Road", status: "Associate Office" },
];

export default function TrustAndLocationSection() {
  const [selectedHub, setSelectedHub] = useState(0);

  // Lead Booking Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Patna (Kankarbagh / Bailey Rd / Danapur)");
  const [service, setService] = useState(CORE_SERVICES[0].title);
  const [plotArea, setPlotArea] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          city,
          service,
          plotArea,
          notes,
          source: "homepage-contact-section",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit request.");
      }

      setSubmitSuccess(
        data.message ||
          "Aapki request darj ho gayi hai. Hamare Patna Studio architect aapse 2 ghante ke andar contact karenge."
      );
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-16 lg:py-24 bg-surface border-b border-border relative">
      <span id="office-locator" className="absolute -top-24 opacity-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Bar */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
              Engineered with Integrity. Backed by Data.
            </h2>
            <p className="text-base sm:text-lg text-ink-muted mt-3 leading-relaxed">
              Why homeowners choose Livitech Design across Bihar — say goodbye to contractor disputes, unverified cement grades, and hidden costs with our corporate architectural and structural engineering standards.
            </p>
          </div>

          {/* 4 Trust Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TRUST_METRICS.map((item, idx) => (
              <div
                key={idx}
                className="bg-surface-muted rounded-2xl p-5 sm:p-6 border border-border text-center flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-brand tracking-tight">
                    {item.metric}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-ink mt-2">
                    {item.label}
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs text-ink-subtle mt-2 pt-2 border-t border-border">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* 4 Engineering Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="p-5 rounded-2xl border border-border bg-surface shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-brand mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-ink">100% Vastu & 3D BIM</h4>
              <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                Scientific daylighting analysis, modern airflow, and Vastu directional harmony in every 2D naksha.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-surface shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-brand mb-3">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-ink">Zero Hidden Cost BOQ</h4>
              <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                Itemized sheet detailing exact bags of cement, quintals of steel, and sand needed before laying a brick.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-surface shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-brand mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-ink">Bank Sanction DPR</h4>
              <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                Bank approved valuation and Detailed Project Report formatted for SBI, HDFC, ICICI, and Canara Bank.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-surface shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-brand mb-3">
                <HardHat className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-ink">Licensed Civil Engineers</h4>
              <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                Structural calculations signed by licensed engineers ensuring earthquake and soil safety.
              </p>
            </div>
          </div>
        </div>

        {/* Patna HQ Card & Office Locator */}
        <div className="rounded-3xl border-2 border-brand/20 bg-surface-muted/50 p-6 sm:p-10 shadow-booking">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Patna HQ Details (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand text-white text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  Central Headquarters
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-ink mt-3">
                  Visit Livitech Design Studio at Kankarbagh, Patna
                </h3>
                <p className="text-sm text-ink-muted mt-2">
                  Meet our senior architects, civil project heads, and 3D visualizers in person. Review material catalogues, explore 3D VR walkthroughs, and receive instant BOQ cost breakdowns.
                </p>
              </div>

              {/* Address & Hours Box */}
              <div className="bg-surface rounded-2xl p-5 border border-border space-y-3.5 shadow-sm">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-ink-subtle block">
                      Physical Office Address
                    </span>
                    <p className="text-sm font-bold text-ink">
                      301, Dharmrath Palace, Kankarbagh, Patna, Bihar – 800020
                    </p>
                    <span className="text-xs text-ink-muted">
                      Landmark: Near Kankarbagh Main Road / Old Bypass Junction
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-brand shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-ink-subtle block">
                        Office Hours
                      </span>
                      <span className="text-xs font-bold text-ink">
                        Mon - Sat: 9:30 AM to 7:30 PM
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-brand shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-ink-subtle block">
                        Direct Desk
                      </span>
                      <a
                        href="tel:+919876543210"
                        className="text-xs font-bold text-brand hover:underline"
                      >
                        +91 98765 43210
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://maps.google.com/?q=Kankarbagh+Patna+Bihar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-sm transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Google Maps Directions</span>
                </a>

                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 bg-surface hover:bg-surface-muted text-ink font-bold text-xs sm:text-sm py-3 px-5 rounded-xl border border-border transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand" />
                  <span>Call for Appointment</span>
                </a>
              </div>
            </div>

            {/* Right: Regional Hubs Selector (5 Cols) */}
            <div className="lg:col-span-5 bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-brand block mb-1">
                Regional Presence Network
              </span>
              <h4 className="text-base font-extrabold text-ink mb-4">
                Operating Across Bihar & Neighboring States
              </h4>

              <div className="space-y-2">
                {REGIONAL_HUBS.map((hub, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedHub(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedHub === idx
                        ? "bg-brand-light border-brand/40 shadow-sm"
                        : "bg-surface-muted/50 border-border hover:bg-surface-muted"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-ink">{hub.name}</div>
                      <div className="text-[11px] text-ink-subtle">{hub.area}</div>
                    </div>
                    <span className="text-[10px] font-bold text-brand bg-white px-2 py-0.5 rounded border border-brand/20">
                      {hub.status.split("·")[0]}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center gap-2 text-xs text-ink-muted">
                <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                <span>Online video consultation available for all cities across India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Instant Consultation & Callback Form */}
        <div className="mt-10 rounded-3xl border border-border bg-surface shadow-booking overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Form Left Banner (5 Cols) - Deep Espresso background for high-contrast architectural identity */}
            <div className="lg:col-span-5 bg-ink p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Start Your Project with Clear Engineering
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Free architect consultation — book a direct 30-minute session with our Senior Architects & Civil Engineers at our Patna Kankarbagh Studio or via video call across Bihar.
                </p>

                <div className="pt-3 space-y-2.5 text-xs text-neutral-200">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>Free preliminary 2D layout & Vastu direction check</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>Exact steel & cement material estimate with BOQ</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>Direct discussion on soil test, foundation & DPR</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span>Avg Callback: <strong className="text-white">Under 15 Mins</strong></span>
                <span>Direct Helpline: <strong className="text-brand-light">+91 98765 43210</strong></span>
              </div>
            </div>

            {/* Form Right Inputs (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 bg-surface">
              {submitSuccess ? (
                <div className="py-8 text-center space-y-5">
                  <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-ink">
                      Consultation Request Received!
                    </h4>
                    <p className="text-sm text-ink-muted mt-2 max-w-md mx-auto leading-relaxed">
                      {submitSuccess}
                    </p>
                  </div>

                  <div className="pt-4 flex flex-wrap justify-center gap-3">
                    <a
                      href={`https://wa.me/919876543210?text=Hello%20Livitech%20Design,%20I%20just%20submitted%20a%20consultation%20request%20for%20${encodeURIComponent(
                        service
                      )}%20in%20${encodeURIComponent(city)}.%20Please%20confirm%20slot.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs sm:text-sm py-2.5 px-5 rounded-xl transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Connect on WhatsApp Instantly</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitSuccess(null)}
                      className="text-xs font-bold text-ink-muted hover:text-ink px-4 py-2.5 cursor-pointer"
                    >
                      Submit Another Query
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-border bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-border bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                        Select City / District *
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-border bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all"
                      >
                        {BIHAR_CITIES.map((c, i) => (
                          <option key={i} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                        Required Service *
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-border bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all"
                      >
                        {CORE_SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                        Plot / Built-up Size (Optional)
                      </label>
                      <input
                        type="text"
                        value={plotArea}
                        onChange={(e) => setPlotArea(e.target.value)}
                        placeholder="e.g. 1500 sq.ft (30x50 ft)"
                        className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-border bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                        Brief Project Note
                      </label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. G+2 Residential Villa with Vastu"
                        className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-border bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all"
                      />
                    </div>
                  </div>

                  {submitError && (
                    <p className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                      {submitError}
                    </p>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-extrabold text-sm py-3 px-8 rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Book Free Consultation</span>
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-ink-subtle text-center sm:text-right">
                      No spam guarantee · Direct consultation with Licensed Civil Engineer
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
