import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import env from "../config/env.js";

export interface AuthRequest extends Request {
  user?: any; 
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.cookies["auth_token"];

    if (!token) {
      return res.status(401).json({ error: "No autorizado: falta token" });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}