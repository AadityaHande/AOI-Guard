'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';

export function LiveClock() {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
        <Clock className="h-4 w-4 text-primary" />
        <time className="transition-opacity duration-300">
          Loading...
        </time>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
      <Clock className="h-4 w-4 text-primary" />
      <time suppressHydrationWarning className="transition-opacity duration-300">
        {format(time, 'MMM dd, yyyy | HH:mm:ss')}
      </time>
    </div>
  );
}
