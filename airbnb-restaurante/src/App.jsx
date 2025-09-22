import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Home from "./pages/Home.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import DeleteRestaurant from "./pages/deleteRestaurant.jsx";
import CreateRestaurant from "./pages/createRestaurant.jsx";
import MeRestaurants from "./pages/MeRestaurants.jsx";

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<PrivateRoute><AdminHome/></PrivateRoute>} />
        <Route path="/delete" element={<PrivateRoute><DeleteRestaurant/></PrivateRoute>}  />
        <Route path="/create" element={<PrivateRoute><CreateRestaurant/></PrivateRoute>}  />
        <Route path="/restaurants" element={<PrivateRoute><MeRestaurants/></PrivateRoute>}  />
      </Route>
    </Routes>
  );
}

export default App;
