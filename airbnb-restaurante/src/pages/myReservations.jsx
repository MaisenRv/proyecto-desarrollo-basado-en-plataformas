import { useEffect, useState } from "react";
import { reservationAPI } from "../api/reservation.api";
import styled from "styled-components";
import Boton  from "../components/Boton";

const Wrap = styled.div`
  width: 100%;
  overflow-x: auto;
  box-sizing: border-box;
  color: var(--raisin-black);
  padding: 9px;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  min-width: 920px;
  width: 100%;
  table-layout: fixed;
  box-sizing: border-box;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  background-color: white;
`;

const Th = styled.th`
  padding: 8px;
  font-size: 1rem;
  text-align: left;
  box-sizing: border-box;
  font-weight: 500;
  border-radius: 6px;
  border: 3px solid var(--antiflash-white);
`;

const Td = styled.td`
  height: 48px;
  vertical-align: middle;
  font-size: 0.8rem;
  box-sizing: border-box;
  border-radius: 6px;
  border: 3px solid var(--antiflash-white);
  text-align: center;
`;

const ReservationCell = styled.div`
  width: 98%;
  height: 98%;
  display: flex;
  font-weight: 400;
  border-radius: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--vivid-sky-blue);
  color: #000;

  ${({ $aviable }) => $aviable && `
    background: var(--green-active);
    color: #fff;
  `}
  ${({ $aviable }) => !$aviable && `
    background: #d9534f;
    color: #fff;
  `}
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 90%;
    align-content: center;
`

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [restaurant, setRestaurant] = useState({});

  const handleDelete = async (reservation_id) => {
    try {
      await reservationAPI.delete(reservation_id);
      setReservations((prev) =>
        prev.filter((reserva) => reserva.reservation_id !== reservation_id)
      );
    } catch (error) {
      console.error("Error eliminando reserva:", error);
    }
  };

  useEffect(() => {
    async function loadReservations() {
      try {
        const result = await reservationAPI.getMyReservations();
        setRestaurant(result.data.restaurant);
        setReservations(result.data.reservations);
      } catch (error) {
        console.error("Error cargando reservas:", error);
      }
    }
    loadReservations();
  }, []);

  return (
    <Container>
      <h2>Mis Reservas</h2>
      {
        reservations.length == 0 ? (
          <p>No tienes reservas.</p>
        ) :
          <Wrap>
            <StyledTable>
              <thead>
                <tr>

                  <Th>Restaurante</Th>
                  <Th>Mesa</Th>
                  <Th>Fecha</Th>
                  <Th>Hora</Th>
                  <Th>Acciones</Th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reserva) => (
                  <tr key={reserva.reservation_id}>
                    <Td>{restaurant.name}</Td>
                    <Td>{reserva.table_id}</Td>
                    <Td>{new Date(reserva.reservation_data).toLocaleDateString()}</Td>
                    <Td>{reserva.reservation_time}</Td>
                    <Td>
                      <Boton
                        background={"#d9534f"} 
                        fontSize={"0.8rem"}
                        type="button"
                        handleClick={() => handleDelete(reserva.reservation_id)}
                      >
                        Eliminar
                      </Boton>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </Wrap>
      }

    </Container>
  );
}
