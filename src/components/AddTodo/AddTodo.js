import React, { useState } from "react";
import { Input, Button, Space } from "antd";

function AddTodo({ addTodo }) {
  const [value, setValue] = useState("");

  async function saveTodo() {
    if (value.trim()) {
      try {
        await addTodo({
          title: value,
          status: false,
        });
        setValue("");
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
