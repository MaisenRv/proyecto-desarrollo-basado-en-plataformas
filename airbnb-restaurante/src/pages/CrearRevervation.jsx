import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { reservationAPI } from "../api/reservation.api";
import { tableAPI } from "../api/table.api";
import { restaurantAPI } from "../api/restaurant.api";
import styled from "styled-components";
import Boton from '../components/Boton';
import ActivateBoton from '../components/ActivateBoton';
import Input from '../components/Input';
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
  width: 100%;
  overflow-x: scroll;
  box-sizing: border-box;
  color: var(--raisin-black);
  padding: 9px;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  min-width: 920px;
  width: 100%;
  table-layout: fixed;
  /* box-sizing: border-box; */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  background-color: white;
`;

const Th = styled.th`
  font-size: 1rem;
  text-align: left;
  box-sizing: border-box;
  font-weight: 500;
  border-radius: 6px;
  width: 80px;
  border: 3px solid var(--antiflash-white);
`;

const Td = styled.td`
  height: 48px;
  vertical-align: middle;
  font-size: 0.8rem;
  border-radius: 6px;
  box-sizing: border-box;
  border: 3px solid var(--antiflash-white);
  text-align: center;
  width: 80px;
`;

const ReservationCell = styled.div`
  width: 100%;
  height: 100%;
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
const ContainerCotrols = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    width: 100%;
`


const CrearReserva = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tables, setTables] = useState([])
    const [reservations, setReservations] = useState([])
    const [restaurant, setRestaurant] = useState(null)
    const [hoursOptions, setHoursOptions] = useState([])

    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [tableTimeSelected, setTableTimeSelected] = useState({
        table_id: null,
        time: "",
        selected: false
    })

    const getTables = async (id) => {
        try {
            const result = await tableAPI.getMeTables(id)
            setTables(result.tables)
        } catch (error) {
            setTables([])
        }
    }

    const getRestaurant = async (id) => {
        try {
            const result = await restaurantAPI.getRestaurantById(id)
            setRestaurant(await result)
            createHours(await result.opening_hours, await result.closing_hours)
        } catch (error) {
            console.error(error);
        }
    }

    const createHours = (start, end) => {
        const startHour = parseInt(start.split(":")[0])
        const endHour = parseInt(end.split(":")[0])
        const startMinutes = parseInt(start.split(":")[1])

        const hours = []
        for (let i = startHour; i < endHour + 1; i++) {
            for (let j = 0; j < 2; j++) {

                if (startMinutes == 30 && i == startHour && j == 0) {
                    continue
                }
                let hour = `${i}:${j == 0 ? "00" : "30"}`
                hours.push(hour)
            }
        }
        setHoursOptions(hours)
    }

    const handleBackButton = () => {
        navigate(-1);
    }

    const handleCreateReservation = async () => {
        try {
            const result = await reservationAPI.create({
                restaurant_id: parseInt(id),
                table_id: tableTimeSelected.table_id,
                reservation_data: date,
                reservation_time: tableTimeSelected.time,
            })
            alert("Reserva creada con exito");
            setReservations([...reservations, {
                table_id: tableTimeSelected.table_id,
                reservation_time: tableTimeSelected.time,
            }]);
            setTableTimeSelected({
                table_id: null,
                time: "",
                selected: false
            });
            navigate(-1);
        } catch (error) {
            alert("Error al crear la reserva");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getTables(id);
                await getRestaurant(id);

            } catch (error) { }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await reservationAPI.getByDate(id, date).then((res) => {
                    setReservations(res.data);
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [date, id]);


    return (
        <Container>
            <h1>Crear Reserva</h1>
            <Input
                type="date"
                width={"30%"}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <Wrap>
                <StyledTable>
                    <thead>
                        <tr>
                            <Th>Mesa</Th>
                            {
                                hoursOptions.map((hour) => (
                                    <Th key={hour}>{hour}</Th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {tables.length == 0 ?
                            <tr>
                                <Td colSpan={hoursOptions.length + 1}>NO HAY MESAS DISPONIBLES</Td>
                            </tr>
                            :
                            tables.map((table) => (
                                table.available ?
                                    <tr key={table.table_id}>
                                        <Td>{table.name}</Td>
                                        {
                                            hoursOptions.map((hour) => {
                                                const isReserved = reservations.some((reservation) => reservation.table_id === table.table_id && reservation.reservation_time === hour);
                                                if (isReserved) {
                                                    return <Th key={hour}><ReservationCell>Reservado</ReservationCell></Th>
                                                }
                                                return <Th key={hour}>
                                                    <ReservationCell
                                                        $aviable={
                                                            !(tableTimeSelected.selected &&
                                                            tableTimeSelected.time === hour &&
                                                            tableTimeSelected.table_id === table.table_id)
                                                        }
                                                        onClick={() =>
                                                            {setTableTimeSelected({ 
                                                                table_id: table.table_id, 
                                                                time: hour, selected: !tableTimeSelected.selected 
                                                            })
                                                        }
                                                        } >{hour}
                                                    </ReservationCell>
                                                </Th>
                                            })
                                        }
                                    </tr>
                                    :
                                    null
                            ))
                        }
                    </tbody>
                </StyledTable>
            </Wrap>
            <ContainerCotrols>
                <Boton width={"50%"} handleClick={handleBackButton}>Volver</Boton>
                <ActivateBoton width={"50%"} height={"none"} onClick={handleCreateReservation}>Crear</ActivateBoton>
            </ContainerCotrols>
        </Container>
    )
}

export default CrearReserva