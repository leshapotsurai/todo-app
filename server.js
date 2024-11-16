const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/todolist", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: Boolean, default: true },
});

const Todo = mongoose.model("Todo", todoSchema);

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).send(todos);
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
    res.status(500).send({ message: "Ошибка при получении задач" });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { title } = req.body;
    const todo = new Todo({ title });
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    console.error("Ошибка при добавлении задачи:", error);
    res.status(500).send({ message: "Ошибка при добавлении задачи" });
  }
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;

  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, status },
      { new: true }
    );

    if (!todo) {
      return res.status(404).send({ message: "Задача не найдена" });
    }

    res.status(200).send(todo);
  } catch (error) {
    console.error("Ошибка при обновлении задачи:", error);
    res.status(500).send({ message: "Ошибка при обновлении задачи" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).send({ message: "Задача не найдена" });
    }

    res.status(200).send({ message: "Задача удалена" });
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
    res.status(500).send({ message: "Ошибка при удалении задачи" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
