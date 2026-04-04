/*
  Warnings:

  - Added the required column `coverArtistId` to the `Comic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comic" ADD COLUMN     "coverArtistId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Comic" ADD CONSTRAINT "Comic_coverArtistId_fkey" FOREIGN KEY ("coverArtistId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
