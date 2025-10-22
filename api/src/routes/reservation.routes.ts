import { Router } from "express";
import ROUTES from "../config/routes.js";
import ReservationController from "../controllers/reservation.controller.js";
import { validate } from "../middleware/Validations.middleware.js";
import { ReservationCreateSchema, ReservationGetByRestaurantSchema } from "../middleware/schemas/ReservationSchema.js";
import { Roles } from "../types/auth.type.js";
import { authMiddleware,authorize } from "../middleware/Auth.middleware.js";

const reservationController = new ReservationController();
const reservationRouter = Router();

reservationRouter.post(
    ROUTES.reservations.getByRestaurantId,
    authMiddleware,
    authorize([Roles.OWNER, Roles.ADMIN, Roles.CONSUMER]),
    validate(ReservationGetByRestaurantSchema),
    reservationController.getReservationsByRestaurant
);

reservationRouter.post(
    ROUTES.reservations.create,
    authMiddleware,
    validate(ReservationCreateSchema),
    reservationController.createReservation
);

reservationRouter.post(
    ROUTES.reservations.getByDate,
    authMiddleware,
    authorize([Roles.OWNER, Roles.ADMIN, Roles.CONSUMER]),
    reservationController.getReservationsByDate
);

export default reservationRouter;