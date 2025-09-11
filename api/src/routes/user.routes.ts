import { Router} from "express";
import Validations from "../middleware/Validations.middleware.js";

import UserController from "../controllers/user.controller.js";


const userController = new UserController();
const userRouter = Router()

userRouter.get("/", userController.getAllUsers);
userRouter.post("/create",Validations.validateUser,userController.register);



export default userRouter;