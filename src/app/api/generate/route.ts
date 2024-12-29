import { NextRequest } from 'next/server';
import { streamText } from 'ai';
import { getSystemPrompt } from './prompt';
import { loadLLM } from '@/lib/model-provider/load-llm';

export async function POST(request: NextRequest) {
  const { prompt, command, context } = await request.json();
  const messages = getSystemPrompt(prompt, command, context);
  console.log(messages);
  const model = loadLLM('ollama', 'llama3.1:latest');

  const modelConfig: Parameters<typeof streamText>[0] = {
    model,
    messages,
  };

  const result = streamText(modelConfig);

  return result.toDataStreamResponse();
}
