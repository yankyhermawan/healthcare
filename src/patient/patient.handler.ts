import { Request, Response } from "express";
import { PatientAuthService } from "./patient.auth.service";
import { PatientService } from "./patient.service";

const patientAuthService = new PatientAuthService();
const patientService = new PatientService();

export class PatientHandler {
	async RegisterHandler(req: Request, res: Response) {
		const data = req.body;
		const response = await patientAuthService.register(data);
		res.status(response.code).json(response.response);
	}

	async LoginHandler(req: Request, res: Response) {
		const data = req.body;
		const response = await patientAuthService.login(data);
		res.status(response.code).json(response.response);
	}

	async GetPatientDataHandler(req: Request, res: Response) {
		const id = req.params.patientId;
		const response = await patientService.getPatientData(id);
		res.status(response.code).json(response.response);
	}
}
