import { PrismaService } from "../prisma.service";
import { Login, Register } from "./patient.interface";
import { StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class PatientAuthService {
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

	async register(data: Register) {
		try {
			// CHECK IF PATIENT IS EXIST
			const isExist = await this.prismaService.patient.findUnique({
				where: {
					username: data.username,
				},
			});
			if (isExist) {
				return { code: StatusCodes.CONFLICT, response: "User already exists" };
			}

			// HASHING PASSWORD
			data.password = bcrypt.hashSync(
				data.password,
				Number(process.env["SALT"])
			);

			// CREATE PATIENT INTO DATABASE
			const response = await this.prismaService.patient.create({
				data: data,
			});
			response.password = "";
			return { code: StatusCodes.CREATED, response: response };
		} catch (err) {
			return this.error(err);
		}
	}

	async login(data: Login) {
		try {
			// CHECK USER EXISTS IN DATABASE
			const isExist = await this.prismaService.patient.findUnique({
				where: {
					username: data.username,
				},
			});
			if (!isExist) {
				return { code: StatusCodes.NOT_FOUND, response: "User not found" };
			}

			// CHECK PASSWORD MATCH
			const passwordMatch = bcrypt.compareSync(data.password, isExist.password);
			if (!passwordMatch) {
				return { code: StatusCodes.UNAUTHORIZED, response: "Invalid password" };
			}

			const payload = {
				id: isExist.id,
				username: isExist.username,
				role: "patient",
			};
			const token = jwt.sign(payload, String(process.env["JWT_KEY"]), {
				algorithm: "HS256",
				expiresIn: "12h",
			});
			const returnValue = {
				id: isExist.id,
				token: token,
				role: "patient",
			};
			return { code: StatusCodes.OK, response: returnValue };
		} catch (err) {
			return this.error(err);
		}
	}
}
