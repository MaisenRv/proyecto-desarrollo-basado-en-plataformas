import { MessageInterface } from "../interfaces/message.interface.js";
import ReservationModel from "../models/Reservation.model.js";


class ReservationService {
    private reservationModel = new ReservationModel();

    public async getReservationsByRestaurant(restaurant_id: number): Promise<MessageInterface> {
        const reservations = await this.reservationModel.getReservationsByRestaurant(restaurant_id);
        const message:MessageInterface = {
            msg: "Reservas obtenidas exitosamente",
            data: reservations
        }
        return message;
    }

    public async createReservation(newReservation:any): Promise<MessageInterface> {
        const createdReservation = await this.reservationModel.createReservation(newReservation);
        const message:MessageInterface = {
            msg: "Reserva creada exitosamente",
            data: createdReservation
        }
        return message;
    }
}

export default ReservationService;