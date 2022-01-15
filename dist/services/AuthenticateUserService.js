"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserService = void 0;
const prisma_1 = require("../prisma");
const bcrypt = __importStar(require("bcrypt"));
const webToken = __importStar(require("jsonwebtoken"));
class AuthenticateUserService {
    static async signup(data) {
        const AuthenticateUser = prisma_1.prisma.usersSignup;
        if (!data.Email || !data.Password || !data.FirstName || !data.LastName) {
            throw new Error("Dados inválidos");
        }
        const userExists = await AuthenticateUser.findFirst({
            where: {
                Email: data.Email,
            },
        });
        if (userExists) {
            throw new Error("Usuário já existe");
        }
        const buffer = 10;
        const salt = await bcrypt.genSalt(buffer);
        const PasswordHash = await bcrypt.hash(data.Password, salt);
        const user = await AuthenticateUser.create({
            data: {
                Email: data.Email,
                FirstName: data.FirstName,
                LastName: data.LastName,
                Password: PasswordHash,
            },
        });
        delete user.Password;
        return user;
    }
    static async login(data) {
        const AuthenticateUser = prisma_1.prisma.usersSignup;
        const user = await AuthenticateUser.findFirst({
            where: {
                Email: data.Email,
            },
        });
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        const PasswordMatched = await bcrypt.compare(data.Password, user.Password);
        if (!PasswordMatched) {
            throw new Error("Senha inválida");
        }
        const secret = process.env.JWT_SECRET;
        const token = webToken.sign({ userId: user.id }, secret, {
            expiresIn: "1d",
        });
        delete user.Password;
        return { user, token };
    }
    static async validateToken(token) {
        const secret = process.env.JWT_SECRET;
        const decoded = webToken.verify(token, secret);
        return !!decoded;
    }
}
exports.AuthenticateUserService = AuthenticateUserService;
