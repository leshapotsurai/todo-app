import React, { useState } from "react";
import { Input, Button, Space } from "antd";

function AddTodo({ todo, setTodo }) {
  const [value, setValue] = useState("");

  function saveTodo() {
    if (value.trim()) {
      setTodo([
        ...todo,
        {
          id: Date.now(),
          title: value,
          status: true,
        },
      ]);
      setValue("");
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
