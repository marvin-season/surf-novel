import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

;(async () => {
  const providers = [
    {
      default: true,
      name: 'ollama',
      description: 'ollama provider',
      dynamic_params: JSON.stringify({
        base_url: {
          type: 'string',
          default: 'http://127.0.0.1:11434',
          value: 'http://127.0.0.1:11434',
          placeholder: '请输入base_url',
        },
        model: {
          type: 'select',
          default: 'qwen2:7b',
          value: 'qwen2:7b',
          placeholder: '请输入模型名称',
          options: [
            { name: 'qwen2:7b', value: 'qwen2:7b' },
            { name: 'llama3.1', value: 'llama3.1' },
          ],
        },
      }),
    },
    {
      name: 'azure',
      description: 'azure provider',
      dynamic_params: JSON.stringify({
        azure_openai_endpoint: {
          type: 'string',
          default: '',
          value: '',
          placeholder: '请输入azure_openai_endpoint',
        },
        azure_openai_key: {
          type: 'string',
          default: '',
          value: '',
          placeholder: '请输入azure_openai_key',
        },
        open_model_pref: {
          type: 'select',
          default: '',
          value: '',
          placeholder: '请输入部署的模型名称',
          options: [
            { name: 'gpt-4', value: 'gpt-4' },
            { name: 'gpt-4o', value: 'gpt-4o' },
          ],
        },
        embedding_model_pref: {
          type: 'select',
          default: '',
          value: '',
          placeholder: '请输入embedding模型名称',
          options: [
            { name: 'text-embedding-ada-002', value: 'text-embedding-ada-002' },
            { name: 'text-embedding-3-small', value: 'text-embedding-3-small' },
          ],
        },
      }),
    },
  ]
  // init provider config
  try {
    await prisma.providerInfo.deleteMany()
    const providerConfig = await prisma.providerInfo.createMany({
      data: providers,
    })
    console.log('Seeding completed.')
  } catch (error) {
    console.error('Error during seeding:', error)
    process.exit(1)
  }
})()
