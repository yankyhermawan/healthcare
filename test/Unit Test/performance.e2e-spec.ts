import { StatusCodes } from "http-status-codes";
import { PerformanceService } from "../../src/performance/performance.service";

const performanceService = new PerformanceService();

const createPerformance = {
	score: 5,
	comment: "Dokternya baik",
	doctorId: "e82ca00e-11a5-416d-8fb4-06cd8937043b",
	patientId: "ae9369ae-ecde-480a-9605-ccebf97aff50",
	appointmentId: "f52e5c5a-98a9-4306-a584-4b6cbd24a159",
};

describe("Doctor Performance", () => {
	it("Create Performance", async () => {
		const response = await performanceService.createPerformance(
			createPerformance
		);
		expect(response.code).toBe(StatusCodes.CREATED);
	});

	it("Get Doctor Performance", async () => {
		const response = await performanceService.getDoctorPerformance(
			createPerformance.doctorId
		);
		expect(response.code).toBe(StatusCodes.OK);
	});

	it("Get Performance by Appointment Id", async () => {
		const response = await performanceService.getPerformanceByAppointmentId(
			createPerformance.appointmentId
		);
		expect(response.code).toBe(StatusCodes.OK);
	});

	it("Get Doctor average Rating", async () => {
		const response = await performanceService.getAverageRating(
			createPerformance.doctorId
		);
		expect(response.code).toBe(StatusCodes.OK);
	});
});
