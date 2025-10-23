import { RestaurantInterface } from "./restaurant.interface";

export interface ReservationInterface {
    reservation_id: number;
    restaurant_id: number;
    table_id: number;
    reservation_data: string;
    reservation_time: string;
    costumer_name: string;
    consumer_id: number;
    created_at: string;
    update_at: string;
}

export interface ReservationCreateInterface {
    restaurant_id: number;
    table_id: number;
    reservation_data: string;
    reservation_time: string;
    costumer_name: string;
    consumer_id: number;
}

export interface ReservationsGetMeConsumer {
    restaurant : RestaurantInterface;
    reservations : ReservationInterface[];
}
