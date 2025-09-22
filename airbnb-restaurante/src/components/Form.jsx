import styled from "styled-components"

const FormStyled = styled.form`
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
  width: 400px;
`;


const Form = ({children, handleSubmit}) =>{
    return(
        <FormStyled onSubmit={handleSubmit}>
            {children}
        </FormStyled>
    )
}

export default Form