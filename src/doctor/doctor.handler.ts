import { Request, Response } from "express";
import { DoctorAuthService } from "./doctor.auth.service";

const doctorAuthService = new DoctorAuthService();

export async function RegisterHandler(req: Request, res: Response) {
	const data = req.body;
	const response = await doctorAuthService.register(data);
	res.status(response.code).json(response.response);
}

export async function LoginHandler(req: Request, res: Response) {
	const data = req.body;
	const response = await doctorAuthService.login(data);
	res.status(response.code).json(response.response);
}