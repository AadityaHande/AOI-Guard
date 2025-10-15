"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Pie, PieChart, Line, LineChart, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";
import { trendData as defaultTrendData, verdictData as defaultVerdictData } from "@/lib/data";

const trendChartConfig = {
  score: {
    label: "Avg. Score",
    color: "hsl(var(--primary))",
  },
} as const;

const verdictChartConfig = {
  Genuine: {
    label: "Genuine",
    color: "hsl(var(--success))",
  },
  Fake: {
    label: "Fake",
    color: "hsl(var(--destructive))",
  },
  Suspicious: {
    label: "Suspicious",
    color: "hsl(var(--suspicious))",
  },
} as const;

type AnalyticsChartsProps = {
    trendData: typeof defaultTrendData;
    verdictData: (typeof defaultVerdictData);
}

export function AnalyticsCharts({ trendData, verdictData }: AnalyticsChartsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 h-full w-full">
      <Card className="bg-transparent border-0 shadow-none flex flex-col">
        <CardHeader className="p-4">
          <CardTitle>Verdict Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-4 flex items-center justify-center">
          <ChartContainer
            config={verdictChartConfig}
            className="aspect-square w-full max-w-[280px] sm:max-w-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={verdictData}
                dataKey="count"
                nameKey="verdict"
                innerRadius={60}
                strokeWidth={5}
                stroke="hsl(var(--card))"
              >
                {verdictData.map((entry) => (
                  <Cell key={`cell-${entry.verdict}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="verdict" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="bg-transparent border-0 shadow-none flex flex-col">
        <CardHeader className="p-4">
          <CardTitle>Authenticity Trend</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <ChartContainer config={trendChartConfig} className="w-full h-full min-h-[200px] max-h-[280px]">
            <LineChart
              accessibilityLayer
              data={trendData}
              margin={{
                left: -20,
                right: 20,
                top: 10,
                bottom: 10
              }}
            >
              <defs>
                <linearGradient id="fillScore" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.6}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="score"
                type="monotone"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                fill="url(#fillScore)"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
