import { Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Types } from "mongoose";

interface Props {
  _id: Types.ObjectId | unknown;
  email: string;
  fullName:string;
}

export const generateJWT = (payload: Props, res: Response) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "14d",
  });

  res.cookie("jwt", token, {
    maxAge: 14 * 24 * 60 * 60 * 1000, //MS
    httpOnly:true,
    sameSite:true,
    secure: process.env.NODE_ENV === 'development'
  });

  return token;
}; 
