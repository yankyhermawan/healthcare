import express from "express";
import { doctorRouter } from "./doctor/doctor.router";
import { patientRouter } from "./patient/patient.router";
import { appointmentRouter } from "./appointment/appointment.router";
import { performanceRouter } from "./performance/performance.router";
// import { WindowDefender } from "./middleware/middleware"; //uncomment this line to prevent user request from cmd
import cors from "cors";
import { notificationRouter } from "./notification/notification.router";
import { createServer } from "http";
import initSocket from "./socket/socket.router";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
// app.use(WindowDefender); //uncomment this line to prevent user request from cmd

const server = createServer(app);
initSocket(server);

app.use("/doctor", doctorRouter);
app.use("/patient", patientRouter);
app.use("/appointment", appointmentRouter);
app.use("/notification", notificationRouter);
app.use("/performance", performanceRouter);

server.listen(port, () => {
	console.log(`Listening on ${port}`);
});
