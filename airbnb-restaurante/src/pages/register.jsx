// src/components/Register.jsx
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { userApi } from "../api/user.api";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--antiflash-white);
`;

const Form = styled.form`
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: var(--raisin-black);
`;

const Input = styled.input`
  width: 92%;
  padding: 0.9rem;
  margin-bottom: 1rem;
  border: 1px solid var(--vivid-sky-blue);
  border-radius: 10px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--vivid-sky-blue);
    box-shadow: 0 0 6px rgba(87, 196, 229, 0.5);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.9rem;
  margin-bottom: 1rem;
  border: 1px solid var(--vivid-sky-blue);
  border-radius: 10px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--vivid-sky-blue);
    box-shadow: 0 0 6px rgba(87, 196, 229, 0.5);
  }
`;

const Button = styled.button`
width: 100%;
padding: 0.9rem;
background: var(--bittersweet);
color: #ffffff;
font-size: 1rem;
font-weight: bold;
border: none;
border-radius: 10px;
cursor: pointer;
transition: background 0.3s;
`;

const SwitchText = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--raisin-black);
`;

const SwitchLink = styled.span`
  color: var(--vivid-sky-blue);
  cursor: pointer;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Register({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("consumer");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();   
    const result = await userApi.register(username, password, email, role);
    setUser(result.data.username)
    navigate("/")
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Registrarse</Title>
        <Input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="consumer">Cliente</option>
          <option value="owner">Propietario</option>
        </Select>
        <Button type="submit">Registrarse</Button>

        <SwitchText>
          ¿Ya tienes cuenta?{" "}
          <SwitchLink><Link to="/login">Inicia Sesión</Link></SwitchLink>
        </SwitchText>
      </Form>
    </Container>
  );
}
