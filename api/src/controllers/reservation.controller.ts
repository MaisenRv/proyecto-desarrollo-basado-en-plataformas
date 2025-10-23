import ReservationService from "../services/reservation.service.js";
import prisma from "../models/prismaClient.js"; // 👈 asegúrate de tener importado el cliente de Prisma
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

    // 🔹 Nuevo método completo
    public getMyReservations = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const user_id = req.user!.id;

            const reservations = await prisma.reservation.findMany({
                where: { user_id },
                include: {
                    table: {
                        select: {
                            name: true
                        }
                    },
                    restaurant: {
                        select: {
                            name: true
                        }
                    }
                },
                orderBy: {
                    date: 'desc'
                }
            });

            res.status(200).json(reservations);
        } catch (error) {
            next(error);
        }
    };
}

export default ReservationController;
