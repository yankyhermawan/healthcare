import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

interface CustomRequest extends Request {
	userId?: string;
	role?: string;
}

export function WindowDefender(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (!req.headers["User-Agent"]) {
		res.status(StatusCodes.UNAUTHORIZED).json("Should using browser");
	}
	next();
}

export function authentication(
	req: CustomRequest,
	res: Response,
	next: NextFunction
) {
	try {
		const token = String(
			req.headers["authorization"]?.split(" ")[1].replace("'", "")
		);
		const checkToken =
			(jwt.verify(token, String(process.env["JWT_KEY"])) as JwtPayload) ||
			false;
		if (!checkToken) {
			res.status(StatusCodes.UNAUTHORIZED).json("Invalid token");
			return;
		}
		req.userId = checkToken.id;
		req.role = checkToken.role;
		next();
	} catch (err) {
		res.status(StatusCodes.EXPECTATION_FAILED).json("Token Missing");
		return;
	}
}

export function DoctorGuard(
	req: CustomRequest,
	res: Response,
	next: NextFunction
) {
	const role = req.role;
	if (role?.toLowerCase() !== "doctor") {
		res.status(StatusCodes.UNAUTHORIZED).json("Only doctor is allowed");
		return;
	}
	next();
}

export function PatientGuard(
	req: CustomRequest,
	res: Response,
	next: NextFunction
) {
	const role = req.role;
	if (role?.toLowerCase() !== "patient") {
		res.status(StatusCodes.UNAUTHORIZED).json("Only patient is allowed");
		return;
	}
	next();
}

export function authorization(
	req: CustomRequest,
	res: Response,
	next: NextFunction
) {
	const userId =
		req.params.doctorId ||
		req.params.patientid ||
		req.body.patientId ||
		req.body.doctorId;
	if (req.userId !== userId) {
		res.status(StatusCodes.UNAUTHORIZED).json("Can't access data");
		return;
	}
	next();
}
