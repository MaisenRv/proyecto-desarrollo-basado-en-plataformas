import { UserInterface, UserCreateInterface, UserLoginInterface } from "../interfaces/user.interface.js";
import pool from "../config/database.js";
import { QueryResult } from "pg";
import AppError from "../utils/AppError.js";

class UserModel {
    public async getAllUsers(): Promise<UserInterface[]> {
        const result: QueryResult = await pool.query('SELECT * FROM "user"');
        return result.rows;
    }

    public async createUser(newUser: UserCreateInterface): Promise<UserInterface> {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            const result: QueryResult<UserInterface> = await client.query<UserInterface>(
                'INSERT INTO "user"(username,password,email,telefono) VALUES ($1,$2,$3,$4) RETURNING *',
                [newUser.username, newUser.password, newUser.email, newUser.telefono]
            );
            const user = result.rows[0];
            if (!user) {
                throw new AppError("NO se puedo crear el usuario", 400);
            }
            const userId = result.rows[0]!.user_id;

            let roleTable = "";
            switch (newUser.role) {
                case "owner":
                    roleTable = "owner";
                    break;
                case "consumer":
                    roleTable = "consumer";
                    break;
                case "admin":
                    roleTable = "admin";
                    break;
                default:
                    throw new AppError("Rol no válido", 400);
            }

            await client.query(
                `INSERT INTO "${roleTable}"(user_id) VALUES ($1)`,
                [userId]
            );
            await client.query("COMMIT");

            return user!;
        } catch (error:any) {
            await client.query("ROLLBACK");
            if (error.code === "23505") {
                throw new AppError("El username ya existe",409);
            }
            throw error;
        } finally {
            client.release();
        }

    }

    public async findUser(username: string, role: string): Promise<UserInterface> {
        const result: QueryResult<UserInterface> = await pool.query<UserInterface>(
            'SELECT * FROM "user" WHERE username = $1',
            [username]
        );

        if (result.rowCount === 0) {
            throw new AppError("El usuario no existe", 404);
        }

        const userFound = result.rows[0];

        let roleTable = "";
        switch (role) {
            case "owner":
                roleTable = "owner";
                break;
            case "consumer":
                roleTable = "consumer";
                break;
            case "admin":
                roleTable = "admin";
                break;
            default:
                throw new AppError("Rol no válido", 400);
        }

        const checkRole = await pool.query(
            `SELECT * FROM ${roleTable} WHERE user_id = $1`,
            [userFound?.user_id]
        );
        if (checkRole.rowCount === 0) {
            throw new AppError(`El usuario no existe con el rol ${role}` , 404);
        }
        userFound!.role = role;

        return userFound!;
    }
}

export default UserModel;