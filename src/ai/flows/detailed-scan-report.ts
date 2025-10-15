'use server';

/**
 * @fileOverview Detailed scan report flow that provides an interactive report
 *  with an IC image preview, OCR-extracted markings, side-by-side OEM data,
 *  authenticity score, and LLM reasoning.
 *
 * - detailedScanReport - A function that generates the detailed scan report.
 * - DetailedScanReportInput - The input type for the detailedScanReport function.
 * - DetailedScanReportOutput - The return type for the detailedScanReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetailedScanReportInputSchema = z.object({
  icImageUri: z
    .string()
    .describe(
      "A photo of the IC, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  ocrExtractedMarkings: z.string().describe('The OCR extracted markings from the IC.'),
  oemData: z.string().describe('The OEM data for the IC.'),
  batchId: z.string().describe('The batch ID of the scanned IC.'),
});
export type DetailedScanReportInput = z.infer<typeof DetailedScanReportInputSchema>;

const DetailedScanReportOutputSchema = z.object({
  authenticityScore: z.number().describe('The authenticity score of the IC.'),
  verdict: z.enum(['Genuine', 'Fake', 'Suspicious']).describe('The verdict of the IC.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the authenticity verdict, incorporating information from the IC markings and OEM data.'),
  flaggedMarkings: z.array(z.string()).describe('List of specific markings flagged by the LLM as relevant to the verdict.'),
  flaggedOemData: z.array(z.string()).describe('List of specific OEM data flagged by the LLM as relevant to the verdict.'),
});
export type DetailedScanReportOutput = z.infer<typeof DetailedScanReportOutputSchema>;

export async function detailedScanReport(input: DetailedScanReportInput): Promise<DetailedScanReportOutput> {
  return detailedScanReportFlow(input);
}

const detailedScanReportPrompt = ai.definePrompt({
  name: 'detailedScanReportPrompt',
  input: {schema: DetailedScanReportInputSchema},
  output: {schema: DetailedScanReportOutputSchema},
  prompt: `You are an expert in identifying counterfeit integrated circuits (ICs).
  You are provided with the following information:

  IC Image: {{media url=icImageUri}}
  OCR Extracted Markings: {{{ocrExtractedMarkings}}}
  OEM Data: {{{oemData}}}

  Analyze the provided information and determine the authenticity of the IC.
  Provide an authenticity score (0-100), a verdict (Genuine, Fake, or Suspicious), and the reasoning behind your verdict.

  In your reasoning, explicitly mention which OCR extracted markings and OEM data points contributed to your decision.
  Also, identify and list the specific markings (from OCR extracted markings) and OEM data points that you considered most relevant in separate fields.  If there were no markings, or OEM data points, indicate this explicitly.  Be concise and specific.

  Ensure the output is well-structured and easy to understand.
  `,
});

const detailedScanReportFlow = ai.defineFlow(
  {
    name: 'detailedScanReportFlow',
    inputSchema: DetailedScanReportInputSchema,
    outputSchema: DetailedScanReportOutputSchema,
  },
  async input => {
    const {output} = await detailedScanReportPrompt(input);
    return output!;
  }
);
