/*
  Warnings:

  - A unique constraint covering the columns `[data]` on the table `recipes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "recipes_data_key" ON "recipes"("data");
