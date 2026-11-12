import Link from "next/link";
import { Home, Building2 } from "lucide-react";
import { CORE_SERVICES } from "@/data/livitectData";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-surface-muted/50 px-4 py-16">
      <div className="max-w-xl w-full text-center bg-surface p-8 sm:p-10 rounded-2xl border border-border shadow-booking space-y-6">
        <p className="text-3xl sm:text-4xl font-black text-brand tracking-tight">
          404 · Page Not Found
        </p>

        <h1 className="text-3xl sm:text-4xl font-black text-ink tracking-tight">
          Ye service ya page uplabdh nahi hai
        </h1>

        <p className="text-sm text-ink-muted leading-relaxed">
          The page or service you are looking for might have been moved or is currently not active. Explore our active architectural and engineering services below:
        </p>

        {/* 5 Active Services Shortcut Links */}
        <div className="pt-2 text-left space-y-2">
          <span className="text-xs font-bold uppercase text-ink-subtle block mb-2">
            Available Services:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CORE_SERVICES.map((srv) => (
              <Link
                key={srv.id}
                href={`/services/${srv.slug}`}
                className="p-2.5 rounded-xl border border-border hover:border-brand/40 bg-surface-muted/30 text-xs font-bold text-ink hover:text-brand flex items-center justify-between transition-colors"
              >
                <span>{srv.title}</span>
                <span className="text-brand">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand text-white font-bold text-sm hover:bg-brand-dark transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <a
            href="tel:+919876543210"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-surface text-ink font-bold text-sm hover:border-brand/40 transition-colors"
          >
            <Building2 className="w-4 h-4 text-brand" />
            <span>Call Patna Studio</span>
          </a>
        </div>
      </div>
    </main>
  );
}
