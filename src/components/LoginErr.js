import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledFormBtn } from "./Form.style";
import styled from "styled-components";

const LoginErr = () => {
  const navigate = useNavigate();

  return (
    <ErrBlock>
      <p>회원 로그인이 필요한 서비스입니다.</p>
      <BtnGroup>
        <StyledFormBtn bgColor={"#FC5C7D"} onClick={() => navigate("/")}>
          로그인
        </StyledFormBtn>
      </BtnGroup>
    </ErrBlock>
  );
};

export default LoginErr;

const ErrBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
  font-size: 1.2rem;
`;

const BtnGroup = styled.div`
  width: 100%;

  button {
    width: 200px;
    height: 35px;
    margin: 5px auto;
  }
`;
