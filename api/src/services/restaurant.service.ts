import { RestaurantInterface } from "../interfaces/restaurant.interface.js";
import RestaurantModel from "../models/Restaurant.model.js";


class RestaurantService {
    private restaurantModel = new RestaurantModel();

    public async getAllRestaurants(): Promise<RestaurantInterface[]> {
        return await this.restaurantModel.getAllRestaurants();
    }

}

export default RestaurantService;