import { AnalyticsCharts } from "@/components/dashboard/analytics/analytics-charts";
import { HistoricalDataTable } from "@/components/dashboard/analytics/historical-data-table";
import { InsightsPanel } from "@/components/dashboard/analytics/insights-panel";
import { ExportMenu } from "@/components/dashboard/analytics/export-menu";
import { summaryData, trendData, verdictData, recentScans } from "@/lib/data";


export default function AnalyticsPage() {
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
          data={{ summaryData, trendData, verdictData, recentScans }}
          pdfElementId="analytics-content"
          filePrefix="analytics-report"
        />
      </div>

      <div id="analytics-content" className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg p-6">
              <AnalyticsCharts trendData={trendData} verdictData={verdictData} />
            </div>
            <HistoricalDataTable scanHistory={recentScans} />
        </div>
        <div className="lg:col-span-1">
            <InsightsPanel />
        </div>
      </div>
    </div>
  );
}
