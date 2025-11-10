import { Skeleton } from '@/components/ui/skeleton';

/**
 * Loading skeleton for root layout
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <Skeleton className="mx-auto h-4 w-32" />
      </div>
    </div>
  );
}
