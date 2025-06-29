import React, { useState, useEffect } from "react";
import "./App.css";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      const taskObj = {
        text: newTask.trim(),
        completed: false,
        deadline: deadline,
      };
      if (editIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = taskObj;
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, taskObj]);
      }
      setNewTask("");
      setDeadline("");
    }
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const clearAll = () => {
    setTasks([]);
  };

  const toggleCompleted = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const editTask = (index) => {
    setNewTask(tasks[index].text);
    setDeadline(tasks[index].deadline);
    setEditIndex(index);
  };

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const isDeadlineDueOrOver = (deadline) => {
    if (!deadline) return false;
    const today = new Date().toISOString().split("T")[0];
    return deadline <= today;
  };

  return (
    <div className="container">
      <div className="todo-box">
        <h2>Todo App</h2>

        <div className="input-section">
          <input
            type="text"
            placeholder="Add your new todo"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <button onClick={addTask}>
            <FaPlus />
          </button>
        </div>

        <ul className="task-list">
          {[...pendingTasks, ...completedTasks].map((task, index) => (
            <li
              key={index}
              className={`${
                task.completed ? "completed" : ""
              } ${isDeadlineDueOrOver(task.deadline) && !task.completed ? "alert" : ""}`}
            >
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(index)}
                />
                <div>
                  <span>{task.text}</span>
                  {task.deadline && (
                    <small> (Due: {task.deadline})</small>
                  )}
                </div>
              </div>
              <div className="task-actions">
                <FaEdit onClick={() => editTask(index)} />
                <FaTrash onClick={() => deleteTask(index)} />
              </div>
            </li>
          ))}
        </ul>

        <div className="footer">
          <p>
            Pending: {pendingTasks.length} | Completed: {completedTasks.length}
          </p>
          <button onClick={clearAll}>Clear All</button>
        </div>
      </div>
    </div>
  );
}

export default App;
