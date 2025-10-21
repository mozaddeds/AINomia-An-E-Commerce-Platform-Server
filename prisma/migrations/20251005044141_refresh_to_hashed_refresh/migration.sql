/*
  Warnings:

  - You are about to drop the column `token` on the `refresh_tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hashedToken]` on the table `refresh_tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashedToken` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."refresh_tokens_token_idx";

-- DropIndex
DROP INDEX "public"."refresh_tokens_token_key";

-- AlterTable
ALTER TABLE "refresh_tokens" DROP COLUMN "token",
ADD COLUMN     "hashedToken" TEXT NOT NULL,
ADD COLUMN     "isRevoked" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_hashedToken_key" ON "refresh_tokens"("hashedToken");

-- CreateIndex
CREATE INDEX "refresh_tokens_hashedToken_idx" ON "refresh_tokens"("hashedToken");
