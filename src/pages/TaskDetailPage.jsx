import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './TaskDetailPage.css';

function TaskDetailPage() {
  const { id } = useParams(); // получаем ID задачи из URL
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos?_limit=10`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Задача не найдена');
        }
        return response.json();
      })
      .then((data) => {
        setTask(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="loading-spinner"></div>
        <p>Загрузка задачи...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-error">
        <p>❌ {error}</p>
        <Link to="/" className="back-link">← Вернуться к списку</Link>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="detail-error">
        <p>❌ Задача не найдена</p>
        <Link to="/" className="back-link">← Вернуться к списку</Link>
      </div>
    );
  }

  return (
    <div className="task-detail">
      <Link to="/" className="back-link">← Назад к списку</Link>
      
      <div className="detail-card">
        <h2 className="detail-title">
          {task.title}
        </h2>
        
        <div className="detail-status">
          <span className={`status-badge ${task.completed ? 'done' : 'pending'}`}>
            {task.completed ? '✓ Выполнено' : '○ Не выполнено'}
          </span>
        </div>
        
        <div className="detail-info">
          <p><strong>ID задачи:</strong> {task.id}</p>
          <p><strong>ID пользователя:</strong> {task.userId}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailPage;