"use client";

import React, { useState, useId, useRef } from "react";
import {
  BIHAR_CITIES,
  CONSTRUCTION_PACKAGES,
  ConstructionPackage,
} from "@/data/livitectData";
import {
  Calculator,
  ShieldCheck,
  Building,
  Check,
  CheckCircle2,
  FileSpreadsheet,
  PhoneCall,
  Clock,
  Sparkles,
  X,
  ArrowRight,
  Info,
  Layers,
  Zap,
} from "lucide-react";

export default function CostEstimatorSection() {
  const [selectedCity, setSelectedCity] = useState(BIHAR_CITIES[0]);
  const [builtUpArea, setBuiltUpArea] = useState<number>(1800);
  const [floors, setFloors] = useState<number>(2); // G+1 = 2 floors
  const [selectedPackageId, setSelectedPackageId] =
    useState<string>("basic-finishing");
  const [activeModalPackage, setActiveModalPackage] =
    useState<ConstructionPackage | null>(null);

  const calculatorRef = useRef<HTMLDivElement>(null);

  // Accessible IDs
  const areaRangeId = useId();
  const areaNumberId = useId();

  const pkgObj =
    CONSTRUCTION_PACKAGES.find((p) => p.id === selectedPackageId) ||
    CONSTRUCTION_PACKAGES[1];

  // Calculations
  const totalFloorArea = builtUpArea;
  const estimatedTotalCost = totalFloorArea * pkgObj.ratePerSqFt;

  // Breakdown
  const rccStructureCost = Math.round(estimatedTotalCost * 0.54);
  const finishingCost = Math.round(estimatedTotalCost * 0.26);
  const mepCost = Math.round(estimatedTotalCost * 0.15);
  const architecturalBoqCost = Math.round(estimatedTotalCost * 0.05);

  const formatLakhs = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  };

  const handleSelectPackageForCalc = (pkgId: string) => {
    setSelectedPackageId(pkgId);
    if (activeModalPackage) {
      setActiveModalPackage(null);
    }
    calculatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const areaPills = [1000, 1500, 2000, 2500, 3500];

  return (
    <section
      id="cost-estimator"
      className="py-16 lg:py-24 bg-surface-muted border-b border-border relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light text-brand text-xs font-extrabold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Home Construction Cost Per Sqft
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
            Transparent Construction Packages & BOQ Calculator
          </h2>
          <p className="text-base sm:text-lg text-ink-muted mt-3">
            Average residential construction costs start from{" "}
            <strong className="text-ink font-bold">₹1,250 to ₹4,000+ per sqft</strong>{" "}
            depending on the quality of finishes. Choose your package or customize
            your plot dimensions in our live cost engine below.
          </p>
        </div>

        {/* 4 Packages Comparison Showcase */}
        <div className="mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {CONSTRUCTION_PACKAGES.map((pkg) => {
              const isSelected = selectedPackageId === pkg.id;
              return (
                <div
                  key={pkg.id}
                  className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all relative ${
                    pkg.popular
                      ? "bg-surface border-2 border-brand shadow-booking ring-2 ring-brand/20"
                      : "bg-surface border border-border shadow-sm hover:border-brand/40"
                  }`}
                >
                  {/* Badge */}
                  {pkg.popular ? (
                    <div className="absolute -top-3 left-6 inline-flex items-center gap-1 bg-brand text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                      <Sparkles className="w-3 h-3" />
                      Best-Seller Package
                    </div>
                  ) : pkg.id === "premium-finishing" ? (
                    <div className="absolute -top-3 left-6 inline-flex items-center gap-1 bg-ink text-brand-light text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider border border-border shadow-sm">
                      <Zap className="w-3 h-3 text-brand-accent" />
                      Ultra Luxury
                    </div>
                  ) : null}

                  {/* Top Details */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-extrabold text-ink">
                        {pkg.name}
                      </h3>
                      <span className="text-xs font-semibold text-ink-subtle">
                        {pkg.timelineMonths} Mos
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="text-2xl sm:text-3xl font-black text-brand tracking-tight">
                        {pkg.priceRange}
                      </div>
                      <span className="text-[11px] text-ink-subtle font-medium">
                        Standard rate: ₹{pkg.ratePerSqFt} / sq.ft
                      </span>
                    </div>

                    <p className="text-xs text-ink-muted leading-relaxed min-h-[48px] mb-5 border-b border-border pb-4">
                      {pkg.tagline}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2.5 mb-6">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-ink block">
                        Included Features:
                      </span>
                      {pkg.highlights.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2 text-xs text-ink-muted"
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-border space-y-2">
                    <button
                      type="button"
                      onClick={() => handleSelectPackageForCalc(pkg.id)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isSelected
                          ? "bg-brand text-white shadow-sm"
                          : "bg-surface-muted hover:bg-brand-light/60 text-ink border border-border"
                      }`}
                    >
                      <span>
                        {isSelected ? "Selected in Calculator" : "Select & Calculate"}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveModalPackage(pkg)}
                      className="w-full py-2 text-xs font-bold text-brand hover:text-brand-dark transition-colors inline-flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Learn More (Full Specs)</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Live Estimator Box */}
        <div
          ref={calculatorRef}
          className="bg-surface rounded-3xl border border-border shadow-booking p-6 sm:p-10 scroll-mt-24"
        >
          <div className="mb-6 pb-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand">
                Interactive Engineering Engine
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-ink">
                Live Cost Estimation: {pkgObj.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <Clock className="w-4 h-4 text-brand" />
              <span>Project Schedule: ~{pkgObj.timelineMonths} Months</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Inputs (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Location Selection */}
              <div>
                <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
                  1. Project Location (Bihar / Region)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {BIHAR_CITIES.slice(0, 6).map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setSelectedCity(city)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-left truncate transition-all cursor-pointer ${
                        selectedCity === city
                          ? "bg-brand text-white border-brand shadow-sm font-semibold"
                          : "bg-surface text-ink-muted border-border hover:bg-surface-muted"
                      }`}
                    >
                      <span>{city.split("(")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Total Built-Up Area */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor={areaNumberId}
                    className="block text-xs font-bold text-ink uppercase tracking-wider"
                  >
                    2. Total Built-up Area
                  </label>
                  <span className="text-sm font-extrabold text-brand bg-brand-light px-2.5 py-0.5 rounded-md">
                    {builtUpArea.toLocaleString()} sq.ft
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <input
                    id={areaRangeId}
                    aria-label="Total Built-up Area range"
                    type="range"
                    min="600"
                    max="8000"
                    step="50"
                    value={builtUpArea}
                    onChange={(e) => setBuiltUpArea(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand"
                  />
                  <input
                    id={areaNumberId}
                    type="number"
                    min="500"
                    max="20000"
                    value={builtUpArea}
                    onChange={(e) => setBuiltUpArea(Number(e.target.value))}
                    className="w-24 h-10 px-2 rounded-lg border border-border bg-surface text-ink text-sm font-bold text-center focus:outline-none focus:border-brand"
                  />
                </div>

                {/* Quick Area Pills */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] text-ink-subtle">Quick select:</span>
                  {areaPills.map((pill) => (
                    <button
                      key={pill}
                      type="button"
                      onClick={() => setBuiltUpArea(pill)}
                      className={`text-[11px] px-2 py-0.5 rounded-md border cursor-pointer ${
                        builtUpArea === pill
                          ? "bg-brand-light text-brand border-brand/40 font-bold"
                          : "text-ink-subtle border-border hover:bg-surface-muted"
                      }`}
                    >
                      {pill} sq.ft
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Floors Configuration */}
              <div>
                <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
                  3. Number of Floors
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { count: 1, label: "Ground (G)" },
                    { count: 2, label: "G + 1 (2 Floors)" },
                    { count: 3, label: "G + 2 (3 Floors)" },
                    { count: 4, label: "G + 3 (4 Floors)" },
                  ].map((f) => (
                    <button
                      key={f.count}
                      type="button"
                      onClick={() => setFloors(f.count)}
                      className={`p-2.5 rounded-xl text-xs text-center border transition-all cursor-pointer ${
                        floors === f.count
                          ? "bg-brand-light text-brand border-brand/50 font-bold ring-1 ring-brand/50"
                          : "bg-surface text-ink-muted border-border hover:bg-surface-muted"
                      }`}
                    >
                      <Building className="w-4 h-4 mx-auto mb-1 text-brand" />
                      <span>{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Package Selection Tabs (All 4 Packages) */}
              <div>
                <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
                  4. Selected Construction Material Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CONSTRUCTION_PACKAGES.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`text-left p-3.5 rounded-xl border relative transition-all cursor-pointer ${
                          isSelected
                            ? "bg-brand-light/30 border-brand ring-2 ring-brand text-ink"
                            : "bg-surface border-border hover:border-neutral-300 text-ink-muted"
                        }`}
                      >
                        {pkg.popular && (
                          <span className="absolute -top-2.5 right-3 bg-brand text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Best-Seller
                          </span>
                        )}
                        <div className="text-sm font-bold text-ink">
                          {pkg.name}
                        </div>
                        <div className="text-base font-black text-brand mt-0.5">
                          {pkg.priceRange}
                        </div>
                        <p className="text-[11px] text-ink-muted mt-1 leading-snug line-clamp-1">
                          {pkg.tagline}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Package Specs Summary Box */}
              <div className="p-4 rounded-2xl bg-surface-muted border border-border space-y-2.5 text-xs">
                <div className="font-bold text-ink flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-brand" />
                    Key Specifications ({pkgObj.name}):
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveModalPackage(pkgObj)}
                    className="text-brand hover:underline font-bold text-[11px] cursor-pointer"
                  >
                    View All Specs →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-ink-muted text-[11px]">
                  <div>
                    <strong className="text-ink">Steel:</strong> {pkgObj.structure.steel}
                  </div>
                  <div>
                    <strong className="text-ink">Cement:</strong> {pkgObj.structure.cement}
                  </div>
                  <div>
                    <strong className="text-ink">Doors:</strong> {pkgObj.finishing.doors}
                  </div>
                  <div>
                    <strong className="text-ink">Finishes:</strong> {pkgObj.finishing.paint}
                  </div>
                  <div>
                    <strong className="text-ink">Kitchen & Bath:</strong>{" "}
                    {pkgObj.finishing.kitchenBath}
                  </div>
                  <div>
                    <strong className="text-ink">Masonry:</strong>{" "}
                    {pkgObj.structure.masonry}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Cost Summary Card (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-surface rounded-2xl border-2 border-brand/20 p-6 sm:p-7 shadow-booking">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand block">
                      Livitech Design Guaranteed BOQ
                    </span>
                    <h3 className="text-lg font-extrabold text-ink">
                      Estimated Project Cost
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-brand">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>

                {/* Big Number */}
                <div className="py-6 text-center bg-surface-muted/60 rounded-2xl my-4 border border-border/60">
                  <span className="text-xs text-ink-subtle uppercase tracking-wider block font-semibold mb-1">
                    Total Estimated Project Budget ({selectedCity.split("(")[0].trim()})
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-brand tracking-tight">
                    {formatLakhs(estimatedTotalCost)}
                  </div>
                  <div className="text-xs text-ink-subtle mt-1.5 font-medium">
                    Package: {pkgObj.name} ({pkgObj.priceRange}) · {builtUpArea} sq.ft · G+
                    {floors - 1}
                  </div>
                </div>

                {/* Itemized Cost Breakdown Progress Bars */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-ink uppercase tracking-wider">
                    Itemized Cost Distribution:
                  </div>

                  {/* RCC Structure */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-ink">RCC Civil Structure (54%)</span>
                      <span className="text-brand font-bold">
                        {formatLakhs(rccStructureCost)}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-brand h-full rounded-full"
                        style={{ width: "54%" }}
                      />
                    </div>
                  </div>

                  {/* Finishing */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-ink">Finishing, Doors & Tiles (26%)</span>
                      <span className="text-brand font-bold">
                        {formatLakhs(finishingCost)}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-brand-accent h-full rounded-full"
                        style={{ width: "26%" }}
                      />
                    </div>
                  </div>

                  {/* MEP */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-ink">Electrical & Plumbing MEP (15%)</span>
                      <span className="text-brand font-bold">{formatLakhs(mepCost)}</span>
                    </div>
                    <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-ink-muted h-full rounded-full"
                        style={{ width: "15%" }}
                      />
                    </div>
                  </div>

                  {/* Architecture & BOQ */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-ink">Architectural 2D/3D & Approvals (5%)</span>
                      <span className="text-brand font-bold">
                        {formatLakhs(architecturalBoqCost)}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-brand-light h-full rounded-full"
                        style={{ width: "5%" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Guarantees checklist */}
                <div className="mt-6 pt-4 border-t border-border space-y-1.5 text-xs text-ink-muted">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Price Freeze Guarantee — No mid-construction escalation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Brand Authenticity Test Certificates with every pour</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-6 mt-4 border-t border-border">
                <a
                  href={`https://wa.me/919876543210?text=Hello%20Livitech%20Design%20(livitechdesign.in),%20I%20used%20your%20cost%20calculator%20for%20my%20${builtUpArea}%20sq.ft%20project%20in%20${selectedCity}%20with%20the%20${encodeURIComponent(
                    pkgObj.name
                  )}%20(${encodeURIComponent(
                    pkgObj.priceRange
                  )}).%20Estimated%20cost:%20${formatLakhs(
                    estimatedTotalCost
                  )}.%20Please%20share%20the%20detailed%20itemized%20BOQ.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-booking hover:shadow-booking-hover transition-all cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Get Complete Itemized BOQ on WhatsApp</span>
                </a>

                <a
                  href="tel:+919876543210"
                  className="w-full inline-flex items-center justify-center gap-2 bg-surface hover:bg-surface-muted text-ink font-semibold text-xs py-2.5 px-4 rounded-xl border border-border transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-brand" />
                  <span>Talk with Senior Civil Engineer</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal: Learn More - Full Package Specifications */}
        {activeModalPackage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="package-modal-title"
          >
            <div className="bg-surface rounded-3xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalPackage(null)}
                aria-label="Close specifications modal"
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-muted hover:bg-border text-ink flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="pr-10 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light text-brand text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Detailed Package Specifications
                </div>
                <h3
                  id="package-modal-title"
                  className="text-2xl sm:text-3xl font-extrabold text-ink"
                >
                  {activeModalPackage.name}
                </h3>
                <div className="text-xl font-black text-brand mt-1">
                  {activeModalPackage.priceRange}
                </div>
                <p className="text-xs sm:text-sm text-ink-muted mt-2">
                  {activeModalPackage.tagline}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="space-y-4 text-xs sm:text-sm">
                {/* Structural Section */}
                <div className="bg-surface-muted p-4 rounded-2xl border border-border space-y-2">
                  <h4 className="font-extrabold text-ink flex items-center gap-2">
                    <Building className="w-4 h-4 text-brand" />
                    Structure & Masonry
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-muted">
                    <div>
                      <strong className="text-ink">Steel:</strong>{" "}
                      {activeModalPackage.structure.steel}
                    </div>
                    <div>
                      <strong className="text-ink">Cement:</strong>{" "}
                      {activeModalPackage.structure.cement}
                    </div>
                    <div>
                      <strong className="text-ink">Aggregate:</strong>{" "}
                      {activeModalPackage.structure.aggregate}
                    </div>
                    <div>
                      <strong className="text-ink">Sand:</strong>{" "}
                      {activeModalPackage.structure.sand}
                    </div>
                    <div className="sm:col-span-2">
                      <strong className="text-ink">Bricks/Blocks:</strong>{" "}
                      {activeModalPackage.structure.masonry}
                    </div>
                  </div>
                </div>

                {/* Finishing Section */}
                <div className="bg-surface-muted p-4 rounded-2xl border border-border space-y-2">
                  <h4 className="font-extrabold text-ink flex items-center gap-2">
                    <Layers className="w-4 h-4 text-brand" />
                    Finishing, Doors & Windows
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-muted">
                    <div>
                      <strong className="text-ink">Doors:</strong>{" "}
                      {activeModalPackage.finishing.doors}
                    </div>
                    <div>
                      <strong className="text-ink">Windows:</strong>{" "}
                      {activeModalPackage.finishing.windows}
                    </div>
                    <div>
                      <strong className="text-ink">Flooring:</strong>{" "}
                      {activeModalPackage.finishing.flooring}
                    </div>
                    <div>
                      <strong className="text-ink">Paint Finish:</strong>{" "}
                      {activeModalPackage.finishing.paint}
                    </div>
                    <div className="sm:col-span-2">
                      <strong className="text-ink">Kitchen & Bath:</strong>{" "}
                      {activeModalPackage.finishing.kitchenBath}
                    </div>
                  </div>
                </div>

                {/* MEP & Special Features */}
                <div className="bg-surface-muted p-4 rounded-2xl border border-border space-y-2">
                  <h4 className="font-extrabold text-ink flex items-center gap-2">
                    <Zap className="w-4 h-4 text-brand" />
                    MEP & Modern Additions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-muted">
                    <div>
                      <strong className="text-ink">Wiring:</strong>{" "}
                      {activeModalPackage.mep.wiring}
                    </div>
                    <div>
                      <strong className="text-ink">Plumbing:</strong>{" "}
                      {activeModalPackage.mep.plumbing}
                    </div>
                    <div>
                      <strong className="text-ink">Switches:</strong>{" "}
                      {activeModalPackage.mep.switches}
                    </div>
                    <div>
                      <strong className="text-ink">Est. Duration:</strong> ~
                      {activeModalPackage.timelineMonths} Months
                    </div>
                  </div>

                  {activeModalPackage.finishing.specialFeatures && (
                    <div className="mt-2 pt-2 border-t border-border">
                      <strong className="text-ink text-xs block mb-1">
                        Lifestyle & Premium Additions:
                      </strong>
                      <div className="flex flex-wrap gap-1.5">
                        {activeModalPackage.finishing.specialFeatures.map(
                          (spec, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded-md bg-brand-light/60 text-brand text-[11px] font-bold"
                            >
                              ✓ {spec}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-6 pt-5 border-t border-border flex flex-col sm:flex-row items-center justify-end gap-3">
                <a
                  href={`https://wa.me/919876543210?text=Hello%20Livitech%20Design,%20I%20want%20complete%20material%20spec%20sheet%20for%20the%20${encodeURIComponent(
                    activeModalPackage.name
                  )}%20(${encodeURIComponent(
                    activeModalPackage.priceRange
                  )}).%20Please%20share.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border text-ink hover:bg-surface-muted text-xs font-bold transition-colors cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-brand" />
                  <span>Download Spec Sheet</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleSelectPackageForCalc(activeModalPackage.id)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white text-xs font-bold py-2.5 px-6 rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  <span>Calculate with this Package</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
