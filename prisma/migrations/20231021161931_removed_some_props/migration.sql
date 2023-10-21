/*
  Warnings:

  - You are about to drop the column `password` on the `Resident` table. All the data in the column will be lost.
  - You are about to drop the column `verification_code` on the `Resident` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Resident" DROP COLUMN "password",
DROP COLUMN "verification_code";
