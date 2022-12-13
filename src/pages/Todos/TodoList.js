import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos }) => {
  return (
    <>
      {todos.map((el, i) => (
        <TodoItem
          key={i}
          id={el.id}
          isCompleted={el.isCompleted}
          todo={el.todo}
        />
      ))}
    </>
  );
};

export default TodoList;
