import pool from "../config/database.js";
import AppError from "../utils/AppError.js";
import { MessageInterface } from "../interfaces/message.interface.js";
import { QueryResult } from "pg";
import { TableGetInterface, TablesByRestaurantInterface, TableCreateInterface, TableInterface, TableDeleteInterface, TableUpdateInterface } from "../interfaces/table.interface.js";

class TableModel {
    public async getByRestaurantId(restaurant: TablesByRestaurantInterface): Promise<TablesByRestaurantInterface[]> {
        try {
            const result: QueryResult = await pool.query(
                'SELECT * FROM "table" WHERE restaurant_id = $1',
                [restaurant.restaurant_id]
            );
            if (result.rowCount === 0) {
                throw new AppError("NO existe mesas para este restaurante", 404);
            }
            return result.rows;
        } catch (error) { throw error; }
    }

    public async create(newTable: TableCreateInterface): Promise<TableInterface> {
        try {
            const result: QueryResult = await pool.query(
                'INSERT INTO "table"(restaurant_id,name,available) VALUES ($1,$2,$3) RETURNING *',
                [newTable.restaurant_id, newTable.name, newTable.available]
            );
            const table = result.rows[0];
            if (!table) {
                throw new AppError("NO se puedo crear la mesa", 400);
            }
            return table;
        } catch (error) { throw error; }
    }

    public async delete(table: TableDeleteInterface): Promise<MessageInterface> {
        try {
            const result: QueryResult = await pool.query(
                'DELETE FROM "table" WHERE table_id = $1',
                [table.table_id]
            );
            return { msg: "Borrado", data: result };
        } catch (error) { throw error; }
    }

    public async update(table: TableInterface): Promise<number> {
        console.log(table);
        try {
            const result: QueryResult = await pool.query(
                'UPDATE "table" SET name=$1,available=$2,update_at=$3 WHERE table_id=$4 AND restaurant_id =$5',
                [table.name, table.available, table.update_at, table.table_id, table.restaurant_id]
            );
            const re = result.rowCount;
            if (!re) {
                throw new AppError("NO se pudo actualizar la mesa", 400);
            }
            return re;
        } catch (error) { throw error; }
    }

    public async getById(table: TableGetInterface): Promise<TableInterface> {
        try {
            const result: QueryResult = await pool.query(
                'SELECT * FROM "table" WHERE table_id = $1',
                [table.table_id]
            );
            const tableFound = result.rows[0];
            if (!tableFound) {
                throw new AppError("NO existe la mesa", 404);
            }
            return tableFound;
        } catch (error) { throw error; }
    }
}

export default TableModel;