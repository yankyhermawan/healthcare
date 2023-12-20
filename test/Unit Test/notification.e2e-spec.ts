import { StatusCodes } from "http-status-codes";
import { NotificationService } from "../../src/notification/notification.service";

const notificationService = new NotificationService();

const createNotification = {
	senderId: "e82ca00e-11a5-416d-8fb4-06cd8937043b",
	targetId: "ae9369ae-ecde-480a-9605-ccebf97aff50",
	message: "Now is your turn",
	appointmentId: "f52e5c5a-98a9-4306-a584-4b6cbd24a159",
};

describe("Notification", () => {
	it("Create a notification", async () => {
		const response = await notificationService.createNotification(
			createNotification
		);
		expect(response.code).toBe(StatusCodes.CREATED);
	});

	it("Get Notification by TargetId", async () => {
		const response = await notificationService.getNotification(
			createNotification.targetId
		);
		expect(response.code).toBe(StatusCodes.OK);
	});

	it("Change Notification status to Read", async () => {
		const response = await notificationService.readNotification(
			createNotification.targetId
		);
		expect(response.code).toBe(StatusCodes.OK);
	});
});
