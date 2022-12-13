import { useState, useEffect, useRef } from "react";
import { StyledWrapper } from "../../App";
import {
  StyledForm,
  StyledFormInput,
  StyledFormBtn,
  StyledFormError,
} from "../../components/Form.style";
import axios from "../../api/axios";

const SIGNUP_URL = "/auth/signup";

const SignUp = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdErrMsg, setPwdErrMsg] = useState("");

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchErrMsg, setMatchErrMsg] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const CheckEmail = (e) => {
    const EMAIL_REGEX =
      /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!EMAIL_REGEX.test(email)) {
      setEmailErrMsg("이메일 형식으로 입력해주세요");
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  };

  const CheckPwd = (e) => {
    if (pwd.length < 7) {
      setPwdErrMsg("비밀번호는 8자 이상 입력해주세요.");
      setValidPwd(false);
    } else {
      setValidPwd(true);
    }
  };

  const CheckPwdMatch = (e) => {
    if (pwd !== matchPwd) {
      setMatchErrMsg("비밀번호가 일치하지 않습니다.");
      setValidMatch(false);
    } else {
      setValidMatch(true);
    }
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({ email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      console.log(response);
      const accessToken = response.data.access_token;
      localStorage.setItem("Authorization", `Bearer ${accessToken}`);
      setEmail("");
      setPwd("");
      alert("회원가입에 성공하였습니다 !");
    } catch (err) {
      console.log(err.response);
      setErrMsg(err.response.data.message);
      errRef.current.focus();
    }
  };

  return (
    <>
      <StyledWrapper>
        <StyledForm maxWidth={"500px"} onSubmit={handleSubmit}>
          <h1>회원가입</h1>
          <StyledFormError>
            <p ref={errRef}>{errMsg}</p>
          </StyledFormError>
          <label htmlFor="email">이메일</label>
          <StyledFormInput
            type="email"
            id="email"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value);
              CheckEmail(email);
            }}
            required
          />
          <StyledFormError>
            <p>{!validEmail ? emailErrMsg : ""}</p>
          </StyledFormError>
          <label>비밀번호</label>
          <StyledFormInput
            type="password"
            id="pwd"
            autoComplete="off"
            onChange={(e) => {
              setPwd(e.target.value);
              CheckPwd(pwd);
            }}
            required
          />
          <StyledFormError>
            <p>{!validPwd ? pwdErrMsg : ""}</p>
          </StyledFormError>
          <label>비밀번호 재확인</label>
          <StyledFormInput
            type="password"
            id="matchPwd"
            autoComplete="off"
            onChange={(e) => {
              setMatchPwd(e.target.value);
            }}
            onBlur={() => CheckPwdMatch(matchPwd)}
            required
          />
          <StyledFormError>
            <p>{!validMatch ? matchErrMsg : ""}</p>
          </StyledFormError>
          <StyledFormBtn
            bgColor={"#6a82fb"}
            disabled={!(validEmail && validPwd && validMatch) ? true : false}
          >
            가입하기
          </StyledFormBtn>
        </StyledForm>
      </StyledWrapper>
    </>
  );
};

export default SignUp;
