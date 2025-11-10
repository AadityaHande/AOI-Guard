'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileText, 
  Download, 
  Search,
  User,
  Calendar,
  Shield
} from 'lucide-react';
import { getStoredScans, type StoredScan } from '@/lib/scan-storage';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  category: 'scan';
  details: string;
  status: 'success' | 'warning' | 'failed';
  ipAddress?: string;
  verdict?: string;
}

const categoryColors = {
  scan: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
};

const statusColors = {
  success: 'bg-green-500/10 text-green-500 border-green-500/20',
  failed: 'bg-red-500/10 text-red-500 border-red-500/20',
  warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
};

export function AuditLog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);

  useEffect(() => {
    // Load real scan data from localStorage
    const scans = getStoredScans();
    
    const auditLogs: AuditLogEntry[] = scans.map((scan: StoredScan) => {
      const date = new Date(scan.timestamp);
      const status = scan.verdict === 'Fake' ? 'failed' : scan.verdict === 'Suspicious' ? 'warning' : 'success';
      
      let actionText = 'IC Scan Completed';
      let details = `Scanned IC chip in batch ${scan.batchId}`;
      
      if (scan.verdict === 'Fake') {
        details = `COUNTERFEIT DETECTED in ${scan.batchId} - ${scan.partNumber || 'Unknown part'}. Score: ${scan.score}%`;
      } else if (scan.verdict === 'Suspicious') {
        details = `Suspicious markings detected in ${scan.batchId} - ${scan.partNumber || 'Unknown part'}. Score: ${scan.score}%`;
      } else {
        details = `Genuine IC verified in ${scan.batchId} - ${scan.partNumber || 'Unknown part'}. Score: ${scan.score}%`;
      }
      
      return {
        id: scan.batchId,
        timestamp: date.toLocaleString('en-US', { 
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }),
        user: scan.operator,
        action: actionText,
        category: 'scan' as const,
        details,
        status,
        verdict: scan.verdict,
        ipAddress: '192.168.1.100', // Demo IP
      };
    });
    
    setLogs(auditLogs);
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <Card className="glass-card border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Audit Log
            </CardTitle>
            <CardDescription>
              Real-time scan activity tracking and monitoring
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background/50"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-background/50">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Genuine</SelectItem>
              <SelectItem value="warning">Suspicious</SelectItem>
              <SelectItem value="failed">Fake</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Log Entries */}
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-3">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="font-medium mb-1">No scan activity yet</p>
                <p className="text-sm">Start scanning IC chips to see audit logs here</p>
              </div>
            ) : (
              filteredLogs.map((log) => {
                return (
                  <div
                    key={log.id}
                    className="p-4 rounded-lg border border-border/40 bg-background/30 hover:bg-background/50 transition-colors duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${categoryColors[log.category]}`}>
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="font-semibold text-sm">{log.action}</h4>
                          <Badge variant="outline" className={`${statusColors[log.status]} text-xs`}>
                            {log.verdict}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {log.details}
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {log.user}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {log.timestamp}
                          </span>
                          {log.ipAddress && (
                            <span className="flex items-center gap-1">
                              <Shield className="h-3 w-3" />
                              {log.ipAddress}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>

        {/* Stats Footer */}
        <div className="pt-4 border-t border-border/40">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{logs.length}</div>
              <div className="text-xs text-muted-foreground">Total Scans</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">
                {logs.filter(l => l.status === 'success').length}
              </div>
              <div className="text-xs text-muted-foreground">Genuine</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-500">
                {logs.filter(l => l.status === 'failed').length}
              </div>
              <div className="text-xs text-muted-foreground">Fake</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
