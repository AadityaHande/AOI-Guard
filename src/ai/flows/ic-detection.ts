'use server';

/**
 * Real IC detection using Gemini Vision API
 * Extracts text from IC images and validates authenticity
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ICDetectionInputSchema = z.object({
  imageDataUri: z.string().describe('IC image as data URI (data:image/jpeg;base64,...)'),
  partNumberHint: z.string().optional().describe('Expected part number if known'),
});
export type ICDetectionInput = z.infer<typeof ICDetectionInputSchema>;

const ICDetectionOutputSchema = z.object({
  ocrMarkings: z.string().describe('All text extracted from the IC image'),
  partNumber: z.string().describe('Identified IC part number'),
  manufacturer: z.string().describe('Identified manufacturer'),
  dateCode: z.string().optional().describe('Date code if visible'),
  countryCode: z.string().optional().describe('Country of origin code'),
  verdict: z.enum(['Genuine', 'Fake', 'Suspicious']).describe('Authenticity verdict'),
  authenticityScore: z.number().describe('Confidence score 0-100'),
  reasoning: z.string().describe('Detailed explanation of the verdict'),
  flaggedMarkings: z.array(z.string()).describe('Suspicious or critical markings'),
  verificationPoints: z.array(z.string()).describe('Key observations'),
});
export type ICDetectionOutput = z.infer<typeof ICDetectionOutputSchema>;

export async function detectICAuthenticity(input: ICDetectionInput): Promise<ICDetectionOutput> {
  return icDetectionFlow(input);
}

const icDetectionPrompt = ai.definePrompt({
  name: 'icDetectionPrompt',
  input: {schema: ICDetectionInputSchema},
  output: {schema: ICDetectionOutputSchema},
  prompt: `You are an expert in integrated circuit (IC) authenticity verification and counterfeit detection.

Analyze this IC chip image: {{media url=imageDataUri}}

{{#if partNumberHint}}Expected part number: {{{partNumberHint}}}{{/if}}

Perform OCR and extract ALL visible text/markings on the IC, including:
1. Manufacturer logo or name
2. Part number
3. Date code (usually YYWW format: Year-Week)
4. Country code (CHN, MAL, PHL, THA, etc.)
5. Lot/batch codes
6. Any other markings

Then evaluate authenticity by checking:

**Common Counterfeit Indicators:**
- Incorrect logo (e.g., "Tl" instead of "TI" for Texas Instruments)
- Wrong font style or inconsistent kerning
- Misaligned text or poor printing quality
- Invalid date code format
- Surface irregularities (blacktopping, sanding marks)
- Incorrect package markings
- Missing or extra characters

**Genuine IC Characteristics:**
- Sharp, clean logo etching
- Consistent font throughout
- Valid date code format (manufacturer-specific)
- Proper country code
- High-quality surface finish
- Correct package type markings

**Manufacturer-Specific Standards:**
- **Texas Instruments (TI)**: "TI" logo, part number, YYWW date code, country
- **STMicroelectronics**: "ST" or full logo, part number, date code, sometimes "ARM"
- **Microchip/Atmel**: Company logo, part number, date code
- **NXP Semiconductors**: "NXP" logo, part number, date code
- **Analog Devices**: "ADI" or "Analog Devices", part number, date code

Provide:
1. **ocrMarkings**: Exact text extracted (line by line)
2. **partNumber**: The IC part number identified
3. **manufacturer**: The manufacturer name
4. **verdict**: Genuine/Fake/Suspicious based on analysis
5. **authenticityScore**: 0-100 confidence score
6. **reasoning**: Detailed explanation with specific observations
7. **flaggedMarkings**: Any suspicious text found
8. **verificationPoints**: Key observations made

Be thorough and specific in your analysis.`,
});

const icDetectionFlow = ai.defineFlow(
  {
    name: 'icDetectionFlow',
    inputSchema: ICDetectionInputSchema,
    outputSchema: ICDetectionOutputSchema,
  },
  async input => {
    const {output} = await icDetectionPrompt(input);
    return output!;
  }
);
