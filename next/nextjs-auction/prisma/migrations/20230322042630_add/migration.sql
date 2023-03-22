/*
  Warnings:

  - Added the required column `name` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "name" TEXT NOT NULL;
