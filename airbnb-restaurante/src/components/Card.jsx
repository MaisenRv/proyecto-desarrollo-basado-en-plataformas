import styled from "styled-components";
import TreePointButton from "./TreePointButton";
import { useState, useRef, useEffect } from "react";
import AMenu from "./AMenu";
import { useNavigate } from "react-router-dom";

const CardStyled = styled.div`
    display: flex;
    flex-direction: column;
    width:15rem;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 0.7rem;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
    transition: all .3s ease-in-out;
    box-sizing: border-box;
    &:hover{
        transition: all .3s ease-in-out;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
    }

`
const CardImgStyled = styled.img`
    height: 200px;
    object-fit: contain;
`
const CardTitleStyled = styled.h2`
    font-weight: 600;
    font-size: 1.4rem;
`
const CardDescriptionStyled = styled.p`
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 1rem;
    margin: 0.7rem 0 0.7rem 0;
`
const CardAddressStyled = styled.p`
    font-size: 0.8rem;
    font-weight: 300;
`
const CardHoursStyled = styled.p`
    font-size: 0.8rem;
    font-weight: 300;
`
const CardContainerHourActive = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; 
`
const CardSpan = styled.span`
    font-size: 0.7rem;
    font-weight: 500;
    background-color: ${({ $isActive }) => $isActive ? "var(--green-active)" : "var(--bittersweet)"};
    border-radius: 8px;
    padding: 2px 5px;
    color: var(--antiflash-white);
`

const Menu = styled.div`
    position: absolute;
    right: 0;
    top: 110%;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    padding: 8px 0;
    min-width: 100px;
    display: flex;
    flex-direction: column;
    z-index: 10;
`

function Card({restaurant_id,nombre, descripción, direccion, imagen, horarioApertura, horarioCierre, isActive, onDelete }) {
    const [open, setOpen] = useState(false)
    const menuRef = useRef(null);
    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <CardStyled >
            <CardImgStyled src={imagen} alt={nombre} />
            <div>
                <CardTitleStyled >{nombre}</CardTitleStyled>
                <CardContainerHourActive>
                    <CardHoursStyled>{`${horarioApertura} - ${horarioCierre}`}</CardHoursStyled>
                    <CardSpan $isActive={isActive} >{isActive ? "Activo" : "Inactivo"}</CardSpan>
                </CardContainerHourActive>
                <CardDescriptionStyled >{descripción}</CardDescriptionStyled>
                <CardContainerHourActive>
                    <CardAddressStyled>{direccion}</CardAddressStyled>
                    <div style={{ position: "relative" }} ref={menuRef}>
                        <TreePointButton onClick={() => setOpen(!open)} >⋮</TreePointButton>
                        {
                            open &&
                            (
                                <Menu>
                                    <AMenu $menu to={`/editRestaurants/${restaurant_id}`}>Editar</AMenu>
                                    <AMenu $menu to={`/restaurantsTables/${restaurant_id}`}>Mesas</AMenu>
                                    <AMenu $menu onClick={onDelete}>Eliminar</AMenu>
                                </Menu>
                            )
                        }
                    </div>

                </CardContainerHourActive>
            </div>
        </CardStyled>

    );


}
export default Card;