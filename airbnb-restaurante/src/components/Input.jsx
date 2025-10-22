import styled from "styled-components"

const InputStyled = styled.input`
  width: ${props => props.width || '92%'};
  padding: 0.9rem;
  margin-bottom: 1rem;
  border: 1px solid var(--vivid-sky-blue);
  border-radius: 10px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--bittersweet);
    box-shadow: 0 0 6px rgba(249, 112, 104, 0.4);
  }
`;


const Input = ({type,placeholder,value,onChange,required, width }) => {
    return (
        <InputStyled 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required= {required}
            width={width}
        />
    )
}

export default Input