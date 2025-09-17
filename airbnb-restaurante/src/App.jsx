
import { useState } from "react";
import Login from "./login.jsx";
import Register from "./components/register.jsx";
import Card from "./components/Card.jsx"; 
function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      <Card>
    nombre = "KFC"
    descripción = "Comida rápida y deliciosa"
    direccion = "Calle Falsa 123"
    imagen = "https://example.com/kfc.jpg"

      </Card>
      {showRegister ? (
        <Register onSwitch={() => setShowRegister(false)} />
      ) : (
        <Login onSwitch={() => setShowRegister(true)} />
      )}
    </div>
  );
}

export default App;
