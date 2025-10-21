import { Router } from "express";
import userRouter from "./user.routes.js";
import restaurantRouter from "./restaurant.route.js";
import tableRouter from "./table.routes.js";
import reservationRouter from "./reservation.routes.js";
import ROUTES from "../config/routes.js";

const router = Router();

router.use(
    ROUTES.users.base,
    userRouter
);

router.use(
    ROUTES.restaurants.base,
    restaurantRouter
);

router.use(
    ROUTES.tables.base,
    tableRouter
)

router.use(
    ROUTES.reservations.base,
    reservationRouter
)

export default router;