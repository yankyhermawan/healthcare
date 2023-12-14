import express from "express";
import { LoginHandler, RegisterHandler } from "./doctor.handler";

const doctorRouter = express.Router();

doctorRouter.post("/auth/register", RegisterHandler);
doctorRouter.post("/auth/login", LoginHandler);

export { doctorRouter };
