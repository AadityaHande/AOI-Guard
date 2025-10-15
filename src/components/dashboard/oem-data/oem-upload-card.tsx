import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileText, DatabaseZap } from "lucide-react";

export function OemUploadCard() {
  return (
    <div className="space-y-6">
        <Card className="bg-card/60 backdrop-blur-sm shadow-cyan">
            <CardHeader>
                <CardTitle>Auto-Fetch OEM Data</CardTitle>
                <CardDescription>
                Trigger a backend scraper to update specifications automatically.
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button className="w-full">
                    <DatabaseZap className="mr-2 h-4 w-4" />
                    Start Auto-Fetch
                </Button>
            </CardFooter>
        </Card>
        <Card className="bg-card/60 backdrop-blur-sm shadow-cyan">
        <CardHeader>
            <CardTitle>Upload OEM Document</CardTitle>
            <CardDescription>
            Upload a PDF or CSV file to add or update an OEM dataset.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border p-8 text-center">
            <FileText className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">
                Drag & drop file or <span className="font-semibold text-primary">browse</span>
            </p>
            <p className="text-xs text-muted-foreground">
                Supported formats: PDF, CSV
            </p>
            </div>
        </CardContent>
        </Card>
    </div>
  );
}
