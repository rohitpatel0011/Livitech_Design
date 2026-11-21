"use client";

import React, { useState } from "react";
import {
  Check,
  MapPin,
  Ruler,
  Layers,
  Send,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  MessageSquare,
  RotateCcw,
} from "lucide-react";
import { BIHAR_CITIES } from "@/data/livitectData";

interface CostPackage {
  id: string;
  name: string;
  eyebrow: string;
  pricePerSqFt: string;
  rateMin: number;
  rateMax: number;
  popular?: boolean;
  hasPlus?: boolean;
  bullets: string[];
}

const COST_PACKAGES: CostPackage[] = [
  {
    id: "basic",
    name: "Essential Structure",
    eyebrow: "Foundation & Civil Essentials",
    pricePerSqFt: "₹1,550 – ₹1,750 /sq.ft",
    rateMin: 1550,
    rateMax: 1750,
    bullets: [
      "Grade-A TMT Steel & OPC/PPC Cement",
      "Standard flush doors & aluminium windows",
      "Emulsion wall finish & anti-skid flooring",
      "Essential sanitary & electrical piping",
    ],
  },
  {
    id: "standard",
    name: "Standard Finishing",
    eyebrow: "Most Popular in Bihar",
    pricePerSqFt: "₹1,950 – ₹2,250 /sq.ft",
    rateMin: 1950,
    rateMax: 2250,
    popular: true,
    bullets: [
      "Top-tier brand cement & Fe-550D TMT steel",
      "Teakwood finish main door & premium windows",
      "Branded sanitaryware (Hindware/Parryware)",
      "High-grade vitrified tiles & weather-proof paint",
    ],
  },
  {
    id: "advance",
    name: "Advance Finishing",
    eyebrow: "Modern Luxury Living",
    pricePerSqFt: "₹2,600 – ₹3,100 /sq.ft",
    rateMin: 2600,
    rateMax: 3100,
    bullets: [
      "Superior structural engineering with AAC blocks",
      "Designer solid teak doors & premium hardware",
      "Modular kitchen setup & designer bathroom fittings",
      "Textured designer exterior paint & profile lighting",
    ],
  },
  {
    id: "premium",
    name: "Bespoke Premium",
    eyebrow: "Ultimate Architectural Finish",
    pricePerSqFt: "₹3,300 – ₹4,200+ /sq.ft",
    rateMin: 3300,
    rateMax: 4200,
    hasPlus: true,
    bullets: [
      "Bespoke designer kitchen & built-in wardrobes",
      "Apex Ultima exterior finish & Italian-spec tiles",
      "EV charging point & secure copper gas line prep",
      "Dedicated senior architect site supervision",
    ],
  },
];

const PRESET_AREAS = [1000, 1500, 2000, 3000, 4500];

export default function CostEstimatorSection() {
  const [selectedPkgId, setSelectedPkgId] = useState<string>("standard");
  const [plotArea, setPlotArea] = useState<number>(2000);
  const [selectedCity, setSelectedCity] = useState<string>(BIHAR_CITIES[0] || "Patna");

  // Lead capture state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const safeArea = Math.max(100, isNaN(plotArea) ? 1000 : plotArea);
  const selectedPkg = COST_PACKAGES.find((p) => p.id === selectedPkgId) || COST_PACKAGES[1];

  const selectedPkgMin = safeArea * selectedPkg.rateMin;
  const selectedPkgMax = safeArea * selectedPkg.rateMax;

  const formatLakhs = (num: number, hasPlus = false) => {
    const val = (num / 100000).toFixed(2);
    return `₹${val} Lakhs${hasPlus ? "+" : ""}`;
  };

  const formatShortLakhs = (num: number, hasPlus = false) => {
    const val = (num / 100000).toFixed(1);
    return `₹${val}L${hasPlus ? "+" : ""}`;
  };

  const handleAreaChange = (val: string) => {
    const num = parseInt(val, 10);
    if (isNaN(num)) {
      setPlotArea(0);
    } else {
      setPlotArea(Math.min(50000, Math.max(0, num)));
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName || fullName.trim().length < 2) {
      setErrorMsg("Kripya apna poora naam enter karein.");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg("Kripya valid 10-digit WhatsApp number dalein.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: cleanPhone,
          city: selectedCity,
          plotArea: `${safeArea} sq.ft`,
          service: `Cost Estimator (${selectedPkg.name})`,
          estimatedBudget: `${formatLakhs(selectedPkgMin)} – ${formatLakhs(selectedPkgMax, selectedPkg.hasPlus)}`,
          source: "Compact 2x2 Cost Estimator Section",
          notes: `Selected Package: ${selectedPkg.name} (${selectedPkg.pricePerSqFt}) | Location: ${selectedCity}, Bihar`,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setIsSubmitted(true);
    } catch {
      setErrorMsg("Network error. Aap direct helpline par call kar sakte hain: +91 98765 43210.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappDirectUrl = `https://wa.me/917903993902?text=${encodeURIComponent(
    `Namaste Livitech, I calculated BOQ for ${safeArea} sq.ft in ${selectedCity} under "${selectedPkg.name}" (${formatLakhs(
      selectedPkgMin
    )} – ${formatLakhs(selectedPkgMax, selectedPkg.hasPlus)}). Please share the itemized BOQ breakdown PDF.`
  )}`;

  return (
    <section
      id="cost-estimator"
      className="scroll-mt-24 py-16 lg:py-24 bg-[#F4F6FA] border-b border-[#CFDAEC] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="max-w-3xl mb-10 sm:mb-12 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CFDAEC] shadow-xs text-[11px] font-mono font-bold uppercase tracking-wider text-[#EA580C] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse" />
            LIVE BOQ CALCULATOR • BIHAR RATES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D0F1B] tracking-tight">
            Know your construction cost before you build.
          </h2>
          <p className="text-sm sm:text-base text-[#4B5368] mt-2.5 leading-relaxed">
            Real-time BOQ cost estimation based on verified Patna &amp; Bihar material rates. Select your plot size and package for instant, transparent pricing.
          </p>
        </div>

        {/* ================= COMPACT 2x2 GRID + STICKY RIGHT RECEIPT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ================= LEFT (65% width): 2x2 PACKAGE CARDS GRID ================= */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            
            {/* Mobile swipe hint */}
            <div className="flex sm:hidden items-center justify-between text-[11px] font-mono text-[#64748B] px-1">
              <span>Swipe packages horizontally →</span>
              <span className="text-[#EA580C] font-bold">4 Packages</span>
            </div>

            {/* Cards container: Horizontal scroll snap on mobile, 2x2 grid on desktop */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:gap-5">
              {COST_PACKAGES.map((pkg) => {
                const isSelected = selectedPkgId === pkg.id;
                const pkgMinCost = safeArea * pkg.rateMin;
                const pkgMaxCost = safeArea * pkg.rateMax;

                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPkgId(pkg.id)}
                    className={`min-w-[85%] sm:min-w-0 snap-center shrink-0 sm:shrink rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "border-2 border-[#EA580C] bg-[#FFF7ED]/40 shadow-xl ring-2 ring-[#EA580C]/15"
                        : "border border-[#E2E8F0] bg-white hover:border-[#CBD5E1] hover:shadow-md"
                    }`}
                  >
                    <div>
                      {/* Top Eyebrow Tag */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`text-[11px] font-mono font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                            pkg.popular
                              ? "bg-[#EA580C] text-white shadow-xs"
                              : "bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]"
                          }`}
                        >
                          {pkg.eyebrow}
                        </span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#EA580C] text-white flex items-center justify-center text-xs shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>

                      {/* Package Title + Price */}
                      <div className="mb-3.5">
                        <h3 className="text-lg font-extrabold text-[#0D0F1B]">
                          {pkg.name}
                        </h3>
                        <p className="text-[13px] font-bold text-[#64748B] mt-0.5">
                          {pkg.pricePerSqFt}
                        </p>
                      </div>

                      {/* Highlighted Estimate Box */}
                      <div
                        className={`rounded-2xl p-3.5 mb-4 transition-colors ${
                          isSelected
                            ? "bg-[#FFF7ED] border border-[#EA580C]/30 shadow-2xs"
                            : "bg-[#F8FAFC] border border-[#E2E8F0]"
                        }`}
                      >
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] block">
                          Est. for {safeArea.toLocaleString()} sq.ft:
                        </span>
                        <div className="text-base sm:text-lg font-black text-[#EA580C] mt-0.5 tracking-tight">
                          {formatLakhs(pkgMinCost)} – {formatLakhs(pkgMaxCost, pkg.hasPlus)}
                        </div>
                      </div>

                      {/* Clean 4 Bullets */}
                      <ul className="space-y-2 mb-4 text-xs text-[#334155] font-medium">
                        {pkg.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#EA580C] shrink-0 mt-0.5" />
                            <span className="leading-snug">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Active vs Inactive Action Button */}
                    <div className="pt-2 border-t border-[#E2E8F0]/70">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPkgId(pkg.id);
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? "bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-xs"
                            : "border border-[#CBD5E1] bg-white text-[#0D0F1B] hover:bg-[#0B0E14] hover:text-white hover:border-[#0B0E14]"
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <span>Selected Tier</span>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </>
                        ) : (
                          <span>Select Package</span>
                        )}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Subtle engineering footer notice */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#64748B] px-1 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#EA580C] shrink-0" />
              <span>
                All 4 packages include IS 456 vetted structural designs, site supervision, and milestone-linked payment schedules.
              </span>
            </div>

          </div>

          {/* ================= RIGHT (35% width): STICKY LIVE BOQ RECEIPT (Dark Navy Card) ================= */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            <div className="bg-[#0B0E14] text-white rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl space-y-5">
              
              {/* Receipt Header Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#EA580C] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Live BOQ Receipt
                </span>
                <span className="text-[10px] font-mono text-white/50">
                  {selectedCity}, Bihar
                </span>
              </div>

              {/* Parameter 1: Built-up Area Input + Slider + Presets */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="sticky-boq-area"
                    className="text-xs font-mono font-bold uppercase text-[#8699C1] flex items-center gap-1.5"
                  >
                    <Ruler className="w-3.5 h-3.5 text-[#EA580C]" />
                    Built-up Area:
                  </label>
                  <div className="flex items-baseline gap-1 bg-white/10 px-2.5 py-1 rounded-lg border border-white/15">
                    <input
                      id="sticky-boq-area"
                      type="number"
                      min={200}
                      max={50000}
                      step={50}
                      value={plotArea === 0 ? "" : plotArea}
                      onChange={(e) => handleAreaChange(e.target.value)}
                      className="w-16 bg-transparent text-sm font-black text-white text-right focus:outline-none"
                    />
                    <span className="text-[11px] font-mono font-bold text-[#8699C1]">sq.ft</span>
                  </div>
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min={500}
                  max={10000}
                  step={50}
                  value={plotArea || 1000}
                  onChange={(e) => setPlotArea(Number(e.target.value))}
                  className="w-full accent-[#EA580C] cursor-pointer h-1.5 bg-white/20 rounded-lg"
                />

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_AREAS.map((sqft) => (
                    <button
                      key={sqft}
                      type="button"
                      onClick={() => setPlotArea(sqft)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                        plotArea === sqft
                          ? "bg-[#EA580C] text-white shadow-xs"
                          : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      {sqft} ft
                    </button>
                  ))}
                </div>
              </div>

              {/* Parameter 2: City Selector */}
              <div className="space-y-1.5">
                <label
                  htmlFor="sticky-boq-city"
                  className="text-xs font-mono font-bold uppercase text-[#8699C1] flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
                  City:
                </label>
                <select
                  id="sticky-boq-city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-white/10 border border-white/15 focus:border-[#EA580C] rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none transition-all cursor-pointer"
                >
                  {BIHAR_CITIES.map((c) => (
                    <option key={c} value={c} className="bg-[#0B0E14] text-white">
                      {c} (Bihar)
                    </option>
                  ))}
                </select>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 pt-1" />

              {/* Est. Total Project Cost Box */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#8699C1]">
                  <span>Est. Total Project Cost</span>
                  <span className="text-[#EA580C] font-bold">{selectedPkg.name}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                  {formatLakhs(selectedPkgMin)} – {formatLakhs(selectedPkgMax, selectedPkg.hasPlus)}
                </div>
                <p className="text-[11px] text-white/60 mt-0.5">
                  Turnkey cost for {safeArea.toLocaleString()} sq.ft at {selectedPkg.pricePerSqFt}
                </p>
              </div>

              {/* Complete 100% Stage Breakdown */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-[#8699C1]">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#EA580C]" /> Stage Breakdown
                  </span>
                  <span>100% Total</span>
                </div>

                {/* Horizontal Multi-color Stacked Bar */}
                <div className="h-2.5 w-full rounded-full overflow-hidden flex bg-white/10 shadow-inner">
                  <div
                    style={{ width: "40%" }}
                    className="bg-[#EA580C] h-full"
                    title="Civil RCC & Steel: 40%"
                  />
                  <div
                    style={{ width: "30%" }}
                    className="bg-[#475569] h-full"
                    title="Finishing & Flooring: 30%"
                  />
                  <div
                    style={{ width: "20%" }}
                    className="bg-[#8699C1] h-full"
                    title="MEP: 20%"
                  />
                  <div
                    style={{ width: "10%" }}
                    className="bg-[#0D9488] h-full"
                    title="Design & Supervision: 10%"
                  />
                </div>

                {/* 4 Itemized Cost Lines */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-white/80">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                      Civil RCC &amp; Steel (40%):
                    </span>
                    <strong className="text-white font-mono">{formatShortLakhs(selectedPkgMin * 0.40)}</strong>
                  </div>
                  <div className="flex items-center justify-between text-white/80">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#475569]" />
                      Finishing &amp; Paint (30%):
                    </span>
                    <strong className="text-white font-mono">{formatShortLakhs(selectedPkgMin * 0.30)}</strong>
                  </div>
                  <div className="flex items-center justify-between text-white/80">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#8699C1]" />
                      MEP (Plumbing, Electrical) (20%):
                    </span>
                    <strong className="text-white font-mono">{formatShortLakhs(selectedPkgMin * 0.20)}</strong>
                  </div>
                  <div className="flex items-center justify-between text-white/80">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#0D9488]" />
                      Design, Vastu &amp; Supervision (10%):
                    </span>
                    <strong className="text-white font-mono">{formatShortLakhs(selectedPkgMin * 0.10)}</strong>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 pt-1" />

              {/* WhatsApp Lead Form */}
              {isSubmitted ? (
                <div className="text-center py-4 space-y-3 bg-white/5 rounded-2xl p-4 border border-white/10">
                  <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto" />
                  <h4 className="text-sm font-extrabold text-white">BOQ PDF Sent to WhatsApp!</h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Aapke {safeArea} sq.ft estimate ka breakdown schedule dispatch kar diya gaya hai.
                  </p>
                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Open WhatsApp Chat</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center justify-center gap-1 text-[11px] text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Estimate Another Plot</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <label
                      htmlFor="boq-lead-name"
                      className="text-[11px] font-mono uppercase text-white/70 block"
                    >
                      Full Name *
                    </label>
                    <input
                      id="boq-lead-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full bg-white/10 border border-white/15 focus:border-[#EA580C] rounded-xl px-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="boq-lead-phone"
                      className="text-[11px] font-mono uppercase text-white/70 block"
                    >
                      WhatsApp Number *
                    </label>
                    <input
                      id="boq-lead-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98XXX XXXXX"
                      className="w-full bg-white/10 border border-white/15 focus:border-[#EA580C] rounded-xl px-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none transition-all"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-2 rounded-lg bg-red-900/40 border border-red-500/50 text-[11px] text-red-200 text-center">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#EA580C] hover:bg-[#C2410C] disabled:opacity-60 text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending BOQ...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Get BOQ PDF on WhatsApp</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-white/50 text-center pt-1">
                    Instant PDF Dispatch • Direct Patna Architect Review
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
