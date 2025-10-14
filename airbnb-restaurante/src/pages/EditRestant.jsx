import { useState, useEffect } from "react";
import styled from "styled-components";
import Form from "../components/Form";
import Input from "../components/Input";
import Boton from "../components/Boton";
import Select from "../components/Select"
import { restaurantAPI } from "../api/restaurant.api";
import { useNavigate } from "react-router-dom";

const Title = styled.h2`
  text-align: center;
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: var(--raisin-black);
`;

export default function EditRestaurant() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    opening_hours: "",
    closing_hours: ""
  })

  const [img, setImg] = useState(null)
  const [hoursOptions, setHoursOptions] = useState([])


  const createHours = () => {
    const hours = []
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 2; j++) {
        let hour = `${i}:${j == 0 ? "00" : "30" }`
        hours.push(hour)
      }
    }
    return hours
  }

  useEffect(() => {
    const hours = createHours()
    setHoursOptions(
      hours.map(hour => (
        <option key={hour} value={hour}>{hour}</option>
      ))
    )
  }, [])

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

      setForm({
        name: "",
        description: "",
        address: "",
        opening_hours: "",
        closing_hours: ""
      })
      setImg(null)
      navigate("/restaurants")

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
      <Select value={form.opening_hours} onChange={(e) => setForm(prevState => ({ ...prevState, opening_hours: e.target.value }))}>
        <option value=""> Seleccione hora de apertura</option>
        {hoursOptions}
      </Select>
      <Select value={form.closing_hours} onChange={(e) => setForm(prevState => ({ ...prevState, closing_hours: e.target.value }))}>
        <option value=""> Seleccione hora de cierre</option>
        {hoursOptions}
      </Select>
      <Input
        type="file"
        placeholder="Hora de apertura"
        accept="image/*"
        onChange={(e) => setImg(e.target.files[0])}
      />
      <Boton type="submit"> Crear Restaurante </Boton>
    </Form>
  );
}