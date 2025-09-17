import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError.js";

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(500).json({ error: "Error interno del servidor" });
}