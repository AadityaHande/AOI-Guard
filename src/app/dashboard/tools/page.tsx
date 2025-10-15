import { BatchComparison } from '@/components/dashboard/batch-comparison';
import { Separator } from '@/components/ui/separator';

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Tools & Utilities
        </h1>
        <p className="text-muted-foreground mt-2">
          Advanced tools for batch comparison, audit logging, and system analysis
        </p>
      </div>
      
      <Separator className="bg-border/50" />
      
      <BatchComparison />
    </div>
  );
}
