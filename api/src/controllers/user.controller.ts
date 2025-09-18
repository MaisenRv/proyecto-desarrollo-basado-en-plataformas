import UserService from "../services/user.service.js";
import { NextFunction, Request, Response } from "express";

class UserController {
    private userService = new UserService();

    public getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.userService.getAllUsers();
            if (users.length == 0) {
                res.status(200).json({ users: "No existen usuarios en la base de datos" })
            }
            res.status(200).json({ users: users })

        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.userService.register(req.body);
            res.cookie("auth_token", result.data.auth_token,
                {
                    httpOnly: true,
                    sameSite: "strict",
                    maxAge: 1000 * 60 * 15
                }
            );
            res.status(200).json({ msg: result.msg, data: { username: result.data.username } });
        } catch (error) { next(error); }
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.userService.login(req.body);
            res.cookie("auth_token", result.data.auth_token,
                {
                    httpOnly: true,
                    sameSite: "strict",
                    maxAge: 1000 * 60 * 15
                }
            );

            res.status(200).json({ msg: result.msg, data: { username: result.data.username } });
        } catch (error) { next(error); }
    }
}

export default UserController;