"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ArrowUpRight,
  Check,
  RotateCcw,
  MessageSquare,
} from "lucide-react";

interface ContactSectionProps {
  id?: string;
  className?: string;
}

const HELP_OPTIONS = [
  "2D/3D Plan",
  "Turnkey Build",
  "BOQ & Costing",
  "Structural & Vastu",
  "Interior Design",
];

export default function ContactSection({
  id = "contact",
  className = "",
}: ContactSectionProps) {
  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [locationAndPlot, setLocationAndPlot] = useState("");
  const [selectedHelp, setSelectedHelp] = useState<string[]>(["2D/3D Plan"]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const toggleHelp = (option: string) => {
    setSelectedHelp((prev) =>
      prev.includes(option)
        ? prev.length > 1
          ? prev.filter((item) => item !== option)
          : prev // keep at least one
        : [...prev, option]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName || fullName.trim().length < 2) {
      setErrorMsg("Kripya apna poora naam enter karein.");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg("Kripya 10-digit valid mobile / WhatsApp number dalein.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: cleanPhone,
          city: locationAndPlot.trim() || "Patna (Bihar)",
          plotArea: locationAndPlot.trim() || "Not specified",
          service: `Architect Consultation: ${selectedHelp.join(", ")}`,
          notes: `Project Location & Plot Size: ${locationAndPlot.trim() || "Not specified"} | Services requested: ${selectedHelp.join(", ")}`,
          source: "Contact Section Callback Form",
        }),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      setIsSubmitted(true);
    } catch {
      setErrorMsg("Network error. Aap seedha Patna Desk par call kar sakte hain: +91 98765 43210.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappDirectUrl = `https://wa.me/917903993902?text=${encodeURIComponent(
    `Namaste Livitech Design Studio, I would like to book an architect consultation for ${
      locationAndPlot ? locationAndPlot : "my project"
    }. Services required: ${selectedHelp.join(", ")}.`
  )}`;

  return (
    <section
      id={id}
      className={`scroll-mt-24 py-16 lg:py-24 bg-[#F4F6FA] border-b border-[#CFDAEC] relative ${className}`}
    >
      <span id="office-locator" className="absolute -top-24 opacity-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= SECTION HEADER ================= */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CFDAEC] shadow-xs text-[11px] font-mono font-bold uppercase tracking-wider text-[#DA5F36] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#DA5F36] animate-pulse" />
            GET IN TOUCH
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D0F1B] tracking-tight">
            Let’s Discuss Your Dream Project.
          </h2>
          <p className="text-base sm:text-lg text-[#4B5368] mt-2.5 leading-relaxed">
            Visit our Kankarbagh studio or request a direct callback from our lead architects &amp; civil engineers.
          </p>
        </div>

        {/* ================= TWO-COLUMN GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

          {/* ================= LEFT: STUDIO & DIRECT CHANNELS (5 COLS) ================= */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5 justify-between">

            {/* Card 1: PATNA DESIGN STUDIO (HQ) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#CFDAEC] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#DA5F36]/10 text-[#DA5F36] text-[11px] font-bold font-mono uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-[#DA5F36]" />
                    PATNA DESIGN STUDIO (HQ)
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#6478A3] bg-[#F4F6FA] px-2 py-0.5 rounded border border-[#CFDAEC]">
                    PIN: 800020
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-[#0D0F1B]">
                  301, Dharmrath Palace, Kankarbagh
                </h3>
                <p className="text-sm font-semibold text-[#4B5368] mt-1">
                  Patna, Bihar – 800020
                </p>
                <p className="text-xs text-[#6478A3] mt-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DA5F36]" />
                  Landmark: Near Old Bypass Jn. / Kankarbagh Main Road
                </p>
              </div>

              {/* Get Google Maps Directions */}
              <a
                href="https://maps.google.com/?q=301+Dharmrath+Palace+Kankarbagh+Patna+800020"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-[#F4F6FA] hover:bg-[#DA5F36] text-[#0D0F1B] hover:text-white border border-[#CFDAEC] hover:border-[#DA5F36] text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-xs group"
              >
                <Navigation className="w-4 h-4 text-[#DA5F36] group-hover:text-white transition-colors" />
                <span>Get Google Maps Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#6478A3] group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Row of 2 Cards: DIRECT DESK & STUDIO HOURS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* DIRECT DESK */}
              <div className="bg-white rounded-2xl p-5 border border-[#CFDAEC] shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6478A3] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#DA5F36]" />
                    DIRECT DESK
                  </span>
                  <a
                    href="tel:+919876543210"
                    className="text-base sm:text-lg font-black text-[#0D0F1B] hover:text-[#DA5F36] block mt-1 transition-colors tracking-tight"
                  >
                    +91 98765 43210
                  </a>
                </div>
                <a
                  href="tel:+919876543210"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#DA5F36] hover:underline group"
                >
                  <span>Call Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* STUDIO HOURS */}
              <div className="bg-white rounded-2xl p-5 border border-[#CFDAEC] shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6478A3] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#DA5F36]" />
                    STUDIO HOURS
                  </span>
                  <div className="text-sm font-extrabold text-[#0D0F1B] mt-1">
                    Mon – Sat
                  </div>
                  <div className="text-xs font-semibold text-[#4B5368]">
                    9:30 AM – 7:30 PM
                  </div>
                </div>
                <span className="mt-3 text-[11px] text-[#6478A3] block">
                  Sun: Prior Appointment
                </span>
              </div>

            </div>

            {/* Card 3: Minimal Embedded Google Map (Kankarbagh, Patna Pin) */}
            <div className="bg-white rounded-2xl border border-[#CFDAEC] p-2 shadow-sm relative overflow-hidden flex-1 min-h-[190px]">
              <div className="relative w-full h-full min-h-[180px] rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14392.51862529949!2d85.1432!3d25.5941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed586c95c808f9%3A0x6b4f74d47d4a6f2b!2sKankarbagh%2C%20Patna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Livitech Design Studio Kankarbagh Map"
                  className="w-full h-full min-h-[180px] object-cover"
                />
                <div className="absolute top-2 left-2 bg-[#0D0F1B]/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 shadow">
                  <MapPin className="w-3 h-3 text-[#DA5F36]" />
                  <span>Kankarbagh, Patna Pin</span>
                </div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT: QUICK CONSULTATION FORM (7 COLS) ================= */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#CFDAEC] p-6 sm:p-8 lg:p-10 shadow-lg flex flex-col justify-between">
            {isSubmitted ? (
              <div className="py-10 text-center space-y-4 max-w-md mx-auto my-auto">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-[#0D0F1B]">
                    Consultation Request Received!
                  </h3>
                  <p className="text-sm text-[#4B5368] mt-2 leading-relaxed">
                    Dhanyawad <strong>{fullName}</strong>! Hamare Patna Kankarbagh studio architect aapse 2 working hours ke andar contact karenge.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-xs sm:text-sm py-3.5 px-6 rounded-xl shadow-sm transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Connect on WhatsApp Instantly</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFullName("");
                      setPhone("");
                      setLocationAndPlot("");
                    }}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#F4F6FA] text-[#0D0F1B] hover:bg-[#CFDAEC]/50 font-bold text-xs py-3.5 px-5 rounded-xl border border-[#CFDAEC] transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Send Another Request</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Form Header */}
                <div className="border-b border-[#CFDAEC] pb-4">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D0F1B] tracking-tight">
                    Book a Free Architect Consultation
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B5368] mt-1 leading-relaxed">
                    Direct 30-minute review with Senior Civil Engineers &amp; Architects. Zero obligation.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                    {errorMsg}
                  </div>
                )}

                {/* Field 1: Full Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-extrabold uppercase tracking-wider text-[#0D0F1B] block mb-1.5"
                  >
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-[#F4F6FA] border border-[#CFDAEC] focus:border-[#DA5F36] focus:ring-4 focus:ring-[#DA5F36]/10 rounded-xl px-4 py-3 text-sm font-medium text-[#0D0F1B] placeholder:text-[#8699C1] focus:outline-none transition-all"
                  />
                </div>

                {/* Field 2: Phone / WhatsApp Number */}
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="text-xs font-extrabold uppercase tracking-wider text-[#0D0F1B] block mb-1.5"
                  >
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full bg-[#F4F6FA] border border-[#CFDAEC] focus:border-[#DA5F36] focus:ring-4 focus:ring-[#DA5F36]/10 rounded-xl px-4 py-3 text-sm font-medium text-[#0D0F1B] placeholder:text-[#8699C1] focus:outline-none transition-all"
                  />
                </div>

                {/* Field 3: Project Location & Plot Size */}
                <div>
                  <label
                    htmlFor="contact-location"
                    className="text-xs font-extrabold uppercase tracking-wider text-[#0D0F1B] block mb-1.5"
                  >
                    Project Location &amp; Plot Size
                  </label>
                  <input
                    id="contact-location"
                    type="text"
                    value={locationAndPlot}
                    onChange={(e) => setLocationAndPlot(e.target.value)}
                    placeholder="e.g., Danapur, 1500 sq.ft"
                    className="w-full bg-[#F4F6FA] border border-[#CFDAEC] focus:border-[#DA5F36] focus:ring-4 focus:ring-[#DA5F36]/10 rounded-xl px-4 py-3 text-sm font-medium text-[#0D0F1B] placeholder:text-[#8699C1] focus:outline-none transition-all"
                  />
                </div>

                {/* Field 4: What do you need help with? */}
                <div>
                  <label className="text-xs font-extrabold uppercase tracking-wider text-[#0D0F1B] block mb-2">
                    What do you need help with?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {HELP_OPTIONS.map((opt) => {
                      const isSelected = selectedHelp.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => toggleHelp(opt)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? "bg-[#DA5F36] text-white shadow-xs border border-[#DA5F36]"
                              : "bg-[#F4F6FA] text-[#4B5368] border border-[#CFDAEC] hover:border-[#8699C1] hover:text-[#0D0F1B]"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#DA5F36] hover:bg-[#BD4922] disabled:opacity-60 text-white font-extrabold text-sm sm:text-base py-4 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Request Callback</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-[#6478A3] mt-3">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>Direct reply within 2 working hrs · 100% Privacy &amp; Zero Spam Guarantee</span>
                  </div>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
