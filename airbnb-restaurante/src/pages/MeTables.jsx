import { useNavigate, useParams } from 'react-router-dom'
import styled from "styled-components";
import ActivateBoton from '../components/ActivateBoton';
import { useState, useEffect, useContext } from 'react';
import { tableAPI } from '../api/table.api';
import Boton from '../components/Boton';
import {AuthContext} from "../providers/AuthProvider"

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
const ContainerCotrols = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    width: 100%;
`

const MeTables = () => {
  const [tables, setTables] = useState([])
  const { id } = useParams()
  const { user } = useContext(AuthContext)

  const getTables = async (id) => {
    const result = await tableAPI.getMeTables(id)
    setTables(result.tables)
  }
  const navigate = useNavigate()

  useEffect(() => {
    if (user.role != "owner"){
      navigate("/")
    }

    const fectchData = async () => {
      try {
        await getTables(id);
      } catch (error) {
        setTables([])
      }
    }
    fectchData()
  }, [])

  const handleCreate = () => {
    navigate("/createTable/" + id)
  }
  const handleDelete = async (table_id) => {
    try {
      await tableAPI.delete(table_id)
      alert("Mesa eliminada correctamente")
      setTables(tables.filter(table => table.table_id !== table_id))
    } catch (error) {
      console.error("Error deleting table:", error);
    }
  }

  return (<Container>
    <ContainerCotrols>
      <ActivateBoton height={"50px"} width={"150px"} onClick={handleCreate}>Crear</ActivateBoton>
    </ContainerCotrols>

    {
      tables.length == 0 ?
        <h3>No existes mesas para este restaurante</h3>
        :
        <Wrap>
          <StyledTable>
            <thead>
              <tr>
                <Th>Nombre</Th>
                <Th>Disponible</Th>
                <Th>Fecha creacion</Th>
                <Th>Ultima Actualización</Th>
                <Th>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {
                tables.map(table => (
                  <tr key={table.table_id}>
                    <Td>{table.name}</Td>
                    {table.available ?
                      <Td> <ReservationCell $aviable >En servicio</ReservationCell></Td>
                      :
                      <Td> <ReservationCell> Fuera de servicio </ReservationCell></Td>
                    }

                    <Td>{new Date(table.created_at).toLocaleString()}</Td>
                    <Td>{new Date(table.update_at).toLocaleString()}</Td>
                    <Td> 
                      <Boton 
                        width={"50%"} 
                        background={"#d9534f"} 
                        fontSize={"0.8rem"}
                        handleClick={() => handleDelete(table.table_id)}
                      >Eliminar</Boton>
                      <Boton 
                        width={"50%"} 
                        background={"#f0ad4e"} 
                        fontSize={"0.8rem"}
                        handleClick={() => navigate("/editTable/" + table.table_id)}
                      >Editar</Boton>
                    </Td>
                  </tr>
                ))
              }

            </tbody>
          </StyledTable>
        </Wrap>
    }

  </Container>
  )
}

export default MeTables