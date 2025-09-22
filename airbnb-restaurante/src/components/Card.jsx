import styled from "styled-components";

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
    cursor: pointer;
    &:hover{
        transition: all .3s ease-in-out;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
    }

`
const CardImgStyled = styled.img`
    height: 200px;
    object-fit: cover;
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

function Card({ nombre, descripción, direccion, imagen }) {
    return (
        <CardStyled >
            <CardImgStyled src={imagen} alt={nombre} />
            <div>
                <CardTitleStyled >{nombre}</CardTitleStyled>
                <CardDescriptionStyled >{descripción}</CardDescriptionStyled>
                <CardAddressStyled>{direccion}</CardAddressStyled>
            </div>
        </CardStyled>

    );


}
export default Card;