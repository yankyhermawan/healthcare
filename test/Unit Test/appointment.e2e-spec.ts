import { StatusCodes } from "http-status-codes";
import { AppointmentService } from "../../src/appointment/appointment.service";
import { Status } from "@prisma/client";

const appointmentService = new AppointmentService();
const doctorId = "e82ca00e-11a5-416d-8fb4-06cd8937043b";
const patientId = "ae9369ae-ecde-480a-9605-ccebf97aff50";
const appointmentId = "f52e5c5a-98a9-4306-a584-4b6cbd24a159";

describe("Appointment", () => {
	it("Create Appointment", async () => {
		const data = {
			patientId: patientId,
			doctorId: doctorId,
			reason: "Cold",
			status: Status.Pending,
		};
		const response = await appointmentService.createAppointment(data);
		expect(response.code).toBe(StatusCodes.CREATED);
	});

	it("Get Appointment by Appointment Id", async () => {
		const response = await appointmentService.getAppointmentByAppointmentId(
			appointmentId
		);
		expect(response.code).toBe(StatusCodes.OK);
	});

	it("Get Appointment by Doctor Id", async () => {
		const response = await appointmentService.getAppointmentByUserId(doctorId);
		expect(response.code).toBe(StatusCodes.OK);
	});

	it("Get Appointment by Patient Id", async () => {
		const response = await appointmentService.getAppointmentByUserId(patientId);
		expect(response.code).toBe(StatusCodes.OK);
	});

	it("Set Appointment Status to Ongoing", async () => {
		const data = {
			status: Status.Ongoing,
		};
		const response = await appointmentService.setAppointmentStatusOngoing(
			appointmentId,
			data
		);
		expect(response.code).toBe(StatusCodes.OK);
	});

	it("Set Appointment Status to Done", async () => {
		const data = {
			status: Status.Done,
		};
		const response = await appointmentService.setAppointmentStatusOngoing(
			appointmentId,
			data
		);
		expect(response.code).toBe(StatusCodes.OK);
	});

	it("Get my Queue", async () => {
		const response = await appointmentService.getQueueNumber(
			doctorId,
			patientId
		);
		expect(response.code).toBe(StatusCodes.OK);
	});

	it("Get ongoing queue number", async () => {
		const response = await appointmentService.getOngoingIndex(doctorId);
		expect(response.code).toBe(StatusCodes.OK);
	});

	it("Get Service time or waiting time", async () => {
		const response = await appointmentService.getTime(appointmentId);
		expect(typeof response.waitTime).toBe("number");
		expect(typeof response.serviceTime).toBe("number");
	});
});
