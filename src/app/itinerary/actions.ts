
'use server';

import { generateDetailedItinerary, type GenerateDetailedItineraryInput } from '@/ai/flows/generate-detailed-itinerary';
import { type GenerateDetailedItineraryOutput } from '@/ai/flows/generate-detailed-itinerary';

export async function generateItineraryAction(input: GenerateDetailedItineraryInput): Promise<{ data: GenerateDetailedItineraryOutput } | { error: string }> {
  try {
    const output = await generateDetailedItinerary(input);
    return { data: output };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'Failed to generate itinerary. Please try again.' };
  }
}
