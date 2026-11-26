"use client";

import React, { useState, useId } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface PackageTier {
  id: string;
  name: string;
  minRate: number;
  maxRate: number;
  image: string;
  elevationTag: string;
  specs: [string, string, string]; // Top 3 decisive specs only
}

const PACKAGES: PackageTier[] = [
  {
    id: "essential",
    name: "Essential",
    minRate: 1550,
    maxRate: 1750,
    image:
      "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=800&q=80",
    elevationTag: "G+1 Clean Plaster & Steel",
    specs: [
      "Standard TMT Steel & PPC Cement",
      "Flush Doors & Aluminium Windows",
      "Vitrified Tiles & Emulsion Finish",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    minRate: 1950,
    maxRate: 2250,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    elevationTag: "G+1 Modern Glass Balcony",
    specs: [
      "Tata/Jindal Fe-550D TMT Steel",
      "Teak Finish Door & UPVC Windows",
      "Hindware/Parryware & Weather Paint",
    ],
  },
  {
    id: "advance",
    name: "Advance Luxury",
    minRate: 2600,
    maxRate: 3100,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    elevationTag: "G+2 Copper Louver Facade",
    specs: [
      "AAC Lightweight Block Structure",
      "Full Modular Kitchen Included",
      "Grohe Fittings & Profile Lighting",
    ],
  },
  {
    id: "bespoke",
    name: "Bespoke",
    minRate: 3300,
    maxRate: 4200,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    elevationTag: "Turnkey Italian Facade",
    specs: [
      "Italian Marble & Concealed HVAC",
      "Designer Wardrobes & Teak Joinery",
      "Full Home Automation & Solar Prep",
    ],
  },
];

const BIHAR_CITIES = [
  { id: "patna", label: "Patna (Kankarbagh, Bailey Rd, Danapur)" },
  { id: "bihta", label: "Bihta & Greater Patna" },
  { id: "muzaffarpur", label: "Muzaffarpur" },
  { id: "gaya", label: "Gaya" },
  { id: "bhagalpur", label: "Bhagalpur" },
  { id: "darbhanga", label: "Darbhanga" },
  { id: "other", label: "Other City (Bihar / JH / UP)" },
];

export default function CostEstimatorSection() {
  const [area, setArea] = useState<number>(2000);
  const [selectedPackage, setSelectedPackage] = useState<string>("standard");
  const [selectedCity, setSelectedCity] = useState<string>("patna");
  const [clientName, setClientName] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const citySelectId = useId();
  const areaInputId = useId();
  const nameInputId = useId();
  const whatsappInputId = useId();

  const currentPkg =
    PACKAGES.find((p) => p.id === selectedPackage) || PACKAGES[1];
  const currentCity =
    BIHAR_CITIES.find((c) => c.id === selectedCity) || BIHAR_CITIES[0];

  const safeArea = Math.max(500, Math.min(20000, area || 500));

  // Calculation in INR Lakhs
  const minCostLakhs = ((safeArea * currentPkg.minRate) / 100000).toFixed(2);
  const maxCostLakhs = ((safeArea * currentPkg.maxRate) / 100000).toFixed(2);
  const avgCostTotal =
    (safeArea * (currentPkg.minRate + currentPkg.maxRate)) / 2;

  // Structural stage distribution
  const stageBreakdown = [
    {
      label: "Civil RCC & Structure",
      pct: 40,
      cost: ((avgCostTotal * 0.4) / 100000).toFixed(1),
      colorClass: "bg-brand",
    },
    {
      label: "Finishing & Woodwork",
      pct: 30,
      cost: ((avgCostTotal * 0.3) / 100000).toFixed(1),
      colorClass: "bg-silver-blue-500",
    },
    {
      label: "MEP (Pipes & Wiring)",
      pct: 20,
      cost: ((avgCostTotal * 0.2) / 100000).toFixed(1),
      colorClass: "bg-navy-800",
    },
    {
      label: "Vastu & Site Supervision",
      pct: 10,
      cost: ((avgCostTotal * 0.1) / 100000).toFixed(1),
      colorClass: "bg-copper-600",
    },
  ];

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const msg = `Hi Livitech Design, I want the BOQ PDF for a ${safeArea} sq.ft house in ${currentCity.label} (${currentPkg.name} package: ₹${minCostLakhs}L - ₹${maxCostLakhs}L). Name: ${clientName}, WhatsApp: ${whatsapp}`;
    window.open(
      `https://wa.me/918709635920?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );

    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: clientName.trim(),
        phone: whatsapp.replace(/\D/g, ""),
        city: currentCity.label,
        plotArea: `${safeArea} sq.ft`,
        service: `${currentPkg.name} Construction Package`,
        estimatedBudget: `₹${minCostLakhs}L - ₹${maxCostLakhs}L`,
        source: "Live BOQ Cost Estimator",
      }),
    }).catch(() => {
      // WhatsApp dispatch already opened; ignore background logging errors
    });

    setIsSubmitting(false);
  };

  return (
    <section
      id="cost-estimator"
      className="scroll-mt-24 w-full py-16 lg:py-24 bg-surface border-b border-border text-ink"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Section Header (No Badges) */}
        <div className="mb-10 sm:mb-12 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink">
            Know Your Construction Cost{" "}
            <span className="text-brand">Before You Build</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-ink-muted leading-relaxed">
            Accurate turnkey cost projections based on current steel, cement,
            and skilled civil labor rates in Bihar.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT COLUMN: Controls & Packages (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Built-up Area Controls */}
            <div className="bg-surface-muted border border-border rounded-2xl p-5 sm:p-6 shadow-booking">
              <div className="flex justify-between items-center gap-4 mb-4">
                <label
                  htmlFor={areaInputId}
                  className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-ink-subtle"
                >
                  Step 1: Enter Built-up Area
                </label>
                <div className="flex items-baseline gap-1.5">
                  <input
                    id={areaInputId}
                    type="number"
                    min={500}
                    max={20000}
                    value={area || ""}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setArea(Number.isNaN(val) ? 0 : Math.min(20000, val));
                    }}
                    onBlur={() =>
                      setArea((prev) =>
                        Math.max(500, Math.min(20000, prev || 500))
                      )
                    }
                    className="w-24 text-right bg-surface border border-border rounded-xl px-3 py-1.5 text-base font-extrabold text-ink focus:outline-none focus:border-brand"
                  />
                  <span className="text-xs font-semibold text-ink-subtle">
                    sq.ft
                  </span>
                </div>
              </div>

              {/* Range Slider */}
              <input
                type="range"
                min={600}
                max={6000}
                step={100}
                value={Math.max(600, Math.min(6000, safeArea))}
                onChange={(e) => setArea(Number(e.target.value))}
                aria-label="Built-up Area in square feet"
                className="w-full accent-[#DA5F36] cursor-pointer h-2 bg-surface-subtle rounded-lg"
              />

              {/* Quick Preset Buttons */}
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1 no-scrollbar">
                {[1000, 1500, 2000, 3000, 4500].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setArea(preset)}
                    className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all shrink-0 cursor-pointer border ${
                      safeArea === preset
                        ? "bg-brand text-white border-brand shadow-xs"
                        : "bg-surface text-ink-muted hover:text-ink hover:border-brand/40 border-border"
                    }`}
                  >
                    {preset.toLocaleString("en-IN")} ft²
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: 4-Tier Interactive Package Selector */}
            <fieldset className="space-y-3 border-0 p-0 m-0">
              <legend className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-ink-subtle mb-3 block">
                Step 2: Choose Construction Package
              </legend>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
                {PACKAGES.map((pkg) => {
                  const isSelected = pkg.id === selectedPackage;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackage(pkg.id)}
                      aria-pressed={isSelected}
                      className={`text-left rounded-2xl border p-3.5 flex flex-col justify-between transition-all cursor-pointer group overflow-hidden ${
                        isSelected
                          ? "bg-brand-light/45 border-brand ring-1 ring-brand shadow-booking"
                          : "bg-surface-muted/70 border-border hover:border-brand/40 hover:bg-surface shadow-2xs"
                      }`}
                    >
                      {/* Image Preview Thumbnail */}
                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-surface-subtle">
                        <Image
                          src={pkg.image}
                          alt={pkg.name}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div>
                        <h4 className="text-sm font-extrabold text-ink">
                          {pkg.name}
                        </h4>
                        <p className="text-[11px] text-ink-subtle mt-0.5 line-clamp-1">
                          {pkg.elevationTag}
                        </p>
                        <div className="text-xs sm:text-sm text-brand font-extrabold mt-2">
                          ₹{pkg.minRate.toLocaleString("en-IN")}
                          <span className="text-[11px] text-ink-subtle font-medium">
                            /sq.ft
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Selected Package Scope Micro-List */}
            <div className="bg-surface-muted border border-border rounded-2xl p-5 sm:p-6 shadow-booking">
              <div className="flex justify-between items-center mb-3.5">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-ink-subtle">
                  Scope Included in {currentPkg.name}
                </span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-ink-muted font-medium">
                {currentPkg.specs.map((spec) => (
                  <li
                    key={spec}
                    className="flex items-start gap-2.5 bg-surface p-3.5 rounded-xl border border-border"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span className="leading-snug">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Ledger & Instant WhatsApp Dispatch (5 Cols) */}
          <div className="lg:col-span-5 bg-surface-muted border border-border rounded-2xl p-6 sm:p-7 lg:sticky lg:top-24 shadow-booking">
            {/* Header / City Dropdown */}
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-border">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-ink-subtle shrink-0">
                Live BOQ Summary
              </span>
              <div className="relative min-w-0">
                <label htmlFor={citySelectId} className="sr-only">
                  Select City
                </label>
                <select
                  id={citySelectId}
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="max-w-full bg-surface border border-border rounded-xl text-xs font-bold px-3 py-2 text-ink focus:outline-none focus:border-brand"
                >
                  {BIHAR_CITIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Projected Range Banner */}
            <div className="py-5">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-subtle block">
                Estimated Turnkey Budget
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mt-1">
                ₹{minCostLakhs} – ₹{maxCostLakhs}{" "}
                <span className="text-base font-semibold text-ink-subtle">
                  Lakhs
                </span>
              </div>
              <p className="text-xs text-ink-muted mt-1.5 font-medium">
                For {safeArea.toLocaleString("en-IN")} sq.ft at ₹
                {currentPkg.minRate.toLocaleString("en-IN")}–₹
                {currentPkg.maxRate.toLocaleString("en-IN")}/sq.ft
              </p>
            </div>

            {/* Visual Stage Breakdown Progress */}
            <div className="space-y-3.5 py-5 border-y border-border">
              <div className="flex justify-between items-center text-xs">
                <span className="text-ink-subtle font-extrabold uppercase tracking-wider">
                  Cost Distribution
                </span>
              </div>

              {/* Multi-segment Progress Bar */}
              <div className="h-2.5 w-full rounded-full bg-surface-subtle overflow-hidden flex">
                {stageBreakdown.map((item) => (
                  <div
                    key={item.label}
                    style={{ width: `${item.pct}%` }}
                    className={item.colorClass}
                    title={`${item.label}: ${item.pct}%`}
                  />
                ))}
              </div>

              {/* Itemized Values */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                {stageBreakdown.map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center gap-1.5 text-ink-muted bg-surface px-3 py-2 rounded-xl border border-border"
                  >
                    <span className="truncate font-medium">
                      {item.label} ({item.pct}%)
                    </span>
                    <span className="text-ink font-extrabold shrink-0">
                      ₹{item.cost}L
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp PDF Dispatch Form */}
            <form onSubmit={handleLeadSubmit} className="pt-5 space-y-3">
              <div>
                <label htmlFor={nameInputId} className="sr-only">
                  Full Name
                </label>
                <input
                  id={nameInputId}
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label htmlFor={whatsappInputId} className="sr-only">
                  WhatsApp Number
                </label>
                <input
                  id={whatsappInputId}
                  type="tel"
                  required
                  placeholder="WhatsApp Mobile Number *"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-brand"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand hover:bg-brand-hover active:scale-[0.99] text-white text-sm font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <span>Get Detailed BOQ on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-ink-subtle font-medium">
                Instant PDF Dispatch • Vetted by Senior Civil Engineers in Patna
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
