export interface DeliverableCard {
  title: string;
  desc: string;
  image: string;
  specTag: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  desc: string;
  image: string;
}

export interface ServiceSampleProject {
  title: string;
  location: string;
  specs: string;
  image: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  badge: string;
  ctaText: string;
  isComingSoon?: boolean;
  indicativeRate?: string;
  turnaroundTime?: string;
  heroSubtitle?: string;
  deliverables: string[];
  images: string[];
  detailedDeliverables?: DeliverableCard[];
  workflowSteps?: ServiceProcessStep[];
  sampleProjects?: ServiceSampleProject[];
  faqs?: ServiceFAQ[];
}

export interface HeroVisualSlide {
  id: string;
  stageTag: string;
  title: string;
  location: string;
  metrics: string;
  description: string;
  mainImage: string;
  blueprintThumb: string;
}

export interface JourneyStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  items: string[];
  mainImage: string;
  secondaryImage: string;
  caption: string;
}

export interface BlueprintComparisonItem {
  id: string;
  category: string;
  title: string;
  location: string;
  areaSqFt: string;
  costEstimate: string;
  duration: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  highlights: string[];
}

export interface ConstructionPackage {
  id: string;
  name: string;
  priceRange: string;
  tagline: string;
  ratePerSqFt: number;
  popular?: boolean;
  highlights: string[];
  structure: {
    steel: string;
    cement: string;
    aggregate: string;
    sand: string;
    masonry: string;
  };
  finishing: {
    flooring: string;
    paint: string;
    doors: string;
    windows: string;
    kitchenBath: string;
    specialFeatures?: string[];
  };
  mep: {
    wiring: string;
    plumbing: string;
    switches: string;
  };
  timelineMonths: number;
}

export interface CostPackage {
  id: string;
  name: string;
  badge: string;
  pricePerSqFt: string;
  rateMin: number;
  rateMax: number;
  subtitle: string;
  highlights: string[];
  image: string;
  popular?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "Residential" | "Commercial" | "Interior" | "Turnkey";
  location: string;
  area: string;
  budget: string;
  duration: string;
  images: string[];
  tag: string;
  description: string;
}

export interface OnSiteAuditItem {
  id: string;
  checkpoint: string;
  stage: string;
  tolerance: string;
  importance: string;
  image: string;
  blueprintImage: string;
  engineerRole: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  image: string;
  unit: string;
  marketPrice: string;
  livitectWholesalePrice: string;
  savings: string;
  verifiedGrade: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface ClientTestimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  projectType: string;
  area: string;
  rating: number;
  review: string;
  clientImage: string;
  houseImage: string;
  verifiedBadge: string;
  deliveredYear: string;
}

export interface ExteriorDesignPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Modern Villa" | "G+1 & G+2 Elevation" | "Luxury Facade" | "Commercial & Apartment" | "Color Palettes" | "Design Guide";
  publishDate: string;
  readTime: string;
  coverImage: string;
  elevationGallery: string[];
  excerpt: string;
  highlights: string[];
  plotSizesRecommended: string;
  styleTags: string[];
}

export const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Cost Estimator", href: "/#cost-estimator" },
  { label: "Exterior Designs", href: "/#exterior-designs" },
  { label: "Happy Clients", href: "/#happy-clients" },
  { label: "Projects", href: "/#projects" },
  { label: "Blueprint vs Reality", href: "/#blueprint-reality" },
  { label: "Patna HQ", href: "/#office-locator" },
];

export const BIHAR_CITIES = [
  "Patna (Kankarbagh / Bailey Rd / Danapur)",
  "Bihta & Greater Patna",
  "Muzaffarpur",
  "Gaya",
  "Bhagalpur",
  "Darbhanga",
  "Purnia",
  "Begusarai",
  "Ara & Bhojpur",
  "Other City (Bihar / JH / UP / MP / UK)",
];

export const HERO_VISUAL_SLIDES: HeroVisualSlide[] = [
  {
    id: "stage-1",
    stageTag: "Architecture & 3D Design",
    title: "Architectural Planning & 3D Elevations",
    location: "Architecture & 3D Elevation",
    metrics: "2D Vastu Floor Plans · Modern 3D Front Elevations · BIM Drawings",
    description: "Visualize your entire dream home in high-definition 3D with precision floor plans before foundation work begins.",
    mainImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    blueprintThumb: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "stage-2",
    stageTag: "Structural Engineering",
    title: "RCC Structural Design & Site Supervision",
    location: "Structural Engineering",
    metrics: "Earthquake-Resistant Design · Foundation Drawings · Civil Audits",
    description: "Licensed structural engineers ensure scientific steel reinforcement, certified concrete strength, and routine site checks.",
    mainImage: "/images/rcc-structural-supervision.jpg",
    blueprintThumb: "/images/rcc-structural-supervision.jpg",
  },
  {
    id: "stage-3",
    stageTag: "Commercial Planning",
    title: "Commercial Complex Planning & Building",
    location: "Commercial Construction",
    metrics: "Municipal Bye-Law Approval · High-Rise Engineering · Turnkey Delivery",
    description: "End-to-end commercial solutions with government-approved maps, fire safety norms, and premium facade engineering.",
    mainImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    blueprintThumb: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "stage-4",
    stageTag: "Turnkey Interior",
    title: "Luxury Interior Design & 3D Walkthrough",
    location: "Turnkey Interior",
    metrics: "Photorealistic 3D Walkthrough · Modular Woodwork · False Ceiling",
    description: "Custom turnkey interiors with modern modular kitchens, premium wardrobes, Italian-spec tiling, and designer lighting.",
    mainImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    blueprintThumb: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80",
  },
];

export const SERVICES_SECTION_INTRO = {
  eyebrow: "End-to-End Excellence",
  title: "Our Construction Services",
  description:
    "Our services cover every phase of construction, from initial planning to final completion, including interior design and maintenance. We ensure quality and attention to detail throughout, delivering precision and excellence in every aspect of your project.",
};

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: "residential-construction",
    slug: "residential-construction",
    title: "Residential Construction",
    shortDesc:
      "End-to-end residential construction turning your dream home into a sanctuary with precision and premium materials.",
    badge: "Dream Home Sanctuary",
    ctaText: "Explore Residential",
    indicativeRate: "Custom Per Sq.Ft Package",
    turnaroundTime: "6 – 12 Months (Turnkey/Stage-wise)",
    heroSubtitle:
      "End-to-end residential construction turning your dream home into a sanctuary with precision, structural safety, and premium materials across Patna and Bihar.",
    deliverables: [
      "Foundation to Finishing Execution",
      "Premium Grade Materials & RCC",
      "Stage-Wise Quality & Timeline Tracking",
    ],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1200&q=85",
    ],
    detailedDeliverables: [
      {
        title: "Earthquake-Resistant RCC Frame",
        specTag: "Footing · Column · Slab",
        desc: "Precision engineered foundation, plinth beam, and slab casting using verified TMT steel and M25 concrete.",
        image:
          "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Premium Brickwork, Plaster & Waterproofing",
        specTag: "Zero-Seepage Guarantee",
        desc: "Laser-aligned brickwork, smooth plaster curing, and multi-layer terrace/bathroom waterproofing.",
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Flooring, Electrical & Plumbing Finishes",
        specTag: "Complete MEP & Finishes",
        desc: "Concealed fire-resistant wiring, CPVC plumbing lines, vitrified/Italian flooring, and weather-shield exterior paint.",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Transparent BOQ & Milestone Updates",
        specTag: "100% Budget Clarity",
        desc: "Every stage is backed by a clear Bill of Quantities (BOQ) and live WhatsApp photo updates from the site.",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Plot Audit, Plan & BOQ Lock",
        desc: "We inspect your plot, finalize Vastu 2D/3D designs, and lock the stage-wise residential construction budget.",
        image:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=700&q=80",
      },
      {
        step: "02",
        title: "Precision Structure & Supervision",
        desc: "Excavation to superstructure executed under the daily supervision of dedicated Livitech Design civil engineers.",
        image:
          "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=700&q=80",
      },
      {
        step: "03",
        title: "Finishing, Inspection & Key Handover",
        desc: "Final painting, fittings, and a multi-point quality audit before handing over the keys to your sanctuary.",
        image:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=700&q=80",
      },
    ],
    sampleProjects: [
      {
        title: "Modern G+2 Family Sanctuary",
        location: "Kankarbagh, Patna",
        specs: "2,400 sq.ft · 4BHK Turnkey Residence",
        image:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "East-Facing Duplex Villa",
        location: "Bailey Road, Patna",
        specs: "3,100 sq.ft · Premium Elevation & Finish",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      },
    ],
    faqs: [
      {
        q: "Residential construction mein payment kaise dena hota hai?",
        a: "Payment ek sath nahi lagta — footing, plinth, lintel, slab casting, brickwork, aur finishing ke hisab se stage-by-stage milestone payment hota hai.",
      },
      {
        q: "Kya material quality hum khud check kar sakte hain?",
        a: "Bilkul! Har material lot (cement, TMT steel, bricks, tiles) site par aane par verify hota hai aur aapko WhatsApp group par live report milti hai.",
      },
    ],
  },
  {
    id: "commercial-construction",
    slug: "commercial-construction",
    title: "Commercial Construction",
    shortDesc:
      "Elevate your business with state-of-the-art, innovative commercial spaces designed to enhance productivity and branding.",
    badge: "B2B & Institutional",
    ctaText: "Explore Commercial",
    indicativeRate: "Custom Commercial Proposal",
    turnaroundTime: "Project Scale Dependent",
    heroSubtitle:
      "Elevate your business with state-of-the-art, innovative commercial spaces—showrooms, complexes, hospitals, and offices—designed to enhance productivity and branding.",
    deliverables: [
      "High-ROI Commercial Floor Layouts",
      "Fire, Lift & Municipal Bye-Law Compliance",
      "Modern Glass & ACP Branding Facades",
    ],
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=85",
    ],
    detailedDeliverables: [
      {
        title: "Commercial Space & Carpet Optimization",
        specTag: "Maximum Floor ROI",
        desc: "Column-free wide spans and smart circulation layouts for retail showrooms, offices, hospitals, and hotels.",
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Fire Safety & Bye-Law Compliance",
        specTag: "Setbacks · FAR · Basement",
        desc: "Complete planning for basement ramp parking, fire exit staircases, lift cores, and municipal building norms.",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Heavy Shear-Wall Structural Design",
        specTag: "High-Load Engineering",
        desc: "Engineered for heavy footfall, commercial HVAC loads, and multi-storey vertical expansion.",
        image:
          "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Statement Structural Glazing & Facade",
        specTag: "Brand Visibility",
        desc: "Toughened glass glazing, ACP cladding, and architectural facade lighting that makes your building a landmark.",
        image:
          "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=800&q=80",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Feasibility, FAR & DPR Planning",
        desc: "We analyze plot road width, commercial zoning, and prepare a complete Detailed Project Report (DPR).",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80",
      },
      {
        step: "02",
        title: "Structural, MEP & Facade Engineering",
        desc: "Simultaneous execution of RCC framing, commercial electrical/HVAC lines, and front branding elevation.",
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80",
      },
      {
        step: "03",
        title: "On-Schedule Commercial Handover",
        desc: "Fast-track project management so your business or rental income starts without costly delays.",
        image:
          "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=700&q=80",
      },
    ],
    sampleProjects: [
      {
        title: "G+4 Retail & Corporate Complex",
        location: "Bailey Road, Patna",
        specs: "14,500 sq.ft · Basement Parking + Lift",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Multi-Specialty Healthcare Center",
        location: "Muzaffarpur, Bihar",
        specs: "16,000 sq.ft · Institutional Grade Build",
        image:
          "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
      },
    ],
    faqs: [
      {
        q: "Kya commercial project ke liye financing ya investor connect bhi milta hai?",
        a: "Haan, Livitech Design eligible commercial projects ko DPR valuation, bank loan documentation aur potential investors se connect karne mein assist karta hai.",
      },
    ],
  },
  {
    id: "maintenance-service",
    slug: "maintenance-service",
    title: "Maintenance Service",
    shortDesc:
      "Protect your property's value with our affordable post-construction maintenance packages, ensuring pristine condition.",
    badge: "Property Care & Audit",
    ctaText: "Explore Maintenance",
    indicativeRate: "On-Demand & Annual Packages",
    turnaroundTime: "24 – 72 Hours Response",
    heroSubtitle:
      "Protect your property's value with our affordable post-construction maintenance packages—covering waterproofing, structural crack repair, plumbing, electricals, and repainting.",
    deliverables: [
      "Seepage & Waterproofing Treatment",
      "Structural Crack & Plaster Restoration",
      "Plumbing, Electrical & Repainting Care",
    ],
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=85",
    ],
    detailedDeliverables: [
      {
        title: "Terrace & Bathroom Waterproofing",
        specTag: "Dampness & Seepage Fix",
        desc: "Chemical membrane coating, grouting, and damp-proof treatment to stop wall peeling and roof leakage.",
        image:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Structural Crack & Spalling Repair",
        specTag: "Polymer & Micro-Concrete",
        desc: "Scientific repair of beam/column cracks, rusted reinforcement treatment, and external plaster restoration.",
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Plumbing, Drainage & Electrical Overhaul",
        specTag: "Preventive MEP Care",
        desc: "Concealed pipeline leak detection, pressure pump servicing, distribution board upgrades, and earthing checks.",
        image:
          "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Exterior Weather-Coat & Interior Repainting",
        specTag: "Pristine Aesthetics",
        desc: "Crack-bridging exterior primers, anti-algal facade painting, and dust-free interior putty & paint refresh.",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        title: "On-Site Diagnostic Inspection",
        desc: "Our engineer visits your residential or commercial property with moisture meters to identify root causes.",
        image:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=700&q=80",
      },
      {
        step: "02",
        title: "Transparent Repair Estimate",
        desc: "You get a fixed-cost maintenance scope covering chemicals, materials, and skilled technician labour.",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=80",
      },
      {
        step: "03",
        title: "Clean Execution & Warranty",
        desc: "Fast, mess-free execution with post-service quality verification so your property stays like new.",
        image:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=700&q=80",
      },
    ],
    sampleProjects: [
      {
        title: "Complete Terrace Waterproofing & Facade",
        location: "Rajendra Nagar, Patna",
        specs: "3,200 sq.ft · 5-Year Damp-Proof Treatment",
        image:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      },
    ],
    faqs: [
      {
        q: "Kya purane ghar ki silan (seepage) aur cracks theek ho sakte hain?",
        a: "Haan, hum sirf upar se paint nahi karte balki polymer grouting aur chemical waterproofing se seepage ke root cause ko permanently band karte hain.",
      },
    ],
  },
  {
    id: "interior-design",
    slug: "interior-design",
    title: "Interior Design",
    shortDesc:
      "Redefine spaces with bespoke interior design, blending creativity and modern aesthetics to reflect your unique style.",
    badge: "3D Interior + Woodwork",
    ctaText: "Explore Interiors",
    indicativeRate: "Room-wise or Full Turnkey Interior",
    turnaroundTime: "15 – 45 Working Days",
    heroSubtitle:
      "Redefine spaces with bespoke interior design, blending creativity and modern aesthetics—modular kitchens, wardrobes, false ceilings, and lighting—to reflect your unique style.",
    deliverables: [
      "3D Interior Walkthrough & Renders",
      "Bespoke Modular Kitchen & Wardrobes",
      "False Ceiling, Lighting & Wall Panelling",
    ],
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
    ],
    detailedDeliverables: [
      {
        title: "Photorealistic 3D Room Visualizations",
        specTag: "See Before You Build",
        desc: "Approve every color, laminate texture, sofa placement, and lighting mood in 3D before carpentry begins.",
        image:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Modular Kitchen & Factory Woodwork",
        specTag: "BWP Marine Ply + Hettich/Hafele",
        desc: "Ergonomic modular kitchens, floor-to-ceiling sliding wardrobes, and TV consoles with soft-close hardware.",
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Designer False Ceiling & Ambient Lighting",
        specTag: "Gypsum · Cove · Profile LEDs",
        desc: "Layered gypsum/POP false ceiling designs paired with warm COB spotlights, magnetic tracks, and chandeliers.",
        image:
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "2D Carpentry & Electrical Working Drawings",
        specTag: "Millimeter Precision",
        desc: "Detailed internal partition and switchboard relocation sheets for flawless on-site execution.",
        image:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Laser Measurement & Style Moodboard",
        desc: "We measure your flat or house and curate design themes matching your lifestyle and budget.",
        image:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80",
      },
      {
        step: "02",
        title: "3D Design Approval & Material Touch",
        desc: "Touch and select actual laminate catalogs, veneers, quartz countertops, and lighting fixtures at Livitech Design Studio Patna.",
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=80",
      },
      {
        step: "03",
        title: "Precision Installation & Styling",
        desc: "Supervised woodwork, false ceiling, and deep-cleaned handover ready for your family to move in.",
        image:
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80",
      },
    ],
    sampleProjects: [
      {
        title: "3BHK Contemporary Luxury Interior",
        location: "Boring Road, Patna",
        specs: "1,750 sq.ft · Full Turnkey Interior",
        image:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Modern Villa Living & Modular Kitchen",
        location: "Danapur, Patna",
        specs: "2,200 sq.ft · Acrylic & Veneer Finish",
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      },
    ],
    faqs: [
      {
        q: "Kya hum sirf 3D Interior Design banwa kar apne carpenter se kaam karwa sakte hain?",
        a: "Haan, aap humse 'Design-Only Package' (3D Views + 2D Working Drawings) bhi le sakte hain ya full turnkey interior execution bhi karwa sakte hain.",
      },
    ],
  },
  {
    id: "architectural-services",
    slug: "architectural-services",
    title: "Architectural Services",
    shortDesc:
      "Expert architectural planning providing innovative floor plans and stunning 3D elevations to bring your vision to life.",
    badge: "2D · 3D · BIM",
    ctaText: "Explore Architecture",
    indicativeRate: "Per Sq.Ft Design Package",
    turnaroundTime: "5 – 10 Working Days",
    heroSubtitle:
      "Expert architectural planning providing Vastu-compliant 2D floor plans, structural engineering drawings, and stunning 3D elevations to bring your vision to life.",
    deliverables: [
      "2D Vastu Floor Plans",
      "Stunning 3D Front Elevations",
      "Structural & MEP Engineering Drawings",
    ],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    ],
    detailedDeliverables: [
      {
        title: "Innovative 2D Vastu Floor Plans",
        specTag: "CAD + Furniture Layout",
        desc: "Smart space utilization with natural cross-ventilation, sunlight, and Vastu compliance tailored to your plot.",
        image:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Stunning 3D Front Elevations",
        specTag: "Day & Night Exterior Renders",
        desc: "High-definition 3D exterior views with exact material textures, balcony railings, and facade lighting.",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Structural Engineering Drawings",
        specTag: "Column · Footing · Slab Steel",
        desc: "Detailed reinforcement schedules so your building stands strong for generations without structural guesswork.",
        image:
          "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "BOQ Cost & Municipal Drawing Set",
        specTag: "Approval + Budget Ready",
        desc: "Complete architectural blueprint booklet along with accurate material quantity and cost estimation.",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Requirement & Plot Briefing",
        desc: "Share your plot dimensions, road facing, and family requirements online or at our Patna Kankarbagh HQ.",
        image:
          "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=700&q=80",
      },
      {
        step: "02",
        title: "2D Layout & 3D Elevation Iteration",
        desc: "We refine the floor plan until you are 100% happy, then craft photorealistic 3D exterior views.",
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80",
      },
      {
        step: "03",
        title: "Working Construction Booklet Delivery",
        desc: "Receive complete structural, electrical, plumbing, and elevation working drawings in PDF and printed format.",
        image:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=700&q=80",
      },
    ],
    sampleProjects: [
      {
        title: "Contemporary G+3 Residential Elevation",
        location: "Kankarbagh, Patna",
        specs: "2,600 sq.ft · 2D + 3D + Structural",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Corner Plot Villa Architecture",
        location: "Gaya, Bihar",
        specs: "3,400 sq.ft · Vastu Compliant",
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      },
    ],
    faqs: [
      {
        q: "Kya 2D aur 3D design mein revisions milte hain?",
        a: "Haan, jab tak aapke parivar ko 2D layout aur 3D front look poori tarah pasand nahi aata, hum design revisions provide karte hain.",
      },
    ],
  },
  {
    id: "contractor-services",
    slug: "contractor-services",
    title: "Contractor Services",
    shortDesc:
      "Hassle-free contracting execution with over 440 quality checks, ensuring flawless craftsmanship and on-time delivery.",
    badge: "440+ Quality Checks",
    ctaText: "Explore Contracting",
    indicativeRate: "Stage-Wise Contracting Packages",
    turnaroundTime: "Strict Milestone Schedule",
    heroSubtitle:
      "Hassle-free contracting execution with over 440+ engineer-verified quality checks, skilled workforce management, and guaranteed on-time delivery.",
    deliverables: [
      "440+ Point Engineer Quality Checklist",
      "Verified Civil & Finishing Workforce",
      "Laser-Level Shuttering & On-Time Delivery",
    ],
    images: [
      "/images/rcc-structural-supervision.jpg",
      "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
    ],
    detailedDeliverables: [
      {
        title: "440+ Point Quality Audit System",
        specTag: "Zero Compromise Execution",
        desc: "Every stage—from excavation depth and steel stirrup spacing to concrete slump and curing—is checked against 440+ parameters.",
        image:
          "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Steel Shuttering & Laser Alignment",
        specTag: "Plumb & Level Precision",
        desc: "Leak-proof ply/steel shuttering, cover blocks, and mechanical vibrators for honeycomb-free columns and slabs.",
        image:
          "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Dedicated Site Engineer & Supervision",
        specTag: "Daily Progress Tracking",
        desc: "No more chasing local thekedars. Our qualified site engineers manage labour, drawings, and daily progress reports.",
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Time-Bound Milestone Agreement",
        specTag: "Written Penalty-Backed Timeline",
        desc: "Clear stage-wise timeline and transparent measurement billing so your project never stalls.",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Blueprint Study & Site Mobilization",
        desc: "Our contracting team reviews structural drawings, sets up site markings, and deploys verified crews.",
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=80",
      },
      {
        step: "02",
        title: "440+ Quality Check Execution",
        desc: "Every footing, column, beam, and brick wall passes strict engineer sign-offs before moving to the next stage.",
        image:
          "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=700&q=80",
      },
      {
        step: "03",
        title: "Final Quality Sign-Off & Handover",
        desc: "Complete structural and finishing audit report handed over on schedule.",
        image:
          "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=700&q=80",
      },
    ],
    sampleProjects: [
      {
        title: "G+3 RCC Structure & Masonry Execution",
        location: "Bihta, Patna",
        specs: "4,800 sq.ft · Passed 440+ Quality Checks",
        image:
          "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=800&q=80",
      },
    ],
    faqs: [
      {
        q: "Normal local thekedar aur Livitech Design Contractor Services mein kya farq hai?",
        a: "Local thekedar bina drawing aur bina engineer check ke andaze se kaam karte hain. Livitech Design mein 440+ quality checks, laser measurement, aur qualified civil engineers ki निगरानी mein kaam hota hai.",
      },
    ],
  },
];

export const COMING_SOON_SERVICES: ServiceItem[] = [
  {
    id: "turnkey-construction",
    slug: "turnkey-construction",
    title: "Turnkey Construction",
    badge: "Coming Soon · Onboarding Contractors",
    shortDesc:
      "End-to-end foundation to finishing residential & commercial construction with material, labour, and daily site engineer supervision.",
    ctaText: "Inquire Now",
    isComingSoon: true,
    indicativeRate: "Launching Soon in Bihar",
    turnaroundTime: "TBA",
    heroSubtitle: "Complete turnkey construction execution launching soon across Bihar.",
    deliverables: [
      "Excavation to Key Handover",
      "Daily Engineer Site Log",
      "Tier-1 Material Guarantee",
    ],
    images: [
      "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    id: "building-materials",
    slug: "building-materials",
    title: "Building Materials Marketplace",
    badge: "Coming Soon · Direct Mill Tie-ups",
    shortDesc:
      "Direct factory wholesale sourcing for Ultratech/Ambuja cement, Tata/Jindal TMT bars, red bricks, stone aggregate, and electrical conduits.",
    ctaText: "Inquire Now",
    isComingSoon: true,
    indicativeRate: "Wholesale Mill Pricing",
    turnaroundTime: "TBA",
    heroSubtitle: "Direct material marketplace launching soon across Patna & Bihar.",
    deliverables: [
      "Direct Factory TMT & Cement",
      "Transparent Wholesale Rates",
      "Same-Day Site Delivery",
    ],
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    id: "project-financing",
    slug: "project-financing",
    title: "Project Financing & Bank DPR",
    badge: "Coming Soon · Bank Panels",
    shortDesc:
      "SBI, HDFC & PNB approved construction loan documentation, detailed project reports (DPR), and certified property valuation.",
    ctaText: "Inquire Now",
    isComingSoon: true,
    indicativeRate: "Bank Partnered Rates",
    turnaroundTime: "TBA",
    heroSubtitle: "Project financing facilitation and bank approvals launching soon.",
    deliverables: [
      "SBI & HDFC Home Loan DPR",
      "Bank Approved Valuations",
      "Fast Document Clearance",
    ],
    images: [
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=85",
    ],
  },
];

export const PROJECT_JOURNEY_STEPS: JourneyStep[] = [
  {
    stepNumber: "01",
    title: "Plan & Design",
    subtitle: "Plot measurement se lekar 2D Naksha aur 3D View tak",
    items: ["Residential & Commercial Architecture", "2D Vastu Floor Plans", "3D Elevation & Structural Drawings"],
    mainImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    caption: "CAD Blueprint + Photorealistic 3D Render before laying a single brick.",
  },
  {
    stepNumber: "02",
    title: "Estimate & BOQ",
    subtitle: "Har ek rupaye aur material bag ka transparent hisab",
    items: ["Itemized BOQ Cost Estimation", "Steel & Cement Quantity Calculation", "Milestone-wise Budget Planning"],
    mainImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80",
    caption: "Exact cement, TMT steel, and brick quantities locked upfront.",
  },
  {
    stepNumber: "03",
    title: "Structural Drawings",
    subtitle: "Safe columns, beam layout & earthquake engineering",
    items: ["Structural Column & Footing Blueprints", "Soil Bearing Capacity SBC Review", "Municipal Approval Drawings"],
    mainImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80",
    caption: "Licensed structural engineer signed drawings for complete safety.",
  },
  {
    stepNumber: "04",
    title: "Site Inspection",
    subtitle: "Engineers ki dekh-rekh mein rigorous quality supervision",
    items: ["Rebar Spacing & Cover Block Audit", "Concrete Slump & Cube Strength Checks", "Live Geotagged Site Inspection Reports"],
    mainImage: "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1000&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    caption: "Live site inspection and stage-by-stage photo updates on WhatsApp.",
  },
  {
    stepNumber: "05",
    title: "Interiors & Handover",
    subtitle: "Luxury 3D interiors, lighting simulation, aur final delivery",
    items: ["Modular Woodwork & Interior Planning", "False Ceiling & Profile Lighting Plan", "Final As-Built Handover File"],
    mainImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
    caption: "Move-in ready design and execution blueprints delivered on schedule.",
  },
];

export const BLUEPRINT_COMPARISONS: BlueprintComparisonItem[] = [
  {
    id: "comp-residential",
    category: "Residential Architecture",
    title: "Modern G+2 Family Residence",
    location: "Kankarbagh, Patna",
    areaSqFt: "2,400 sq.ft",
    costEstimate: "₹42.5 Lakhs (Estimated)",
    duration: "9 Months",
    beforeLabel: "2D CAD Blueprint & Structure",
    afterLabel: "Completed 3D Elevation & Finish",
    beforeImage:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
    highlights: [
      "100% Vastu-compliant 4BHK + Parking layout",
      "Zero deviation between 3D render and on-site elevation",
      "Structural AutoCAD column-beam detailing by Livitech Design engineers",
    ],
  },
  {
    id: "comp-site-execution",
    category: "Commercial Planning",
    title: "Multi-Storey Showroom & Office Complex",
    location: "Bailey Road, Patna",
    areaSqFt: "8,500 sq.ft",
    costEstimate: "₹1.45 Crore (Project DPR)",
    duration: "14 Months",
    beforeLabel: "Raw RCC Frame & Site Work",
    afterLabel: "Finished Structural Glazing & Facade",
    beforeImage:
      "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1400&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
    highlights: [
      "Heavy commercial column-beam structural engineering",
      "ACP cladding & toughened glass front elevation design",
      "Bank sanction approved Detailed Project Report (DPR)",
    ],
  },
  {
    id: "comp-interior",
    category: "Interior & Finishing",
    title: "Luxury Living Room & Modular Woodwork",
    location: "Danapur, Patna",
    areaSqFt: "1,850 sq.ft",
    costEstimate: "₹12.8 Lakhs (Interior DPR)",
    duration: "45 Days",
    beforeLabel: "Bare Plaster & Electrical Wire Stage",
    afterLabel: "Turnkey Luxury Interior Handover",
    beforeImage:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    highlights: [
      "3D interior walkthrough approved before execution",
      "Italian-finish tiles, false ceiling & warm profile lighting specs",
      "BWP marine plywood modular detailing with 10-year warranty specs",
    ],
  },
];

export const CONSTRUCTION_PACKAGES: ConstructionPackage[] = [
  {
    id: "basic-structure",
    name: "Basic Structure",
    priceRange: "₹1,250 – ₹1,400 /sqft",
    tagline:
      "A budget package with no compromise on quality that includes all construction essentials",
    ratePerSqFt: 1325,
    highlights: [
      "Trusted brand steel & cement",
      "Standard flush doors and window finish",
      "Tractor Emulsion finish",
      "Essential kitchen & bathroom fittings",
      "Class-1 brickwork & structural RCC",
    ],
    structure: {
      steel: "Kamdhenu / Shyam Steel Fe-500D TMT",
      cement: "Bangur / Birla Gold / Prism 43 Grade",
      aggregate: "20mm & 10mm Machine-Crushed Stone Aggregate",
      sand: "Koel / Sone River Coarse Red Sand",
      masonry: "Standard Class-1 Red Clay Bricks",
    },
    finishing: {
      flooring: "Vitrified Flooring Tiles (2x2 ft) in living, bedroom & kitchen",
      paint: "Asian Paints Tractor Emulsion finish",
      doors: "Standard flush doors and window finish",
      windows: "Powder-coated 2-track aluminium sliding windows",
      kitchenBath: "Essential kitchen & bathroom fittings with stainless steel sink",
    },
    mep: {
      wiring: "Anchor / Polycab FRLS flame retardant wire",
      plumbing: "Supreme / Astral PVC & CPVC pipes",
      switches: "Anchor Roma modular switches",
    },
    timelineMonths: 6,
  },
  {
    id: "basic-finishing",
    name: "Basic Finishing",
    priceRange: "₹1,900 – ₹2,200 /sqft",
    tagline:
      "The Best-Seller Package. Upgrade your home with trusted brands like Jindal Steel and Hindware at an affordable price.",
    popular: true,
    ratePerSqFt: 2050,
    highlights: [
      "Superior brand cement & steel",
      "Elegant teak doors and window finish",
      "Stylish kitchen & bathroom",
      "High-Grade Bricks",
    ],
    structure: {
      steel: "Jindal Panther / Tata Tiscon Fe-550D TMT",
      cement: "Superior brand cement & steel (UltraTech / Ambuja)",
      aggregate: "Pakur Black Stone High-Density Aggregate",
      sand: "Screened Sone River Coarse Sand",
      masonry: "High-Grade Bricks (Class-1 Kiln Burned)",
    },
    finishing: {
      flooring: "Double Charge Vitrified Tiles 4x2 ft (₹75/sq.ft value)",
      paint: "Asian Paints Apcolite Premium + Exterior Apex Shield",
      doors: "Elegant teak doors and window finish",
      windows: "UPVC soundproof 2.5-track windows with toughened glass",
      kitchenBath: "Stylish kitchen & bathroom with Hindware sanitary & Jaquar fittings",
    },
    mep: {
      wiring: "Havells / Polycab flame-safe copper cables with MCB box",
      plumbing: "Astral / Ashirvad CPVC hot & cold concealed lines",
      switches: "Legrand / Schneider electric modular range",
    },
    timelineMonths: 8,
  },
  {
    id: "advance-finishing",
    name: "Advance Finishing",
    priceRange: "₹2,500 – ₹3,000+ /sqft",
    tagline:
      "Designed for Modern Living: An elegant package with luxury additions, including solar heating setups and dedicated puja room doors.",
    ratePerSqFt: 2750,
    highlights: [
      "Superior Brand steel & cement",
      "Designer teak doors and window finish",
      "Best quality bathroom & kitchen",
      "Textured Designer Paint",
      "AAC Blocks / High-Grade Bricks",
      "Solar heating setups & dedicated puja room doors",
    ],
    structure: {
      steel: "Superior Brand steel (Tata Tiscon SD 550D) with test reports",
      cement: "Superior Brand cement (UltraTech Weather Pro / ACC Concrete Plus)",
      aggregate: "Pakur A-Grade Machine-Crushed Cubical Aggregate",
      sand: "Double-Washed Sone River Sand",
      masonry: "AAC Blocks / High-Grade Bricks",
    },
    finishing: {
      flooring: "Large format 4x2 ft Glazed Vitrified Tiles (GVT) & wooden plank tiles",
      paint: "Textured Designer Paint on focal walls + Asian Paints Royale",
      doors: "Designer teak doors and window finish with dedicated handcrafted puja room doors",
      windows: "Heavy-duty Fenesta soundproof acoustic UPVC system",
      kitchenBath: "Best quality bathroom & kitchen (Kohler / Grohe / Franke)",
      specialFeatures: [
        "Solar heating setups ready provision",
        "Dedicated puja room doors with brass hardware",
        "Textured designer wall finish",
      ],
    },
    mep: {
      wiring: "Finolex / Havells smart home ready conduit wiring with isolators",
      plumbing: "Grohe / Kohler concealed wall-hung flush valves & diverters",
      switches: "Touch-ready smart modular switches",
    },
    timelineMonths: 10,
  },
  {
    id: "premium-finishing",
    name: "Premium Finishing",
    priceRange: "₹3,200 – ₹4,000+ /sqft",
    tagline:
      "Premium finishes meeting modern lifestyle features, from EV charging ports to secure copper gas connections.",
    ratePerSqFt: 3600,
    highlights: [
      "Superior Brand steel & cement",
      "Designer teak doors and window finish",
      "Apex Ultima Exterior finish",
      "Lavish Fittings for kitchen & bathroom",
      "AAC Blocks / High-Grade Bricks",
      "Bespoke Designer Kitchen & Wardrobes",
      "EV charging ports & secure copper gas connections",
    ],
    structure: {
      steel: "Superior Brand steel & cement (Tata Tiscon 550D SD Super Ductile)",
      cement: "UltraTech Weather Pro 53 Grade / Ambuja Composite",
      aggregate: "Pakur Mechanized Cubical Aggregate",
      sand: "Triple-Screened Machine-Washed Sand",
      masonry: "AAC Blocks / High-Grade Bricks",
    },
    finishing: {
      flooring: "Imported Italian Marble / 6x4 ft Ultra-Luxury GVT Slabs",
      paint: "Apex Ultima Exterior finish + Asian Paints Royale Luxury Interior",
      doors: "Designer teak doors and window finish with digital biometric lock",
      windows: "Schuco / Fenesta Thermal Break Aluminium or Luxury UPVC",
      kitchenBath: "Lavish Fittings for kitchen & bathroom + Bespoke Designer Kitchen & Wardrobes",
      specialFeatures: [
        "EV charging ports in covered parking bay",
        "Secure copper gas connections with safety cutoff",
        "Bespoke Designer Kitchen & Wardrobes",
        "Home automation & smart lighting ready",
      ],
    },
    mep: {
      wiring: "RR Kabel / Havells halogen-free copper with surge protector",
      plumbing: "Kohler / Toto concealed thermostatically controlled diverters",
      switches: "Smart Wi-Fi enabled automation touch switches",
    },
    timelineMonths: 12,
  },
];

export const COST_PACKAGES: CostPackage[] = [
  {
    id: "basic",
    name: "Essential Structure",
    badge: "Foundation & Civil Essentials",
    pricePerSqFt: "₹1,550 – ₹1,750 /sq.ft",
    rateMin: 1550,
    rateMax: 1750,
    subtitle:
      "A strong budget-friendly package with zero compromise on structural safety and essentials.",
    highlights: [
      "Grade-A TMT Steel & OPC/PPC Cement",
      "Standard flush doors & aluminium windows",
      "Emulsion wall finish & anti-skid flooring",
      "Essential sanitary & electrical piping",
    ],
    image:
      "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "standard",
    name: "Standard Finishing",
    badge: "Most Popular in Bihar",
    pricePerSqFt: "₹1,950 – ₹2,250 /sq.ft",
    rateMin: 1950,
    rateMax: 2250,
    subtitle:
      "The homeowner favorite. Upgrade your home with branded steel, teak wood finish, and elegant tiles.",
    highlights: [
      "Top-tier brand cement & Fe-550D TMT steel",
      "Teakwood finish main door & premium windows",
      "Branded sanitaryware (Hindware/Parryware)",
      "High-grade vitrified tiles & weather-proof paint",
    ],
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    popular: true,
  },
  {
    id: "advance",
    name: "Advance Finishing",
    badge: "Modern Luxury Living",
    pricePerSqFt: "₹2,600 – ₹3,100 /sq.ft",
    rateMin: 2600,
    rateMax: 3100,
    subtitle:
      "Designed for modern lifestyle with designer architectural touches, false ceiling, and solar prep.",
    highlights: [
      "Superior structural engineering with AAC blocks",
      "Designer solid teak doors & premium hardware",
      "Modular kitchen setup & designer bathroom fittings",
      "Textured designer exterior paint & profile lighting",
    ],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "premium",
    name: "Bespoke Premium",
    badge: "Ultimate Architectural Finish",
    pricePerSqFt: "₹3,300 – ₹4,200+ /sq.ft",
    rateMin: 3300,
    rateMax: 4200,
    subtitle:
      "Absolute luxury meeting high-end lifestyle features, Italian marble feel, and bespoke woodwork.",
    highlights: [
      "Bespoke designer kitchen & full built-in wardrobes",
      "Apex Ultima exterior finish & Italian-spec tile options",
      "EV charging point & secure copper gas line prep",
      "Dedicated senior architect site supervision",
    ],
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
  },
];

export const ON_SITE_AUDITS: OnSiteAuditItem[] = [
  {
    id: "audit-1",
    checkpoint: "RCC Slab & Beam Steel Reinforcement Spacing",
    stage: "Structure Execution",
    tolerance: "± 2mm clear cover & spacing",
    importance: "Guarantees earthquake resistance and eliminates slab deflection under live loads.",
    image: "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=800&q=80",
    blueprintImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    engineerRole: "Senior Civil Structural Inspector",
  },
  {
    id: "audit-2",
    checkpoint: "Ready Mix / Site M25 Concrete Cube Compressive Test",
    stage: "Casting & Pouring",
    tolerance: "Min 25 N/mm² at 28-day curing",
    importance: "Ensures foundation and columns withstand 3 storeys without microscopic shear fissures.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    blueprintImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    engineerRole: "Quality Control Lab Engineer",
  },
  {
    id: "audit-3",
    checkpoint: "Laser Plumb-Line & Vertical Level Audit",
    stage: "Brick Masonry & Plaster",
    tolerance: "100% true vertical within 1mm per 3m",
    importance: "Prevents plaster cracks, tilted door frames, and water stagnation in bathrooms.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
    blueprintImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    engineerRole: "Site Project Manager",
  },
  {
    id: "audit-4",
    checkpoint: "Concealed Pressure-Piping Leak Testing",
    stage: "MEP & Plumbing",
    tolerance: "10 Bar hydro pressure hold for 24 hrs",
    importance: "Prevents wall dampness (seelan), seepage, and electrical short circuits permanently.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    blueprintImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    engineerRole: "MEP Engineering Specialist",
  },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "The Kankarbagh Royal Duplex Villa",
    category: "Residential",
    location: "Kankarbagh, Patna",
    area: "3,200 sq.ft (G+2)",
    budget: "₹58 Lakhs",
    duration: "8.5 Months",
    tag: "Completed Handover",
    description: "Modern contemporary residence featuring double-height ceiling, terracotta louvers, custom Italian marble flooring and automated lighting.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
    ],
  },
  {
    id: "proj-2",
    title: "Dharmrath Commercial Plaza & Showroom",
    category: "Commercial",
    location: "Bailey Road, Patna",
    area: "14,500 sq.ft (B+G+4)",
    budget: "₹2.8 Crores",
    duration: "14 Months",
    tag: "Structural Completion",
    description: "RCC shear-wall commercial complex with double basement car parking, high-performance curtain glass facade and earthquake resistance.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=85",
    ],
  },
  {
    id: "proj-3",
    title: "Vastu Courtyard Family Residence",
    category: "Turnkey",
    location: "Muzaffarpur, Bihar",
    area: "2,600 sq.ft (G+1)",
    budget: "₹46 Lakhs",
    duration: "7 Months",
    tag: "100% On-Time Handover",
    description: "Traditional courtyard layout blended with Scandinavian minimalism. Complete turnkey execution from foundation excavation to garden landscaping.",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=85",
    ],
  },
  {
    id: "proj-4",
    title: "Danapur Luxury Penthouse Interiors",
    category: "Interior",
    location: "Danapur, Patna",
    area: "2,100 sq.ft",
    budget: "₹22 Lakhs",
    duration: "40 Days",
    tag: "Interior Excellence",
    description: "Turnkey interior overhaul featuring veneer panelling, concealed magnetic LED channels, walk-in closets and island modular kitchen with quartz counter.",
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
    ],
  },
];

export const BUILDING_MATERIALS: MaterialItem[] = [
  {
    id: "mat-1",
    name: "Tata Tiscon 550D TMT Rebars",
    category: "TMT Steel",
    brand: "Tata Steel",
    image: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=600&q=80",
    unit: "Per Metric Tonne (MT)",
    marketPrice: "₹63,500",
    livitectWholesalePrice: "₹58,200",
    savings: "Save ₹5,300/MT",
    verifiedGrade: "Fe-550D Super Ductile with Mill Test Certificate",
  },
  {
    id: "mat-2",
    name: "UltraTech Weather Plus Cement",
    category: "Cement",
    brand: "UltraTech",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
    unit: "Per 50 Kg Bag",
    marketPrice: "₹415",
    livitectWholesalePrice: "₹372",
    savings: "Save ₹43/Bag",
    verifiedGrade: "PPC Water Repellent Grade with Damp-Guard",
  },
  {
    id: "mat-3",
    name: "A-Grade Kiln Red Bricks (Chowka)",
    category: "Bricks",
    brand: "Patna Riverbed Kilns",
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80",
    unit: "Per 1,000 Pcs (Tractor Load)",
    marketPrice: "₹12,800",
    livitectWholesalePrice: "₹11,100",
    savings: "Save ₹1,700/K",
    verifiedGrade: "First Class Kiln Burnt (Compressive Strength > 105 kg/cm²)",
  },
  {
    id: "mat-4",
    name: "Kajaria 4x2 GVT Designer Floor Slabs",
    category: "Tiles & Slabs",
    brand: "Kajaria / Somany",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=600&q=80",
    unit: "Per Sq.Ft",
    marketPrice: "₹85",
    livitectWholesalePrice: "₹64",
    savings: "Save 24%",
    verifiedGrade: "Full Body Glazed Vitrified Stain-Resistant Slabs",
  },
];

export const TRUST_METRICS = [
  { metric: "120+", label: "Civil Quality Inspection Checkpoints", desc: "Every architectural plan & RCC casting audited by licensed engineers" },
  { metric: "100%", label: "Fixed-Cost BOQ Contract", desc: "Zero surprise price hikes or hidden quantities" },
  { metric: "100% Vastu", label: "Vastu Shastra Compliant Plans", desc: "Designed according to modern daylighting and Vastu orientation" },
  { metric: "Patna HQ", label: "Direct In-Person Support", desc: "Central office at Dharmrath Palace, Kankarbagh" },
];

export const FAQ_LIST: FaqItem[] = [
  {
    question: "Patna mein 2026 mein architectural naksha aur 3D elevation ka rate kya hai?",
    answer: "Livitech Design (livitechdesign.in) par Vastu-compliant 2D architectural naksha ₹12 se ₹20 per sq.ft ke beech banta hai jisme detailed room planning, furniture zoning, day/night 3D elevation views, aur municipal map approval compliance shamil hota hai.",
    category: "Cost & Pricing",
  },
  {
    question: "Kya Livitech Design architectural naksha aur Nagar Nigam map sanction karwati hai?",
    answer: "Haan. Hamari in-house architectural team Patna Nagar Nigam, RERA Bihar, aur anya nagar nigamon ke bye-laws ke mutabiq Vastu-compliant 2D architectural naksha, structural engineering drawings, aur municipal sanction file prepare karti hai.",
    category: "Architecture & Approvals",
  },
  {
    question: "Turnkey Construction, Wholesale Materials aur Financing kab launch honge?",
    answer: "Turnkey Construction, Wholesale Building Materials aur Project Financing hamari 'Coming Soon' services hain jo agle quarter mein launch hongi. Abhi hum verified local labor contractors, direct brand mill depots, aur commercial banking panels ko onboard kar rahe hain. Tab tak aap hamari active services jaise Architecture & 3D, Detailed BOQ Estimation, aur Site Supervision ka laabh livitechdesign.in par le sakte hain.",
    category: "Upcoming Services",
  },
  {
    question: "Detailed BOQ (Bill of Quantities) report mein kya-kya milta hai?",
    answer: "Detailed BOQ mein aapke plot aur manzil ke hisaab se cement ki exact boriyaan (bags), steel (sariya) ka metric ton me wajan, baloo (sand), gitti (aggregate), tiles, aur electrical fittings ka itemized hisaab milta hai taaki thekedar aapse extra paise na le sake.",
    category: "Estimation & BOQ",
  },
  {
    question: "Local thekedar ke mukable Livitech Design se naksha aur estimation karwane ka kya fayda hai?",
    answer: "Local thekedar bina structural calculation ke andaze se column-beam dalte hain jisse dararen padne aur seelan ka khatra rehta hai. Livitech Design (livitechdesign.in) mein certified civil aur structural engineers kaam karte hain jo load calculation karke safe aur economical layout dete hain.",
    category: "Why Livitech Design",
  },
];

export const HAPPY_CLIENTS: ClientTestimonial[] = [
  {
    id: "client-1",
    name: "Er. Rajeshwar Singh",
    role: "Retd. Executive Engineer, Govt. of Bihar",
    location: "Kankarbagh, Patna",
    projectType: "G+2 Modern Residential Villa",
    area: "2,800 sq.ft",
    rating: 5.0,
    review:
      "Livitech Design ne mere Kankarbagh wale plot par G+2 villa ka 2D naksha aur 3D elevation banaya. Pehle din hi Vastu aur room dimensions itne perfect the ki thekedar ko execution mein 1% bhi takleef nahi hui. Bihar mein aisi professional architectural team milna mushkil hai.",
    clientImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    houseImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    verifiedBadge: "Verified Homeowner · livitechdesign.in",
    deliveredYear: "2024",
  },
  {
    id: "client-2",
    name: "Dr. Ananya Mishra & Dr. S. K. Mishra",
    role: "Senior Consultant Physicians",
    location: "Bailey Road, Danapur, Patna",
    projectType: "Luxury Duplex Residence with Garden",
    area: "3,400 sq.ft",
    rating: 5.0,
    review:
      "Hum hospital schedule mein itne busy rehte the ki daily site par nahi ja sakte the. livitechdesign.in ki team ne hume 3D walkthrough aur detailed BOQ sheet di jisse cement, sariya aur budget pehle hi freeze ho gaya. Exterior elevation pure Bailey Road par sabse alag aur classy dikhta hai.",
    clientImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    houseImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
    verifiedBadge: "Verified Homeowner · livitechdesign.in",
    deliveredYear: "2024",
  },
  {
    id: "client-3",
    name: "Manoj Kumar Agarwal",
    role: "Commercial Investor & Entrepreneur",
    location: "Muzaffarpur Central Belt, Bihar",
    projectType: "Commercial Cum Showroom Complex",
    area: "6,200 sq.ft",
    rating: 5.0,
    review:
      "Ground floor par retail showrooms aur upper floors par residential flats ka map sanction aur structural design Livitech Design ne finalize kiya. Unka commercial elevation design itna attractive bana ki ground floor retail shops construction poora hone se pehle hi book ho gayi.",
    clientImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    houseImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
    verifiedBadge: "Verified Commercial Client · livitechdesign.in",
    deliveredYear: "2023",
  },
  {
    id: "client-4",
    name: "Shambhu Nath Jha",
    role: "Central Govt. Officer",
    location: "Gaya & Bodhgaya Road, Bihar",
    projectType: "G+1 Contemporary House",
    area: "1,950 sq.ft",
    rating: 5.0,
    review:
      "Plot ka frontage kam tha, lekin Livitech Design ke architects ne space optimization itna behtareen kiya ki har kamre mein natural dhoop aur hawa aati hai. 3D elevation mein jo color combination diya tha, wahi paint humne karwaya aur ghar bilkul waisa hi banta chala gaya.",
    clientImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    houseImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
    verifiedBadge: "Verified Homeowner · livitechdesign.in",
    deliveredYear: "2024",
  },
  {
    id: "client-5",
    name: "Amitesh Verma",
    role: "Software Architect (Remote)",
    location: "Bihta, Greater Patna",
    projectType: "Sustainable Villa with Terrace Garden",
    area: "2,200 sq.ft",
    rating: 5.0,
    review:
      "Bangalore se Patna shift hone ke baad main chahta tha ki mera ghar modern ho jisme dedicated home office aur terrace garden ho. livitechdesign.in ne 7 din ke andar 3D elevation aur complete working drawing deliver kar di. On-site casting audit bhi time par kiya.",
    clientImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    houseImage:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80",
    verifiedBadge: "Verified Homeowner · livitechdesign.in",
    deliveredYear: "2024",
  },
];

export const EXTERIOR_DESIGNS: ExteriorDesignPost[] = [
  {
    id: "ext-1",
    slug: "60-creative-elevation-design-ideas-modern-homes",
    title: "60+ Creative Elevation Design Ideas for Modern Homes in 2024 & 2025",
    subtitle:
      "Trending architectural facade concepts for Indian plots featuring double-height glass, wooden louvers, and warm profile LED accents.",
    category: "Modern Villa",
    publishDate: "September 22, 2024",
    readTime: "6 min read",
    coverImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    elevationGallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    ],
    excerpt:
      "In the ever-evolving world of architecture and home design, staying ahead of trends is essential for homeowners looking to make a lasting impression. Elevation design plays a crucial role in modern facade aesthetics, defining character and curb appeal.",
    highlights: [
      "Double-height living room exterior glazing",
      "Weather-resistant composite louvers (WPC panels)",
      "Concealed architectural cove lighting for night facade",
      "Terracotta burnt tile accents with textured finish",
    ],
    plotSizesRecommended: "1,500 – 4,000 sq.ft (East / North Facing)",
    styleTags: ["Modern Contemporary", "Double-Height Glass", "WPC Louvers", "Terracotta Accent"],
  },
  {
    id: "ext-2",
    slug: "10-stunning-elevation-designs-ideas-to-elevate-your-home",
    title: "10 Stunning Elevation Designs Ideas to Elevate Your Home",
    subtitle:
      "From sleek minimalist lines to timeless stone textures: curated exterior ideas that set the tone for your dream home.",
    category: "Luxury Facade",
    publishDate: "May 13, 2024",
    readTime: "5 min read",
    coverImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    elevationGallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    ],
    excerpt:
      "Your home's exterior is its first impression, setting the tone for the style and ambiance within. From sleek modern designs to classic architectural inspirations, we have curated a collection by livitechdesign.in that transforms everyday plots into landmarks.",
    highlights: [
      "Cantilevered master balconies with glass railings",
      "Stone cladding focal walls on the stair tower",
      "Symmetrical Vastu-compliant window placement",
      "Pergola roof terrace garden integration",
    ],
    plotSizesRecommended: "2,000 – 5,000 sq.ft",
    styleTags: ["Luxury Facade", "Toughened Glass Balcony", "Stone Cladding", "Pergola Sit-out"],
  },
  {
    id: "ext-3",
    slug: "how-to-make-your-house-elevation-unique-and-beautiful",
    title: "How to Make Your House Elevation Unique and Beautiful",
    subtitle:
      "Architectural guide on proportion, material layering, weather protection, and natural lighting optimization.",
    category: "Design Guide",
    publishDate: "October 25, 2023",
    readTime: "7 min read",
    coverImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    elevationGallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    ],
    excerpt:
      "Your home's exterior is the first thing that greets both you and your guests, making a memorable first impression. The house elevation, or facade, plays a pivotal role in defining visual identity while defending against Bihar's hot summers and heavy monsoon rains.",
    highlights: [
      "Rule of 3: Main body, accent texture, and grounding base",
      "Chhajja (sunshade) depth calculation for solar heat reduction",
      "Concealed rainwater downspouts inside structural columns",
      "Strategic warm spot lights to highlight architectural masses",
    ],
    plotSizesRecommended: "All plot sizes (Narrow & Wide frontages)",
    styleTags: ["Architect Guide", "Bihar Weather Proofing", "Chhajja Sizing", "Material Layering"],
  },
  {
    id: "ext-4",
    slug: "vibrant-vistas-diverse-elevation-designs-colors",
    title: "Vibrant Vistas: Exploring Diverse Elevation Designs in a Spectrum of Colors",
    subtitle:
      "Mastering color psychology on house facades: terracotta browns, slate charcoals, and warm earth tones.",
    category: "Color Palettes",
    publishDate: "October 3, 2023",
    readTime: "4 min read",
    coverImage:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85",
    elevationGallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    ],
    excerpt:
      "When it comes to architectural aesthetics, elevation design plays a pivotal role in defining the character and personality of a building. One captivating aspect of elevation design is the strategic use of color palettes that remain fade-proof under bright Indian sunlight.",
    highlights: [
      "Terracotta (#924621) warm earthen focal points",
      "Charcoal gray powder-coated aluminum window frames",
      "Off-white weather-shield elastomeric exterior paints",
      "Natural teak wood finish exterior HPL sheets",
    ],
    plotSizesRecommended: "1,200 – 3,500 sq.ft",
    styleTags: ["Terracotta Palette", "Color Psychology", "Weather-Shield Paint", "Exterior HPL"],
  },
  {
    id: "ext-5",
    slug: "top-15-best-g1-g2-house-exterior-designs",
    title: "Top 15 Best G+1 & G+2 House Exterior Designs for Bihar Plots",
    subtitle:
      "Tailor-made elevation models for 20ft, 25ft, 30ft, and 40ft frontages with full parking and balcony zoning.",
    category: "G+1 & G+2 Elevation",
    publishDate: "May 3, 2022",
    readTime: "6 min read",
    coverImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
    elevationGallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    ],
    excerpt:
      "These 15 contemporary house elevation designs curated by livitechdesign.in are specifically optimized for G+1 and G+2 family residences across Patna, Muzaffarpur, Gaya, and Darbhanga, balancing luxury aesthetics with budget-conscious construction.",
    highlights: [
      "Covered car parking with modern MS sliding gates",
      "Separate entrance staircase for upper rental units",
      "Vastu-compliant Pooja room corner projection",
      "Cost-efficient grooving and plaster molding details",
    ],
    plotSizesRecommended: "1,200 – 2,500 sq.ft (Frontage: 20ft to 40ft)",
    styleTags: ["G+1 & G+2 Elevation", "Narrow Plot Frontage", "Rental Unit Staircase", "Plaster Grooving"],
  },
  {
    id: "ext-6",
    slug: "top-modern-apartment-commercial-facade-designs",
    title: "Top Modern Apartment & Commercial Facade Designs",
    subtitle:
      "Commercial complexes and multi-family residential apartments planned under municipal bye-laws and structural glazing.",
    category: "Commercial & Apartment",
    publishDate: "January 1, 2022",
    readTime: "5 min read",
    coverImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    elevationGallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=800&q=80",
    ],
    excerpt:
      "Explore high-impact apartment and commercial exterior facades designed in BIM and AutoCAD by livitechdesign.in. Featuring modern structural glazing, high-grade ACP cladding, and grand entrance lobbies complying with Patna building bye-laws.",
    highlights: [
      "Structural silicone glazing with heat-reflective DGU glass",
      "Fire-retardant exterior ACP sheet cladding",
      "High-visibility brand signage zones for retail tenants",
      "Integrated ramp and disabled-friendly accessible entrance",
    ],
    plotSizesRecommended: "4,000 – 15,000 sq.ft (Main Road Commercial)",
    styleTags: ["Commercial Facade", "Structural Glazing", "ACP Sheets", "Municipal Approved"],
  },
];

