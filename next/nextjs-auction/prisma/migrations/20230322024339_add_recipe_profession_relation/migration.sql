/*
  Warnings:

  - Added the required column `professionId` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "professionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "professions"("professionId") ON DELETE RESTRICT ON UPDATE CASCADE;
