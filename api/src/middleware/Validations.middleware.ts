import UserSchema from "./schemas/UserSchema.js";
import { Request, Response, NextFunction } from "express";

class Validations{

    public static validateUser(req:Request, res:Response, next:NextFunction){
        const result = UserSchema.safeParse(req.body);
        if(!result.success){
            res.status(400).json({error: result.error.issues});
        }
        req.body = result.data;
        next();
    }

}

export default Validations;