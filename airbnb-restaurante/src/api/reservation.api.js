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
                body: data,
                credentials: "include"
            }
        ),
}