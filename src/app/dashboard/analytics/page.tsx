'use client';

import React, { useEffect, useState } from "react";
import { AnalyticsCharts } from "@/components/dashboard/analytics/analytics-charts";
import { HistoricalDataTable } from "@/components/dashboard/analytics/historical-data-table";
import { InsightsPanel } from "@/components/dashboard/analytics/insights-panel";
import { ExportMenu } from "@/components/dashboard/analytics/export-menu";
import { getStoredScans, type StoredScan } from "@/lib/scan-storage";
import type { Scan } from "@/lib/data";

export default function AnalyticsPage() {
  const [trendData, setTrendData] = useState<Array<{ date: string; score: number }>>([]);
  const [verdictData, setVerdictData] = useState<Array<{ verdict: string; count: number; fill: string }>>([]);
  const [scanHistory, setScanHistory] = useState<Scan[]>([]);
  const [summaryData, setSummaryData] = useState({
    totalScans: 0,
    genuineCount: 0,
    fakeCount: 0,
    suspiciousCount: 0,
  });

  useEffect(() => {
    // Load real scan data from localStorage
    const scans = getStoredScans();
    
    if (scans.length === 0) {
      // No scans yet - set empty data
      setTrendData([]);
      setVerdictData([
        { verdict: "Genuine", count: 0, fill: "hsl(var(--success))" },
        { verdict: "Fake", count: 0, fill: "hsl(var(--destructive))" },
        { verdict: "Suspicious", count: 0, fill: "hsl(var(--suspicious))" },
      ]);
      setScanHistory([]);
      setSummaryData({
        totalScans: 0,
        genuineCount: 0,
        fakeCount: 0,
        suspiciousCount: 0,
      });
      return;
    }

    // Calculate verdict distribution
    const genuineCount = scans.filter(s => s.verdict === 'Genuine').length;
    const fakeCount = scans.filter(s => s.verdict === 'Fake').length;
    const suspiciousCount = scans.filter(s => s.verdict === 'Suspicious').length;

    setVerdictData([
      { verdict: "Genuine", count: genuineCount, fill: "hsl(var(--success))" },
      { verdict: "Fake", count: fakeCount, fill: "hsl(var(--destructive))" },
      { verdict: "Suspicious", count: suspiciousCount, fill: "hsl(var(--suspicious))" },
    ]);

    setSummaryData({
      totalScans: scans.length,
      genuineCount,
      fakeCount,
      suspiciousCount,
    });

    // Calculate trend data (group by date)
    const scansWithDates = scans.map(scan => ({
      ...scan,
      date: new Date(scan.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    }));

    const groupedByDate = scansWithDates.reduce((acc, scan) => {
      if (!acc[scan.date]) {
        acc[scan.date] = [];
      }
      acc[scan.date].push(scan);
      return acc;
    }, {} as Record<string, typeof scansWithDates>);

    const trends = Object.entries(groupedByDate).map(([date, scans]) => ({
      date,
      score: scans.reduce((sum, s) => sum + s.score, 0) / scans.length,
    }));

    setTrendData(trends);

    // Format scan history for table
    const formattedScans: Scan[] = scans.map(scan => ({
      batchId: scan.batchId,
      time: new Date(scan.timestamp).toLocaleString(),
      status: scan.verdict,
      score: scan.score,
      operator: scan.operator,
    }));

    setScanHistory(formattedScans);
  }, []);

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Analytics & History</h1>
          <p className="text-muted-foreground">
            Visual insights into scanning trends, detection ratios, and anomalies.
          </p>
        </div>
        <ExportMenu 
          data={{ summaryData, trendData, verdictData, recentScans: scanHistory }}
          pdfElementId="analytics-content"
          filePrefix="analytics-report"
        />
      </div>

      {scanHistory.length === 0 ? (
        <div className="text-center py-12 bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg">
          <p className="text-muted-foreground mb-4">No scan data available yet</p>
          <p className="text-sm text-muted-foreground">Start scanning IC chips to see analytics and history here</p>
        </div>
      ) : (
        <div id="analytics-content" className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
              <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <AnalyticsCharts trendData={trendData} verdictData={verdictData} />
              </div>
              <HistoricalDataTable scanHistory={scanHistory} />
          </div>
          <div className="lg:col-span-1">
              <InsightsPanel scanData={scanHistory} summaryData={summaryData} />
          </div>
        </div>
      )}
    </div>
  );
}
