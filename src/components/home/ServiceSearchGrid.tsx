"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
} from "lucide-react";
import {
  CORE_SERVICES,
  SERVICES_SECTION_INTRO,
  ServiceItem,
} from "@/data/livitectData";

function VisualServiceCard({ service }: { service: ServiceItem }) {
  const [imgIndex, setImgIndex] = useState(0);

  const prevImg = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((prev) =>
      prev === 0 ? service.images.length - 1 : prev - 1
    );
  };

  const nextImg = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((prev) => (prev + 1) % service.images.length);
  };

  return (
    <article className="group bg-surface rounded-2xl border border-border hover:border-brand/40 shadow-booking hover:shadow-booking-hover transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top 1/3 Image Carousel Header */}
      <div className="relative aspect-[16/10] w-full bg-ink overflow-hidden">
        <Link href={`/services/${service.slug}`} className="block w-full h-full">
          <Image
            src={service.images[imgIndex]}
            alt={`${service.title} preview ${imgIndex + 1}`}
            fill
            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 45vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />
        </Link>

        {/* Top-Left Spec Badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-brand text-white text-[11px] font-bold tracking-wide pointer-events-none shadow">
          {service.badge}
        </span>

        {/* Top-Right Slide Counter (1 / 3) */}
        <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/65 text-white text-[11px] font-semibold backdrop-blur-sm pointer-events-none">
          {imgIndex + 1} / {service.images.length}
        </span>

        {/* Left/Right Slider Arrows */}
        <button
          type="button"
          onClick={prevImg}
          aria-label="Previous image"
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/55 hover:bg-brand text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={nextImg}
          aria-label="Next image"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/55 hover:bg-brand text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Bottom Dots */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {service.images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setImgIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === imgIndex ? "w-5 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link href={`/services/${service.slug}`}>
            <h3 className="text-xl font-extrabold text-ink group-hover:text-brand transition-colors">
              {service.title}
            </h3>
          </Link>
          <p className="text-xs sm:text-sm text-ink-muted mt-2 leading-relaxed">
            {service.shortDesc}
          </p>

          {/* 3 Key Highlights */}
          <ul className="mt-4 pt-3.5 border-t border-border space-y-2">
            {service.deliverables.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-xs font-semibold text-ink"
              >
                <Check className="w-3.5 h-3.5 text-brand shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Linked CTA to Internal Service Page */}
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center justify-between w-full pt-3.5 border-t border-border text-xs sm:text-sm font-extrabold text-brand group-hover:text-brand-dark"
        >
          <span>{service.ctaText}</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

export default function ServiceSearchGrid() {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-16 lg:py-24 bg-surface-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Your Exact Copy */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-light text-brand text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{SERVICES_SECTION_INTRO.eyebrow}</span>
          </div>
          <h2 id="services-heading" className="text-3xl sm:text-4xl font-extrabold text-ink mt-3">
            {SERVICES_SECTION_INTRO.title}
          </h2>
          <p className="text-sm sm:text-base text-ink-muted mt-3 leading-relaxed">
            {SERVICES_SECTION_INTRO.description}
          </p>
        </div>

        {/* Balanced 3x2 Grid of 6 Core Construction Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {CORE_SERVICES.map((service) => (
            <VisualServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
