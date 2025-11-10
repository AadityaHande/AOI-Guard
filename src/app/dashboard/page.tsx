'use client';

import React, { useState, useEffect } from 'react';
import { BatchSummary } from '@/components/dashboard/batch-summary';
import { RecentScansTable } from '@/components/dashboard/recent-scans-table';
import { AlertsPanel } from '@/components/dashboard/alerts-panel';
import { UploadCard } from '@/components/dashboard/upload-card';
import { FloatingActions } from '@/components/floating-actions';
import { getRecentScansForDashboard, getStoredScans } from '@/lib/scan-storage';
import { BatchScanAndSummaryOutput } from '@/ai/flows/batch-scan-summary';
import { AnalyticsCharts } from '@/components/dashboard/analytics/analytics-charts';
import type { Scan } from '@/lib/data';

interface Alert {
  id: number;
  type: 'Fake' | 'Suspicious';
  message: string;
  time: string;
}

export default function DashboardPage() {
  const [summaryData, setSummaryData] = useState({
    totalScanned: 0,
    genuine: 0,
    fake: 0,
    suspicious: 0,
    avgAuthenticity: 0,
  });
  const [recentScans, setRecentScans] = useState<Scan[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [verdictData, setVerdictData] = useState<Array<{ verdict: string; count: number; fill: string }>>([
    { verdict: 'Genuine', count: 0, fill: "hsl(var(--success))" },
    { verdict: 'Fake', count: 0, fill: "hsl(var(--destructive))" },
    { verdict: 'Suspicious', count: 0, fill: "hsl(var(--suspicious))" },
  ]);
  const [trendData, setTrendData] = useState<Array<{ date: string; score: number }>>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Load real scans from localStorage
    const storedScans = getStoredScans();
    
    if (storedScans.length > 0) {
      // Calculate summary statistics
      const genuineCount = storedScans.filter(s => s.verdict === 'Genuine').length;
      const fakeCount = storedScans.filter(s => s.verdict === 'Fake').length;
      const suspiciousCount = storedScans.filter(s => s.verdict === 'Suspicious').length;
      const avgScore = storedScans.reduce((sum, s) => sum + s.score, 0) / storedScans.length;
      
      setSummaryData({
        totalScanned: storedScans.length,
        genuine: genuineCount,
        fake: fakeCount,
        suspicious: suspiciousCount,
        avgAuthenticity: avgScore,
      });

      // Update verdict distribution
      setVerdictData([
        { verdict: 'Genuine', count: genuineCount, fill: "hsl(var(--success))" },
        { verdict: 'Fake', count: fakeCount, fill: "hsl(var(--destructive))" },
        { verdict: 'Suspicious', count: suspiciousCount, fill: "hsl(var(--suspicious))" },
      ]);

      // Calculate trend data
      const scansWithDates = storedScans.map(scan => ({
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

      // Get recent scans for table
      const dashboardScans = getRecentScansForDashboard();
      setRecentScans(dashboardScans);
      
      // Create alerts for recent fake/suspicious detections
      const recentAlerts = dashboardScans
        .filter(scan => scan.status === 'Fake' || scan.status === 'Suspicious')
        .slice(0, 5) // Only show top 5 most recent
        .map((scan, index) => ({
          id: Date.now() + index,
          type: scan.status as 'Fake' | 'Suspicious',
          message: scan.status === 'Fake'
            ? `Critical: Counterfeit IC detected in ${scan.batchId}. Immediate inspection required.`
            : `Warning: Suspicious IC markings detected in ${scan.batchId}. Manual verification recommended.`,
          time: scan.time,
        }));
      
      setAlerts(recentAlerts);
    }
  }, []);

  const handleScanComplete = (results: BatchScanAndSummaryOutput) => {
    const newSummary = {
      totalScanned: summaryData.totalScanned + results.totalScanned,
      genuine: summaryData.genuine + results.genuineCount,
      fake: summaryData.fake + results.fakeCount,
      suspicious: summaryData.suspicious + results.suspiciousCount,
      avgAuthenticity: summaryData.avgAuthenticity, // This would need recalculation in a real app
    };
    setSummaryData(newSummary);

    setVerdictData([
      { verdict: 'Genuine', count: newSummary.genuine, fill: "hsl(var(--success))" },
      { verdict: 'Fake', count: newSummary.fake, fill: "hsl(var(--destructive))" },
      { verdict: 'Suspicious', count: newSummary.suspicious, fill: "hsl(var(--suspicious))" },
    ]);

    const newScanEntries = results.results.map(r => ({
      batchId: r.batchId,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}),
      status: r.verdict,
      score: r.authenticityScore,
      operator: "QA Engineer"
    }));

    setRecentScans(prev => [...newScanEntries, ...prev]);

    const newAlerts = results.results
      .filter(r => r.verdict === 'Fake' || r.verdict === 'Suspicious')
      .map(r => ({
        id: Math.random(),
        type: r.verdict as 'Fake' | 'Suspicious',
        message: `${r.verdict} IC detected in Batch ${r.batchId}.`,
        time: 'Just now'
      }));

    setAlerts(prev => [...newAlerts, ...prev]);
  };

  if (!isClient) {
    return null; // Or a loading spinner
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent">
              QA Command Center
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time IC authenticity monitoring and analysis
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <BatchSummary summaryData={summaryData} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Left Column - Upload & Charts */}
          <div className="space-y-6 lg:col-span-3">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <UploadCard onScanComplete={handleScanComplete} />
              <div className="border border-border/50 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-lg p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20">
                <AnalyticsCharts trendData={trendData} verdictData={verdictData} />
              </div>
            </div>
            <RecentScansTable recentScans={recentScans} />
          </div>

          {/* Right Column - Alerts */}
          <div className="lg:col-span-1">
            <AlertsPanel alerts={alerts} />
          </div>
        </div>
      </div>
      
      <FloatingActions />
    </>
  );
}
