import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Target } from "lucide-react";

type AuthenticityScoreProps = {
  score: number;
  verdict: "Genuine" | "Fake" | "Suspicious";
};

export function AuthenticityScore({ score, verdict }: AuthenticityScoreProps) {
    const scoreColorClass = 
        verdict === "Genuine" ? "bg-success" :
        verdict === "Suspicious" ? "bg-suspicious" :
        "bg-destructive";

  return (
    <Card className="bg-card/60 backdrop-blur-sm shadow-cyan">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Authenticity Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-2">
          <p className="text-5xl font-bold">{score.toFixed(2)}</p>
          <p className="text-xl text-muted-foreground">%</p>
        </div>
        <Progress value={score} className="h-3 [&>*]:transition-all [&>*]:duration-500" indicatorClassName={scoreColorClass} />
        <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Verdict</span>
            <Badge
                variant="outline"
                className={cn(
                    "text-base font-semibold border-2 px-3 py-1",
                    verdict === "Genuine" && "border-success text-success",
                    verdict === "Fake" && "border-destructive text-destructive",
                    verdict === "Suspicious" && "border-suspicious text-suspicious"
                )}
            >
                {verdict}
            </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
