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
  ShieldCheck,
  Mail,
  User,
  Eye,
  ExternalLink,
} from "lucide-react";
import { CORE_SERVICES, BIHAR_CITIES, ServiceItem } from "@/data/livitectData";

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

  // Dynamic Service Showcase State (6 Core Services)
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [activeCardTab, setActiveCardTab] = useState<"showcase" | "enquiry">("showcase");
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);

  // Search Box State
  const [selectedService, setSelectedService] = useState(CORE_SERVICES[0].id);
  const [selectedCity, setSelectedCity] = useState(BIHAR_CITIES[0]);
  const [plotArea, setPlotArea] = useState("2000");

  // Dynamic Lead Enquiry Form State
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadService, setLeadService] = useState(CORE_SERVICES[0].title);
  const [leadCity, setLeadCity] = useState(BIHAR_CITIES[0]);
  const [leadPlotArea, setLeadPlotArea] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);

  const activeService: ServiceItem = CORE_SERVICES[activeServiceIdx];

  // Auto-advance services carousel every 5.5 seconds unless paused or in enquiry mode
  useEffect(() => {
    if (isAutoPaused || activeCardTab === "enquiry") return;
    const timer = setInterval(() => {
      setActiveServiceIdx((prev) => {
        const nextIdx = (prev + 1) % CORE_SERVICES.length;
        setLeadService(CORE_SERVICES[nextIdx].title);
        return nextIdx;
      });
      setActiveImgIdx(0);
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoPaused, activeCardTab]);

  const handleSelectService = (index: number) => {
    setActiveServiceIdx(index);
    setActiveImgIdx(0);
    setIsAutoPaused(true);
    setLeadService(CORE_SERVICES[index].title);
  };

  const handleToggleToEnquiry = () => {
    setLeadService(CORE_SERVICES[activeServiceIdx].title);
    setActiveCardTab("enquiry");
    setIsAutoPaused(true);
  };

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
          city: leadCity,
          plotArea: leadPlotArea,
          service: leadService,
          notes: `Email: ${leadEmail} | Enquired via Hero Dynamic Service Card`,
          source: "hero-service-enquiry-card",
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
        {CORE_SERVICES.map((srv, idx) => {
          const isActive = idx === activeServiceIdx;
          return (
            <div
              key={srv.id}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                isActive ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <Image
                src={srv.images[0]}
                alt={srv.title}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center -scale-x-100"
              />
            </div>
          );
        })}

        {/* Softened Translucent Gradient Overlays so the Background Photo is clearly visible, bright, and vibrant */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/45 to-ink/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/25 z-10" />
      </div>

      {/* Main Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        {/* TOP SPLIT: Left Copy + Right Dynamic Interactive Service Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
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

          {/* RIGHT COLUMN (7 Cols): UNIFIED DYNAMIC CARD WITH CURVED TOP-LEFT TOGGLE */}
          <div className="lg:col-span-7">
            <div
              className="relative bg-[#1A120E]/90 backdrop-blur-2xl border border-white/25 rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between transition-all duration-500"
              onMouseEnter={() => setIsAutoPaused(true)}
              onMouseLeave={() => {
                if (activeCardTab === "showcase") setIsAutoPaused(false);
              }}
            >
              {/* TOP CURVED TOGGLE BAR */}
              <div className="p-4 sm:p-5 pb-3.5 border-b border-white/15 flex flex-wrap items-center justify-between gap-3 bg-black/30">
                {/* Curved Pill Toggle (Top Left) */}
                <div className="inline-flex items-center p-1 bg-black/60 backdrop-blur-md rounded-full border border-white/20 shadow-inner">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCardTab("showcase");
                      setIsAutoPaused(false);
                    }}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                      activeCardTab === "showcase"
                        ? "bg-[#8E4F2A] text-white shadow-md scale-102"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Explore Showcase</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleToggleToEnquiry}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                      activeCardTab === "enquiry"
                        ? "bg-[#8E4F2A] text-white shadow-md scale-102"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Get Free Enquiry</span>
                  </button>
                </div>

                {/* Right Status Badge & Prev/Next (in showcase) */}
                {activeCardTab === "showcase" ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white/90 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                      0{activeServiceIdx + 1} / 0{CORE_SERVICES.length}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveServiceIdx((prev) =>
                            prev === 0 ? CORE_SERVICES.length - 1 : prev - 1
                          );
                          setActiveImgIdx(0);
                          setIsAutoPaused(true);
                        }}
                        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#8E4F2A] text-white flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Previous Service"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveServiceIdx((prev) =>
                            (prev + 1) % CORE_SERVICES.length
                          );
                          setActiveImgIdx(0);
                          setIsAutoPaused(true);
                        }}
                        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#8E4F2A] text-white flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Next Service"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-[#E6D3C3] bg-[#8E4F2A]/30 border border-[#8E4F2A]/60 px-3 py-1 rounded-full">
                    Enquiring for: {leadService}
                  </span>
                )}
              </div>

              {/* TAB 1: VISUAL SHOWCASE VIEW */}
              {activeCardTab === "showcase" ? (
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  {/* Large Visual Image Carousel with Sub-Image Slider */}
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/20 bg-black/40 group shadow-lg">
                    <Image
                      key={`${activeService.id}-${activeImgIdx}`}
                      src={activeService.images[activeImgIdx]}
                      alt={activeService.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                    {/* Top Left Badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#8E4F2A] text-white text-xs font-bold shadow-md">
                      {activeService.badge}
                    </span>

                    {/* Top Right Mini Gallery Counter + Controls */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 text-white text-xs font-semibold">
                      <span>{activeImgIdx + 1} / {activeService.images.length}</span>
                      <div className="flex items-center gap-0.5 ml-1 border-l border-white/20 pl-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImgIdx((prev) =>
                              prev === 0 ? activeService.images.length - 1 : prev - 1
                            );
                            setIsAutoPaused(true);
                          }}
                          className="hover:text-[#E6D3C3] cursor-pointer"
                          aria-label="Previous Photo"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImgIdx((prev) =>
                              (prev + 1) % activeService.images.length
                            );
                            setIsAutoPaused(true);
                          }}
                          className="hover:text-[#E6D3C3] cursor-pointer"
                          aria-label="Next Photo"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Overlay Title & Subtitle */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-xl sm:text-2xl font-black leading-snug drop-shadow-md">
                        {activeService.title}
                      </h3>
                      <p className="text-xs text-white/90 line-clamp-1 mt-0.5 font-medium">
                        {activeService.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Deliverables & Actions Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-1">
                    <div className="sm:col-span-7 flex flex-wrap gap-2">
                      {activeService.deliverables.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/90 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#A88462] shrink-0" />
                          <span className="truncate">{item}</span>
                        </span>
                      ))}
                    </div>

                    <div className="sm:col-span-5 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={handleToggleToEnquiry}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#8E4F2A] hover:bg-[#6D3B1E] text-white text-xs font-extrabold shadow-md transition-all cursor-pointer"
                      >
                        <span>Get Enquiry</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        href={`/services/${activeService.slug}`}
                        className="inline-flex items-center justify-center p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title="View Full Service Details"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Bottom 6 Services Switcher Grid */}
                  <div className="pt-3 border-t border-white/15">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/60 block mb-2">
                      Select Any Construction Service:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                      {CORE_SERVICES.map((srv, idx) => {
                        const isActive = idx === activeServiceIdx;
                        return (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => handleSelectService(idx)}
                            className={`p-2 rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between ${
                              isActive
                                ? "bg-[#8E4F2A] text-white border-[#8E4F2A] shadow-md scale-102"
                                : "bg-white/10 hover:bg-white/15 text-white/80 border-white/10 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div
                                className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                                  isActive ? "bg-white/20 text-white" : "bg-white/10 text-[#E6D3C3]"
                                }`}
                              >
                                {renderServiceIcon(srv.id, isActive)}
                              </div>
                              <span className="text-[9px] font-bold opacity-60">0{idx + 1}</span>
                            </div>
                            <span className="text-[11px] font-bold leading-tight line-clamp-1">
                              {srv.title.replace(" Construction", "").replace(" Services", "")}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                /* TAB 2: DYNAMIC ENQUIRY FORM VIEW */
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white text-[#1A120E] rounded-b-3xl">
                  <div>
                    <div className="mb-4">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#8E4F2A] block">
                        Direct Architect &amp; Engineering Consultation
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-[#1A120E] leading-tight mt-0.5">
                        Get A Free Enquiry for {leadService}
                      </h3>
                      <p className="text-xs text-[#4A4A46] mt-1">
                        Fill out your requirements below. Our Patna engineering team will prepare your preliminary BOQ and contact you.
                      </p>
                    </div>

                    {leadSubmitted ? (
                      <div className="bg-[#F9F6F0] border-2 border-[#8E4F2A]/30 rounded-2xl p-6 text-center space-y-3 my-4">
                        <CheckCircle2 className="w-10 h-10 text-[#8E4F2A] mx-auto" />
                        <h4 className="text-base font-bold text-[#1A120E]">
                          Enquiry Received for {leadService}!
                        </h4>
                        <p className="text-xs text-[#4A4A46] max-w-md mx-auto">
                          Thank you, <strong>{leadName}</strong>. Our senior architect at Dharmrath Palace, Kankarbagh will review your requirement and call you within 2 hours.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                          <a
                            href={`https://wa.me/919876543210?text=Hello%20Livitech%20Design,%20I%20just%20submitted%20an%20enquiry%20for%20${encodeURIComponent(
                              leadService
                            )}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8E4F2A] text-white text-xs font-bold hover:bg-[#6D3B1E] transition-colors"
                          >
                            <span>Chat on WhatsApp</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              setLeadSubmitted(false);
                              setActiveCardTab("showcase");
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E6D3C3]/60 text-[#1A120E] text-xs font-bold hover:bg-[#E6D3C3] transition-colors cursor-pointer"
                          >
                            <span>Back to Showcase</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* Full Name */}
                        <div>
                          <label className="block text-[11px] font-bold text-[#1A120E] mb-1">
                            Full Name <span className="text-[#8E4F2A]">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-[#8E4F2A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              required
                              value={leadName}
                              onChange={(e) => setLeadName(e.target.value)}
                              placeholder="Enter your name"
                              className="w-full pl-9 pr-3 py-2 bg-[#F9F6F0] border border-[#E6D3C3] rounded-xl text-xs font-medium text-[#1A120E] placeholder:text-[#8E4F2A]/50 focus:outline-none focus:border-[#8E4F2A]"
                            />
                          </div>
                        </div>

                        {/* Phone Number */}
                        <div>
                          <label className="block text-[11px] font-bold text-[#1A120E] mb-1">
                            Phone Number <span className="text-[#8E4F2A]">*</span>
                          </label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 bg-[#E6D3C3]/50 border border-r-0 border-[#E6D3C3] rounded-l-xl text-xs font-bold text-[#1A120E]">
                              +91
                            </span>
                            <input
                              type="tel"
                              required
                              value={leadPhone}
                              onChange={(e) => setLeadPhone(e.target.value)}
                              placeholder="Phone Number"
                              className="w-full px-3 py-2 bg-[#F9F6F0] border border-[#E6D3C3] rounded-r-xl text-xs font-medium text-[#1A120E] placeholder:text-[#8E4F2A]/50 focus:outline-none focus:border-[#8E4F2A]"
                            />
                          </div>
                        </div>

                        {/* Email Address */}
                        <div>
                          <label className="block text-[11px] font-bold text-[#1A120E] mb-1">
                            Email Address <span className="text-[#8E4F2A]">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-[#8E4F2A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="email"
                              required
                              value={leadEmail}
                              onChange={(e) => setLeadEmail(e.target.value)}
                              placeholder="Enter your email address"
                              className="w-full pl-9 pr-3 py-2 bg-[#F9F6F0] border border-[#E6D3C3] rounded-xl text-xs font-medium text-[#1A120E] placeholder:text-[#8E4F2A]/50 focus:outline-none focus:border-[#8E4F2A]"
                            />
                          </div>
                        </div>

                        {/* Selected Service (Dynamic!) */}
                        <div>
                          <label className="block text-[11px] font-bold text-[#1A120E] mb-1">
                            Selected Service <span className="text-[#8E4F2A]">*</span>
                          </label>
                          <select
                            value={leadService}
                            onChange={(e) => setLeadService(e.target.value)}
                            className="w-full px-3 py-2 bg-[#F9F6F0] border border-[#E6D3C3] rounded-xl text-xs font-bold text-[#1A120E] focus:outline-none focus:border-[#8E4F2A] cursor-pointer"
                          >
                            {CORE_SERVICES.map((s) => (
                              <option key={s.id} value={s.title}>
                                {s.title} ({s.badge})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Project City */}
                        <div>
                          <label className="block text-[11px] font-bold text-[#1A120E] mb-1">
                            Project City / Location
                          </label>
                          <select
                            value={leadCity}
                            onChange={(e) => setLeadCity(e.target.value)}
                            className="w-full px-3 py-2 bg-[#F9F6F0] border border-[#E6D3C3] rounded-xl text-xs font-bold text-[#1A120E] focus:outline-none focus:border-[#8E4F2A] cursor-pointer"
                          >
                            {BIHAR_CITIES.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Plot Area */}
                        <div>
                          <label className="block text-[11px] font-bold text-[#1A120E] mb-1">
                            Plot / Built-up Area (Sq.Ft)
                          </label>
                          <input
                            type="number"
                            value={leadPlotArea}
                            onChange={(e) => setLeadPlotArea(e.target.value)}
                            placeholder="e.g. 2000"
                            className="w-full px-3 py-2 bg-[#F9F6F0] border border-[#E6D3C3] rounded-xl text-xs font-medium text-[#1A120E] placeholder:text-[#8E4F2A]/50 focus:outline-none focus:border-[#8E4F2A]"
                          />
                        </div>

                        {leadError && (
                          <div className="sm:col-span-2">
                            <p className="text-xs text-red-600 font-semibold">{leadError}</p>
                          </div>
                        )}

                        {/* Submit Button */}
                        <div className="sm:col-span-2 pt-2">
                          <button
                            type="submit"
                            disabled={leadSubmitting}
                            className="w-full bg-[#8E4F2A] hover:bg-[#6D3B1E] disabled:opacity-60 text-white font-extrabold text-sm py-3 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {leadSubmitting ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Submitting Enquiry...</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                <span>Submit Free Enquiry for {leadService}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Privacy Footer */}
                  <div className="pt-3 mt-3 border-t border-[#E6D3C3]/60 flex flex-wrap items-center justify-between text-[11px] text-[#4A4A46] gap-2">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#8E4F2A]" />
                      <span>100% Privacy · Direct Engineer Review · No Spam</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveCardTab("showcase")}
                      className="text-[#8E4F2A] font-bold hover:underline cursor-pointer"
                    >
                      ← Back to Explore Showcase
                    </button>
                  </div>
                </div>
              )}
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
