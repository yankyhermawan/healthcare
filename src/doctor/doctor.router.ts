import express from "express";
import { DoctorHandler } from "./doctor.handler";
import { authentication } from "../middleware/middleware";

const doctorRouter = express.Router();
const doctorHandler = new DoctorHandler();

doctorRouter.post("/auth/register", doctorHandler.RegisterHandler);
doctorRouter.post("/auth/login", doctorHandler.LoginHandler);

doctorRouter.get(
	"/:doctorId",
	authentication,
	doctorHandler.GetDoctorDataHandler
);
doctorRouter.get("/", doctorHandler.GetAllDoctorByHospitalHandler);

export { doctorRouter };
