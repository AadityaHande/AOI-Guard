import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp, Cpu, CheckCircle } from "lucide-react";
import React from 'react';
import type { Scan } from "@/lib/data";

const insightIcons = {
    Spike: AlertTriangle,
    Trend: TrendingUp,
    Alert: Cpu,
    Success: CheckCircle,
}

interface InsightsPanelProps {
  scanData?: Scan[];
  summaryData?: {
    totalScans: number;
    genuineCount: number;
    fakeCount: number;
    suspiciousCount: number;
  };
}

export function InsightsPanel({ scanData = [], summaryData }: InsightsPanelProps) {
  // Generate dynamic insights from real data
  const generateInsights = () => {
    if (!scanData || scanData.length === 0) {
      return [
        {
          type: 'Alert',
          message: 'No scan data available yet. Start scanning IC chips to see AI-generated insights.'
        }
      ];
    }

    const insights = [];
    const total = summaryData?.totalScans || 0;
    const genuine = summaryData?.genuineCount || 0;
    const fake = summaryData?.fakeCount || 0;
    const suspicious = summaryData?.suspiciousCount || 0;

    // Genuine rate insight
    if (total > 0) {
      const genuineRate = ((genuine / total) * 100).toFixed(1);
      if (parseFloat(genuineRate) > 80) {
        insights.push({
          type: 'Success',
          message: `High authenticity rate detected: ${genuineRate}% of scanned ICs are genuine. Quality control is performing well.`
        });
      } else if (parseFloat(genuineRate) < 50) {
        insights.push({
          type: 'Alert',
          message: `Low authenticity rate: Only ${genuineRate}% genuine ICs detected. Immediate supply chain review recommended.`
        });
      }
    }

    // Fake detection alert
    if (fake > 0) {
      const fakeRate = ((fake / total) * 100).toFixed(1);
      insights.push({
        type: 'Spike',
        message: `${fake} counterfeit IC${fake > 1 ? 's' : ''} detected (${fakeRate}% of scans). Enhanced verification protocols advised.`
      });
    }

    // Suspicious items warning
    if (suspicious > 0) {
      insights.push({
        type: 'Alert',
        message: `${suspicious} suspicious IC${suspicious > 1 ? 's' : ''} flagged for manual inspection. Inconsistent markings or anomalies detected.`
      });
    }

    // Volume insight
    if (total >= 10) {
      insights.push({
        type: 'Trend',
        message: `${total} scans completed. Statistical confidence is improving with increased sample size.`
      });
    }

    // Recent activity
    if (scanData.length > 0) {
      const recentScan = scanData[0];
      if (recentScan.status === 'Fake') {
        insights.push({
          type: 'Spike',
          message: `Most recent scan detected counterfeit IC (${recentScan.batchId}). Verify batch source immediately.`
        });
      }
    }

    // Average score trend
    const avgScore = scanData.reduce((sum, scan) => sum + scan.score, 0) / scanData.length;
    if (avgScore >= 90) {
      insights.push({
        type: 'Success',
        message: `Average authenticity score is ${avgScore.toFixed(1)}%. IC quality is consistently high.`
      });
    } else if (avgScore < 75) {
      insights.push({
        type: 'Alert',
        message: `Average authenticity score is ${avgScore.toFixed(1)}%. Multiple quality issues detected across batches.`
      });
    }

    return insights.slice(0, 5); // Show max 5 insights
  };

  const insights = generateInsights();

  return (
    <Card className="bg-card/60 backdrop-blur-sm shadow-cyan sticky top-20">
      <CardHeader>
        <CardTitle>AI-Generated Insights</CardTitle>
        <CardDescription>
          Automated analysis of scanning trends and anomalies.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {insights.map((insight, index) => {
             const Icon = insightIcons[insight.type as keyof typeof insightIcons];
             return (
                <li key={index} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                        <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground pt-1.5">{insight.message}</p>
                </li>
             )
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
