"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calculator,
  CheckCircle2,
  Ruler,
  MapPin,
  Send,
  Loader2,
  Sparkles,
  ShieldCheck,
  FileSpreadsheet,
  MessageSquare,
  Building2,
  Paintbrush,
  Hammer,
  Compass,
} from "lucide-react";
import { COST_PACKAGES, BIHAR_CITIES } from "@/data/livitectData";

export default function CostEstimatorSection() {
  const [selectedPackageId, setSelectedPackageId] = useState(
    COST_PACKAGES[1].id
  );
  const [plotArea, setPlotArea] = useState<number>(2000);
  const [selectedCity, setSelectedCity] = useState(BIHAR_CITIES[0]);

  // Lead capture state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const currentPkg =
    COST_PACKAGES.find((p) => p.id === selectedPackageId) || COST_PACKAGES[1];

  const estimatedMin = plotArea * currentPkg.rateMin;
  const estimatedMax = plotArea * currentPkg.rateMax;
  const estimatedAvg = Math.round((estimatedMin + estimatedMax) / 2);

  // Stage breakdown calculations (40% Civil, 30% Finishing, 20% MEP & Doors, 10% Architecture)
  const civilCost = Math.round(estimatedAvg * 0.4);
  const finishingCost = Math.round(estimatedAvg * 0.3);
  const mepDoorsCost = Math.round(estimatedAvg * 0.2);
  const architectureCost = Math.round(estimatedAvg * 0.1);

  const formatINR = (num: number) => {
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Crore`;
    }
    return `₹${(num / 100000).toFixed(2)} Lakhs`;
  };

  const handleEstimateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanDigits = phone.replace(/\D/g, "");
    if (!fullName.trim() || cleanDigits.length < 10) {
      setErrorMsg("Kripya apna poora naam aur 10-digit mobile number dalein.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: cleanDigits,
          city: selectedCity,
          plotArea: `${plotArea} sq.ft`,
          service: `Cost Estimator (${currentPkg.name})`,
          estimatedBudget: `${formatINR(estimatedMin)} – ${formatINR(
            estimatedMax
          )}`,
          source: "Interactive Cost Calculator Section",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }
      setSubmitted(true);
    } catch {
      setErrorMsg(
        "Network connect hone mein samasya aayi. Kripya seedha WhatsApp par sampark karein."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const areaPills = [1000, 1500, 2000, 3000, 4500];

  return (
    <section
      id="cost-estimator"
      className="py-16 lg:py-24 bg-surface border-b border-border scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-light text-brand text-xs font-extrabold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive BOQ Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink mt-3 tracking-tight">
            Know your construction cost before you build.
          </h2>
          <p className="text-sm sm:text-base text-ink-muted mt-3 leading-relaxed">
            Patna aur Bihar ke current material market rates ke hisab se apne
            plot size aur quality package ke mutabiq instant rough cost
            calculate karein. Transparent pricing with complete material
            breakdown.
          </p>
        </div>

        {/* STEP 1: SELECT PROPERTY & QUALITY PACKAGE (4 Visual Package Cards) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Step 1: Select Quality Package
            </span>
            <span className="text-xs text-ink-subtle">
              Calibrated for Bihar Soil & Weather Conditions
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COST_PACKAGES.map((pkg) => {
              const isSelected = pkg.id === selectedPackageId;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackageId(pkg.id)}
                  className={`cursor-pointer rounded-2xl border-2 transition-all overflow-hidden flex flex-col justify-between bg-surface shadow-booking hover:shadow-booking-hover ${
                    isSelected
                      ? "border-brand ring-2 ring-brand/20 bg-brand-light/20"
                      : "border-border hover:border-brand/40"
                  }`}
                >
                  <div>
                    {/* Package Image Header */}
                    <div className="relative h-40 w-full bg-ink">
                      <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                      {pkg.popular && (
                        <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded bg-brand text-white text-[10px] font-extrabold uppercase shadow">
                          Most Popular
                        </span>
                      )}
                      <div className="absolute bottom-2.5 left-3 right-3 text-white">
                        <span className="text-[10px] font-bold text-brand-light uppercase block">
                          {pkg.badge}
                        </span>
                        <h3 className="text-base font-extrabold text-white">
                          {pkg.name}
                        </h3>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="text-base font-black text-brand">
                        {pkg.pricePerSqFt}
                      </div>
                      <p className="text-xs text-ink-muted leading-relaxed line-clamp-2">
                        {pkg.subtitle}
                      </p>

                      <ul className="space-y-1.5 pt-2 border-t border-border">
                        {pkg.highlights.map((hl, hIdx) => (
                          <li
                            key={hIdx}
                            className="flex items-start gap-2 text-[11px] font-medium text-ink-muted"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                            <span className="leading-snug">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      type="button"
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-brand text-white shadow-sm"
                          : "bg-surface-muted text-ink border border-border hover:bg-brand-light"
                      }`}
                    >
                      {isSelected ? "Package Selected ✓" : "Select Package"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 2: CUSTOMIZE & CALCULATE TOTAL ESTIMATE */}
        <div className="bg-surface-muted rounded-3xl border border-border p-6 sm:p-10">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand">
                Step 2: Customize Parameters & Material Breakdown
              </span>
              <h3 className="text-2xl font-extrabold text-ink mt-0.5">
                Calculate Estimate for {currentPkg.name}
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-brand bg-brand-light/60 px-3 py-1.5 rounded-full border border-brand/20">
              <ShieldCheck className="w-4 h-4" />
              <span>Patna Rate Calibration 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Sliders, Inputs & Material Distribution (6 Cols) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Built-Up Area Input */}
              <div className="bg-surface rounded-2xl p-5 border border-border space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase text-ink-muted flex items-center gap-1.5">
                    <Ruler className="w-4 h-4 text-brand" /> Plot / Built-up Area
                  </label>
                  <span className="text-brand font-black text-base bg-brand-light px-3 py-1 rounded-lg">
                    {plotArea.toLocaleString()} sq.ft
                  </span>
                </div>

                <input
                  type="range"
                  min={500}
                  max={10000}
                  step={100}
                  value={plotArea}
                  onChange={(e) => setPlotArea(Number(e.target.value))}
                  className="w-full accent-brand cursor-pointer h-2 bg-neutral-200 rounded-lg"
                />

                {/* Quick Area Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] text-ink-subtle">Quick select:</span>
                  {areaPills.map((pill) => (
                    <button
                      key={pill}
                      type="button"
                      onClick={() => setPlotArea(pill)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition-all cursor-pointer ${
                        plotArea === pill
                          ? "bg-brand text-white border-brand shadow-xs"
                          : "bg-surface-muted text-ink-muted border-border hover:bg-brand-light"
                      }`}
                    >
                      {pill} sq.ft
                    </button>
                  ))}
                </div>
              </div>

              {/* City Selector */}
              <div className="bg-surface rounded-2xl p-5 border border-border space-y-2 shadow-sm">
                <label className="text-xs font-bold uppercase text-ink-muted flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand" /> Bihar City / Location
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-surface-muted border border-border rounded-xl px-4 py-3 text-sm font-bold text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand cursor-pointer"
                >
                  {BIHAR_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Total Project Cost Output Box */}
              <div className="bg-surface rounded-2xl border-2 border-brand/40 p-5 sm:p-6 space-y-3 shadow-booking">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-subtle block">
                  Estimated Total Project Cost ({currentPkg.name})
                </span>
                <div className="text-2xl sm:text-3xl font-black text-brand flex items-center gap-2 flex-wrap">
                  <span>{formatINR(estimatedMin)}</span>
                  <span className="text-ink-subtle text-lg font-normal">to</span>
                  <span>{formatINR(estimatedMax)}</span>
                </div>
                <p className="text-xs text-ink-muted pt-2 border-t border-border leading-relaxed">
                  *Includes architectural 2D/3D design, civil RCC structure, raw
                  materials (cement, TMT steel, sand, bricks), skilled labour, and
                  finishing as per {currentPkg.name} specifications.
                </p>
              </div>

              {/* Material & Stage Breakdown Progress Bars */}
              <div className="bg-surface rounded-2xl p-5 sm:p-6 border border-border space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-ink">
                    Stage-Wise Material Cost Distribution
                  </span>
                  <span className="text-[11px] font-bold text-brand">
                    ~{formatINR(estimatedAvg)} Avg
                  </span>
                </div>

                {/* 1. Civil Work & TMT Steel (40%) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-ink">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-brand" />
                      Civil RCC Work & TMT Steel (40%)
                    </span>
                    <span className="font-extrabold text-brand">
                      {formatINR(civilCost)}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-brand h-full rounded-full transition-all duration-300"
                      style={{ width: "40%" }}
                    />
                  </div>
                </div>

                {/* 2. Finishing, Tiles & Paint (30%) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-ink">
                    <span className="flex items-center gap-1.5">
                      <Paintbrush className="w-3.5 h-3.5 text-brand-accent" />
                      Finishing, Tiles & Paint (30%)
                    </span>
                    <span className="font-extrabold text-brand">
                      {formatINR(finishingCost)}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-accent h-full rounded-full transition-all duration-300"
                      style={{ width: "30%" }}
                    />
                  </div>
                </div>

                {/* 3. Doors, Windows & MEP (20%) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-ink">
                    <span className="flex items-center gap-1.5">
                      <Hammer className="w-3.5 h-3.5 text-ink-muted" />
                      Doors, Windows, Electrical & Plumbing (20%)
                    </span>
                    <span className="font-extrabold text-brand">
                      {formatINR(mepDoorsCost)}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-ink-muted h-full rounded-full transition-all duration-300"
                      style={{ width: "20%" }}
                    />
                  </div>
                </div>

                {/* 4. Architecture & Supervision (10%) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-ink">
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-brand-dark" />
                      Architecture, Vastu, Structural DPR & Supervision (10%)
                    </span>
                    <span className="font-extrabold text-brand">
                      {formatINR(architectureCost)}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-dark h-full rounded-full transition-all duration-300"
                      style={{ width: "10%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Capture Gate & WhatsApp Delivery (6 Cols) */}
            <div className="lg:col-span-6 bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-booking flex flex-col justify-between">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-extrabold text-ink">
                      Detailed BOQ PDF Generated!
                    </h4>
                    <p className="text-sm text-ink-muted mt-2 max-w-md mx-auto leading-relaxed">
                      Aapke area ({plotArea} sq.ft) aur package ({currentPkg.name}) ka
                      complete cost estimate <strong>{phone}</strong> par WhatsApp
                      aur SMS kar diya gaya hai.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      href={`https://wa.me/919876543210?text=Hello%20Livitech%20Design,%20I%20just%20calculated%20my%20${plotArea}%20sq.ft%20home%20cost%20in%20${encodeURIComponent(
                        selectedCity
                      )}%20with%20${encodeURIComponent(
                        currentPkg.name
                      )}%20(${formatINR(estimatedMin)}%20-%20${formatINR(
                        estimatedMax
                      )}).%20Please%20share%20the%20detailed%20BOQ%20PDF.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-sm py-3 px-6 rounded-xl transition-all shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Open WhatsApp Now</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-3 rounded-xl bg-surface-muted text-xs font-bold text-ink border border-border hover:bg-brand-light transition-colors cursor-pointer"
                    >
                      Calculate Another Estimate
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEstimateSubmit} className="space-y-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light text-brand text-[11px] font-extrabold uppercase tracking-wider mb-2">
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>Official Engineer BOQ</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-ink">
                      Receive Itemized Estimate on WhatsApp
                    </h3>
                    <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                      Enter your contact details to download the complete stage-wise
                      material breakdown sheet formatted for Bihar home construction.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Anand Vardhan"
                      className="w-full bg-surface-muted border border-border rounded-xl px-4 py-3 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-surface-muted border border-border rounded-xl px-4 py-3 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all"
                    />
                  </div>

                  {/* Summary Box */}
                  <div className="bg-surface-muted p-4 rounded-xl border border-border text-xs space-y-1.5 text-ink-muted">
                    <div className="flex justify-between font-bold text-ink">
                      <span>Selected Package:</span>
                      <span>{currentPkg.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Area:</span>
                      <span className="font-semibold text-ink">
                        {plotArea.toLocaleString()} sq.ft ({selectedCity.split("(")[0]})
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-border">
                      <span className="font-bold text-ink">Estimated Budget:</span>
                      <span className="font-extrabold text-brand text-sm">
                        {formatINR(estimatedMin)} – {formatINR(estimatedMax)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-extrabold text-sm py-4 px-6 rounded-xl shadow-booking hover:shadow-booking-hover transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Generating BOQ Report...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Get Detailed BOQ PDF (WhatsApp)</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2 text-[11px] text-ink-subtle justify-center pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand" />
                    <span>
                      100% Transparent pricing with zero hidden charges · Direct engineer review
                    </span>
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
