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
		}
		req.userId = checkToken.id;
		req.role = checkToken.role;
		next();
	} catch (err) {
		res.status(StatusCodes.EXPECTATION_FAILED).json("Token Missing");
	}
}
