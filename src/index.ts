import express from "express";
import { doctorRouter } from "./doctor/doctor.router";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.use("/doctor", doctorRouter);

app.listen(port, () => {
	console.log(`Listening on ${port}`);
});
