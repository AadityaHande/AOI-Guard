import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react";

export function OperatorActions() {
    return (
        <Card className="bg-card/60 backdrop-blur-sm shadow-cyan">
             <CardHeader>
               <CardTitle className="flex items-center gap-2">
                 <MessageSquare className="h-5 w-5" />
                 Operator Notes & Actions
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
              <Textarea placeholder="Add an operator note..." className="min-h-[100px]" />
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                  <ThumbsDown className="mr-2 h-4 w-4" /> Flag
                </Button>
                <Button variant="outline" className="border-success text-success hover:bg-success hover:text-success-foreground">
                  <ThumbsUp className="mr-2 h-4 w-4" /> Approve
                </Button>
              </div>
             </CardContent>
           </Card>
    )
}
