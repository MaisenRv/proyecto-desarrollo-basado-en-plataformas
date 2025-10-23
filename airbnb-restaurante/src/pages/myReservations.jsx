import React, { useEffect, useState } from "react";
import { ENDPOINTS } from "../api/endpoints";
import { fetchWrapper } from "../utils/fetchWrapper";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function loadReservations() {
      try {
        const data = await fetchWrapper.get(ENDPOINTS.reservation.getByUser);
        setReservations(data);
      } catch (error) {
        console.error("Error cargando reservas:", error);
      }
    }
    loadReservations();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Mis Reservas</h2>
      <table className="table table-striped">
        <thead>
          <tr>
          
            <th>Restaurante</th>
            <th>Mesa</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{reserva.restaurant?.name}</td>
              <td>{reserva.table?.name}</td>
              <td>{new Date(reserva.date).toLocaleString()}</td>
              <td>{reserva.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
