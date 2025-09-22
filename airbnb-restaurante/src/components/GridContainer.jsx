import styled from "styled-components"

const GridContainerStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    gap: 1rem;
    box-sizing: border-box;
    padding: 2rem;
    max-width: 80%;
`

const GridContainer = ({ children }) => {
    return (
        <GridContainerStyled>
            {children}
        </GridContainerStyled>
    )
}

export default GridContainer