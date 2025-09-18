// src/login.jsx
import { useState } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";

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
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.15);
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
    border-color: var(--bittersweet);
    box-shadow: 0 0 6px rgba(249, 112, 104, 0.4);
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
    border-color: var(--bittersweet);
    box-shadow: 0 0 6px rgba(249, 112, 104, 0.4);
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

  &:hover {
    background: var(--pear);
    color: var(--raisin-black);
  }
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
    color: var(--bittersweet);
    text-decoration: underline;
  }
`;

export default function Login({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire("✅ Bienvenido", `Has iniciado como ${role}`, "success");
        setEmail("");
        setPassword("");
        setRole("customer");
      } else {
        Swal.fire("❌ Error", data.message, "error");
      }
    } catch (error) {
      Swal.fire("⚠️ Error", "No se pudo conectar con el servidor", "error");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Iniciar Sesión</Title>
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
