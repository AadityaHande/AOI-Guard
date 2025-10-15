
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Play } from "lucide-react";

const faqItems = [
  {
    question: "How do I upload a batch for scanning?",
    answer:
      "Navigate to the main dashboard. Use the 'Upload Batch' card to either drag and drop your IC images or click the browse button to select them from your computer. Once files are selected, click 'Start Scan' to begin the analysis.",
  },
  {
    question: "What do the authenticity scores and verdicts mean?",
    answer:
      "The authenticity score (0-100%) represents our AI's confidence in the component's legitimacy. The verdict simplifies this: 'Genuine' (high score, >90%), 'Fake' (low score, <70%), and 'Suspicious' (mid-range score, 70-90%) which requires manual review.",
  },
  {
    question: "How is the OEM data fetched and kept up-to-date?",
    answer:
      "OEM data is sourced from official datasheets and manufacturer websites. It is managed by administrators on the 'OEM Data' page. They can add new data manually or use the 'Auto-Fetch' feature to trigger a backend scraper that automatically updates our database.",
  },
  {
    question: "What should I do if a component is marked 'Suspicious'?",
    answer:
      "A 'Suspicious' verdict means the AI detected anomalies but couldn't make a definitive conclusion. You should navigate to the detailed report for that IC, carefully compare the OCR markings with the OEM data, and use your expertise to make a final judgment. You can then use the Operator Actions panel to approve or flag the result.",
  },
];

export default function HelpPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Help & Documentation</h1>
        <p className="text-muted-foreground">
          Your guide to using the AOI-Guard system effectively.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/60 backdrop-blur-sm shadow-cyan">
                <CardHeader>
                    <CardTitle>How AOI-Guard Works</CardTitle>
                    <CardDescription>3-minute demo showcasing our AI-powered IC authenticity verification</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 via-background to-primary/10 border border-primary/20 group cursor-pointer hover:border-primary/40 transition-all">
                        {/* Video placeholder with play button */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="relative">
                                {/* Play button circle */}
                                <div className="w-20 h-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-lg shadow-primary/50">
                                    <Play className="h-10 w-10 text-primary-foreground ml-1" fill="currentColor" />
                                </div>
                                {/* Pulse ring animation */}
                                <div className="absolute inset-0 w-20 h-20 rounded-full bg-primary/30 animate-ping"></div>
                            </div>
                            <p className="mt-6 text-lg font-semibold text-foreground">Watch Demo Video</p>
                            <p className="text-sm text-muted-foreground">Click to play • 3:45 mins</p>
                        </div>
                        
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-4 left-4 w-32 h-32 border-2 border-primary/30 rounded-lg rotate-12"></div>
                            <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-primary/30 rounded-full"></div>
                        </div>
                    </div>
                    <p className="mt-4 text-muted-foreground text-sm">
                        Watch our concise demonstration of the complete workflow: from uploading IC images through AI-powered analysis to generating detailed authenticity reports with actionable insights.
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm shadow-cyan">
                <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1">
            <Card className="bg-card/60 backdrop-blur-sm shadow-cyan sticky top-20">
                <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                    <CardDescription>
                        Can't find the answer? Reach out to our engineering team.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Button className="w-full">
                        <Mail className="mr-2 h-4 w-4" />
                        Email Support
                    </Button>
                    <p className="mt-4 text-xs text-center text-muted-foreground">
                        Typical response time: 2-3 hours.
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
