import { format } from 'date-fns';

export interface ExportData {
  [key: string]: string | number | boolean;
}

/**
 * Export data to CSV format
 */
export function exportToCSV(data: ExportData[], filename: string) {
  if (data.length === 0) return;

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape values containing commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  downloadFile(csvContent, `${filename}.csv`, 'text/csv');
}

/**
 * Export data to JSON format
 */
export function exportToJSON(data: any, filename: string) {
  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, `${filename}.json`, 'application/json');
}

/**
 * Generate PDF report (requires html2canvas and jsPDF)
 */
export async function exportToPDF(
  elementId: string,
  filename: string,
  title?: string
) {
  try {
    // Dynamic imports to reduce bundle size
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).default;

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    // Capture the element as canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add title if provided
    if (title) {
      pdf.setFontSize(16);
      pdf.text(title, 105, 15, { align: 'center' });
      pdf.addImage(imgData, 'PNG', 0, 25, imgWidth, imgHeight);
    } else {
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    }

    // Add metadata
    pdf.setProperties({
      title: title || filename,
      subject: 'AOI-Guard Report',
      author: 'AOI-Guard System',
      keywords: 'IC inspection, authenticity, report',
      creator: 'AOI-Guard',
    });

    pdf.save(`${filename}.pdf`);
    return true;
  } catch (error) {
    console.error('PDF export failed:', error);
    return false;
  }
}

/**
 * Helper function to download file
 */
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate filename with timestamp
 */
export function generateFilename(prefix: string): string {
  const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
  return `${prefix}_${timestamp}`;
}

/**
 * Format data for analytics export
 */
export function formatAnalyticsData(data: any) {
  return {
    exportDate: format(new Date(), 'PPpp'),
    summary: data.summary,
    trends: data.trends,
    details: data.details,
  };
}
