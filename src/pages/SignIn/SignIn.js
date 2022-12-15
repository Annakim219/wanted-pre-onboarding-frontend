import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "../../api/axios";
import { StyledWrapper } from "../../App";
import {
  StyledForm,
  StyledFormInput,
  StyledFormBtn,
  StyledFormTBtn,
  StyledFormError,
} from "../../components/Form.style";
import { BsFillPersonFill } from "react-icons/bs";

const SIGNIN_URL = "/auth/signin";

const SignIn = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        SIGNIN_URL,
        JSON.stringify({ email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      const accessToken = response.data.access_token;
      localStorage.setItem("Authorization", `Bearer ${accessToken}`);
      setEmail("");
      setPwd("");
      navigate("/todo");
    } catch (err) {
      if (err.response.status === 404) {
        setErrMsg(err.response.data.message);
      } else if (err.response.status === 401) {
        setErrMsg("이메일 또는 비밀번호를 잘못 입력했습니다.");
      } else {
        setErrMsg("로그인에 실패하였습니다.");
      }

      errRef.current.focus();
    }
  };

  return (
    <StyledWrapper>
      <StyledForm maxWidth={"400px"} onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <label htmlFor="email">이메일</label>
        <StyledFormInput
          type="email"
          id="email"
          ref={emailRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <label htmlFor="password">비밀번호</label>
        <StyledFormInput
          type="password"
          id="password"
          autoComplete="off"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <StyledFormError>
          <p ref={errRef}>{errMsg}</p>
        </StyledFormError>
        <StyledFormBtn bgColor={"#6a82fb"}>로그인</StyledFormBtn>
        <StyledFormTBtn onClick={() => navigate("/signup")}>
          <BsFillPersonFill className="wIcon" />
          회원가입
        </StyledFormTBtn>
      </StyledForm>
    </StyledWrapper>
  );
};

export default SignIn;
