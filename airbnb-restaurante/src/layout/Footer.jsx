import styled from "styled-components"; 

const FooterContainer = styled.footer`
    background: var (--bittersweet-600);   
    text-align: center;
    padding: 1rem;
    margin-top: auto;
    font-size: 0.9rem;
    `;
const Footer = () => { 
    return (
        <FooterContainer>
      <p>© {new Date().getFullYear()} Restaurantes App. Todos los derechos reservados.</p>
        </FooterContainer>
    )
}
export default Footer;