import pool from "./../config/database.js"
import UserInterface from "./../interfaces/user.interface.js"


export const getUsers = async (): Promise<UserInterface[]> => {
  const result = await pool.query('SELECT * FROM "user"');
  return result.rows;
};