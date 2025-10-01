import { Router} from "express";
import { Request,Response } from "express";

import UserController from "../controllers/user.controller.js";
import ROUTES from "../config/routes.js";
import { validate } from "../middleware/Validations.middleware.js";
import { UserCreateSchema,UserLoginSchema } from "../middleware/schemas/UserSchema.js";
import { authMiddleware } from "../middleware/Auth.middleware.js";
import { AuthRequest } from "../types/auth.type.js";

const userController = new UserController();
const userRouter = Router()

userRouter.get(ROUTES.users.list, userController.getAllUsers);
userRouter.post(ROUTES.users.create, validate(UserCreateSchema),userController.register);
userRouter.post(ROUTES.users.login, validate(UserLoginSchema),userController.login);
userRouter.get(ROUTES.users.me,authMiddleware, (req:AuthRequest, res:Response) => {res.json({username: req.user!.username, role:req.user!.role})})
userRouter.post(ROUTES.users.logout, userController.logout)


export default userRouter;