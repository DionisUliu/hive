/*
  Warnings:

  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_building_id_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_residentId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_roomId_fkey";

-- DropTable
DROP TABLE "History";

-- CreateTable
CREATE TABLE "Register" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "residentId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "building_id" TEXT NOT NULL,

    CONSTRAINT "Register_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Register_roomId_idx" ON "Register"("roomId");

-- CreateIndex
CREATE INDEX "Register_residentId_idx" ON "Register"("residentId");

-- CreateIndex
CREATE INDEX "Register_building_id_idx" ON "Register"("building_id");

-- AddForeignKey
ALTER TABLE "Register" ADD CONSTRAINT "Register_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Register" ADD CONSTRAINT "Register_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Register" ADD CONSTRAINT "Register_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
