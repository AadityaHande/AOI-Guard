'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Scan } from "@/lib/data";
import { useState } from "react";

export function RecentScansTable({ recentScans }: { recentScans: Scan[]}) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(recentScans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentScans = recentScans.slice(startIndex, endIndex);

  const handleViewClick = (e: React.MouseEvent, batchId: string) => {
    e.stopPropagation();
    router.push(`/dashboard/report/${batchId}`);
  };

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  return (
    <Card className="bg-card/60 backdrop-blur-sm shadow-cyan transition-all hover:shadow-primary/50">
        <CardHeader>
            <CardTitle className="font-headline">Recent Results</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>IC ID / Batch</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Verdict</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead>Operator</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentScans.map((scan) => (
                <TableRow
                  key={scan.batchId + scan.time}
                  className="cursor-pointer"
                  onClick={(e) => handleViewClick(e, scan.batchId)}
                >
                  <TableCell className="font-medium">{scan.batchId}</TableCell>
                  <TableCell className="text-muted-foreground">{scan.time}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "font-semibold",
                        scan.status === "Genuine" && "bg-success/20 text-success border-success/30",
                        scan.status === "Fake" && "bg-destructive/20 text-destructive border-destructive/30",
                        scan.status === "Suspicious" && "bg-suspicious/20 text-suspicious border-suspicious/30"
                      )}
                    >
                      {scan.status}
                    </Badge>
                  </TableCell>
                  <TableCell className={cn(
                    "text-right font-semibold",
                     scan.score < 90 && "text-suspicious",
                     scan.score < 70 && "text-destructive",
                     scan.score >= 90 && "text-success",
                  )}>
                    {scan.score.toFixed(2)}%
                  </TableCell>
                  <TableCell>{scan.operator}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => handleViewClick(e, scan.batchId)}
                    >
                      <Eye className="mr-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
         <CardFooter className="flex items-center justify-between pt-6">
          <div className="text-xs text-muted-foreground">
            Showing <strong>{startIndex + 1}-{Math.min(endIndex, recentScans.length)}</strong> of <strong>{recentScans.length}</strong> scans
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              disabled={currentPage === 1}
              onClick={handlePrevious}
            >
              Previous
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
  );
}
