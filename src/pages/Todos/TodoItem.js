import React from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";

const TodoItem = ({ id, isCompleted, todo }) => {
  return (
    <TodoItemBlock>
      <TodoCheckBox isCompleted={isCompleted}>
        {isCompleted && <MdDone />}
      </TodoCheckBox>
      <TodoText isCompleted={isCompleted}>{todo}</TodoText>
    </TodoItemBlock>
  );
};

export default TodoItem;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
`;

const TodoCheckBox = styled.div`
  width: 28px;
  height: 28px;
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
