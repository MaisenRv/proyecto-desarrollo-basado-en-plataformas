import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import styled from "styled-components"

const MainStyled = styled.main`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--antiflash-white);
`

const MainLayout = () => {
    return (
        <>
            <Header></Header>
            <MainStyled>
                <Outlet />
            </MainStyled>
            <Footer></Footer>
        </>

    )
}

export default MainLayout