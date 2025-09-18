import { useState } from "react";
import Swal from "sweetalert2";

export default function CreateRestaurant() {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/restaurantes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, direccion, telefono }),
      });

      if (res.ok) {
        Swal.fire("✅ Restaurante creado", "El restaurante ha sido creado exitosamente", "success");
        setNombre("");
        setDireccion("");
        setTelefono("");
      } else {
        const data = await res.json();
        Swal.fire("❌ Error", data.message || "Error al crear el restaurante", "error");
      }
    } catch (error) {
      Swal.fire("⚠️ Error", "No se pudo conectar con el servidor", "error");
    }
  };

  return (
    <div className="page-container">
      <h2>Crear restaurante</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Nombre del restaurante"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
        <button type="submit">Crear Restaurante</button>
      </form>
    </div>
  );
}
