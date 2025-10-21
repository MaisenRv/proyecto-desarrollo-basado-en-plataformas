import styled from "styled-components";

const Button = styled.button`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'none'};
  padding: 0.9rem;
  background: ${props => props.background || 'var(--raisin-black)'};
  color: var(--antiflash-white);
  font-size: ${props => props.fontSize || '1rem'};
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

const Boton = ({children, type, handleClick, height, width, background, fontSize}) =>{
    return(
        <Button type={type} onClick={handleClick} height={height} width={width} background={background} fontSize={fontSize}>{children}</Button>
    )
}

export default Boton