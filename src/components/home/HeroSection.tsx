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

const KEN_BURNS_BG_CLASSES = [
  "animate-ken-burns-flip-1",
  "animate-ken-burns-flip-2",
  "animate-ken-burns-flip-3",
  "animate-ken-burns-flip-4",
];

const KEN_BURNS_CARD_CLASSES = [
  "animate-ken-burns-1",
  "animate-ken-burns-2",
  "animate-ken-burns-3",
  "animate-ken-burns-4",
];

const STAGE_CAMERA_SPECS = [
  { focal: "35mm Cine", move: "Slow Push-In" },
  { focal: "24mm Wide", move: "Pan-Right Framing" },
  { focal: "50mm Prime", move: "Facade Reveal" },
  { focal: "28mm Interior", move: "Pan-Left Ambient" },
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
      {/* FULL-WIDTH & FULL-HEIGHT DYNAMIC BACKGROUND IMAGES WITH SMOOTH KEN BURNS MOTION */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {HERO_VISUAL_SLIDES.map((slide, idx) => {
          const isActive = idx === activeSlide;
          const bgMotionClass = KEN_BURNS_BG_CLASSES[idx % KEN_BURNS_BG_CLASSES.length];
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div
                className={`w-full h-full ${
                  isActive ? bgMotionClass : "-scale-x-100"
                }`}
              >
                <Image
                  src={slide.mainImage}
                  alt={slide.title}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
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
                  <span className="text-[#8699C1] block mt-1">
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
                className="inline-flex items-center justify-center gap-2 bg-[#DA5F36] hover:bg-[#BD4922] text-white font-extrabold px-6 py-3.5 rounded-xl shadow-booking hover:shadow-booking-hover transition-all text-sm sm:text-base cursor-pointer min-w-[260px] whitespace-nowrap"
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
              {/* Main Stage Image with Cinematic Ken Burns Camera Motion */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0D0F1B]">
                <div
                  key={activeSlide}
                  className={`w-full h-full relative ${
                    KEN_BURNS_CARD_CLASSES[activeSlide % KEN_BURNS_CARD_CLASSES.length]
                  }`}
                >
                  <Image
                    src={currentSlide.mainImage}
                    alt={currentSlide.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center"
                  />
                </div>
                {/* Softened gradient overlay inside card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

                {/* Top Left & Right Stage Badges with Live Camera Indicator */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20">
                  <span className="px-3 py-1.5 rounded-full bg-[#DA5F36] text-white text-xs font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    {currentSlide.stageTag}
                  </span>

                  {/* Cinematic Camera Orbit / Focal Pill */}
                  <span className="px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-medium flex items-center gap-1.5 shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-white/70">CAM:</span>
                    <span className="text-white font-bold">{STAGE_CAMERA_SPECS[activeSlide]?.focal}</span>
                  </span>
                </div>

                {/* Floating Blueprint / Working Detail Picture-in-Picture Card */}
                <div className="hidden sm:flex absolute bottom-24 right-4 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-border shadow-lg items-center gap-3 max-w-xs z-20">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-border">
                    <Image
                      src={currentSlide.blueprintThumb}
                      alt="Stage technical preview"
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand block">
                      Live Working Spec
                    </span>
                    <p className="text-xs font-bold text-ink line-clamp-1">
                      {currentSlide.metrics}
                    </p>
                    <p className="text-[11px] text-ink-subtle line-clamp-2 mt-0.5">
                      {currentSlide.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Overlay Info & Prev/Next Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 z-20">
                  <div className="text-white max-w-lg">
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

              {/* Bottom 4 Thumbnail Stage Switcher Bar */}
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
                      className={`p-2.5 sm:p-3 text-left transition-all border-r last:border-r-0 border-border flex items-center gap-2.5 cursor-pointer ${isActive
                        ? "bg-brand-light/80 border-b-2 border-b-brand"
                        : "hover:bg-surface-muted"
                        }`}
                    >
                      <div className="relative w-10 h-10 rounded-md overflow-hidden shrink-0 hidden sm:block border border-border">
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
                          className={`text-[10px] font-bold tracking-wider uppercase block truncate ${isActive ? "text-brand" : "text-ink-subtle"
                            }`}
                        >
                          Stage 0{idx + 1}
                        </span>
                        <span
                          className={`text-xs font-semibold block truncate ${isActive ? "text-ink font-bold" : "text-ink-muted"
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

        {/* QUICK PROJECT PLANNER SEARCH BAR */}
        <div className="mt-8 lg:mt-10 bg-white/95 backdrop-blur-md rounded-2xl border border-[#CFDAEC] shadow-xl p-3.5 sm:p-5 text-[#0D0F1B]">
          <form
            onSubmit={handleBookingStart}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
          >
            {/* Input 1: Select Service */}
            <div className="md:col-span-4 bg-[#F4F6FA] rounded-xl px-4 py-2.5 border border-[#CFDAEC] hover:border-[#DA5F36]/60 transition-colors">
              <label
                htmlFor="hero-selected-service"
                className="text-[11px] font-bold uppercase tracking-wider text-[#DA5F36] flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                Select Service
              </label>
              <select
                id="hero-selected-service"
                name="selectedService"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-[#0D0F1B] focus:outline-none mt-0.5 cursor-pointer"
              >
                {CORE_SERVICES.map((s) => (
                  <option key={s.id} value={s.id} className="text-[#0D0F1B]">
                    {s.title} ({s.badge})
                  </option>
                ))}
              </select>
            </div>

            {/* Input 2: Project Location */}
            <div className="md:col-span-3 bg-[#F4F6FA] rounded-xl px-4 py-2.5 border border-[#CFDAEC] hover:border-[#DA5F36]/60 transition-colors">
              <label
                htmlFor="hero-selected-city"
                className="text-[11px] font-bold uppercase tracking-wider text-[#DA5F36] flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5" />
                Project Location
              </label>
              <select
                id="hero-selected-city"
                name="selectedCity"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-[#0D0F1B] focus:outline-none mt-0.5 cursor-pointer"
              >
                {BIHAR_CITIES.map((city) => (
                  <option key={city} value={city} className="text-[#0D0F1B]">
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Input 3: Built-up Area */}
            <div className="md:col-span-2 bg-[#F4F6FA] rounded-xl px-4 py-2.5 border border-[#CFDAEC] hover:border-[#DA5F36]/60 transition-colors">
              <label
                htmlFor="hero-plot-area"
                className="text-[11px] font-bold uppercase tracking-wider text-[#DA5F36] flex items-center gap-1.5"
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
                className="w-full bg-transparent text-sm font-bold text-[#0D0F1B] focus:outline-none mt-0.5"
              />
            </div>

            {/* Submit CTA */}
            <div className="md:col-span-3 flex h-full">
              <button
                type="submit"
                className="w-full bg-[#DA5F36] hover:bg-[#BD4922] text-white font-extrabold text-sm rounded-xl px-4 py-3.5 flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer min-h-[50px]"
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
