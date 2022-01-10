import { Router } from "express";
import { MessageController } from "./controllers/MessageController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

const router = Router();
router.post("/Message", new MessageController().handle);
router.get("/user/Messages", new MessageController().getMessages);
router.post("/user/singup", new AuthenticateUserController().singup);
router.post("/user/login", new AuthenticateUserController().login);
router.post(
	"/user/valdiateToken",
	new AuthenticateUserController().validateToken,
);

router.get("/", (req, res) => {
	res.send("Hello World!");
});

export { router };
