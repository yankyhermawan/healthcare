import express from "express";
import { DoctorHandler } from "./doctor.handler";

const doctorRouter = express.Router();
const doctorHandler = new DoctorHandler();

doctorRouter.post("/auth/register", doctorHandler.RegisterHandler);
doctorRouter.post("/auth/login", doctorHandler.LoginHandler);

doctorRouter.get("/:doctorId", doctorHandler.GetAllDoctorByHospitalHandler);
doctorRouter.get("/", doctorHandler.GetAllDoctorByHospitalHandler);

export { doctorRouter };
