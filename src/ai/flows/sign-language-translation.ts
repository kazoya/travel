'use server';

/**
 * @fileOverview This file defines a Genkit flow for real-time translation of spoken content into sign language video.
 *
 * The flow takes text as input and returns a sign language video representation as output.
 *
 * @interface SignLanguageTranslationInput - Defines the input schema for the flow.
 * @interface SignLanguageTranslationOutput - Defines the output schema for the flow.
 * @function translateToSignLanguage - The main exported function to trigger the translation flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import * as fs from 'fs';
import {Readable} from 'stream';
import type {MediaPart} from 'genkit';

const SignLanguageTranslationInputSchema = z.object({
  spokenContent: z
    .string()
    .describe('The spoken content to be translated into sign language.'),
});
export type SignLanguageTranslationInput = z.infer<
  typeof SignLanguageTranslationInputSchema
>;

const SignLanguageTranslationOutputSchema = z.object({
  signLanguageVideo: z
    .string()
    .describe(
      'A data URI of the video representing the sign language translation.'
    ),
  videoDescription: z
    .string()
    .describe('A textual description of the sign language video.'),
});
export type SignLanguageTranslationOutput = z.infer<
  typeof SignLanguageTranslationOutputSchema
>;

export async function translateToSignLanguage(
  input: SignLanguageTranslationInput
): Promise<SignLanguageTranslationOutput> {
  return translateToSignLanguageFlow(input);
}

const descriptionPrompt = ai.definePrompt({
  name: 'signLanguageDescriptionPrompt',
  input: {schema: SignLanguageTranslationInputSchema},
  output: {
    schema: z.object({
      videoDescription: z.string(),
    }),
  },
  prompt: `You are a sign language expert. Provide a concise, one-sentence description of the ASL sign for the following content.

Spoken Content: {{{spokenContent}}}`,
});

const translateToSignLanguageFlow = ai.defineFlow(
  {
    name: 'translateToSignLanguageFlow',
    inputSchema: SignLanguageTranslationInputSchema,
    outputSchema: SignLanguageTranslationOutputSchema,
  },
  async input => {
    const videoPrompt = `A person centered in the frame, performing the American Sign Language (ASL) sign for: "${input.spokenContent}"`;

    let {operation} = await ai.generate({
      model: googleAI.model('veo-2.0-generate-001'),
      prompt: videoPrompt,
      config: {
        durationSeconds: 5,
        aspectRatio: '16:9',
      },
    });

    if (!operation) {
      throw new Error('Expected the model to return an operation');
    }

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      operation = await ai.checkOperation(operation);
    }

    if (operation.error) {
      throw new Error(
        `Failed to generate video: ${operation.error.message}`
      );
    }

    const videoPart = operation.output?.message?.content.find(p => !!p.media);
    if (!videoPart || !videoPart.media) {
      throw new Error('Failed to find the generated video in the operation result');
    }

    const videoDataUri = await downloadAndEncodeVideo(videoPart);

    const {output: descriptionOutput} = await descriptionPrompt(input);
    const description =
      descriptionOutput?.videoDescription ||
      'A video performing a sign language gesture.';

    return {
      signLanguageVideo: videoDataUri,
      videoDescription: description,
    };
  }
);

async function downloadAndEncodeVideo(video: MediaPart): Promise<string> {
  const fetch = (await import('node-fetch')).default;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY environment variable is not set.'
    );
  }

  const videoUrl = `${video.media!.url}&key=${apiKey}`;
  const response = await fetch(videoUrl);

  if (!response.ok || !response.body) {
    throw new Error(
      `Failed to download video. Status: ${response.status} ${response.statusText}`
    );
  }

  const chunks: Buffer[] = [];
  for await (const chunk of response.body) {
    chunks.push(chunk as Buffer);
  }
  const videoBuffer = Buffer.concat(chunks);
  const base64Video = videoBuffer.toString('base64');
  const contentType =
    video.media!.contentType || response.headers.get('content-type') || 'video/webm';

  return `data:${contentType};base64,${base64Video}`;
}
