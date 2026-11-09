"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { FEATURED_PROJECTS, ProjectItem } from "@/data/livitectData";

function ProjectCard({ project }: { project: ProjectItem }) {
  const [currentImg, setCurrentImg] = useState(0);

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImg((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImg((prev) => (prev + 1) % project.images.length);
  };

  return (
    <div className="group bg-surface rounded-2xl border border-border hover:border-brand/40 overflow-hidden shadow-booking hover:shadow-booking-hover transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Project Image Slider */}
        <div className="relative aspect-[16/11] w-full bg-ink overflow-hidden">
          <Image
            src={project.images[currentImg]}
            alt={`${project.title} slide ${currentImg + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

          {/* Tag Pill */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-md bg-brand text-white text-[11px] font-bold tracking-wide">
              {project.tag}
            </span>
          </div>

          {/* Slide indicator */}
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold">
            {currentImg + 1} / {project.images.length}
          </div>

          {/* Slider Arrow Buttons */}
          <button
            type="button"
            onClick={prevImage}
            aria-label="Previous Project Photo"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 hover:bg-brand text-white flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextImage}
            aria-label="Next Project Photo"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 hover:bg-brand text-white flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Location & Title on bottom of image */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-brand-light" />
              <span>{project.location}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold leading-snug mt-0.5 line-clamp-1">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Content & Metrics */}
        <div className="p-5 space-y-3">
          <p className="text-xs text-ink-muted leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border text-center">
            <div className="p-2 rounded-lg bg-surface-muted">
              <span className="text-[10px] uppercase text-ink-subtle block font-semibold">
                Area
              </span>
              <span className="text-xs font-bold text-ink truncate block">
                {project.area}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-surface-muted">
              <span className="text-[10px] uppercase text-ink-subtle block font-semibold">
                Budget
              </span>
              <span className="text-xs font-bold text-brand truncate block">
                {project.budget}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-surface-muted">
              <span className="text-[10px] uppercase text-ink-subtle block font-semibold">
                Duration
              </span>
              <span className="text-xs font-bold text-ink truncate block">
                {project.duration}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="px-5 pb-5">
        <a
          href={`https://wa.me/919876543210?text=Hello%20Livitech%20Design%20(livitechdesign.in),%20I%20saw%20your%20project%20${encodeURIComponent(
            project.title
          )}%20in%20${encodeURIComponent(
            project.location
          )}.%20Can%20I%20see%20more%20details%20or%20visit%20a%20similar%20site?`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-surface-muted hover:bg-brand hover:text-white text-ink text-xs font-bold transition-all group/btn cursor-pointer"
        >
          <span>Request Site Walkthrough</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}

export default function FeaturedProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filterTabs = ["All", "Residential", "Commercial", "Interior", "Turnkey"];

  const filtered =
    activeFilter === "All"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-16 lg:py-24 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light text-brand text-xs font-extrabold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Portfolio in Bihar
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              Featured Projects. Real Sites, Real Handover.
            </h2>
            <p className="text-base text-ink-muted mt-2 max-w-2xl">
              From contemporary residential duplex villas in Kankarbagh to structural commercial complexes on Bailey Road. Explore photos of actual site progress and completed handovers.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-surface-muted rounded-xl border border-border shrink-0">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === tab
                    ? "bg-brand text-white shadow-sm"
                    : "text-ink-muted hover:text-ink hover:bg-neutral-200/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </div>
    </section>
  );
}
