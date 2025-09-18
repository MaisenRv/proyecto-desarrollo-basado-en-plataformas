import pool from "../config/database.js";
import { RestaurantInterface, RestaurantCreateInterface, RestaurantDeleteInterface,RestaurantGetInterface } from "../interfaces/restaurant.interface.js";
import { QueryResult } from "pg";
import AppError from "../utils/AppError.js";
import { MessageInterface } from "../interfaces/message.interface.js";

class RestaurantModel {
    public async getAllRestaurants(ownerId:RestaurantGetInterface): Promise<RestaurantInterface[]> {
        const result: QueryResult = await pool.query(
            'SELECT * FROM restaurant WHERE owner_id = $1',
            [ownerId.owner_id]
        );
        return result.rows;
    }

    public async createRestaurant(newRestaurant: RestaurantCreateInterface): Promise<RestaurantInterface> {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            const result = await client.query(
                'SELECT * FROM owner WHERE owner_id = $1',
                [newRestaurant.owner_id]
            );
            if (result.rows.length === 0) {
                throw new AppError("El owner no existe", 400);
            }

            const restauranCreated:QueryResult<RestaurantInterface> = await client.query<RestaurantInterface>(
                'INSERT INTO restaurant(owner_id,name,description,address,opening_hours,closing_hours) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
                [newRestaurant.owner_id,newRestaurant.name,newRestaurant.description,newRestaurant.address,newRestaurant.opening_hours,newRestaurant.closing_hours]
            );

            const restaurant = restauranCreated.rows[0];
            if (!restaurant){
                throw new AppError("NO se puedo crear el restaurante", 400);
            }

            await client.query("COMMIT");
            return restaurant;
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        }finally {
            client.release();
        }
    }


    public async deleteRestaurant(restaurantId: RestaurantDeleteInterface):Promise<MessageInterface>{
        const result = await pool.query(
            'DELETE FROM restaurant WHERE restaurant_id = $1',
            [restaurantId.restaurant_id]
        );

        return { msg: "Borrado" ,data:result};
    }

}

export default RestaurantModel;