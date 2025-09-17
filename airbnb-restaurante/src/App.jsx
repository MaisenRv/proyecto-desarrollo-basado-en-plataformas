import { useState } from "react";
import Login from "./login";
import Register from "./components/register.jsx";
import Boton from "./components/Boton";

function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      {showRegister ? (
        <Register onSwitch={() => setShowRegister(false)} />
      ) : (
        <Login onSwitch={() => setShowRegister(true)} />
      )}
      <Boton />
    </div>
  );
}

export default App;
