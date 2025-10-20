import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      className={cn("h-8 w-8", props.className)}
    >
      <title>AOI-Guard Logo</title>
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
        </linearGradient>
        <filter id="logoGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <style>
        {`
          @keyframes pulse-ring {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
          @keyframes scan-line-vertical {
            0% { transform: translateY(-4px); opacity: 0.5; }
            50% { transform: translateY(4px); opacity: 1; }
            100% { transform: translateY(-4px); opacity: 0.5; }
          }
          .pulse-ring {
            animation: pulse-ring 3s ease-in-out infinite;
          }
          .scan-line-vertical {
            animation: scan-line-vertical 2s ease-in-out infinite;
          }
        `}
      </style>
      
      {/* Outer hexagonal shield */}
      <path 
        d="M24 4 L36 10 L36 26 L24 32 L12 26 L12 10 Z" 
        fill="none" 
        stroke="url(#logoGradient)"
        strokeWidth="2.5"
        className="pulse-ring"
      />
      
      {/* Inner circuit pattern */}
      <path 
        d="M24 12 L28 14 L28 22 L24 24 L20 22 L20 14 Z" 
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.8"
      />
      
      {/* Animated horizontal scanning line (like in the image) */}
      <g className="scan-line-vertical">
        <line 
          x1="18" 
          y1="18" 
          x2="30" 
          y2="18" 
          stroke="currentColor" 
          strokeWidth="2" 
          filter="url(#logoGlow)"
          opacity="0.9"
        />
      </g>
      
      {/* Central chip dot */}
      <circle 
        cx="24" 
        cy="18" 
        r="2" 
        fill="currentColor"
        className="scan-line-vertical"
        opacity="0.9"
      />
      
      {/* Verification checkmark */}
      <path 
        d="M21 26 L23 28 L27 24" 
        stroke="currentColor" 
        strokeWidth="2.5"
        opacity="0.9"
      />
      
      {/* Corner connection lines for circuit aesthetic */}
      <path d="M20 14 L18 14 L18 12" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <path d="M28 14 L30 14 L30 12" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <path d="M20 22 L18 22 L18 24" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <path d="M28 22 L30 22 L30 24" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}
