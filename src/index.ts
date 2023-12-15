import express from "express";
import { doctorRouter } from "./doctor/doctor.router";
import { patientRouter } from "./patient/patient.router";
import { appointmentRouter } from "./appointment/appointment.router";
// import { WindowDefender } from "./middleware/middleware";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
// app.use(WindowDefender);

app.use("/doctor", doctorRouter);
app.use("/patient", patientRouter);
app.use("/appointment", appointmentRouter);

app.listen(port, () => {
	console.log(`Listening on ${port}`);
});
