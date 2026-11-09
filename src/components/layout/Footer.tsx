import React from "react";
import Link from "next/link";
import { Building2, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand & Patna HQ Info (2 Columns Wide) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-tight block leading-none">
                  LIVITECH DESIGN
                </span>
                <span className="text-xs text-neutral-400">
                  livitechdesign.in · Architecture & 3D
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Plan. Design. Estimate. Supervise. Architectural 2D/3D design, itemized
              BOQ cost estimation, commercial planning, and site consultation
              across Bihar by Livitech Design (livitechdesign.in).
            </p>

            <div className="pt-2 space-y-2 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <span>
                  301, Dharmrath Palace, Kankarbagh, Patna, Bihar – 800020
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand shrink-0" />
                <span>Online Architecture & Consultation across India</span>
              </div>
            </div>
          </div>

          {/* Column 1: Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li><Link href="/services/residential-construction" className="hover:text-white">Residential Construction</Link></li>
              <li><Link href="/services/commercial-construction" className="hover:text-white">Commercial Construction</Link></li>
              <li><Link href="/services/maintenance-service" className="hover:text-white">Maintenance Service</Link></li>
              <li><Link href="/services/interior-design" className="hover:text-white">Interior Design</Link></li>
              <li><Link href="/services/architectural-services" className="hover:text-white">Architectural Services</Link></li>
              <li><Link href="/services/contractor-services" className="hover:text-white">Contractor Services (440+)</Link></li>
            </ul>
          </div>

          {/* Column 2: Projects & Designs */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
              Designs & Work
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li><Link href="#exterior-designs" className="hover:text-white">Exterior Designs (60+)</Link></li>
              <li><Link href="#happy-clients" className="hover:text-white">Our Happy Clients</Link></li>
              <li><Link href="#blueprint-reality" className="hover:text-white">Blueprint vs Reality</Link></li>
              <li><Link href="#projects" className="hover:text-white">Residential Homes</Link></li>
              <li><Link href="#projects" className="hover:text-white">Commercial Complexes</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li><Link href="#office-locator" className="hover:text-white">Patna HQ & Office</Link></li>
              <li><Link href="#how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link href="#happy-clients" className="hover:text-white">Homeowner Reviews</Link></li>
              <li><Link href="tel:+919876543210" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li><Link href="#contact" className="hover:text-white">Book Consultation</Link></li>
              <li><Link href="#cost-estimator" className="hover:text-white">BOQ Calculator</Link></li>
              <li><Link href="#faq" className="hover:text-white">Construction FAQs</Link></li>
              <li><span className="text-neutral-500">Project Financing (Coming Soon)</span></li>
            </ul>
          </div>
        </div>

        {/* Bihar Service Locations SEO Links */}
        <div className="mt-10 pt-6 border-t border-neutral-800">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-3">
            Bihar Service Locations & City Hubs:
          </span>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-400">
            <Link href="/locations/patna" className="hover:text-white">Patna Architecture & Construction</Link>
            <span className="text-neutral-600">·</span>
            <Link href="/locations/bihta" className="hover:text-white">Bihta</Link>
            <span className="text-neutral-600">·</span>
            <Link href="/locations/muzaffarpur" className="hover:text-white">Muzaffarpur</Link>
            <span className="text-neutral-600">·</span>
            <Link href="/locations/gaya" className="hover:text-white">Gaya & Bodh Gaya</Link>
            <span className="text-neutral-600">·</span>
            <Link href="/locations/bhagalpur" className="hover:text-white">Bhagalpur</Link>
            <span className="text-neutral-600">·</span>
            <Link href="/locations/darbhanga" className="hover:text-white">Darbhanga</Link>
            <span className="text-neutral-600">·</span>
            <Link href="/locations/begusarai" className="hover:text-white">Begusarai</Link>
            <span className="text-neutral-600">·</span>
            <Link href="/locations/ara" className="hover:text-white">Ara (Bhojpur)</Link>
            <span className="text-neutral-600">·</span>
            <Link href="/locations/purnia" className="hover:text-white">Purnia</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>© 2026 Livitech Design (livitechdesign.in). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
