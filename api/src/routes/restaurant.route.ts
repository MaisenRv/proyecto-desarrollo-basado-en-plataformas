import { Router } from "express";
import ROUTES from "../config/routes.js";
import RestaurantController from "../controllers/restaurant.controller.js";
import { validate } from "../middleware/Validations.middleware.js";
import { RestaurantCreateSchema,RestaurantUpdateSchema,RestaurantDeleteSchema,RestaurantGetSchema } from "../middleware/schemas/ResturantSchema.js";
import { authMiddleware } from "../middleware/Auth.middleware.js";

const restaurantController = new RestaurantController();
const restaurantRouter = Router();

restaurantRouter.get(
    ROUTES.restaurants.list,
    authMiddleware,
    validate(RestaurantGetSchema),
    restaurantController.getAllRestaurats
);

restaurantRouter.post(
    ROUTES.restaurants.create, 
    authMiddleware, 
    validate(RestaurantCreateSchema),
    restaurantController.createRestaurant
)
restaurantRouter.put(
    ROUTES.restaurants.update, 
    validate(RestaurantUpdateSchema),
    restaurantController.updateRestaurant
);

restaurantRouter.delete(
    ROUTES.restaurants.delete,
    authMiddleware,
    validate(RestaurantDeleteSchema),
    restaurantController.deleteRestaurant
);

export default restaurantRouter;