// src/components/Footer.jsx
import styled from "styled-components";

const FooterContainer = styled.footer`
  background: #1f2937; /* gris oscuro */
  color: #f3f4f6; /* texto claro */
  text-align: center;
  padding: 1rem;
  margin-top: auto;
  font-size: 0.9rem;
  border-top: 2px solid #2563eb; /* línea superior azul */
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© {new Date().getFullYear()} Restaurantes App. Todos los derechos reservados.</p>
    </FooterContainer>
  );
};

export default Footer;
