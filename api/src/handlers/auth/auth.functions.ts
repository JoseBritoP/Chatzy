import type { Request, Response } from "express";
import { signUp, signIn } from "../../controllers/auth/";
import { generateJWT } from "../../utils/jwt";
import AppError from "../../utils/appError";

export const GETAUTH = (req: Request, res: Response) => {
  return res.json({ DIY: "GET Auth" });
};

export const SIGNIN = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const account = await signIn(data);
    generateJWT(account.account, res);
    return res.status(201).json(account);
  } catch (error: any) {
    console.log("Error in signin controller", error.message);
    if(error instanceof AppError) return res.status(error.statusCode).json({error:error.message})
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const SIGNUP = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newAccount = await signUp(data);
    generateJWT(newAccount.account, res);
    return res.status(201).json(newAccount);
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    if(error instanceof AppError) return res.status(error.statusCode).json({error:error.message})
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const LOGOUT = (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Looged out successfully" });
  } catch (error: any) {
    console.log("Error in logout controller", error.message);
    if(error instanceof AppError) return res.status(error.statusCode).json({error:error.message})
    return res.status(500).json({ error: 'Internal server error' });
  }
};
