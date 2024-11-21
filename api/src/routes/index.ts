import { Request, Response, NextFunction, Router } from "express";
import authRouter from "./auth.route";
import profileRouter from "./profile.route";

const mainRouter = Router();

mainRouter.use("/api/auth", authRouter);
mainRouter.use("/api/profile", profileRouter);
// Routes error
mainRouter.use((req, _res, next) => {
  const error: any = new Error(
    `La ruta ${req.originalUrl} con el método ${req.method} no está implementada`
  );
  error.status = 404;
  next(error);
});

mainRouter.use(
  (error: any, _req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).json({
      message: error.message || "Error interno del servidor",
    });
  }
);

export default mainRouter;
