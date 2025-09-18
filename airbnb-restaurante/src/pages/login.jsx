// src/login.jsx
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import { userApi } from "../api/user.api";
import { AuthContext } from "../providers/AuthProvider";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f3f4f6;
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
  color: #1f2937;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 6px rgba(37, 99, 235, 0.3);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.9rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 6px rgba(37, 99, 235, 0.3);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.9rem;
  background: #2563eb;
  color: #ffffff;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #1e40af;
  }
`;

const SwitchText = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
`;

const SwitchLink = styled.span`
  color: #2563eb;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Login({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const { setUser } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await userApi.login(username,password,role)
    setUser(result.data.username)
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Iniciar Sesión</Title>
        <Input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          <option value="customer">Cliente</option>
          <option value="owner">Propietario</option>
        </Select>
        <Button type="submit">Ingresar</Button>

        <SwitchText>
          ¿No tienes cuenta?{" "}
          <SwitchLink onClick={onSwitch}>Regístrate aquí</SwitchLink>
        </SwitchText>
      </Form>
    </Container>
  );
}
