'use server';

/**
 * @fileOverview A flow that provides information about rights and support organizations for travelers with disabilities.
 *
 * - getSupportInfo - A function that retrieves rights and support information based on location.
 * - SupportInfoInput - The input type for the getSupportInfo function.
 * - SupportInfoOutput - The return type for the getSupportInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SupportInfoInputSchema = z.object({
  location: z.string().describe('The location for which to retrieve support information.'),
  disabilityType: z.string().describe('The type of disability the traveler has.'),
  query: z.string().optional().describe('Optional query about specific rights or support.'),
});
export type SupportInfoInput = z.infer<typeof SupportInfoInputSchema>;

const SupportInfoOutputSchema = z.object({
  rightsInformation: z.string().describe('Information about the rights of travelers with disabilities in the specified location.'),
  supportOrganizations: z.string().describe('List of support organizations available in the specified location.'),
});
export type SupportInfoOutput = z.infer<typeof SupportInfoOutputSchema>;

export async function getSupportInfo(input: SupportInfoInput): Promise<SupportInfoOutput> {
  return supportInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'supportInfoPrompt',
  input: {schema: SupportInfoInputSchema},
  output: {schema: SupportInfoOutputSchema},
  prompt: `You are an AI assistant providing information about the rights and support organizations for travelers with disabilities.

  Provide information relevant to the specified location and disability type.
  Answer in the language of the query, if provided.

  Location: {{{location}}}
  Disability Type: {{{disabilityType}}}
  Query: {{{query}}}

  Include information about legal rights, accessibility resources, and contact details for relevant support organizations.
`,
});

const supportInfoFlow = ai.defineFlow(
  {
    name: 'supportInfoFlow',
    inputSchema: SupportInfoInputSchema,
    outputSchema: SupportInfoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
