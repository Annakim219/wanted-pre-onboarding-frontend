import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../../api/axios";
import { StyledWrapper } from "../../App";
import TodoCreate from "./TodoCreate";
import TodoList from "./TodoList";

const TODOS_URL = "/todos";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  // const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios
      .get(TODOS_URL, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
        withCredentials: false,
      })
      .then((res) => {
        setTodos(res.data);
      });
  }, []);

  // const createNewTodo = (e) => {
  //   e.preventDefault();
  //   if (!newTodo) {
  //     return;
  //   }

  //   axios
  //     .post(TODOS_URL, JSON.stringify({ todo: newTodo }), {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: localStorage.getItem("Authorization"),
  //       },
  //       withCredentials: false,
  //     })
  //     .then((res) => {
  //       setNewTodo("");
  //     });
  // };

  return (
    <StyledWrapper>
      <TodosContainer>
        <h1>To do List 📋</h1>
        {todos ? (
          <>
            <TodoCreate />
            <TodoList todos={todos} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </TodosContainer>
    </StyledWrapper>
  );
};

export default Todos;

const TodosContainer = styled.div`
  width: 100%;
  max-width: 480px;
  height: 600px;
  padding: 40px;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`;
