-- CreateTable
CREATE TABLE "UserBannereImage" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "UserBannereImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserBannereImage" ADD CONSTRAINT "UserBannereImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
