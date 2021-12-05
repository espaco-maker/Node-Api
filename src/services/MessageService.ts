import { prisma } from "../prisma";

type Message = {
	Name: string;
	Email: string;
	Message: string;
};

export class MessageService {
	async execute({ Name, Email, Message }: Message) {
		// if email is not exists in database create new user
		const user = await prisma.users.findFirst({ where: { Email } });
		if (!user) {
			await prisma.users.create({
				data: {
					Name,
					Email,
					Messages: {
						create: {
							Message,
							Email,
							Name,
						},
					},
				},
			});
		}
		// if email is exists in database create new message
		else {
			await prisma.messages.create({
				data: {
					Message,
					Email,
					Name,
				},
			});
		}
	}
	async getMessages() {
		const messages = await prisma.messages.findMany();
		const users = await prisma.users.findMany();
		return messages.map((message) => {
			const user = users.find((user) => user.Email === message.Email);
			return {
				...message,
				Name: user.Name,
			};
		});
	}
}
