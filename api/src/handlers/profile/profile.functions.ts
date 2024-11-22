import type { Request, Response } from "express";
import { updateProfile } from "../../controllers/profile/01 - updateProfile";
import AppError from "../../utils/appError";

export const UPDATEPROFILE = async (req: Request, res: Response) => {
  const data = req.body;
  const userId = req.user._id;
  const userEmail = req.user.email
  try {
    const user = await updateProfile({userId,userEmail,data});
    return res.status(200).json(user);
  } catch (error: any) {
    console.log("Error in update profile handler", error.message);
    if(error instanceof AppError) return res.status(error.statusCode).json({error:error.message})
    return res.status(400).json({ error: 'Internal server error' });
  }
};

export const CHECKAUTH = async (req:Request,res:Response) => {
  try {
    const user = req.user;
    if(!user) throw new Error('User not authenticate')
    return res.status(200).json(user)
  } catch (error:any) {
    return res.status(401).json({error:error.message})
  }
}