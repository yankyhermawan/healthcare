import express from "express";
import { PerformanceHandler } from "./performance.handler";
import {
	PatientGuard,
	authentication,
	authorization,
} from "../middleware/middleware";

const performanceRouter = express.Router();
const performanceHandler = new PerformanceHandler();

performanceRouter.post(
	"/create",
	authentication,
	authorization,
	PatientGuard,
	performanceHandler.CreatePerformance
);
performanceRouter.get(
	"/:doctorId",
	authentication,
	authorization,
	performanceHandler.getDoctorPerformance
);
performanceRouter.get(
	"/average/:doctorId",
	authentication,
	performanceHandler.getDoctorRating
);

export { performanceRouter };
