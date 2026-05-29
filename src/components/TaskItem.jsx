import { Link } from 'react-router-dom';

function TaskItem({ task, onDelete }) {
  return (
    <li className="task-item">
      <Link to={`/task/${task.id}`} className="task-link">
        <span className="task-title">{task.title}</span>
        <span className="task-status">
          {task.completed ? '✓ Выполнено' : '○ В процессе'}
        </span>
      </Link>
      <button 
        className="delete-btn"
        onClick={() => onDelete(task.id)}
      >
        🗑️ Удалить
      </button>
    </li>
  );
}

export default TaskItem;