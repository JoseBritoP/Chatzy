import { Router } from "express";
import { AuthHandler } from "../handlers/auth/Auth";

// Middlewares
import { createAccountValidationMiddleware } from "../middlewares/auth";

const authRouter = Router();

// Endpoints

authRouter.get("/", AuthHandler.GETAUTH);
authRouter.post("/sign-up",createAccountValidationMiddleware, AuthHandler.SIGNUP);
authRouter.post("/sign-in", AuthHandler.SIGNIN);
authRouter.post("/logout", AuthHandler.LOGOUT);

//

export default authRouter;
