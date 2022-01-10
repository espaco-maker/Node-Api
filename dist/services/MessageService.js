"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const prisma_1 = require("../prisma");
class MessageService {
    async execute({ FirstName, LastName, Email, Message }) {
        // if email is not exists in database create new user
        const user = await prisma_1.prisma.users.findFirst({ where: { Email } });
        if (!user) {
            await prisma_1.prisma.users.create({
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
            await prisma_1.prisma.messages.create({
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
        const messages = await prisma_1.prisma.messages.findMany();
        const users = await prisma_1.prisma.users.findMany();
        return messages.map((message) => {
            const user = users.find((user) => user.Email === message.Email);
            return Object.assign(Object.assign({}, message), { FirstName: user.FirstName, LastName: user.LastName });
        });
    }
}
exports.MessageService = MessageService;
