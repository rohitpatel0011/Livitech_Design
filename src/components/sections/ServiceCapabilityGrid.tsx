"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function ServiceCapabilityGrid() {
  return (
    <section
      id="services"
      className="scroll-mt-24 w-full py-20 lg:py-28 bg-[#F4F6FA] border-b border-[#CFDAEC] text-[#0D0F1B]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= TOP HEADER ================= */}
        <div className="mb-12 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0D0F1B]">
              Architecture, Engineering &amp;{" "}
              <span className="text-[#DA5F36]">Site Execution</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4B5368] mt-3 leading-relaxed">
              End-to-end building excellence engineered for Patna &amp; Bihar — explore our specialized capabilities from 2D Vastu layouts and structural blueprints to turnkey construction and luxury interiors.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-bold text-[#6478A3] bg-white border border-[#CFDAEC] px-3.5 py-2 rounded-xl shadow-2xs shrink-0 self-start sm:self-auto">
            <Sparkles className="w-4 h-4 text-[#DA5F36]" />
            <span>6 Turnkey Engineering Verticals</span>
          </div>
        </div>

        {/* ================= BENTO GRID ================= */}
        <div className="space-y-5">
          
          {/* TOP ROW: 2-Column Split (Left Hero 7-Cols + Right Stacked 5-Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* ================= CARD 1: Large Residential Hero (7 Cols) ================= */}
            <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-[#CFDAEC] bg-[#0D0F1B] min-h-[540px] lg:min-h-[600px] flex flex-col justify-between shadow-md hover:shadow-2xl hover:border-[#DA5F36] group transition-all duration-500">
              {/* Background Full Bleed Image */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  src="/images/services/service-residential.jpg"
                  alt="Residential Construction in Patna"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Rich Linear Gradient (Dark at bottom, clear at top) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F1B] via-[#0D0F1B]/80 via-45% to-transparent pointer-events-none" />

              {/* Top Row: Spec Badges */}
              <div className="relative z-20 p-5 sm:p-7 flex items-center justify-between gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-[#DA5F36] text-white text-xs font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  G+1 to G+4
                </span>
                <span className="bg-[#0D0F1B]/75 backdrop-blur-md border border-white/20 text-white/95 text-[11px] font-mono px-3 py-1 rounded-full shadow-xs">
                  Ongoing Site Execution
                </span>
              </div>

              {/* Bottom Content Area: Seamlessly on Linear Gradient */}
              <div className="relative z-20 p-6 sm:p-8 space-y-4">
                <div className="space-y-1.5">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#DA5F36] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DA5F36]" />
                    Turnkey Luxury Villas &amp; Duplexes
                  </p>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight drop-shadow-sm group-hover:text-[#F38A65] transition-colors">
                    Residential Construction
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed max-w-xl">
                    End-to-end villa construction in Patna with premium red brick masonry, structural anti-seismic beam layout, and milestone-linked escrow payment terms.
                  </p>
                </div>

                {/* Scope Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Soil Testing & Foundation", "Grade-43/53 RCC Work", "Finishing Handover in 180 Days"].map((item) => (
                    <span
                      key={item}
                      className="text-xs bg-white/10 backdrop-blur-md border border-white/15 text-white/90 font-medium px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DA5F36] shrink-0" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>

                {/* Action CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="https://wa.me/918709635920?text=Hi%20Livitech%20Design,%20I%20am%20interested%20in%20Residential%20Construction."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#DA5F36] hover:bg-[#BD4922] text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-xl transition-all shadow-md hover:shadow-lg shadow-[#DA5F36]/30 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Discuss Project</span>
                  </a>
                  <Link
                    href="/services/residential-construction"
                    className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold py-3 px-5 rounded-xl transition-all shadow-xs cursor-pointer group/link"
                  >
                    <span>View Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* ================= RIGHT COLUMN (5 Cols): Stacked Cards ================= */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-5">
              
              {/* CARD 2: Commercial Construction (Top Wide) */}
              <Link
                href="/services/commercial-construction"
                className="relative rounded-3xl overflow-hidden border border-[#CFDAEC] bg-[#0D0F1B] min-h-[270px] sm:min-h-[290px] flex flex-col justify-between shadow-md hover:shadow-2xl hover:border-[#DA5F36] group transition-all duration-500 cursor-pointer"
              >
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <Image
                    src="/images/services/service-commercial.jpg"
                    alt="Commercial Construction in Patna"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Linear Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F1B] via-[#0D0F1B]/80 via-50% to-transparent pointer-events-none" />

                {/* Top Row: Badge & Arrow */}
                <div className="relative z-20 p-5 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#DA5F36] text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                    PMC Compliant
                  </span>
                  <span className="w-8 h-8 rounded-full bg-[#0D0F1B]/75 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#DA5F36] group-hover:border-[#DA5F36] transition-all shadow-xs">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                {/* Bottom Content: Directly on Linear Gradient */}
                <div className="relative z-20 p-5 sm:p-6 space-y-1.5">
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#DA5F36]">
                    Retail Plazas &amp; Office Complexes
                  </p>
                  <h4 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#F38A65] transition-colors leading-snug drop-shadow-sm">
                    Commercial Construction
                  </h4>
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-xs text-neutral-300 font-normal line-clamp-1">
                      Curtain glass facade • Ramp parking • Fire NOC
                    </p>
                    <span className="text-xs font-bold text-[#DA5F36] group-hover:text-white shrink-0 ml-2 inline-flex items-center gap-1 transition-colors">
                      Explore Specs <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* BOTTOM SPLIT ROW: Maintenance & Interior (2 Cols) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
                
                {/* CARD 3: Maintenance Service */}
                <Link
                  href="/services/maintenance-service"
                  className="relative rounded-3xl overflow-hidden border border-[#CFDAEC] bg-[#0D0F1B] min-h-[250px] flex flex-col justify-between shadow-md hover:shadow-2xl hover:border-[#DA5F36] group transition-all duration-500 cursor-pointer"
                >
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <Image
                      src="/images/services/service-maintenance.jpg"
                      alt="Maintenance Service in Bihar"
                      fill
                      sizes="(max-width: 640px) 100vw, 21vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Linear Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F1B] via-[#0D0F1B]/80 via-50% to-transparent pointer-events-none" />

                  <div className="relative z-20 p-4 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-[#DA5F36] text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                      10-Yr Warranty
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#0D0F1B]/75 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#DA5F36] group-hover:border-[#DA5F36] transition-all shadow-xs">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-20 p-4 sm:p-5 space-y-1">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#DA5F36]">
                      Structural &amp; Waterproofing
                    </p>
                    <h4 className="text-base sm:text-lg font-black text-white group-hover:text-[#F38A65] transition-colors leading-snug">
                      Maintenance Service
                    </h4>
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <span className="text-neutral-300 font-normal truncate">Seepage &amp; Crack Fix</span>
                      <span className="font-bold text-[#DA5F36] group-hover:text-white shrink-0 ml-1 inline-flex items-center gap-0.5 transition-colors">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>

                {/* CARD 4: Interior Design */}
                <Link
                  href="/services/interior-design"
                  className="relative rounded-3xl overflow-hidden border border-[#CFDAEC] bg-[#0D0F1B] min-h-[250px] flex flex-col justify-between shadow-md hover:shadow-2xl hover:border-[#DA5F36] group transition-all duration-500 cursor-pointer"
                >
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <Image
                      src="/images/services/service-interior.jpg"
                      alt="Interior Design in Patna"
                      fill
                      sizes="(max-width: 640px) 100vw, 21vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Linear Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F1B] via-[#0D0F1B]/80 via-50% to-transparent pointer-events-none" />

                  <div className="relative z-20 p-4 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-[#DA5F36] text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                      Factory-Made
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#0D0F1B]/75 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#DA5F36] group-hover:border-[#DA5F36] transition-all shadow-xs">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-20 p-4 sm:p-5 space-y-1">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#DA5F36]">
                      Bespoke Turnkey Interiors
                    </p>
                    <h4 className="text-base sm:text-lg font-black text-white group-hover:text-[#F38A65] transition-colors leading-snug">
                      Interior Design
                    </h4>
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <span className="text-neutral-300 font-normal truncate">Modular Kitchens &amp; 3D</span>
                      <span className="font-bold text-[#DA5F36] group-hover:text-white shrink-0 ml-1 inline-flex items-center gap-0.5 transition-colors">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>

              </div>
            </div>

          </div>

          {/* ================= BOTTOM ROW: 2 Equal Columns (Card 5 + Card 6) ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* CARD 5: Architectural Services */}
            <Link
              href="/services/architectural-services"
              className="relative rounded-3xl overflow-hidden border border-[#CFDAEC] bg-[#0D0F1B] min-h-[270px] sm:min-h-[290px] flex flex-col justify-between shadow-md hover:shadow-2xl hover:border-[#DA5F36] group transition-all duration-500 cursor-pointer"
            >
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  src="/images/services/service-architectural.jpg"
                  alt="Architectural Services in Patna"
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Linear Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F1B] via-[#0D0F1B]/80 via-50% to-transparent pointer-events-none" />

              {/* Top Bar: Badge & Action Indicator */}
              <div className="relative z-20 p-5 sm:p-6 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#DA5F36] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  Vastu 100%
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#0D0F1B]/75 backdrop-blur-md border border-white/20 text-white group-hover:bg-[#DA5F36] group-hover:border-[#DA5F36] transition-all shadow-xs px-3.5 py-1.5 rounded-full text-xs font-bold">
                  <span>View Plans</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-20 p-5 sm:p-6 space-y-1.5">
                <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#DA5F36]">
                  2D Vastu Plans &amp; 3D Elevations
                </p>
                <h4 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#F38A65] transition-colors leading-snug drop-shadow-sm">
                  Architectural Services
                </h4>
                <p className="text-xs text-neutral-300 font-normal line-clamp-1">
                  2D Detailed Working Drawings • BIM 3D Renders • PMC Map Sanction Sets
                </p>
              </div>
            </Link>

            {/* CARD 6: Contractor Services */}
            <Link
              href="/services/contractor-services"
              className="relative rounded-3xl overflow-hidden border border-[#CFDAEC] bg-[#0D0F1B] min-h-[270px] sm:min-h-[290px] flex flex-col justify-between shadow-md hover:shadow-2xl hover:border-[#DA5F36] group transition-all duration-500 cursor-pointer"
            >
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  src="/images/services/service-contractor.jpg"
                  alt="Contractor Services in Bihar"
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Linear Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F1B] via-[#0D0F1B]/80 via-50% to-transparent pointer-events-none" />

              {/* Top Bar: Badge & Action Indicator */}
              <div className="relative z-20 p-5 sm:p-6 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#DA5F36] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  Tata Tiscon Steel
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#0D0F1B]/75 backdrop-blur-md border border-white/20 text-white group-hover:bg-[#DA5F36] group-hover:border-[#DA5F36] transition-all shadow-xs px-3.5 py-1.5 rounded-full text-xs font-bold">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-20 p-5 sm:p-6 space-y-1.5">
                <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#DA5F36]">
                  Certified Civil Execution (440+)
                </p>
                <h4 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#F38A65] transition-colors leading-snug drop-shadow-sm">
                  Contractor Services
                </h4>
                <p className="text-xs text-neutral-300 font-normal line-clamp-1">
                  Slump &amp; Cube Testing • Bar Bending Supervision • Daily Digital Site Logs
                </p>
              </div>
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}
