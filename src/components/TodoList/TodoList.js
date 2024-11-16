import React, { useState, useEffect } from "react";
import { List, Button, Input, Typography, Tag } from "antd";

const { Text } = Typography;

function TodoList() {
  const [todo, setTodo] = useState([]);
  const [edit, setEdit] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch("http://localhost:5000/todos");
        if (response.ok) {
          const data = await response.json();
          setTodo(data);
        } else {
          console.error("Не удалось загрузить задачи");
        }
      } catch (error) {
        console.error("Ошибка при получении задач:", error);
      }
    }
    fetchTodos();
  }, []);

  async function deleteTodo(id) {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTodo(todo.filter((item) => item._id !== id));
      } else {
        console.error("Не удалось удалить задачу");
      }
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  }

  async function statusTodo(id) {
    const updatedTodo = todo.map((item) => {
      if (item._id === id) {
        return { ...item, status: !item.status };
      }
      return item;
    });
    setTodo(updatedTodo);

    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: !todo.find((item) => item._id === id).status,
        }),
      });
      if (!response.ok) {
        console.error("Не удалось обновить статус задачи");
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса задачи:", error);
    }
  }

  async function saveEditTodo(id) {
    const updatedTodo = todo.map((item) => {
      if (item._id === id) {
        return { ...item, title: editValue };
      }
      return item;
    });
    setTodo(updatedTodo);

    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editValue,
        }),
      });
      if (response.ok) {
        console.log("Задача успешно обновлена");
        setEdit(null);
        fetchTodos();
      } else {
        console.error("Не удалось обновить задачу");
      }
    } catch (error) {
      console.error("Ошибка при редактировании задачи:", error);
    }
  }

  async function fetchTodos() {
    try {
      const response = await fetch("http://localhost:5000/todos");
      if (response.ok) {
        const data = await response.json();
        setTodo(data);
      } else {
        console.error("Не удалось загрузить задачи");
      }
    } catch (error) {
      console.error("Ошибка при получении задач:", error);
    }
  }

  return (
    <List
      dataSource={todo}
      renderItem={(item) => (
        <List.Item
          actions={
            edit === item._id
              ? [
                  <Button type="primary" onClick={() => saveEditTodo(item._id)}>
                    Сохранить
                  </Button>,
                ]
              : [
                  <Button danger onClick={() => deleteTodo(item._id)}>
                    Удалить
                  </Button>,
                  <Button
                    type={item.status ? "default" : "dashed"}
                    onClick={() => statusTodo(item._id)}
                  >
                    {item.status ? "Закрыть" : "Открыть"}
                  </Button>,
                  <Button
                    onClick={() => {
                      setEdit(item._id);
                      setEditValue(item.title);
                    }}
                  >
                    Редактировать
                  </Button>,
                ]
          }
        >
          {edit === item._id ? (
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
