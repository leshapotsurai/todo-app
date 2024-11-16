import React, { useState } from "react";
import { Input, Button, Space } from "antd";

function AddTodo({ setTodo }) {
  const [value, setValue] = useState("");

  async function saveTodo() {
    if (value.trim()) {
      try {
        const response = await fetch("http://localhost:5000/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: value,
            status: true,
          }),
        });

        if (response.ok) {
          const newTodo = await response.json();
          console.log("Задача успешно добавлена:", newTodo);
          setTodo((prevTodos) => [...prevTodos, newTodo]);
          setValue("");
        } else {
          console.error("Не удалось сохранить задачу:", response.status);
        }
      } catch (error) {
        console.error("Ошибка при сохранении задачи:", error);
      }
    }
  }

  return (
    <Space direction="vertical" style={{ width: "100%", marginBottom: "20px" }}>
      <Input
        placeholder="Введите задачу"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="primary" onClick={saveTodo} block>
        Сохранить
      </Button>
    </Space>
  );
}

export default AddTodo;
