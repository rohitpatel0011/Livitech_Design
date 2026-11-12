"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  Eye,
  Sparkles,
} from "lucide-react";
import { ON_SITE_AUDITS } from "@/data/livitectData";

export default function OnSiteQualityGallery() {
  const [selectedAuditId, setSelectedAuditId] = useState(ON_SITE_AUDITS[0].id);
  const [compareMode, setCompareMode] = useState<"reality" | "blueprint">("reality");

  const currentAudit =
    ON_SITE_AUDITS.find((a) => a.id === selectedAuditId) || ON_SITE_AUDITS[0];

  return (
    <section className="py-16 lg:py-24 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
              How Livitech Design Works On-Site.
            </h2>
            <p className="text-base sm:text-lg text-ink-muted mt-2 max-w-2xl leading-relaxed">
              On-site quality assurance & structural audits — contractors promise; civil engineers verify. See how our licensed engineers supervise every slab casting, column rebar spacing, and waterproofing test across Bihar.
            </p>
          </div>

          {/* Blueprint vs Reality Switcher */}
          <div className="flex items-center gap-2 p-1.5 bg-surface-muted rounded-xl border border-border shrink-0">
            <span className="text-xs font-semibold text-ink-subtle pl-2">View:</span>
            <button
              type="button"
              onClick={() => setCompareMode("reality")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                compareMode === "reality"
                  ? "bg-brand text-white shadow-sm"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              🏗️ Live Site Execution
            </button>
            <button
              type="button"
              onClick={() => setCompareMode("blueprint")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                compareMode === "blueprint"
                  ? "bg-brand text-white shadow-sm"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              📐 CAD Blueprint Spec
            </button>
          </div>
        </div>

        {/* 4 Checkpoint Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {ON_SITE_AUDITS.map((audit, idx) => {
            const isSelected = audit.id === selectedAuditId;
            return (
              <button
                key={audit.id}
                type="button"
                onClick={() => setSelectedAuditId(audit.id)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-brand text-white border-brand shadow-md"
                    : "bg-surface-muted/60 hover:bg-brand-light/30 text-ink border-border"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider ${
                      isSelected ? "text-brand-light" : "text-brand"
                    }`}
                  >
                    Checkpoint 0{idx + 1}
                  </span>
                  <span
                    className={`text-[10px] font-semibold ${
                      isSelected ? "text-white/80" : "text-ink-subtle"
                    }`}
                  >
                    {audit.stage}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-bold truncate leading-snug">
                  {audit.checkpoint}
                </div>
              </button>
            );
          })}
        </div>

        {/* Big Interactive Inspection Stage Card */}
        <div className="bg-surface rounded-2xl border border-border shadow-booking overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Viewport (7 Cols) */}
            <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/10] bg-ink">
              <Image
                key={`${currentAudit.id}-${compareMode}`}
                src={
                  compareMode === "reality"
                    ? currentAudit.image
                    : currentAudit.blueprintImage
                }
                alt={currentAudit.checkpoint}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Top Mode Badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                  <Eye className="w-3.5 h-3.5 text-brand-light" />
                  {compareMode === "reality"
                    ? "Verified Site Execution Photo"
                    : "Approved Structural Engineering Drawing"}
                </span>
              </div>

              {/* Bottom Tolerance Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 sm:p-4 border border-border text-ink">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand block">
                      Livitech Design Engineering Tolerance
                    </span>
                    <p className="text-sm font-extrabold text-ink">
                      {currentAudit.tolerance}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-brand-light text-brand text-xs font-bold">
                    100% Passed
                  </span>
                </div>
              </div>
            </div>

            {/* Audit Details & Checklist (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-surface">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-light text-brand text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentAudit.stage}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-ink leading-tight">
                  {currentAudit.checkpoint}
                </h3>

                <p className="text-sm text-ink-muted leading-relaxed">
                  {currentAudit.importance}
                </p>

                <div className="p-4 rounded-xl bg-surface-muted border border-border space-y-2.5">
                  <div className="text-xs font-bold text-ink uppercase tracking-wider">
                    Site Protocol & Supervision:
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink font-medium">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span>Audited by: <strong>{currentAudit.engineerRole}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink font-medium">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span>Geotagged inspection report uploaded to client portal</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink font-medium">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span>No advance pour allowed without engineer sign-off</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-ink-subtle">
                  <ShieldCheck className="w-4 h-4 text-brand" />
                  <span>120-Point Quality Checklist</span>
                </div>
                <a
                  href="#contact"
                  className="text-xs font-bold text-brand hover:text-brand-dark transition-colors"
                >
                  Download Sample Audit PDF →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
