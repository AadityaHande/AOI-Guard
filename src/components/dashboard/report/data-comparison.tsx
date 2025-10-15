import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DataComparisonProps = {
  ocrMarkings: string;
  oemData: string;
};

export function DataComparison({ ocrMarkings, oemData }: DataComparisonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-card/60 backdrop-blur-sm shadow-cyan">
        <CardHeader>
          <CardTitle>OCR-Extracted Markings</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">
            {ocrMarkings}
          </pre>
        </CardContent>
      </Card>
      <Card className="bg-card/60 backdrop-blur-sm shadow-cyan">
        <CardHeader>
          <CardTitle>OEM Data Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">
            {oemData}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
