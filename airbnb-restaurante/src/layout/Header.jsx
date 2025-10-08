import { Link } from "react-router-dom"
import { AuthContext } from "../providers/AuthProvider"
import { useContext, useEffect, useState } from "react"
import { userApi } from "../api/user.api"
import styled from "styled-components"
import UserMenu from "../components/UserMenu"

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
    flex-direction: row;
    justify-content: space-between;
`
const ContainerRight = styled.nav`
    display: flex;
    gap: 1.5rem;
    flex-direction: row;
`

const AStyled = styled(Link)`

    ${({ $menu }) => $menu ? `
        padding: 10px 14px;
        text-align: left;
        color: var(--raisin-black);
        transition: background 0.2s ease;
        font-size: 0.9rem;
        &:hover {
            background-color: #f3f3f3;
        }

        &:active {
            background-color: #e0e0e0;
        }
            
    `:
        `
        color: var(--antiflash-white);
        font-weight: 500;
        transition: color 0.2s ease-in-out, transform 0.2s ease-in-out;
        font-size: 1rem;
        &:hover{
            color: var(--vivid-sky-blue); 
            transform: scale(1.05);
        }
    `}
    text-decoration: none;
`


const Header = () => {
    const { user, setUser } = useContext(AuthContext)
    const handleLogout = async () => {
        const result = await userApi.logout()
        alert(result.msg)
        setUser(null)
    }

  
    // newList.push(<AStyled key="admin" to="/admin"> Admin </AStyled>)
    // newList.push(<AStyled key="delete" to="/delete"> delete restaurante </AStyled>)

    return (
        <HeaderStyled>
            <NavStyled>
                <AStyled key="home" to="/"> Home </AStyled>
                {!user ?
                    <ContainerRight key="container">
                        <AStyled key="register" to="/register"> Register </AStyled>
                        <AStyled key="login" to="/login"> Login </AStyled>
                    </ContainerRight>
                    :
                    <UserMenu key="userMenu">
                        <AStyled $menu key="meRestaurant" to="/restaurants">Mis restaurantes </AStyled>
                        <AStyled $menu key="logout" to="/" onClick={handleLogout}> Cerrar sesion </AStyled>
                    </UserMenu>

                }
            </NavStyled>
        </HeaderStyled>
    )
}
export default Header;
