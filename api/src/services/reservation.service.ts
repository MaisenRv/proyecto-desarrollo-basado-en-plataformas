import { MessageInterface } from "../interfaces/message.interface.js";
import ReservationModel from "../models/Reservation.model.js";
import { ReservationCreateInterface } from "../interfaces/reservation.interface.js";
import { jwtPayload} from "../interfaces/user.interface.js";

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

    public async createReservation(newReservation: ReservationCreateInterface, user: jwtPayload): Promise<MessageInterface> {

        const createdReservation = await this.reservationModel.createReservation(newReservation, user);
        const message:MessageInterface = {
            msg: "Reserva creada exitosamente",
            data: createdReservation
        }
        return message;
    }

    public async getReservationsByDate(restaurant_id: number, date: string): Promise<MessageInterface> {
        const reservations = await this.reservationModel.getReservationsByDate(restaurant_id, date);
        const message:MessageInterface = {
            msg: "Reservas obtenidas exitosamente",
            data: reservations
        }
        return message;
    }
}

export default ReservationService;