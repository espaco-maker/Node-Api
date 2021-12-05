import { Request, Response } from "express";
import { MessageService } from "../services/MessageService";
interface Data {
	message: string;
	name: string;
	email: string;
}

export class MessageController {
	async handle(req: Request, res: Response) {
		const { email, message, name } = req.body;
		if (!message || !name || !email) {
			return res.status(400).json({
				message: "Please fill all the fields",
				fields: {
					message: !message ? "Message is required" : "",
					name: !name ? "Name is required" : "",
					email: !email ? "Email is required" : "",
				},
				error: true,
			});
		}

		const messageService = new MessageService();
		await messageService.execute({
			Email: email,
			Message: message,
			Name: name,
		});
		return res.status(200).json({
			message: "Message sent successfully",
			error: false,
		});
	}

	async getMessages(req, res) {
		const messageService = new MessageService();
		const messages = await messageService.getMessages();
		return res.status(200).json({
			messages,
			error: false,
		});
	}
}
