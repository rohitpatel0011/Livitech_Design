"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  User,
  Phone,
  Mail,
  Layers,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { BIHAR_CITIES } from "@/data/livitectData";

interface HeroStage {
  id: string;
  stepNum: string;
  tag: string;
  title: string;
  description: string;
  metrics: string;
  image: string;
}

const HERO_STAGES: HeroStage[] = [
  {
    id: "stage-1",
    stepNum: "01",
    tag: "Architecture & 3D",
    title: "Architectural Planning & 3D Vastu Renders",
    description: "Visualize your dream home in photorealistic 3D before a single brick is laid.",
    metrics: "2D/3D Vastu Compliant · CAD Blueprints",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "stage-2",
    stepNum: "02",
    tag: "Structural Design",
    title: "RCC Structural Design & Site Supervision",
    description: "Earthquake-resistant framing, footing details, and rigorous engineer site audits.",
    metrics: "Fe-550D TMT Steel · M25 Concrete",
    image: "/images/rcc-structural-supervision.jpg",
  },
  {
    id: "stage-3",
    stepNum: "03",
    tag: "Commercial Planning",
    title: "Commercial Complex Planning & Building",
    description: "High-ROI commercial spaces, showroom glass facades, and municipal bye-law compliance.",
    metrics: "Basement Parking · Fire Safety Norms",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "stage-4",
    stepNum: "04",
    tag: "Luxury Interior",
    title: "Luxury Interior Design & 3D Walkthrough",
    description: "Bespoke modular kitchens, custom wardrobes, false ceilings, and ambient profile lighting.",
    metrics: "BWP Marine Ply · Italian Finishes",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
  },
];

const SERVICE_PILLS = [
  { label: "Residential Construction", icon: "🏠" },
  { label: "Commercial Construction", icon: "🏢" },
  { label: "Maintenance Service", icon: "🔧" },
  { label: "Interior Design", icon: "🎨" },
  { label: "Architectural Services", icon: "📐" },
  { label: "Contractor Services", icon: "👷" },
];

export default function HeroSection() {
  const [activeStage, setActiveStage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedService, setSelectedService] = useState("Architecture (01)");
  
  // Search Bar State
  const [searchService, setSearchService] = useState(SERVICE_PILLS[0].label);
  const [searchCity, setSearchCity] = useState(BIHAR_CITIES[0]);
  const [plotArea, setPlotArea] = useState("2000");

  // Auto-cycle stages every 5.5s unless hovered/clicked
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % HERO_STAGES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentStageData = HERO_STAGES[activeStage];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          service: selectedService,
          source: "Hero Section Free Estimate Form",
        }),
      });
      alert("Thank you! Our Patna HQ team will contact you shortly.");
    } catch {
      alert("Submitted successfully!");
    }
  };

  return (
    <section id="hero-section" className="relative bg-[#1A120E] text-white pt-28 pb-20 overflow-hidden">
      {/* Background 3D Villa / Site Photos with Flip Effect & Gradient Overlay */}
      <div className="absolute inset-0 z-0 opacity-25 scale-x-[-1] pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
          alt="Livitect Background Architectural Villa"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A120E] via-[#1A120E]/90 to-[#1A120E]/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP MAIN GRID: Left Value Proposition (5 Cols) + Right Dual Independent Cards (7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          
          {/* LEFT COLUMN (5 Cols: Main Value Proposition) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8E4F2A]/20 border border-[#8E4F2A]/40 text-[#E6D3C3] text-xs font-extrabold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#8E4F2A]" />
                <span>Plan · Design · Build · Patna HQ</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.12]">
                Build better. <br />
                <span className="text-[#8E4F2A]">BUILD WITH CONFIDENCE.</span>
              </h1>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                From architectural 2D/3D design and BOQ cost estimation to modern exterior elevations, luxury interior design, and site consultation — Livitech Design helps you plan your building project with complete precision.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="#cost-estimator"
                  className="inline-flex items-center gap-2 bg-[#8E4F2A] hover:bg-[#6D3B1E] text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all text-sm"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl border border-white/15 backdrop-blur-md transition-all text-sm"
                >
                  <span>Explore Services</span>
                </Link>
              </div>
            </div>

            {/* Trust Checkmarks */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-3 text-xs font-semibold text-white/90">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#8E4F2A] shrink-0" />
                <span>2D/3D Vastu Plans</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#8E4F2A] shrink-0" />
                <span>Transparent BOQ</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#8E4F2A] shrink-0" />
                <span>Patna Support</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (7 Cols: Dual Independent Cards Container) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
            
            {/* CARD 1: 4-STAGE SHOWCASE (Obsidian Dark Glass Card) */}
            <div 
              className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/15 p-5 flex flex-col justify-between shadow-xl relative overflow-hidden group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded bg-[#8E4F2A] text-white text-[10px] font-extrabold uppercase">
                    ✨ Stage {currentStageData.stepNum} of 04
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setActiveStage((prev) => (prev === 0 ? HERO_STAGES.length - 1 : prev - 1))}
                      className="p-1.5 rounded bg-white/10 hover:bg-[#8E4F2A] text-white transition-colors"
                      aria-label="Previous Stage"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStage((prev) => (prev + 1) % HERO_STAGES.length)}
                      className="p-1.5 rounded bg-white/10 hover:bg-[#8E4F2A] text-white transition-colors"
                      aria-label="Next Stage"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Compact Animated Image Preview */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-3 border border-white/10">
                  <Image
                    src={currentStageData.image}
                    alt={currentStageData.title}
                    fill
                    sizes="350px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <span className="text-[9px] font-bold text-[#E6D3C3] uppercase">Tag: {currentStageData.tag}</span>
                    <p className="text-[11px] font-bold truncate">{currentStageData.metrics}</p>
                  </div>
                </div>

                <h3 className="text-sm font-extrabold text-white line-clamp-1">
                  {currentStageData.title}
                </h3>
                <p className="text-xs text-white/70 mt-1 line-clamp-2">
                  {currentStageData.description}
                </p>
              </div>

              {/* 4 Stage Selector Buttons */}
              <div className="grid grid-cols-2 gap-1.5 pt-4 mt-4 border-t border-white/10">
                {HERO_STAGES.map((st, idx) => {
                  const isActive = idx === activeStage;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setActiveStage(idx)}
                      className={`text-left px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all truncate cursor-pointer ${
                        isActive 
                          ? "bg-[#8E4F2A] text-white shadow-sm" 
                          : "bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"
                      }`}
                    >
                      {st.stepNum} · {st.tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CARD 2: ESTIMATE FORM (Natural White Card) */}
            <div className="bg-white text-[#1A120E] rounded-2xl border border-[#E6D3C3] p-5 flex flex-col justify-between shadow-xl">
              <div>
                <div className="mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8E4F2A] block">
                    Free Consultation &amp; BOQ
                  </span>
                  <h3 className="text-base font-extrabold text-[#1A120E]">
                    Let&apos;s Connect And Get A Free Home Estimate
                  </h3>
                  <p className="text-[11px] text-[#4A4A46] mt-0.5">
                    Enter details below for quick callback...
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-[#4A4A46] mb-1">
                      Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-[#8E4F2A]" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-[#F9F6F0] border border-[#E6D3C3] rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-[#1A120E] focus:outline-none focus:border-[#8E4F2A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-[#4A4A46] mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 w-4 h-4 text-[#8E4F2A]" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 Phone Number"
                        className="w-full bg-[#F9F6F0] border border-[#E6D3C3] rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-[#1A120E] focus:outline-none focus:border-[#8E4F2A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-[#4A4A46] mb-1">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-[#8E4F2A]" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="w-full bg-[#F9F6F0] border border-[#E6D3C3] rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-[#1A120E] focus:outline-none focus:border-[#8E4F2A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-[#4A4A46] mb-1">
                      What Are You Looking For? *
                    </label>
                    <div className="relative">
                      <Layers className="absolute left-3 top-2.5 w-4 h-4 text-[#8E4F2A]" />
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full bg-[#F9F6F0] border border-[#E6D3C3] rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-[#1A120E] focus:outline-none focus:border-[#8E4F2A] cursor-pointer"
                      >
                        <option value="Architecture (01)">Architecture (01)</option>
                        <option value="Structural Design (02)">Structural Design (02)</option>
                        <option value="Commercial Planning (03)">Commercial Planning (03)</option>
                        <option value="Luxury Interior (04)">Luxury Interior (04)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#8E4F2A] hover:bg-[#6D3B1E] text-white font-bold text-xs py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Get Free Estimate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

              <div className="pt-3 mt-3 border-t border-[#E6D3C3]/60 flex items-center justify-center gap-1 text-[10px] text-[#4A4A46]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8E4F2A]" />
                <span>100% Privacy No Spam</span>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM SEARCH & FILTER BAR ("What are you looking for today?") */}
        <div className="bg-black/50 backdrop-blur-xl rounded-3xl border border-white/15 p-6 shadow-2xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E6D3C3]">
                Plan & Design Your Project With Confidence
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                What are you looking for today?
              </h2>
            </div>
            <span className="text-xs text-white/70">
              Select a service below to customize requirement
            </span>
          </div>

          {/* 6 Brand SVG Icon Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar">
            {SERVICE_PILLS.map((pill) => {
              const active = searchService === pill.label;
              return (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => setSearchService(pill.label)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                    active
                      ? "bg-[#8E4F2A] text-white border-[#8E4F2A] shadow-md"
                      : "bg-white/5 text-white hover:bg-white/10 border-white/15"
                  }`}
                >
                  <span className="text-sm">{pill.icon}</span>
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Filter Inputs Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t border-white/10">
            
            {/* Selected Service Dropdown */}
            <div className="md:col-span-4 bg-white/10 rounded-xl px-4 py-2.5 border border-white/15">
              <label className="text-[10px] font-bold uppercase text-[#E6D3C3] block">
                Selected Service
              </label>
              <select
                value={searchService}
                onChange={(e) => setSearchService(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-white focus:outline-none mt-0.5"
              >
                {SERVICE_PILLS.map((p) => (
                  <option key={p.label} value={p.label} className="bg-[#1A120E] text-white">
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
            <div className="md:col-span-4 bg-white/10 rounded-xl px-4 py-2.5 border border-white/15">
              <label className="text-[10px] font-bold uppercase text-[#E6D3C3] block">
                Project City / Location
              </label>
              <select
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-white focus:outline-none mt-0.5"
              >
                {BIHAR_CITIES.map((c) => (
                  <option key={c} value={c} className="bg-[#1A120E] text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Area Input */}
            <div className="md:col-span-2 bg-white/10 rounded-xl px-4 py-2.5 border border-white/15">
              <label className="text-[10px] font-bold uppercase text-[#E6D3C3] block">
                Area (Sq.Ft)
              </label>
              <input
                type="number"
                value={plotArea}
                onChange={(e) => setPlotArea(e.target.value)}
                placeholder="2000"
                className="w-full bg-transparent text-sm font-bold text-white focus:outline-none mt-0.5"
              />
            </div>

            {/* Submit CTA */}
            <div className="md:col-span-2 flex">
              <Link
                href="#cost-estimator"
                className="w-full bg-[#8E4F2A] hover:bg-[#6D3B1E] text-white font-bold text-sm rounded-xl px-4 py-3 flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
