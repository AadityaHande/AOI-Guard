'use server';

/**
 * @fileOverview Batch scan and summary flow that takes a batch of IC images,
 *  scans them, and provides a summary of the results.
 *
 * - batchScanAndSummary - A function that scans a batch of ICs and returns a summary.
 * - BatchScanAndSummaryInput - The input type for the batchScanAndSummary function.
 * - BatchScanAndSummaryOutput - The return type for the batchScanAndSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {detailedScanReport, DetailedScanReportInput, DetailedScanReportOutput} from './detailed-scan-report';

const BatchScanAndSummaryInputSchema = z.object({
  batchId: z.string().describe('The batch ID for the set of ICs being scanned.'),
  icImages: z.array(z.object({
    fileName: z.string(),
    dataUri: z.string().describe(
      "A photo of the IC, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
    ocrExtractedMarkings: z.string().describe('The OCR extracted markings from the IC.'),
    oemData: z.string().describe('The OEM data for the IC.'),
  })).describe('An array of IC images to be scanned.')
});
export type BatchScanAndSummaryInput = z.infer<typeof BatchScanAndSummaryInputSchema>;


const IndividualScanResultSchema = z.object({
  fileName: z.string(),
  verdict: z.enum(['Genuine', 'Fake', 'Suspicious']),
  authenticityScore: z.number(),
  batchId: z.string(),
});

const BatchScanAndSummaryOutputSchema = z.object({
  totalScanned: z.number().describe('Total number of ICs scanned in the batch.'),
  genuineCount: z.number().describe('Number of genuine ICs found.'),
  fakeCount: z.number().describe('Number of fake ICs found.'),
  suspiciousCount: z.number().describe('Number of suspicious ICs found.'),
  averageAuthenticityScore: z.number().describe('The average authenticity score for the batch.'),
  results: z.array(IndividualScanResultSchema).describe('Individual results for each scanned IC.'),
});
export type BatchScanAndSummaryOutput = z.infer<typeof BatchScanAndSummaryOutputSchema>;


export async function batchScanAndSummary(input: BatchScanAndSummaryInput): Promise<BatchScanAndSummaryOutput> {
  return batchScanAndSummaryFlow(input);
}


const batchScanAndSummaryFlow = ai.defineFlow(
  {
    name: 'batchScanAndSummaryFlow',
    inputSchema: BatchScanAndSummaryInputSchema,
    outputSchema: BatchScanAndSummaryOutputSchema,
  },
  async (input) => {
    const scanPromises: Promise<DetailedScanReportOutput & { fileName: string }>[] = input.icImages.map(async (image) => {
      const detailedScanInput: DetailedScanReportInput = {
        icImageUri: image.dataUri,
        ocrExtractedMarkings: image.ocrExtractedMarkings,
        oemData: image.oemData,
        batchId: input.batchId,
      };
      const report = await detailedScanReport(detailedScanInput);
      return { ...report, fileName: image.fileName };
    });

    const results = await Promise.all(scanPromises);

    let genuineCount = 0;
    let fakeCount = 0;
    let suspiciousCount = 0;
    let totalScore = 0;

    const individualResults: z.infer<typeof IndividualScanResultSchema>[] = results.map(result => {
      if (result.verdict === 'Genuine') genuineCount++;
      if (result.verdict === 'Fake') fakeCount++;
      if (result.verdict === 'Suspicious') suspiciousCount++;
      totalScore += result.authenticityScore;

      return {
        fileName: result.fileName,
        verdict: result.verdict,
        authenticityScore: result.authenticityScore,
        batchId: input.batchId,
      }
    });

    const totalScanned = input.icImages.length;
    const averageAuthenticityScore = totalScanned > 0 ? totalScore / totalScanned : 0;

    return {
      totalScanned,
      genuineCount,
      fakeCount,
      suspiciousCount,
      averageAuthenticityScore,
      results: individualResults,
    };
  }
);
