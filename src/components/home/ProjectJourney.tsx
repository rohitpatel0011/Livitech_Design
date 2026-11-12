"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { PROJECT_JOURNEY_STEPS } from "@/data/livitectData";

export default function ProjectJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const current = PROJECT_JOURNEY_STEPS[activeStep];

  return (
    <section id="how-it-works" className="scroll-mt-24 py-16 lg:py-24 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
            One platform. Every step of your project.
          </h2>
          <p className="text-base sm:text-lg text-ink-muted mt-3 max-w-2xl mx-auto leading-relaxed">
            End-to-end execution from concept to handover — no need to coordinate between separate architects, contractors, and material vendors. Livitech Design manages your complete building journey in 5 seamless steps.
          </p>
        </div>

        {/* 5 Horizontal Step Tabs (01 to 05) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {PROJECT_JOURNEY_STEPS.map((step, index) => {
            const isSelected = index === activeStep;
            return (
              <button
                key={step.stepNumber}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-brand text-white border-brand shadow-md"
                    : "bg-surface-muted/60 hover:bg-brand-light/40 text-ink border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-extrabold uppercase tracking-wider ${
                      isSelected ? "text-brand-light" : "text-brand"
                    }`}
                  >
                    Step {step.stepNumber}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 ${
                      isSelected ? "text-white" : "text-ink-subtle"
                    }`}
                  />
                </div>
                <p className="text-sm sm:text-base font-extrabold mt-1">
                  {step.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Step Visual Showcase Card */}
        <div className="bg-surface-muted rounded-2xl border border-border p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Details & Deliverables (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand">
              <span>Stage {current.stepNumber} of 05</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-ink">
              {current.title}
            </h3>
            <p className="text-sm sm:text-base text-ink-muted font-medium">
              {current.subtitle}
            </p>

            <div className="space-y-3 pt-2">
              {current.items.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 bg-surface p-3.5 rounded-xl border border-border"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand shrink-0" />
                  <span className="text-sm font-bold text-ink">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#cost-estimator"
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white text-sm font-bold px-5 py-3 rounded-xl transition-colors"
              >
                <span>Start Step {current.stepNumber} Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Dual Visual Collage (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-8 relative aspect-[16/11] rounded-xl overflow-hidden border border-border shadow-sm">
              <Image
                src={current.mainImage}
                alt={current.title}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md text-white p-3 rounded-lg text-xs">
                {current.caption}
              </div>
            </div>

            <div className="sm:col-span-4 space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden border border-border shadow-sm">
                <Image
                  src={current.secondaryImage}
                  alt={`${current.title} secondary view`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 20vw"
                  className="object-cover"
                />
              </div>
              <div className="bg-surface p-4 rounded-xl border border-border">
                <span className="text-[11px] font-extrabold uppercase text-brand block">
                  Livitech Design Standard
                </span>
                <p className="text-xs font-bold text-ink mt-1">
                  100% digital tracking + on-site engineer verification at Patna
                  HQ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
