import express from "express";
import {v4 as uuid} from "uuid";

const routes = express.Router();

let todos = [];

routes.get("/todos", (req, res) => {
    return res.status(200).json({ message: "get todos success", todos });
});

routes.post("/add-todo", (req, res) => {
    const { todo } = req.body;

    if (!todo) {
        return res.status(400).json({ message: "empty todo" })
    }
    
    todos.push({
        id: uuid(),
        todo,
    });

    return res.status(201).json({ message: "todo created success", todos });
});

routes.delete("/delete-todo/:id", (req, res) => {
    const { id } = req.params;

    for(let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        todos.splice(i, 1);
        return res.status(200).json({ message: "todo delete success", todos });
      }
    }
});

routes.patch("/update-todo/:id", (req, res) => {
    const { id } = req.params;
    const { todoUpdated } = req.body;

    todos.forEach(todo => {
        if (todo.id === id) {
            todo.todo = todoUpdated;
            return res.status(200).json({ message: "todo updated success", todos });
        }
    });
});

export default routes;