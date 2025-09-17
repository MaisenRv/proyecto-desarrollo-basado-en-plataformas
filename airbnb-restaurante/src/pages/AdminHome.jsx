import { AuthContext } from "../providers/AuthProvider"
import { useContext } from "react"

const AdminHome = () => {
    const {user} = useContext(AuthContext)

    return (
        <>
            <h1>Esta es una ruta protegida {user}</h1>
        </>
    )    
}

export default AdminHome