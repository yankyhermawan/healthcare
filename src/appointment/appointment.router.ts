import express from "express";
import { AppointmentHandler } from "./appointment.handler";

const appointmentRouter = express.Router();
const appointmentHandler = new AppointmentHandler();

appointmentRouter
	.route("/")
	.get(appointmentHandler.getAppointmentByAppointmentIdHandler)
	.post(appointmentHandler.createAppointmentHandler)
	.patch(appointmentHandler.changeAppointmentStatus);

appointmentRouter.get(
	"/:userId",
	appointmentHandler.getAppointmentByUserIdHandler
);

appointmentRouter.get("/antri", appointmentHandler.getAppointmentQueue);
export { appointmentRouter };
