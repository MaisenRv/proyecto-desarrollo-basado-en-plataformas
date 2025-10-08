import styled from "styled-components"

const Boton = styled.button`
    background-color: var(--green-active);
    border: none;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
    transition: all .3s ease-in-out;
    box-sizing: border-box;
    cursor: pointer;
    height: 340px;
    color: white;
    font-size: 2rem;
    &:hover{
        transition: all .3s ease-in-out;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
    }
`


const ActivateBoton = ({children, onClick}) =>{

    return(
        <Boton onClick={onClick}>
            {children}
        </Boton>
    )
}

export default ActivateBoton