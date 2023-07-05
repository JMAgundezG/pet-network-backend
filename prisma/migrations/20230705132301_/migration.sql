/*
  Warnings:

  - You are about to drop the column `status` on the `Friend` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Friend" DROP COLUMN "status";

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "AppUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
