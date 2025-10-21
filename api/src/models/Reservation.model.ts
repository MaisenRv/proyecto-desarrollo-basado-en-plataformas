import pool from "../config/database.js";
import { QueryResult } from "pg";
import AppError from "../utils/AppError.js";
import { MessageInterface } from "../interfaces/message.interface.js";
import { ReservationInterface,ReservationCreateInterface } from "../interfaces/reservation.interface.js";

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

    public async createReservation(newReservation: ReservationCreateInterface): Promise<ReservationInterface> {
        try {
            const result: QueryResult<ReservationInterface> = await pool.query(
                'INSERT INTO reservation(restaurant_id,table_id,consumer_id,reservation_data,reservation_time,costumer_name) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
                [newReservation.restaurant_id,newReservation.table_id, newReservation.consumer_id, newReservation.reservation_data, newReservation.reservation_time, newReservation.costumer_name]
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
}

export default ReservationModel;