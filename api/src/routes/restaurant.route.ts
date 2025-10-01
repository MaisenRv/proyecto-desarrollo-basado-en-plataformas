import { Router } from "express";
import ROUTES from "../config/routes.js";
import RestaurantController from "../controllers/restaurant.controller.js";
import { validate } from "../middleware/Validations.middleware.js";
import { RestaurantCreateSchema,RestaurantUpdateSchema,RestaurantDeleteSchema,RestaurantGetSchema } from "../middleware/schemas/ResturantSchema.js";
import { upload } from "../types/img.type.js";

const restaurantController = new RestaurantController();
const restaurantRouter = Router();

restaurantRouter.post(
    ROUTES.restaurants.list,
    validate(RestaurantGetSchema),
    restaurantController.getAllRestaurats
);

restaurantRouter.post(
    ROUTES.restaurants.create, 
    upload.single("file"),
    validate(RestaurantCreateSchema),
    restaurantController.createRestaurant
);

restaurantRouter.put(
    ROUTES.restaurants.update, 
    validate(RestaurantUpdateSchema),
    restaurantController.updateRestaurant
);

restaurantRouter.delete(
    ROUTES.restaurants.delete,
    validate(RestaurantDeleteSchema),
    restaurantController.deleteRestaurant
);

export default restaurantRouter;