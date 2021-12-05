import { Router } from "express";
import { MessageController } from "./controllers/MessageController";

const router = Router();
router.post("/Message", new MessageController().handle);
router.get("/user/Messages", new MessageController().getMessages);
// router.post("/authenticate", new AuthenticateUserController().handle);

// router.post(
// 	"/message",
// 	ensureAuthenticated,
// 	new CreateMessageController().handle,
// );

// router.get("/message/last3", new GetLast3MessagesController().handle);
// router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export { router };
