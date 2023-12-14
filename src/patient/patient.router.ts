import express from "express";
import { RegisterHandler, LoginHandler } from "./patient.handler";

const patientRouter = express.Router();

patientRouter.post("/auth/register", RegisterHandler);
patientRouter.post("/auth/login", LoginHandler);

export { patientRouter };
