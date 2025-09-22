import { restaurantAPI } from "../api/restaurant.api"
import Card from "../components/Card"
import { AuthContext } from "../providers/AuthProvider"
import { useContext, useEffect, useState } from "react"


const MeRestaurants = () => {
    const [restaurantes, setRestaurantes] = useState({})
    const { user } = useContext(AuthContext)
    // useEffect(() => {

    //     restaurantAPI.getAll(user.user_id)
    //     .then((data)=>{setRestaurantes(data)})
      

    // }, [])


    return (
        <>

            <Card nombre="Restaurante" descripción="descripcion" direccion="Direccion" imagen="null"></Card>
        </>
    )
}

export default MeRestaurants