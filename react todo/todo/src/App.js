import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState(["Alice", "Bob"]);
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [userTasks, setUserTasks] = useState({ Alice: [], Bob: [] });
  const [newTask, setNewTask] = useState("");
  const [newUser, setNewUser] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    setUserTasks({
      ...userTasks,
      [selectedUser]: [...userTasks[selectedUser], { id: Date.now(), text: newTask, completed: false }],
    });
    setNewTask("");
  };

  const toggleTask = (id) => {
    setUserTasks({
      ...userTasks,
      [selectedUser]: userTasks[selectedUser].map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    });
  };

  const removeTask = (id) => {
    setUserTasks({
      ...userTasks,
      [selectedUser]: userTasks[selectedUser].filter((task) => task.id !== id),
    });
  };

  const addUser = () => {
    if (!newUser.trim() || users.includes(newUser)) return;
    setUsers([...users, newUser]);
    setUserTasks({ ...userTasks, [newUser]: [] });
    setNewUser("");
  };

  return (
    <div className="todo-container">
      <h1>📝 Multi-User To-Do List</h1>

      {/* User Selection */}
      <div className="user-section">
        <label>👤 Select User:</label>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          {users.map((user) => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
      </div>

      {/* Add New User */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter new user"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button onClick={addUser} className="add-btn">➕ Add User</button>
      </div>

      {/* Add New Task */}
      <div className="input-container">
        <input
          type="text"
          placeholder={`Add a task for ${selectedUser}`}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask} className="add-btn">✅ Add Task</button>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {userTasks[selectedUser]?.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span onClick={() => toggleTask(task.id)}>{task.text}</span>
            <button onClick={() => removeTask(task.id)} className="delete-btn">❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
