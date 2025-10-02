import RestaurantService from "../services/restaurant.service.js";
import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/auth.type.js";
import FileService from "../services/file.service.js";

class RestaurantController {
    private restaurantService = new RestaurantService();

    public getAllRestaurats = async (req: Request, res: Response) => {
        try {
            const restaurants = await this.restaurantService.getAllRestaurants(req.body);
            if (restaurants.length == 0) {
                res.status(200).json({ restaurants: "No existen restaurantes en la base de datos" })
            }
            res.status(200).json({ restaurants })

        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }


    public createRestaurant = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            let image_object: string | null = null;
            let image_url: string | null = null;

            if (req.file) {
                const upload = await FileService.uploadBuffer(req.file.buffer, req.file.originalname, req.file.mimetype);
                image_object = upload.objectName;
                image_url = upload.publicUrl;
            }
            req.body.img = image_url;
            const restaurant = await this.restaurantService.createRestaurant(
                req.body,
                { user_id: req.user!.user_id, role: req.user!.role }
            );

            res.status(200).json({ restaurant })
        } catch (error) { next(error); }
    }

    public updateRestaurant = async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (error) { next(error); }
    }

    public deleteRestaurant = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return this.restaurantService.deleteRestaurant(req.body);
        } catch (error) { next(error); }
    }

    public getRestaurantsById = async (req: AuthRequest, res: Response, next: NextFunction) =>{
        try {
            const result = await this.restaurantService.getRestaurantsById({user_id: req.user!.user_id, role: req.user!.role });

            res.status(200).json(result)
        } catch (error) { next(error); }
    }
}

export default RestaurantController;