"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Calculator,
  CheckCircle2,
  Ruler,
  MapPin,
  Send,
  Loader2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Layers,
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
    image: "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1000&q=85",
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
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=85",
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
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
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
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
  },
];

const AREA_QUICK_SELECT = [1000, 1500, 2000, 3000, 4500];

export default function CostEstimatorSection() {
  const [activeIndex, setActiveIndex] = useState(1); // Default to Standard Finishing
  const [isPaused, setIsPaused] = useState(false);
  const [plotArea, setPlotArea] = useState<number>(2000);
  const [selectedCity, setSelectedCity] = useState(BIHAR_CITIES[0]);

  // Lead form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto-slide animation effect (pauses when user interacts or hovers)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % COST_PACKAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentPkg = COST_PACKAGES[activeIndex];
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
          source: "Dynamic Active Card Cost Estimator",
        }),
      });
      setSubmitted(true);
    } catch {
      setErrorMsg("Network error. Aap seedha Patna HQ call kar sakte hain.");
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
            <span>Interactive BOQ Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A120E] mt-3">
            Know your construction cost before you build.
          </h2>
          <p className="text-sm sm:text-base text-[#4A4A46] mt-3 leading-relaxed">
            Patna aur Bihar ke current material market rates ke hisab se apne plot size aur quality package ke mutabiq instant rough cost calculate karein. Transparent pricing with complete material breakdown.
          </p>
        </div>

        {/* DYNAMIC SLIDER CONTAINER (Active Large Card + Inactive Preview Cards) */}
        <div
          ref={sliderRef}
          className="relative overflow-hidden"
          onClick={() => setIsPaused(true)}
        >
          <div className="flex gap-6 items-stretch transition-transform duration-500 ease-out">

            {/* ACTIVE LARGE CARD (Expanded with Step 2 Calculator & Breakdown) */}
            <div className="w-full bg-white rounded-3xl border-2 border-[#8E4F2A] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">

              {/* LEFT SIDE OF ACTIVE CARD: Image Header & Package Info */}
              <div className="lg:col-span-5 relative bg-[#1A120E] text-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <Image
                    src={currentPkg.image}
                    alt={currentPkg.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover opacity-40 transform scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A120E] via-[#1A120E]/80 to-transparent" />
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#8E4F2A] text-white text-[10px] font-extrabold uppercase shadow">
                      {currentPkg.badge}
                    </span>
                    <span className="text-xs font-bold text-[#E6D3C3]">
                      Package {activeIndex + 1} of {COST_PACKAGES.length}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {currentPkg.name}
                    </h3>
                    <div className="text-xl font-extrabold text-[#E6D3C3] mt-1">
                      {currentPkg.pricePerSqFt}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {currentPkg.subtitle}
                  </p>

                  <ul className="space-y-2 pt-2">
                    {currentPkg.highlights.map((hl) => (
                      <li key={hl} className="flex items-center gap-2 text-xs font-medium text-white/90">
                        <CheckCircle2 className="w-4 h-4 text-[#8E4F2A] shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Package Switcher Selector Pills */}
                <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev === 0 ? COST_PACKAGES.length - 1 : prev - 1))}
                    className="p-2 rounded-xl bg-white/10 hover:bg-[#8E4F2A] text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {COST_PACKAGES.map((pkg, idx) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === activeIndex ? "w-6 bg-[#8E4F2A]" : "w-2 bg-white/40"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % COST_PACKAGES.length)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-[#8E4F2A] text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* RIGHT SIDE OF ACTIVE CARD: Customization, Calculation & WhatsApp BOQ Gate */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 bg-white">

                {/* Parameter Controls (Area Slider & City Dropdown) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F9F6F0] p-4 rounded-2xl border border-[#E6D3C3]/50">

                  {/* Area Slider */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase text-[#4A4A46] flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Ruler className="w-3.5 h-3.5 text-[#8E4F2A]" /> Built-up Area
                      </span>
                      <span className="text-[#8E4F2A] font-extrabold">{plotArea} sq.ft</span>
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
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-1">
                      {AREA_QUICK_SELECT.map((sqft) => (
                        <button
                          key={sqft}
                          type="button"
                          onClick={() => setPlotArea(sqft)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 transition-all ${
                            plotArea === sqft ? "bg-[#8E4F2A] text-white" : "bg-white text-[#4A4A46] border border-[#E6D3C3]"
                          }`}
                        >
                          {sqft}ft
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* City Selector */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase text-[#4A4A46] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#8E4F2A]" /> Bihar City
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full bg-white border border-[#E6D3C3] rounded-xl px-3 py-2 text-xs font-bold text-[#1A120E] focus:outline-none focus:border-[#8E4F2A]"
                    >
                      {BIHAR_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Total Cost & Stage Distribution Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Total Cost Box */}
                  <div className="bg-[#1A120E] text-white p-4 rounded-xl flex flex-col justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E6D3C3]">
                      Est. Total Project Cost
                    </span>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#E6D3C3] my-1">
                      {formatLakhs(estimatedMin)} – {formatLakhs(estimatedMax)}
                    </div>
                    <span className="text-[10px] text-white/60">Includes design, RCC & finishing</span>
                  </div>

                  {/* Stage-Wise Cost Mini Breakdown */}
                  <div className="bg-[#F9F6F0] p-3 rounded-xl border border-[#E6D3C3]/60 space-y-1.5 text-[11px]">
                    <div className="font-extrabold text-[#1A120E] flex items-center gap-1 mb-1">
                      <Layers className="w-3 h-3 text-[#8E4F2A]" /> Stage Distribution
                    </div>
                    <div className="flex justify-between text-[#4A4A46]">
                      <span>Civil RCC & Steel (40%):</span>
                      <strong className="text-[#1A120E]">{formatLakhs(estimatedMin * 0.40)}</strong>
                    </div>
                    <div className="flex justify-between text-[#4A4A46]">
                      <span>Finishing & Paint (30%):</span>
                      <strong className="text-[#1A120E]">{formatLakhs(estimatedMin * 0.30)}</strong>
                    </div>
                    <div className="flex justify-between text-[#4A4A46]">
                      <span>Doors, Windows, MEP (20%):</span>
                      <strong className="text-[#1A120E]">{formatLakhs(estimatedMin * 0.20)}</strong>
                    </div>
                  </div>
                </div>

                {/* Official Engineer BOQ WhatsApp Lead Gate */}
                <div className="pt-2 border-t border-[#E6D3C3]/60">
                  {submitted ? (
                    <div className="py-4 text-center space-y-2 bg-[#F9F6F0] rounded-xl p-3">
                      <CheckCircle2 className="w-6 h-6 text-[#8E4F2A] mx-auto" />
                      <h5 className="text-xs font-extrabold text-[#1A120E]">BOQ Report Sent to WhatsApp!</h5>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="text-[10px] font-bold text-[#8E4F2A] underline"
                      >
                        Reset form
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleEstimateSubmit} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8E4F2A]">
                          Official Engineer BOQ via WhatsApp
                        </span>
                        <span className="text-[10px] text-[#4A4A46]">Zero hidden charges</span>
                      </div>

                      {errorMsg && (
                        <div className="p-2 rounded bg-red-50 text-[10px] font-semibold text-red-700">
                          {errorMsg}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your Full Name *"
                          className="w-full bg-[#F9F6F0] border border-[#E6D3C3] rounded-xl px-3 py-2 text-xs font-medium text-[#1A120E] focus:outline-none focus:border-[#8E4F2A]"
                        />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="WhatsApp / Phone Number *"
                          className="w-full bg-[#F9F6F0] border border-[#E6D3C3] rounded-xl px-3 py-2 text-xs font-medium text-[#1A120E] focus:outline-none focus:border-[#8E4F2A]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#8E4F2A] hover:bg-[#6D3B1E] disabled:opacity-60 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending BOQ...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Get Detailed BOQ PDF on WhatsApp ({plotArea} sq.ft)</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-1.5 text-[10px] text-[#4A4A46] justify-center pt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#8E4F2A] shrink-0" />
                        <span>100% Transparent pricing with zero hidden charges · Direct engineer review</span>
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

