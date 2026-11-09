import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CORE_SERVICES } from "@/data/livitectData";
import ServiceDetailClient from "@/components/services/ServiceDetailClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return CORE_SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = CORE_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found | Livitech Design",
    };
  }

  const title = `${service.title} in Patna, Bihar | Livitech Design (livitechdesign.in)`;
  const description = `${service.shortDesc} Certified architectural plans, 3D elevation, and structural engineering from Livitech Design studio at 301, Dharmrath Palace, Kankarbagh, Patna.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://livitechdesign.in/services/${service.slug}`,
      siteName: "Livitech Design",
      images: [
        {
          url: service.images[0],
          width: 1200,
          height: 630,
          alt: `${service.title} - Livitech Design Patna`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = CORE_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.shortDesc,
    provider: {
      "@type": "ProfessionalService",
      name: "Livitech Design (livitechdesign.in)",
      image: service.images[0],
      telephone: "+919876543210",
      address: {
        "@type": "PostalAddress",
        streetAddress: "301, Dharmrath Palace, Kankarbagh",
        addressLocality: "Patna",
        addressRegion: "Bihar",
        postalCode: "800020",
        addressCountry: "IN",
      },
      priceRange: "₹₹",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Patna",
      },
      {
        "@type": "State",
        name: "Bihar",
      },
      {
        "@type": "State",
        name: "Jharkhand",
      },
      {
        "@type": "State",
        name: "Uttar Pradesh",
      },
    ],
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "INR",
        description: service.indicativeRate || "Starting from ₹15/sq.ft",
      },
    },
  };

  return (
    <>
      {/* Search Engine Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailClient service={service} />
    </>
  );
}
