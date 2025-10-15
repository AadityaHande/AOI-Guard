'use client';

import { BatchSummary } from '@/components/dashboard/batch-summary';
import { RecentScansTable } from '@/components/dashboard/recent-scans-table';
import { AlertsPanel } from '@/components/dashboard/alerts-panel';
import { UploadCard } from '@/components/dashboard/upload-card';
import { FloatingActions } from '@/components/floating-actions';
import { useState, useEffect } from 'react';
import { summaryData as initialSummary, recentScans as initialRecentScans, alerts as initialAlerts, verdictData as initialVerdictData, trendData } from "@/lib/data";
import { BatchScanAndSummaryOutput } from '@/ai/flows/batch-scan-summary';
import { AnalyticsCharts } from '@/components/dashboard/analytics/analytics-charts';

export default function DashboardPage() {
  const [summaryData, setSummaryData] = useState(initialSummary);
  const [recentScans, setRecentScans] = useState(initialRecentScans);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [verdictData, setVerdictData] = useState(initialVerdictData);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
              <div className="border-border/50 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20">
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
