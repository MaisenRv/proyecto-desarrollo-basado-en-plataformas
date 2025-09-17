import express from "express";
import cors from "cors"
import router from "./routes/index.routes.js";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middleware/ErrorHandler.middleware.js";
import ROUTES from "./config/routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(ROUTES.base,router)



app.use(errorHandler);

export default app;