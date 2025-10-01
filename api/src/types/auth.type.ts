import { Request} from "express";

export enum Roles {
    OWNER = "owner",
    ADMIN = "admin",
    CONSUMER = "consumer"
}

export interface JwtUserPayload {
  user_id: string;    
  username?: string;
  role: Roles | string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user?: JwtUserPayload;
}