import type { Request, Response } from "express";
import { signUp } from "../../controllers/auth/01 - signUp";
import { generateJWT } from "../../utils/jwt";

export const GETAUTH = (req: Request, res: Response) => {
  return res.json({ DIY: "GET Auth" });
};

export const SIGNIN = (req: Request, res: Response) => {
  return res.json({ DIY: "Sign in" });
};

export const SIGNUP = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newAccount = await signUp(data);
    generateJWT(newAccount.account, res);
    return res.status(201).json(newAccount);
  } catch (error: any) {
    console.log('Error in signup controller',error.message)
    return res.status(400).json({ error: error.message });
  }
};

export const LOGOUT = (req: Request, res: Response) => {
  return res.json({ DIY: "Logout" });
};
