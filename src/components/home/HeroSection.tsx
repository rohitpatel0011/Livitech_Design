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
  Layers,
  Ruler,
} from "lucide-react";
import {
  HERO_VISUAL_SLIDES,
  CORE_SERVICES,
  BIHAR_CITIES,
} from "@/data/livitectData";

interface HeroStageContent {
  headingLine1: string;
  headingLine2: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
}

const HERO_STAGE_CONTENT: HeroStageContent[] = [
  {
    headingLine1: "Design your dream home.",
    headingLine2: "See every detail in 3D.",
    description:
      "Vastu-compliant 2D floor plans, smart room layouts, and photorealistic 3D front elevations before laying a single brick.",
    primaryCtaText: "Book 2D/3D Design",
    primaryCtaHref: "#cost-estimator",
  },
  {
    headingLine1: "Engineered for your safety.",
    headingLine2: "Built to endure for generations.",
    description:
      "Earthquake-resistant RCC structural drawings, certified steel placement, and itemized material BOQ cost estimation before you start building.",
    primaryCtaText: "Get Structural & BOQ Plan",
    primaryCtaHref: "#cost-estimator",
  },
  {
    headingLine1: "Smart spaces for your business.",
    headingLine2: "Built to attract more customers.",
    description:
      "Modern glass fronts, spacious shop layouts, easy parking plans, and full government approval support for commercial buildings.",
    primaryCtaText: "Explore Commercial Build",
    primaryCtaHref: "/services/commercial-construction",
  },
  {
    headingLine1: "Step inside modern rooms.",
    headingLine2: "Before they are ever built.",
    description:
      "Photorealistic 3D interior walkthroughs, custom modular kitchens, luxury wardrobes, false ceiling plans, and turnkey home finishing execution.",
    primaryCtaText: "Book Interior Design",
    primaryCtaHref: "/services/interior-design",
  },
];

const STAGE_NAMES = [
  "Architecture & 3D",
  "Structural Design",
  "Commercial Planning",
  "Turnkey Interior",
];

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
  const stageContent = HERO_STAGE_CONTENT[activeSlide] || HERO_STAGE_CONTENT[0];

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
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-105"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-stretch">
          {/* LEFT COLUMN (5 Cols): Clean Top-Aligned Content & Bottom-Parallel Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-1 sm:pt-2 lg:pt-3">
            {/* 1. Dynamic Text Block (Fixed Height Container, only text fades in smoothly) */}
            <div className="h-[185px] sm:h-[195px] lg:h-[215px] flex flex-col justify-start">
              <div key={activeSlide} className="animate-hero-fade space-y-3 sm:space-y-4">
                {/* Main Heading (Exact 9 words: 4 words + 5 words, 2 lines) */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] drop-shadow-md">
                  <span>{stageContent.headingLine1}</span>
                  <span className="text-[#E6D3C3] block mt-1">
                    {stageContent.headingLine2}
                  </span>
                </h1>

                {/* Description (Exact 17 words across all 4 stages) */}
                <p className="text-base sm:text-lg text-white/95 leading-relaxed max-w-xl font-medium drop-shadow-sm">
                  {stageContent.description}
                </p>
              </div>
            </div>

            {/* 2. Action Buttons (Parallel to the bottom of the right-side card on desktop) */}
            <div className="pt-6 lg:pt-0 mt-6 lg:mt-auto flex flex-wrap items-center gap-3.5 pb-1">
              <Link
                href={stageContent.primaryCtaHref}
                className="inline-flex items-center justify-center gap-2 bg-[#8E4F2A] hover:bg-[#6D3B1E] text-white font-extrabold px-6 py-3.5 rounded-xl shadow-booking hover:shadow-booking-hover transition-all text-sm sm:text-base cursor-pointer min-w-[260px] whitespace-nowrap"
              >
                <span key={activeSlide} className="animate-hero-fade">
                  {stageContent.primaryCtaText}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("services");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    router.push("/#services");
                  }
                }}
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold px-7 py-3.5 rounded-xl border border-white/30 backdrop-blur-md transition-all text-sm sm:text-base cursor-pointer shadow-sm min-w-[170px]"
              >
                <span>Explore Services</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN (7 Cols): Multi-Stage Visual Carousel */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-white/25 bg-ink/75 shadow-2xl group backdrop-blur-md">
              {/* Main Stage Image */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                {/* Combined Floating Blueprint / Working Detail & 4-Stage Switcher PIP Card */}
                <div className="hidden sm:block absolute bottom-20 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-border shadow-2xl max-w-sm z-20">
                  {/* 4 Interactive Stage Switcher Buttons */}
                  <div className="grid grid-cols-4 gap-1 p-1 bg-[#F9F6F0] rounded-xl border border-border/60 mb-2.5">
                    {HERO_VISUAL_SLIDES.map((slide, idx) => {
                      const isActive = idx === activeSlide;
                      return (
                        <button
                          key={slide.id}
                          type="button"
                          onClick={() => setActiveSlide(idx)}
                          className={`py-1.5 px-1 rounded-lg text-[11px] font-bold transition-all text-center cursor-pointer ${
                            isActive
                              ? "bg-[#8E4F2A] text-white shadow-xs"
                              : "text-ink-muted hover:text-ink hover:bg-white"
                          }`}
                        >
                          Stage 0{idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Stage Technical Preview & Details */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-border shadow-xs bg-[#1A120E]">
                      <Image
                        key={activeSlide}
                        src={currentSlide.blueprintThumb}
                        alt="Stage technical preview"
                        fill
                        sizes="64px"
                        className="object-cover animate-hero-fade"
                      />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      {/* Replaces "Live Working Spec" with Active Stage Name */}
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#8E4F2A] block truncate">
                        Stage 0{activeSlide + 1} · {STAGE_NAMES[activeSlide]}
                      </span>
                      <p className="text-xs font-bold text-ink line-clamp-1 mt-0.5">
                        {currentSlide.metrics}
                      </p>
                      <p className="text-[11px] text-ink-subtle line-clamp-2 mt-0.5 leading-snug">
                        {currentSlide.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Overlay Info & Prev/Next Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 z-20">
                  <div className="text-white max-w-lg">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#E6D3C3] block sm:hidden">
                      Stage 0{activeSlide + 1} · {STAGE_NAMES[activeSlide]}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold leading-snug drop-shadow-sm">
                      {currentSlide.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-200 mt-1 line-clamp-2 sm:hidden drop-shadow-sm">
                      {currentSlide.description}
                    </p>
                  </div>

                  {/* Carousel Prev/Next Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveSlide((prev) =>
                          prev === 0 ? HERO_VISUAL_SLIDES.length - 1 : prev - 1
                        )
                      }
                      className="w-9 h-9 rounded-lg bg-white/20 hover:bg-brand text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
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
                      className="w-9 h-9 rounded-lg bg-white/20 hover:bg-brand text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Next Slide"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK PROJECT PLANNER SEARCH BAR */}
        <div className="mt-8 lg:mt-10 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E6D3C3] shadow-xl p-3.5 sm:p-5 text-[#1A120E]">
          <form
            onSubmit={handleBookingStart}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
          >
            {/* Input 1: Select Service */}
            <div className="md:col-span-4 bg-[#F9F6F0] rounded-xl px-4 py-2.5 border border-[#E6D3C3] hover:border-[#8E4F2A]/60 transition-colors">
              <label
                htmlFor="hero-selected-service"
                className="text-[11px] font-bold uppercase tracking-wider text-[#8E4F2A] flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                Select Service
              </label>
              <select
                id="hero-selected-service"
                name="selectedService"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-[#1A120E] focus:outline-none mt-0.5 cursor-pointer"
              >
                {CORE_SERVICES.map((s) => (
                  <option key={s.id} value={s.id} className="text-[#1A120E]">
                    {s.title} ({s.badge})
                  </option>
                ))}
              </select>
            </div>

            {/* Input 2: Project Location */}
            <div className="md:col-span-3 bg-[#F9F6F0] rounded-xl px-4 py-2.5 border border-[#E6D3C3] hover:border-[#8E4F2A]/60 transition-colors">
              <label
                htmlFor="hero-selected-city"
                className="text-[11px] font-bold uppercase tracking-wider text-[#8E4F2A] flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5" />
                Project Location
              </label>
              <select
                id="hero-selected-city"
                name="selectedCity"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-[#1A120E] focus:outline-none mt-0.5 cursor-pointer"
              >
                {BIHAR_CITIES.map((city) => (
                  <option key={city} value={city} className="text-[#1A120E]">
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Input 3: Built-up Area */}
            <div className="md:col-span-2 bg-[#F9F6F0] rounded-xl px-4 py-2.5 border border-[#E6D3C3] hover:border-[#8E4F2A]/60 transition-colors">
              <label
                htmlFor="hero-plot-area"
                className="text-[11px] font-bold uppercase tracking-wider text-[#8E4F2A] flex items-center gap-1.5"
              >
                <Ruler className="w-3.5 h-3.5" />
                Area (Sq.Ft)
              </label>
              <input
                id="hero-plot-area"
                name="plotArea"
                type="number"
                value={plotArea}
                onChange={(e) => setPlotArea(e.target.value)}
                placeholder="2000"
                className="w-full bg-transparent text-sm font-bold text-[#1A120E] focus:outline-none mt-0.5"
              />
            </div>

            {/* Submit CTA */}
            <div className="md:col-span-3 flex h-full">
              <button
                type="submit"
                className="w-full bg-[#8E4F2A] hover:bg-[#6D3B1E] text-white font-extrabold text-sm rounded-xl px-4 py-3.5 flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer min-h-[50px]"
              >
                <span>Get Instant Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
