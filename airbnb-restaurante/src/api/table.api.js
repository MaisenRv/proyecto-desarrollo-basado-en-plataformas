import { fetchWrapper } from "../utils/fetchWrapper";
import { ENDPOINTS } from "./endpoints";

export const tableAPI = {
    getMeTables: (restaurant_id) =>
        fetchWrapper(
            ENDPOINTS.table.getMeTables,
            {
                method: "POST",
                body: JSON.stringify({restaurant_id:parseInt(restaurant_id)}),
                credentials: "include"
            },
        ),
    getTableById: (table_id) =>
        fetchWrapper(
            ENDPOINTS.table.getTableById,
            {
                method: "POST",
                body: JSON.stringify({table_id:parseInt(table_id)}),
                credentials: "include"
            },
        ),
    create: (newTable) =>
        fetchWrapper(
            ENDPOINTS.table.create,
            {
                method: "POST",
                body: JSON.stringify({...newTable}),
                credentials: "include"
            },
        ),
    update: (table) =>
        fetchWrapper(
            ENDPOINTS.table.update,
            {
                method: "PUT",
                body: JSON.stringify({...table}),
                credentials: "include"
            },
        ),
    delete: (table_id) =>
        fetchWrapper(
            ENDPOINTS.table.delete,
            {
                method: "DELETE",
                body: JSON.stringify({table_id}),
                credentials: "include"
            },
        ),
}