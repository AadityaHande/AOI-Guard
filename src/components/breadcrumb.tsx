'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumb() {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      
      // Format the label
      let label = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Special cases
      if (path === 'oem-data') label = 'OEM Data';
      if (path === 'dashboard' && index === 0) label = 'Dashboard';
      
      breadcrumbs.push({
        label,
        href: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <Fragment key={crumb.href}>
              <li>
                {isLast ? (
                  <span className="font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-lg">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-muted-foreground transition-colors hover:text-primary hover:underline underline-offset-4 px-2 py-1"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
              {!isLast && (
                <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
