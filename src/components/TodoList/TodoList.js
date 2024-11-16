import React, { useState } from "react";
import { List, Button, Input, Typography, Tag } from "antd";

const { Text } = Typography;

function TodoList({ todo, setTodo }) {
  const [edit, setEdit] = useState(null);
  const [editValue, setEditValue] = useState("");

  function deleteTodo(id) {
    let newTodo = [...todo].filter((item) => item.id !== id);
    setTodo(newTodo);
  }

  function statusTodo(id) {
    let newTodo = todo.map((item) => {
      if (item.id === id) {
        return { ...item, status: !item.status };
      }
      return item;
    });
    setTodo(newTodo);
  }

  function editTodo(id, currentTitle) {
    setEdit(id);
    setEditValue(currentTitle);
  }

  function saveEditTodo(id) {
    let newTodo = todo.map((item) => {
      if (item.id === id) {
        return { ...item, title: editValue };
      }
      return item;
    });
    setTodo(newTodo);
    setEdit(null);
  }

  return (
    <List
      dataSource={todo}
      renderItem={(item) => (
        <List.Item
          actions={
            edit === item.id
              ? [
                  // eslint-disable-next-line react/jsx-key
                  <Button type="primary" onClick={() => saveEditTodo(item.id)}>
                    Сохранить
                  </Button>,
                ]
              : [
                  // eslint-disable-next-line react/jsx-key
                  <Button danger onClick={() => deleteTodo(item.id)}>
                    Удалить
                  </Button>,
                  // eslint-disable-next-line react/jsx-key
                  <Button
                    type={item.status ? "default" : "dashed"}
                    onClick={() => statusTodo(item.id)}
                  >
                    {item.status ? "Закрыть" : "Открыть"}
                  </Button>,
                  // eslint-disable-next-line react/jsx-key
                  <Button onClick={() => editTodo(item.id, item.title)}>
                    Редактировать
                  </Button>,
                ]
          }
        >
          {edit === item.id ? (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              style={{ maxWidth: "300px" }}
            />
          ) : (
            <>
              <Text
                delete={!item.status}
                style={{ color: item.status ? "black" : "gray" }}
              >
                {item.title}
              </Text>
              {!item.status && <Tag color="red">Закрыто</Tag>}
            </>
          )}
        </List.Item>
      )}
    />
  );
}

export default TodoList;
