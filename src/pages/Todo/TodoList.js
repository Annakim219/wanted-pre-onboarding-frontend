import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TodosContext } from "../../context/TodosContext";
import axios from "../../api/axios";
import TodoCreate from "./TodoCreate";
import TodoItem from "./TodoItem";
import { StyledFormTBtn } from "../../components/Form.style";
import { MdLogout } from "react-icons/md";
import styled from "styled-components";

const TODOS_URL = "/todos";

const TodoList = () => {
  const navigate = useNavigate();
  const { todos, setTodos, newTodo } = useContext(TodosContext);
  const logout = () => {
    localStorage.removeItem("Authorization");
    navigate("/");
  };
  const getTodos = async () => {
    try {
      const response = await axios.get(TODOS_URL, {
        headers: { Authorization: localStorage.getItem("Authorization") },
        withCredentials: false,
      });
      setTodos(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodos();
  }, [newTodo]);

  return (
    <TodoListBlock>
      <div className="header">
        <TodoCreate />
      </div>
      <div className="section">
        {todos ? (
          <>
            {todos?.map((el, i) => (
              <TodoItem key={i} todoData={el} />
            ))}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="footer">
        <StyledFormTBtn onClick={() => logout()}>
          <MdLogout className="wIcon" />
          로그아웃
        </StyledFormTBtn>
      </div>
    </TodoListBlock>
  );
};

export default TodoList;

const TodoListBlock = styled.div`
  width: 100%;
  height: 90%;
  padding: 10px;
  display: flex;
  flex-direction: column;

  .section {
    overflow-y: scroll;
    margin-bottom: 15px;
    padding: 10px;
    height: 70%;
  }
  .footer {
    min-width: 100px;
    margin: 0 20px 20px 75%;
  }
`;
