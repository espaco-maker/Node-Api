"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserController = void 0;
const AuthenticateUserService_1 = require("../services/AuthenticateUserService");
class AuthenticateUserController {
    async singup(req, res) {
        try {
            const response = await AuthenticateUserService_1.AuthenticateUserService.singup(req.body);
            return res.json({ response, success: true });
        }
        catch (error) {
            return res.status(400).json({ error: error.message, success: false });
        }
    }
    async login(req, res) {
        try {
            const response = await AuthenticateUserService_1.AuthenticateUserService.login(req.body);
            return res.json({ response, success: true });
        }
        catch (error) {
            return res.status(400).json({ error: error.message, success: false });
        }
    }
    async validateToken(req, res) {
        try {
            const response = await AuthenticateUserService_1.AuthenticateUserService.validateToken(req.body.token);
            return res.json({ response, success: true });
        }
        catch (error) {
            return res.status(400).json({ error: error.message, success: false });
        }
    }
}
exports.AuthenticateUserController = AuthenticateUserController;
