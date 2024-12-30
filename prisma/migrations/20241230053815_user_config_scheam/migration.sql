/*
  Warnings:

  - You are about to drop the `LLMModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LLMModelProvider` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NoteToTag` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `UserConfig` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `UserConfig` table. All the data in the column will be lost.
  - You are about to drop the column `lLMModelId` on the `UserConfig` table. All the data in the column will be lost.
  - You are about to drop the column `lLMModelProviderId` on the `UserConfig` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserConfig` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `UserConfig` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `settings` to the `UserConfig` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tag_name_key";

-- DropIndex
DROP INDEX "_NoteToTag_B_index";

-- DropIndex
DROP INDEX "_NoteToTag_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LLMModel";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LLMModelProvider";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tag";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_NoteToTag";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserConfig" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "theme" TEXT,
    "language" TEXT,
    "settings" TEXT NOT NULL,
    CONSTRAINT "UserConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserConfig" ("id", "userId") SELECT "id", "userId" FROM "UserConfig";
DROP TABLE "UserConfig";
ALTER TABLE "new_UserConfig" RENAME TO "UserConfig";
CREATE UNIQUE INDEX "UserConfig_userId_key" ON "UserConfig"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
