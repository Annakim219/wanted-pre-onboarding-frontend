import styled, { css } from "styled-components";

const sharedStyled = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`;

export const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
`;

export const StyledForm = styled.form`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`;

export const StyledFormInput = styled.input`
  display: block;
  width: 100%;
  ${sharedStyled}
`;

export const StyledFormBtn = styled.button`
  display: block;
  background-color: #6a82fb;
  color: #fff;
  font-size: 1rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  width: 100%;
  margin: 20px auto;
  padding: 0;
  cursor: pointer;
  box-sizing: border-box;

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: #555;
  }
`;

export const StyledFormTBtn = styled.button`
  display: block;
  background-color: #fff;
  font-size: 0.9rem;
  border: 0;
  color: #555;
  text-align: center;
  margin: 5px auto;
  cursor: pointer;
  box-sizing: border-box;

  #personIcon {
    position: relative;
    top: 2px;
    right: 2px;
  }
`;

export const StyledFormError = styled.div`
  color: red;
  font-size: 0.9rem;
  margin: 0 5px 20px 5px;
`;
