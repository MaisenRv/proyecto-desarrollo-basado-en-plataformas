import { MessageInterface } from "../interfaces/message.interface.js";
import { RestaurantCreateInterface, RestaurantInterface,RestaurantDeleteInterface,RestaurantGetInterface } from "../interfaces/restaurant.interface.js";
import RestaurantModel from "../models/Restaurant.model.js";
import UserModel from "../models/User.model.js";
import { UserRole } from "../interfaces/user.interface.js";

class RestaurantService {
    private restaurantModel = new RestaurantModel();

    public async getAllRestaurants(): Promise<RestaurantInterface[]> {
        return await this.restaurantModel.getAllRestaurants();
    }
    public async createRestaurant(newRestaurant:RestaurantCreateInterface, userRole:UserRole):Promise<MessageInterface> {
        const result = await UserModel.checkUserRole(parseInt(userRole.user_id), userRole.role);
        newRestaurant.owner_id = result.owner_id;
        const createdRestaurant = await this.restaurantModel.createRestaurant(newRestaurant); 
        const message:MessageInterface = {
            msg:"Restaurante creado exitosamente",
            data:createdRestaurant
        }
        return message;
    }   

    public async deleteRestaurant(restaurantId: RestaurantDeleteInterface):Promise<MessageInterface> {
        return await this.restaurantModel.deleteRestaurant(restaurantId);
    }

    public async getRestaurantsById(userRole:UserRole){
        return await this.restaurantModel.getRestaurantsById(userRole);
    }

    public async getRestaurant(restaurant_id: number):Promise<RestaurantInterface>{
        return await this.restaurantModel.getRestaurant(restaurant_id);
    }

}

export default RestaurantService;