import styled from "styled-components"
import { Link } from "react-router-dom"

const AStyled = styled(Link)`

    ${({ $menu }) => $menu ? `
        padding: 10px 14px;
        text-align: left;
        color: var(--raisin-black);
        transition: background 0.2s ease;
        font-size: 0.9rem;
        &:hover {
            background-color: #f3f3f3;
        }

        &:active {
            background-color: #e0e0e0;
        }
            
    `:
        `
        color: var(--antiflash-white);
        font-weight: 500;
        transition: color 0.2s ease-in-out, transform 0.2s ease-in-out;
        font-size: 1rem;
        &:hover{
            color: var(--vivid-sky-blue); 
            transform: scale(1.05);
        }
    `}
    text-decoration: none;
`

const AMenu = ({children,$menu,to,onClick}) => {
    return(
        <AStyled 
            $menu={$menu} 
            to={to}
            onClick={onClick}
        >{children}</AStyled>
    )
}

export default AMenu