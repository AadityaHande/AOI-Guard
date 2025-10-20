'use client';

import { cn } from '@/lib/utils';

interface AnimatedIconProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

export function AnimatedIcon({ className, size = 48, animate = true }: AnimatedIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('inline-block', className)}
    >
      <defs>
        {/* Gradient for the shield */}
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
        </linearGradient>

        {/* Glow effect for the scanning line */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer hexagonal shield */}
      <path
        d="M24 4 L36 10 L36 26 L24 32 L12 26 L12 10 Z"
        fill="none"
        stroke="url(#shieldGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner circuit pattern (chip) */}
      <path
        d="M24 12 L28 14 L28 22 L24 24 L20 22 L20 14 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />

      {/* Animated scanning line */}
      {animate ? (
        <>
          <line
            x1="18"
            y1="18"
            x2="30"
            y2="18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#glow)"
            opacity="0.9"
          >
            <animate
              attributeName="y1"
              values="14;22;14"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y2"
              values="14;22;14"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.6;1;0.6"
              dur="2s"
              repeatCount="indefinite"
            />
          </line>

          {/* Scanning line dots that follow */}
          <circle cx="18" cy="18" r="1.5" fill="currentColor" opacity="0.7">
            <animate
              attributeName="cy"
              values="14;22;14"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.4;0.9;0.4"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="30" cy="18" r="1.5" fill="currentColor" opacity="0.7">
            <animate
              attributeName="cy"
              values="14;22;14"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.4;0.9;0.4"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </>
      ) : (
        <>
          {/* Static scanning line */}
          <line
            x1="18"
            y1="18"
            x2="30"
            y2="18"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.9"
            strokeLinecap="round"
          />
          
          {/* Connection points */}
          <circle cx="16" cy="18" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="32" cy="18" r="1.5" fill="currentColor" opacity="0.7" />
        </>
      )}

      {/* Central chip indicator */}
      <circle cx="24" cy="18" r="2.5" fill="currentColor">
        {animate && (
          <animate
            attributeName="cy"
            values="14;22;14"
            dur="2s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* Verification checkmark */}
      <path
        d="M21 26 L23 28 L27 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />

      {/* Corner connection lines */}
      <path
        d="M20 14 L18 14 L18 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M28 14 L30 14 L30 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M20 22 L18 22 L18 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M28 22 L30 22 L30 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
