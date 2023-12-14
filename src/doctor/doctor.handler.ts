import { Request, Response } from "express";
import { DoctorAuthService } from "./doctor.auth.service";

const doctorService = new DoctorAuthService();

export async function RegisterHandler(req: Request, res: Response) {
	const data = req.body;
	const response = await doctorService.register(data);
	res.status(response.code).json(response.response);
}

export async function LoginHandler(req: Request, res: Response) {
	const data = req.body;
	const response = await doctorService.login(data);
	res.status(response.code).json(response.response);
}
