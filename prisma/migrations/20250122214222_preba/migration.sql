/*
  Warnings:

  - Added the required column `comment` to the `EventRatingByUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `UserRaitingByUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventRatingByUser" ADD COLUMN     "comment" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserRaitingByUser" ADD COLUMN     "comment" TEXT NOT NULL;
