import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { UserNav } from "@/components/dashboard/user-nav";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NotificationBell } from "@/components/notification-bell";
import { LiveClock } from "@/components/live-clock";
import { Breadcrumb } from "@/components/breadcrumb";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPalette } from "@/components/command-palette";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarNav />
        </Sidebar>
        <SidebarInset className="flex flex-1 flex-col">
          <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-4 border-b border-border/50 bg-background/95 px-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sm:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="ml-auto flex items-center gap-3">
              <CommandPalette />
              <LiveClock />
              <div className="h-6 w-px bg-border/50" />
              <ThemeToggle />
              <NotificationBell />
              <UserNav />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="mb-6">
              <Breadcrumb />
            </div>
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
