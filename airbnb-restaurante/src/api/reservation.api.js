import { fetchWrapper } from "../utils/fetchWrapper";
import { ENDPOINTS } from "./endpoints";

export const reservationAPI = {
    getByRestaurantId: (restaurant_id) =>
        fetchWrapper(
            ENDPOINTS.reservation.getByRestaurantId,
            {
                method: "post",
                body: JSON.stringify({ restaurant_id: parseInt(restaurant_id) }),
                credentials: "include"
            }
        ),

    create: (data) =>
        fetchWrapper(
            ENDPOINTS.reservation.create,
            {
                method: "POST",
                body: JSON.stringify(data),
                credentials: "include"
            }
        ),
    getByDate: (restaurant_id, date) =>
        fetchWrapper(
            ENDPOINTS.reservation.getByDate,
            {
                method: "POST",
                body: JSON.stringify({ restaurant_id: parseInt(restaurant_id), date }),
                credentials: "include"
            }
        ),
    getMyReservations: () =>
        fetchWrapper(
            ENDPOINTS.reservation.getMyReservations,
            {
                method: "GET",
                credentials: "include"
            }
        ),
    delete: (reservation_id) =>
        fetchWrapper(
            ENDPOINTS.reservation.delete,
            {
                method: "DELETE",
                body: JSON.stringify({ reservation_id: parseInt(reservation_id) }),
                credentials: "include"
            }
        ),
}