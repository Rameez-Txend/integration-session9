import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setError('Title is required!');
      return;
    }

    try {
      const newTask = { title, description };
      const res = await axios.post('http://localhost:5000/api/tasks', newTask);
      addTask(res.data);
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      setError('Failed to add task');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Task</h3>
      {error && <div>{error}</div>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
