import { useState } from "react";
import Swal from "sweetalert2";
import "./deleteandcreate.css";

export default function DeleteRestaurant() {
  const [restaurantId, setRestaurantId] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/restaurants/${restaurantId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        Swal.fire("🪣 Restaurante eliminado correctamente", "", "success");
        setRestaurantId("");
      } else {
        const data = await res.json();
        Swal.fire("❌ Error", data.message || "Error al eliminar el restaurante", "error");
      }
    } catch (error) {
      Swal.fire("⚠️ Error", "No se pudo conectar con el servidor", "error");
    }
  };

  return (
    <div className="page-container">
      <h2 className="title">Eliminar restaurante</h2>
      <form onSubmit={handleDelete} className="form-container">
        <input
          type="text"
          placeholder="ID del restaurante"
          value={restaurantId}
          onChange={(e) => setRestaurantId(e.target.value)}
          required
          className="input"
        />
        <button type="submit" className="btn-danger">
          Eliminar Restaurante
        </button>
      </form>
    </div>
  );
}
