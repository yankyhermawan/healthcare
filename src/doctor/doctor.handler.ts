import { Request, Response } from "express";
import { DoctorAuthService } from "./doctor.auth.service";
import { DoctorService } from "./doctor.service";

const doctorAuthService = new DoctorAuthService();
const doctorService = new DoctorService();

export class DoctorHandler {
	async RegisterHandler(req: Request, res: Response) {
		const data = req.body;
		const response = await doctorAuthService.register(data);
		res.status(response.code).json(response.response);
	}

	async LoginHandler(req: Request, res: Response) {
		const data = req.body;
		const response = await doctorAuthService.login(data);
		res.status(response.code).json(response.response);
	}

	async GetAllDoctorByHospitalHandler(req: Request, res: Response) {
		const hospitalName = req.query.hospital?.toString() || "";
		const response = await doctorService.GetAllDoctorByHospital(hospitalName);
		res.status(response.code).json(response.response);
	}

	async GetDoctorDataHandler(req: Request, res: Response) {
		const id = req.params.doctorId;
		const response = await doctorService.GetDoctorData(id);
		res.status(response.code).json(response.response);
	}
}
