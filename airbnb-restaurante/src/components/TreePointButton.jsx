import styled from "styled-components";

const Button = styled.button`
  padding: 1px 7px;
  background: transparent;
  color: var(--raisin-black);
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all ease-in-out 0.3s;

  &:hover {
    transition: all ease-in-out 0.3s;
    background: var(--raisin-black);
    color: var(--antiflash-white);
  }
`;

const TreePointButton = ({children, onClick, type}) => {
    return(
        <Button type={type} onClick={onClick}>{children}</Button>
    )
}

export default TreePointButton