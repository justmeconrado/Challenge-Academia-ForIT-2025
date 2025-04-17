import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskListPage from './pages/TaskListPage';
import TaskForm from './components/tasks/TaskForm';
import { getAllTasks } from './services/taskService';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
      } catch (error) {
        console.error('Error al cargar las tareas:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<TaskListPage />} />
          <Route path="/new" element={<TaskForm tasks={tasks} setTasks={setTasks} />} />
          <Route path="/edit/:id" element={<TaskForm tasks={tasks} setTasks={setTasks} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;