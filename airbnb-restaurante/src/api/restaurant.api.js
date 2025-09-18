import { fetchWrapper } from "../utils/fetchWrapper";
import { ENDPOINTS } from "./endpoints";

export const restaurantAPI = {
    getAll: (owner_id)=>{
        fetchWrapper(
            ENDPOINTS.restaurant.list,
            {
                method: "GET",
                body: JSON.stringify(owner_id),
                credentials: "include"
            }
        )
    }
}