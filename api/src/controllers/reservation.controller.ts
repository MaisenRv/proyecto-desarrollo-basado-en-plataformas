import ReservationService from "../services/reservation.service.js";
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth.type.js";

class ReservationController {
    private reservationService = new ReservationService();

    public getReservationsByRestaurant = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const restaurant_id = parseInt(req.body.restaurant_id);
            const message = await this.reservationService.getReservationsByRestaurant(restaurant_id);
            res.status(200).json(message);
        } catch (error) {
            next(error);
        }
    }

    public createReservation = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const newReservation = req.body;
            const message = await this.reservationService.createReservation(newReservation);
            res.status(200).json(message);
        } catch (error) {
            next(error);
        }
    }
}

export default ReservationController;