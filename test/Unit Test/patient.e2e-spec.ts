import { StatusCodes } from "http-status-codes";
import { PatientAuthService } from "../../src/patient/patient.auth.service";
import { PatientService } from "../../src/patient/patient.service";

const patientAuthService = new PatientAuthService();
const patientService = new PatientService();

const registerData = {
	username: "patienttest",
	password: "patienttest",
	name: "patient",
	imageURL: "abc",
};

const loginData = {
	username: "patienttest",
	password: "patienttest",
};

const patientId = "ae9369ae-ecde-480a-9605-ccebf97aff50";

describe("Patient Service", () => {
	it("Register Patient", async () => {
		const response = await patientAuthService.register(registerData);
		expect(response.code).toBe(StatusCodes.CREATED);
	});

	it("Login Patient", async () => {
		const response = await patientAuthService.login(loginData);
		expect(response.code).toBe(StatusCodes.OK);
	});

	it("Get Patient data", async () => {
		const response = await patientService.getPatientData(patientId);
		expect(response.code).toBe(StatusCodes.OK);
	});
});
