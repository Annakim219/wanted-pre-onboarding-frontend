import React, { useContext } from "react";
import { TodosContext } from "../../context/TodosContext";
import axios from "../../api/axios";
import { StyledFormInput } from "../../components/Form.style";
import styled from "styled-components";

const TODOS_URL = "/todos";

const TodoCreate = () => {
  const { newTodo, setNewTodo } = useContext(TodosContext);

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (!newTodo) {
      return;
    }

    try {
      await axios.post(TODOS_URL, JSON.stringify({ todo: newTodo }), {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization"),
        },
        withCredentials: false,
      });
      setNewTodo("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TodoCreateForm onSubmit={createNewTodo}>
        <StyledFormInput
          type="text"
          value={newTodo}
          autoFocus
          placeholder="할 일을 입력해주세요!"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <TodoCreateBtn bgColor={"#FC5C7D"}>추가</TodoCreateBtn>
      </TodoCreateForm>
    </>
  );
};

export default TodoCreate;

const TodoCreateForm = styled.form`
  display: flex;
`;

const TodoCreateBtn = styled.button`
  display: block;
  background-color: #fc5c7d;
  color: #fff;
  font-size: 1rem;
  border: 0;
  border-radius: 5px;
  height: 42px;
  width: 80px;
  margin: 10px 0 20px 5px;
  padding: 0;
  cursor: pointer;
  box-sizing: border-box;
`;
