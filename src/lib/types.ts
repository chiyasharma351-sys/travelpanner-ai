import { type GenerateDetailedItineraryOutput } from '@/ai/flows/generate-detailed-itinerary';

export type Itinerary = GenerateDetailedItineraryOutput;
export type ItineraryDay = Itinerary['itinerary'][0];
