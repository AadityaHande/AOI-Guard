import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, BrainCircuit } from "lucide-react";

export function RetrainPanel() {
  return (
    <Card className="bg-card/60 backdrop-blur-sm shadow-cyan">
      <CardHeader>
        <CardTitle>Trigger Model Retraining</CardTitle>
        <CardDescription>
          Upload a zip file containing new genuine and fake IC images to improve model accuracy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border p-12 text-center">
          <UploadCloud className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">
            Drag & drop training_data.zip or <span className="font-semibold text-primary">browse</span>
          </p>
          <p className="text-xs text-muted-foreground">
            File should contain 'genuine' and 'fake' subfolders.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto hover:shadow-cyan focus:shadow-cyan transition-shadow duration-300">
          <BrainCircuit className="mr-2 h-4 w-4" />
          Trigger Retraining
        </Button>
      </CardFooter>
    </Card>
  );
}
