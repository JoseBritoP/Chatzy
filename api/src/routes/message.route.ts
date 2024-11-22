import { Router } from "express";

// Handler
import { MessageHandler } from "../handlers/message/Message";

// Middleware
import { protectRoute } from "../middlewares/auth.middleware";

const messageRouter = Router();
messageRouter.use(protectRoute);

messageRouter.get('/users',MessageHandler.GETUSERS);
messageRouter.get('/:id',MessageHandler.GETMESSAGES);
messageRouter.post('/create',MessageHandler.CREATEMESSAGE);

export default messageRouter;