import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

// Image generation - Enhanced with electric cyan gradient
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(135deg, #00E0FF 0%, #0891B2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '36px',
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer hexagonal shield */}
          <path
            d="M24 4 L36 10 L36 26 L24 32 L12 26 L12 10 Z"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Inner circuit pattern */}
          <path
            d="M24 12 L28 14 L28 22 L24 24 L20 22 L20 14 Z"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Scanning line */}
          <line
            x1="18"
            y1="18"
            x2="30"
            y2="18"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.9"
            strokeLinecap="round"
          />
          
          {/* Central chip dot */}
          <circle cx="24" cy="18" r="2.5" fill="white" />
          
          {/* Connection points */}
          <circle cx="18" cy="18" r="1.5" fill="white" opacity="0.8" />
          <circle cx="30" cy="18" r="1.5" fill="white" opacity="0.8" />
          
          {/* Verification checkmark */}
          <path
            d="M21 26 L23 28 L27 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Corner connection lines */}
          <path
            d="M20 14 L18 14 L18 12"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M28 14 L30 14 L30 12"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M20 22 L18 22 L18 24"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M28 22 L30 22 L30 24"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
