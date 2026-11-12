"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  X,
  MessageSquare,
  Layers,
  ChevronRight,
  Maximize2,
  FileText,
} from "lucide-react";
import { EXTERIOR_DESIGNS, ExteriorDesignPost } from "@/data/livitectData";

export default function ExteriorDesignsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedPost, setSelectedPost] = useState<ExteriorDesignPost | null>(null);
  const [activeModalImgIdx, setActiveModalImgIdx] = useState(0);

  const categories = [
    "All",
    "Modern Villa",
    "G+1 & G+2 Elevation",
    "Luxury Facade",
    "Commercial & Apartment",
    "Color Palettes",
    "Design Guide",
  ];

  const filteredPosts = EXTERIOR_DESIGNS.filter((post) => {
    if (activeCategory === "All") return true;
    return post.category === activeCategory;
  });

  const openModal = (post: ExteriorDesignPost) => {
    setSelectedPost(post);
    setActiveModalImgIdx(0);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <section
      id="exterior-designs"
      aria-labelledby="exterior-designs-heading"
      className="scroll-mt-24 py-16 lg:py-24 bg-surface-muted/60 border-b border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2
              id="exterior-designs-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight"
            >
              Exterior Designs & Elevations
            </h2>
            <p className="text-base sm:text-lg text-ink-muted mt-2 max-w-2xl leading-relaxed">
              Explore 60+ architectural elevation concepts, modern facade designs, and structural inspirations crafted for Bihar homes by{" "}
              <strong className="text-brand font-bold">
                livitechdesign.in
              </strong>
              .
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/919876543210?text=Hello%20Livitech%20Design%20(livitechdesign.in),%20I%20want%20to%20get%20a%20custom%203D%20elevation%20designed%20for%20my%20house%20plot."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
            >
              <span>Get Custom 3D Elevation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 pb-6 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-brand text-white shadow-sm"
                  : "bg-surface text-ink-muted hover:bg-surface-muted border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 6-Card Responsive Elevation Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-surface rounded-3xl border border-border hover:border-brand/40 shadow-booking hover:shadow-booking-hover transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Elevation Cover Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                  {/* Top Category Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-md bg-brand text-white text-[11px] font-bold shadow-sm">
                    {post.category}
                  </span>

                  {/* Quick Expand Button */}
                  <button
                    type="button"
                    onClick={() => openModal(post)}
                    aria-label={`View full elevation details for ${post.title}`}
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/60 hover:bg-brand text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  {/* Bottom Plot Recommendation */}
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <span className="text-[11px] font-medium text-white/90 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                      Recommended: {post.plotSizesRecommended}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 space-y-3.5">
                  {/* Meta Bar: Date & Read Time */}
                  <div className="flex items-center gap-3 text-xs text-ink-subtle">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand" />
                      {post.publishDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => openModal(post)}
                    className="text-base sm:text-lg font-black text-ink group-hover:text-brand transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Highlights Checklist */}
                  <ul className="pt-2 border-t border-border space-y-1.5 text-xs text-ink-muted">
                    {post.highlights.slice(0, 2).map((hl, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" />
                        <span className="truncate">{hl}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Style Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.styleTags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-surface-muted text-[10px] font-semibold text-ink-subtle border border-border"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-5 sm:p-6 pt-0 flex items-center justify-between gap-3 border-t border-border mt-2 pt-3">
                <button
                  type="button"
                  onClick={() => openModal(post)}
                  className="text-xs font-bold text-ink-muted hover:text-brand transition-colors cursor-pointer"
                >
                  Quick Preview
                </button>
                <Link
                  href={`/exterior-designs/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-brand hover:text-brand-dark transition-colors"
                >
                  <span>Read Guide</span>
                  <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* BOTTOM ELEVATION MODAL / LIGHTBOX */}
        {selectedPost && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-elevation-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          >
            <div className="bg-surface rounded-3xl border border-border max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close elevation preview"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-brand text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image Carousel Preview */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-ink">
                <Image
                  src={selectedPost.elevationGallery[activeModalImgIdx] || selectedPost.coverImage}
                  alt={selectedPost.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md bg-brand text-white text-xs font-bold shadow-sm">
                    {selectedPost.category}
                  </span>
                </div>
              </div>

              {/* Thumbnails Row */}
              {selectedPost.elevationGallery.length > 1 && (
                <div className="flex items-center gap-2 p-3 bg-surface-muted border-b border-border overflow-x-auto">
                  {selectedPost.elevationGallery.map((img, idx) => (
                    <button
                      key={img + idx}
                      type="button"
                      onClick={() => setActiveModalImgIdx(idx)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        idx === activeModalImgIdx
                          ? "border-brand ring-2 ring-brand/30"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt="Elevation view thumbnail"
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Modal Body Content */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-ink-subtle mb-1">
                    <span>{selectedPost.publishDate}</span>
                    <span>•</span>
                    <span>{selectedPost.readTime}</span>
                    <span>•</span>
                    <span className="font-semibold text-brand">livitechdesign.in</span>
                  </div>
                  <h2
                    id="modal-elevation-title"
                    className="text-xl sm:text-2xl font-black text-ink"
                  >
                    {selectedPost.title}
                  </h2>
                  <p className="text-sm text-ink-muted mt-2 leading-relaxed">
                    {selectedPost.subtitle}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface-muted border border-border space-y-3">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-ink uppercase tracking-wider">
                    <Layers className="w-4 h-4 text-brand" />
                    <span>Architectural Specifications:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-muted">
                    {selectedPost.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-border text-xs text-ink-subtle font-medium">
                    <strong>Recommended Plot Dimensions:</strong> {selectedPost.plotSizesRecommended}
                  </div>
                </div>

                {/* Excerpt Body */}
                <div className="text-xs sm:text-sm text-ink-muted leading-relaxed space-y-2">
                  <p>{selectedPost.excerpt}</p>
                  <p>
                    Har elevation design Bihar ke local climate (garmi aur monsoon)
                    ke mutabiq moisture-resistant materials, deep chhajjas aur
                    energy-efficient daylighting ke sath plan kiya jata hai.
                  </p>
                </div>

                {/* Modal CTA Buttons */}
                <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={`https://wa.me/919876543210?text=Hello%20Livitech%20Design%20(livitechdesign.in),%20I%20am%20interested%20in%20the%20elevation%20concept:%20${encodeURIComponent(
                      selectedPost.title
                    )}.%20Please%20share%20custom%20quotation%20for%20my%20plot.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-brand hover:bg-brand-dark text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-booking transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Get Elevation on WhatsApp</span>
                  </a>
                  <Link
                    href={`/exterior-designs/${selectedPost.slug}`}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl bg-surface-muted hover:bg-neutral-200 border border-border text-ink font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-brand" />
                    <span>Read Full Guide</span>
                  </Link>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl border border-border bg-surface hover:bg-surface-muted text-ink font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
