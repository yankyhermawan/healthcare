import { Status } from "@prisma/client";

export interface CreateAppointment {
	patientID: string;
	doctorID: string;
	reason: string;
	status?: Status;
}

export interface UpdateStatus {
	status: string;
}
