import { Router } from "express";

// Handler
import { MessageHandler } from "../handlers/message/Message";

// Middleware
import { protectRoute } from "../middlewares/auth.middleware";
import { MessageDataMiddleware } from "../middlewares/message.middleware";

const messageRouter = Router();
messageRouter.use(protectRoute);

messageRouter.get('/users',MessageHandler.GETUSERS);
messageRouter.get('/:id',MessageHandler.GETMESSAGES);
messageRouter.post('/send/:id',MessageDataMiddleware,MessageHandler.SENDMESSAGE);

export default messageRouter;