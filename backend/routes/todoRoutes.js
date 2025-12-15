import express from "express";
import Todo from "../models/Todo.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// adding task
router.post("/add", auth, async (req, res) => {
  try {
    const todo = new Todo({
      userId: req.userId,
      task: req.body.task,
    });

    await todo.save();
    res.json({ success: true, msg: "Task Added" });
  } catch (err) {
    res.status(500).json({ error: "Task not added" });
  }
});

// fetch Tasks
router.get("/all", auth, async (req, res) => {
  const tasks = await Todo.find({ userId: req.userId });
  res.json(tasks);
});

// Delete Task
router.delete("/delete/:id", auth, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

// update todo list 
router.put("/update/:id", auth,async (req, res) => {
  try {
    const { task } = req.body;
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { task },
      { new: true }
    );

    res.json({ success: true, updated });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});


export default router;
