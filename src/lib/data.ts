// Real data for AOI-Guard dashboard - dynamically populated from actual scans

export type VerdictType = "Genuine" | "Fake" | "Suspicious";

export interface Scan {
  batchId: string;
  time: string;
  status: VerdictType;
  score: number;
  operator: string;
}

// These are just empty defaults - real data comes from localStorage
export const summaryData = {
  totalScanned: 0,
  genuine: 0,
  fake: 0,
  suspicious: 0,
  avgAuthenticity: 0,
};

export const trendData = [
  { date: "Mon", score: 0 },
  { date: "Tue", score: 0 },
  { date: "Wed", score: 0 },
  { date: "Thu", score: 0 },
  { date: "Fri", score: 0 },
  { date: "Sat", score: 0 },
  { date: "Sun", score: 0 },
];

export const verdictData = [
  { verdict: "Genuine", count: 0, fill: "hsl(var(--success))" },
  { verdict: "Suspicious", count: 0, fill: "hsl(var(--suspicious))" },
  { verdict: "Fake", count: 0, fill: "hsl(var(--destructive))" },
];

// Empty default - real scans come from localStorage
export const recentScans: Scan[] = [];

// Empty default - real alerts generated from actual detections
export const alerts: any[] = [];

// Empty default - real reports stored in localStorage
export const detailedReportData: Record<string, any> = {};

// OEM reference data - this is static reference data, not scan results
export const oemData = [
  { oemName: 'Microchip Technology', partNumber: 'ATMEGA328P-AU', lastUpdated: '2024-10-05', source: 'Verified Sample', confidence: 98.9 },
  { oemName: 'STMicroelectronics', partNumber: 'STM32F407VGT6', lastUpdated: '2024-10-10', source: 'Official Datasheet v3.2', confidence: 99.8 },
  { oemName: 'Texas Instruments', partNumber: 'LM358N', lastUpdated: '2024-09-28', source: 'OEM Portal', confidence: 99.5 },
  { oemName: 'Analog Devices', partNumber: 'AD8232ACPZ', lastUpdated: '2024-09-15', source: 'Datasheet v2.1', confidence: 99.2 },
  { oemName: 'NXP Semiconductors', partNumber: 'MKL25Z128VLH4', lastUpdated: '2024-10-01', source: 'Official Website', confidence: 99.6 },
];

// Empty - real insights generated from actual scan data
export const insights: any[] = [];

// Empty - historical data populated from actual scans
export const historicalData: any[] = [];
