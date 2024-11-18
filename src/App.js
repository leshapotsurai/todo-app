import React, { useState, useEffect } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import { Layout } from "antd";
import axios from "axios";

const { Header: AntHeader, Content } = Layout;

function App() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const response = await axios.get("http://localhost:5000/todos");
      setTodo(response.data);
    }
    fetchTodos();
  }, []);

  async function addTodo(newTodo) {
    const response = await axios.post("http://localhost:5000/todos", newTodo);
    setTodo((prevTodos) => [...prevTodos, response.data]);
  }

  async function updateTodoStatus(id, status) {
    const response = await axios.put(`http://localhost:5000/todos/${id}`, {
      status,
    });
    setTodo((prevTodos) =>
      prevTodos.map((item) => (item._id === id ? response.data : item))
    );
  }

  async function updateTodoTitle(id, title) {
    const response = await axios.put(`http://localhost:5000/todos/${id}`, {
      title,
    });
    setTodo((prevTodos) =>
      prevTodos.map((item) => (item._id === id ? response.data : item))
    );
  }

  async function deleteTodo(id) {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodo((prevTodos) => prevTodos.filter((item) => item._id !== id));
  }

  return (
    <Layout>
      <AntHeader
        style={{ color: "#fff", textAlign: "center", fontSize: "24px" }}
      >
        ToDo List
      </AntHeader>
      <Content style={{ padding: "20px" }}>
        <AddTodo addTodo={addTodo} />
        <TodoList
          todo={todo}
          updateTodoStatus={updateTodoStatus}
          deleteTodo={deleteTodo}
          updateTodoTitle={updateTodoTitle}
        />
      </Content>
    </Layout>
  );
}

export default App;
