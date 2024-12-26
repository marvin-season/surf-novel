import { NextRequest } from 'next/server';
import { streamText } from 'ai';
import { getSystemPrompt } from './prompt';
import { loadLLM } from '@/lib/model-provider/load-llm';

export async function POST(request: NextRequest) {
  const { prompt, option, command } = await request.json();
  const messages = getSystemPrompt(prompt, option, command);

  console.log(messages);
  const model = loadLLM('azure', 'gpt-4o');

  const modelConfig: Parameters<typeof streamText>[0] = {
    model,
    messages ,
  };

  const result = streamText(modelConfig);

  return result.toDataStreamResponse();
}
