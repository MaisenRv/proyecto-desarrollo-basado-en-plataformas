import pool from "../config/database.js";
import { UserRole } from "../interfaces/user.interface.js";
import { RestaurantInterface, RestaurantCreateInterface, RestaurantDeleteInterface, RestaurantGetInterface,RestaurantUpdateInterface } from "../interfaces/restaurant.interface.js";
import { QueryResult } from "pg";
import AppError from "../utils/AppError.js";
import { MessageInterface } from "../interfaces/message.interface.js";


class RestaurantModel {
    public async getAllRestaurants(): Promise<RestaurantInterface[]> {
        try {
            const result: QueryResult = await pool.query('SELECT * FROM restaurant WHERE is_active = true');
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    public async updateRestaurant(restaurant: RestaurantInterface): Promise<number> {
        try {

            const result: QueryResult = await pool.query(
                'UPDATE restaurant SET name=$1,description=$2,address=$3,opening_hours=$4,closing_hours=$5,img=$6,is_active=$7,update_at=$8 WHERE restaurant_id =$9 AND owner_id=$10',
                [
                    restaurant.name,
                    restaurant.description,
                    restaurant.address,
                    restaurant.opening_hours,
                    restaurant.closing_hours,
                    restaurant.img,
                    restaurant.is_active,
                    restaurant.update_at,
                    restaurant.restaurant_id,
                    restaurant.owner_id
                ]
            );

            const re = result.rowCount;
            if (!re) {
                throw new AppError("NO se pudo actualizar el restaurante", 400);
            }

            return re;
        } catch (error) {
            throw error;
        }
    }

    public async createRestaurant(newRestaurant: RestaurantCreateInterface): Promise<RestaurantInterface> {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            const restauranCreated: QueryResult<RestaurantInterface> = await client.query<RestaurantInterface>(
                'INSERT INTO restaurant(owner_id,name,description,address,opening_hours,closing_hours,img) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
                [newRestaurant.owner_id, newRestaurant.name, newRestaurant.description, newRestaurant.address, newRestaurant.opening_hours, newRestaurant.closing_hours, newRestaurant.img]
            );

            const restaurant = restauranCreated.rows[0];
            if (!restaurant) {
                throw new AppError("NO se puedo crear el restaurante", 400);
            }

            await client.query("COMMIT");
            return restaurant;
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }


    public async deleteRestaurant(restaurantId: RestaurantDeleteInterface): Promise<MessageInterface> {
        const result = await pool.query(
            'DELETE FROM restaurant WHERE restaurant_id = $1',
            [restaurantId.restaurant_id]
        );

        return { msg: "Borrado", data: result };
    }

    public async getMeRestaurants(user: UserRole): Promise<RestaurantInterface[]> {
        try {
            const result: QueryResult<RestaurantInterface> = await pool.query(
                "select * from restaurant where owner_id = (select owner_id from owner where user_id = $1)",
                [user.user_id]
            );
            if (result.rowCount === 0) {
                throw new AppError("NO existe restaurantes de este usuario", 404);
            }
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    public async getRestaurantById(restaurant_id: number): Promise<RestaurantInterface> {
        try {
            const result: QueryResult<RestaurantInterface> = await pool.query(
                "select * from restaurant where restaurant_id = $1",
                [restaurant_id]
            );
            if (result.rowCount === 0) {
                throw new AppError("El restaurante No existe", 404);
            }
            return result.rows[0]!;
        } catch (error) {
            throw error;
        }
    }

}

export default RestaurantModel;