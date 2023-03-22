/*
  Warnings:

  - A unique constraint covering the columns `[auctionId]` on the table `auctions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auctionId` to the `auctions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auctions" ADD COLUMN     "auctionId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "auctions_auctionId_key" ON "auctions"("auctionId");
