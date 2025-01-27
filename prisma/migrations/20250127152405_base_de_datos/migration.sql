/*
  Warnings:

  - You are about to drop the `EventRatingByUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserBannereImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventRatingByUser" DROP CONSTRAINT "EventRatingByUser_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventRatingByUser" DROP CONSTRAINT "EventRatingByUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserBannereImage" DROP CONSTRAINT "UserBannereImage_userId_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'No description';

-- DropTable
DROP TABLE "EventRatingByUser";

-- DropTable
DROP TABLE "UserBannereImage";

-- CreateTable
CREATE TABLE "category" (
    "categoryId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "UserBannerImage" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "UserBannerImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBannerImage" ADD CONSTRAINT "UserBannerImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
