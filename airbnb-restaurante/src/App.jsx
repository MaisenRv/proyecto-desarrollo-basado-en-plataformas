import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";

import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Home from "./pages/Home.jsx";
import AdminHome from "./pages/AdminHome.jsx";

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminHome/>}  />
      </Route>
    </Routes>
  );
}

export default App;
