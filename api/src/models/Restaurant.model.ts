import pool from "../config/database.js";
import { RestaurantInterface, RestaurantCreateInterface } from "../interfaces/restaurant.interface.js";
import { QueryResult } from "pg";

class RestaurantModel {
    public async getAllRestaurants(): Promise<RestaurantInterface[]> {
        const result: QueryResult = await pool.query('SELECT * FROM restaurant');
        return result.rows;
    }
}

export default RestaurantModel;