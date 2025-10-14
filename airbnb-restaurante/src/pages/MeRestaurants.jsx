import { restaurantAPI } from "../api/restaurant.api"
import Card from "../components/Card"
import { useEffect, useState } from "react"
import GridContainer from "../components/GridContainer"
import imgPlaceholder from "../assets/imagen.png"
import ActivateBoton from "../components/ActivateBoton"
import { useNavigate } from "react-router-dom"

const MeRestaurants = () => {
    const [restaurantes, setRestaurantes] = useState([])
    const navigate = useNavigate()

    const handleCrear = () => {
        navigate("/createRestaurant")
    }

    const onDelete = async (id) => {
        try {
            const result = await restaurantAPI.deleteRestaurant(id)
            alert(result.msg)
            setRestaurantes(prev => prev.filter(rest => rest.restaurant_id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const botonCrear =
        <ActivateBoton key="crear" onClick={handleCrear}>
            <span style={{ fontSize: "6rem" }}>+</span> <br />Crear
        </ActivateBoton>

    const getRestaurants = async () => {
        const result = await restaurantAPI.getMeRestaurants()
        setRestaurantes(result)
    }

    useEffect(() => {
        const fectchData = async () => {
            try {
                await getRestaurants();
            } catch (error) {
                setRestaurantes([])
            }
        }
        fectchData()
    }, [])

    return (
            <GridContainer>
                {botonCrear}
                {
                    restaurantes.map((restaurant) => (
                        <Card
                            key={restaurant.restaurant_id}
                            restaurant_id={restaurant.restaurant_id}
                            imagen={restaurant.img && restaurant.img.trim() !== "" ? restaurant.img : imgPlaceholder}
                            nombre={restaurant.name}
                            descripción={restaurant.description}
                            direccion={restaurant.address}
                            horarioApertura={restaurant.opening_hours}
                            horarioCierre={restaurant.closing_hours}
                            isActive={restaurant.is_active}
                            onDelete={() => onDelete(restaurant.restaurant_id)}
                        />
                    ))
                }
            </GridContainer>
    )
}

export default MeRestaurants