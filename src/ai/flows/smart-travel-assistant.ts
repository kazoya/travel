'use server';

/**
 * @fileOverview A smart travel assistant AI agent.
 *
 * - smartTravelAssistant - A function that answers user's travel related questions.
 * - SmartTravelAssistantInput - The input type for the smartTravelAssistant function.
 * - SmartTravelAssistantOutput - The return type for the smartTravelAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartTravelAssistantInputSchema = z.object({
  query: z.string().describe('The user query about travel, accessibility, transportation or support services.'),
});
export type SmartTravelAssistantInput = z.infer<typeof SmartTravelAssistantInputSchema>;

const SmartTravelAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type SmartTravelAssistantOutput = z.infer<typeof SmartTravelAssistantOutputSchema>;

export async function smartTravelAssistant(input: SmartTravelAssistantInput): Promise<SmartTravelAssistantOutput> {
  return smartTravelAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartTravelAssistantPrompt',
  input: {schema: SmartTravelAssistantInputSchema},
  output: {schema: SmartTravelAssistantOutputSchema},
  prompt: `You are a smart travel assistant chatbot that answers user questions related to travel, accessibility, transportation, and support services. Provide informative and helpful responses to assist travelers with disabilities.

User Query: {{{query}}}`,
});

const smartTravelAssistantFlow = ai.defineFlow(
  {
    name: 'smartTravelAssistantFlow',
    inputSchema: SmartTravelAssistantInputSchema,
    outputSchema: SmartTravelAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
