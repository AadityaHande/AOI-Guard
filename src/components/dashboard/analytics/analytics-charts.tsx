"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Pie, PieChart, Line, LineChart, Cell, XAxis, CartesianGrid } from "recharts";
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
    <div className="grid gap-8 md:grid-cols-2">
      {/* Verdict Distribution - Pie Chart */}
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold mb-4 font-headline">Verdict Distribution</h3>
        <div className="flex-1 flex items-center justify-center min-h-[250px]">
          <ChartContainer
            config={verdictChartConfig}
            className="w-full h-[250px]"
          >
            <PieChart width={250} height={250}>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={verdictData}
                dataKey="count"
                nameKey="verdict"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                strokeWidth={2}
                stroke="hsl(var(--background))"
              >
                {verdictData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="verdict" />}
                className="flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </div>
      </div>

      {/* Authenticity Trend - Line Chart */}
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold mb-4 font-headline">Authenticity Trend</h3>
        <div className="flex-1 min-h-[250px]">
          <ChartContainer config={trendChartConfig} className="w-full h-[250px]">
            <LineChart
              data={trendData}
              margin={{
                left: 12,
                right: 12,
                top: 12,
                bottom: 12
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
              <XAxis 
                dataKey="date" 
                tickLine={false} 
                axisLine={false} 
                tickMargin={8}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
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
        </div>
      </div>
    </div>
  );
}
