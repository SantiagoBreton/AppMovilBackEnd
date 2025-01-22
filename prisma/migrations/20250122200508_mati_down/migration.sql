/*
  Warnings:

  - Added the required column `calification` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitudeOffset` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitudeOffset` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "calification" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "latitudeOffset" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitudeOffset" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "EventCalficationByUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "classification" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "EventCalficationByUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCalificationByUsers" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "userCalifiedId" INTEGER NOT NULL,
    "classification" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "UserCalificationByUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventPendingInvitations" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "EventPendingInvitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfileImage" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "UserProfileImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventCalficationByUser" ADD CONSTRAINT "EventCalficationByUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventCalficationByUser" ADD CONSTRAINT "EventCalficationByUser_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCalificationByUsers" ADD CONSTRAINT "UserCalificationByUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCalificationByUsers" ADD CONSTRAINT "UserCalificationByUsers_userCalifiedId_fkey" FOREIGN KEY ("userCalifiedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPendingInvitations" ADD CONSTRAINT "EventPendingInvitations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPendingInvitations" ADD CONSTRAINT "EventPendingInvitations_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfileImage" ADD CONSTRAINT "UserProfileImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
