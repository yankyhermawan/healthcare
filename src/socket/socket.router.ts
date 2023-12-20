import { Server, Socket } from "socket.io";
import { Server as httpServer } from "http";
import {
	CreateAppointmentInterface,
	Identify,
	UpdateAppointmentInterface,
	Queue,
} from "./socket.interface";
import { StatusCodes } from "http-status-codes";
import { AppointmentService } from "../appointment/appointment.service";
import { Status } from "@prisma/client";

const appointmentService = new AppointmentService();

const initSocket = (server: httpServer) => {
	const io = new Server(server, {
		cors: {
			origin: true,
			methods: ["GET", "POST"],
			credentials: true,
		},
	});

	io.on("connection", (socket: Socket) => {
		socket.on("identifyUser", async (data: Identify) => {
			socket.join(data.userId);
		});

		// METHOD TO CREATE NEW APPOINTMENT
		// USED BY HEALTHCARE PROVIDER TO GET APPOINTMENT LIST
		socket.on("newAppointment", async (data: CreateAppointmentInterface) => {
			const appointment = await appointmentService.createAppointment(data);
			data.status = Status.Pending;
			if (appointment.code !== StatusCodes.CREATED) {
				io.to(data.patientId).emit(
					"newAppointment",
					"Failed to create appointment"
				);
			}
			io.to(data.doctorId).emit("newAppointment", appointment);
		});

		// METHOD TO GET QUEUE NUMBER
		// USED BY PATIENT TO SEE THEIR TURN
		socket.on("getQueue", async (data: Queue) => {
			const queue = await appointmentService.getQueueNumber(
				data.doctorId,
				data.patientId
			);
			if (queue.code !== StatusCodes.OK) {
				io.to(data.patientId).emit("getQueue", "Error get queue number");
			}
			io.to(data.patientId).emit("getQueue", queue.response);
		});

		// METHOD FOR PATIENT TO VIEW CURRENT QUEUE NUMBER

		socket.on("currentQueue", async (data: Queue) => {
			console.log(data);
			const ongoingQueueNumber = await appointmentService.getOngoingIndex(
				data.doctorId
			);
			ongoingQueueNumber.response.alldata.map((data) => {
				io.to(data.patientId).emit(
					"currentQueue",
					ongoingQueueNumber.response.index
				);
			});
		});

		// METHOD TO UPDATE APPOINTMENT TO ONGOING
		// WHEN HEALTHCARE PROVIDER CALL THE QUEUE NUMBER 1, NOTIFY THE PATIENT, SEND
		socket.on("callPatient", async (data: UpdateAppointmentInterface) => {
			const updated = await appointmentService.setAppointmentStatusOngoing(
				data.id,
				{ status: Status.Ongoing }
			);
			if (updated.code !== StatusCodes.OK) {
				io.to(data.doctorId).emit("callPatient", "Error updating appointment");
			}
			io.to(data.patientId).emit("notification", "Now is your turn");
			const ongoingQueueNumber = await appointmentService.getOngoingIndex(
				data.doctorId
			);
			ongoingQueueNumber.response.alldata.map((data) => {
				io.to(data.patientId).emit(
					"currentQueue",
					ongoingQueueNumber.response.index
				);
			});
			const updatedData = await appointmentService.getAppointmentByUserId(
				data.doctorId
			);
			io.to(data.doctorId).emit("updatedAppointment", updatedData.response);
		});

		// METHOD TO UPDATE APPOINTMENT TO DONE
		socket.on("patientDone", async (data: UpdateAppointmentInterface) => {
			await appointmentService.setAppointmentStatusDone(data.id, {
				status: Status.Done,
			});
			const updatedData = await appointmentService.getAppointmentByUserId(
				data.doctorId
			);
			io.to(data.doctorId).emit("updatedAppointment", updatedData.response);
		});
	});
};

export default initSocket;
