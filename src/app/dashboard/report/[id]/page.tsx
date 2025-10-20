'use client';

import { notFound } from "next/navigation";
import { detailedReportData } from "@/lib/data";
import { getDetailedReport } from "@/lib/scan-storage";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Eye } from "lucide-react";
import Link from "next/link";
import { ImagePreview } from "@/components/dashboard/report/image-preview";
import { AuthenticityScore } from "@/components/dashboard/report/authenticity-score";
import { DataComparison } from "@/components/dashboard/report/data-comparison";
import { LlmReasoning } from "@/components/dashboard/report/llm-reasoning";
import { OperatorActions } from "@/components/dashboard/report/operator-actions";
import { VisualComparison } from "@/components/dashboard/report/visual-comparison";
import { useEffect, useState, use } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default function ReportPage({ params }: Props) {
  const { id } = use(params); // Unwrap the promise
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try static data first
    const staticReport = detailedReportData[id as keyof typeof detailedReportData];
    if (staticReport) {
      setReport(staticReport);
      setLoading(false);
      return;
    }

    // Try localStorage (from detect page)
    const storedReport = getDetailedReport(id);
    if (storedReport) {
      setReport(storedReport);
      setLoading(false);
      return;
    }

    // Not found
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading report...</div>;
  }

  if (!report) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Button asChild variant="ghost" className="-ml-4">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold font-headline">Detailed Report: {report.batchId}</h1>
          <p className="text-muted-foreground">
            Generated on {new Date(report.timestamp).toLocaleString()} by {report.operator}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button>
            <Eye className="mr-2 h-4 w-4" />
            View OEM Source
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <ImagePreview imageUrl={report.imageUrl} imageHint={report.imageHint} />
          <VisualComparison 
            icImageUrl={report.imageUrl} 
            oemReferenceUrl={report.oemReferenceImageUrl || report.imageUrl}
            imageHint={report.imageHint}
          />
          <DataComparison ocrMarkings={report.ocrMarkings} oemData={report.oemData} />
        </div>
        <div className="space-y-6 lg:col-span-2">
          <AuthenticityScore score={report.authenticityScore} verdict={report.verdict} />
          <LlmReasoning reasoning={report.llmReasoning} flaggedMarkings={report.flaggedMarkings} flaggedOemData={report.flaggedOemData} />
           <OperatorActions />
        </div>
      </div>
    </div>
  );
}
