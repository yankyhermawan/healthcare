/*
  Warnings:

  - You are about to drop the column `datetime` on the `AppointmentPatientDoctor` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `schedule` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `appointmentId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `senderRole` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `targetRole` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Patient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `queueNumber` to the `AppointmentPatientDoctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `AppointmentPatientDoctor` table without a default value. This is not possible if the table is not empty.
  - Made the column `patientID` on table `AppointmentPatientDoctor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `doctorID` on table `AppointmentPatientDoctor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `message` on table `AppointmentPatientDoctor` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `specialization` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Ongoing', 'Done');

-- DropForeignKey
ALTER TABLE "AppointmentPatientDoctor" DROP CONSTRAINT "AppointmentPatientDoctor_doctorID_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentPatientDoctor" DROP CONSTRAINT "AppointmentPatientDoctor_patientID_fkey";

-- DropIndex
DROP INDEX "Doctor_email_key";

-- DropIndex
DROP INDEX "Patient_email_key";

-- AlterTable
ALTER TABLE "AppointmentPatientDoctor" DROP COLUMN "datetime",
ADD COLUMN     "queueNumber" INTEGER NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL,
ALTER COLUMN "patientID" SET NOT NULL,
ALTER COLUMN "doctorID" SET NOT NULL,
ALTER COLUMN "message" SET NOT NULL;

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "email",
DROP COLUMN "location",
DROP COLUMN "schedule",
ADD COLUMN     "specialization" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "appointmentId",
DROP COLUMN "senderRole",
DROP COLUMN "targetRole";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "email",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_username_key" ON "Doctor"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_username_key" ON "Patient"("username");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentPatientDoctor" ADD CONSTRAINT "AppointmentPatientDoctor_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentPatientDoctor" ADD CONSTRAINT "AppointmentPatientDoctor_doctorID_fkey" FOREIGN KEY ("doctorID") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
