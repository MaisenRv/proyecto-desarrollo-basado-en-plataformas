import { Link } from "react-router-dom"
import { AuthContext } from "../providers/AuthProvider"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"

const HeaderStyled = styled.header`
    background: var(--raisin-black);
    padding: 1rem 2rem;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
    box-sizing: border-box;
`
const NavStyled = styled.nav`
    display: flex;
    gap: 1.5rem;
`

const AStyled = styled(Link)`
    color: var(--antiflash-white);
    font-size: 1rem;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease-in-out, transform 0.2s ease-in-out;
    &:hover{
        color: var(--vivid-sky-blue); 
        transform: scale(1.05);
    }
`


const Header = () => {
    const { user } = useContext(AuthContext)

    const [routerList, setRouterList] = useState([])

    const resetRouter = () => {
        setRouterList(
            () => {
                const newList = [<AStyled key="home" to="/"> Home </AStyled>]

                if (!user) {
                    newList.push(<AStyled key="login" to="/login"> Login </AStyled>)
                    newList.push(<AStyled key="register" to="/register"> Register </AStyled>)
                } else {
                    newList.push(<AStyled key="admin" to="/admin"> Admin </AStyled>)
                    newList.push(<AStyled key="delete" to="/delete"> delete restaurante </AStyled>)
                    newList.push(<AStyled key="recreategister" to="/create"> Crear restaurante </AStyled>)
                    newList.push(<AStyled key="meRestaurant" to="/restaurants"> Ver mis restaurantes </AStyled>)
                }
                return newList
            }
        )
    }

    useEffect(resetRouter, [user])

    return (
        <HeaderStyled>
            <NavStyled>
                {routerList}
            </NavStyled>
        </HeaderStyled>
    )
}
export default Header;
