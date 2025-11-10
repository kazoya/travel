'use server';

/**
 * @fileOverview A personalized trip itinerary generator for users with disabilities.
 *
 * - generateTripItinerary - A function that generates a personalized trip itinerary.
 * - TripItineraryInput - The input type for the generateTripItinerary function.
 * - TripItineraryOutput - The return type for the generateTripItinerary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TripItineraryInputSchema = z.object({
  disabilityType: z.string().describe('The type of disability of the user.'),
  budget: z.string().describe('The budget for the trip.'),
  destinationPreferences: z.string().describe('The preferred destinations of the user.'),
  tripDuration: z.string().describe('The desired duration of the trip.'),
  interests: z.string().describe('The interests of the user (e.g., museums, nature, food).'),
});
export type TripItineraryInput = z.infer<typeof TripItineraryInputSchema>;

const TripItineraryOutputSchema = z.object({
  itinerary: z.string().describe('The generated personalized trip itinerary.'),
});
export type TripItineraryOutput = z.infer<typeof TripItineraryOutputSchema>;

export async function generateTripItinerary(input: TripItineraryInput): Promise<TripItineraryOutput> {
  return generateTripItineraryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tripItineraryPrompt',
  input: {schema: TripItineraryInputSchema},
  output: {schema: TripItineraryOutputSchema},
  prompt: `You are an AI travel assistant that specializes in creating personalized trip itineraries for users with disabilities.

  Based on the user's disability type, budget, destination preferences, trip duration, and interests, generate a detailed and enjoyable trip itinerary.

  Disability Type: {{{disabilityType}}}
  Budget: {{{budget}}}
  Destination Preferences: {{{destinationPreferences}}}
  Trip Duration: {{{tripDuration}}}
  Interests: {{{interests}}}

  Generate a trip itinerary that takes into account the user's needs and preferences. Be specific about locations, activities, and transportation options. Ensure that the itinerary is realistic and feasible within the given constraints.  The output itinerary should have a location, activity and transportation options and recommendations.
`,
});

const generateTripItineraryFlow = ai.defineFlow(
  {
    name: 'generateTripItineraryFlow',
    inputSchema: TripItineraryInputSchema,
    outputSchema: TripItineraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
