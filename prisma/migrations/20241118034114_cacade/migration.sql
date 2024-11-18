-- DropForeignKey
ALTER TABLE "EventUser" DROP CONSTRAINT "EventUser_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventUser" DROP CONSTRAINT "EventUser_userId_fkey";

-- AddForeignKey
ALTER TABLE "EventUser" ADD CONSTRAINT "EventUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUser" ADD CONSTRAINT "EventUser_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
