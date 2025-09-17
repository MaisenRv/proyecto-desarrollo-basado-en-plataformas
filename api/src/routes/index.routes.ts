import { Router } from "express";
import userRouter from "./user.routes.js";
import restaurantRouter from "./restaurant.route.js";
import ROUTES from "../config/routes.js";

const router = Router();

router.use(ROUTES.users.base,userRouter);
router.use(ROUTES.restaurants.base,restaurantRouter);

export default router;