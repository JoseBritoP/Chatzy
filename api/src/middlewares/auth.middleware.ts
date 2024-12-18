import type { Request,Response,NextFunction } from "express";
import { authLoginSchema, authSchema, updateProfileSchema } from "../schemas/user.schema";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { Types } from "mongoose";
import AppError from "../utils/appError";

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
    if(!token) throw new AppError('Unauthorized - No Token Provider',401);
    if(!process.env.JWT_SECRET) throw new Error('Please provide your jwt secret')
    const decoded = jwt.verify(token,process.env.JWT_SECRET) as PayloadJWT ;
    if(!decoded) throw new AppError('Unauthorized - Invalid Token',401);
    const user = await User.findById(decoded._id).select('-password');
    if(!user) throw new AppError('User not found',404);
    req.user = user;
    next();
  } catch (error:any) {
    console.log('Error in protect route middleware:', error.message)
    if(error instanceof AppError) return res.status(error.statusCode).json({error:error.message})
    return res.status(401).json({message:error.message})
  }
}

export const UpdateProfileInfoMiddleware = (req:Request,res:Response,next:NextFunction) => {
  try {
    const body = req.body;
    const result = updateProfileSchema.safeParse(body);
    if(!result.success) throw new Error(JSON.stringify(result.error))
    next();
  } catch (error:any) {
    return res.status(400).json({error:JSON.parse(error.message)})
  }
};