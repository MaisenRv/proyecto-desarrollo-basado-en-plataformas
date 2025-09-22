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
    border-color: var(--bittersweet);
    box-shadow: 0 0 6px rgba(249, 112, 104, 0.4);
  }
`;

const SwitchText = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--raisin-black);
`;


export default function Login() {
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
    role: "consumer"
  })

  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await userApi.login(loginState.username, loginState.password, loginState.role)
    setUser(result.data.username)
    navigate("/")
  };

  return (
    <Form handleSubmit={handleSubmit}>
      <Title>Iniciar Sesión</Title>
      <Input
        type="text"
        placeholder="Usuario"
        value={loginState.username}
        onChange={(e) => setLoginState(prev => ({ ...prev, username: e.target.value }))}
        required
      />
      <Input
        type="password"
        placeholder="Contraseña"
        value={loginState.password}
        onChange={(e) => setLoginState(prev => ({ ...prev, password: e.target.value }))}
        required
      />
      <Select value={loginState.role} onChange={(e) => setLoginState(prev =>({...prev,role:e.target.value}))}>
        <option value="consumer">Cliente</option>
        <option value="owner">Propietario</option>
      </Select>
      <Boton type="submit">Ingresar</Boton>

      <SwitchText>
        ¿No tienes cuenta?{" "}
        <Anchor to="/register">Regístrate aquí</Anchor>
      </SwitchText>
    </Form>
  );
}
