// src/components/Header.jsx
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="header-title">
        <span className="header-icon">📋</span>
        Список задач
      </h1>
      <nav className="nav">
        <Link to="/" className="nav-link">Задачи</Link>
        <Link to="/about" className="nav-link">О приложении</Link>
      </nav>
    </header>
  );
}

export default Header;