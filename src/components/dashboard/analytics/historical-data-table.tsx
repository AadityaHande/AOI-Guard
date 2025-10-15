import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileDown } from "lucide-react";
import { Scan } from "@/lib/data";

export function HistoricalDataTable({ scanHistory }: { scanHistory: Scan[]}) {
    return (
        <Card className="bg-card/60 backdrop-blur-sm shadow-cyan">
            <CardHeader className="flex-row items-center justify-between">
                <div>
                    <CardTitle>Scan History</CardTitle>
                    <CardDescription>Comprehensive log of all past scans.</CardDescription>
                </div>
                <Button variant="outline">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export Report
                </Button>
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
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {scanHistory.map((scan) => (
                        <TableRow key={scan.batchId + scan.time}>
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
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="justify-end pt-6">
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" disabled>Previous</Button>
                    <Button size="sm" variant="outline">Next</Button>
                </div>
            </CardFooter>
        </Card>
    )
}
