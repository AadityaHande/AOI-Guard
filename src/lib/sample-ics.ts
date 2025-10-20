/**
 * Sample IC images for demonstration
 * These simulate real IC chips with various authenticity scenarios
 */

export interface SampleIC {
  id: string;
  name: string;
  description: string;
  expectedVerdict: 'Genuine' | 'Fake' | 'Suspicious';
  expectedPartNumber: string;
  expectedManufacturer: string;
  imageHint: string; // For AI to simulate
  mockOcrText: string; // What should be visible
  oemDatasheetMarkings: string; // What OEM datasheet says should be on the IC
  datasheetUrl?: string;
  counterfeitIssues?: string[]; // Known issues if fake
  realImagePath?: string; // Path to real IC image in public folder
}

export const sampleICs: SampleIC[] = [
  {
    id: 'genuine-atmega328',
    name: 'Genuine ATMEGA328P',
    description: 'Authentic Atmel AVR microcontroller (Left side in image)',
    expectedVerdict: 'Genuine',
    expectedPartNumber: 'ATMEGA328P-AU',
    expectedManufacturer: 'Atmel',
    imageHint: 'genuine ATMEGA328P with clear Atmel logo, proper font, clean etching',
    mockOcrText: `ATMEL
ATMEGA328P
AU 1004`,
    oemDatasheetMarkings: `ATMEL
ATMEGA328P
AU 1004`,
    datasheetUrl: 'https://ww1.microchip.com/downloads/en/DeviceDoc/ATmega328P.pdf',
    counterfeitIssues: undefined,
    realImagePath: '/ATMEGA328-REAL.JPG',
  },
  {
    id: 'fake-atmega328',
    name: 'Counterfeit ATMEGA328P',
    description: 'Fake ATMEGA328P with inconsistent markings (Right side in image)',
    expectedVerdict: 'Fake',
    expectedPartNumber: 'ATMEGA328P',
    expectedManufacturer: 'Atmel (counterfeit)',
    imageHint: 'counterfeit ATMEGA328P with poor quality etching, inconsistent font',
    mockOcrText: `ATMEL
ATMEGA328P
20AU 0729`,
    oemDatasheetMarkings: `ATMEL
ATMEGA328P
AU 1004`,
    datasheetUrl: 'https://ww1.microchip.com/downloads/en/DeviceDoc/ATmega328P.pdf',
    counterfeitIssues: [
      'Date code format inconsistent: "0729" vs standard "1004" format',
      'Font weight and kerning different from genuine',
      'Part number shows "20AU" instead of just "AU" (speed grade mismatch)',
      'Surface finish quality lower than genuine',
      'Logo etching depth inconsistent',
    ],
    realImagePath: '/ATMEGA328-FAKE.JPG',
  },
  {
    id: 'fake-lm358',
    name: 'Counterfeit LM358N',
    description: 'Fake Texas Instruments op-amp with incorrect logo',
    expectedVerdict: 'Fake',
    expectedPartNumber: 'LM358N',
    expectedManufacturer: 'Texas Instruments (counterfeit)',
    imageHint: 'counterfeit IC with "Tl" instead of "TI", poor quality etching, suspicious markings',
    mockOcrText: `Tl LM358N
2BF H58K
CHINA`,
    oemDatasheetMarkings: `TI LM358N
2347 H58K
MALAYSIA`,
    datasheetUrl: 'https://www.ti.com/lit/ds/symlink/lm358.pdf',
    counterfeitIssues: [
      'Logo shows "Tl" instead of authentic "TI"',
      'Date code "2BF" does not match TI standard YYWW format (should be 2347)',
      'Country of origin shows "CHINA" instead of standard "MALAYSIA"',
      'Poor surface finish quality',
      'Font weight inconsistent',
    ],
  },
  {
    id: 'genuine-nxp',
    name: 'Genuine NXP MKL25Z128VLH4',
    description: 'Authentic NXP Kinetis ARM Cortex-M0+ microcontroller',
    expectedVerdict: 'Genuine',
    expectedPartNumber: 'MKL25Z128VLH4',
    expectedManufacturer: 'NXP Semiconductors',
    imageHint: 'genuine NXP microcontroller with clear logo and proper markings',
    mockOcrText: `NXP
MKL25Z128VLH4
2318 MAL
CTEF`,
    oemDatasheetMarkings: `NXP
MKL25Z128VLH4
2318 MAL
CTEF`,
    datasheetUrl: 'https://www.nxp.com/docs/en/data-sheet/KL25P80M48SF0.pdf',
    counterfeitIssues: undefined,
  },
  {
    id: 'fake-ad8232',
    name: 'Counterfeit AD8232',
    description: 'Fake Analog Devices heart rate monitor chip',
    expectedVerdict: 'Fake',
    expectedPartNumber: 'AD8232ACPZ',
    expectedManufacturer: 'Analog Devices (counterfeit)',
    imageHint: 'counterfeit analog devices chip with remarked surface',
    mockOcrText: `AD
AD8232ACPZ
1947 C
PHILIPPINES`,
    oemDatasheetMarkings: `ADI
AD8232ACPZ
2047 C23456
CHINA`,
    datasheetUrl: 'https://www.analog.com/media/en/technical-documentation/data-sheets/AD8232.pdf',
    counterfeitIssues: [
      'Logo shows "AD" instead of current "ADI" branding (Analog Devices Inc.)',
      'Surface shows evidence of blacktopping (remarking)',
      'Date code "1947" is invalid (would be from 2019, but IC released in 2010s)',
      'Missing full lot code (shows only "C" instead of "C23456")',
      'Logo etching depth inconsistent',
      'Package dimensions slightly off',
    ],
  },
];

/**
 * Get sample IC by ID
 */
export function getSampleIC(id: string): SampleIC | undefined {
  return sampleICs.find(ic => ic.id === id);
}

/**
 * Generate a realistic data URI for demonstration
 * In production, this would be actual IC photos
 */
export function generateSampleImageDataUri(ic: SampleIC): string {
  // For demo purposes, we'll create a simple SVG representation
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#2a2a2a"/>
      <rect x="50" y="50" width="300" height="200" fill="#1a1a1a" stroke="#444" stroke-width="2"/>
      <text x="200" y="100" text-anchor="middle" fill="#ddd" font-family="monospace" font-size="14">
        ${ic.mockOcrText.split('\n')[0]}
      </text>
      <text x="200" y="130" text-anchor="middle" fill="#ddd" font-family="monospace" font-size="16" font-weight="bold">
        ${ic.mockOcrText.split('\n')[1]}
      </text>
      <text x="200" y="160" text-anchor="middle" fill="#ddd" font-family="monospace" font-size="12">
        ${ic.mockOcrText.split('\n')[2] || ''}
      </text>
      <text x="200" y="185" text-anchor="middle" fill="#ddd" font-family="monospace" font-size="12">
        ${ic.mockOcrText.split('\n')[3] || ''}
      </text>
      <text x="200" y="280" text-anchor="middle" fill="#666" font-family="sans-serif" font-size="10">
        ${ic.description}
      </text>
    </svg>
  `;
  
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Create a realistic detection result based on sample IC
 */
export function createMockDetectionResult(ic: SampleIC) {
  const scores = {
    Genuine: 95 + Math.random() * 5,
    Fake: 25 + Math.random() * 15,
    Suspicious: 70 + Math.random() * 15,
  };

  return {
    verdict: ic.expectedVerdict,
    authenticityScore: Math.round(scores[ic.expectedVerdict] * 10) / 10,
    ocrMarkings: ic.mockOcrText,
    partNumber: ic.expectedPartNumber,
    manufacturer: ic.expectedManufacturer,
    reasoning: generateReasoning(ic),
    flaggedMarkings: extractFlaggedMarkings(ic),
  };
}

function generateReasoning(ic: SampleIC): string {
  if (ic.expectedVerdict === 'Genuine') {
    return `Excellent match with official ${ic.expectedManufacturer} specifications. Logo etching is sharp and clean, font kerning is consistent, and surface finish is within tolerance. Date code format matches manufacturer standards. All markings verified against official datasheet.`;
  } else if (ic.expectedVerdict === 'Fake') {
    const issues = ic.counterfeitIssues?.join('. ') || 'Multiple counterfeit indicators detected';
    return `Critical counterfeit indicators detected: ${issues}. This component does not meet authentic ${ic.expectedManufacturer} manufacturing standards.`;
  } else {
    const issues = ic.counterfeitIssues?.join('. ') || 'Minor inconsistencies detected';
    return `Part number and basic markings are correct, but ${issues}. Recommend manual verification and X-ray inspection before use in critical applications.`;
  }
}

function extractFlaggedMarkings(ic: SampleIC): string[] {
  const lines = ic.mockOcrText.split('\n').filter(l => l.trim());
  
  if (ic.expectedVerdict === 'Fake') {
    // Flag suspicious elements
    return lines.filter(line => 
      line.includes('Tl') || // Wrong logo
      line.match(/^\d[A-Z]{2}\s/) || // Wrong date format
      line.includes('H58K') // Suspicious lot code
    );
  } else if (ic.expectedVerdict === 'Suspicious') {
    // Flag date code and manufacturer
    return lines.filter(line => 
      line.match(/\d{4}/) || // Date codes
      line.includes('ATMEL') // Old branding
    );
  }
  
  // Genuine - flag standard info
  return [lines[1], lines[2]].filter(Boolean); // Part number and date
}
