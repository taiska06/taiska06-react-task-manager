// src/components/TaskForm.jsx
import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;
    onAddTask(text);
    setText('');
  };

  return (
    <p></p>
  );
}

export default TaskForm;