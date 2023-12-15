import { PrismaService } from "../prisma.service";
import { StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";

export class PatientService {
	private readonly prismaService: PrismaService;

	constructor() {
		this.prismaService = new PrismaService();
	}

	private error(err: unknown) {
		if (err instanceof Prisma.PrismaClientValidationError) {
			return { code: StatusCodes.BAD_REQUEST, response: "Bad Request" };
		}
		return { code: StatusCodes.INTERNAL_SERVER_ERROR, response: err };
	}

	async getPatientData(patientId: string) {
		try {
			const response = await this.prismaService.patient.findUnique({
				where: {
					id: patientId,
				},
			});
			if (!response) {
				return { code: StatusCodes.NOT_FOUND, response: "Patient not found" };
			}
			response.password = "";
			return { code: StatusCodes.OK, response: response };
		} catch (err) {
			return this.error(err);
		}
	}
}
