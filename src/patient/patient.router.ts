import express, { Request } from "express";
import { PatientHandler } from "./patient.handler";
import { authentication } from "../middleware/middleware";

interface CustomRequest extends Request {
	userId?: string;
	role?: string;
}

const patientRouter = express.Router();
const patientHandler = new PatientHandler();

// AUTH ROUTER
patientRouter.post("/auth/register", patientHandler.RegisterHandler);
patientRouter.post("/auth/login", patientHandler.LoginHandler);

// BASIC CRUD ROUTER

patientRouter.get("/:patientId", patientHandler.GetPatientDataHandler);

patientRouter.route("/").get(authentication, (req: CustomRequest, res) => {
	res.status(200).json({ role: req.role, userId: req.userId });
});

export { patientRouter };
