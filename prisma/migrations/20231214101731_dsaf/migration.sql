-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "hospital" TEXT NOT NULL,
    "schedule" TEXT,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentPatientDoctor" (
    "appointmentId" TEXT NOT NULL,
    "patientID" TEXT,
    "doctorID" TEXT,
    "datetime" TIMESTAMP(3) NOT NULL,
    "message" TEXT,

    CONSTRAINT "AppointmentPatientDoctor_pkey" PRIMARY KEY ("appointmentId")
);

-- CreateTable
CREATE TABLE "Notification" (
    "notificationId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "senderRole" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "targetRole" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notificationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "Doctor"("email");

-- AddForeignKey
ALTER TABLE "AppointmentPatientDoctor" ADD CONSTRAINT "AppointmentPatientDoctor_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentPatientDoctor" ADD CONSTRAINT "AppointmentPatientDoctor_doctorID_fkey" FOREIGN KEY ("doctorID") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
