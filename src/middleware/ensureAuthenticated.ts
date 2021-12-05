import { Request, Response, NextFunction, response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function ensureAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const authToken = req.headers.authorization;
	if (!authToken) {
		response.status(401).json({ message: "token invalid." });
	}
	// como o token vem no formato Bearer, precisamos separar
	const [, token] = authToken.split(" ");
	try {
		const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
    req.user_id = sub;
		return next();
	} catch (err) {
		response.status(401).json({ message: "token expired." });
	}

	res.redirect("/login");
}
