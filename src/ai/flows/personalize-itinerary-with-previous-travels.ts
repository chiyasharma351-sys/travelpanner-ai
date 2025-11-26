'use server';

/**
 * @fileOverview A flow for personalizing travel itineraries based on previous travel history.
 *
 * - personalizeItineraryWithPreviousTravels - A function that personalizes travel itineraries.
 * - PersonalizeItineraryInput - The input type for the personalizeItineraryWithPreviousTravels function.
 * - PersonalizeItineraryOutput - The return type for the personalizeItineraryWithPreviousTravels function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeItineraryInputSchema = z.object({
  destination: z.string().describe('The destination for the trip.'),
  from_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe('The start date of the trip (YYYY-MM-DD).'),
  to_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe('The end date of the trip (YYYY-MM-DD).'),
  budget_type: z.enum(['economical', 'standard', 'luxury']).describe('The budget type for the trip.'),
  travellers: z.number().int().positive().describe('The number of travellers.'),
  previous_itineraries: z.string().optional().describe('Previous travel itineraries of the user, in JSON format.'),
});

export type PersonalizeItineraryInput = z.infer<typeof PersonalizeItineraryInputSchema>;

const PersonalizeItineraryOutputSchema = z.object({
  trip_summary: z.string().describe('A summary of the trip.'),
  total_days: z.number().int().positive().describe('The total number of days of the trip.'),
  itinerary: z.array(
    z.object({
      day: z.number().int().positive().describe('The day number in the itinerary.'),
      title: z.string().describe('The title of the day.'),
      morning: z.string().describe('The morning activity.'),
      afternoon: z.string().describe('The afternoon activity.'),
      evening: z.string().describe('The evening activity.'),
      commute: z.string().describe('Local commute information.'),
      food: z.string().describe('Food recommendations based on budget_type.'),
      notes: z.string().describe('Additional notes or tips for the day.'),
    })
  ).describe('A detailed day-wise itinerary.'),
  tips: z.string().describe('Travel tips relevant for the destination.'),
});

export type PersonalizeItineraryOutput = z.infer<typeof PersonalizeItineraryOutputSchema>;

export async function personalizeItineraryWithPreviousTravels(
  input: PersonalizeItineraryInput
): Promise<PersonalizeItineraryOutput> {
  return personalizeItineraryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeItineraryPrompt',
  input: {schema: PersonalizeItineraryInputSchema},
  output: {schema: PersonalizeItineraryOutputSchema},
  prompt: `You are TravelGenAI, an AI travel itinerary generator.

  Generate a highly detailed, realistic, day-wise travel itinerary based on the user’s input.

  Destination: {{{destination}}}
  From Date: {{{from_date}}}
  To Date: {{{to_date}}}
  Budget Type: {{{budget_type}}}
  Travellers: {{{travellers}}}

  Calculate the total number of days from From Date to To Date.

  Produce a clear, structured, day-wise itinerary.

  Each day must include:

  Morning activity
  Afternoon activity
  Evening activity
  Local commute info
  Food recommendations based on budget_type
  Cost-conscious suggestions for economical / comfort options for standard / premium experiences for luxury
  Provide weather, safety, and transport tips relevant for the destination.

  {{~#if previous_itineraries}}
  Previous Itineraries:
  {{previous_itineraries}}
  Reference the previous itineraries naturally—do NOT repeat them. Use them only to personalize recommendations.
  {{~/if}}

  Maintain a friendly, travel-guide tone but ensure accuracy and helpfulness.

  Always output in the following JSON format:

  {
    "trip_summary": "...",
    "total_days": number,
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: ...",
        "morning": "...",
        "afternoon": "...",
        "evening": "...",
        "commute": "...",
        "food": "...",
        "notes": "..."
      }
    ],
    "tips": "..."
  }

  Your goal is to help the user plan the perfect trip based on their preferences.
  `, 
});

const personalizeItineraryFlow = ai.defineFlow(
  {
    name: 'personalizeItineraryFlow',
    inputSchema: PersonalizeItineraryInputSchema,
    outputSchema: PersonalizeItineraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
