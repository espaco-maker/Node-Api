"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserController = void 0;
const AuthenticateUserService_1 = require("../services/AuthenticateUserService");
class AuthenticateUserController {
    async signup(req, res) {
        try {
            const { FirstName, LastName, Email, Password } = req.body;
            if (!FirstName || !LastName || !Email || !Password) {
                return res.status(400).send({
                    message: "Dados inválidos",
                    filds: {
                        FirstName: FirstName ? "" : "FirtName is required",
                        LastName: LastName ? "" : "LastName is required",
                        Email: Email ? "" : "email is required",
                        Password: Password ? "" : "password is required",
                    },
                });
            }
            const response = await AuthenticateUserService_1.AuthenticateUserService.signup(req.body);
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
