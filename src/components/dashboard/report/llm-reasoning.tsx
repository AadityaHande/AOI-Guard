import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

type LlmReasoningProps = {
  reasoning: string;
  flaggedMarkings: string[];
  flaggedOemData: string[];
};

export function LlmReasoning({ reasoning, flaggedMarkings, flaggedOemData }: LlmReasoningProps) {
  return (
    <Card className="bg-card/60 backdrop-blur-sm shadow-cyan">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            AI Reasoning
        </CardTitle>
        <CardDescription>
            The AI's analysis behind the authenticity verdict.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground italic">"{reasoning}"</p>
        
        {flaggedMarkings.length > 0 && (
            <div>
                <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Flagged Markings</h4>
                <div className="flex flex-wrap gap-2">
                    {flaggedMarkings.map((mark, i) => <Badge key={i} variant="secondary">{mark}</Badge>)}
                </div>
            </div>
        )}

        {flaggedOemData.length > 0 && (
             <div>
                <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Relevant OEM Data</h4>
                <div className="flex flex-wrap gap-2">
                    {flaggedOemData.map((data, i) => <Badge key={i} variant="secondary">{data}</Badge>)}
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
