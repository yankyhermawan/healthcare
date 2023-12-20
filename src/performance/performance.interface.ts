export interface CreatePerformance {
	score: number;
	comment: string;
	waitTime?: number;
	serviceTime?: number;
	doctorId: string;
	patientId: string;
	appointmentId: string;
}
