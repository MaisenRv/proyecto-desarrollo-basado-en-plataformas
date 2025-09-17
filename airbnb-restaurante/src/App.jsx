import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";

import Login from "./login.jsx";
import Register from "./components/register.jsx";
import Card from "./components/Card.jsx"; 
function App() {


  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
