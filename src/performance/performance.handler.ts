import { NextFunction, Request, Response } from "express";
import { PerformanceService } from "./performance.service";
import { CreatePerformance } from "./performance.interface";

const performanceService = new PerformanceService();

export class PerformanceHandler {
	async CreatePerformance(req: Request, res: Response, next: NextFunction) {
		const data: CreatePerformance = req.body;
		const response = await performanceService.createPerformance(data);
		res.status(response.code).json(response.response);
	}

	async getDoctorPerformance(req: Request, res: Response, next: NextFunction) {
		const doctorId = req.params.doctorId;
		const response = await performanceService.getDoctorPerformance(doctorId);
		res.status(response.code).json(response.response);
	}

	async getDoctorRating(req: Request, res: Response) {
		const doctorId = req.params.doctorId;
		const response = await performanceService.getAverageRating(doctorId);
		res.status(response.code).json(response.response);
	}
}
