// Mock data for the AOI-Guard dashboard

export type VerdictType = "Genuine" | "Fake" | "Suspicious";

export interface Scan {
  batchId: string;
  time: string;
  status: VerdictType;
  score: number;
  operator: string;
}

// Generate realistic data with timestamps
const now = new Date();
const getTimeAgo = (minutesAgo: number) => {
  if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
  if (minutesAgo < 1440) return `${Math.floor(minutesAgo / 60)} hours ago`;
  return `${Math.floor(minutesAgo / 1440)} days ago`;
};

export const summaryData = {
  totalScanned: 2847,
  genuine: 2701,
  fake: 38,
  suspicious: 108,
  avgAuthenticity: 98.2,
};

// More realistic trend data with variations
export const trendData = [
  { date: "Mon", score: 97.8 },
  { date: "Tue", score: 98.3 },
  { date: "Wed", score: 97.2 },
  { date: "Thu", score: 98.9 },
  { date: "Fri", score: 97.5 },
  { date: "Sat", score: 98.1 },
  { date: "Sun", score: 98.6 },
];

export const verdictData = [
  { verdict: "Genuine", count: summaryData.genuine, fill: "hsl(var(--success))" },
  { verdict: "Suspicious", count: summaryData.suspicious, fill: "hsl(var(--suspicious))" },
  { verdict: "Fake", count: summaryData.fake, fill: "hsl(var(--destructive))" },
];

// More realistic recent scans with variety
export const recentScans: Scan[] = [
  {
    batchId: "BATCH-2024-1247",
    time: getTimeAgo(2),
    status: "Genuine" as VerdictType,
    score: 99.23,
    operator: "Om Rahatal",
  },
  {
    batchId: "BATCH-2024-1246",
    time: getTimeAgo(8),
    status: "Suspicious" as VerdictType,
    score: 78.45,
    operator: "Rahul Phonde",
  },
  {
    batchId: "BATCH-2024-1245",
    time: getTimeAgo(15),
    status: "Fake" as VerdictType,
    score: 31.67,
    operator: "Chetan Gore",
  },
  {
    batchId: "BATCH-2024-1244",
    time: getTimeAgo(23),
    status: "Genuine" as VerdictType,
    score: 97.89,
    operator: "Swapnil Kamble",
  },
  {
    batchId: "BATCH-2024-1243",
    time: getTimeAgo(35),
    status: "Genuine" as VerdictType,
    score: 98.56,
    operator: "Kunal Kamble",
  },
  {
    batchId: "BATCH-2024-1242",
    time: getTimeAgo(48),
    status: "Suspicious" as VerdictType,
    score: 85.12,
    operator: "Om Rahatal",
  },
  {
    batchId: "BATCH-2024-1241",
    time: getTimeAgo(72),
    status: "Genuine" as VerdictType,
    score: 99.91,
    operator: "Rahul Phonde",
  },
  {
    batchId: "BATCH-2024-1240",
    time: getTimeAgo(95),
    status: "Genuine" as VerdictType,
    score: 99.76,
    operator: "Chetan Gore",
  },
];

export const alerts = [
    {
      id: 1,
      type: "Fake",
      message: "Critical: Counterfeit TI LM358 detected in BATCH-2024-1245. Immediate inspection required.",
      time: getTimeAgo(15),
    },
    {
      id: 2,
      type: "Suspicious",
      message: "Warning: Unusual surface markings on STM32F4 in BATCH-2024-1246. Manual verification recommended.",
      time: getTimeAgo(8),
    },
    {
      id: 3,
      type: "Suspicious",
      message: "Alert: Date code inconsistency detected in BATCH-2024-1238. Confidence score: 78.3%",
      time: getTimeAgo(125),
    },
     {
      id: 4,
      type: "Fake",
      message: "Critical: Known counterfeit signature matched in BATCH-2024-1229. Batch quarantined.",
      time: getTimeAgo(1580),
    },
    {
      id: 5,
      type: "Suspicious",
      message: "Warning: Package dimensions outside tolerance in BATCH-2024-1233. Review needed.",
      time: getTimeAgo(890),
    },
];

export const detailedReportData = {
    "BATCH-2024-1247": {
        batchId: "BATCH-2024-1247",
        verdict: "Genuine" as VerdictType,
        authenticityScore: 99.23,
        imageUrl: "https://picsum.photos/seed/ic1/600/400",
        imageHint: "genuine microcontroller chip",
        operator: "Om Rahatal",
        timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
        ocrMarkings: `STM32F407VGT6 \n ARM 9HN12 \n CHN 2023`,
        oemData: `Manufacturer: STMicroelectronics \n Part Number: STM32F407VGT6 \n Description: High-performance ARM Cortex-M4 32-bit MCU \n Date Code: 2023 Week 12`,
        llmReasoning: "Excellent match with STMicroelectronics authentic samples. Logo etching depth, font kerning, and surface finish are all within specification. Date code format matches manufacturer standards. Package dimensions verified against OEM specifications.",
        flaggedMarkings: ["STM32F407VGT6", "2023"],
        flaggedOemData: ["Manufacturer: STMicroelectronics", "Date Code: 2023 Week 12"],
    },
    "BATCH-2024-1245": {
        batchId: "BATCH-2024-1245",
        verdict: "Fake" as VerdictType,
        authenticityScore: 31.67,
        imageUrl: "https://picsum.photos/seed/ic2/600/400",
        imageHint: "counterfeit integrated circuit",
        operator: "Chetan Gore",
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
        ocrMarkings: `Tl LM358N \n 2BF H58K \n CHINA`,
        oemData: `Manufacturer: Texas Instruments \n Part Number: LM358N \n Description: Dual Operational Amplifier \n Date Code: Invalid Format`,
        llmReasoning: "Multiple critical indicators of counterfeit: 'Tl' marking instead of authentic 'TI' logo, inconsistent font weight, surface shows evidence of blacktopping (remarking). Date code '2BF' does not conform to TI's standard YYWW format. Package molding quality below OEM standards.",
        flaggedMarkings: ["Tl LM358N", "2BF"],
        flaggedOemData: [],
    },
    "BATCH-2024-1246": {
        batchId: "BATCH-2024-1246",
        verdict: "Suspicious" as VerdictType,
        authenticityScore: 78.45,
        imageUrl: "https://picsum.photos/seed/ic3/600/400",
        imageHint: "suspicious microcontroller",
        operator: "Rahul Phonde",
        timestamp: new Date(Date.now() - 8 * 60000).toISOString(),
        ocrMarkings: `ATMEGA328P \n AU 2343 \n ATMEL`,
        oemData: `Manufacturer: Microchip (formerly Atmel) \n Part Number: ATMEGA328P-AU \n Description: 8-bit AVR Microcontroller \n Date Code: 2343 (Year 2023, Week 43)`,
        llmReasoning: "Part number and manufacturer are correct. However, logo font weight shows minor deviation from reference samples. Date code is valid but surface texture analysis indicates possible refurbishing. Package dimensions within tolerance but recommend X-ray inspection.",
        flaggedMarkings: ["ATMEGA328P", "2343"],
        flaggedOemData: ["Date Code: 2343"],
    }
}


export const oemData = [
  { oemName: 'STMicroelectronics', partNumber: 'STM32F407VGT6', lastUpdated: '2024-10-10', source: 'Official Datasheet v3.2', confidence: 99.8 },
  { oemName: 'Texas Instruments', partNumber: 'LM358N', lastUpdated: '2024-09-28', source: 'OEM Portal', confidence: 99.5 },
  { oemName: 'Microchip Technology', partNumber: 'ATMEGA328P-AU', lastUpdated: '2024-10-05', source: 'Verified Sample', confidence: 98.9 },
  { oemName: 'Analog Devices', partNumber: 'AD8232ACPZ', lastUpdated: '2024-09-15', source: 'Datasheet v2.1', confidence: 99.2 },
  { oemName: 'NXP Semiconductors', partNumber: 'MKL25Z128VLH4', lastUpdated: '2024-10-01', source: 'Official Website', confidence: 99.6 },
]

export const insights = [
    { type: 'Spike', message: '⚠️ 15% increase in fake detections from Asia-Pacific suppliers this week. Immediate audit recommended.' },
    { type: 'Trend', message: '📈 Average authenticity score improved by 1.2% after model v1.1 deployment. System accuracy at all-time high.' },
    { type: 'Alert', message: '🔍 New counterfeit signature detected: TI LM358N with "Tl" marking. Database updated with 47 known variants.' },
    { type: 'Trend', message: '✅ STMicroelectronics parts showing 99.8% genuine rate. Supplier reliability confirmed.' },
]

export const historicalData = [
  { date: 'Oct 1', scans: 342, genuine: 328, fake: 6, suspicious: 8, avgScore: 98.1 },
  { date: 'Oct 2', scans: 389, genuine: 371, fake: 8, suspicious: 10, avgScore: 97.8 },
  { date: 'Oct 3', scans: 356, genuine: 341, fake: 5, suspicious: 10, avgScore: 98.3 },
  { date: 'Oct 4', scans: 412, genuine: 395, fake: 9, suspicious: 8, avgScore: 97.9 },
  { date: 'Oct 5', scans: 298, genuine: 285, fake: 4, suspicious: 9, avgScore: 98.5 },
  { date: 'Oct 8', scans: 376, genuine: 361, fake: 7, suspicious: 8, avgScore: 98.2 },
  { date: 'Oct 9', scans: 421, genuine: 402, fake: 10, suspicious: 9, avgScore: 97.6 },
  { date: 'Oct 10', scans: 394, genuine: 378, fake: 6, suspicious: 10, avgScore: 98.0 },
  { date: 'Oct 11', scans: 367, genuine: 352, fake: 5, suspicious: 10, avgScore: 98.4 },
  { date: 'Oct 12', scans: 403, genuine: 388, fake: 7, suspicious: 8, avgScore: 98.1 },
  { date: 'Oct 15', scans: 452, genuine: 432, fake: 8, suspicious: 12, avgScore: 98.2 },
]
