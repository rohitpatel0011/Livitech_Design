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
  Check,
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
        <div className="text-center max-w-3xl mx-auto mb-10">
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

        {/* UNIFIED INTERACTIVE ESTIMATOR DASHBOARD */}
        <div className="bg-surface-muted rounded-3xl border border-border p-5 sm:p-8 lg:p-10 shadow-booking space-y-8">
          {/* STEP 1 HEADER & PACKAGE SELECTOR */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-ink">
                  Select Quality Package
                </span>
                <span className="text-xs text-brand font-semibold hidden md:inline">
                  — Currently: {currentPkg.name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-brand bg-brand-light/60 px-3 py-1 rounded-full border border-brand/20 self-start sm:self-auto">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Patna Rate Calibration 2026</span>
              </div>
            </div>

            {/* 4 Sleek Package Selector Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {COST_PACKAGES.map((pkg) => {
                const isSelected = pkg.id === selectedPackageId;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`text-left rounded-2xl border-2 transition-all p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? "bg-surface border-brand ring-2 ring-brand/30 shadow-md"
                        : "bg-surface/80 border-border hover:border-brand/40 hover:bg-surface"
                    }`}
                  >
                    {/* Top Row: Mini Photo + Name + Badge */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-border">
                          <Image
                            src={pkg.image}
                            alt={pkg.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>

                        {pkg.popular ? (
                          <span className="px-2 py-0.5 rounded-full bg-brand text-white text-[10px] font-black uppercase tracking-wide shadow-xs">
                            Most Popular
                          </span>
                        ) : isSelected ? (
                          <span className="px-2 py-0.5 rounded-full bg-brand/10 text-brand text-[10px] font-bold flex items-center gap-1">
                            <Check className="w-3 h-3" /> Selected
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-ink-subtle uppercase">
                            {pkg.badge.split(" ")[0]}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-extrabold text-ink leading-tight">
                        {pkg.name}
                      </h3>
                      <div className="text-sm font-black text-brand mt-0.5">
                        {pkg.pricePerSqFt}
                      </div>
                      <p className="text-[11px] text-ink-muted leading-tight mt-1 line-clamp-2">
                        {pkg.subtitle}
                      </p>
                    </div>

                    {/* Bottom Status Indicator Bar */}
                    <div className="pt-3 mt-2 border-t border-border flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-ink-subtle">
                        {pkg.highlights.length} Specifications
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          isSelected ? "text-brand" : "text-ink-subtle"
                        }`}
                      >
                        {isSelected ? "Active ✓" : "Select →"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: SPLIT CALCULATOR CONFIGURATOR & SUMMARY */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold">
                2
              </span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-ink">
                Customize Parameters & Calculate Estimate
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT COLUMN (7 Cols): Area, Location, Material Breakdown & Specs */}
              <div className="lg:col-span-7 space-y-6">
                {/* Built-Up Area Card */}
                <div className="bg-surface rounded-2xl p-5 border border-border space-y-3 shadow-xs">
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
                    <span className="text-[11px] text-ink-subtle font-medium">Quick select:</span>
                    {areaPills.map((pill) => (
                      <button
                        key={pill}
                        type="button"
                        onClick={() => setPlotArea(pill)}
                        className={`text-[11px] px-3 py-1 rounded-lg border font-bold transition-all cursor-pointer ${
                          plotArea === pill
                            ? "bg-brand text-white border-brand shadow-xs"
                            : "bg-surface-muted text-ink-muted border-border hover:bg-brand-light"
                        }`}
                      >
                        {pill.toLocaleString()} sq.ft
                      </button>
                    ))}
                  </div>
                </div>

                {/* City Selector */}
                <div className="bg-surface rounded-2xl p-5 border border-border space-y-2 shadow-xs">
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

                {/* Stage-Wise Material Cost Distribution */}
                <div className="bg-surface rounded-2xl p-5 sm:p-6 border border-border space-y-4 shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-ink flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand" />
                      Stage-Wise Material Cost Distribution
                    </span>
                    <span className="text-xs font-black text-brand">
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

                {/* Active Package Specification Highlights */}
                <div className="bg-surface rounded-2xl p-5 border border-border shadow-xs">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-ink block mb-3">
                    Included in {currentPkg.name}:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentPkg.highlights.map((hl, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-2 text-xs text-ink-muted"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                        <span className="leading-snug font-medium">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN (5 Cols): Live Summary & WhatsApp BOQ Lead Form */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                {/* Total Cost Calculation Box */}
                <div className="bg-surface rounded-2xl border-2 border-brand/50 p-6 space-y-3 shadow-booking">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-ink-subtle">
                      Estimated Total Project Cost
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-light text-brand text-[11px] font-black">
                      {currentPkg.name}
                    </span>
                  </div>

                  <div className="text-2xl sm:text-3xl font-black text-brand flex items-center gap-2 flex-wrap">
                    <span>{formatINR(estimatedMin)}</span>
                    <span className="text-ink-subtle text-lg font-normal">to</span>
                    <span>{formatINR(estimatedMax)}</span>
                  </div>

                  <p className="text-xs text-ink-muted pt-2 border-t border-border leading-relaxed">
                    *Includes architectural 2D/3D design, civil RCC structure, raw
                    materials (cement, TMT steel, sand, bricks), skilled labour, and
                    finishing as per {currentPkg.name} specifications in {selectedCity.split("(")[0]}.
                  </p>
                </div>

                {/* Lead Capture Gate & WhatsApp BOQ Sheet */}
                <div className="bg-surface rounded-2xl border border-border p-6 shadow-booking">
                  {submitted ? (
                    <div className="py-8 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto shadow-xs">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-extrabold text-ink">
                          Detailed BOQ PDF Generated!
                        </h4>
                        <p className="text-xs text-ink-muted mt-2 max-w-sm mx-auto leading-relaxed">
                          Aapke area ({plotArea} sq.ft) aur package ({currentPkg.name}) ka
                          complete cost estimate <strong>{phone}</strong> par WhatsApp
                          aur SMS kar diya gaya hai.
                        </p>
                      </div>

                      <div className="pt-2 flex flex-col gap-2.5">
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
                          className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs py-3 px-5 rounded-xl transition-all shadow-sm"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Open WhatsApp Now</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => setSubmitted(false)}
                          className="w-full py-2.5 rounded-xl bg-surface-muted text-xs font-bold text-ink border border-border hover:bg-brand-light transition-colors cursor-pointer"
                        >
                          Calculate Another Estimate
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleEstimateSubmit} className="space-y-3.5">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light text-brand text-[11px] font-extrabold uppercase tracking-wider mb-2">
                          <FileSpreadsheet className="w-3.5 h-3.5" />
                          <span>Official Engineer BOQ</span>
                        </div>
                        <h3 className="text-lg font-extrabold text-ink leading-tight">
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
                          className="w-full bg-surface-muted border border-border rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all"
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
                          className="w-full bg-surface-muted border border-border rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all"
                        />
                      </div>

                      {/* Live Summary Bar */}
                      <div className="bg-surface-muted p-3.5 rounded-xl border border-border text-xs space-y-1 text-ink-muted">
                        <div className="flex justify-between font-bold text-ink">
                          <span>Package:</span>
                          <span className="text-brand">{currentPkg.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Area & Location:</span>
                          <span className="font-semibold text-ink">
                            {plotArea.toLocaleString()} sq.ft ({selectedCity.split("(")[0].trim()})
                          </span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-border">
                          <span className="font-bold text-ink">Est. Cost:</span>
                          <span className="font-black text-brand text-xs">
                            {formatINR(estimatedMin)} – {formatINR(estimatedMax)}
                          </span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-extrabold text-sm py-3.5 px-5 rounded-xl shadow-booking hover:shadow-booking-hover transition-all flex items-center justify-center gap-2 cursor-pointer"
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

                      <div className="flex items-center gap-2 text-[10px] text-ink-subtle justify-center pt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-brand shrink-0" />
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
        </div>
      </div>
    </section>
  );
}
