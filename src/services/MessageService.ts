import { prisma } from "../prisma";
import NodeCache from "node-cache";

type Message = {
	FirstName: string;
	LastName: string;
	Email: string;
	Message: string;
};

const CACHE_LIMIT = 2;
const dbCache = new NodeCache({ stdTTL: CACHE_LIMIT, checkperiod: 0.2 });
const Hash = "sha256";

export class MessageService {
	async execute({ FirstName, LastName, Email, Message }: Message) {
		// if email is not exists in database create new user
		const user = await prisma.users.findFirst({ where: { Email } });
		if (!user) {
			await prisma.users.create({
				data: {
					FirstName,
					LastName,
					Email,
					Messages: {
						create: {
							Message,
							Email,
							FirstName,
							LastName,
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
					FirstName,
					LastName,
				},
			});
		}
	}
	async getMessages() {
		if (dbCache.has(Hash)) {
			return JSON.stringify(dbCache.get(Hash));
		}

		const messages = await prisma.messages.findMany();
		const users = await prisma.users.findMany();
		return messages.map((message) => {
			const user = users.find((user) => user.Email === message.Email);
			return {
				...message,
				FirstName: user.FirstName,
				LastName: user.LastName,
			};
		});
	}
}
