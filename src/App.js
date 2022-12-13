import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Todos from "./pages/Todos/Todos";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  html {
    height:100%;
  }

  body {
    background: linear-gradient(to bottom, #FC5C7D, #6A82FB);
    height: 100%;
    margin: 0;
    color: #555;
  }
  `;

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
`;
