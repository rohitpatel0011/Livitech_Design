"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { CORE_SERVICES, ServiceItem } from "@/data/livitectData";

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
      className="scroll-mt-24 py-16 lg:py-24 bg-[#F4F6FA] border-b border-[#CFDAEC]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D0F1B] tracking-tight">
            Complete Architectural & Construction Capabilities
          </h2>
          <p className="text-base sm:text-lg text-[#4B5368] mt-3 leading-relaxed">
            End-to-end building excellence engineered for Patna & Bihar — explore our specialized capabilities from 2D Vastu layouts and structural blueprints to turnkey construction and luxury interiors.
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
                    ? "bg-[#DA5F36] text-white shadow-md scale-105"
                    : "bg-white text-[#4B5368] border border-[#CFDAEC] hover:border-[#DA5F36]"
                }`}
              >
                {srv.title}
              </button>
            );
          })}
        </div>

        {/* Dynamic Split Spotlight Card */}
        <div className="bg-white rounded-3xl border-2 border-[#DA5F36]/30 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left Column (6 Cols): Large Image Slider */}
          <div className="lg:col-span-6 relative aspect-[16/10] bg-[#0D0F1B] overflow-hidden group">
            <Image
              src={currentService.images[imgIndex]}
              alt={currentService.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F1B]/80 via-transparent to-black/20" />

            {/* Badge */}
            <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-[#DA5F36] text-white text-xs font-bold shadow">
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
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-[#DA5F36] text-white flex items-center justify-center transition-colors cursor-pointer"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-[#DA5F36] text-white flex items-center justify-center transition-colors cursor-pointer"
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
                    i === imgIndex ? "w-6 bg-[#DA5F36]" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column (6 Cols): Content & Deliverables */}
          <div className="lg:col-span-6 p-8 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#DA5F36] block">
                Service 0{activeIndex + 1} of 0{CORE_SERVICES.length}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D0F1B]">
                {currentService.title}
              </h3>
              <p className="text-sm sm:text-base text-[#4B5368] leading-relaxed">
                {currentService.shortDesc}
              </p>

              {/* Deliverables Checklist */}
              <div className="space-y-2.5 pt-4 border-t border-[#CFDAEC]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0D0F1B] block">
                  Key Scope & Deliverables:
                </span>
                {currentService.deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#DA5F36] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-[#0D0F1B]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action CTA */}
            <div className="pt-6 border-t border-[#CFDAEC] flex items-center justify-between gap-4">
              <Link
                href={`/services/${currentService.slug}`}
                className="inline-flex items-center gap-2 bg-[#DA5F36] hover:bg-[#BD4922] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-sm transition-all"
              >
                <span>Explore {currentService.title.split(" ")[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-xs text-[#4B5368] hidden sm:block">
                Turnkey & Verified Specs ✓
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
