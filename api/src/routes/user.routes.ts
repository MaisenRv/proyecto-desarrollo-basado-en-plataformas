import { Router, Request,Response } from "express";
import { getUsers } from "../services/user.service.js";

const userRouter = Router()
userRouter.get("/", async (req:Request, res: Response)=>{
    const users = await getUsers();
    res.json(users);
})

export default userRouter;