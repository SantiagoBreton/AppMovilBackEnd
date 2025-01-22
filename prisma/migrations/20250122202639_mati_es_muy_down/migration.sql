/*
  Warnings:

  - You are about to drop the column `calification` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `EventCalficationByUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventPendingInvitations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCalificationByUsers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rating` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventCalficationByUser" DROP CONSTRAINT "EventCalficationByUser_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventCalficationByUser" DROP CONSTRAINT "EventCalficationByUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "EventPendingInvitations" DROP CONSTRAINT "EventPendingInvitations_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventPendingInvitations" DROP CONSTRAINT "EventPendingInvitations_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserCalificationByUsers" DROP CONSTRAINT "UserCalificationByUsers_userCalifiedId_fkey";

-- DropForeignKey
ALTER TABLE "UserCalificationByUsers" DROP CONSTRAINT "UserCalificationByUsers_userId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "calification",
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "EventCalficationByUser";

-- DropTable
DROP TABLE "EventPendingInvitations";

-- DropTable
DROP TABLE "UserCalificationByUsers";

-- CreateTable
CREATE TABLE "EventRatingByUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "EventRatingByUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRaitingByUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "raitingUserId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "UserRaitingByUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventPendingRequest" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "EventPendingRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventRatingByUser" ADD CONSTRAINT "EventRatingByUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRatingByUser" ADD CONSTRAINT "EventRatingByUser_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRaitingByUser" ADD CONSTRAINT "UserRaitingByUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRaitingByUser" ADD CONSTRAINT "UserRaitingByUser_raitingUserId_fkey" FOREIGN KEY ("raitingUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPendingRequest" ADD CONSTRAINT "EventPendingRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPendingRequest" ADD CONSTRAINT "EventPendingRequest_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
