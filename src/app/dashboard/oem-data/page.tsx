import { OemDataTable } from "@/components/dashboard/oem-data/oem-data-table";
import { OemUploadCard } from "@/components/dashboard/oem-data/oem-upload-card";

export default function OemDataPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline">OEM Data Center</h1>
        <p className="text-muted-foreground">
          Manage OEM marking specifications and documents. (Admin Role)
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <OemDataTable />
        </div>
        <div className="lg:col-span-1">
            <OemUploadCard />
        </div>
      </div>
    </div>
  );
}
