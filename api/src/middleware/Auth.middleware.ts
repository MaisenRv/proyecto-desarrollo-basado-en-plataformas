import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import env from "../config/env.js";
import { JwtUserPayload, Roles, AuthRequest } from "../types/auth.type.js";


export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.cookies["auth_token"];

    if (!token) {
      return res.status(401).json({ error: "No autorizado: falta token" });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtUserPayload;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}

export const authorize = (roles: Roles[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: "No autenticado" });

    if (roles.length === 0) return next();

    if (roles.includes(req.user.role as Roles)) return next();
    return res.status(403).json({ error: "Acceso denegado: rol insuficiente" });
  }
}