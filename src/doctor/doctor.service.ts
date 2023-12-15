import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

export class DoctorService {
	private readonly prismaService: PrismaService;

	constructor() {
		this.prismaService = new PrismaService();
	}

	private error(err: unknown) {
		if (err instanceof Prisma.PrismaClientValidationError) {
			return { code: StatusCodes.BAD_REQUEST, response: "Bad request" };
		}
		return { code: StatusCodes.INTERNAL_SERVER_ERROR, response: err };
	}

	async GetAllDoctorByHospital(hospitalName: string) {
		try {
			const response = await this.prismaService.doctor.findMany({
				where: {
					hospital: {
						contains: hospitalName,
					},
				},
			});
			if (!response) {
				return {
					code: StatusCodes.NOT_FOUND,
					response: `Doctor at ${hospitalName} not found`,
				};
			}
			response.map((res) => {
				res.password = "";
			});
			return { code: StatusCodes.OK, response: response };
		} catch (err) {
			return this.error(err);
		}
	}

	async GetDoctorData(doctorId: string) {
		try {
			const response = await this.prismaService.doctor.findUnique({
				where: {
					id: doctorId,
				},
			});
			if (!response) {
				return { code: StatusCodes.NOT_FOUND, response: "Doctor not found" };
			}
			response.password = "";
			return { code: StatusCodes.OK, response: response };
		} catch (err) {
			return this.error(err);
		}
	}
}
