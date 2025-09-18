import { Link } from "react-router-dom"
import { AuthContext } from "../providers/AuthProvider"
import { useContext, useEffect, useState } from "react"

const Header = () => {
    const { user } = useContext(AuthContext)

    const [ routerList, setRouterList]  = useState([])

    const resetRouter = () =>{
        setRouterList(
            () => {
                const newList = [<Link key="home" to="/"> Home |</Link>]

                if(!user){
                    newList.push(<Link key="login" to="/login"> Login |</Link>)
                    newList.push(<Link key="register" to="/register"> Register |</Link>)
                }else{
                    newList.push(<Link key="admin" to="/admin"> Admin |</Link>)
                    newList.push(<Link key="delete" to="/delete"> delete restaurante |</Link>)
                    newList.push(<Link key="recreategister" to="/create"> Crear restaurante |</Link>)
                }
                return newList
            }
        )
    }

    useEffect(resetRouter, [user])

    return (
        <header>
            <nav>
                {routerList}
            </nav>
        </header>
    )

}

export default Header