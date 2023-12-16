import { Server } from "socket.io";
import { Server as httpServer } from "http";
import { Identify, Notification } from "./socket.interface";
import { NotificationService } from "../notification/notification.service";
import { StatusCodes } from "http-status-codes";

const notificationService = new NotificationService();

const initSocket = (server: httpServer) => {
	const io = new Server(server, {
		cors: {
			origin: true,
			methods: ["GET", "POST"],
			credentials: true,
		},
	});

	io.on("connection", (socket) => {
		socket.on("identifyUser", (data: Identify) => {
			socket.join(data.userId);
		});

		socket.on("createAppointment", async (data: Notification) => {
			const targetId = data.targetId;
			const notification = await notificationService.createNotification(data);
			if (notification.code !== StatusCodes.CREATED) {
				io.to(data.senderId).emit(
					"notification",
					"Error creating notification"
				);
			}
			io.to(targetId).emit("notification", {
				...data,
				notificationId: notification.response,
			});
		});
	});
};

export default initSocket;
