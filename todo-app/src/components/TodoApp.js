
import React, { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Filter from "./Filter";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch("https://dummyjson.com/todos");
      const data = await res.json();
      setTodos(data.todos);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const addTodo = async (text) => {
    try {
      const res = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: text,
          completed: false,
          userId: 1,
        }),
      });
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const res = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !completed,
        }),
      });
      const updatedTodo = await res.json();
      setTodos(
        todos.map((todo) =>
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const getFilteredTodos = () => {
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    } else if (filter === "pending") {
      return todos.filter((todo) => !todo.completed);
    } else {
      return todos;
    }
  };

  return (
    <div>
      <h1>Todo App with API</h1>
      <AddTodo addTodo={addTodo} />
      <Filter setFilter={setFilter} />
      <TodoList
        todos={getFilteredTodos()}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default TodoApp;
