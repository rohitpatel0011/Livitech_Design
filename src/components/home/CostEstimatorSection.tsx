"use client";

import React, { useState, useId } from "react";
import {
  BIHAR_CITIES,
  CONSTRUCTION_PACKAGES,
} from "@/data/livitectData";
import {
  Calculator,
  ShieldCheck,
  Building,
  Check,
  FileSpreadsheet,
  PhoneCall,
  Clock,
} from "lucide-react";

export default function CostEstimatorSection() {
  const [selectedCity, setSelectedCity] = useState(BIHAR_CITIES[0]);
  const [builtUpArea, setBuiltUpArea] = useState<number>(1800);
  const [floors, setFloors] = useState<number>(2); // G+1 = 2 floors
  const [selectedPackageId, setSelectedPackageId] = useState<string>("premium");

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

  const areaPills = [1000, 1500, 2000, 2500, 3500];

  return (
    <section
      id="cost-estimator"
      className="py-16 lg:py-24 bg-surface-muted border-b border-border relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light text-brand text-xs font-extrabold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            2026 Transparent BOQ Cost Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Calculate Your Construction Cost in Bihar.
          </h2>
          <p className="text-base text-ink-muted mt-2">
            No hidden costs. Instant itemized pricing calibrated for Patna and
            regional Bihar rates with verified Tata Tiscon & UltraTech material grades.
          </p>
        </div>

        {/* Main Estimator Box */}
        <div className="bg-surface rounded-3xl border border-border shadow-booking p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Inputs (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Location Selection */}
              <div>
                <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
                  1. Project Location
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

              {/* 4. Package Selection Tabs */}
              <div>
                <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
                  4. Construction Material Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {CONSTRUCTION_PACKAGES.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`text-left p-3.5 rounded-xl border relative transition-all cursor-pointer ${
                          isSelected
                            ? "bg-brand/5 border-brand ring-2 ring-brand text-ink"
                            : "bg-surface border-border hover:border-neutral-300 text-ink-muted"
                        }`}
                      >
                        {pkg.popular && (
                          <span className="absolute -top-2.5 right-3 bg-brand text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Most Chosen
                          </span>
                        )}
                        <div className="text-sm font-bold text-ink">{pkg.name}</div>
                        <div className="text-lg font-black text-brand mt-1">
                          ₹{pkg.ratePerSqFt}
                          <span className="text-[10px] font-normal text-ink-subtle">
                            /sq.ft
                          </span>
                        </div>
                        <p className="text-[11px] text-ink-muted mt-1 leading-snug">
                          {pkg.tagline}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Package Specs Summary Box */}
              <div className="p-4 rounded-xl bg-surface-muted border border-border space-y-2 text-xs">
                <div className="font-bold text-ink flex items-center justify-between">
                  <span>Selected Package Specs ({pkgObj.name}):</span>
                  <span className="text-brand flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    Est. Duration: {pkgObj.timelineMonths} Months
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-ink-muted text-[11px]">
                  <div>
                    <strong className="text-ink">Steel:</strong> {pkgObj.structure.steel}
                  </div>
                  <div>
                    <strong className="text-ink">Cement:</strong> {pkgObj.structure.cement}
                  </div>
                  <div>
                    <strong className="text-ink">Flooring:</strong> {pkgObj.finishing.flooring}
                  </div>
                  <div>
                    <strong className="text-ink">Electrical:</strong> {pkgObj.mep.wiring}
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
                <div className="py-6 text-center bg-surface-muted/60 rounded-xl my-4 border border-border/60">
                  <span className="text-xs text-ink-subtle uppercase tracking-wider block font-semibold mb-1">
                    Total Estimated Project Budget ({selectedCity.split("(")[0].trim()})
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-brand tracking-tight">
                    {formatLakhs(estimatedTotalCost)}
                  </div>
                  <div className="text-xs text-ink-subtle mt-1.5 font-medium">
                    Rate: ₹{pkgObj.ratePerSqFt} / sq.ft · {builtUpArea} sq.ft · G+{floors - 1}
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
                      <div className="bg-brand h-full rounded-full" style={{ width: "54%" }} />
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
                      <div className="bg-amber-600 h-full rounded-full" style={{ width: "26%" }} />
                    </div>
                  </div>

                  {/* MEP */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-ink">Electrical & Plumbing MEP (15%)</span>
                      <span className="text-brand font-bold">{formatLakhs(mepCost)}</span>
                    </div>
                    <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-neutral-600 h-full rounded-full" style={{ width: "15%" }} />
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
                      <div className="bg-neutral-400 h-full rounded-full" style={{ width: "5%" }} />
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
                  href={`https://wa.me/919876543210?text=Hello%20Livitech%20Design%20(livitechdesign.in),%20I%20used%20your%20cost%20calculator%20for%20my%20${builtUpArea}%20sq.ft%20project%20in%20${selectedCity}.%20Estimated%20cost:%20${formatLakhs(
                    estimatedTotalCost
                  )}.%20Please%20share%20the%20detailed%20BOQ.`}
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
                  <span>Talk with Patna Senior Civil Engineer</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
