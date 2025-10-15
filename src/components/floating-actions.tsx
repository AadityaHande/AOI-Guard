'use client';

import { Plus, FileText, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { useState } from 'react';

export function FloatingActions() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Secondary actions - shown when expanded - opens UPWARD */}
        <div
          className={`flex flex-col gap-3 transition-all duration-300 ${
            isExpanded ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
          }`}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg hover:shadow-primary/50 bg-primary/90 hover:bg-primary transition-all duration-200"
                onClick={() => {
                  // Trigger upload modal
                  const uploadCard = document.querySelector('[data-upload-trigger]') as HTMLElement;
                  uploadCard?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  setIsExpanded(false);
                }}
              >
                <Upload className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Quick Upload</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg hover:shadow-primary/50 bg-primary/90 hover:bg-primary transition-all duration-200"
                asChild
              >
                <Link href="/dashboard/analytics">
                  <FileText className="h-5 w-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>View Analytics</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Main FAB button - stays at bottom */}
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-xl hover:shadow-primary/60 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-110"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Plus
            className={`h-6 w-6 transition-transform duration-300 ${
              isExpanded ? 'rotate-45' : 'rotate-0'
            }`}
          />
        </Button>
      </div>
    </TooltipProvider>
  );
}
