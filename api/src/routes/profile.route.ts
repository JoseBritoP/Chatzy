import { Router } from "express";
import { ProfileHandler } from "../handlers/profile/profile";

// Middleware
import { protectRoute, UpdateProfileInfoMiddleware } from "../middlewares/auth.middleware";

const profileRouter = Router();

// Endpoints

profileRouter.put('/update-profile',protectRoute, UpdateProfileInfoMiddleware, ProfileHandler.UPDATEPROFILE);

export default profileRouter;