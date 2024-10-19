// pages/index.js
import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import SearchBar from "../components/SearchBar";
import { sortTasks } from "../utils/taskUtils";

export default function Home({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const addTask = (newTask) => {
    setTasks((prevTasks) => sortTasks([...prevTasks, newTask]));
    localStorage.setItem("tasks", JSON.stringify(sortTasks([...tasks, newTask])));
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) => sortTasks(prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))));
    localStorage.setItem("tasks", JSON.stringify(sortTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))));
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    localStorage.setItem("tasks", JSON.stringify(tasks.filter((task) => task.id !== taskId)));
  };

  const toggleComplete = (taskId) => {
    setTasks((prevTasks) => sortTasks(prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))));
    localStorage.setItem("tasks", JSON.stringify(sortTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))));
  };

  const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.description.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container">
      <h1>Task Management App</h1>
      <TaskForm onAddTask={addTask} tasks={tasks} />
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <TaskList tasks={filteredTasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} onToggleComplete={toggleComplete} />
    </div>
  );
}

export async function getServerSideProps() {
  const initialTasks = [
    { id: 1, title: "Complete project", description: "Finish the task management app", priority: "high", completed: false },
    { id: 2, title: "Buy groceries", description: "Get milk, bread, and eggs", priority: "medium", completed: false },
    { id: 3, title: "Go for a run", description: "30 minutes jog in the park", priority: "low", completed: false },
  ];

  return {
    props: {
      initialTasks: sortTasks(initialTasks),
    },
  };
}
