import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
  const providers = [
    {
      name: "ollama",
      description: "ollama provider",
      dynamic_params: JSON.stringify({
        base_url: "http://127.0.0.1:11434",
        model: "qwen2:7b",
      }),
    },
    {
      name: "azure",
      description: "azure provider",
      dynamic_params: JSON.stringify({
        azure_openai_endpoint: "",
        azure_openai_key: "",
        open_model_pref: "",
        embedding_model_pref: "",
      }),
    },
  ];
  // init provider config
  try {
    const providerConfig = await prisma.providerInfo.createMany({
      data: providers,
    });
    console.log('Seeding completed.');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
})();
