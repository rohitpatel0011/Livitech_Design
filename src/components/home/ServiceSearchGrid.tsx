"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { CORE_SERVICES, ServiceItem } from "@/data/livitectData";

export default function ServiceSearchGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-switch services every 5 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CORE_SERVICES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentService: ServiceItem = CORE_SERVICES[activeIndex];

  const handleSelectService = (idx: number) => {
    setActiveIndex(idx);
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DA5F36]/10 text-[#DA5F36] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>End-to-End Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D0F1B] tracking-tight">
            Complete Architectural & Construction Capabilities
          </h2>
          <p className="text-base sm:text-lg text-[#4B5368] mt-3 leading-relaxed">
            End-to-end building excellence engineered for Patna & Bihar — explore our specialized capabilities from 2D Vastu layouts and structural blueprints to turnkey construction and luxury interiors.
          </p>
        </div>

        {/* Split Left/Right Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT SIDE (6 Cols): Clean Cinematic Showcase with Image + Minimalist Overlay */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#DA5F36]/30 bg-[#0D0F1B] min-h-[480px] lg:min-h-[560px] flex flex-col justify-between group">
            {/* Background Image Carousel with Smooth Fade */}
            {CORE_SERVICES.map((service, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={service.id}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                    isActive ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                  }`}
                >
                  <Image
                    src={service.images[0]}
                    alt={service.title}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              );
            })}

            {/* Subtle Gradient Overlays for High-Contrast Readability without blocking the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F1B] via-[#0D0F1B]/40 to-transparent z-10" />

            {/* Top Bar: Only Badge */}
            <div className="relative z-20 p-6 sm:p-8 flex items-center justify-start">
              <span className="px-3.5 py-1.5 rounded-xl bg-[#DA5F36] text-white text-xs font-bold tracking-wider uppercase shadow-md">
                {currentService.badge}
              </span>
            </div>

            {/* Bottom Content Area Overlaid on Image: Clean & Focused */}
            <div className="relative z-20 p-6 sm:p-8 lg:p-10 space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#8699C1] block">
                  Capability Focus
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug drop-shadow-md">
                  {currentService.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed max-w-xl drop-shadow-sm">
                  {currentService.shortDesc}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex items-center gap-4">
                <Link
                  href={`/services/${currentService.slug}`}
                  className="inline-flex items-center gap-2.5 bg-[#DA5F36] hover:bg-[#BD4922] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer group/btn"
                >
                  <span>Explore {currentService.title}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (6 Cols): 2x3 Grid of 6 Interactive Capability Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between pb-1 px-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#4B5368]">
                Select Capability
              </span>
              <span className="text-[11px] text-[#8699C1] font-semibold">
                Auto-switching every 5s
              </span>
            </div>

            {/* 2x3 Grid (2 Columns, 3 Rows) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 flex-1">
              {CORE_SERVICES.map((srv, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => handleSelectService(idx)}
                    className={`relative w-full text-left p-3 sm:p-4 rounded-2xl transition-all duration-300 flex flex-col justify-between border cursor-pointer ${
                      isActive
                        ? "bg-white border-2 border-[#DA5F36] shadow-lg ring-2 ring-[#DA5F36]/20 scale-[1.02]"
                        : "bg-white/85 border-[#CFDAEC] hover:bg-white hover:border-[#8699C1]"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-3">
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border border-[#CFDAEC] bg-[#0D0F1B]">
                        <Image
                          src={srv.images[0]}
                          alt={srv.title}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-[#DA5F36]/20 border border-[#DA5F36]" />
                        )}
                      </div>
                      <span
                        className={`text-xs font-black px-2 py-0.5 rounded-md ${
                          isActive
                            ? "bg-[#DA5F36] text-white"
                            : "bg-[#F4F6FA] text-[#8699C1]"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                    </div>

                    <div>
                      <h4
                        className={`text-sm sm:text-base font-extrabold line-clamp-1 ${
                          isActive ? "text-[#DA5F36]" : "text-[#0D0F1B]"
                        }`}
                      >
                        {srv.title}
                      </h4>
                      <p className="text-[11px] text-[#4B5368] line-clamp-1 mt-0.5 font-medium">
                        {srv.badge}
                      </p>
                    </div>

                    {isActive && (
                      <div className="absolute bottom-0 left-4 right-4 h-1 bg-[#DA5F36] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
