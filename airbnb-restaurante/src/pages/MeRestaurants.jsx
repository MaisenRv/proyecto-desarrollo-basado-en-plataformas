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

    const handleCrear = () =>{
        navigate("/createRestaurant")
    } 

    const botonCrear = 
        <ActivateBoton key="crear" onClick={handleCrear}>
            <span style={{fontSize:"6rem"}}>+</span> <br/>Crear
        </ActivateBoton>

    const getRestaurants = async () => {
        const result = await restaurantAPI.getMeRestaurants()
        setRestaurantes(
            [
                botonCrear,
                ...result.map((restaurant) => (
                    <Card
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
            ]
        )

    }

    useEffect(() => {
        const fectchData = async () => {
            try {
                await getRestaurants();
            } catch (error) {
                setRestaurantes([botonCrear])
            }
        }
        fectchData()
    }, [])

    return (
        <>
            <GridContainer>
                {restaurantes}
            </GridContainer>
        </>
    )
}

export default MeRestaurants