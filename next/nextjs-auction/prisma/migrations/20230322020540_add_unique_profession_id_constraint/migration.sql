/*
  Warnings:

  - A unique constraint covering the columns `[professionId]` on the table `professions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "professions_professionId_key" ON "professions"("professionId");
