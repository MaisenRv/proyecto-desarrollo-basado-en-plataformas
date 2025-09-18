import { MessageInterface } from "../interfaces/message.interface.js";
import { RestaurantCreateInterface, RestaurantInterface,RestaurantDeleteInterface,RestaurantGetInterface } from "../interfaces/restaurant.interface.js";
import RestaurantModel from "../models/Restaurant.model.js";


class RestaurantService {
    private restaurantModel = new RestaurantModel();

    public async getAllRestaurants(userId:RestaurantGetInterface): Promise<RestaurantInterface[]> {
        return await this.restaurantModel.getAllRestaurants(userId);
    }
    public async createRestaurant(newRestaurant:RestaurantCreateInterface):Promise<MessageInterface> {
        const result = await this.restaurantModel.createRestaurant(newRestaurant); 
        const message:MessageInterface = {
            msg:"Restaurante creado exitosamente",
            data:result
        }
        return message;
    }   

    public async deleteRestaurant(restaurantId: RestaurantDeleteInterface):Promise<MessageInterface> {
        return await this.restaurantModel.deleteRestaurant(restaurantId);
    }

}

export default RestaurantService;