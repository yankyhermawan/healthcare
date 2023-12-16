/*
  Warnings:

  - You are about to drop the column `dateTime` on the `AppointmentPatientDoctor` table. All the data in the column will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_doctorId_fkey";

-- AlterTable
ALTER TABLE "AppointmentPatientDoctor" DROP COLUMN "dateTime",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Rating";

-- CreateTable
CREATE TABLE "Performance" (
    "id" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "waitTime" INTEGER NOT NULL,
    "doctorId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,

    CONSTRAINT "Performance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "AppointmentPatientDoctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
