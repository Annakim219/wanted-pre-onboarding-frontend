import React, { useContext, useState } from "react";
import { TodosContext } from "../../context/TodosContext";
import axios from "../../api/axios";
import TodoEdit from "./TodoEdit";
import { MdDone, MdDelete, MdEdit, MdClose } from "react-icons/md";
import styled, { css } from "styled-components";

const TODOS_URL = "/todos";

const TodoItem = ({ todoData }) => {
  const todo = todoData;
  const { todos, setTodos } = useContext(TodosContext);
  const [onEdit, setOnEdit] = useState(false);

  const editToggle = () => {
    setOnEdit(!onEdit);
  };

  const updateCompleted = async () => {
    try {
      const response = await axios.put(
        `${TODOS_URL}/${todo.id}`,
        JSON.stringify({ ...todo, isCompleted: !todo.isCompleted }),
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
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async () => {
    try {
      await axios.delete(`${TODOS_URL}/${todo.id}`, {
        headers: { Authorization: localStorage.getItem("Authorization") },
        withCredentials: false,
      });
      setTodos(todos?.filter((el) => el.id !== todo.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TodoItemBlock>
      <TodoCheckBox
        isCompleted={todo.isCompleted}
        onClick={() => updateCompleted(todo)}
      >
        {todo.isCompleted && <MdDone />}
      </TodoCheckBox>
      {onEdit ? (
        <TodoEdit todoData={todoData} onEdit={onEdit} setOnEdit={setOnEdit} />
      ) : (
        <TodoText isCompleted={todo.isCompleted}>{todo.todo}</TodoText>
      )}
      <TodoBtns>
        {!onEdit ? (
          <MdEdit className="editBtn" onClick={() => editToggle()} />
        ) : (
          <MdClose className="editBtn" onClick={() => editToggle()} />
        )}

        <MdDelete
          className={onEdit ? `delBtn open` : `delBtn`}
          onClick={() => deleteTodo()}
        />
      </TodoBtns>
    </TodoItemBlock>
  );
};

export default TodoItem;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const TodoCheckBox = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.isCompleted &&
    css`
      border: 1px solid #fc5c7d;
      color: #fc5c7d;
    `}
`;

const TodoText = styled.div`
  flex: 1;
  font-size: 1.2rem;
  color: #555;
  ${(props) =>
    props.isCompleted &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

const TodoBtns = styled.div`
  .editBtn,
  .delBtn {
    width: 25px;
    height: 25px;
    color: #777;
    cursor: pointer;
    &:hover {
      color: #fc5c7d;
    }
  }

  .editBtn {
    margin-left: 3px;
  }

  .open {
    display: none;
  }

  .delBtn {
    margin-left: 10px;
  }
`;
