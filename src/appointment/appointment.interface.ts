import { Status } from "@prisma/client";

export interface CreateAppointment {
	patientId: string;
	doctorId: string;
	reason: string;
	status: Status;
}

export interface UpdateStatus {
	status: Status;
}
