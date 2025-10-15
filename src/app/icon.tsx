import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer hexagonal shield */}
          <path
            d="M24 4 L36 10 L36 26 L24 32 L12 26 L12 10 Z"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Inner circuit pattern */}
          <path
            d="M24 12 L28 14 L28 22 L24 24 L20 22 L20 14 Z"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
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
            strokeWidth="2"
            opacity="0.9"
            strokeLinecap="round"
          />
          
          {/* Central chip dot */}
          <circle cx="24" cy="18" r="2.5" fill="white" />
          
          {/* Connection points */}
          <circle cx="16" cy="18" r="1.5" fill="white" />
          <circle cx="32" cy="18" r="1.5" fill="white" />
          
          {/* Verification checkmark */}
          <path
            d="M21 26 L23 28 L27 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
