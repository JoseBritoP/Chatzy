import type { Request,Response,NextFunction } from "express";
import { authLoginSchema, authSchema } from "../schemas/user.schema";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user:UserI
    }
  }
}

interface UserI {
  _id: Types.ObjectId;
  email: string;
  fullName: string;
  profilePic?: string;
  lastConnection?: Date;
};

interface PayloadJWT {
  _id: Types.ObjectId | unknown;
  email: string;
  fullName:string;
};

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

export const protectRoute = async(req:Request,res:Response,next:NextFunction) => {
  try {
    const token = req.cookies.jwt
    if(!token) throw new Error('Unauthorized - No Token Provider');
    if(!process.env.JWT_SECRET) throw new Error('Please provide your jwt secret')
    const decoded = jwt.verify(token,process.env.JWT_SECRET) as PayloadJWT ;
    if(!decoded) throw new Error('Unauthorized - Invalid Token');
    const user = await User.findById(decoded._id).select('-password');
    if(!user) throw new Error('User not found');
    req.user = user;
    next();
  } catch (error:any) {
    console.log('Error in protect route middleware:', error.message)
    return res.status(401).json({message:error.message})
  }
}