'use client';

import { useEffect } from 'react';
import { ErrorFallback } from '@/components/error-boundary';

/**
 * Global Error Component for Next.js App Router
 * Handles errors in client components
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Page error:', error);
    }

    // Log to external error tracking service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to error tracking service (e.g., Sentry)
      // Sentry.captureException(error);
    }
  }, [error]);

  return <ErrorFallback error={error} reset={reset} />;
}
