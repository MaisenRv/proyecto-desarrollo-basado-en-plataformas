import { Router } from "express";
import ROUTES from "../config/routes.js";
import RestaurantController from "../controllers/restaurant.controller.js";
import { validate } from "../middleware/Validations.middleware.js";
import { RestaurantCreateSchema } from "../middleware/schemas/ResturantSchema.js";

const restaurantController = new RestaurantController();
const restaurantRouter = Router();

restaurantRouter.get(ROUTES.restaurants.list,restaurantController.getAllRestaurats);
restaurantRouter.post(ROUTES.restaurants.create, validate(RestaurantCreateSchema),restaurantController.createRestaurant)

export default restaurantRouter;