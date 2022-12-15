import React, { useContext, useEffect, useState } from "react";
import { TodosContext } from "../../context/TodosContext";
import axios from "../../api/axios";
import styled from "styled-components";

const TODOS_URL = "/todos";

const TodoEdit = ({ todoData, onEdit, setOnEdit }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [editTodo, setEditTodo] = useState("");

  const todo = todoData;

  useEffect(() => {
    setEditTodo(todo.todo);
  }, [todo]);

  const updateTodoText = async (todo) => {
    try {
      const response = await axios.put(
        `${TODOS_URL}/${todo.id}`,
        JSON.stringify({ ...todo, todo: editTodo }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("Authorization"),
          },
          withCredentials: false,
        }
      );
      setTodos(
        todos?.map((el) => {
          if (el.id !== todo.id) {
            return el;
          } else {
            return response.data;
          }
        })
      );
      setOnEdit(!onEdit);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TodoEditForm>
        <TodoEditInput
          type="text"
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
        />
        <TodoEditBtn onClick={() => updateTodoText(todo)}>수정</TodoEditBtn>
      </TodoEditForm>
    </>
  );
};

export default TodoEdit;

const TodoEditForm = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 10px 10px 0;
`;

const TodoEditInput = styled.input`
  display: block;
  width: 80%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 1.1rem;
`;

const TodoEditBtn = styled.button`
  display: block;
  background-color: #777;
  color: #fff;
  font-size: 1rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  width: 20%;
  margin-left: 5px;
  cursor: pointer;
  box-sizing: border-box;
`;
