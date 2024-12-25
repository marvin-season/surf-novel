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
  const { prompt } = await request.json();
  const modelConfig = {
    model: azure('gpt-4o'),
    prompt,
  };

  const result = streamText(modelConfig);

  return result.toDataStreamResponse();
}
