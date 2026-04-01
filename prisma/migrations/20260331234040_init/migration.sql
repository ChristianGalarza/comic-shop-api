/*
  Warnings:

  - You are about to drop the column `drawer` on the `Comic` table. All the data in the column will be lost.
  - You are about to drop the column `publisher` on the `Comic` table. All the data in the column will be lost.
  - You are about to drop the column `writer` on the `Comic` table. All the data in the column will be lost.
  - Added the required column `drawerId` to the `Comic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisherId` to the `Comic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writerId` to the `Comic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comic" DROP COLUMN "drawer",
DROP COLUMN "publisher",
DROP COLUMN "writer",
ADD COLUMN     "drawerId" INTEGER NOT NULL,
ADD COLUMN     "publisherId" INTEGER NOT NULL,
ADD COLUMN     "writerId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isWriter" BOOLEAN NOT NULL,
    "isDrawer" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publisher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_name_key" ON "Person"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_name_key" ON "Publisher"("name");

-- AddForeignKey
ALTER TABLE "Comic" ADD CONSTRAINT "Comic_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comic" ADD CONSTRAINT "Comic_drawerId_fkey" FOREIGN KEY ("drawerId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comic" ADD CONSTRAINT "Comic_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
