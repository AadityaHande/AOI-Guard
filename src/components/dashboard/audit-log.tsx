'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileText, 
  Upload, 
  Download, 
  Settings, 
  User, 
  Shield, 
  RefreshCw,
  Search,
  Filter,
  Calendar
} from 'lucide-react';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  category: 'scan' | 'upload' | 'export' | 'settings' | 'auth' | 'model';
  details: string;
  status: 'success' | 'failed' | 'warning';
  ipAddress?: string;
}

const mockLogs: AuditLogEntry[] = [
  {
    id: 'log-001',
    timestamp: '2024-01-17 14:32:15',
    user: 'John Doe',
    action: 'Batch Scan Completed',
    category: 'scan',
    details: 'Scanned 150 IC images in BATCH-2024-001',
    status: 'success',
    ipAddress: '192.168.1.100',
  },
  {
    id: 'log-002',
    timestamp: '2024-01-17 14:15:42',
    user: 'Jane Smith',
    action: 'OEM Data Upload',
    category: 'upload',
    details: 'Uploaded 25 reference images for STM32F407',
    status: 'success',
    ipAddress: '192.168.1.101',
  },
  {
    id: 'log-003',
    timestamp: '2024-01-17 13:48:23',
    user: 'Admin User',
    action: 'Model Retraining',
    category: 'model',
    details: 'Triggered model retraining with 500 new samples',
    status: 'success',
    ipAddress: '192.168.1.1',
  },
  {
    id: 'log-004',
    timestamp: '2024-01-17 13:22:11',
    user: 'John Doe',
    action: 'Export Analytics',
    category: 'export',
    details: 'Exported analytics data to CSV format',
    status: 'success',
    ipAddress: '192.168.1.100',
  },
  {
    id: 'log-005',
    timestamp: '2024-01-17 12:55:37',
    user: 'Unknown',
    action: 'Failed Login Attempt',
    category: 'auth',
    details: 'Invalid credentials for user "admin"',
    status: 'failed',
    ipAddress: '203.0.113.45',
  },
  {
    id: 'log-006',
    timestamp: '2024-01-17 12:30:18',
    user: 'Admin User',
    action: 'Settings Updated',
    category: 'settings',
    details: 'Changed confidence threshold to 85%',
    status: 'success',
    ipAddress: '192.168.1.1',
  },
  {
    id: 'log-007',
    timestamp: '2024-01-17 11:45:52',
    user: 'Jane Smith',
    action: 'Batch Scan Completed',
    category: 'scan',
    details: 'Scanned 200 IC images in BATCH-2024-002',
    status: 'success',
    ipAddress: '192.168.1.101',
  },
  {
    id: 'log-008',
    timestamp: '2024-01-17 11:12:33',
    user: 'John Doe',
    action: 'OEM Data Upload',
    category: 'upload',
    details: 'Upload failed due to invalid file format',
    status: 'failed',
    ipAddress: '192.168.1.100',
  },
];

const categoryIcons = {
  scan: FileText,
  upload: Upload,
  export: Download,
  settings: Settings,
  auth: Shield,
  model: RefreshCw,
};

const categoryColors = {
  scan: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  upload: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  export: 'bg-green-500/10 text-green-500 border-green-500/20',
  settings: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  auth: 'bg-red-500/10 text-red-500 border-red-500/20',
  model: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
};

const statusColors = {
  success: 'bg-green-500/10 text-green-500 border-green-500/20',
  failed: 'bg-red-500/10 text-red-500 border-red-500/20',
  warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
};

export function AuditLog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
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
              Comprehensive system activity tracking and monitoring
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
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-background/50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="scan">Scans</SelectItem>
              <SelectItem value="upload">Uploads</SelectItem>
              <SelectItem value="export">Exports</SelectItem>
              <SelectItem value="settings">Settings</SelectItem>
              <SelectItem value="auth">Authentication</SelectItem>
              <SelectItem value="model">Model</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-background/50">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Log Entries */}
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-3">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No logs found matching your criteria</p>
              </div>
            ) : (
              filteredLogs.map((log) => {
                const Icon = categoryIcons[log.category];
                return (
                  <div
                    key={log.id}
                    className="p-4 rounded-lg border border-border/40 bg-background/30 hover:bg-background/50 transition-colors duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${categoryColors[log.category]}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm">{log.action}</h4>
                          <Badge variant="outline" className={`${statusColors[log.status]} text-xs`}>
                            {log.status}
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
              <div className="text-2xl font-bold text-primary">{mockLogs.length}</div>
              <div className="text-xs text-muted-foreground">Total Entries</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">
                {mockLogs.filter(l => l.status === 'success').length}
              </div>
              <div className="text-xs text-muted-foreground">Successful</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-500">
                {mockLogs.filter(l => l.status === 'failed').length}
              </div>
              <div className="text-xs text-muted-foreground">Failed</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
