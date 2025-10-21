import { NextFunction, Request, Response } from "express";
import TableService from "../services/table.service.js";


class TableController {
    private tableService = new TableService();

    public getByRestaurantId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tables = await this.tableService.getByRestaurantId(req.body);
            res.status(200).json({ tables:tables })
        } catch (error) { next(error); }
    }
    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const table = await this.tableService.getById(req.body);
            res.status(200).json({ table: table });
        } catch (error) { next(error); }
    }
    public createTable = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const table =  await this.tableService.create(req.body);
            res.status(200).json({ table: table });
        } catch (error) { next(error); }
    }
    
    public deleteTable = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const message = await this.tableService.delete(req.body);
            res.status(200).json({ message });
        } catch (error) { next(error); }
    }
    public updateTable = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.tableService.update(req.body);
            res.status(200).json({ updatedRows: result });
        } catch (error) { next(error); }
    }
}

export default TableController;