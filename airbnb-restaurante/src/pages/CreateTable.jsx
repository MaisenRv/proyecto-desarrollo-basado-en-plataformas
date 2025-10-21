import Form from "../components/Form";
import Input from "../components/Input";
import Select from "../components/Select";
import Boton from "../components/Boton";

import { useParams,useNavigate } from "react-router-dom";
import { useState } from "react";
import { tableAPI } from "../api/table.api";

const CreateTable = () => {
    const { id } = useParams();
    const [table, setTable] = useState({ restaurant_id: parseInt(id), name: "", available: true });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await tableAPI.create(table);
            setTable({ restaurant_id: parseInt(id), name: "", available: true });
            alert("Mesa creada correctamente");
            navigate(-1);
        } catch (error) {
            console.error("Error creating table:", error);
        }
    };

    return (
        <Form handleSubmit={handleSubmit}>
            <h2>Crear Nueva Mesa</h2>
            <Input
                type="text"
                placeholder="Nombre de la mesa"
                value={table.name}
                onChange={(e) => setTable({ ...table, name: e.target.value })}
                required
            />
            <Select
                value={table.available ? "available" : "unavailable"}
                onChange={(e) => setTable({ ...table, available: e.target.value === "available" })}
            >
                <option value="available">Disponible</option>
                <option value="unavailable">No Disponible</option>
            </Select>
            <Boton type="submit" width="100%" height="45px">Crear Mesa</Boton>
        </Form>
    );
};

export default CreateTable;