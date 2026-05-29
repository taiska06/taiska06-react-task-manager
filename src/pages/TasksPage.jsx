import { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((response) => {
        if (!response.ok) throw new Error('Ошибка сети');
        return response.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка загрузки данных');
        setLoading(false);
      });
  }, []);

  const addTask = (taskText) => {
    if (taskText.trim() === '') return;
    const newTask = {
      id: Date.now(),
      title: taskText,
      completed: false,
      userId: 1
    };
    setTasks([newTask, ...tasks]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="page">
      <h2 className="page-title">📋 Список задач</h2>
      <TaskForm onAddTask={addTask} />
      <TaskList 
        tasks={tasks}
        onDeleteTask={deleteTask}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default TasksPage;