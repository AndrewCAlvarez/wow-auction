/*
  Warnings:

  - Added the required column `category` to the `recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillTierId` to the `recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillTierName` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "skillTierId" INTEGER NOT NULL,
ADD COLUMN     "skillTierName" TEXT NOT NULL;
