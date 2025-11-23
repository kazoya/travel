'use server';

/**
 * @fileOverview AI flow for suggesting travel bag contents based on disability type.
 *
 * - suggestTravelBagItems - A function that suggests travel bag items based on disability type.
 * - TravelBagInput - The input type for the suggestTravelBagItems function.
 * - TravelBagOutput - The return type for the suggestTravelBagItems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TravelBagInputSchema = z.object({
  disabilityType: z.string().describe('The type of disability (mobility, visual, hearing, cognitive, other).'),
  destination: z.string().optional().describe('The travel destination.'),
  tripDuration: z.string().optional().describe('The duration of the trip.'),
});
export type TravelBagInput = z.infer<typeof TravelBagInputSchema>;

const TravelBagOutputSchema = z.object({
  suggestions: z.array(z.object({
    category: z.string().describe('The category of items (e.g., Medical, Accessibility, Documents).'),
    items: z.array(z.string()).describe('List of suggested items for this category.'),
    reason: z.string().describe('Why these items are important for this disability type.'),
  })).describe('Categorized list of suggested travel bag items.'),
  generalTips: z.string().describe('General tips for packing with this disability type.'),
});
export type TravelBagOutput = z.infer<typeof TravelBagOutputSchema>;

export async function suggestTravelBagItems(input: TravelBagInput): Promise<TravelBagOutput> {
  return travelBagFlow(input);
}

const prompt = ai.definePrompt({
  name: 'travelBagPrompt',
  input: {schema: TravelBagInputSchema},
  output: {schema: TravelBagOutputSchema},
  prompt: `You are an AI travel assistant specializing in helping people with disabilities pack their travel bags effectively.

Based on the user's disability type, suggest comprehensive travel bag items organized by category. Consider:
- Medical needs and medications
- Assistive devices and their accessories
- Accessibility tools
- Emergency contacts and documents
- Comfort items specific to the disability type

Disability Type: {{{disabilityType}}}
Destination: {{{destination}}}
Trip Duration: {{{tripDuration}}}

Provide detailed suggestions with explanations for why each category is important. Be specific and practical. Respond in Arabic if the disability type is described in Arabic, otherwise respond in English.`,
});

const travelBagFlow = ai.defineFlow(
  {
    name: 'travelBagFlow',
    inputSchema: TravelBagInputSchema,
    outputSchema: TravelBagOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

