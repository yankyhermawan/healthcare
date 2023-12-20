/*
  Warnings:

  - The primary key for the `Performance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Performance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Performance_pkey" PRIMARY KEY ("appointmentId");
