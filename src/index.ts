import express from "express";
import { doctorRouter } from "./doctor/doctor.router";
import { patientRouter } from "./patient/patient.router";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.use("/doctor", doctorRouter);
app.use("/patient", patientRouter);

app.listen(port, () => {
	console.log(`Listening on ${port}`);
});
