import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onUpdateTask, onDeleteTask, onToggleComplete }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} onToggleComplete={onToggleComplete} />
      ))}
    </div>
  );
}
