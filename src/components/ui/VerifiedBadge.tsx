// components/VerifiedBadge.tsx
import React from "react";

interface VerifiedBadgeProps {
  className?: string;
  tooltipText?: string;
}

export const VerifiedBadge = ({
  className = "",
  tooltipText = "This user is verified on our platform",
}: VerifiedBadgeProps) => {
  return (
    <span
      className={`relative group text-blue-500 ${className}`}
      aria-label="Verified account"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"
        />
      </svg>

      {/* Tooltip */}
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {tooltipText}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-gray-800 border-t-transparent border-l-transparent border-r-transparent"></span>
      </span>
    </span>
  );
};
