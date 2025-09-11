import Login from "./login";
import Boton from "./components/Boton";
function App() {
  return (
    <div>
      {/* Si quieres puedes dejar el Hola mundo arriba */}
      <h1>AIRBNB RESTAURANTES</h1>
      <Boton  propiedad={"hola"}  >  hpañ </Boton>
      {/* Aquí sí renderizamos el login */}
      <Login />
    </div>
  );
}

export default App;
