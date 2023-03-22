/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `professions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "professions" ADD COLUMN     "name" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "professions_name_key" ON "professions"("name");
