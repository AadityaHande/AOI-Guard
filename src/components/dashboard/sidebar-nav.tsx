
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BarChart3,
  Database,
  Cog,
  LogOut,
  HelpCircle,
  Zap,
  ArrowLeftRight,
  FileText,
  Scan,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", badge: null },
  { href: "/detect", icon: Scan, label: "IC Detection", badge: "Featured" },
  { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics", badge: null },
  { href: "/dashboard/tools", icon: ArrowLeftRight, label: "Tools", badge: "New" },
  { href: "/dashboard/audit", icon: FileText, label: "Audit Log", badge: "New" },
  { href: "/dashboard/oem-data", icon: Database, label: "OEM Data", badge: "Admin" },
  { href: "/dashboard/settings", icon: Cog, label: "Settings", badge: null },
  { href: "/dashboard/help", icon: HelpCircle, label: "Help", badge: null },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="border-b border-border/50 p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <Logo className="h-10 w-10 text-primary" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold tracking-tight text-xl font-headline text-primary whitespace-nowrap leading-none">
              AOI-Guard
            </h3>
            <span className="text-[10px] text-muted-foreground/80 whitespace-nowrap">v1.0 • Active</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-3">
        <SidebarMenu className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isSettings = item.href === "/dashboard/settings";
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.label}
                  className={`group relative overflow-hidden transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-semibold shadow-lg shadow-primary/10' 
                      : 'hover:bg-accent/50'
                  }`}
                >
                  <Link href={item.href}>
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r" />
                    )}
                    
                    <div className={`flex items-center gap-3 w-full ${isActive ? 'ml-1' : ''}`}>
                      <item.icon className={`h-5 w-5 transition-transform ${isSettings ? 'text-muted-foreground group-hover:text-primary' : 'group-hover:scale-110'} ${isActive ? 'text-primary' : ''}`} />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          {item.badge}
                        </Badge>
                      )}
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        {/* Quick Stats */}
        <div className="mt-6 rounded-lg border border-border/50 bg-card/50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold">System Status</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Uptime</span>
              <span className="text-success">99.9%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active Scans</span>
              <span className="text-foreground font-medium">0</span>
            </div>
          </div>
        </div>
      </SidebarContent>
      
      <SidebarFooter className="p-3 border-t border-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              tooltip="Logout"
              className="group hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <Link href="/">
                <LogOut className="group-hover:rotate-12 transition-transform" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
