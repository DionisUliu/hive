/*
  Warnings:

  - A unique constraint covering the columns `[contract_id]` on the table `Register` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contract_id` to the `Register` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Register" ADD COLUMN     "contract_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Register_contract_id_key" ON "Register"("contract_id");

-- AddForeignKey
ALTER TABLE "Register" ADD CONSTRAINT "Register_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
