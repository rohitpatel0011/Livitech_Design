"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  CheckCircle2,
  Sparkles,
  Layers,
  Ruler,
  Compass,
  FileCheck2,
} from "lucide-react";
import {
  HERO_VISUAL_SLIDES,
  CORE_SERVICES,
  BIHAR_CITIES,
} from "@/data/livitectData";

export default function HeroSection() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedService, setSelectedService] = useState(CORE_SERVICES[0].id);
  const [selectedCity, setSelectedCity] = useState(BIHAR_CITIES[0]);
  const [plotArea, setPlotArea] = useState("2000");

  // Auto-advance carousel every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_VISUAL_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlide]);

  const currentSlide = HERO_VISUAL_SLIDES[activeSlide];

  const handleBookingStart = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/services/${selectedService}`);
  };

  return (
    <section className="relative bg-[#1A120E] text-white border-b border-border overflow-hidden">
      {/* 1. CINEMA FULL-WIDTH & FULL-HEIGHT BACKGROUND CAROUSEL */}
      <div className="absolute inset-0 z-0">
        {HERO_VISUAL_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              idx === activeSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <Image
              src={slide.mainImage}
              alt={slide.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        {/* CUSTOM BESPOKE EARTHY ARCHITECTURAL GRADIENT OVERLAYS */}
        {/* Layer 1: Left-to-Right Heavy Obsidian & Espresso for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A120E] via-[#1A120E]/95 via-45% to-[#1A120E]/40 lg:to-transparent" />

        {/* Layer 2: Top-to-Bottom Subtle Blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A120E]/85 via-transparent via-60% to-[#1A120E]" />

        {/* Layer 3: Warm Architectural Bronze & Amber Ambient Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50 mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle at 75% 30%, rgba(168, 132, 98, 0.35) 0%, rgba(107, 74, 46, 0.2) 45%, transparent 70%)",
          }}
        />
      </div>

      {/* 2. MAIN HERO CONTENT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-20 flex flex-col justify-between min-h-[720px] lg:min-h-[820px]">
        {/* TOP SPLIT: Left Hero Text + Right Live Stage PIP Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT HERO TEXT COLUMN (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D5C4AE]/30 text-[#D5C4AE] text-xs font-bold tracking-wide uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#A88462] animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-[#A88462]" />
              <span>Plan · Design · Estimate · Supervise</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Build better.{" "}
              <span className="block mt-1 bg-gradient-to-r from-[#D5C4AE] via-[#A88462] to-[#FAF7F2] bg-clip-text text-transparent">
                Build with confidence.
              </span>
            </h1>

            {/* Sub-headline Paragraph */}
            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed max-w-2xl">
              From architectural 2D/3D design and BOQ cost estimation to modern
              exterior elevations, luxury interior design, and site consultation
              — Livitech Design (livitechdesign.in) helps you plan your building
              project with complete precision.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#cost-estimator"
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-brand text-white font-extrabold px-7 py-4 rounded-xl shadow-booking hover:shadow-booking-hover ring-1 ring-white/20 transition-all text-sm sm:text-base cursor-pointer"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-4 rounded-xl border border-white/25 backdrop-blur-md transition-all text-sm sm:text-base cursor-pointer"
              >
                <span>Explore Services</span>
              </Link>
            </div>

            {/* Quick Trust Highlights */}
            <div className="pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-semibold text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A88462] shrink-0" />
                <span>2D/3D Vastu Plans</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A88462] shrink-0" />
                <span>Transparent BOQ Cost</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A88462] shrink-0" />
                <span>Patna HQ & Site Support</span>
              </div>
            </div>
          </div>

          {/* RIGHT FLOATING INTERACTIVE STAGE CARD (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-[#D5C4AE]/30 bg-[#1A120E]/80 backdrop-blur-xl shadow-2xl p-6 sm:p-7 space-y-5">
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-full bg-brand text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                  {currentSlide.stageTag}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-neutral-200 text-xs font-medium backdrop-blur-sm border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-brand-light" />
                  <span>{currentSlide.location}</span>
                </span>
              </div>

              {/* Card Title & Working Specs */}
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                  {currentSlide.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                  {currentSlide.description}
                </p>
              </div>

              {/* Technical Blueprint Picture-in-Picture Box */}
              <div className="bg-black/40 rounded-2xl p-3.5 border border-white/10 flex items-center gap-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-white/20">
                  <Image
                    src={currentSlide.blueprintThumb}
                    alt="Technical Drawing Blueprint"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-bold text-[#D5C4AE]">
                    CAD
                  </div>
                </div>

                <div className="min-w-0 text-left">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-light block">
                    Live Engineering Spec
                  </span>
                  <p className="text-xs font-bold text-white mt-0.5 line-clamp-2">
                    {currentSlide.metrics}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-neutral-300">
                    <span className="flex items-center gap-1">
                      <Compass className="w-3 h-3 text-[#A88462]" /> 100% Vastu
                    </span>
                    <span className="flex items-center gap-1">
                      <FileCheck2 className="w-3 h-3 text-[#A88462]" /> Licensed DPR
                    </span>
                  </div>
                </div>
              </div>

              {/* Carousel Prev/Next & Slide Indicator */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {HERO_VISUAL_SLIDES.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setActiveSlide(dotIdx)}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        dotIdx === activeSlide
                          ? "w-8 bg-brand"
                          : "w-2 bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlide((prev) =>
                        prev === 0 ? HERO_VISUAL_SLIDES.length - 1 : prev - 1
                      )
                    }
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand text-white border border-white/15 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlide(
                        (prev) => (prev + 1) % HERO_VISUAL_SLIDES.length
                      )
                    }
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand text-white border border-white/15 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. DOCKED BOTTOM STAGE SWITCHER BAR (Stage 01 to Stage 04) */}
        <div className="mt-10 pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
            {HERO_VISUAL_SLIDES.map((slide, idx) => {
              const isActive = idx === activeSlide;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`p-3 rounded-2xl text-left transition-all border flex items-center gap-3 cursor-pointer ${
                    isActive
                      ? "bg-brand/40 border-brand shadow-booking ring-1 ring-brand/50 backdrop-blur-md"
                      : "bg-[#1A120E]/70 hover:bg-[#3A2418]/60 border-white/15 backdrop-blur-sm"
                  }`}
                >
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-white/20">
                    <Image
                      src={slide.mainImage}
                      alt={slide.title}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider block ${
                        isActive ? "text-[#D5C4AE]" : "text-neutral-400"
                      }`}
                    >
                      Stage 0{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-white block truncate mt-0.5">
                      {slide.title.replace("Multi-Storey ", "")}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. BOOKING.COM STYLE ACTION SEARCH BOX */}
        <div className="mt-8 bg-surface text-ink rounded-3xl border border-border shadow-2xl p-5 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand">
                Plan & Design Your Project with Confidence
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink mt-0.5">
                What are you looking for today?
              </h2>
            </div>
            <span className="text-xs text-ink-subtle">
              Instant cost estimate & architectural consultation in Bihar
            </span>
          </div>

          {/* Quick Service Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar">
            {CORE_SERVICES.map((srv) => {
              const active = selectedService === srv.id;
              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => setSelectedService(srv.id)}
                  className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    active
                      ? "bg-brand text-white border-brand shadow-sm"
                      : "bg-surface-muted text-ink hover:border-brand/40 border-border"
                  }`}
                >
                  <div className="relative w-5 h-5 rounded-md overflow-hidden shrink-0 border border-white/20">
                    <Image
                      src={srv.images[0]}
                      alt={srv.title}
                      fill
                      sizes="20px"
                      className="object-cover"
                    />
                  </div>
                  <span>{srv.title}</span>
                </button>
              );
            })}
          </div>

          {/* Filter Inputs Bar */}
          <form
            onSubmit={handleBookingStart}
            className="mt-3 grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t border-border"
          >
            {/* Input 1: Selected Service */}
            <div className="md:col-span-4 bg-surface-muted rounded-xl px-3.5 py-2.5 border border-border">
              <label
                htmlFor="hero-selected-service"
                className="text-[11px] font-bold uppercase text-ink-subtle flex items-center gap-1"
              >
                <Layers className="w-3.5 h-3.5 text-brand" />
                Selected Service
              </label>
              <select
                id="hero-selected-service"
                name="selectedService"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-ink focus:outline-none mt-1 cursor-pointer"
              >
                {CORE_SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.badge})
                  </option>
                ))}
              </select>
            </div>

            {/* Input 2: Project Location */}
            <div className="md:col-span-4 bg-surface-muted rounded-xl px-3.5 py-2.5 border border-border">
              <label
                htmlFor="hero-selected-city"
                className="text-[11px] font-bold uppercase text-ink-subtle flex items-center gap-1"
              >
                <MapPin className="w-3.5 h-3.5 text-brand" />
                Project City / Location
              </label>
              <select
                id="hero-selected-city"
                name="selectedCity"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-ink focus:outline-none mt-1 cursor-pointer"
              >
                {BIHAR_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Input 3: Plot / Built-up Area */}
            <div className="md:col-span-2 bg-surface-muted rounded-xl px-3.5 py-2.5 border border-border">
              <label
                htmlFor="hero-plot-area"
                className="text-[11px] font-bold uppercase text-ink-subtle flex items-center gap-1"
              >
                <Ruler className="w-3.5 h-3.5 text-brand" />
                Area (Sq.Ft)
              </label>
              <input
                id="hero-plot-area"
                name="plotArea"
                type="number"
                value={plotArea}
                onChange={(e) => setPlotArea(e.target.value)}
                placeholder="e.g. 2000"
                className="w-full bg-transparent text-sm font-bold text-ink focus:outline-none mt-1"
              />
            </div>

            {/* Submit CTA */}
            <div className="md:col-span-2 flex">
              <button
                type="submit"
                className="w-full bg-brand hover:bg-brand-dark text-white font-extrabold text-sm rounded-xl px-4 py-3 flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
