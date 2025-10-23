import { AuthContext } from "../providers/AuthProvider"
import { useContext } from "react"
import { userApi } from "../api/user.api"
import styled from "styled-components"
import UserMenu from "../components/UserMenu"
import AMenu from "../components/AMenu"

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

const Header = () => {
    const { user, setUser } = useContext(AuthContext)

    const handleLogout = async () => {
        const result = await userApi.logout()
        alert(result.msg)
        setUser(null)
    }

    return (
        <HeaderStyled>
            <NavStyled>
                <AMenu key="home" to="/"> Inicio </AMenu>
                {!user ? (
                    <ContainerRight key="container">
                        <AMenu key="register" to="/register"> Registro </AMenu>
                        <AMenu key="login" to="/login"> Iniciar Sesion </AMenu>
                    </ContainerRight>
                ) : (
                    <UserMenu key="userMenu">
                        {user.role === "consumer" ? (
                            <>
                                {/* 🔹 Nuevo botón: Mis Reservas */}
                                <AMenu $menu key="myReservations" to="/myReservations">
                                    Mis Reservas
                                </AMenu>
                            </>
                        ) : (
                            <>
                                <AMenu $menu key="meRestaurant" to="/restaurants">
                                    Mis restaurantes
                                </AMenu>
                            </>
                        )}
                        <AMenu $menu key="logout" to="/" onClick={handleLogout}>
                            Cerrar sesión
                        </AMenu>
                    </UserMenu>
                )}
            </NavStyled>
        </HeaderStyled>
    )
}

export default Header
