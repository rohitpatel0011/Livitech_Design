import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Livitech Design Patna, Bihar",
  description:
    "Terms of Service governing architectural design, cost estimation, and turnkey construction services by Livitech Design (livitechdesign.in).",
  alternates: {
    canonical: "https://livitechdesign.in/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-surface pb-24">
      {/* Header */}
      <div className="bg-surface-muted border-b border-border py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-ink-subtle mb-3">
            <Link href="/" className="hover:text-brand transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand font-bold">Terms of Service</span>
          </nav>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light text-brand text-xs font-bold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted mt-2">
            Effective Date: January 2026 · Livitech Design (livitechdesign.in)
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 space-y-8 text-ink text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-ink">1. Acceptance of Terms</h2>
          <p className="text-ink-muted">
            By accessing or using the services, tools, and calculators on{" "}
            <strong className="text-ink">livitechdesign.in</strong>, you agree to comply
            with and be bound by these Terms of Service. If you do not agree, please do
            not use our website or services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-ink">
            2. Scope of Architectural & Engineering Services
          </h2>
          <p className="text-ink-muted">
            Livitech Design provides professional architectural 2D/3D planning, structural
            calculations, itemized BOQ cost estimations, and turnkey construction management:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-ink-muted">
            <li>
              <strong>Preliminary Estimates:</strong> Estimates provided through our online
              calculator are for budgetary planning based on prevailing Bihar market rates.
              Final costs are formalized in an itemized contract after site topography and soil audit.
            </li>
            <li>
              <strong>Vastu Compliance:</strong> Vastu designs are prepared according to
              standard traditional principles and modern architectural codes.
            </li>
            <li>
              <strong>Turnkey Contracts:</strong> Turnkey execution is governed by a legally
              binding contract including a milestone-based payment schedule and Price Freeze Guarantee.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-ink">
            3. Intellectual Property Rights
          </h2>
          <p className="text-ink-muted">
            All 3D elevations, architectural plans, renderings, BOQ templates, branding,
            and content displayed on livitechdesign.in are the exclusive intellectual property
            of Livitech Design. Unauthorized reproduction or commercial re-use without prior
            written consent is prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-ink">4. Governing Law & Jurisdiction</h2>
          <p className="text-ink-muted">
            These Terms shall be governed by and construed in accordance with the laws of
            the Republic of India. Any disputes arising out of or related to our services
            shall be subject to the exclusive jurisdiction of the competent courts in{" "}
            <strong className="text-ink">Patna, Bihar</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-ink">5. Contact Information</h2>
          <div className="bg-surface-muted p-5 rounded-2xl border border-border text-xs sm:text-sm space-y-2">
            <p><strong>Entity:</strong> Livitech Design</p>
            <p><strong>Studio:</strong> 301, Dharmrath Palace, Kankarbagh, Patna, Bihar – 800020</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Website:</strong> https://livitechdesign.in</p>
          </div>
        </section>
      </div>
    </div>
  );
}
