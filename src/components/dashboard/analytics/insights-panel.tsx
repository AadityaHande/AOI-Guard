import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { insights } from "@/lib/data";
import { AlertTriangle, TrendingUp, Cpu } from "lucide-react";
import React from 'react';

const insightIcons = {
    Spike: AlertTriangle,
    Trend: TrendingUp,
    Alert: Cpu
}

export function InsightsPanel() {
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
