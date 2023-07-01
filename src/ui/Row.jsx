import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${({ type }) =>
    type === "horizontal" &&
    css`
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
    `}

  ${({ type }) =>
    type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
