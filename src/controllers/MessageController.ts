import { Request, Response } from "express";
import { MessageService } from "../services/MessageService";

export class MessageController {
	async handle(req: Request, res: Response) {
		const { Email, Message, FirstName, LastName } = req.body;

		if (!Message || !FirstName || !LastName || !Email) {
			return res.status(400).json({
				message: "Please fill all the fields",
				fields: {
					message: !Message ? "Message is required" : "",
					firstName: !FirstName ? "First Name is required" : "",
					lastName: !LastName ? "Last Name is required" : "",
					Email: !Email ? "Email is required" : "",
				},
				error: true,
			});
		}

		const messageService = new MessageService();
		await messageService.execute({
			Email,
			Message,
			FirstName,
			LastName,
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
