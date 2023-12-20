import express from "express";
import { PatientHandler } from "./patient.handler";
import { authentication } from "../middleware/middleware";

const patientRouter = express.Router();
const patientHandler = new PatientHandler();

// AUTH ROUTER
patientRouter.post("/auth/register", patientHandler.RegisterHandler);
patientRouter.post("/auth/login", patientHandler.LoginHandler);

// BASIC CRUD ROUTER

patientRouter.get(
	"/:patientId",
	authentication,
	patientHandler.GetPatientDataHandler
);

export { patientRouter };
