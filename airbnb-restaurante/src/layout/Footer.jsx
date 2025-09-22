// src/components/Footer.jsx
import styled from "styled-components";

const FooterContainer = styled.footer`
  background: var(--raisin-black); 
  color: var(--antiflash-white); 
  text-align: center;
  padding: 1rem;
  margin-top: auto;
  font-size: 0.9rem;
  border-top: 1px solid var(--vivid-sky-blue); 
  box-sizing: border-box;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© {new Date().getFullYear()} Restaurantes App. Todos los derechos reservados.</p>
    </FooterContainer>
  );
};

export default Footer;
