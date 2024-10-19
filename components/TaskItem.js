import { useState } from "react";

export default function TaskItem({ task, onUpdateTask, onDeleteTask, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdateTask(editedTask);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`task-item priority-${task.priority} ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div className="edit-form">
          <input type="text" name="title" value={editedTask.title} onChange={handleChange} />
          <textarea name="description" value={editedTask.description} onChange={handleChange}></textarea>
          <select name="priority" value={editedTask.priority} onChange={handleChange}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button className="single-button" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <div className="task-actions">
            <button onClick={() => onToggleComplete(task.id)}>{task.completed ? "Mark Pending" : "Mark Complete"}</button>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => onDeleteTask(task.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
