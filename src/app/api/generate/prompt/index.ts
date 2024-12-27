import { CoreMessage } from 'ai'
import { match } from 'ts-pattern'

export const getSystemPrompt = (prompt: string, option: string = 'translate', command: string) => {
  const messages = match(option)
    .with('continue', () => [
      {
        role: 'system',
        content:
          '你是一个AI写作助手，继续基于之前文本的上下文来延续现有文本。' +
          '相比起文本的开头，给予后面的字符更多的权重/优先级。' +
          '限制你的回应在不超过200个字符以内，但要确保构建完整的句子。' +
          '在适当的时候使用Markdown格式。',
      },
      {
        role: 'user',
        content: `之前文本的上下文: ${prompt}`,
      },
    ])
    .with('improve', () => [
      {
        role: 'system',
        content:
          'You are an AI writing assistant that improves existing text. ' +
          'Limit your response to no more than 200 characters, but make sure to construct complete sentences.' +
          'Use Markdown formatting when appropriate.',
      },
      {
        role: 'user',
        content: `The existing text is: ${prompt}`,
      },
    ])
    .with('shorter', () => [
      {
        role: 'system',
        content: 'You are an AI writing assistant that shortens existing text. ' + 'Use Markdown formatting when appropriate.',
      },
      {
        role: 'user',
        content: `The existing text is: ${prompt}`,
      },
    ])
    .with('longer', () => [
      {
        role: 'system',
        content: 'You are an AI writing assistant that lengthens existing text. ' + 'Use Markdown formatting when appropriate.',
      },
      {
        role: 'user',
        content: `The existing text is: ${prompt}`,
      },
    ])
    .with('fix', () => [
      {
        role: 'system',
        content:
          'You are an AI writing assistant that fixes grammar and spelling errors in existing text. ' +
          'Limit your response to no more than 200 characters, but make sure to construct complete sentences.' +
          'Use Markdown formatting when appropriate.',
      },
      {
        role: 'user',
        content: `The existing text is: ${prompt}`,
      },
    ])
    .with('zap', () => [
      {
        role: 'system',
        content:
          'You area an AI writing assistant that generates text based on a prompt. ' +
          'You take an input from the user and a command for manipulating the text' +
          'Use Markdown formatting when appropriate.',
      },
      {
        role: 'user',
        content: `For this text: ${prompt}. You have to respect the command: ${command}`,
      },
    ])
    .with('translate', () => [
      {
        role: 'system',
        content: '你是一个中英翻译助手！请直接返回翻译结果！！',
      },

      {
        role: 'user',
        content: `请翻译: "${prompt}"!`,
      },
    ])
    .run() as CoreMessage[]

  return messages
}
