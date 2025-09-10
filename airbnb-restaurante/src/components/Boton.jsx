import styled from "styled-components";
const Botonstyled = styled.button`
background-color: blue;
padding: 10px;
color: black;
border-radius: 15px;
`

function Boton ({children, propiedad}) {

    function click() {
        alert(propiedad)
    }


return (
    <>
<Botonstyled onClick={click}> {children}</Botonstyled>
    {alert(propiedad)}
    </>
)

}


export default  Boton