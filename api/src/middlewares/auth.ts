import type { Request,Response,NextFunction } from "express";
import { authLoginSchema, authSchema } from "../schemas/user.schema";

export const createAccountValidationMiddleware = (req:Request,res:Response,next:NextFunction) => {
  try {
    const body = req.body;
    const result = authSchema.safeParse(body);
    if(!result.success) throw new Error(JSON.stringify(result.error))
    next();
  } catch (error:any) {
    return res.status(400).json({error:JSON.parse(error.message)})
  }
};

export const loginAccountValidationMiddleware = (req:Request,res:Response,next:NextFunction) => {
  try {
    const body = req.body;
    const result = authLoginSchema.safeParse(body);
    if(!result.success) throw new Error(JSON.stringify(result.error))
    next();
  } catch (error:any) {
    return res.status(400).json({error:JSON.parse(error.message)})
  }
};