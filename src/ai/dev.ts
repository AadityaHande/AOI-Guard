import { config } from 'dotenv';
config();

import '@/ai/flows/model-retraining.ts';
import '@/ai/flows/detailed-scan-report.ts';
import '@/ai/flows/batch-scan-summary.ts';
