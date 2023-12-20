import express from "express";
import { AppointmentHandler } from "./appointment.handler";
import {
	authentication,
	DoctorGuard,
	PatientGuard,
} from "../middleware/middleware";

const appointmentRouter = express.Router();
const appointmentHandler = new AppointmentHandler();

appointmentRouter
	.route("/")
	.get(authentication, appointmentHandler.getAppointmentByAppointmentIdHandler)
	.post(
		authentication,
		PatientGuard,
		appointmentHandler.createAppointmentHandler
	)
	.patch(
		authentication,
		DoctorGuard,
		appointmentHandler.changeAppointmentStatus
	);

appointmentRouter.get(
	"/:userId",
	appointmentHandler.getAppointmentByUserIdHandler
);

appointmentRouter.get("/queue/param", appointmentHandler.getQueueNumberHandler);
export { appointmentRouter };
