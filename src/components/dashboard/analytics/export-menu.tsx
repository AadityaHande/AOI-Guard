'use client';

import { Download, FileText, FileSpreadsheet, FileJson } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { exportToCSV, exportToJSON, exportToPDF, generateFilename } from '@/lib/export-utils';
import { useToast } from '@/hooks/use-toast';

interface ExportMenuProps {
  data: any;
  pdfElementId?: string;
  filePrefix?: string;
}

export function ExportMenu({ data, pdfElementId, filePrefix = 'aoi-guard-report' }: ExportMenuProps) {
  const { toast } = useToast();

  const handleExportCSV = () => {
    try {
      const filename = generateFilename(filePrefix);
      exportToCSV(Array.isArray(data) ? data : [data], filename);
      toast({
        title: 'Export Successful',
        description: 'CSV file has been downloaded.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Export Failed',
        description: 'Failed to export CSV file.',
      });
    }
  };

  const handleExportJSON = () => {
    try {
      const filename = generateFilename(filePrefix);
      exportToJSON(data, filename);
      toast({
        title: 'Export Successful',
        description: 'JSON file has been downloaded.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Export Failed',
        description: 'Failed to export JSON file.',
      });
    }
  };

  const handleExportPDF = async () => {
    if (!pdfElementId) {
      toast({
        variant: 'destructive',
        title: 'Export Failed',
        description: 'PDF export element not configured.',
      });
      return;
    }

    toast({
      title: 'Generating PDF...',
      description: 'Please wait while we create your report.',
    });

    try {
      const filename = generateFilename(filePrefix);
      const success = await exportToPDF(pdfElementId, filename, 'AOI-Guard Analytics Report');
      
      if (success) {
        toast({
          title: 'Export Successful',
          description: 'PDF report has been downloaded.',
        });
      } else {
        throw new Error('PDF generation failed');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Export Failed',
        description: 'Failed to generate PDF report.',
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Export Format</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleExportCSV}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          <span>Export as CSV</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportJSON}>
          <FileJson className="mr-2 h-4 w-4" />
          <span>Export as JSON</span>
        </DropdownMenuItem>
        {pdfElementId && (
          <DropdownMenuItem onClick={handleExportPDF}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Export as PDF</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
