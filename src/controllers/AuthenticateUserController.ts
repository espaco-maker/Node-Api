import { AuthenticateUserService } from "../services/AuthenticateUserService";

export class AuthenticateUserController {
	async signup(req, res) {
		try {
			const response = await AuthenticateUserService.signup(req.body);
			return res.json({ response, success: true });
		} catch (error) {
			return res.status(400).json({ error: error.message, success: false });
		}
	}
	async login(req, res) {
		try {
			const response = await AuthenticateUserService.login(req.body);
			return res.json({ response, success: true });
		} catch (error) {
			return res.status(400).json({ error: error.message, success: false });
		}
	}
	async validateToken(req, res) {
		try {
			const response = await AuthenticateUserService.validateToken(
				req.body.token,
			);
			return res.json({ response, success: true });
		} catch (error) {
			return res.status(400).json({ error: error.message, success: false });
		}
	}
}
