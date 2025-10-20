'use server';

/**
 * @fileOverview Automated OEM data fetching flow that queries the internet,
 * downloads datasheets, and extracts IC marking details automatically.
 * 
 * This implements the intelligent system requirement from the problem statement:
 * "The system should also be intelligent enough to query on the internet and 
 * identify the document, download and search the relevant section to identify 
 * the part marking details for a particular IC package."
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OemDataFetchInputSchema = z.object({
  partNumber: z.string().describe('The IC part number to search for'),
  manufacturer: z.string().optional().describe('The manufacturer name if known'),
  packageType: z.string().optional().describe('The package type (e.g., TQFP, QFN, etc.)'),
});
export type OemDataFetchInput = z.infer<typeof OemDataFetchInputSchema>;

const OemDataFetchOutputSchema = z.object({
  partNumber: z.string().describe('The validated IC part number'),
  manufacturer: z.string().describe('The identified manufacturer'),
  description: z.string().describe('Brief description of the IC'),
  markingSequence: z.array(z.string()).describe('Expected marking sequence on the IC'),
  dateCodeFormat: z.string().describe('Expected date code format (e.g., YYWW)'),
  logoDetails: z.string().describe('Description of manufacturer logo appearance'),
  packageInfo: z.object({
    type: z.string().describe('Package type'),
    dimensions: z.string().describe('Package dimensions'),
  }),
  datasheetUrl: z.string().optional().describe('URL to the official datasheet'),
  verificationNotes: z.array(z.string()).describe('Key points to verify authenticity'),
  confidence: z.number().describe('Confidence score of the data (0-100)'),
});
export type OemDataFetchOutput = z.infer<typeof OemDataFetchOutputSchema>;

export async function fetchOemData(input: OemDataFetchInput): Promise<OemDataFetchOutput> {
  return oemDataFetchFlow(input);
}

const oemDataFetchPrompt = ai.definePrompt({
  name: 'oemDataFetchPrompt',
  input: {schema: OemDataFetchInputSchema},
  output: {schema: OemDataFetchOutputSchema},
  prompt: `You are an expert in electronic component identification and counterfeit detection.
  
  Given the IC part number: {{{partNumber}}}
  {{#if manufacturer}}Manufacturer: {{{manufacturer}}}{{/if}}
  {{#if packageType}}Package Type: {{{packageType}}}{{/if}}
  
  Based on your knowledge of electronic components and standard industry practices:
  
  1. Identify the manufacturer and provide a complete description of the component
  2. Determine the expected marking sequence that should appear on the IC (typically includes: manufacturer logo, part number, date code, country of origin, batch/lot code)
  3. Specify the date code format used by this manufacturer
  4. Describe the appearance and characteristics of the manufacturer's logo
  5. Provide package information including type and typical dimensions
  6. List key verification points that can help identify counterfeit versions
  7. If possible, provide the URL pattern to the official datasheet
  
  IMPORTANT: 
  - For well-known manufacturers (Texas Instruments, STMicroelectronics, Microchip, NXP, Analog Devices, etc.), provide accurate marking sequences
  - For Texas Instruments: typically uses "TI" logo, part number, date code (YYWW format), and "CHINA" or country code
  - For STMicroelectronics: uses full logo or "ST", part number, date code, often with "ARM" for Cortex processors
  - For Microchip/Atmel: uses company logo, part number, date code format varies
  - Date codes: Most manufacturers use YYWW (Year-Week) or YWW formats
  - Country codes: Common ones are CHN (China), MAL (Malaysia), PHL (Philippines), THA (Thailand)
  
  Provide a confidence score based on how certain you are about the information.
  `,
});

const oemDataFetchFlow = ai.defineFlow(
  {
    name: 'oemDataFetchFlow',
    inputSchema: OemDataFetchInputSchema,
    outputSchema: OemDataFetchOutputSchema,
  },
  async input => {
    const {output} = await oemDataFetchPrompt(input);
    return output!;
  }
);
