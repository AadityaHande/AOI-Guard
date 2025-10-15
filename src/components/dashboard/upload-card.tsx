'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, Shield } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { batchScanAndSummary, BatchScanAndSummaryOutput } from '@/ai/flows/batch-scan-summary';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

export function UploadCard({ onScanComplete }: { onScanComplete: (results: BatchScanAndSummaryOutput) => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const handleStartScan = async () => {
    if (files.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No files selected',
        description: 'Please upload at least one image to start the scan.',
      });
      return;
    }

    setIsScanning(true);
    setProgress(0);

    const fileToDataUri = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    try {
      const imagePayloads = await Promise.all(
        files.map(async (file) => {
           const dataUri = await fileToDataUri(file);
           setProgress(prev => prev + (50 / files.length)); // Reading files is ~half the work
            return {
                fileName: file.name,
                dataUri: dataUri,
                // These are placeholder values. In a real app, OCR and OEM data lookup would happen here.
                ocrExtractedMarkings: `Mock OCR for ${file.name}`,
                oemData: `Mock OEM data for ${file.name}`,
            }
        })
      );
      
      const batchId = `B${Math.floor(Math.random() * 10)}-${new Date().toISOString().slice(0,10)}-${String(Math.floor(Math.random() * 1000)).padStart(3,'0')}`;

      const results = await batchScanAndSummary({
        batchId,
        icImages: imagePayloads
      });
      
      setProgress(100);
      onScanComplete(results);
      toast({
        title: 'Scan Complete',
        description: `Batch ${batchId} processed. ${results.totalScanned} ICs analyzed.`,
      });

    } catch (error) {
      console.error('Scan failed:', error);
      toast({
        variant: 'destructive',
        title: 'Scan Failed',
        description: 'An unexpected error occurred during the scan.',
      });
    } finally {
      setIsScanning(false);
      setFiles([]);
      // Reset progress after a short delay
      setTimeout(() => setProgress(0), 1000);
    }
  };
  
  const removeFile = (fileName: string) => {
    setFiles(files.filter(file => file.name !== fileName));
  };


  return (
    <Card className="group relative overflow-hidden border-border/50 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20" data-upload-trigger>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UploadCloud className="h-5 w-5 text-primary" />
          Upload & Scan
        </CardTitle>
        <CardDescription>
          Drag and drop IC images or select files to start authenticity analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`relative flex cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-12 text-center transition-all duration-300 ${
            isDragActive 
              ? 'border-primary bg-primary/20 scale-105' 
              : 'border-border/50 hover:border-primary/50 hover:bg-primary/5'
          }`}
        >
          <input {...getInputProps()} />
          
          {/* Animated upload icon */}
          <div className={`transition-transform duration-300 ${isDragActive ? 'scale-110 animate-bounce' : ''}`}>
            <div className="rounded-full bg-primary/10 p-4">
              <UploadCloud className={`h-12 w-12 transition-colors ${isDragActive ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
          </div>
          
          <div>
            <p className="text-foreground font-medium">
              {isDragActive ? 'Drop files here...' : 'Drag & drop files here'}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              or <span className="font-semibold text-primary underline-offset-4 hover:underline">browse</span> to select
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="rounded-full bg-background/50 px-3 py-1">JPG</span>
            <span className="rounded-full bg-background/50 px-3 py-1">PNG</span>
            <span className="rounded-full bg-background/50 px-3 py-1">WEBP</span>
            <span className="rounded-full bg-background/50 px-3 py-1">Max 5MB</span>
          </div>
        </div>
        
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Selected Files ({files.length})</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setFiles([])}
                className="h-auto p-1 text-xs"
              >
                Clear All
              </Button>
            </div>
            <div className="max-h-32 space-y-2 overflow-y-auto rounded-lg border border-border/50 bg-background/50 p-3">
              {files.map((file) => (
                <div 
                  key={file.name} 
                  className="flex items-center justify-between gap-2 rounded bg-card/50 p-2 text-sm transition-colors hover:bg-card"
                >
                  <span className="flex-1 truncate text-foreground">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.name);
                    }}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {isScanning && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-primary">
                <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                Analyzing IC batch...
              </span>
              <span className="font-mono text-muted-foreground">{Math.floor(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleStartScan}
          disabled={isScanning || files.length === 0}
          className="w-full gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          size="lg"
        >
          {isScanning ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Scanning...
            </>
          ) : (
            <>
              <Shield className="h-4 w-4" />
              Start Scan ({files.length} {files.length === 1 ? 'file' : 'files'})
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
