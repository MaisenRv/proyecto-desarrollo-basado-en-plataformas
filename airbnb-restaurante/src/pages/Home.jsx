import { useEffect, useState, useContext } from "react"
import { restaurantAPI } from "../api/restaurant.api"
import imgPlaceholder from "../assets/imagen.png"
import PublicCard from "../components/PublicCard"
import GridContainer from "../components/GridContainer"
import { AuthContext } from "../providers/AuthProvider"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const [restaurants, setRestaurants] = useState([])
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()


    useEffect(() => {
        getRestaurants()
    }, [])
    const handleCardClick = (restaurant) => {
        if (!user) {
            alert("Por favor, inicie sesión para hacer una reserva.")
            return
        }
        navigate(`/crearReserva/${restaurant.restaurant_id}`)
    }

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
                        onClick={() => handleCardClick(restaurant)}
                    />
                ))
            )
            return
        }
        setRestaurants(["NO existen restaurantes"])
    }



    return (
        <GridContainer>
            {restaurants}
        </GridContainer>
    )
}

export default Home