import { Router} from "express";


import UserController from "../controllers/user.controller.js";
import ROUTES from "../config/routes.js";
import { validate } from "../middleware/Validations.middleware.js";
import { UserCreateSchema,UserLoginSchema } from "../middleware/schemas/UserSchema.js";


const userController = new UserController();
const userRouter = Router()

userRouter.get(ROUTES.users.list, userController.getAllUsers);
userRouter.post(ROUTES.users.create, validate(UserCreateSchema),userController.register);
userRouter.post(ROUTES.users.login, validate(UserLoginSchema),userController.login);



export default userRouter;