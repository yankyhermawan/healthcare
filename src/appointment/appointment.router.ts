import express from "express";
import { AppointmentHandler } from "./appointment.handler";

const appointmentRouter = express.Router();
const appointmentHandler = new AppointmentHandler();

appointmentRouter
	.route("/")
	.get(appointmentHandler.getAppointmentByAppointmentIdHandler)
	.post(appointmentHandler.createAppointmentHandler);

appointmentRouter.get(
	"/:userId",
	appointmentHandler.getAppointmentByUserIdHandler
);

export { appointmentRouter };
