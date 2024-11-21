import type { Request, Response } from "express";
import { updateProfile } from "../../controllers/profile/01 - updateProfile";

export const UPDATEPROFILE = async (req: Request, res: Response) => {
  const data = req.body;
  const userId = req.user._id;
  const userEmail = req.user.email
  try {
    const user = await updateProfile({userId,userEmail,data});
    return res.status(200).json(user);
  } catch (error: any) {
    console.log("Error in update profile handler", error.message);
    return res.status(400).json({ error: error.message });
  }
};
