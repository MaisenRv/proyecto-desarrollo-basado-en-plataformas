import {UserInterface} from "../interfaces/user.interface.js";
import pool from "../config/database.js";
import { MessageInterface } from "../interfaces/message.interface.js";

class UserModel {
    public async getAllUsers(): Promise<UserInterface[]> {
        const result = await pool.query('SELECT * FROM "user"');
        return result.rows;
    }

    // public async createUser(): Promise<MessageInterface>{
        // const 
    // }
}

export default UserModel;