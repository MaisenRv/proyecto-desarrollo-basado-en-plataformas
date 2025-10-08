import { Router } from "express";
import ROUTES from "../config/routes.js";
import RestaurantController from "../controllers/restaurant.controller.js";
import { validate } from "../middleware/Validations.middleware.js";
import { RestaurantCreateSchema, RestaurantUpdateSchema, RestaurantDeleteSchema, RestaurantGetSchema } from "../middleware/schemas/ResturantSchema.js";
import { upload } from "../types/img.type.js";
import { authMiddleware, authorize } from "../middleware/Auth.middleware.js";
import { Roles } from "../types/auth.type.js";


const restaurantController = new RestaurantController();
const restaurantRouter = Router();

restaurantRouter.get(
    ROUTES.restaurants.list,
    restaurantController.getAllRestaurats
);

restaurantRouter.post(
    ROUTES.restaurants.create,
    authMiddleware,
    authorize([Roles.OWNER, Roles.ADMIN]),
    upload.single("file"),
    validate(RestaurantCreateSchema),
    restaurantController.createRestaurant
);

restaurantRouter.put(
    ROUTES.restaurants.update,
    authMiddleware,
    authorize([Roles.OWNER, Roles.ADMIN]),
    validate(RestaurantUpdateSchema),
    restaurantController.updateRestaurant
);

restaurantRouter.delete(
    ROUTES.restaurants.delete,
    authMiddleware,
    authorize([Roles.OWNER, Roles.ADMIN]),
    validate(RestaurantDeleteSchema),
    restaurantController.deleteRestaurant
);

restaurantRouter.get(
    ROUTES.restaurants.getById,
    authMiddleware,
    authorize([Roles.OWNER, Roles.ADMIN]),
    restaurantController.getRestaurantsById
)

export default restaurantRouter;