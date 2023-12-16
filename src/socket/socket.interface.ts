export interface Identify {
	userId: string;
	role: string;
}

export interface Notification {
	senderId: string;
	targetId: string;
	message: string;
	appointmentId: string;
}

export interface CreateAppointmentInterface {
	patientID: string;
	doctorID: string;
	reason: string;
}
