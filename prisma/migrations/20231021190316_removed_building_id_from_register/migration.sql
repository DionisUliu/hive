/*
  Warnings:

  - You are about to drop the column `building_id` on the `Register` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Register" DROP CONSTRAINT "Register_building_id_fkey";

-- DropIndex
DROP INDEX "Register_building_id_idx";

-- AlterTable
ALTER TABLE "Register" DROP COLUMN "building_id";
