import TableModel from "../models/Table.model.js";
import { TableGetInterface, TablesByRestaurantInterface,TableCreateInterface, TableDeleteInterface, TableUpdateInterface } from "../interfaces/table.interface.js";

class TableService {
    private tableModel = new TableModel();
    public async getByRestaurantId(restaurant:TablesByRestaurantInterface){
        return await this.tableModel.getByRestaurantId(restaurant);
    }

    public async getById(table: TableGetInterface) {
        return await this.tableModel.getById(table);
    }

    public async create(newTable: TableCreateInterface) {
        return await this.tableModel.create(newTable);
    }
    
    public async delete(tableId: TableDeleteInterface) {
        return await this.tableModel.delete(tableId);
    }
    public async update(table: TableUpdateInterface) {
        table.update_table.update_at = new Date().toISOString();
        table.update_table.table_id = table.old_table.table_id;
        table.update_table.restaurant_id = table.old_table.restaurant_id;
        return await this.tableModel.update(table.update_table);
    }
}
export default TableService;