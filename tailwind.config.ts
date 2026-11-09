import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Earthy Architectural Palette
        brand: {
          DEFAULT: "#a25016", // Primary CTA, Active States, Main Icons
          dark: "#3A2418",    // Button Hover, Deep Espresso Accents
          accent: "#A88462",  // Warm Sandstone Highlights, Secondary Badges
          light: "#D5C4AE",   // Soft Travertine Pill BG, Tints & Borders
        },
        // Typography & Dark Surfaces
        ink: {
          DEFAULT: "#1A120E", // H1-H4 Headings, Dark Sections & Footer BG
          muted: "#4A4A46",   // Warm Slate Body Copy & Subtitles
          subtle: "#78756F",  // Form Placeholders & Captions
        },
        // Clean Architectural Backgrounds (So images pop clearly)
        surface: {
          DEFAULT: "#FFFFFF", // Pure White Cards & Modals
          muted: "#FAF7F2",   // Warm Alabaster Alternating Section BG
          subtle: "#F3EDE4",  // Soft Sandstone Tint for Input Fields
        },
        // Crisp Card & Section Borders
        border: {
          DEFAULT: "#D5C4AE", // Soft Travertine 1px Card Border
          strong: "#A88462",  // Active / Hover Card Border
        },
      },
      boxShadow: {
        booking: "0 2px 10px 0 rgba(26, 18, 14, 0.06)",
        "booking-hover": "0 12px 28px 0 rgba(58, 36, 24, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
