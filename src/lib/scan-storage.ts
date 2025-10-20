/**
 * Scan Storage - Persist detection results to show on dashboard
 */

import type { VerdictType, Scan } from './data';

const STORAGE_KEY = 'aoi_guard_recent_scans';
const REPORTS_STORAGE_KEY = 'aoi_guard_detailed_reports';
const MAX_STORED_SCANS = 20; // Keep last 20 scans
const MAX_STORED_REPORTS = 50; // Keep last 50 detailed reports

export interface StoredScan {
  batchId: string;
  timestamp: number; // Unix timestamp
  verdict: VerdictType;
  score: number;
  operator: string;
  partNumber?: string;
}

export interface DetailedScanReport {
  batchId: string;
  verdict: VerdictType;
  authenticityScore: number;
  imageUrl?: string;
  oemReferenceImageUrl?: string; // Real IC reference image for overlay comparison
  imageHint?: string;
  operator: string;
  timestamp: string; // ISO string
  ocrMarkings: string;
  oemData: string;
  llmReasoning: string;
  flaggedMarkings: string[];
  flaggedOemData: string[];
}

/**
 * Add a new scan to storage
 */
export function addScanToStorage(scan: {
  batchId: string;
  verdict: VerdictType;
  score: number;
  partNumber?: string;
}): void {
  if (typeof window === 'undefined') return; // SSR safety
  
  try {
    const stored = getStoredScans();
    
    const newScan: StoredScan = {
      batchId: scan.batchId,
      timestamp: Date.now(),
      verdict: scan.verdict,
      score: scan.score,
      operator: 'Aaditya Hande', // Default operator for demo
      partNumber: scan.partNumber,
    };
    
    // Add to beginning (most recent first)
    stored.unshift(newScan);
    
    // Keep only MAX_STORED_SCANS
    const trimmed = stored.slice(0, MAX_STORED_SCANS);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Failed to save scan to storage:', error);
  }
}

/**
 * Get all stored scans
 */
export function getStoredScans(): StoredScan[] {
  if (typeof window === 'undefined') return []; // SSR safety
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    return JSON.parse(stored) as StoredScan[];
  } catch (error) {
    console.error('Failed to load scans from storage:', error);
    return [];
  }
}

/**
 * Convert stored scans to Scan format for dashboard
 */
export function getRecentScansForDashboard(): Scan[] {
  const stored = getStoredScans();
  
  return stored.map(scan => ({
    batchId: scan.batchId,
    time: getTimeAgo(Date.now() - scan.timestamp),
    status: scan.verdict,
    score: scan.score,
    operator: scan.operator,
  }));
}

/**
 * Format timestamp as "X minutes/hours/days ago"
 */
function getTimeAgo(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  return `${days} ${days === 1 ? 'day' : 'days'} ago`;
}

/**
 * Clear all stored scans (for testing)
 */
export function clearStoredScans(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Get scan count by verdict
 */
export function getScanStatistics(): {
  total: number;
  genuine: number;
  fake: number;
  suspicious: number;
} {
  const scans = getStoredScans();
  
  return {
    total: scans.length,
    genuine: scans.filter(s => s.verdict === 'Genuine').length,
    fake: scans.filter(s => s.verdict === 'Fake').length,
    suspicious: scans.filter(s => s.verdict === 'Suspicious').length,
  };
}

/**
 * Save detailed report for a scan
 */
export function saveDetailedReport(report: DetailedScanReport): void {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = getDetailedReports();
    
    // Add new report (or update if batchId exists)
    const existingIndex = stored.findIndex(r => r.batchId === report.batchId);
    if (existingIndex >= 0) {
      stored[existingIndex] = report;
    } else {
      stored.unshift(report);
    }
    
    // Keep only MAX_STORED_REPORTS
    const trimmed = stored.slice(0, MAX_STORED_REPORTS);
    
    localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Failed to save detailed report:', error);
  }
}

/**
 * Get all detailed reports
 */
export function getDetailedReports(): DetailedScanReport[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(REPORTS_STORAGE_KEY);
    if (!stored) return [];
    
    return JSON.parse(stored) as DetailedScanReport[];
  } catch (error) {
    console.error('Failed to load detailed reports:', error);
    return [];
  }
}

/**
 * Get a single detailed report by batch ID
 */
export function getDetailedReport(batchId: string): DetailedScanReport | null {
  const reports = getDetailedReports();
  return reports.find(r => r.batchId === batchId) || null;
}

/**
 * Clear all stored reports (for testing)
 */
export function clearDetailedReports(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(REPORTS_STORAGE_KEY);
}
