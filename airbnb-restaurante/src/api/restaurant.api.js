import { fetchWrapper } from "../utils/fetchWrapper";
import { ENDPOINTS } from "./endpoints";

export const restaurantAPI = {
    getAll: (user_id) =>
        fetchWrapper(
            ENDPOINTS.restaurant.list,
            {
                method: "POST",
                body: JSON.stringify({ user_id }),
                credentials: "include"
            }
        )

}