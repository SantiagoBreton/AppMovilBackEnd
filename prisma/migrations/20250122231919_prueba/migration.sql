/*
  Warnings:

  - You are about to drop the `UserRaitingByUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserRaitingByUser" DROP CONSTRAINT "UserRaitingByUser_raitingUserId_fkey";

-- DropForeignKey
ALTER TABLE "UserRaitingByUser" DROP CONSTRAINT "UserRaitingByUser_userId_fkey";

-- DropTable
DROP TABLE "UserRaitingByUser";

-- CreateTable
CREATE TABLE "UserRatingByUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "ratingUserId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "UserRatingByUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserRatingByUser" ADD CONSTRAINT "UserRatingByUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRatingByUser" ADD CONSTRAINT "UserRatingByUser_ratingUserId_fkey" FOREIGN KEY ("ratingUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
