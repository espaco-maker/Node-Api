import { prisma } from "../prisma";
import * as bcrypt from "bcrypt";
import * as webToken from "jsonwebtoken";

type AuthenticateUserLogin = {
	Email: string;
	Password: string;
};

type AuthenticateUserSignup = {
	FirstName: string;
	LastName: string;
	Email: string;
	Password: string;
};

export class AuthenticateUserService {
	static async signup(data: AuthenticateUserSignup) {
		const AuthenticateUser = prisma.usersSignup;

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

	static async login(data: AuthenticateUserLogin) {
		const AuthenticateUser = prisma.usersSignup;
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

	static async validateToken(token: string) {
		const secret = process.env.JWT_SECRET;
		const decoded = webToken.verify(token, secret);
		return !!decoded;
	}
}
