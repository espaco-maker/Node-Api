import { Request, Response } from "express";
import { MessageService } from "../services/MessageService";

export class MessageController {
	async handle(req: Request, res: Response) {
		const { email, message, firstName, lastName } = req.body;
		if (!message || !firstName || !lastName || !email) {
			return res.status(400).json({
				message: "Please fill all the fields",
				fields: {
					message: !message ? "Message is required" : "",
					firstName: !firstName ? "First Name is required" : "",
					lastName: !lastName ? "Last Name is required" : "",
					email: !email ? "Email is required" : "",
				},
				error: true,
			});
		}

		const messageService = new MessageService();
		await messageService.execute({
			Email: email,
			Message: message,
			FirstName: firstName,
			LastName: lastName,
		});
		return res.json({
			message: "Message sent successfully",
			error: false,
		});
	}

	async getMessages(req, res) {
		const messageService = new MessageService();
		const messages = await messageService.getMessages();
		return res.json({
			messages,
			error: false,
		});
	}
}
