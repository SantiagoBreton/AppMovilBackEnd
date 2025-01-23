/*
  Warnings:

  - The primary key for the `EventPendingRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `EventPendingRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EventPendingRequest" DROP CONSTRAINT "EventPendingRequest_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "EventPendingRequest_pkey" PRIMARY KEY ("userId", "eventId");
