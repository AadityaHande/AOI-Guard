'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, ShieldCheck, ShieldX, ShieldAlert, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

type SummaryData = {
  totalScanned: number;
  genuine: number;
  fake: number;
  suspicious: number;
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span className="animate-count-up">{displayValue.toLocaleString()}</span>;
}

export function BatchSummary({ summaryData }: { summaryData: SummaryData }) {
  const genuinePercentage = ((summaryData.genuine / summaryData.totalScanned) * 100).toFixed(1);

  const summaryCards = [
    {
      title: "Total Scanned",
      value: summaryData.totalScanned,
      icon: Shield,
      color: "text-primary",
      bgGradient: "from-primary/20 to-primary/5",
      description: "All ICs processed",
    },
    {
      title: "Genuine",
      value: summaryData.genuine,
      icon: ShieldCheck,
      color: "text-success",
      bgGradient: "from-success/20 to-success/5",
      description: `${genuinePercentage}% authentic`,
    },
    {
      title: "Fake",
      value: summaryData.fake,
      icon: ShieldX,
      color: "text-destructive",
      bgGradient: "from-destructive/20 to-destructive/5",
      description: "Counterfeit detected",
    },
    {
      title: "Suspicious",
      value: summaryData.suspicious,
      icon: ShieldAlert,
      color: "text-suspicious",
      bgGradient: "from-suspicious/20 to-suspicious/5",
      description: "Requires review",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Batch Summary</h2>
        <div className="flex items-center gap-2 text-sm text-success">
          <TrendingUp className="h-4 w-4" />
          <span>{genuinePercentage}% Authentic</span>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <Card 
            key={card.title} 
            className="group relative overflow-hidden border-border/50 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]"
          >
            {/* Gradient background effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
            
            {/* Content */}
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`rounded-lg bg-background/50 p-2 transition-all duration-300 group-hover:scale-110 ${card.color}`}>
                <card.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className={`text-3xl font-bold ${card.color} mb-1`}>
                <AnimatedNumber value={card.value} />
              </div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>

            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </Card>
        ))}
      </div>
    </div>
  );
}
