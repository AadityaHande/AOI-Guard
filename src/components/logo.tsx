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
      </defs>
      <style>
        {`
          @keyframes pulse-ring {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
          @keyframes scan-line {
            0%, 100% { transform: translateY(0); opacity: 0.8; }
            50% { transform: translateY(20px); opacity: 1; }
          }
          .pulse-ring {
            animation: pulse-ring 3s ease-in-out infinite;
          }
          .scan-line {
            animation: scan-line 2s ease-in-out infinite;
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
      />
      
      {/* Scanning line effect */}
      <line 
        x1="18" 
        y1="18" 
        x2="30" 
        y2="18" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        opacity="0.8"
        className="scan-line"
      />
      
      {/* Central chip dot */}
      <circle 
        cx="24" 
        cy="18" 
        r="2.5" 
        fill="currentColor"
        opacity="0.9"
      />
      
      {/* Circuit connections */}
      <line x1="24" y1="12" x2="24" y2="8" stroke="currentColor" strokeWidth="1.5" />
      <line x1="24" y1="24" x2="24" y2="28" stroke="currentColor" strokeWidth="1.5" />
      <line x1="20" y1="14" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <line x1="28" y1="14" x2="32" y2="12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
