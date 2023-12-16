import { PrismaService } from "../prisma.service";
import { StatusCodes } from "http-status-codes";
import { CreateAppointment, UpdateStatus } from "./appointment.interface";
import { Prisma } from "@prisma/client";
import { Status } from "@prisma/client";

export class AppointmentService {
	private readonly prismaService: PrismaService;

	constructor() {
		this.prismaService = new PrismaService();
	}

	private error(err: unknown) {
		if (err instanceof Prisma.PrismaClientValidationError) {
			console.error(err);
			return { code: StatusCodes.BAD_REQUEST, response: "Bad request" };
		}
		return { code: StatusCodes.INTERNAL_SERVER_ERROR, response: err };
	}

	async createAppointment(data: CreateAppointment) {
		try {
			const response = await this.prismaService.appointmentPatientDoctor.create(
				{
					data: data,
				}
			);
			return { code: StatusCodes.CREATED, response: response };
		} catch (err) {
			return this.error(err);
		}
	}

	async getAppointmentByAppointmentId(appointmentId: string) {
		try {
			const response =
				await this.prismaService.appointmentPatientDoctor.findUnique({
					where: {
						id: appointmentId,
					},
				});
			if (!response) {
				return {
					code: StatusCodes.NOT_FOUND,
					response: "Appointment not found",
				};
			}
			return { code: StatusCodes.OK, response: response };
		} catch (err) {
			return this.error(err);
		}
	}

	async getAppointmentByUserId(userId: string) {
		try {
			const response =
				await this.prismaService.appointmentPatientDoctor.findMany({
					where: {
						OR: [{ patientID: userId }, { doctorID: userId }],
					},
				});
			if (!response) {
				return {
					code: StatusCodes.NOT_FOUND,
					response: "Appointment not found",
				};
			}
			return { code: StatusCodes.OK, response: response };
		} catch (err) {
			return this.error(err);
		}
	}

	async changeAppointmentStatus(appointmentId: string, data: UpdateStatus) {
		try {
			const response =
				await this.prismaService.appointmentPatientDoctor.findUnique({
					where: { id: appointmentId },
				});
			if (!response) {
				return {
					code: StatusCodes.NOT_FOUND,
					response: "Appointment not found",
				};
			}
			console.log(data.status.toLowerCase());
			const status = () => {
				if (data.status.toLowerCase() === "ongoing") {
					return Status.Ongoing;
				} else if (data.status.toLowerCase() === "done") {
					return Status.Done;
				}
				return Status.Pending;
			};
			const changed = await this.prismaService.appointmentPatientDoctor.update({
				where: {
					id: appointmentId,
				},
				data: {
					status: status() as Status,
				},
			});
			return { code: StatusCodes.OK, response: changed };
		} catch (err) {
			return this.error(err);
		}
	}

	async getQueueNumber(doctorId: string, patientID: string) {
		try {
			const date = new Date();
			const allQueue =
				await this.prismaService.appointmentPatientDoctor.findMany({
					orderBy: {
						created: "asc",
					},
					where: {
						doctorID: doctorId,
						created: {
							lte: new Date(date),
							gte: new Date(date.setHours(0, 0, 0, 0)),
						},
						status: "Pending",
					},
				});
			const index = allQueue.findIndex(
				(queue) => queue.patientID === patientID
			);
			if (index === -1) {
				return {
					code: StatusCodes.NOT_FOUND,
					response: "Queue not found",
				};
			}
			return {
				code: StatusCodes.OK,
				response: {
					queueNumber: index + 1,
				},
			};
		} catch (err) {
			return this.error(err);
		}
	}
}
