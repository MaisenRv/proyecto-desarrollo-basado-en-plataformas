import { restaurantAPI } from "../api/restaurant.api"
import Card from "../components/Card"
import { useEffect, useState } from "react"
import GridContainer from "../components/GridContainer"
import imgPlaceholder from "../assets/imagen.png"

const MeRestaurants = () => {
    const [restaurantes, setRestaurantes] = useState([])
    const getRestaurants = async () => {
        const result = await restaurantAPI.getMeRestaurants()
        setRestaurantes(
            result.map((restaurant) => (
                <Card
                    key={restaurant.restaurant_id}
                    imagen={restaurant.img == null ? imgPlaceholder:restaurant.img}
                    nombre={restaurant.name}
                    descripción={restaurant.description}
                    direccion={restaurant.address}
                    horarioApertura={restaurant.opening_hours}
                    horarioCierre={restaurant.closing_hours}
                    isActive={restaurant.is_active}
                />
            ))
        )

    }

    useEffect(() => {
        try {
            getRestaurants();
        } catch (error) {
            setRestaurantes([])
        }
    }, [])

    return (
        <>
            <GridContainer>
                {restaurantes.length != 0 ? restaurantes: "No tiene restaurantes registrados"}
             </GridContainer>
        </>
    )
}

export default MeRestaurants