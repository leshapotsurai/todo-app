import React, { useState } from "react";
import { List, Button, Input, Space } from "antd";

function TodoList({ todo, updateTodoStatus, deleteTodo, updateTodoTitle }) {
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  function startEditing(id, currentTitle) {
    setEditingId(id);
    setEditingValue(currentTitle);
  }

  async function saveEdit(id) {
    await updateTodoTitle(id, editingValue);
    setEditingId(null);
    setEditingValue("");
  }

  return (
    <List
      dataSource={todo}
      renderItem={(item) => (
        <List.Item
          key={item._id}
          actions={[
            item._id === editingId ? (
              <>
                <Button
                  onClick={() => saveEdit(item._id)}
                  type="primary"
                  style={{ marginRight: "8px" }}
                >
                  Сохранить
                </Button>
                <Button
                  onClick={() => setEditingId(null)}
                  style={{ marginRight: "8px" }}
                >
                  Отмена
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => updateTodoStatus(item._id, !item.status)}
                  type={item.status ? "default" : "primary"}
                  style={{ marginRight: "8px" }}
                >
                  {item.status ? "Не выполнено" : "Выполнено"}
                </Button>
                <Button
                  onClick={() => startEditing(item._id, item.title)}
                  style={{ marginRight: "8px" }}
                >
                  Редактировать
                </Button>
                <Button onClick={() => deleteTodo(item._id)} danger>
                  Удалить
                </Button>
              </>
            ),
          ]}
        >
          {item._id === editingId ? (
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
              />
            </Space>
          ) : (
            item.title
          )}
        </List.Item>
      )}
    />
  );
}

export default TodoList;
