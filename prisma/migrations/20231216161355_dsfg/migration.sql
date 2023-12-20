/*
  Warnings:

  - You are about to drop the column `created` on the `AppointmentPatientDoctor` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `AppointmentPatientDoctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppointmentPatientDoctor" DROP COLUMN "created",
ADD COLUMN     "calledAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "doneAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Performance" ADD COLUMN     "serviceTime" INTEGER;
