import { PrismaService } from "../prisma.service";
import { CreatePerformance } from "./performance.interface";
import { AppointmentService } from "../appointment/appointment.service";
import { StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";

export class PerformanceService {
	private readonly prismaService: PrismaService;
	private readonly appointmentService: AppointmentService;

	constructor() {
		this.prismaService = new PrismaService();
		this.appointmentService = new AppointmentService();
	}

	private error(err: unknown) {
		if (
			err instanceof Prisma.PrismaClientValidationError ||
			err instanceof Prisma.PrismaClientKnownRequestError
		) {
			return { code: StatusCodes.BAD_REQUEST, response: "Bad request" };
		}
		return { code: StatusCodes.INTERNAL_SERVER_ERROR, response: err };
	}

	async createPerformance(data: CreatePerformance) {
		try {
			const timePerformance = await this.appointmentService.getTime(
				data.appointmentId
			);
			const response = await this.prismaService.performance.create({
				data: {
					...data,
					waitTime: timePerformance.waitTime,
					serviceTime: timePerformance.serviceTime,
				},
			});
			return { code: StatusCodes.CREATED, response: response };
		} catch (err) {
			return this.error(err);
		}
	}

	async getDoctorPerformance(doctorId: string) {
		try {
			const response = await this.prismaService.performance.findMany({
				where: {
					doctorId: doctorId,
				},
			});
			if (!response) {
				return { code: StatusCodes.NOT_FOUND, response: response };
			}
			return { code: StatusCodes.OK, response: response };
		} catch (err) {
			return this.error(err);
		}
	}

	async getPerformanceByPerformanceId(appointmentId: string) {
		try {
			const response = await this.prismaService.performance.findUnique({
				where: {
					appointmentId: appointmentId,
				},
			});
			if (!response) {
				return {
					code: StatusCodes.NOT_FOUND,
					respons: "Record not found",
				};
			}
			return {
				code: StatusCodes.OK,
				response: response,
			};
		} catch (err) {
			return this.error(err);
		}
	}

	async getAverageRating(doctorId: string) {
		try {
			const response = await this.prismaService.performance.findMany({
				where: {
					doctorId: doctorId,
				},
			});
			if (response.length === 0) {
				return { code: StatusCodes.BAD_REQUEST, response: "No record found" };
			}
			const totalScore = response.reduce(
				(sum, performance) => sum + performance.score,
				0
			);
			const averageScore = totalScore > 0 ? totalScore / response.length : 0;
			return { code: StatusCodes.OK, response: averageScore };
		} catch (err) {
			return this.error(err);
		}
	}
}
