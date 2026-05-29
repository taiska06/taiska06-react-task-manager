
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Загрузка задач из API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка сети');
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setError('❌ Ошибка загрузки данных');
        setLoading(false);
      });
  }, []);

  // Удаление задачи
  const handleDelete = (id, e) => {
    e.stopPropagation(); // Останавливаем всплытие события
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Переключение статуса
  const handleToggle = (id, e) => {
    e.stopPropagation(); // Останавливаем всплытие события
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Добавление задачи
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim() === '') return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      completed: false,
      userId: 1
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Загрузка задач...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button className="retry-button" onClick={() => window.location.reload()}>
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      {/* Форма добавления задачи */}
      <form className="add-task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          className="add-task-input"
          placeholder="Введите новую задачу..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button type="submit" className="add-task-btn">
          <span className="add-icon">+</span>
          Добавить
        </button>
      </form>

      {/* Список задач */}
      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>✨ Задач пока нет</p>
          <p className="empty-hint">Добавьте свою первую задачу!</p>
        </div>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              {/* ТЕКСТ ЗАДАЧИ - ссылка на детальную страницу */}
              <Link to={`/task/${task.id}`} className="task-title-link">
                <span className="task-title">{task.title}</span>
              </Link>

              {/* ЧЕКБОКС - НЕ ссылка */}
              <div className="task-right">
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={task.completed}
                  onChange={(e) => handleToggle(task.id, e)}
                />
                <span className={`task-status ${task.completed ? 'completed' : 'pending'}`}>
                  {task.completed ? '✓ Выполнено' : '○ В процессе'}
                </span>
                
                {/* КНОПКА УДАЛЕНИЯ - НЕ ссылка */}
                <button className="delete-btn" onClick={(e) => handleDelete(task.id, e)}>
                  <span className="delete-icon">🗑️</span>
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;