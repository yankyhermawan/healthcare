/*
  Warnings:

  - You are about to drop the column `doctorID` on the `AppointmentPatientDoctor` table. All the data in the column will be lost.
  - You are about to drop the column `patientID` on the `AppointmentPatientDoctor` table. All the data in the column will be lost.
  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `notificationId` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `doctorId` to the `AppointmentPatientDoctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `AppointmentPatientDoctor` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Notification` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "AppointmentPatientDoctor" DROP CONSTRAINT "AppointmentPatientDoctor_doctorID_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentPatientDoctor" DROP CONSTRAINT "AppointmentPatientDoctor_patientID_fkey";

-- AlterTable
ALTER TABLE "AppointmentPatientDoctor" DROP COLUMN "doctorID",
DROP COLUMN "patientID",
ADD COLUMN     "doctorId" TEXT NOT NULL,
ADD COLUMN     "patientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_pkey",
DROP COLUMN "notificationId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Performance" ALTER COLUMN "waitTime" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AppointmentPatientDoctor" ADD CONSTRAINT "AppointmentPatientDoctor_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentPatientDoctor" ADD CONSTRAINT "AppointmentPatientDoctor_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
