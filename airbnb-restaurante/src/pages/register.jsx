// src/components/Register.jsx
import { useState, useContext } from "react";
import styled from "styled-components";
import { userApi } from "../api/user.api";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Boton from "../components/Boton";
import Anchor from "../components/Anchor";
import Form from "../components/Form";
import Input from "../components/Input";

const Title = styled.h2`
  text-align: center;
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: var(--raisin-black);
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

const SwitchText = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--raisin-black);
`;

export default function Register() {
  const [registerState, setRegisterState] = useState({
    username: "",
    email: "",
    password: "",
    role: "consumer"
  })
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await userApi.register(
        registerState.username,
        registerState.password,
        registerState.email,
        registerState.role
      );
      setUser(result.data)
      alert(result.msg)
      navigate("/")
    } catch(error) {    
      alert(error.data.error)
    }

  };

  return (
    <Form handleSubmit={handleSubmit}>
      <Title>Registrarse</Title>
      <Input
        type="text"
        placeholder="Nombre de usuario"
        value={registerState.username}
        onChange={(e) => setRegisterState(prev => ({ ...prev, username: e.target.value }))}
        required
      />
      <Input
        type="email"
        placeholder="Correo electrónico"
        value={registerState.email}
        onChange={(e) => setRegisterState(prev => ({ ...prev, email: e.target.value }))}
        required
      />
      <Input
        type="password"
        placeholder="Contraseña"
        value={registerState.password}
        onChange={(e) => setRegisterState(prev => ({ ...prev, password: e.target.value }))}
        required
      />
      <Select value={registerState.role} onChange={(e) => setRegisterState(prev => ({ ...prev, role: e.target.value }))}>
        <option value="consumer">Cliente</option>
        <option value="owner">Propietario</option>
      </Select>
      <Boton type="submit">Registrarse</Boton>

      <SwitchText>
        ¿Ya tienes cuenta?{" "}
        <Anchor to="/login">Inicia Sesión</Anchor>
      </SwitchText>
    </Form>
  );
}
