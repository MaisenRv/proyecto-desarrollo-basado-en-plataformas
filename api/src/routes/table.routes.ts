import { Router } from "express";
import ROUTES from "../config/routes.js";
import TableController from "../controllers/table.controller.js";
import { authMiddleware, authorize } from "../middleware/Auth.middleware.js";
import { Roles } from "../types/auth.type.js";
import { validate } from "../middleware/Validations.middleware.js";
import { TableCreateSchema,TablesByRestaurantSchema } from "../middleware/schemas/TableSchema.js";

const tableRouter = Router();
const tableController = new TableController();
tableRouter.post(
    ROUTES.tables.getByRestaurantId,
    authMiddleware,
    authorize([Roles.OWNER, Roles.ADMIN, Roles.CONSUMER]),
    validate(TablesByRestaurantSchema),
    tableController.getByRestaurantId
);
tableRouter.post(
    ROUTES.tables.getById,
    authMiddleware,
    authorize([Roles.OWNER, Roles.ADMIN]),
    tableController.getById
);
tableRouter.post(
    ROUTES.tables.create,
    authMiddleware,
    authorize([Roles.OWNER, Roles.ADMIN]),
    validate(TableCreateSchema),
    tableController.createTable
);
tableRouter.delete(
    ROUTES.tables.delete,
    authMiddleware,
    authorize([Roles.OWNER, Roles.ADMIN]),
    tableController.deleteTable
);
tableRouter.put(
    ROUTES.tables.update,
    authMiddleware,
    authorize([Roles.OWNER, Roles.ADMIN]),
    tableController.updateTable
);

export default tableRouter;