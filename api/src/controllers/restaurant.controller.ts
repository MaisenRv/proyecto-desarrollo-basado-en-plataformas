import RestaurantService from "../services/restaurant.service.js";
import { NextFunction, Request, Response } from "express";

class RestaurantController {
    private restaurantService = new RestaurantService();

    public getAllRestaurats = async (req: Request, res: Response) => {
        try {
            const restaurants = await this.restaurantService.getAllRestaurants();
            if (restaurants.length == 0) {
                res.status(200).json({ restaurants: "No existen restaurantes en la base de datos" })
            }
            res.status(200).json({ restaurants })

        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }


    public createRestaurant = async (req: Request, res: Response, next:NextFunction) => {
        try {
            const restaurant = await this.restaurantService.createRestaurant(req.body);
            res.status(200).json({ restaurant })
        } catch (error) { next(error); }
    }

    public updateRestaurant() {

    }
}

export default RestaurantController;