import UserService from "../services/user.service.js";
import { Request,Response } from "express";

class UserController{
    private userService = new UserService();

    public getAllUsers = async (req: Request, res: Response) =>{
        try{
            const users = await this.userService.getAllUsers();
            if (users.length == 0){
                res.status(200).json({users: "No existen usuarios en la base de datos"})
            }
            res.status(200).json({users: users})

        }catch(error){
            res.status(500).json({error:  "Error interno del servidor"});
        }
    }

    public register = async (req:Request, res:Response) =>{
        try{
            // this.userService.register(req.body);
        }catch(error){
            res.status(500).json({error: "Error al registrar el usuario"});
        }
    }
}

export default UserController;