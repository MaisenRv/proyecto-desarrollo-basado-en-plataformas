import { useState } from "react";
import styled from "styled-components";
import Form from "../components/Form";
import Input from "../components/Input";
import Boton from "../components/Boton";



const Title = styled.h2`
  text-align: center;
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: var(--raisin-black);
`;

export default function CreateRestaurant() {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

  };

  return (
    <Form handleSubmit={handleSubmit} className="form-container">
      <Title>Crear restaurante</Title>
      <Input
        type="text"
        placeholder="Nombre del restaurante"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className="input"
      />
      <Input
        type="text"
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        required
        className="input"
      />
      <Input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        required
        className="input"
      />
      <Boton type="submit"> Crear Restaurante </Boton>
    </Form>
  );
}
