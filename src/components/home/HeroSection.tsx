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
  Send,
  Loader2,
  Sparkles,
  ShieldCheck,
  Mail,
  User,
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
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [selectedService, setSelectedService] = useState(CORE_SERVICES[0].id);
  const [selectedCity, setSelectedCity] = useState(BIHAR_CITIES[0]);
  const [plotArea, setPlotArea] = useState("2000");

  // Free Home Estimate Lead Form State
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadLookingFor, setLeadLookingFor] = useState("Architecture & 3D (Stage 01)");
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);

  // Auto-advance hero visual carousel every 5.5 seconds unless paused
  useEffect(() => {
    if (isCarouselPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_VISUAL_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isCarouselPaused]);

  const currentSlide = HERO_VISUAL_SLIDES[activeSlide];

  const handleBookingStart = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCity) params.set("city", selectedCity);
    if (plotArea) params.set("area", plotArea);
    const queryString = params.toString();
    router.push(`/services/${selectedService}${queryString ? `?${queryString}` : ""}`);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitting(true);
    setLeadError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: leadName,
          phone: leadPhone,
          service: leadLookingFor,
          notes: `Email: ${leadEmail} | Inquired via Hero Free Home Estimate Form`,
          source: "hero-free-home-estimate",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setLeadSubmitted(true);
    } catch (err: unknown) {
      setLeadError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLeadSubmitting(false);
    }
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

          {/* RIGHT COLUMN (7 Cols): Dual Independent Cards (4 Stages Showcase + Free Estimate Form) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 items-stretch">
            
            {/* CARD 1: 4 Stages Visual Showcase (Independent & Auto-Animated) */}
            <div
              className="bg-[#1A120E]/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-2xl transition-all"
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
            >
              <div>
                {/* Header: Stage Counter & Prev/Next Arrow Buttons */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8E4F2A]/30 border border-[#8E4F2A]/60 text-white text-[11px] font-bold">
                    <Sparkles className="w-3 h-3 text-[#A88462]" />
                    <span>Stage 0{activeSlide + 1} of 04</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSlide((prev) =>
                          prev === 0 ? HERO_VISUAL_SLIDES.length - 1 : prev - 1
                        );
                        setIsCarouselPaused(true);
                      }}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-[#8E4F2A] text-white flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Previous Stage"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSlide((prev) =>
                          (prev + 1) % HERO_VISUAL_SLIDES.length
                        );
                        setIsCarouselPaused(true);
                      }}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-[#8E4F2A] text-white flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Next Stage"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Compact Animated Image */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/15 bg-black/40 group">
                  <Image
                    key={activeSlide}
                    src={currentSlide.mainImage}
                    alt={currentSlide.title}
                    fill
                    priority={activeSlide === 0}
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover transition-all duration-700 scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/65 backdrop-blur-sm text-white text-[10px] font-bold border border-white/10">
                    {currentSlide.stageTag}
                  </span>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <span className="text-[11px] font-bold text-[#E6D3C3] block leading-tight truncate">
                      {currentSlide.metrics}
                    </span>
                  </div>
                </div>

                {/* Stage Info */}
                <div className="mt-3.5 space-y-1.5">
                  <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                    {currentSlide.title}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed line-clamp-2">
                    {currentSlide.description}
                  </p>
                </div>
              </div>

              {/* 4 Interactive Stage Pills Grid */}
              <div className="grid grid-cols-2 gap-2 pt-3.5 mt-3 border-t border-white/15">
                {HERO_VISUAL_SLIDES.map((slide, idx) => {
                  const isActive = idx === activeSlide;
                  const stageLabels = [
                    "Architecture & 3D",
                    "Structural Design",
                    "Commercial Plan",
                    "Luxury Interior",
                  ];
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => {
                        setActiveSlide(idx);
                        setIsCarouselPaused(true);
                      }}
                      className={`p-2 rounded-xl text-left transition-all cursor-pointer border ${
                        isActive
                          ? "bg-[#8E4F2A] text-white border-[#8E4F2A] shadow-md"
                          : "bg-white/10 hover:bg-white/20 text-white/85 border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold tracking-wider uppercase opacity-75">
                          Stage 0{idx + 1}
                        </span>
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? "bg-white" : "bg-white/30"
                          }`}
                        />
                      </div>
                      <p className="text-xs font-bold mt-0.5 truncate">
                        {stageLabels[idx]}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CARD 2: "Let's Connect And Get A Free Home Estimate" Form */}
            <div className="bg-white/95 backdrop-blur-xl border-2 border-[#8E4F2A]/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-2xl text-[#1A120E]">
              <div>
                {/* Form Header */}
                <div className="mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8E4F2A] block">
                    Free Consultation &amp; BOQ
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-[#1A120E] leading-tight">
                    Let&apos;s Connect And Get A Free Home Estimate
                  </h3>
                  <p className="text-[11px] text-[#4A4A46] mt-0.5">
                    Enter details below for preliminary BOQ &amp; direct architect callback.
                  </p>
                </div>

                {leadSubmitted ? (
                  <div className="bg-[#F9F6F0] border border-[#8E4F2A]/30 rounded-xl p-4 text-center space-y-2.5 my-auto">
                    <CheckCircle2 className="w-8 h-8 text-[#8E4F2A] mx-auto" />
                    <h4 className="text-sm font-bold text-[#1A120E]">
                      Estimate Request Received!
                    </h4>
                    <p className="text-xs text-[#4A4A46]">
                      Thank you, <strong>{leadName}</strong>. Our Patna engineering team will contact you within 2 hours.
                    </p>
                    <a
                      href={`https://wa.me/919876543210?text=Hello%20Livitech%20Design,%20I%20requested%20a%20free%20home%20estimate%20for%20${encodeURIComponent(
                        leadLookingFor
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#8E4F2A] text-white text-xs font-bold hover:bg-[#6D3B1E] transition-colors mt-1"
                    >
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                    {/* Name */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#1A120E] mb-0.5">
                        Name <span className="text-[#8E4F2A]">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-[#8E4F2A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          placeholder="Enter your name"
                          className="w-full pl-8 pr-3 py-1.5 bg-[#F9F6F0] border border-[#E6D3C3] rounded-lg text-xs font-medium text-[#1A120E] placeholder:text-[#8E4F2A]/50 focus:outline-none focus:border-[#8E4F2A]"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#1A120E] mb-0.5">
                        Phone Number <span className="text-[#8E4F2A]">*</span>
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-2.5 bg-[#E6D3C3]/50 border border-r-0 border-[#E6D3C3] rounded-l-lg text-xs font-bold text-[#1A120E]">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          placeholder="Phone Number"
                          className="w-full px-3 py-1.5 bg-[#F9F6F0] border border-[#E6D3C3] rounded-r-lg text-xs font-medium text-[#1A120E] placeholder:text-[#8E4F2A]/50 focus:outline-none focus:border-[#8E4F2A]"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#1A120E] mb-0.5">
                        Email <span className="text-[#8E4F2A]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-[#8E4F2A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full pl-8 pr-3 py-1.5 bg-[#F9F6F0] border border-[#E6D3C3] rounded-lg text-xs font-medium text-[#1A120E] placeholder:text-[#8E4F2A]/50 focus:outline-none focus:border-[#8E4F2A]"
                        />
                      </div>
                    </div>

                    {/* What Are You Looking For? */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#1A120E] mb-0.5">
                        What Are You Looking For? <span className="text-[#8E4F2A]">*</span>
                      </label>
                      <select
                        value={leadLookingFor}
                        onChange={(e) => setLeadLookingFor(e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#F9F6F0] border border-[#E6D3C3] rounded-lg text-xs font-bold text-[#1A120E] focus:outline-none focus:border-[#8E4F2A] cursor-pointer"
                      >
                        <option value="Architecture & 3D (Stage 01)">
                          Architecture &amp; 3D (Stage 01)
                        </option>
                        <option value="Structural Design & Supervision (Stage 02)">
                          Structural Design &amp; Supervision (Stage 02)
                        </option>
                        <option value="Commercial Planning & Building (Stage 03)">
                          Commercial Planning &amp; Building (Stage 03)
                        </option>
                        <option value="Luxury Interior Design (Stage 04)">
                          Luxury Interior Design (Stage 04)
                        </option>
                        <option value="Complete Turnkey Construction">
                          Complete Turnkey Construction
                        </option>
                        <option value="Cost Estimation / BOQ Audit">
                          Cost Estimation / BOQ Audit
                        </option>
                      </select>
                    </div>

                    {leadError && (
                      <p className="text-[11px] text-red-600 font-semibold">{leadError}</p>
                    )}

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      disabled={leadSubmitting}
                      className="w-full mt-1 bg-[#8E4F2A] hover:bg-[#6D3B1E] disabled:opacity-60 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {leadSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Get Free Home Estimate</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Privacy Footer */}
              <div className="pt-2 mt-2 border-t border-[#E6D3C3]/60 flex items-center justify-center gap-1 text-[10px] text-[#4A4A46]">
                <ShieldCheck className="w-3 h-3 text-[#8E4F2A]" />
                <span>100% Privacy · Direct Engineer Review · No Spam</span>
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
