/*
  Warnings:

  - The primary key for the `AppointmentPatientDoctor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `appointmentId` on the `AppointmentPatientDoctor` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `AppointmentPatientDoctor` table. All the data in the column will be lost.
  - You are about to drop the column `queueNumber` on the `AppointmentPatientDoctor` table. All the data in the column will be lost.
  - The required column `id` was added to the `AppointmentPatientDoctor` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `reason` to the `AppointmentPatientDoctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppointmentPatientDoctor" DROP CONSTRAINT "AppointmentPatientDoctor_pkey",
DROP COLUMN "appointmentId",
DROP COLUMN "message",
DROP COLUMN "queueNumber",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "reason" TEXT NOT NULL,
ADD CONSTRAINT "AppointmentPatientDoctor_pkey" PRIMARY KEY ("id");
