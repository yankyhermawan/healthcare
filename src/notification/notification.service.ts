import { PrismaService } from "../prisma.service";
import { CreateNotification } from "./notification.interface";
import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

export class NotificationService {
	private readonly prismaService: PrismaService;
	constructor() {
		this.prismaService = new PrismaService();
	}

	private error(err: unknown) {
		if (err instanceof Prisma.PrismaClientValidationError) {
			return { code: StatusCodes.BAD_REQUEST, response: "Invalid request" };
		}
		return { code: StatusCodes.INTERNAL_SERVER_ERROR, response: err };
	}

	async createNotification(data: CreateNotification) {
		try {
			const response = await this.prismaService.notification.create({
				data: data,
			});
			return { code: StatusCodes.CREATED, response: response.appointmentId };
		} catch (err) {
			return this.error(err);
		}
	}

	async getNotification(targetId: string) {
		try {
			const response = await this.prismaService.notification.findMany({
				where: {
					targetId: targetId,
				},
			});
			if (!response) {
				return {
					code: StatusCodes.NOT_FOUND,
					response: "No notification found",
				};
			}
			return { code: StatusCodes.OK, response: response };
		} catch (err) {
			return this.error(err);
		}
	}

	async readNotification(targetId: string) {
		try {
			const response = await this.prismaService.notification.findMany({
				where: {
					targetId: targetId,
					isRead: false,
				},
			});
			if (!response) {
				return {
					code: StatusCodes.NOT_FOUND,
					response: "No notification found",
				};
			}
			const updated = await this.prismaService.notification.updateMany({
				where: {
					targetId: targetId,
					isRead: false,
				},
				data: {
					isRead: true,
				},
			});
			return {
				code: StatusCodes.OK,
				response: updated,
			};
		} catch (err) {
			return this.error(err);
		}
	}
}
