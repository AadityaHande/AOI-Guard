'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, ShieldAlert, ShieldX, AlertTriangle } from "lucide-react";
import { alerts as defaultAlerts } from "@/lib/data";
import { cn } from "@/lib/utils";
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";

const alertIcons: Record<'Suspicious' | 'Fake', typeof ShieldAlert> = {
  Suspicious: ShieldAlert,
  Fake: ShieldX,
};

type AlertType = 'Suspicious' | 'Fake';

type AlertsPanelProps = {
    alerts: typeof defaultAlerts;
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  const [showAll, setShowAll] = useState(false);
  const displayAlerts = showAll ? alerts : alerts.slice(0, 4);
  const urgentCount = alerts.filter(a => a.type === 'Fake').length;

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 sticky top-20">
      {/* Glow effect for urgent alerts */}
      {urgentCount > 0 && (
        <div className="absolute inset-0 bg-destructive/5 animate-pulse pointer-events-none" />
      )}
      
      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bell className="h-5 w-5 text-primary" />
            {urgentCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-destructive text-[10px] items-center justify-center text-white font-bold">
                  {urgentCount}
                </span>
              </span>
            )}
          </div>
          <CardTitle className="text-lg">Live Alerts</CardTitle>
        </div>
        <Button 
          size="sm" 
          variant="ghost"
          onClick={() => setShowAll(!showAll)}
          className="h-8 text-xs"
        >
          {showAll ? 'Show Less' : `View All (${alerts.length})`}
        </Button>
      </CardHeader>
      
      <CardContent className="relative space-y-3">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-success/10 p-3 mb-3">
              <ShieldAlert className="h-8 w-8 text-success" />
            </div>
            <p className="text-sm font-medium text-success">All Clear!</p>
            <p className="text-xs text-muted-foreground mt-1">No alerts at this time</p>
          </div>
        ) : (
          displayAlerts.map((alert, index) => (
            <div 
              key={alert.id} 
              className="group/item relative flex items-start gap-3 rounded-lg border border-border/50 bg-background/50 p-3 transition-all duration-300 hover:border-primary/50 hover:bg-background/80 hover:shadow-md"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Alert type indicator */}
              <div className={cn(
                "mt-0.5 rounded-lg p-2 transition-all duration-300 group-hover/item:scale-110",
                alert.type === 'Suspicious' && 'bg-suspicious/20',
                alert.type === 'Fake' && 'bg-destructive/20'
              )}>
                {React.createElement(alertIcons[alert.type as AlertType], {
                  className: cn("h-4 w-4", 
                    alert.type === 'Suspicious' && 'text-suspicious',
                    alert.type === 'Fake' && 'text-destructive'
                  ),
                })}
              </div>
              
              {/* Alert content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-medium leading-tight">{alert.message}</p>
                  <Badge 
                    variant={alert.type === 'Fake' ? 'destructive' : 'secondary'}
                    className="text-[10px] shrink-0"
                  >
                    {alert.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                  <Button 
                    size="sm" 
                    variant="link" 
                    className="h-auto p-0 text-xs text-primary"
                  >
                    Review →
                  </Button>
                </div>
              </div>

              {/* Urgency indicator */}
              {alert.type === 'Fake' && (
                <div className="absolute left-0 top-0 h-full w-1 bg-destructive rounded-l-lg" />
              )}
            </div>
          ))
        )}
        
        {!showAll && alerts.length > 4 && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => setShowAll(true)}
          >
            Show {alerts.length - 4} more alerts
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
