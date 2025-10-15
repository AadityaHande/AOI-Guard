import { RetrainPanel } from "@/components/dashboard/settings/retrain-panel";
import { VersionHistory } from "@/components/dashboard/settings/version-history";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Settings & Retraining</h1>
        <p className="text-muted-foreground">
          Manage system settings and AI model versions. (ML Engineer Role)
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RetrainPanel />
        </div>
        <div className="lg:col-span-1">
          <VersionHistory />
        </div>
      </div>
    </div>
  );
}
