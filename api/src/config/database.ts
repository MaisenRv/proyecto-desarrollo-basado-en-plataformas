import { Pool } from "pg";
import env from "./env.js"

const pool = new Pool({
    user: env.DATABASE.USER,
    host: env.DATABASE.HOST,
    database: env.DATABASE.DB_NAME,
    password: env.DATABASE.PASSWORD,
    port: env.DATABASE.PORT
});

export default pool;
