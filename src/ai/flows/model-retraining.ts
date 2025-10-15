'use server';

/**
 * @fileOverview Retrains the IC authenticity detection model with new training images.
 *
 * - retrainModel - A function that triggers the model retraining process.
 * - RetrainModelInput - The input type for the retrainModel function.
 * - RetrainModelOutput - The return type for the retrainModel function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RetrainModelInputSchema = z.object({
  trainingImagesDataUris: z
    .array(z.string())
    .describe(
      'An array of training images, as data URIs that must include a MIME type and use Base64 encoding. Expected format: [\