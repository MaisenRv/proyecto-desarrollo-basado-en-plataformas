import styled from "styled-components";
import { Link } from "react-router-dom";

const SwitchLink = styled(Link)`
  color: var(--vivid-sky-blue);
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: var(--bittersweet);
    text-decoration: underline;
  }
`;


const Anchor = ({children, to}) =>{
    return (
        <SwitchLink to={to}>{children}</SwitchLink>
    )
}

export default Anchor