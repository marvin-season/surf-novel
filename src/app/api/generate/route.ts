import { createAzure } from '@ai-sdk/azure';
import { NextRequest } from 'next/server';
import { streamText } from 'ai';
import { getSystemPrompt } from './prompt';

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
  const { prompt, option, command } = await request.json();
  const messages = getSystemPrompt(prompt, option, command);

  console.log(messages);

  const modelConfig: Parameters<typeof streamText>[0] = {
    model: azure('gpt-4o'),
    messages ,
  };

  const result = streamText(modelConfig);

  return result.toDataStreamResponse();
}
