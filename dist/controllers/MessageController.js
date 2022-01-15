"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const MessageService_1 = require("../services/MessageService");
class MessageController {
    async handle(req, res) {
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
        const messageService = new MessageService_1.MessageService();
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
        const messageService = new MessageService_1.MessageService();
        const messages = await messageService.getMessages();
        return res.json({
            messages,
            error: false,
        });
    }
}
exports.MessageController = MessageController;
