import { fetchWrapper } from "../utils/fetchWrapper";
import { ENDPOINTS } from "./endpoints";

export const restaurantAPI = {
    getAll: () =>
        fetchWrapper(
            ENDPOINTS.restaurant.list,
            { method: "GET" }
        ),

    create: (data) =>
        fetchWrapper(
            ENDPOINTS.restaurant.create,
            {
                method: "POST",
                body: data,
                credentials: "include"
            },
            "multipart/form-data"
        ),

    getMeRestaurants: () =>
        fetchWrapper(
            ENDPOINTS.restaurant.getMeRestaurants,
            {
                method: "get",
                credentials: "include"
            }
        ),
    deleteRestaurant: (restaurant_id) =>
        fetchWrapper(
            ENDPOINTS.restaurant.delete,
            {
                method: "delete",
                body: JSON.stringify({ restaurant_id: restaurant_id }),
                credentials: "include"
            }
        ),
    getRestaurantById: (restaurant_id) =>
        fetchWrapper(
            ENDPOINTS.restaurant.getOne,
            {
                method: "post",
                body: JSON.stringify({ restaurant_id: parseInt(restaurant_id) }),
                credentials: "include"
            }
        ),
    updateRestaurant: (data) =>
        fetchWrapper(
            ENDPOINTS.restaurant.update,
            {
                method: "put",
                body: data,
                credentials: "include"
            },
            "multipart/form-data"
        )


}