import { useState } from "react";

export default function TaskForm({ onAddTask, tasks }) {
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    priority: "medium",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim() && task.description.trim()) {
      onAddTask({ ...task, id: tasks.length + 1, completed: false });
      setTask({ title: "", description: "", priority: "medium" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input type="text" name="title" value={task.title} onChange={handleChange} placeholder="Task Title" required />
      <textarea name="description" value={task.description} onChange={handleChange} placeholder="Task Description" required></textarea>
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}
