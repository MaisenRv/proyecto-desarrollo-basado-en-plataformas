import { MessageInterface } from "../interfaces/message.interface.js";
import { RestaurantCreateInterface, RestaurantInterface } from "../interfaces/restaurant.interface.js";
import RestaurantModel from "../models/Restaurant.model.js";


class RestaurantService {
    private restaurantModel = new RestaurantModel();

    public async getAllRestaurants(): Promise<RestaurantInterface[]> {
        return await this.restaurantModel.getAllRestaurants();
    }
    public async createRestaurant(newRestaurant:RestaurantCreateInterface):Promise<MessageInterface> {
        const result = await this.restaurantModel.createRestaurant(newRestaurant); 
        const message:MessageInterface = {
            msg:"Restaurante creado exitosamente",
            data:result
        }
        return message;
    }   

}

export default RestaurantService;