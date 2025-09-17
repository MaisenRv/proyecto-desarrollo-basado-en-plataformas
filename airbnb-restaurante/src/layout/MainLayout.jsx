import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
    return (
        <>
            <Header></Header>
            <main>
                <Outlet />
            </main>
            <Footer></Footer>
        </>

    )
}

export default MainLayout