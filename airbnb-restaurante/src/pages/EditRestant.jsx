import { useState, useEffect } from "react";
import styled from "styled-components";
import Form from "../components/Form";
import Input from "../components/Input";
import Boton from "../components/Boton";
import Select from "../components/Select"
import { restaurantAPI } from "../api/restaurant.api";
import { useNavigate, useParams } from "react-router-dom";
import imgPlaceholder from "../assets/imagen.png"

const Title = styled.h2`
  text-align: center;
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: var(--raisin-black);
`;

const ImgStyled = styled.img`
    height: 200px;
    object-fit: contain;
`

export default function EditRestaurant() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [form, setForm] = useState({
    old_restaurant: {
      restaurant_id: id,
      owner_id: 0,
      name: "",
      description: "",
      address: "",
      opening_hours: "",
      closing_hours: "",
      is_active: true,
      img: "",
      created_at: "",
      update_at: ""
    },
    update_restaurant: {
      name: "",
      description: "",
      address: "",
      opening_hours: "",
      closing_hours: "",
      is_active: true,
    }
  })

  const [img, setImg] = useState(null)
  const [hoursOptions, setHoursOptions] = useState([])


  const createHours = () => {
    const hours = []
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 2; j++) {
        let hour = `${i}:${j == 0 ? "00" : "30"}`
        hours.push(hour)
      }
    }
    return hours
  }

  const getRestaurant = async (id) => {
    const result = await restaurantAPI.getRestaurantById(id)
    return result
  }

  useEffect(() => {
    const hours = createHours()
    setHoursOptions(
      hours.map(hour => (
        <option key={hour} value={hour}>{hour}</option>
      ))
    )

    const fectchData = async () => {
      try {
        const result = await getRestaurant(id)       
        setForm({
          old_restaurant: {...result, img: result.img == null ? "":result.img},
          update_restaurant: {
            name: result.name,
            description: result.description,
            address: result.address,
            opening_hours: result.opening_hours,
            closing_hours: result.closing_hours,
            is_active: `${result.is_active}`,
          }
        })


      } catch (error) {}
    }
    fectchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("old_restaurant", JSON.stringify(form.old_restaurant))
      data.append("update_restaurant", JSON.stringify(form.update_restaurant))

      if (img) {
        data.append("file", img);
      }

      const result = await restaurantAPI.updateRestaurant(data)
      setForm({
        old_restaurant: {
          restaurant_id: id,
          owner_id: 0,
          name: "",
          description: "",
          address: "",
          opening_hours: "",
          closing_hours: "",
          is_active: "",
          img: "",
          created_at: "",
          update_at: ""
        },
        update_restaurant: {
          name: "",
          description: "",
          address: "",
          opening_hours: "",
          closing_hours: "",
          is_active: "",
        }
      })
      setImg(null)
      navigate("/restaurants")

    } catch (error) {
      alert(error.data.error)
    }

  };

  return (
    <Form handleSubmit={handleSubmit} className="form-container">
      <Title>Actualizar restaurante</Title>
      <Input
        type="text"
        placeholder="Nombre del restaurante"
        value={form.update_restaurant.name}
        onChange={(e) => setForm(prevState => ({ ...prevState, update_restaurant: { ...prevState.update_restaurant, name: e.target.value } }))}
        required
      />
      <Input
        type="text"
        placeholder="Descripcion"
        value={form.update_restaurant.description}
        onChange={(e) => setForm(prevState => ({ ...prevState, update_restaurant: { ...prevState.update_restaurant, description: e.target.value } }))}
      />
      <Input
        type="text"
        placeholder="Dirección"
        value={form.update_restaurant.address}
        onChange={(e) => setForm(prevState => ({ ...prevState, update_restaurant: { ...prevState.update_restaurant, address: e.target.value } }))}
        required
      />
      <Select value={form.update_restaurant.opening_hours} onChange={(e) => setForm(prevState => ({ ...prevState, update_restaurant: { ...prevState.update_restaurant, opening_hours: e.target.value } }))}>
        <option value=""> Seleccione hora de apertura</option>
        {hoursOptions}
      </Select>
      <Select value={form.update_restaurant.closing_hours} onChange={(e) => setForm(prevState => ({ ...prevState, update_restaurant: { ...prevState.update_restaurant, closing_hours: e.target.value } }))}>
        <option value=""> Seleccione hora de cierre</option>
        {hoursOptions}
      </Select>
      <Select value={form.update_restaurant.is_active} onChange={(e) => setForm(prevState => ({ ...prevState, update_restaurant: { ...prevState.update_restaurant, is_active: e.target.value === "true" } }))}>
        <option value=""> Seleccione estado</option>
        <option value="true">Activo</option>
        <option value="false">Inactivo</option>
      </Select>

      <ImgStyled src={form.old_restaurant.img ? form.old_restaurant.img : imgPlaceholder} alt={form.old_restaurant.name} />
      <Input
        type="file"
        placeholder="Imagen"
        accept="image/*"
        onChange={(e) => setImg(e.target.files[0])}
      />

      <Boton type="submit"> Guardar cambios </Boton>
    </Form>
  );
}