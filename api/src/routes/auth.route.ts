import { Router } from "express";
import { AuthHandler } from "../handlers/auth/Auth";

const authRouter = Router();

// Endpoints

authRouter.get("/", AuthHandler.GETAUTH);
authRouter.post("/sign-up", AuthHandler.SIGNIN);
authRouter.post("/sign-in", AuthHandler.SIGNUP);
authRouter.post("/logout", AuthHandler.LOGOUT);

//

export default authRouter;
