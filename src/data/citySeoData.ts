export interface CitySeoInfo {
  cityName: string;
  slug: string;
  state: string;
  avgConstructionRate: string;
  popularLocalAreas: string[];
  heroHeadline: string;
  heroDescription: string;
  localFaqs: { q: string; a: string }[];
}

export const BIHAR_SEO_CITIES: CitySeoInfo[] = [
  {
    cityName: "Patna",
    slug: "patna",
    state: "Bihar",
    avgConstructionRate: "₹1,650 – ₹2,400 per sq.ft",
    popularLocalAreas: [
      "Kankarbagh",
      "Bailey Road",
      "Boring Road",
      "Patliputra",
      "Danapur",
      "Anisabad",
      "Rajendra Nagar",
      "Saguna More",
    ],
    heroHeadline: "Best Architecture & Construction Services in Patna",
    heroDescription:
      "Looking for trusted civil engineers, 2D/3D architects, or cost estimation in Patna? Livitech Design delivers Vastu-compliant architecture, structural design, and transparent BOQ from our Kankarbagh HQ.",
    localFaqs: [
      {
        q: "Patna mein 2000 sq ft ghar banane ka kya kharcha hai?",
        a: "Patna mein 2000 sq.ft. residential construction ka kharcha standard finish ke sath lagbhag ₹35 Lakh se ₹45 Lakh ke beech aata hai.",
      },
      {
        q: "Livitech Design ka Patna mein office kahan hai?",
        a: "Livitech Design ka main headquarters 301, Dharmrath Palace, Kankarbagh, Patna, Bihar – 800020 par sthit hai.",
      },
      {
        q: "Kya Patna mein Vastu compliant architectural design milta hai?",
        a: "Haan, Livitech Design ke certified architects scientific daylighting aur 100% Vastu shastra ke hisab se 2D floor plans aur 3D elevations design karte hain.",
      },
    ],
  },
  {
    cityName: "Muzaffarpur",
    slug: "muzaffarpur",
    state: "Bihar",
    avgConstructionRate: "₹1,550 – ₹2,200 per sq.ft",
    popularLocalAreas: [
      "Brahmpura",
      "Mithanpura",
      "Ramdayalu Nagar",
      "Company Bagh",
      "Juran Chapra",
      "Ahiyapur",
    ],
    heroHeadline: "Leading Architecture & Building Consultants in Muzaffarpur",
    heroDescription:
      "Build your dream home or commercial complex in Muzaffarpur with Livitech Design. Get Vastu floor plans, 3D elevations, and precise material cost estimates.",
    localFaqs: [
      {
        q: "Kya Muzaffarpur mein on-site engineer supervision milti hai?",
        a: "Haan, Livitech Design ke civil engineers Muzaffarpur mein plot visit aur stage-wise quality inspection provide karte hain.",
      },
      {
        q: "Muzaffarpur ke liye cost estimation sheet kitni der mein milti hai?",
        a: "Aap online request submit karne ke 24 ghante ke andar itemized BOQ estimate prapt kar sakte hain.",
      },
    ],
  },
  {
    cityName: "Gaya",
    slug: "gaya",
    state: "Bihar",
    avgConstructionRate: "₹1,500 – ₹2,100 per sq.ft",
    popularLocalAreas: [
      "Civil Lines",
      "Bodh Gaya Road",
      "Delha",
      "Rampur",
      "Railway Colony",
      "AP Colony",
    ],
    heroHeadline: "Professional Architects & Construction Experts in Gaya",
    heroDescription:
      "Get expert architectural design, structural engineering, and BOQ cost estimation for residential and commercial projects in Gaya.",
    localFaqs: [
      {
        q: "Gaya mein 3D elevation design ke liye kitna time lagta hai?",
        a: "Gaya projects ke liye 3D front elevation 5 se 7 working days mein deliver kiya jata hai.",
      },
      {
        q: "Kya Bodh Gaya mein hotel ya commercial complex ka design banwaya ja sakta hai?",
        a: "Haan, Livitech Design tourism aur hospitality sector ke liye commercial planning aur municipal sanction drawings banata hai.",
      },
    ],
  },
  {
    cityName: "Bhagalpur",
    slug: "bhagalpur",
    state: "Bihar",
    avgConstructionRate: "₹1,500 – ₹2,150 per sq.ft",
    popularLocalAreas: [
      "Adampur",
      "Khelgaon",
      "Tilkamanjhi",
      "Ishakchak",
      "Zero Mile",
      "Barari",
    ],
    heroHeadline: "Top Construction & Architecture Firm in Bhagalpur",
    heroDescription:
      "From 2D Vastu floor plans to commercial architecture and cost estimation, Livitech Design brings transparent engineering to Bhagalpur.",
    localFaqs: [
      {
        q: "Bhagalpur mein online architectural consultation kaise lein?",
        a: "Aap Livitech Design website par cost calculator ya callback form bhar kar Bhagalpur ke liye online architect call book kar sakte hain.",
      },
    ],
  },
  {
    cityName: "Darbhanga",
    slug: "darbhanga",
    state: "Bihar",
    avgConstructionRate: "₹1,450 – ₹2,050 per sq.ft",
    popularLocalAreas: [
      "Laheriasarai",
      "Tower Chowk",
      "Bela",
      "Mirzapur",
      "Donar",
    ],
    heroHeadline: "Architectural Design & Construction Services in Darbhanga",
    heroDescription:
      "Trusted architectural planning, structural drawings, and estimation services for homeowners and builders in Darbhanga.",
    localFaqs: [
      {
        q: "Darbhanga mein residential naksha kaisa banwayein?",
        a: "Livitech Design online aur Patna HQ ke zariye Darbhanga ke plots ke liye custom Vastu 2D/3D naksha banata hai.",
      },
    ],
  },
  {
    cityName: "Begusarai",
    slug: "begusarai",
    state: "Bihar",
    avgConstructionRate: "₹1,500 – ₹2,100 per sq.ft",
    popularLocalAreas: [
      "Pokharia",
      "Station Road",
      "Harideo Nagar",
      "Baro",
      "Refinery Township",
    ],
    heroHeadline: "Modern House Design & Estimation in Begusarai",
    heroDescription:
      "Expert architecture and cost estimation solutions for residential and industrial projects in Begusarai.",
    localFaqs: [
      {
        q: "Begusarai mein material quantity breakdown mil sakta hai?",
        a: "Haan, Livitech Design detailed BOQ sheet deta hai jisme cement, steel aur bricks ki exact quantity hoti hai.",
      },
    ],
  },
  {
    cityName: "Ara",
    slug: "ara",
    state: "Bihar",
    avgConstructionRate: "₹1,500 – ₹2,100 per sq.ft",
    popularLocalAreas: [
      "Mahabir Tola",
      "Zero Mile",
      "Sandesh Road",
      "Koilwar",
      "Anaith",
    ],
    heroHeadline: "Home Construction & Architectural Planning in Ara",
    heroDescription:
      "Build with confidence in Ara, Bhojpur with Livitech Design's professional architectural design and estimation services.",
    localFaqs: [
      {
        q: "Ara mein plot audit kaise hota hai?",
        a: "Livitech Design civil engineers Ara mein plot par jakar soil level aur Vastu orientation check karte hain.",
      },
    ],
  },
  {
    cityName: "Bihta",
    slug: "bihta",
    state: "Bihar",
    avgConstructionRate: "₹1,550 – ₹2,250 per sq.ft",
    popularLocalAreas: [
      "IIT Bihta Road",
      "Airport Corridor",
      "Bihta Chowk",
      "Paharpur",
      "Kanhauli",
    ],
    heroHeadline: "Modern Architecture & Villa Construction in Bihta",
    heroDescription:
      "Planning a modern home or commercial setup along the booming Bihta-Patna corridor? Get earthquake-resistant structural designs and turnkey support from Livitech Design.",
    localFaqs: [
      {
        q: "Bihta mein plot mapping aur site visit kitni jaldi ho sakti hai?",
        a: "Hamari Patna HQ team Bihta corridor mein same-day ya 24 ghante ke andar site visit kar sakti hai.",
      },
    ],
  },
  {
    cityName: "Purnia",
    slug: "purnia",
    state: "Bihar",
    avgConstructionRate: "₹1,450 – ₹2,050 per sq.ft",
    popularLocalAreas: [
      "Line Bazar",
      "Bhatta Bazar",
      "Madhubani Bazar",
      "Gulabbagh",
      "Navratan Hatta",
    ],
    heroHeadline: "Trusted Architecture & House Construction in Purnia",
    heroDescription:
      "Build elegant G+1, G+2 villas and commercial buildings in Purnia with Livitech Design's architectural CAD drawings, 3D renderings, and precise material planning.",
    localFaqs: [
      {
        q: "Purnia ke weather conditions ke hisab se elevation design kaise karein?",
        a: "Livitech Design Seemanchal ke heavy rainfall aur moisture conditions ko dhyan mein rakh kar weather-proof paint aur drainage planning ke sath design prepare karta hai.",
      },
    ],
  },
];

export function getCityBySlug(slug: string): CitySeoInfo | undefined {
  return BIHAR_SEO_CITIES.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase()
  );
}
