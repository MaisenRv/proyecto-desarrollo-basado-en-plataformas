import styled from "styled-components";

const FooterContainer = styled.footer`
  background: #212738; /* raisin-black */
  color: #edf2ef; /* antiflash-white */
  text-align: center;
  padding: 1rem;
  margin-top: auto;
  font-size: 0.9rem;
  border-top: 3px solid #f97068; /* bittersweet */
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);

  p {
    margin: 0;
    transition: color 0.3s ease;
  }

  p:hover {
    color: #57c4e5; /* vivid-sky-blue */
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>
        © {new Date().getFullYear()} Restaurantes App. Todos los derechos
        reservados.
      </p>
    </FooterContainer>
  );
};

export default Footer;
