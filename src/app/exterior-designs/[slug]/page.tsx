import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ChevronRight,
  CheckCircle2,
  MapPin,
  Layers,
  ArrowRight,
  MessageSquare,
  Building2,
  Sparkles,
} from "lucide-react";
import { EXTERIOR_DESIGNS } from "@/data/livitectData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return EXTERIOR_DESIGNS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = EXTERIOR_DESIGNS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Elevation Concept Not Found | Livitech Design",
    };
  }

  const title = `${post.title} | Livitech Design (livitechdesign.in)`;
  const description = `${post.subtitle} Curated modern house facade ideas, Vastu orientation, and material specs for Indian homes by Livitech Design Patna.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://livitechdesign.in/exterior-designs/${post.slug}`,
      siteName: "Livitech Design",
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: `${post.title} - Livitech Design`,
        },
      ],
      locale: "en_IN",
      type: "article",
    },
    alternates: {
      canonical: `/exterior-designs/${post.slug}`,
    },
  };
}

export default async function ExteriorDesignDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const post = EXTERIOR_DESIGNS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const otherPosts = EXTERIOR_DESIGNS.filter((p) => p.id !== post.id).slice(
    0,
    3
  );

  const waQuote = encodeURIComponent(
    `Hello Livitech Design (livitechdesign.in), I am interested in the elevation concept "${post.title}". My plot is located in Bihar. Please share custom 3D elevation rates and turnaround time.`
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.subtitle,
    image: post.coverImage,
    datePublished: post.publishDate,
    author: {
      "@type": "Organization",
      name: "Livitech Design",
      url: "https://livitechdesign.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Livitech Design",
      logo: {
        "@type": "ImageObject",
        url: "https://livitechdesign.in/logo.png",
      },
    },
  };

  return (
    <div className="bg-surface-muted/40 min-h-screen">
      {/* Schema.org Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Semantic Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="bg-surface border-b border-border py-3 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm text-ink-subtle">
            <li>
              <Link
                href="/"
                className="hover:text-brand transition-colors font-medium"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-border-subtle">
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </li>
            <li>
              <Link
                href="/#exterior-designs"
                className="hover:text-brand transition-colors font-medium"
              >
                Exterior Designs
              </Link>
            </li>
            <li aria-hidden="true" className="text-border-subtle">
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </li>
            <li
              aria-current="page"
              className="font-bold text-ink truncate max-w-[200px] sm:max-w-none"
            >
              {post.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Article Body (8 Cols) */}
          <article className="lg:col-span-8 space-y-8">
            <header className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="px-3 py-1 rounded-lg bg-surface text-brand text-xs font-extrabold uppercase tracking-wider border border-border">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface text-ink-muted text-xs font-semibold border border-border">
                  <Calendar className="w-3.5 h-3.5 text-brand" />
                  {post.publishDate}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface text-ink-muted text-xs font-semibold border border-border">
                  <Clock className="w-3.5 h-3.5 text-brand" />
                  {post.readTime}
                </span>
              </div>

              <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
                {post.subtitle}
              </p>
            </header>

            {/* Main Cover Elevation Visual */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-ink shadow-booking border border-border">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="px-3 py-1 rounded-md bg-black/60 backdrop-blur-md font-semibold">
                  3D Render by Livitech Design Patna
                </span>
                <span className="px-3 py-1 rounded-md bg-brand font-bold">
                  Recommended: {post.plotSizesRecommended}
                </span>
              </div>
            </div>

            {/* Architectural Highlights Box */}
            <section
              aria-labelledby="specs-heading"
              className="bg-surface rounded-2xl border border-border p-6 shadow-booking space-y-4"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand" />
                <h2
                  id="specs-heading"
                  className="text-lg sm:text-xl font-extrabold text-ink"
                >
                  Key Architectural Features & Specifications
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {post.highlights.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-muted/50 border border-border/80"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-ink">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-border flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-ink-subtle uppercase">
                  Tags:
                </span>
                {post.styleTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-surface-muted text-xs font-semibold text-ink-muted border border-border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Detailed Article Prose */}
            <section
              aria-labelledby="article-details-heading"
              className="space-y-4 text-sm sm:text-base text-ink-muted leading-relaxed"
            >
              <h2
                id="article-details-heading"
                className="text-2xl font-black text-ink"
              >
                Why Elevation Design Matters for Bihar Homes
              </h2>
              <p>{post.excerpt}</p>
              <p>
                Bihar aur purvanchal kshetra mein garmi aur monsoon ki barish
                bahut teevra hoti hai. Isliye Livitech Design ke certified
                architects har elevation mein balcony overhangs (chhajjas),
                damp-proof elastomeric paints, UV-stabilized exterior louvers
                (WPC/HPL panels) aur cross-ventilation windows ka santulan
                rakhte hain.
              </p>
              <p>
                Is design ko aap apne plot dimension (e.g. 20ft, 25ft, 30ft,
                40ft frontage) ke hisaab se customize karwa sakte hain. Hamari
                architectural team 2D Vastu naksha, column-beam structural load
                drawings aur daytime/nighttime photorealistic 3D elevations
                prepare karti hai.
              </p>
            </section>

            {/* Additional Elevation Gallery Views */}
            {post.elevationGallery.length > 1 && (
              <section
                aria-labelledby="gallery-detail-heading"
                className="space-y-4 pt-4"
              >
                <div className="border-b border-border pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-brand">
                    Multi-Angle Renders
                  </span>
                  <h2
                    id="gallery-detail-heading"
                    className="text-xl sm:text-2xl font-extrabold text-ink mt-1"
                  >
                    Elevation Gallery Views
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post.elevationGallery.map((img, idx) => (
                    <figure
                      key={img + idx}
                      className="bg-surface rounded-2xl border border-border overflow-hidden shadow-booking"
                    >
                      <div className="relative aspect-[16/10] w-full bg-ink">
                        <Image
                          src={img}
                          alt={`${post.title} view ${idx + 1}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 40vw"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="p-3 text-xs font-semibold text-ink-subtle text-center">
                        Perspective View {idx + 1} · Livitech Design
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sticky Sidebar (4 Cols) */}
          <aside
            aria-label="Elevation Consultation Widget"
            className="lg:col-span-4 lg:sticky lg:top-24 space-y-6"
          >
            <div className="bg-surface rounded-2xl border-2 border-brand/30 p-5 sm:p-6 shadow-booking space-y-5">
              <div>
                <span className="px-2.5 py-1 rounded bg-brand-light text-brand text-[11px] font-black uppercase tracking-wide">
                  Custom 3D Elevation
                </span>
                <h3 className="text-xl font-black text-ink mt-2">
                  Get This Elevation for Your Plot
                </h3>
                <p className="text-xs text-ink-muted mt-1">
                  Connect directly with our Kankarbagh studio architect to adapt
                  this design to your exact plot dimensions.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-muted border border-border space-y-2 text-xs text-ink-muted">
                <div className="flex items-center justify-between font-bold text-ink">
                  <span>Starting 3D Package:</span>
                  <span className="text-brand">₹15 – ₹25 / sq.ft</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Turnaround Time:</span>
                  <span className="font-semibold text-ink">5 – 7 Days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Deliverables:</span>
                  <span className="font-semibold text-ink">
                    2D Naksha + 3D Views
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/919876543210?text=${waQuote}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-brand hover:bg-brand-dark text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-booking transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Request Custom Elevation Quote</span>
                </a>

                <a
                  href="tel:+919876543210"
                  className="w-full py-2.5 px-4 rounded-xl bg-surface hover:bg-surface-muted text-ink font-bold text-xs sm:text-sm border border-border flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-brand" />
                  <span>Call Patna Studio: +91 98765 43210</span>
                </a>
              </div>

              <div className="pt-3 border-t border-border flex items-start gap-2 text-[11px] text-ink-subtle">
                <MapPin className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                <span>
                  <strong>Livitech Design Studio:</strong> 301, Dharmrath Palace,
                  Kankarbagh, Patna, Bihar – 800020
                </span>
              </div>
            </div>

            {/* Quick Explore Other Services */}
            <div className="bg-surface rounded-2xl border border-border p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-ink">
                <Sparkles className="w-3.5 h-3.5 text-brand" />
                <span>Related Active Services</span>
              </div>
              <div className="space-y-2 text-xs font-semibold">
                <Link
                  href="/services/architecture-design"
                  className="p-2 rounded-lg bg-surface-muted hover:bg-brand-light text-ink hover:text-brand flex items-center justify-between transition-colors block"
                >
                  <span>2D Vastu Floor Plans & 3D BIM</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/services/cost-estimation"
                  className="p-2 rounded-lg bg-surface-muted hover:bg-brand-light text-ink hover:text-brand flex items-center justify-between transition-colors block"
                >
                  <span>Cost Estimation & BOQ Engine</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/services/interior-design"
                  className="p-2 rounded-lg bg-surface-muted hover:bg-brand-light text-ink hover:text-brand flex items-center justify-between transition-colors block"
                >
                  <span>Luxury Interior Walkthroughs</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* More Elevation Concepts */}
        <section
          aria-labelledby="other-concepts-heading"
          className="mt-16 pt-12 border-t border-border"
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              id="other-concepts-heading"
              className="text-2xl font-black text-ink"
            >
              Explore More Modern Elevation Ideas
            </h2>
            <Link
              href="/#exterior-designs"
              className="text-xs sm:text-sm font-bold text-brand hover:text-brand-dark flex items-center gap-1"
            >
              <span>View All 60+ Concepts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherPosts.map((other) => (
              <Link
                key={other.id}
                href={`/exterior-designs/${other.slug}`}
                className="group bg-surface rounded-2xl border border-border hover:border-brand/40 p-4 shadow-booking transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-ink mb-3">
                    <Image
                      src={other.coverImage}
                      alt={other.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 30vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-brand text-white text-[10px] font-bold">
                      {other.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-ink group-hover:text-brand transition-colors line-clamp-2">
                    {other.title}
                  </h3>
                  <p className="text-xs text-ink-muted mt-1 line-clamp-2">
                    {other.subtitle}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-border flex items-center justify-between text-xs font-bold text-brand">
                  <span>Explore Design</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
