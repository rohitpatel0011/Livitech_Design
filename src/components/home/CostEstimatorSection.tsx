"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calculator,
  CheckCircle2,
  Ruler,
  MapPin,
  Send,
  Loader2,
  Layers,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BIHAR_CITIES } from "@/data/livitectData";

interface CostPackage {
  id: string;
  name: string;
  badge: string;
  pricePerSqFt: string;
  rateMin: number;
  rateMax: number;
  subtitle: string;
  highlights: string[];
  image: string;
  popular?: boolean;
}

const COST_PACKAGES: CostPackage[] = [
  {
    id: "basic",
    name: "Essential Structure",
    badge: "Foundation & Civil Essentials",
    pricePerSqFt: "₹1,550 – ₹1,750 /sq.ft",
    rateMin: 1550,
    rateMax: 1750,
    subtitle: "A strong budget-friendly package calibrated for Bihar soil & weather conditions.",
    highlights: [
      "Grade-A TMT Steel & OPC/PPC Cement",
      "Standard flush doors & aluminium windows",
      "Emulsion wall finish & anti-skid flooring",
      "Essential sanitary & electrical piping",
    ],
    image: "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "standard",
    name: "Standard Finishing",
    badge: "Most Popular in Bihar",
    pricePerSqFt: "₹1,950 – ₹2,250 /sq.ft",
    rateMin: 1950,
    rateMax: 2250,
    subtitle: "The homeowner favorite. Branded steel, teak wood finish, and elegant vitrified tiles.",
    highlights: [
      "Top-tier brand cement & Fe-550D TMT steel",
      "Teakwood finish main door & premium windows",
      "Branded sanitaryware (Hindware/Parryware)",
      "High-grade vitrified tiles & weather-proof paint",
    ],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
    popular: true,
  },
  {
    id: "advance",
    name: "Advance Finishing",
    badge: "Modern Luxury Living",
    pricePerSqFt: "₹2,600 – ₹3,100 /sq.ft",
    rateMin: 2600,
    rateMax: 3100,
    subtitle: "Designed for modern lifestyle with designer architectural touches & false ceiling.",
    highlights: [
      "Superior structural engineering with AAC blocks",
      "Designer solid teak doors & premium hardware",
      "Modular kitchen setup & designer bathroom fittings",
      "Textured designer exterior paint & profile lighting",
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "premium",
    name: "Bespoke Premium",
    badge: "Ultimate Architectural Finish",
    pricePerSqFt: "₹3,300 – ₹4,200+ /sq.ft",
    rateMin: 3300,
    rateMax: 4200,
    subtitle: "Absolute luxury meeting high-end lifestyle features and Italian marble finishes.",
    highlights: [
      "Bespoke designer kitchen & built-in wardrobes",
      "Apex Ultima exterior finish & Italian-spec tiles",
      "EV charging point & secure copper gas line prep",
      "Dedicated senior architect site supervision",
    ],
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
  },
];

const AREA_QUICK_SELECT = [1000, 1500, 2000, 3000, 4500];

export default function CostEstimatorSection() {
  const [currentIndex, setCurrentIndex] = useState(1); // Default to Standard
  const [isPaused, setIsPaused] = useState(false);

  const [plotArea, setPlotArea] = useState<number>(2000);
  const [selectedCity, setSelectedCity] = useState(BIHAR_CITIES[0]);

  // Lead form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const currentPkg = COST_PACKAGES[currentIndex];

  // Auto Slider effect (Pauses when user interacts)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % COST_PACKAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const estimatedMin = plotArea * currentPkg.rateMin;
  const estimatedMax = plotArea * currentPkg.rateMax;

  const formatLakhs = (num: number) => `₹${(num / 100000).toFixed(2)} Lakhs`;

  const handleEstimateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName || phone.replace(/\D/g, "").length < 10) {
      setErrorMsg("Kripya apna naam aur valid 10-digit mobile number dalein.");
      return;
    }

    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          city: selectedCity,
          plotArea: `${plotArea} sq.ft`,
          service: `Cost Estimator (${currentPkg.name})`,
          estimatedBudget: `${formatLakhs(estimatedMin)} – ${formatLakhs(estimatedMax)}`,
          source: "Dynamic Interactive Cost Estimator",
        }),
      });
      setSubmitted(true);
    } catch {
      setErrorMsg("Network error aaya hai. Aap seedha Patna HQ call kar sakte hain.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section 
      id="cost-estimator" 
      className="py-16 lg:py-24 bg-[#F9F6F0] border-b border-[#E6D3C3]/40"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E6D3C3]/50 text-[#8E4F2A] text-xs font-extrabold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Dynamic BOQ Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A120E] mt-3">
            Know your construction cost before you build.
          </h2>
          <p className="text-sm sm:text-base text-[#4A4A46] mt-3 leading-relaxed">
            Patna aur Bihar ke current material market rates ke mutabiq instant rough cost calculate karein. Transparent pricing with complete material breakdown.
          </p>
        </div>

        {/* STEP 1: DYNAMIC ACTIVE/INACTIVE CARD SLIDER */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#8E4F2A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#8E4F2A] text-white flex items-center justify-center text-xs">1</span>
              <span>Select Quality Package (Calibrated for Bihar Soil & Weather)</span>
            </h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  setIsPaused(true);
                  setCurrentIndex((prev) => (prev === 0 ? COST_PACKAGES.length - 1 : prev - 1));
                }}
                className="p-2 rounded-full bg-white border border-[#E6D3C3] text-[#1A120E] hover:bg-[#8E4F2A] hover:text-white transition-colors"
                aria-label="Previous package"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  setIsPaused(true);
                  setCurrentIndex((prev) => (prev + 1) % COST_PACKAGES.length);
                }}
                className="p-2 rounded-full bg-white border border-[#E6D3C3] text-[#1A120E] hover:bg-[#8E4F2A] hover:text-white transition-colors"
                aria-label="Next package"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Container: Active Wide Card on Left / Compact Inactive on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* ACTIVE CARD (Wide - 7 Cols) */}
            <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-xl border-2 border-[#8E4F2A] bg-[#1A120E] min-h-[380px] flex flex-col justify-between p-6 sm:p-8 text-white group">
              {/* Background Image with Dark Gradient */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={currentPkg.image}
                  alt={currentPkg.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A120E] via-[#1A120E]/80 to-transparent" />
              </div>

              {/* Top Meta */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#8E4F2A] text-white text-xs font-bold uppercase tracking-wider">
                  {currentPkg.badge}
                </span>
                {currentPkg.popular && (
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#E6D3C3] text-xs font-extrabold uppercase">
                    ⭐ Most Popular in Bihar
                  </span>
                )}
              </div>

              {/* Center Content */}
              <div className="relative z-10 my-6 space-y-3 max-w-lg">
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {currentPkg.name}
                </h3>
                <div className="text-xl sm:text-2xl font-extrabold text-[#E6D3C3]">
                  {currentPkg.pricePerSqFt}
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  {currentPkg.subtitle}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {currentPkg.highlights.map((hl) => (
                    <div key={hl} className="flex items-center gap-2 text-xs font-medium text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-[#E6D3C3] shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between">
                <span className="text-xs text-[#E6D3C3]">Active Selected Package for Step 2</span>
                <span className="px-4 py-2 rounded-xl bg-[#8E4F2A] text-white text-xs font-extrabold">
                  Package Active ✓
                </span>
              </div>
            </div>

            {/* INACTIVE CARDS LIST (5 Cols stacked or grid) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {COST_PACKAGES.map((pkg, idx) => {
                if (idx === currentIndex) return null; // Skip active one
                return (
                  <div
                    key={pkg.id}
                    onClick={() => {
                      setIsPaused(true);
                      setCurrentIndex(idx);
                    }}
                    className="cursor-pointer bg-white rounded-2xl border border-[#E6D3C3] p-4 shadow-sm hover:border-[#8E4F2A] transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                        <Image src={pkg.image} alt={pkg.name} fill sizes="56px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-[#8E4F2A] uppercase block">{pkg.badge}</span>
                        <h4 className="text-sm font-extrabold text-[#1A120E] truncate group-hover:text-[#8E4F2A]">
                          {pkg.name}
                        </h4>
                        <span className="text-xs font-bold text-[#4A4A46]">{pkg.pricePerSqFt}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#8E4F2A] shrink-0 pl-2 group-hover:underline">
                      Select →
                    </span>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* STEP 2: CUSTOMIZE PARAMETERS & MATERIAL BREAKDOWN */}
        <div 
          className="bg-white rounded-3xl border border-[#E6D3C3] p-6 sm:p-10 shadow-sm"
          onClick={() => setIsPaused(true)} // Pauses auto-slider when clicking calculation parameters
        >
          <div className="mb-8">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#8E4F2A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#8E4F2A] text-white flex items-center justify-center text-xs">2</span>
              <span>Customize Parameters & Material Breakdown ({currentPkg.name})</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Calculator Controls & Estimated Total */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Area Slider */}
              <div className="space-y-3 bg-[#F9F6F0] p-5 rounded-2xl border border-[#E6D3C3]/50">
                <label className="text-xs font-bold uppercase text-[#4A4A46] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Ruler className="w-4 h-4 text-[#8E4F2A]" /> Plot / Built-up Area
                  </span>
                  <span className="text-[#8E4F2A] font-extrabold text-sm">
                    {plotArea} sq.ft
                  </span>
                </label>
                <input
                  type="range"
                  min={500}
                  max={10000}
                  step={100}
                  value={plotArea}
                  onChange={(e) => setPlotArea(Number(e.target.value))}
                  className="w-full accent-[#8E4F2A] cursor-pointer"
                />

                {/* Quick Select Chips */}
                <div className="pt-1 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-[#4A4A46] font-semibold">Quick select:</span>
                  {AREA_QUICK_SELECT.map((sqft) => (
                    <button
                      key={sqft}
                      type="button"
                      onClick={() => setPlotArea(sqft)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        plotArea === sqft
                          ? "bg-[#8E4F2A] text-white"
                          : "bg-white text-[#4A4A46] border border-[#E6D3C3] hover:border-[#8E4F2A]"
                      }`}
                    >
                      {sqft} sq.ft
                    </button>
                  ))}
                </div>
              </div>

              {/* City / Location Dropdown */}
              <div className="space-y-2 bg-[#F9F6F0] p-5 rounded-2xl border border-[#E6D3C3]/50">
                <label className="text-xs font-bold uppercase text-[#4A4A46] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#8E4F2A]" /> Bihar City / Location
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-white border border-[#E6D3C3] rounded-xl px-4 py-3 text-sm font-bold text-[#1A120E] focus:outline-none focus:border-[#8E4F2A]"
                >
                  {BIHAR_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Estimated Total Project Cost Box */}
              <div className="bg-[#1A120E] text-white rounded-2xl p-6 space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E6D3C3]">
                    Estimated Total Project Cost ({currentPkg.name})
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#8E4F2A] text-[10px] font-bold text-white">
                    Patna Rate Calibration 2026
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#E6D3C3] flex items-center gap-2">
                  <span>{formatLakhs(estimatedMin)}</span>
                  <span className="text-white/60 text-lg font-normal">to</span>
                  <span>{formatLakhs(estimatedMax)}</span>
                </div>
                <p className="text-xs text-white/70 pt-2 border-t border-white/10 leading-relaxed">
                  *Includes architectural 2D/3D design, civil RCC structure, raw materials, skilled labour, and finishing as per {currentPkg.name} specifications.
                </p>
              </div>
            </div>

            {/* Right Column: Stage-Wise Breakdown & WhatsApp Lead Gate */}
            <div className="lg:col-span-6 bg-[#F9F6F0] rounded-2xl border border-[#E6D3C3] p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              {/* Stage-Wise Material Cost Distribution */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1A120E] flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#8E4F2A]" /> Stage-Wise Material Cost Distribution
                  </h4>
                  <span className="text-xs font-bold text-[#8E4F2A]">~{formatLakhs((estimatedMin + estimatedMax) / 2)} Avg</span>
                </div>

                <div className="space-y-2.5">
                  <div className="bg-white p-3 rounded-xl border border-[#E6D3C3]/60 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#4A4A46]">Civil RCC Work & TMT Steel (40%)</span>
                    <span className="font-extrabold text-[#1A120E]">{formatLakhs(estimatedMin * 0.40)}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#E6D3C3]/60 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#4A4A46]">Finishing, Tiles & Paint (30%)</span>
                    <span className="font-extrabold text-[#1A120E]">{formatLakhs(estimatedMin * 0.30)}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#E6D3C3]/60 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#4A4A46]">Doors, Windows, Electrical & Plumbing (20%)</span>
                    <span className="font-extrabold text-[#1A120E]">{formatLakhs(estimatedMin * 0.20)}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#E6D3C3]/60 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#4A4A46]">Architecture, Vastu, Structural DPR & Supervision (10%)</span>
                    <span className="font-extrabold text-[#1A120E]">{formatLakhs(estimatedMin * 0.10)}</span>
                  </div>
                </div>
              </div>

              {/* Official Engineer BOQ Lead Gate */}
              <div className="pt-4 border-t border-[#E6D3C3]">
                {submitted ? (
                  <div className="py-8 text-center space-y-3 bg-white rounded-xl p-4 border border-[#E6D3C3]">
                    <div className="w-12 h-12 rounded-full bg-[#E6D3C3]/40 text-[#8E4F2A] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h5 className="text-base font-extrabold text-[#1A120E]">BOQ Report Sent!</h5>
                    <p className="text-xs text-[#4A4A46]">
                      Aapke area ({plotArea} sq.ft) ka detailed estimate <strong>{phone}</strong> par WhatsApp par bhej diya gaya hai.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-bold text-[#8E4F2A] underline"
                    >
                      Calculate again
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleEstimateSubmit} className="space-y-3.5">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8E4F2A] block">
                        Official Engineer BOQ
                      </span>
                      <h4 className="text-base font-extrabold text-[#1A120E]">
                        Receive Itemized Estimate on WhatsApp
                      </h4>
                      <p className="text-[11px] text-[#4A4A46] mt-0.5">
                        Enter your contact details to download the complete stage-wise material breakdown sheet formatted for Bihar home construction.
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                        {errorMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#4A4A46] mb-1">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Anand Vardhan"
                          className="w-full bg-white border border-[#E6D3C3] rounded-xl px-3 py-2 text-xs font-medium text-[#1A120E] focus:outline-none focus:border-[#8E4F2A]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#4A4A46] mb-1">
                          WhatsApp / Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 9876543210"
                          className="w-full bg-white border border-[#E6D3C3] rounded-xl px-3 py-2 text-xs font-medium text-[#1A120E] focus:outline-none focus:border-[#8E4F2A]"
                        />
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-[#E6D3C3]/70 text-[11px] text-[#4A4A46] flex flex-wrap items-center justify-between gap-1">
                      <span>Selected Package: <strong>{currentPkg.name}</strong></span>
                      <span>Total Area: <strong>{plotArea} sq.ft ({selectedCity.split(" ")[0]})</strong></span>
                      <span className="w-full text-[#8E4F2A] font-extrabold">Estimated Budget: {formatLakhs(estimatedMin)} – {formatLakhs(estimatedMax)}</span>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#8E4F2A] hover:bg-[#6D3B1E] disabled:opacity-60 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Generating BOQ PDF...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Get Detailed BOQ PDF (WhatsApp)</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1.5 text-[10px] text-[#4A4A46] justify-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#8E4F2A]" />
                      <span>100% Transparent pricing with zero hidden charges · Direct engineer review</span>
                    </div>
                  </form>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}