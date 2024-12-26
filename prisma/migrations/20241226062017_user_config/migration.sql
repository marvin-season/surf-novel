-- CreateTable
CREATE TABLE "UserConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lLMModelId" TEXT,
    "lLMModelProviderId" TEXT,
    CONSTRAINT "UserConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserConfig_lLMModelProviderId_fkey" FOREIGN KEY ("lLMModelProviderId") REFERENCES "LLMModelProvider" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "UserConfig_lLMModelId_fkey" FOREIGN KEY ("lLMModelId") REFERENCES "LLMModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserConfig_userId_key" ON "UserConfig"("userId");
