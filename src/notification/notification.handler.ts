import { StatusCodes } from "http-status-codes";
import { NotificationService } from "./notification.service";
import { Request, Response } from "express";
export class NotificationHandler {
	private readonly notificationService: NotificationService;

	constructor() {
		this.notificationService = new NotificationService();
	}

	async getNotificationHandler(req: Request, res: Response) {
		const targetId = req.query.targetId?.toString() || "";
		if (!targetId)
			[res.status(StatusCodes.BAD_REQUEST).json("Invalid request")];
		const response = await this.notificationService.getNotification(targetId);
		res.status(response.code).json(response.response);
	}

	async readNotification(req: Request, res: Response) {
		const targetId = req.query.targetId?.toString() || "";
		if (!targetId) {
			res.status(StatusCodes.BAD_REQUEST).json("Invalid request");
		}
		const response = await this.notificationService.readNotification(targetId);
		res.status(response.code).json(response.response);
	}
}
