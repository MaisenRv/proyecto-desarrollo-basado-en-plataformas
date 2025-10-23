import ReservationService from "../services/reservation.service.js";
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth.type.js";
import { ReservationCreateInterface } from "../interfaces/reservation.interface.js";
import { jwtPayload } from "../interfaces/user.interface.js";

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
    };

    public createReservation = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const newReservation: ReservationCreateInterface = req.body;
            const message = await this.reservationService.createReservation(newReservation, req.user as jwtPayload);
            res.status(200).json(message);
        } catch (error) {
            next(error);
        }
    };

    public getReservationsByDate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const restaurant_id = parseInt(req.body.restaurant_id);
            const date = req.body.date;
            const message = await this.reservationService.getReservationsByDate(restaurant_id, date);
            res.status(200).json(message);
        } catch (error) {
            next(error);
        }
    };


    public getMyReservations = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const user_id = parseInt(req.user!.user_id);
            const message = await this.reservationService.getMyReservations(user_id);
            res.status(200).json(message);
        } catch (error) {
            next(error);
        }
    };

    public deleteReservation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reservation_id = parseInt(req.body.reservation_id);
            const message = await this.reservationService.deleteReservation(reservation_id);
            res.status(200).json(message);
        } catch (error) {
            next(error);
        }
    }
}

export default ReservationController;
