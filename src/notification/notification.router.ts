import express from "express";
import { NotificationHandler } from "./notification.handler";

const notificationRouter = express.Router();
const notificationHandler = new NotificationHandler();

notificationRouter
	.route("/")
	.get(notificationHandler.getNotificationHandler)
	.patch(notificationHandler.readNotification);

export { notificationRouter };
