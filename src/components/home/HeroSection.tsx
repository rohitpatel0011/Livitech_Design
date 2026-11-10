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
  Layers,
  Ruler,
  Home,
  Building2,
  Wrench,
  Paintbrush,
  DraftingCompass,
  HardHat,
} from "lucide-react";
import {
  HERO_VISUAL_SLIDES,
  CORE_SERVICES,
  BIHAR_CITIES,
} from "@/data/livitectData";

function renderServiceIcon(id: string, active: boolean) {
  const iconClass = `w-4 h-4 transition-colors ${
    active ? "text-white" : "text-[#8E4F2A] group-hover:text-[#6D3B1E]"
  }`;
  switch (id) {
    case "residential-construction":
      return <Home className={iconClass} strokeWidth={2.2} aria-hidden="true" />;
    case "commercial-construction":
      return <Building2 className={iconClass} strokeWidth={2.2} aria-hidden="true" />;
    case "maintenance-service":
      return <Wrench className={iconClass} strokeWidth={2.2} aria-hidden="true" />;
    case "interior-design":
      return <Paintbrush className={iconClass} strokeWidth={2.2} aria-hidden="true" />;
    case "architectural-services":
      return <DraftingCompass className={iconClass} strokeWidth={2.2} aria-hidden="true" />;
    case "contractor-services":
      return <HardHat className={iconClass} strokeWidth={2.2} aria-hidden="true" />;
    default:
      return <Layers className={iconClass} strokeWidth={2.2} aria-hidden="true" />;
  }
}

export default function HeroSection() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedService, setSelectedService] = useState(CORE_SERVICES[0].id);
  const [selectedCity, setSelectedCity] = useState(BIHAR_CITIES[0]);
  const [plotArea, setPlotArea] = useState("2000");

  // Auto-advance hero visual carousel every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_VISUAL_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = HERO_VISUAL_SLIDES[activeSlide];

  const handleBookingStart = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCity) params.set("city", selectedCity);
    if (plotArea) params.set("area", plotArea);
    const queryString = params.toString();
    router.push(`/services/${selectedService}${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <section
      id="hero-section"
      className="relative bg-ink pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-border overflow-hidden min-h-screen flex flex-col justify-between"
    >
      {/* FULL-WIDTH & FULL-HEIGHT DYNAMIC BACKGROUND IMAGES IN FLIP POSITION (-scale-x-100) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {HERO_VISUAL_SLIDES.map((slide, idx) => {
          const isActive = idx === activeSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                isActive ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <Image
                src={slide.mainImage}
                alt={slide.title}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center -scale-x-100"
              />
            </div>
          );
        })}

        {/* Softened Translucent Gradient Overlays so the Background Photo is clearly visible, bright, and vibrant */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/40 to-ink/15 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20 z-10" />
      </div>

      {/* Main Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        {/* TOP SPLIT: Left Copy + Right Interactive Visual Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT COLUMN (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] drop-shadow-md">
              Build better.{" "}
              <span className="text-brand-accent block mt-1">
                Build with confidence.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/95 leading-relaxed max-w-xl font-medium drop-shadow-sm">
              From architectural 2D/3D design and BOQ cost estimation to modern exterior
              elevations, luxury interior design, and site consultation — Livitech Design (livitechdesign.in)
              helps you plan your building project with complete precision.
            </p>

            {/* Primary Hero Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                href="#cost-estimator"
                className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-extrabold px-7 py-3.5 rounded-xl shadow-booking hover:shadow-booking-hover transition-all text-sm sm:text-base cursor-pointer"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold px-7 py-3.5 rounded-xl border border-white/30 backdrop-blur-md transition-all text-sm sm:text-base cursor-pointer shadow-sm"
              >
                <span>Explore Services</span>
              </Link>
            </div>

            {/* Quick Trust Pills */}
            <div className="pt-4 border-t border-white/20 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-semibold text-white/90">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                <span>2D/3D Vastu Plans</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                <span>Transparent BOQ Cost</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                <span>Patna HQ & Site Support</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (7 Cols): Multi-Stage Visual Carousel (Clean & Simple Animation) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-white/25 bg-ink/75 shadow-2xl group backdrop-blur-md">
              {/* Main Stage Image with Simple Smooth Animation */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  key={activeSlide}
                  src={currentSlide.mainImage}
                  alt={currentSlide.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-all duration-700 scale-100 group-hover:scale-105"
                />
                {/* Softened gradient overlay inside card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Clean Stage Content in Simple English (No redundant location badges) */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 z-20">
                  <div className="text-white max-w-lg space-y-1.5">
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-snug drop-shadow-md">
                      {currentSlide.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-white/95 leading-relaxed drop-shadow-sm font-medium line-clamp-2">
                      {currentSlide.description}
                    </p>
                    <p className="text-[11px] sm:text-xs text-brand-light font-bold drop-shadow-xs pt-0.5 tracking-wide">
                      {currentSlide.metrics}
                    </p>
                  </div>

                  {/* Carousel Prev/Next Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveSlide((prev) =>
                          prev === 0 ? HERO_VISUAL_SLIDES.length - 1 : prev - 1
                        )
                      }
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-black/40 hover:bg-brand text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveSlide(
                          (prev) => (prev + 1) % HERO_VISUAL_SLIDES.length
                        )
                      }
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-black/40 hover:bg-brand text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Next Slide"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom 4 Stage Switcher Bar (Integrated Category & Stage Names) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 bg-surface/95 backdrop-blur-md border-t border-border">
                {HERO_VISUAL_SLIDES.map((slide, idx) => {
                  const isActive = idx === activeSlide;
                  const stageNames = [
                    "Architecture & 3D",
                    "Structural Design",
                    "Commercial Planning",
                    "Turnkey Interior",
                  ];
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActiveSlide(idx)}
                      className={`p-2.5 sm:p-3 text-left transition-all border-r last:border-r-0 border-border flex items-center gap-2.5 cursor-pointer ${
                        isActive
                          ? "bg-brand/10 border-b-2 border-b-brand"
                          : "hover:bg-surface-muted opacity-75 hover:opacity-100"
                      }`}
                    >
                      <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-md overflow-hidden shrink-0 hidden sm:block border border-border">
                        <Image
                          src={slide.mainImage}
                          alt={slide.title}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span
                          className={`text-[10px] font-black tracking-wider uppercase block truncate ${
                            isActive ? "text-brand" : "text-ink-subtle"
                          }`}
                        >
                          Stage 0{idx + 1}
                        </span>
                        <span
                          className={`text-xs font-bold block truncate ${
                            isActive ? "text-ink font-extrabold" : "text-ink/80"
                          }`}
                        >
                          {stageNames[idx]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* BOOKING.COM STYLE ACTION SEARCH BOX */}
        <div className="mt-10 lg:mt-12 bg-surface/95 backdrop-blur-md rounded-2xl border-2 border-brand/30 shadow-2xl p-4 sm:p-6 text-ink">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand">
                Plan & Design Your Project with Confidence
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-ink">
                What are you looking for today?
              </h2>
            </div>
            <span className="text-xs text-ink-subtle">
              Select a service below to customize your requirement
            </span>
          </div>

          {/* 6 Interactive Service Pills with Brand SVG Icons */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-3 no-scrollbar">
            {CORE_SERVICES.map((srv) => {
              const active = selectedService === srv.id;
              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => setSelectedService(srv.id)}
                  className={`group flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer ${
                    active
                      ? "bg-[#8E4F2A] text-white border-[#8E4F2A] shadow-md scale-102"
                      : "bg-[#F9F6F0] text-[#1A120E] hover:bg-white hover:border-[#8E4F2A]/60 border-[#E6D3C3]"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      active
                        ? "bg-white/20 text-white"
                        : "bg-[#E6D3C3]/50 group-hover:bg-[#E6D3C3]/80 text-[#8E4F2A]"
                    }`}
                  >
                    {renderServiceIcon(srv.id, active)}
                  </div>
                  <span>{srv.title}</span>
                </button>
              );
            })}
          </div>

          {/* Booking.com Style Filter Inputs Bar */}
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
