import styled from "styled-components";

const SelectStyled = styled.select`
  width: 100%;
  padding: 0.9rem;
  margin-bottom: 1rem;
  border: 1px solid var(--vivid-sky-blue);
  border-radius: 10px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--vivid-sky-blue);
    box-shadow: 0 0 6px rgba(87, 196, 229, 0.5);
  }
`;

const Select = ({children, value, onChange}) => {
    return (
        <SelectStyled value={value} onChange={onChange}>
            {children}
        </SelectStyled>
    )
}

export default Select