import pool from "../config/database.js";
import { QueryResult } from "pg";
import AppError from "../utils/AppError.js";
import { MessageInterface } from "../interfaces/message.interface.js";
import { ReservationInterface, ReservationCreateInterface } from "../interfaces/reservation.interface.js";
import { jwtPayload } from "../interfaces/user.interface.js";
import { ReservationsGetMeConsumer } from "../interfaces/reservation.interface.js";
import { RestaurantInterface } from "../interfaces/restaurant.interface.js";

class ReservationModel {
    public async getReservationsByRestaurant(restaurant_id: number): Promise<ReservationInterface[]> {
        try {
            const result: QueryResult = await pool.query(
                'SELECT * FROM reservation WHERE restaurant_id = $1',
                [restaurant_id]
            );
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    public async createReservation(newReservation: ReservationCreateInterface, user: jwtPayload): Promise<ReservationInterface> {
        try {

            const consumer: QueryResult<{ consumer_id: number, user_id: number }> = await pool.query(
                'SELECT * FROM consumer WHERE user_id = $1',
                [user.user_id]
            );

            if (consumer.rows.length === 0) {
                throw new AppError("No se encontró el consumidor", 404);
            }

            const result: QueryResult<ReservationInterface> = await pool.query(
                'INSERT INTO reservation(restaurant_id,table_id,consumer_id,reservation_data,reservation_time,costumer_name) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
                [
                    newReservation.restaurant_id,
                    newReservation.table_id,
                    consumer.rows[0]!.consumer_id,
                    newReservation.reservation_data,
                    newReservation.reservation_time,
                    user.username
                ]
            );

            const reservation = result.rows[0];
            if (!reservation) {
                throw new AppError("No se pudo crear la reserva", 400);
            }

            return reservation;
        } catch (error) {
            throw error;
        }
    }

    public async getReservationsByDate(restaurant_id: number, date: string): Promise<ReservationInterface[]> {
        try {
            const result: QueryResult = await pool.query(
                'SELECT * FROM reservation WHERE restaurant_id = $1 AND reservation_data = $2',
                [restaurant_id, date]
            );
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    public async getMyReservations(user_id: number): Promise<ReservationsGetMeConsumer> {
        try {
            const result: QueryResult = await pool.query(
                'SELECT * FROM reservation WHERE consumer_id = (select consumer_id from consumer where user_id = $1)',
                [user_id]
            );

            if (result.rows.length === 0) {
                throw new AppError("No se encontraron reservas", 404);
            }

            const restaurant: QueryResult<RestaurantInterface> = await pool.query(
                'SELECT * FROM restaurant WHERE restaurant_id = $1',
                [result.rows[0].restaurant_id]
            );

            if (restaurant.rows.length === 0) {
                throw new AppError("No se encontró el restaurante", 404);
            }

            return {
                restaurant: restaurant.rows[0]!,
                reservations: result.rows
            };

        } catch (error) {
            throw error;
        }

    }

    public async deleteReservation(reservation_id: number): Promise<MessageInterface> {
        try {
            const result: QueryResult = await pool.query(
                'DELETE FROM reservation WHERE reservation_id = $1 RETURNING *',
                [reservation_id]
            );

            if (result.rows.length === 0) {
                throw new AppError("No se encontró la reserva", 404);
            }

            return { msg: "Reserva eliminada correctamente", data: result.rows[0] };
        } catch (error) {
            throw error;
        }
    }
}

export default ReservationModel;