import { prisma } from "../prisma";
import * as bcrypt from "bcrypt";
import * as webToken from "jsonwebtoken";

type AuthenticateUserLogin = {
	email: string;
	password: string;
};

type AuthenticateUserSignup = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export class AuthenticateUserService {
	static async signup(data: AuthenticateUserSignup) {
		const AuthenticateUser = prisma.usersSignup;

		if (!data.email || !data.password || !data.firstName || !data.lastName) {
			throw new Error();
		}

		const userExists = await AuthenticateUser.findFirst({
			where: {
				Email: data.email,
			},
		});

		if (userExists) {
			throw new Error("Usuário já existe");
		}

		const buffer = 10;
		const salt = await bcrypt.genSalt(buffer);
		const passwordHash = await bcrypt.hash(data.password, salt);

		const user = await AuthenticateUser.create({
			data: {
				Email: data.email,
				FirstName: data.firstName,
				LastName: data.lastName,
				Password: passwordHash,
			},
		});

		delete user.Password;
		return user;
	}

	static async login(data: AuthenticateUserLogin) {
		const AuthenticateUser = prisma.usersSignup;
		const user = await AuthenticateUser.findFirst({
			where: {
				Email: data.email,
			},
		});
		if (!user) {
			throw new Error("Usuário não encontrado");
		}
		const passwordMatched = await bcrypt.compare(data.password, user.Password);
		if (!passwordMatched) {
			throw new Error("Senha inválida");
		}
		const secret = process.env.JWT_SECRET;
		const token = webToken.sign({ userId: user.id }, secret, {
			expiresIn: "1d",
		});
		delete user.Password;
		return { user, token };
	}

	static async validateToken(token: string) {
		const secret = process.env.JWT_SECRET;
		const decoded = webToken.verify(token, secret);
		return !!decoded;
	}
}
