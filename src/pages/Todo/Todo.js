import React, { useEffect, useState } from "react";
import { TodosContext } from "../../context/TodosContext";
import { StyledWrapper } from "../../App";
import LoginErr from "../../components/LoginErr";
import TodoList from "../../components/Todo/TodoList";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Todo = ({ children }) => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("Authorization")) {
      navigate("/");
    }
  }, []);

  return (
    <TodosContext.Provider value={{ todos, setTodos, newTodo, setNewTodo }}>
      <StyledWrapper>
        <TodosContainer>
          <h1>To do List 📋</h1>
          {!localStorage.getItem("Authorization") ? (
            <LoginErr />
          ) : (
            <TodoList>{children}</TodoList>
          )}
        </TodosContainer>
      </StyledWrapper>
    </TodosContext.Provider>
  );
};

export default Todo;

const TodosContainer = styled.div`
  width: 100%;
  max-width: 480px;
  height: 70vh;
  padding: 40px;
  overflow-y: hidden;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);

  h1 {
    margin-bottom: 0;
    margin-top: 10px;
  }
`;
