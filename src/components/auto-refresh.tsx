'use client';

import { useEffect, useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AutoRefreshProps {
  onRefresh: () => void;
  interval?: number; // in milliseconds
  isActive?: boolean;
}

export function AutoRefresh({ onRefresh, interval = 30000, isActive = true }: AutoRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [countdown, setCountdown] = useState(interval / 1000);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await onRefresh();
    setLastRefresh(new Date());
    setCountdown(interval / 1000);
    setIsRefreshing(false);
  }, [onRefresh, interval]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      handleRefresh();
    }, interval);

    return () => clearInterval(timer);
  }, [isActive, interval, handleRefresh]);

  useEffect(() => {
    if (!isActive) return;

    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) return interval / 1000;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, [isActive, interval]);

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-8 w-8"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Manual refresh</p>
          </TooltipContent>
        </Tooltip>
        <span className="font-mono text-xs">
          {isActive ? `Next: ${countdown}s` : 'Paused'}
        </span>
      </div>
    </TooltipProvider>
  );
}
