import { createAzure } from '@ai-sdk/azure';
import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';

const LLMConfig = {
  'ollama': {
    baseURL: `${process.env.NEXT_OLLAMA_ENDPOINT}/api`,
  },
  'azure': {
    baseURL: `${process.env.NEXT_AZURE_OPENAI_ENDPOINT}/openai/deployments/`,
    apiKey: process.env.NEXT_AZURE_OPENAI_KEY,
  }
}
const azure = createAzure(LLMConfig.azure);

export async function POST(request: NextRequest) {
  const modelConfig = {
    model: azure('gpt-4o'),
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  };

  const result = streamText(modelConfig);

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const textPart of result.textStream) {
          controller.enqueue(new TextEncoder().encode(textPart));
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new NextResponse(stream, {
    headers: { 'Content-Type': 'text/plain' },
  });
}