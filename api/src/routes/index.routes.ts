import { Router } from "express";
import userRouter from "./user.routes.js";
import restaurantRouter from "./restaurant.route.js";
import ROUTES from "../config/routes.js";
import { authMiddleware,authorize } from "../middleware/Auth.middleware.js";
import { Roles } from "../types/auth.type.js";

const router = Router();

router.use(ROUTES.users.base,userRouter);

router.use(
    ROUTES.restaurants.base,
    authMiddleware,
    authorize([Roles.OWNER,Roles.ADMIN]),
    restaurantRouter
);

export default router;