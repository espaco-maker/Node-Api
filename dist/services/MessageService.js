"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const prisma_1 = require("../prisma");
const node_cache_1 = __importDefault(require("node-cache"));
const CACHE_LIMIT = 1;
const dbCache = new node_cache_1.default({ stdTTL: CACHE_LIMIT, checkperiod: 0.2 });
const mySqlQuery = "SELECT power as repeatedTimes, COUNT(power) FROM HERO GROUP BY power";
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
        if (dbCache.has(mySqlQuery)) {
            return JSON.stringify(dbCache.get(mySqlQuery));
            return;
        }
        const messages = await prisma_1.prisma.messages.findMany();
        const users = await prisma_1.prisma.users.findMany();
        return messages.map((message) => {
            const user = users.find((user) => user.Email === message.Email);
            return Object.assign(Object.assign({}, message), { FirstName: user.FirstName, LastName: user.LastName });
        });
    }
}
exports.MessageService = MessageService;
