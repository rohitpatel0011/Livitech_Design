"use client";

import React from "react";
import Image from "next/image";
import {
  Truck,
  CheckCircle2,
  TrendingDown,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { BUILDING_MATERIALS } from "@/data/livitectData";

export default function MaterialsMarketplaceSection() {
  return (
    <section id="materials" className="py-16 lg:py-24 bg-surface-muted border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light text-brand text-xs font-extrabold uppercase tracking-wider mb-2">
              <Truck className="w-3.5 h-3.5" />
              <span>Direct Mill Wholesale Sourcing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              Wholesale Building Materials Marketplace
            </h2>
            <p className="text-base text-ink-muted mt-2 max-w-2xl">
              Cut out local retail middlemen. Procure 100% genuine Tata Tiscon TMT steel, UltraTech cement, kiln-burnt red bricks, and vitrified tiles delivered directly to your site across Bihar.
            </p>
          </div>

          <div className="flex items-center gap-2 p-2 bg-surface rounded-xl border border-border text-xs text-ink font-semibold shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Mill Test Certificate with every dispatch</span>
          </div>
        </div>

        {/* 4 Wholesale Material Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BUILDING_MATERIALS.map((mat) => (
            <div
              key={mat.id}
              className="bg-surface rounded-2xl border border-border hover:border-brand/40 shadow-booking hover:shadow-booking-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Image Header */}
                <div className="relative aspect-[16/11] w-full bg-ink overflow-hidden">
                  <Image
                    src={mat.image}
                    alt={mat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                  {/* Brand Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-brand text-white text-[11px] font-bold">
                      {mat.brand}
                    </span>
                  </div>

                  {/* Savings Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[11px] font-bold shadow">
                      <TrendingDown className="w-3 h-3" />
                      {mat.savings}
                    </span>
                  </div>

                  {/* Unit info */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-semibold text-neutral-300 uppercase tracking-wider block">
                      {mat.category} · {mat.unit}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold truncate">
                      {mat.name}
                    </h3>
                  </div>
                </div>

                {/* Pricing & Grade Details */}
                <div className="p-5 space-y-4">
                  {/* Price Comparison Box */}
                  <div className="p-3 rounded-xl bg-surface-muted border border-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-ink-subtle uppercase block font-semibold">
                        Retail Counter
                      </span>
                      <span className="text-xs text-ink-subtle line-through font-bold">
                        {mat.marketPrice}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-brand uppercase block font-bold">
                        Livitech Wholesale
                      </span>
                      <span className="text-base sm:text-lg font-black text-brand">
                        {mat.livitectWholesalePrice}
                      </span>
                    </div>
                  </div>

                  {/* Verified Grade */}
                  <div className="flex items-start gap-2 text-xs text-ink-muted">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span className="leading-snug">{mat.verifiedGrade}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="px-5 pb-5 pt-1">
                <a
                  href={`https://wa.me/919876543210?text=Hello%20Livitech%20Design,%20I%20want%20wholesale%20rates%20for%20${encodeURIComponent(
                    mat.name
                  )}%20at%20${mat.livitectWholesalePrice}%20(${mat.unit}).%20Please%20share%20delivery%20timeline.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  <span>Order Wholesale Batch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Wholesale Truck Delivery Notice */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-brand shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-ink">
                Bulk Dispatch Across Bihar, Jharkhand, UP & MP
              </h4>
              <p className="text-xs text-ink-muted">
                Minimum order quantities apply. Every shipment comes with digital weighbridge slips and test reports.
              </p>
            </div>
          </div>

          <a
            href="tel:+919876543210"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-surface-muted hover:bg-brand hover:text-white text-ink text-xs font-bold border border-border transition-all shrink-0 cursor-pointer"
          >
            <span>Call Sourcing Desk</span>
          </a>
        </div>
      </div>
    </section>
  );
}
