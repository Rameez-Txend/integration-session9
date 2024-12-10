import React from 'react';
import axios from 'axios';

function TaskList({ tasks, deleteTask, toggleComplete }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      deleteTask(id);
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      const updatedTask = {
        status: currentStatus === 'pending' ? 'completed' : 'pending',
      };
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);
      toggleComplete(id, res.data.status);
    } catch (err) {
      console.error('Failed to update task status', err);
    }
  };

  return (
    <div>
      <h3>Task List</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>
              {task.title} - {task.status}
            </span>
            <button onClick={() => handleToggleComplete(task._id, task.status)}>Toggle Complete</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
