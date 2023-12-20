import { DoctorService } from "../../src/doctor/doctor.service";
import { DoctorAuthService } from "../../src/doctor/doctor.auth.service";
import { StatusCodes } from "http-status-codes";

const registerData = {
	username: "doctortest",
	password: "doctortest",
	name: "dr.bambang",
	specialization: "umum",
	imageURL: "abc",
	hospital: "rumah sakit daerah",
};

const loginData = {
	username: "doctortest",
	password: "doctortest",
};
const doctorId = "e82ca00e-11a5-416d-8fb4-06cd8937043b";

const doctorService = new DoctorService();
const doctorAuthService = new DoctorAuthService();

describe("Doctor Test", () => {
	it("Register Doctor", async () => {
		const response = await doctorAuthService.register(registerData);
		expect(response.code).toBe(StatusCodes.CREATED);
	});

	it("LoginDoctor", async () => {
		const response = await doctorAuthService.login(loginData);
		expect(response.code).toBe(StatusCodes.OK);
	});

	it("Get All Doctor by Hospital Name", async () => {
		const response = await doctorService.GetAllDoctorByHospital(
			"rumah sakit daerah"
		);
		expect(response.code).toBe(StatusCodes.OK);
	});

	it("Get Doctor Data", async () => {
		const response = await doctorService.GetDoctorData(doctorId);
		expect(response.code).toBe(StatusCodes.OK);
	});
});
