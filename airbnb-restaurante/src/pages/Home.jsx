import { useEffect, useState } from "react"
import { restaurantAPI } from "../api/restaurant.api"
import imgPlaceholder from "../assets/imagen.png"
import PublicCard from "../components/PublicCard"
import GridContainer from "../components/GridContainer"

const Home = () => {
    const [restaurants, setRestaurants] = useState([])

    const getRestaurants = async () => {
        const result = await restaurantAPI.getAll()
        if (result.restaurants.length != 0) {
            setRestaurants(
                result.restaurants.map((restaurant) => (
                    <PublicCard
                        key={restaurant.restaurant_id}
                        imagen={restaurant.img == null ? imgPlaceholder : restaurant.img}
                        nombre={restaurant.name}
                        descripción={restaurant.description}
                        direccion={restaurant.address}
                        horarioApertura={restaurant.opening_hours}
                        horarioCierre={restaurant.closing_hours}
                        isActive={restaurant.is_active}
                    />
                ))
            )
            return
        }
        setRestaurants(["NO existen restaurantes"])
    }

    useEffect(() => {
        getRestaurants()
    }, [])

    return (
        <GridContainer>
            {restaurants}
        </GridContainer>
    )
}

export default Home