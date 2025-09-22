import { useState } from "react";
import styled from "styled-components";
import Boton from "../components/Boton";
import Form from "../components/Form";
import Input from "../components/Input";
import "./deleteandcreate.css";

const Title = styled.h2`
  text-align: center;
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: var(--raisin-black);
`;

export default function DeleteRestaurant() {
  const [restaurantId, setRestaurantId] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();

  };

  return (

    <Form handleSubmit={handleDelete}>
      <Title>Eliminar restaurante</Title>
      <Input
        type="text"
        placeholder="ID del restaurante"
        value={restaurantId}
        onChange={(e) => setRestaurantId(e.target.value)}
        required
      />
      <Boton type="submit">
        Eliminar Restaurante
      </Boton>
    </Form>

  );
}
