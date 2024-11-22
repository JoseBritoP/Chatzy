import type { Request,Response,NextFunction } from "express";

import { messageShema } from "../schemas/message.schema";

export const MessageDataMiddleware = (req:Request,res:Response,next:NextFunction) => {
  try {
    const body = req.body;
    const result = messageShema.safeParse(body);
    if(!result.success) throw new Error(JSON.stringify(result.error))
    next();
  } catch (error:any) {
    return res.status(400).json({error:JSON.parse(error.message)})
  }
};