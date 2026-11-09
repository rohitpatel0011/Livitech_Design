"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { CORE_SERVICES, SERVICES_SECTION_INTRO, ServiceItem } from "@/data/livitectData";

export default function ServiceSearchGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  // Auto-slide services every 5 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CORE_SERVICES.length);
      setImgIndex(0); // Reset image index on tab switch
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentService: ServiceItem = CORE_SERVICES[activeIndex];

  const handleTabChange = (idx: number) => {
    setActiveIndex(idx);
    setImgIndex(0);
    setIsPaused(true);
  };

  return (
    <section 
      id="services" 
      className="py-16 lg:py-24 bg-[#F9F6F0] border-b border-[#E6D3C3]/40"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E6D3C3]/50 text-[#8E4F2A] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{SERVICES_SECTION_INTRO.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A120E] mt-3">
            {SERVICES_SECTION_INTRO.title}
          </h2>
          <p className="text-sm sm:text-base text-[#4A4A46] mt-3 leading-relaxed">
            {SERVICES_SECTION_INTRO.description}
          </p>
        </div>

        {/* Interactive Navigation Tabs Bar */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CORE_SERVICES.map((srv, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={srv.id}
                type="button"
                onClick={() => handleTabChange(idx)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#8E4F2A] text-white shadow-md scale-105"
                    : "bg-white text-[#4A4A46] border border-[#E6D3C3] hover:border-[#8E4F2A]"
                }`}
              >
                {srv.title}
              </button>
            );
          })}
        </div>

        {/* Dynamic Split Spotlight Card */}
        <div className="bg-white rounded-3xl border-2 border-[#8E4F2A]/30 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left Column (6 Cols): Large Image Slider */}
          <div className="lg:col-span-6 relative aspect-[16/10] bg-[#1A120E] overflow-hidden group">
            <Image
              src={currentService.images[imgIndex]}
              alt={currentService.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A120E]/80 via-transparent to-black/20" />

            {/* Badge */}
            <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-[#8E4F2A] text-white text-xs font-bold shadow">
              {currentService.badge}
            </span>

            {/* Counter */}
            <span className="absolute top-4 right-4 px-2.5 py-1 rounded bg-black/60 text-white text-xs font-semibold backdrop-blur-sm">
              {imgIndex + 1} / {currentService.images.length}
            </span>

            {/* Prev/Next Image Controls */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setImgIndex((prev) => (prev === 0 ? currentService.images.length - 1 : prev - 1));
                setIsPaused(true);
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-[#8E4F2A] text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setImgIndex((prev) => (prev + 1) % currentService.images.length);
                setIsPaused(true);
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-[#8E4F2A] text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {currentService.images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setImgIndex(i);
                    setIsPaused(true);
                  }}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === imgIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column (6 Cols): Content & Deliverables */}
          <div className="lg:col-span-6 p-8 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#8E4F2A] block">
                Service 0{activeIndex + 1} of 0{CORE_SERVICES.length}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A120E]">
                {currentService.title}
              </h3>
              <p className="text-sm sm:text-base text-[#4A4A46] leading-relaxed">
                {currentService.shortDesc}
              </p>

              {/* Deliverables Checklist */}
              <div className="space-y-2.5 pt-4 border-t border-[#E6D3C3]/60">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A120E] block">
                  Key Scope & Deliverables:
                </span>
                {currentService.deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#8E4F2A] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-[#1A120E]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action CTA */}
            <div className="pt-6 border-t border-[#E6D3C3]/60 flex items-center justify-between gap-4">
              <Link
                href={`/services/${currentService.slug}`}
                className="inline-flex items-center gap-2 bg-[#8E4F2A] hover:bg-[#6D3B1E] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-sm transition-all"
              >
                <span>Explore {currentService.title.split(" ")[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-xs text-[#4A4A46] hidden sm:block">
                Turnkey & Verified Specs ✓
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
