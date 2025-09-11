import { useState } from "react";
import Login from "./login.jsx";
import Register from "./components/register.jsx";

function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      {showRegister ? (
        <Register onSwitch={() => setShowRegister(false)} />
      ) : (
        <Login onSwitch={() => setShowRegister(true)} />
      )}
    </div>
  );
}

export default App;
