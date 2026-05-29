import { Routes, Route } from 'react-router-dom';
import TasksPage from './pages/TasksPage';
import AboutPage from './pages/AboutPage';
import TaskDetailPage from './pages/TaskDetailPage';  // ← добавить импорт
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/task/:id" element={<TaskDetailPage />} />  
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;