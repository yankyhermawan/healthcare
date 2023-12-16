import express from "express";
import { doctorRouter } from "./doctor/doctor.router";
import { patientRouter } from "./patient/patient.router";
import { appointmentRouter } from "./appointment/appointment.router";
// import { WindowDefender } from "./middleware/middleware"; //uncomment this line to prevent user request from cmd
import cors from "cors";
import { notificationRouter } from "./notification/notification.router";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
// app.use(WindowDefender); //uncomment this line to prevent user request from cmd

app.use("/doctor", doctorRouter);
app.use("/patient", patientRouter);
app.use("/appointment", appointmentRouter);
app.use("/notification", notificationRouter);

app.listen(port, () => {
	console.log(`Listening on ${port}`);
});
