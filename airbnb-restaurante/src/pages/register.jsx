// src/components/Register.jsx
import { useState } from "react";
import Swal from "sweetalert2";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// 🎨 Reutilizamos estilos similares a Login
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f3f4f6;
  position: relative;
  box-sizing: border-box;
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

const Button = styled.button`
  width: 100%;
  padding: 0.9rem;
  background: #16a34a;
  color: #ffffff;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #15803d;
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

// 🔄 Animación para spinner
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
  border-top-color: #16a34a;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export default function Register({ onSwitch }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

  };

  return (
    <Container>
      {loading && (
        <Overlay>
          <Spinner />
        </Overlay>
      )}

      <Form onSubmit={handleSubmit}>
        
        <Title>Registrarse</Title>
        <Title>AIRBNB RESTAURANTES</Title>
        <Input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
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
        <Button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </Button>

        <SwitchText>
          ¿Ya tienes cuenta?{" "}
          <span ><Link to="/login">Inicia Sesión</Link></span>
        </SwitchText>
      </Form>
    </Container>
  );
}
