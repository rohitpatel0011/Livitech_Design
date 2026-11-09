"use client";

import React from "react";
import Image from "next/image";

interface BrandLogoProps {
  /**
   * "full": The complete official logo graphic with house silhouette, arch, lamp, Livitect & More Than Walls.
   * "icon": The square rounded monogram icon.
   * "combo": The square monogram icon paired with modern typography wordmark & cursive tagline.
   */
  variant?: "full" | "icon" | "combo";
  isTransparent?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}

export default function BrandLogo({
  variant = "combo",
  isTransparent = false,
  className = "",
  size = "md",
  priority = false,
}: BrandLogoProps) {
  // Height presets
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const fullSizes = {
    sm: "h-9 w-auto",
    md: "h-11 sm:h-12 w-auto",
    lg: "h-14 sm:h-16 w-auto",
  };

  if (variant === "full") {
    const src = isTransparent
      ? "/brand/livitect-logo-white.png"
      : "/brand/livitect-logo-terracotta.png";

    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <Image
          src={src}
          alt="Livitect - More Than Walls"
          width={266}
          height={203}
          priority={priority}
          className={`${fullSizes[size]} object-contain drop-shadow-xs transition-opacity duration-300`}
        />
      </div>
    );
  }

  if (variant === "icon") {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <Image
          src="/brand/livitect-icon-square.png"
          alt="Livitect Icon"
          width={122}
          height={122}
          priority={priority}
          className={`${iconSizes[size]} rounded-xl shadow-xs object-contain group-hover:scale-105 transition-transform`}
        />
      </div>
    );
  }

  // "combo": Official Square Monogram Icon + Typography & Tagline
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Monogram Square Icon */}
      <div className="relative shrink-0">
        <Image
          src="/brand/livitect-icon-square.png"
          alt="Livitect Monogram"
          width={122}
          height={122}
          priority={priority}
          className={`${iconSizes[size]} rounded-xl shadow-xs object-contain group-hover:scale-105 transition-transform duration-300`}
        />
      </div>

      {/* Typography: Livitect + More Than Walls */}
      <div className="flex flex-col justify-center">
        <span
          className={`text-xl sm:text-2xl font-black tracking-tight leading-none transition-colors duration-300 ${
            isTransparent ? "text-white drop-shadow-sm" : "text-[#8E4F2A]"
          }`}
        >
          Livitect
        </span>
        <span
          className={`text-xs font-semibold tracking-wide italic transition-colors duration-300 mt-0.5 ${
            isTransparent ? "text-[#E6D3C3] drop-shadow-xs" : "text-[#8E4F2A]/90"
          }`}
          style={{ fontFamily: "Georgia, Cambria, 'Times New Roman', serif" }}
        >
          More Than Walls
        </span>
      </div>
    </div>
  );
}
