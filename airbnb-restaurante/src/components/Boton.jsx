import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  padding: 0.9rem;
  background: var(--bittersweet);
  color: var(--antiflash-white);
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all ease-in-out 0.3s;

  &:hover {
    transition: all ease-in-out 0.3s;
    background: var(--pear);
    color: var(--raisin-black);
  }
`;

const Boton = ({children, type, handleClick}) =>{
    return(
        <Button type={type} onClick={handleClick}>{children}</Button>
    )
}

export default Boton