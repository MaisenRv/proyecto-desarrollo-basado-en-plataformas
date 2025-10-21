import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Home from "./pages/Home.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import CreateRestaurant from "./pages/createRestaurant.jsx";
import MeRestaurants from "./pages/MeRestaurants.jsx";
import EditRestaurant from "./pages/EditRestant.jsx";
import MeTables from "./pages/MeTables.jsx";
import CreateTable from "./pages/CreateTable.jsx";
import EditTable from "./pages/EditTable.jsx";
function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/* USER */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<PrivateRoute><AdminHome/></PrivateRoute>} />
        {/* RESTAURANT */}
        <Route path="/createRestaurant" element={<PrivateRoute><CreateRestaurant/></PrivateRoute>}  />
        <Route path="/editRestaurants/:id" element={<PrivateRoute><EditRestaurant/></PrivateRoute>}/>
        <Route path="/restaurants" element={<PrivateRoute><MeRestaurants/></PrivateRoute>}/>
        <Route path="/restaurantsTables/:id" element={<PrivateRoute><MeTables/></PrivateRoute>}/>
        {/* TABLE */}
        <Route path="/createTable/:id" element={<PrivateRoute><CreateTable/></PrivateRoute>} />
        <Route path="/editTable/:id" element={<PrivateRoute><EditTable/></PrivateRoute>} />

      </Route>
    </Routes>
  );
}

export default App;
