import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({ options, filter, type }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filter);
  const handleFilter = (value) => {
    searchParams.set(filter, value);
    setSearchParams(searchParams);
  };

  return (
    <StyledSelect onChange={(e) => handleFilter(e.target.value)} type={type}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
