import Link from 'next/link';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Global Not Found Page
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-muted p-3">
              <AlertTriangle className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl">404 - Page Not Found</CardTitle>
              <CardDescription className="mt-1">
                The page you're looking for doesn't exist.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The page might have been moved, deleted, or never existed. Check the URL or return to the homepage.
          </p>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard" className="w-full">
            <Button variant="default" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
