import { CoreMessage } from 'ai'
import { match } from 'ts-pattern'

export const getSystemPrompt = (prompt: string, command: string = 'translate', context: string) => {
  const messages = match(command)
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
        content: `之前的文本: ${prompt}`,
      },
    ])
    .with('improve', () => [
      {
        role: 'system',
        content:
          '你是一个AI写作助手，你的任务是改善现有文本。' +
          '请将你的回应限制在不超过200个字符以内，并确保构建完整的句子。' +
          '在适当的时候使用Markdown格式。',
      },
      {
        role: 'user',
        content: `现有文本: ${prompt}`,
      },
    ])
    .with('shorter', () => [
      {
        role: 'system',
        content: '你是一个AI写作助手，你的任务是缩短现有文本。' + '在适当的时候使用Markdown格式。',
      },
      {
        role: 'user',
        content: `现有文本: ${prompt}`,
      },
    ])
    .with('longer', () => [
      {
        role: 'system',
        content: '你是一个AI写作助手，你的任务是延长现有文本。' + '在适当的时候使用Markdown格式。',
      },
      {
        role: 'user',
        content: `现有文本: ${prompt}`,
      },
    ])
    .with('fix', () => [
      {
        role: 'system',
        content:
          '你是一个AI写作助手，你的任务是修正现有文本中的语法和拼写错误。' +
          '请将你的回应限制在不超过200个字符以内，并确保构建完整的句子。' +
          '在适当的时候使用Markdown格式。',
      },
      {
        role: 'user',
        content: `现有文本: ${prompt}`,
      },
    ])
    .with('zap', () => [
      {
        role: 'system',
        content:
          '你是一个AI写作助手，基于用户输入和上下文生成文本。' +
          '请将你的回应限制在不超过200个字符以内，并确保构建完整的句子。' +
          '在适当的时候使用Markdown格式。',
      },
      {
        role: 'user',
        content: `用户输入: ${prompt}. 请参考上下文: ${context} 生成文本`,
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
