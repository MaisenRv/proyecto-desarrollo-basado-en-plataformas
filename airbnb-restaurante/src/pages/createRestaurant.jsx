import { useState } from "react";
import styled from "styled-components";
import Form from "../components/Form";
import Input from "../components/Input";
import Boton from "../components/Boton";
import { restaurantAPI } from "../api/restaurant.api";


const Title = styled.h2`
  text-align: center;
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: var(--raisin-black);
`;

export default function CreateRestaurant() {

  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    opening_hours: "",
    closing_hours: ""
  })

  const [img, setImg] = useState(null)

  const onChangeImg = (e) => {
    setImg(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      if (img) {
        data.append("file", img);
      }

      const result = await restaurantAPI.create(data)
      alert(result)
    } catch (error) {
      alert(error.data.error)
    }

  };

  return (
    <Form handleSubmit={handleSubmit} className="form-container">
      <Title>Crear restaurante</Title>
      <Input
        type="text"
        placeholder="Nombre del restaurante"
        value={form.name}
        onChange={(e) => setForm(prevState => ({ ...prevState, name: e.target.value }))}
        required
      />
      <Input
        type="text"
        placeholder="Descripcion"
        value={form.description}
        onChange={(e) => setForm(prevState => ({ ...prevState, description: e.target.value }))}
      />
      <Input
        type="text"
        placeholder="Dirección"
        value={form.address}
        onChange={(e) => setForm(prevState => ({ ...prevState, address: e.target.value }))}
        required
      />
      <Input
        type="text"
        placeholder="Hora de apertura"
        value={form.opening_hours}
        onChange={(e) => setForm(prevState => ({ ...prevState, opening_hours: e.target.value }))}
        required
      />
      <Input
        type="text"
        placeholder="Hora de cierre"
        value={form.closing_hours}
        onChange={(e) => setForm(prevState => ({ ...prevState, closing_hours: e.target.value }))}
        required
      />
      <Input
        type="file"
        placeholder="Hora de apertura"
        accept="image/*"
        onChange={onChangeImg}
      />
      <Boton type="submit"> Crear Restaurante </Boton>
    </Form>
  );
}
