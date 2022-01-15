"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const MessageController_1 = require("./controllers/MessageController");
const AuthenticateUserController_1 = require("./controllers/AuthenticateUserController");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/Message", new MessageController_1.MessageController().handle);
router.get("/user/Messages", new MessageController_1.MessageController().getMessages);
router.post("/user/signup", new AuthenticateUserController_1.AuthenticateUserController().signup);
router.post("/user/login", new AuthenticateUserController_1.AuthenticateUserController().login);
router.post("/user/valdiateToken", new AuthenticateUserController_1.AuthenticateUserController().validateToken);
router.get("/", (req, res) => {
    res.send("Hello World!");
});
