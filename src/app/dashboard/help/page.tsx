
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Image from "next/image";

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
                </CardHeader>
                <CardContent>
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                        <Image 
                            src="https://picsum.photos/seed/workflow/1280/720"
                            alt="AOI-Guard Workflow"
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint="flowchart diagram"
                        />
                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <p className="text-lg font-semibold text-white">Video / GIF Placeholder</p>
                        </div>
                    </div>
                    <p className="mt-4 text-muted-foreground">
                        This short guide demonstrates the end-to-end process from uploading an IC image to receiving a detailed authenticity report. It covers the automated OCR, AI analysis, and data comparison steps.
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
