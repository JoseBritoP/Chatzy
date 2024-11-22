import type { Request, Response } from "express";
import { getUsersToChat } from "../../controllers/message/01 - getUsers";
import AppError from "../../utils/appError";
import { getMessages } from "../../controllers/message/02 - getMessages";

export const GETUSERS = async (req: Request, res: Response) => {
  const loggedUser = req.user;
  try {
    const users = await getUsersToChat({userId:loggedUser._id});
    return res.status(200).json(users);
  } catch (error:any) {
    console.log("Error in get users handler", error.message);
    if(error instanceof AppError) return res.status(error.statusCode).json({error:error.message})
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const GETMESSAGES = async (req:Request,res:Response) => {
  const { id:reciverId} = req.params;
  const senderId = req.user._id;
  try {
    const messages = await getMessages({senderId,reciverId});
    return res.status(200).json(messages);
  } catch (error:any) {
    console.log("Error in get messages handler", error.message);
    if(error instanceof AppError) return res.status(error.statusCode).json({error:error.message})
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const CREATEMESSAGE = (req: Request, res: Response) => {
  const loggedUser = req.user;
  return res.json({ DIY: "Creating message..." });
};
