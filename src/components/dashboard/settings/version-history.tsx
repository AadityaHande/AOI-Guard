import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch } from "lucide-react";

const versions = [
  {
    version: "v1.1",
    accuracy: "98.2%",
    date: "2024-04-15",
    status: "Active",
  },
  {
    version: "v1.0",
    accuracy: "97.1%",
    date: "2024-03-01",
    status: "Archived",
  },
  {
    version: "v0.9-beta",
    accuracy: "93.5%",
    date: "2024-01-20",
    status: "Archived",
  },
];

export function VersionHistory() {
  return (
    <Card className="bg-card/60 backdrop-blur-sm shadow-cyan">
      <CardHeader>
        <CardTitle>Model Version History</CardTitle>
        <CardDescription>
          Timeline of deployed AI models.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {versions.map((item, index) => (
            <div key={item.version} className="relative flex gap-4">
              {index < versions.length - 1 && (
                <div className="absolute left-4 top-5 h-full w-px bg-border" />
              )}
              <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <GitBranch className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{item.version}</p>
                  {item.status === "Active" && (
                    <Badge variant="outline" className="border-success text-success">Active</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Accuracy: {item.accuracy}
                </p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
