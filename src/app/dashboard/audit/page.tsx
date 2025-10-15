import { AuditLog } from '@/components/dashboard/audit-log';
import { Separator } from '@/components/ui/separator';

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Audit Log
        </h1>
        <p className="text-muted-foreground mt-2">
          Complete system activity history with filtering and search capabilities
        </p>
      </div>
      
      <Separator className="bg-border/50" />
      
      <AuditLog />
    </div>
  );
}
