import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import Input from "../components/Input";
import Select from "../components/Select";
import Boton from "../components/Boton";
import { tableAPI } from "../api/table.api";

const EditTable = () => {
    const { id } = useParams();
    const [table, setTable] = useState({
        old_table: {
            table_id: 0,
            restaurant_id: 0,
            name: "",
            available: true,
            created_at: "",
            update_at: "",
        },
        update_table: {
            name: "",
            available: true,
        }
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTable = async () => {
            const fetchedTable = await tableAPI.getTableById(id);
            setTable({
                old_table: fetchedTable.table,
                update_table: {
                    name: fetchedTable.table.name,
                    available: fetchedTable.table.available,
                }
            });
        };
        fetchTable();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await tableAPI.update(table);
            setTable(
                {
                    old_table: {
                        table_id: 0,
                        restaurant_id: 0,
                        name: "",
                        available: true,
                        created_at: "",
                        update_at: "",
                    },
                    update_table: {
                        name: "",
                        available: true,
                    }
                }
            );
            alert("Mesa actualizada correctamente");
            navigate(-1);
        } catch (error) {
            console.error("Error updating table:", error);
        }
    };

    return (
        <Form handleSubmit={handleSubmit}>
            <h2>Editar Mesa</h2>
            <Input
                type="text"
                placeholder="Nombre de la mesa"
                value={table.update_table.name}
                onChange={(e) => setTable({ ...table, update_table: { ...table.update_table, name: e.target.value } })}
                required
            />
            <Select
                value={table.update_table.available ? "available" : "unavailable"}
                onChange={(e) => setTable({ ...table, update_table: { ...table.update_table, available: e.target.value === "available" } })}
            >
                <option value="available">Disponible</option>
                <option value="unavailable">No Disponible</option>
            </Select>
            <Boton type="submit" width="100%" height="45px">Actualizar Mesa</Boton>
        </Form>
    );
};

export default EditTable;