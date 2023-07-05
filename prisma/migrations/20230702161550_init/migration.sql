/*
  Warnings:

  - The primary key for the `AppUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `AppUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Pet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Pet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `user_id` on the `Friend` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `friend_id` on the `Friend` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ownerId` on the `Pet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_friend_id_fkey";

-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_ownerId_fkey";

-- AlterTable
ALTER TABLE "AppUser" DROP CONSTRAINT "AppUser_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "AppUser_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Friend" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL,
DROP COLUMN "friend_id",
ADD COLUMN     "friend_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "ownerId",
ADD COLUMN     "ownerId" INTEGER NOT NULL,
ADD CONSTRAINT "Pet_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Friend_user_id_friend_id_key" ON "Friend"("user_id", "friend_id");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "AppUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "AppUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "AppUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
