"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MoveHorizontal,
  MapPin,
  Ruler,
  IndianRupee,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BLUEPRINT_COMPARISONS } from "@/data/livitectData";

export default function BlueprintRealitySlider() {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100%
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentProject = BLUEPRINT_COMPARISONS[activeTab];

  // Calculate percentage position from mouse or touch X coordinate
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handlePointerDown = () => {
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handleDirectClick = (e: React.MouseEvent<HTMLDivElement>) => {
    updatePosition(e.clientX);
  };

  const selectProject = (index: number) => {
    setActiveTab(index);
    setSliderPosition(50); // Reset slider to center when switching project
  };

  return (
    <section id="blueprint-reality" className="py-16 lg:py-24 bg-surface-muted border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Visual Proof · Design To Execution</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-ink mt-2.5">
              From 2D Blueprint to On-Site Reality
            </h2>
            <p className="text-sm sm:text-base text-ink-muted mt-1.5 max-w-2xl">
              Slider ko left-right drag karke dekhein ki Livitech Design (livitechdesign.in) ka banaya hua
              CAD naksha aur 3D design asaliyat mein site par kaise बनकर taiyar
              hota hai.
            </p>
          </div>

          {/* Project Category Switcher Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {BLUEPRINT_COMPARISONS.map((item, idx) => {
              const active = idx === activeTab;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectProject(idx)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 border transition-all cursor-pointer ${
                    active
                      ? "bg-brand text-white border-brand shadow-sm"
                      : "bg-surface text-ink hover:border-brand/40 border-border"
                  }`}
                >
                  {item.category}
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN INTERACTIVE COMPARISON CARD */}
        <div className="bg-surface rounded-2xl border border-border shadow-booking overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT / TOP: Interactive Before-After Viewport (8 Cols) */}
          <div className="lg:col-span-8 relative select-none bg-ink">
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onPointerMove={handlePointerMove}
              onClick={handleDirectClick}
              className="relative aspect-[16/10] w-full overflow-hidden cursor-ew-resize touch-pan-y"
            >
              {/* LAYER 1 (Base): AFTER IMAGE (Completed 3D / Finished Construction) */}
              <Image
                src={currentProject.afterImage}
                alt={currentProject.afterLabel}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover pointer-events-none"
              />

              {/* LAYER 2 (Clipped Overlay): BEFORE IMAGE (2D CAD Blueprint / Raw Site) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{
                  clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                }}
              >
                <Image
                  src={currentProject.beforeImage}
                  alt={currentProject.beforeLabel}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
                {/* Blueprint Grid Tint Overlay for Technical Feel */}
                <div className="absolute inset-0 bg-ink/20 mix-blend-multiply" />
              </div>

              {/* Top Left Label (Before) */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="px-3 py-1.5 rounded-lg bg-ink/85 backdrop-blur-md text-white text-xs font-bold border border-white/15 shadow">
                  BEFORE: {currentProject.beforeLabel}
                </span>
              </div>

              {/* Top Right Label (After) */}
              <div className="absolute top-4 right-4 z-10 pointer-events-none">
                <span className="px-3 py-1.5 rounded-lg bg-brand text-white text-xs font-bold shadow">
                  AFTER: {currentProject.afterLabel}
                </span>
              </div>

              {/* VERTICAL DIVIDER LINE & DRAG HANDLE */}
              <div
                className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Center Circular Terracotta Drag Button */}
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-brand text-white border-2 border-white shadow-lg flex items-center justify-center">
                  <MoveHorizontal className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom Quick Range Bar for Accessibility / Easy Tap */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-black/65 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 flex items-center gap-3">
                <span className="text-[11px] font-semibold text-white whitespace-nowrap">
                  Slide to Compare ({Math.round(sliderPosition)}%)
                </span>
                <input
                  type="range"
                  min={5}
                  max={95}
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  aria-label="Comparison slider percentage"
                  className="w-24 sm:w-32 accent-brand cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Project Working Specs & Conversion CTA (4 Cols) */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-surface">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-brand-light text-brand text-xs font-extrabold uppercase">
                  {currentProject.category}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      selectProject(
                        activeTab === 0
                          ? BLUEPRINT_COMPARISONS.length - 1
                          : activeTab - 1
                      )
                    }
                    className="p-1.5 rounded-lg border border-border hover:bg-surface-muted text-ink cursor-pointer"
                    aria-label="Previous comparison"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      selectProject(
                        (activeTab + 1) % BLUEPRINT_COMPARISONS.length
                      )
                    }
                    className="p-1.5 rounded-lg border border-border hover:bg-surface-muted text-ink cursor-pointer"
                    aria-label="Next comparison"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-ink">
                  {currentProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-subtle flex items-center gap-1.5 mt-1 font-medium">
                  <MapPin className="w-4 h-4 text-brand shrink-0" />
                  {currentProject.location}
                </p>
              </div>

              {/* 3 Key Project Metrics Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-border">
                <div className="bg-surface-muted p-2.5 rounded-xl border border-border">
                  <span className="text-[10px] font-bold uppercase text-ink-subtle flex items-center gap-1">
                    <Ruler className="w-3 h-3 text-brand" /> Area
                  </span>
                  <p className="text-xs sm:text-sm font-extrabold text-ink mt-0.5">
                    {currentProject.areaSqFt}
                  </p>
                </div>

                <div className="bg-surface-muted p-2.5 rounded-xl border border-border">
                  <span className="text-[10px] font-bold uppercase text-ink-subtle flex items-center gap-1">
                    <IndianRupee className="w-3 h-3 text-brand" /> Budget
                  </span>
                  <p className="text-xs sm:text-sm font-extrabold text-ink mt-0.5 truncate">
                    {currentProject.costEstimate.split(" ")[0]}{" "}
                    {currentProject.costEstimate.split(" ")[1]}
                  </p>
                </div>

                <div className="bg-surface-muted p-2.5 rounded-xl border border-border">
                  <span className="text-[10px] font-bold uppercase text-ink-subtle flex items-center gap-1">
                    <Clock className="w-3 h-3 text-brand" /> Timeline
                  </span>
                  <p className="text-xs sm:text-sm font-extrabold text-ink mt-0.5">
                    {currentProject.duration}
                  </p>
                </div>
              </div>

              {/* Execution Highlights */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-ink-subtle block">
                  How Livitech Design Executed This:
                </span>
                {currentProject.highlights.map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-ink-muted font-medium leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="pt-6 mt-6 border-t border-border space-y-2.5">
              <Link
                href="#cost-estimator"
                className="w-full bg-brand hover:bg-brand-dark text-white font-bold text-sm py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Estimate Similar Project Cost</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[11px] text-center text-ink-subtle">
                Get 2D Plan + 3D Elevation + BOQ before starting site work
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
