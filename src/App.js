import React, { useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo/AddTodo";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import { Layout } from "antd";

const { Header: AntHeader, Content } = Layout;

function App() {
  const [todo, setTodo] = useState([
    {
      id: 1,
      title: "first todo",
      status: true,
    },
    {
      id: 2,
      title: "second todo",
      status: true,
    },
    {
      id: 3,
      title: "third todo",
      status: true,
    },
  ]);

  return (
    <Layout>
      <AntHeader
        style={{ color: "#fff", textAlign: "center", fontSize: "24px" }}
      >
        ToDo List
      </AntHeader>
      <Content style={{ padding: "20px" }}>
        <AddTodo todo={todo} setTodo={setTodo} />
        <TodoList todo={todo} setTodo={setTodo} />
      </Content>
    </Layout>
  );
}

export default App;
