import { $Enums } from "@prisma/client";

export interface Identify {
	userId: string;
	role: string;
}

export interface userData {
	senderId: string;
	targetId: string;
}

export interface Notification extends userData {
	message: string;
	appointmentId: string;
}

export interface CreateAppointmentInterface {
	patientId: string;
	doctorId: string;
	reason: string;
	status: $Enums.Status;
}

export interface UpdateAppointmentInterface {
	id: string;
	doctorId: string;
	patientId: string;
}

export interface Queue {
	doctorId: string;
	patientId: string;
}

export interface CreateRating {
	score: number;
	comment: string;
	waitTime?: number;
	serviceTime?: number;
	doctorId: string;
	patientId: string;
	appointmentId: string;
}
