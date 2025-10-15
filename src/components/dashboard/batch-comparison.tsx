'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeftRight, TrendingUp, TrendingDown, Minus, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface BatchData {
  id: string;
  timestamp: string;
  totalScans: number;
  genuine: number;
  fake: number;
  suspicious: number;
  avgConfidence: number;
  operator: string;
}

const mockBatches: BatchData[] = [
  {
    id: 'BATCH-2024-001',
    timestamp: '2024-01-15 14:30',
    totalScans: 150,
    genuine: 142,
    fake: 5,
    suspicious: 3,
    avgConfidence: 94.5,
    operator: 'John Doe',
  },
  {
    id: 'BATCH-2024-002',
    timestamp: '2024-01-16 09:15',
    totalScans: 200,
    genuine: 185,
    fake: 10,
    suspicious: 5,
    avgConfidence: 92.8,
    operator: 'Jane Smith',
  },
  {
    id: 'BATCH-2024-003',
    timestamp: '2024-01-17 11:45',
    totalScans: 175,
    genuine: 168,
    fake: 4,
    suspicious: 3,
    avgConfidence: 95.2,
    operator: 'John Doe',
  },
];

export function BatchComparison() {
  const [batch1, setBatch1] = useState<string>(mockBatches[0].id);
  const [batch2, setBatch2] = useState<string>(mockBatches[1].id);

  const batch1Data = mockBatches.find(b => b.id === batch1);
  const batch2Data = mockBatches.find(b => b.id === batch2);

  const getDifference = (val1: number, val2: number) => {
    const diff = val1 - val2;
    if (diff > 0) return { value: `+${diff}`, trend: 'up', color: 'text-green-500' };
    if (diff < 0) return { value: `${diff}`, trend: 'down', color: 'text-red-500' };
    return { value: '0', trend: 'same', color: 'text-muted-foreground' };
  };

  const getPercentageDiff = (val1: number, val2: number) => {
    const diff = ((val1 - val2) / val2) * 100;
    if (diff > 0) return { value: `+${diff.toFixed(1)}%`, trend: 'up', color: 'text-green-500' };
    if (diff < 0) return { value: `${diff.toFixed(1)}%`, trend: 'down', color: 'text-red-500' };
    return { value: '0%', trend: 'same', color: 'text-muted-foreground' };
  };

  if (!batch1Data || !batch2Data) return null;

  const metrics = [
    {
      label: 'Total Scans',
      batch1: batch1Data.totalScans,
      batch2: batch2Data.totalScans,
      diff: getDifference(batch1Data.totalScans, batch2Data.totalScans),
    },
    {
      label: 'Genuine',
      batch1: batch1Data.genuine,
      batch2: batch2Data.genuine,
      diff: getDifference(batch1Data.genuine, batch2Data.genuine),
      icon: CheckCircle2,
      iconColor: 'text-green-500',
    },
    {
      label: 'Fake',
      batch1: batch1Data.fake,
      batch2: batch2Data.fake,
      diff: getDifference(batch1Data.fake, batch2Data.fake),
      icon: XCircle,
      iconColor: 'text-red-500',
    },
    {
      label: 'Suspicious',
      batch1: batch1Data.suspicious,
      batch2: batch2Data.suspicious,
      diff: getDifference(batch1Data.suspicious, batch2Data.suspicious),
      icon: AlertCircle,
      iconColor: 'text-yellow-500',
    },
    {
      label: 'Avg Confidence',
      batch1: `${batch1Data.avgConfidence}%`,
      batch2: `${batch2Data.avgConfidence}%`,
      diff: getPercentageDiff(batch1Data.avgConfidence, batch2Data.avgConfidence),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Batch Selectors */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5 text-primary" />
            Batch Comparison Tool
          </CardTitle>
          <CardDescription>
            Compare two batches side-by-side to identify trends and anomalies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Batch 1</label>
              <Select value={batch1} onValueChange={setBatch1}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockBatches.map((batch) => (
                    <SelectItem key={batch.id} value={batch.id}>
                      {batch.id} - {batch.timestamp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Batch 2</label>
              <Select value={batch2} onValueChange={setBatch2}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockBatches.map((batch) => (
                    <SelectItem key={batch.id} value={batch.id}>
                      {batch.id} - {batch.timestamp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle>Comparison Metrics</CardTitle>
          <CardDescription>
            Side-by-side comparison of key performance indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/40 hover:bg-transparent">
                <TableHead className="font-semibold">Metric</TableHead>
                <TableHead className="text-center font-semibold">{batch1Data.id}</TableHead>
                <TableHead className="text-center font-semibold">{batch2Data.id}</TableHead>
                <TableHead className="text-center font-semibold">Difference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.map((metric) => (
                <TableRow key={metric.label} className="border-border/40">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {metric.icon && <metric.icon className={`h-4 w-4 ${metric.iconColor}`} />}
                      {metric.label}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="bg-background/50">
                      {metric.batch1}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="bg-background/50">
                      {metric.batch2}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className={`flex items-center justify-center gap-1 font-semibold ${metric.diff.color}`}>
                      {metric.diff.trend === 'up' && <TrendingUp className="h-4 w-4" />}
                      {metric.diff.trend === 'down' && <TrendingDown className="h-4 w-4" />}
                      {metric.diff.trend === 'same' && <Minus className="h-4 w-4" />}
                      <span>{metric.diff.value}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Batch Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">{batch1Data.id}</CardTitle>
            <CardDescription>{batch1Data.timestamp}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Operator:</span>
              <span className="font-medium">{batch1Data.operator}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Scans:</span>
              <span className="font-medium">{batch1Data.totalScans}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Success Rate:</span>
              <span className="font-medium text-green-500">
                {((batch1Data.genuine / batch1Data.totalScans) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fake Rate:</span>
              <span className="font-medium text-red-500">
                {((batch1Data.fake / batch1Data.totalScans) * 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">{batch2Data.id}</CardTitle>
            <CardDescription>{batch2Data.timestamp}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Operator:</span>
              <span className="font-medium">{batch2Data.operator}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Scans:</span>
              <span className="font-medium">{batch2Data.totalScans}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Success Rate:</span>
              <span className="font-medium text-green-500">
                {((batch2Data.genuine / batch2Data.totalScans) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fake Rate:</span>
              <span className="font-medium text-red-500">
                {((batch2Data.fake / batch2Data.totalScans) * 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <Button variant="outline" className="gap-2">
          Export Comparison
        </Button>
        <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80">
          Generate Report
        </Button>
      </div>
    </div>
  );
}
