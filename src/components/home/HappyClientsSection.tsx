"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Star,
  ShieldCheck,
  MapPin,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { HAPPY_CLIENTS } from "@/data/livitectData";

export default function HappyClientsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "Modern Villas", "Duplex Homes", "Commercial"];

  const filteredClients = HAPPY_CLIENTS.filter((client) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Modern Villas")
      return client.projectType.toLowerCase().includes("villa");
    if (activeFilter === "Duplex Homes")
      return client.projectType.toLowerCase().includes("duplex");
    if (activeFilter === "Commercial")
      return client.projectType.toLowerCase().includes("commercial");
    return true;
  });

  return (
    <section
      id="happy-clients"
      aria-labelledby="happy-clients-heading"
      className="scroll-mt-24 py-16 lg:py-24 bg-surface border-b border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2
              id="happy-clients-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight"
            >
              Our Happy Clients
            </h2>
            <p className="text-base sm:text-lg text-ink-muted mt-2 max-w-2xl leading-relaxed">
              Real homeowner experiences and verified building reviews across Bihar with{" "}
              <strong className="text-brand font-bold">
                livitechdesign.in
              </strong>
              . Real houses, Vastu 2D/3D elevations, and turnkey handovers.
            </p>
          </div>

          {/* Trust Stat Pills */}
          <div className="flex items-center gap-4 shrink-0 bg-surface-muted p-3.5 rounded-2xl border border-border">
            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1 text-amber-500 font-black text-lg">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span>5.0</span>
              </div>
              <span className="text-[11px] font-semibold text-ink-subtle">
                Google & Direct Rating
              </span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center px-2">
              <span className="text-lg font-black text-brand block leading-tight">
                100%
              </span>
              <span className="text-[11px] font-semibold text-ink-subtle">
                Vastu & Structural Assured
              </span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between gap-4 pb-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeFilter === cat
                    ? "bg-brand text-white shadow-sm"
                    : "bg-surface-muted text-ink-muted hover:bg-neutral-200 border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredClients.map((client) => {
            const waInquiry = encodeURIComponent(
              `Hello Livitech Design (livitechdesign.in), I saw the project of ${client.name} (${client.projectType} in ${client.location}). I have a plot in Bihar and would like a similar architectural design.`
            );

            return (
              <article
                key={client.id}
                className="group bg-surface rounded-3xl border border-border hover:border-brand/40 shadow-booking hover:shadow-booking-hover transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Real Finished House Photo Banner */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
                    <Image
                      src={client.houseImage}
                      alt={`${client.projectType} designed by livitechdesign.in for ${client.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top Specs Pill */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-brand text-white text-[11px] font-bold shadow-sm">
                        {client.area} · {client.deliveredYear}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-brand-light" />
                        {client.location}
                      </span>
                    </div>

                    {/* Bottom Project Type Title on Image */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-white font-extrabold text-sm sm:text-base drop-shadow-sm line-clamp-1">
                        {client.projectType}
                      </span>
                    </div>
                  </div>

                  {/* Client Info & Testimonial Body */}
                  <div className="p-5 sm:p-6 space-y-4">
                    {/* Star Rating & Verified Pill */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Verified Client
                      </span>
                    </div>

                    {/* Review Quote */}
                    <blockquote className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-4 italic">
                      &ldquo;{client.review}&rdquo;
                    </blockquote>

                    {/* Client Identity Header */}
                    <div className="flex items-center gap-3 pt-3 border-t border-border">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-brand/30">
                        <Image
                          src={client.clientImage}
                          alt={client.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-extrabold text-ink truncate group-hover:text-brand transition-colors">
                          {client.name}
                        </h3>
                        <p className="text-[11px] text-ink-subtle truncate">
                          {client.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="px-5 sm:px-6 pb-5 pt-0">
                  <a
                    href={`https://wa.me/919876543210?text=${waInquiry}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-surface-muted hover:bg-brand-light text-ink hover:text-brand text-xs font-bold border border-border hover:border-brand/30 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-brand" />
                    <span>Inquire About Similar Design</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Section Bottom Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-brand-light/70 border border-brand/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-black text-ink">
              Ready to create your dream home elevation with livitechdesign.in?
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted">
              Get Vastu-compliant 2D layout and photorealistic 3D elevations crafted by licensed Patna architects.
            </p>
          </div>
          <a
            href="https://wa.me/919876543210?text=Hello%20Livitech%20Design%20(livitechdesign.in),%20I%20want%20to%20consult%20for%20my%20new%20house%20elevation%20and%20architectural%20plan."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand hover:bg-brand-dark text-white font-extrabold text-xs sm:text-sm shadow-booking transition-all shrink-0 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Consult an Architect Today</span>
          </a>
        </div>
      </div>
    </section>
  );
}
