import { Request, Response } from "express";
import { PatientAuthService } from "./patient.auth.service";

const patientAuthService = new PatientAuthService();

export async function RegisterHandler(req: Request, res: Response) {
	const data = req.body;
	const response = await patientAuthService.register(data);
	res.status(response.code).json(response.response);
}

export async function LoginHandler(req: Request, res: Response) {
	const data = req.body;
	const response = await patientAuthService.login(data);
	res.status(response.code).json(response.response);
}
