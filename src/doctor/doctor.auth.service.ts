import { PrismaService } from "../prisma.service";
import { Login, Register } from "./doctor.interface";
import { StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class DoctorAuthService {
	private readonly prismaService: PrismaService;

	constructor() {
		this.prismaService = new PrismaService();
	}

	private error(err: unknown) {
		if (err instanceof Prisma.PrismaClientValidationError) {
			return { code: StatusCodes.BAD_REQUEST, response: "Invalid request" };
		}
		return {
			code: StatusCodes.INTERNAL_SERVER_ERROR,
			response: "Server Error",
		};
	}

	async register(data: Register) {
		try {
			// CHECK IF USER EXISTS
			const isExist = await this.prismaService.doctor.findUnique({
				where: {
					username: data.username,
				},
			});
			if (isExist) {
				return {
					code: StatusCodes.CONFLICT,
					response: "Username already exists",
				};
			}
			// HASHING PASSWORD
			data.password = bcrypt.hashSync(
				data.password,
				Number(process.env["SALT"])
			);
			const response = await this.prismaService.doctor.create({
				data: data,
			});
			data.password = "";
			return { code: StatusCodes.CREATED, response: response.id };
		} catch (err) {
			return this.error(err);
		}
	}

	async login(data: Login) {
		try {
			// CHECK IF USER EXISTS
			const isExist = await this.prismaService.doctor.findUnique({
				where: {
					username: data.username,
				},
			});
			if (!isExist) {
				return { code: StatusCodes.NOT_FOUND, response: "User not found" };
			}
			// CHECK IF PASSWORD MATCH
			const passwordMatch = bcrypt.compareSync(data.password, isExist.password);
			if (!passwordMatch) {
				return {
					code: StatusCodes.UNAUTHORIZED,
					response: "Password does not match",
				};
			}

			// SIGNING JWT TOKEN
			const jwtKey = String(process.env["JWT_KEY"]);
			const payload = {
				id: isExist.id,
				username: isExist.username,
				role: "doctor",
			};
			const token = jwt.sign(payload, jwtKey, {
				algorithm: "HS256",
				expiresIn: "12h",
			});
			const returnValue = {
				id: isExist.id,
				token: token,
				role: "doctor",
			};
			return { code: StatusCodes.OK, response: returnValue };
		} catch (err) {
			return this.error(err);
		}
	}
}
