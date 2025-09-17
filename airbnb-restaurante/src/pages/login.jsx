// src/components/Login.jsx
import { useState } from "react";
import Swal from "sweetalert2";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
// 🎨 Estilos
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f3f4f6;
  position: relative;
`;

const Form = styled.form`
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
  width: 380px;
  z-index: 2;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1f2937;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;
  transition: border 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 6px rgba(37, 99, 235, 0.3);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.9rem;
  background: var(--vivid-sky-blue);
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
  color: #374151;

  span {
    color: #2563eb;
    cursor: pointer;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #d1d5db;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export default function Login({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email)
    console.log(password)
    console.log(role)
  };

  return (
    <Container>
      {loading && (
        <Overlay>
          <Spinner />
        </Overlay>
      )}

      <Form onSubmit={handleSubmit}>
        <Title>AIRBNB RESTAURANTES</Title>
        <Title>Inicia Sesión</Title>

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

        <Button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Entrar"}
        </Button>

        <SwitchText>
          ¿No tienes cuenta?{" "}
          <span ><Link to="/register">Regístrate aquí</Link></span>
        </SwitchText>
      </Form>
    </Container>
  );
}
