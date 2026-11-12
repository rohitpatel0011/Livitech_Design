import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Livitech Design Patna, Bihar",
  description:
    "Privacy Policy of Livitech Design (livitechdesign.in). Learn how we collect, protect, and handle client information and architectural project data in Bihar.",
  alternates: {
    canonical: "https://livitechdesign.in/privacy",
  },
};

export default function PrivacyPolicyPage() {
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
            <span className="text-brand font-bold">Privacy Policy</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted mt-2">
            Transparency & Client Trust · Last Updated: January 2026 · Livitech Design (livitechdesign.in)
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 space-y-8 text-ink text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-ink">1. Introduction</h2>
          <p className="text-ink-muted">
            Livitech Design (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), headquartered at 301,
            Dharmrath Palace, Kankarbagh, Patna, Bihar – 800020, operates the website{" "}
            <strong className="text-ink">livitechdesign.in</strong>. This Privacy
            Policy outlines how we collect, use, and protect your personal
            information when you use our website, architectural consultation
            tools, cost estimation calculator, and construction booking services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-ink">
            2. Information We Collect
          </h2>
          <p className="text-ink-muted">
            We only collect information necessary to provide accurate
            architectural designs, BOQ cost estimates, and on-site construction
            supervision:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-ink-muted">
            <li>
              <strong>Contact Details:</strong> Your full name, mobile number
              (WhatsApp), and email address.
            </li>
            <li>
              <strong>Project Parameters:</strong> Plot size (sq.ft), project city/district
              in Bihar, number of floors, and preferred construction package.
            </li>
            <li>
              <strong>Technical Drawings:</strong> Property photos, land registration
              survey maps, or existing architectural drawings uploaded for consultation.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-ink">
            3. How We Use Your Information
          </h2>
          <p className="text-ink-muted">
            Your data is used strictly for legitimate project delivery purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-ink-muted">
            <li>Generating customized itemized BOQ estimates and delivering them via WhatsApp/Email.</li>
            <li>Scheduling 1-on-1 consultations with licensed civil engineers at our Patna Studio.</li>
            <li>Preparing Vastu-compliant architectural floor plans and structural calculations.</li>
            <li>Sharing milestone updates and site quality audit reports during construction.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-ink">
            4. Zero Spam & Data Protection Commitment
          </h2>
          <p className="text-ink-muted">
            We have a strict <strong>Zero Spam Policy</strong>. We do not sell, rent,
            or trade your phone number, email, or property details to third-party telemarketers
            or material brokers. Your contact is shared only with our in-house civil engineers
            and dedicated project managers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-ink">5. Contact Our Privacy Officer</h2>
          <p className="text-ink-muted">
            If you have questions regarding this Privacy Policy or wish to modify or
            delete your data, please contact our Patna Headquarters:
          </p>
          <div className="bg-surface-muted p-5 rounded-2xl border border-border text-xs sm:text-sm space-y-2">
            <p><strong>Office:</strong> Livitech Design Studio</p>
            <p><strong>Address:</strong> 301, Dharmrath Palace, Kankarbagh, Patna, Bihar – 800020</p>
            <p><strong>Helpline:</strong> +91 98765 43210</p>
            <p><strong>Official Website:</strong> https://livitechdesign.in</p>
          </div>
        </section>
      </div>
    </div>
  );
}
