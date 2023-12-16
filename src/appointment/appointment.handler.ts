import { AppointmentService } from "./appointment.service";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const appointmentService = new AppointmentService();

export class AppointmentHandler {
	async createAppointmentHandler(req: Request, res: Response) {
		const data = req.body;
		const response = await appointmentService.createAppointment(data);
		res.status(response.code).json(response.response);
	}

	async getAppointmentByAppointmentIdHandler(req: Request, res: Response) {
		const appointmentId = req.query.appointmentId?.toString() || "";
		if (!appointmentId) {
			res.status(StatusCodes.BAD_REQUEST).json("Invalid appointmentId");
		}
		const response = await appointmentService.getAppointmentByAppointmentId(
			appointmentId
		);
		res.status(response.code).json(response.response);
	}

	async getAppointmentByUserIdHandler(req: Request, res: Response) {
		const userId = req.params.userId;
		const response = await appointmentService.getAppointmentByUserId(userId);
		res.status(response.code).json(response.response);
	}

	async changeAppointmentStatus(req: Request, res: Response) {
		const appointmentId = req.query.appointmentId?.toString() || "";
		if (!appointmentId) {
			res.status(StatusCodes.BAD_REQUEST).json("Invalid query");
		}
		const data = req.body;
		const response = await appointmentService.changeAppointmentStatus(
			appointmentId,
			data
		);
		res.status(response.code).json(response.response);
	}

	async getAppointmentQueue(req: Request, res: Response) {
		const patientId = req.query.patientId?.toString() || "";
		const doctorId = req.query.doctorId?.toString() || "";
		if (!doctorId || !patientId) {
			res.status(StatusCodes.BAD_REQUEST).json("Invalid query");
		}
		const response = await appointmentService.getQueueNumber(
			doctorId,
			patientId
		);
		res.status(response.code).json(response.response);
	}
}
