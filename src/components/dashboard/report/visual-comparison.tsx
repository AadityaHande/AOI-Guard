'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Maximize2, Minimize2 } from 'lucide-react';
import Image from 'next/image';

interface VisualComparisonProps {
  icImageUrl: string;
  oemReferenceUrl?: string;
  imageHint?: string;
}

export function VisualComparison({
  icImageUrl,
  oemReferenceUrl,
  imageHint = 'circuit board',
}: VisualComparisonProps) {
  // Use the same IC image for OEM reference if not provided
  const oemImage = oemReferenceUrl || icImageUrl;
  const isDataUri = icImageUrl?.startsWith('data:');
  const [opacity, setOpacity] = useState([50]);
  const [isOverlay, setIsOverlay] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <Card className="bg-card/60 backdrop-blur-sm shadow-cyan">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Visual Comparison Tool</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            {isZoomed ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Toggle between side-by-side and overlay */}
        <div className="flex items-center space-x-2">
          <Switch
            id="overlay-mode"
            checked={isOverlay}
            onCheckedChange={setIsOverlay}
          />
          <Label htmlFor="overlay-mode">Overlay Mode</Label>
        </div>

        {/* Image comparison area */}
        <div className={`relative ${isZoomed ? 'h-[600px]' : 'h-[400px]'} overflow-hidden rounded-lg bg-muted`}>
          {isOverlay ? (
            // Overlay mode with opacity control
            <div className="relative h-full w-full">
              {/* Base IC image */}
              <div className="absolute inset-0">
                <Image
                  src={icImageUrl}
                  alt="IC Image"
                  fill
                  className="object-contain"
                  data-ai-hint={imageHint}
                  unoptimized={isDataUri}
                />
              </div>
              {/* OEM reference overlay */}
              <div 
                className="absolute inset-0"
                style={{ opacity: opacity[0] / 100 }}
              >
                <Image
                  src={oemImage}
                  alt="OEM Reference"
                  fill
                  className="object-contain"
                  data-ai-hint="reference image"
                  unoptimized={isDataUri}
                />
              </div>
              {/* Labels */}
              <div className="absolute left-2 top-2 rounded bg-background/80 px-2 py-1 text-xs">
                IC Image (Base)
              </div>
              <div className="absolute right-2 top-2 rounded bg-primary/80 px-2 py-1 text-xs">
                OEM Reference ({opacity[0]}%)
              </div>
            </div>
          ) : (
            // Side-by-side mode
            <div className="grid h-full grid-cols-2 gap-2">
              <div className="relative">
                <Image
                  src={icImageUrl}
                  alt="IC Image"
                  fill
                  className="object-contain"
                  data-ai-hint={imageHint}
                  unoptimized={isDataUri}
                />
                <div className="absolute left-2 top-2 rounded bg-background/80 px-2 py-1 text-xs">
                  IC Image
                </div>
              </div>
              <div className="relative">
                <Image
                  src={oemImage}
                  alt="OEM Reference"
                  fill
                  className="object-contain"
                  data-ai-hint="reference image"
                  unoptimized={isDataUri}
                />
                <div className="absolute left-2 top-2 rounded bg-primary/80 px-2 py-1 text-xs">
                  OEM Reference
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Opacity slider - only visible in overlay mode */}
        {isOverlay && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <Label htmlFor="opacity-slider">OEM Overlay Opacity</Label>
              <span className="text-muted-foreground">{opacity[0]}%</span>
            </div>
            <Slider
              id="opacity-slider"
              min={0}
              max={100}
              step={1}
              value={opacity}
              onValueChange={setOpacity}
              className="w-full"
            />
          </div>
        )}

        {/* Comparison instructions */}
        <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
          <p className="font-medium mb-1">💡 Tip:</p>
          <p>
            {isOverlay
              ? 'Adjust the opacity slider to see differences between the IC image and OEM reference. Areas that don\'t align may indicate modifications.'
              : 'Compare markings side-by-side. Look for differences in text, logos, spacing, and overall quality.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
