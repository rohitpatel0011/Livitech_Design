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
    <section id="blueprint-reality" className="scroll-mt-24 py-16 lg:py-24 bg-surface-muted border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
              From 2D Blueprint to On-Site Reality
            </h2>
            <p className="text-base sm:text-lg text-ink-muted mt-2 max-w-2xl leading-relaxed">
              Visual proof from design to execution — drag the interactive slider to compare our precision CAD blueprints and 3D architectural renders directly against real site construction in Bihar.
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
                <div className="absolute inset-0 bg-[#0D0F1B]/30 mix-blend-multiply" />

                {/* Subtle CAD Grid HUD lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                {/* Technical Blueprint Watermark HUD */}
                <div className="absolute bottom-12 left-4 text-[10px] font-mono text-cyan-300/80 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded border border-cyan-500/30">
                  CAD LAYER: IS 456 RCC VETTED • ZONE IV SEISMIC
                </div>
              </div>

              {/* Top Left Label (Before) */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md text-white text-xs font-mono font-bold border border-white/20 shadow-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  BEFORE: {currentProject.beforeLabel}
                </span>
              </div>

              {/* Top Right Label (After) */}
              <div className="absolute top-4 right-4 z-10 pointer-events-none">
                <span className="px-3 py-1.5 rounded-full bg-[#DA5F36] text-white text-xs font-mono font-bold shadow-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  AFTER: {currentProject.afterLabel}
                </span>
              </div>

              {/* VERTICAL DIVIDER LINE & DRAG HANDLE WITH LASER SCAN GLOW */}
              <div
                className="absolute top-0 bottom-0 z-20 w-[3px] bg-gradient-to-b from-[#DA5F36] via-white to-[#DA5F36] animate-scan-glow pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Center Circular Terracotta Drag Button */}
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#DA5F36] text-white border-2 border-white shadow-2xl flex items-center justify-center transition-transform hover:scale-110">
                  <MoveHorizontal className="w-5 h-5 drop-shadow" />
                </div>
              </div>

              {/* Bottom Quick Range Bar & Presets for Accessibility / Easy Tap */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 flex items-center gap-3 shadow-lg">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSliderPosition(20);
                  }}
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-colors ${
                    sliderPosition < 35 ? "bg-[#DA5F36] text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  2D CAD
                </button>
                <input
                  type="range"
                  min={5}
                  max={95}
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  aria-label="Comparison slider percentage"
                  className="w-20 sm:w-28 accent-[#DA5F36] cursor-pointer"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSliderPosition(80);
                  }}
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-colors ${
                    sliderPosition > 65 ? "bg-[#DA5F36] text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  3D Reality
                </button>
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
