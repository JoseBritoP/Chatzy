import { Router } from "express";

// Middleware
import { protectRoute, UpdateProfileInfoMiddleware } from "../middlewares/auth.middleware";
import { ProfileHandler } from "../handlers/profile/Profile";

const profileRouter = Router();

// Endpoints

profileRouter.put('/update-profile',protectRoute, UpdateProfileInfoMiddleware, ProfileHandler.UPDATEPROFILE);
profileRouter.get('/check',protectRoute,ProfileHandler.CHECKAUTH)

export default profileRouter;