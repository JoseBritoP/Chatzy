import type { Request, Response } from "express";

export const GETAUTH =  (req: Request, res: Response) => {
  return res.json({ DIY: "GET Auth" });
};

export const SIGNIN =  (req: Request, res: Response) => {
  return res.json({ DIY: "Sign in" });
};

export const SIGNUP =  (req: Request, res: Response) => {
  return res.json({ DIY: "Sign up" });
};

export const LOGOUT = (req: Request, res: Response) => {
  return res.json({ DIY: "Logout" });
};