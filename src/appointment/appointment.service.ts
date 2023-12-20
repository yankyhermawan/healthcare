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
			return { code: StatusCodes.BAD_REQUEST, response: "Bad request" };
		}
		return { code: StatusCodes.INTERNAL_SERVER_ERROR, response: String(err) };
	}

	async createAppointment(data: CreateAppointment) {
		try {
			const response = await this.prismaService.appointmentPatientDoctor.create(
				{
					data: {
						...data,
						createdAt: new Date(),
					},
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
			const date = new Date();
			const response =
				await this.prismaService.appointmentPatientDoctor.findMany({
					orderBy: {
						createdAt: "asc",
					},
					where: {
						OR: [{ patientId: userId }, { doctorId: userId }],
						createdAt: {
							lte: new Date(date),
							gte: new Date(date.setHours(0, 0, 0, 0)),
						},
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

	async setAppointmentStatusOngoing(appointmentId: string, data: UpdateStatus) {
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
			const status = () => {
				if (data.status.toLowerCase() === "ongoing") {
					return Status.Ongoing;
				}
				return Status.Pending;
			};
			const changed = await this.prismaService.appointmentPatientDoctor.update({
				where: {
					id: appointmentId,
				},
				data: {
					status: status() as Status,
					calledAt: new Date(),
				},
			});
			return { code: StatusCodes.OK, response: changed.id };
		} catch (err) {
			return this.error(err);
		}
	}

	async setAppointmentStatusDone(appointmentId: string, data: UpdateStatus) {
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
			const status = () => {
				if (data.status.toLowerCase() === "done") {
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
					doneAt: new Date(),
				},
			});
			return { code: StatusCodes.OK, response: changed.id };
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
						createdAt: "asc",
					},
					where: {
						doctorId: doctorId,
						createdAt: {
							lte: new Date(date),
							gte: new Date(date.setHours(0, 0, 0, 0)),
						},
					},
				});
			const index = allQueue.findIndex(
				(queue) => queue.patientId === patientID
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

	async getOngoingIndex(doctorId: string) {
		const response = await this.prismaService.appointmentPatientDoctor.findMany(
			{
				orderBy: {
					createdAt: "asc",
				},
				where: {
					doctorId: doctorId,
				},
			}
		);
		const ongoingIndex = response.findIndex(
			(data) => data.status === Status.Ongoing
		);
		const retVal = {
			alldata: response,
			index: ongoingIndex + 1,
		};
		if (ongoingIndex + 1 > 0) {
			return { code: StatusCodes.OK, response: retVal };
		}
		let latestDoneIndex = -1;
		if (ongoingIndex === -1) {
			response.forEach((appointment, index) => {
				if (
					appointment.status === Status.Done &&
					(latestDoneIndex === -1 || index > latestDoneIndex)
				) {
					latestDoneIndex = index;
				}
			});
		}
		if (latestDoneIndex === -1) {
			latestDoneIndex = 0;
		}
		const returnValue = {
			alldata: response,
			index: latestDoneIndex,
		};
		return { code: StatusCodes.OK, response: returnValue };
	}

	async getTime(appointmentId: string) {
		const response =
			await this.prismaService.appointmentPatientDoctor.findUnique({
				where: {
					id: appointmentId,
				},
			});
		const waitTime = () => {
			if (!response?.calledAt || !response?.createdAt) {
				return null;
			}
			return this.calculateTimeDifferenceInMinutes(
				response.calledAt,
				response.createdAt
			);
		};
		const serviceTime = () => {
			if (!response?.calledAt || !response?.doneAt) {
				return null;
			}
			return this.calculateTimeDifferenceInMinutes(
				response.doneAt,
				response.calledAt
			);
		};
		const returnValue = {
			waitTime: waitTime(),
			serviceTime: serviceTime(),
		};
		return returnValue;
	}

	private calculateTimeDifferenceInMinutes(startDate: Date, endDate: Date) {
		const timeDifferenceInMilliseconds = Math.abs(
			endDate.getTime() - startDate.getTime()
		);
		const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);

		return timeDifferenceInMinutes;
	}
}
