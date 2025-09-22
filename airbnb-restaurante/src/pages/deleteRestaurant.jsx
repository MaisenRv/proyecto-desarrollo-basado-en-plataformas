import { useState } from "react";
import "./deleteandcreate.css";

export default function DeleteRestaurant() {
  const [restaurantId, setRestaurantId] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();

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
