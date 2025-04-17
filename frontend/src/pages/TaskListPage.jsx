import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskItem from '../components/tasks/TaskItem';
import { getAllTasks, deleteTask, updateTask } from '../services/taskService';
import './TaskListPage.css';

function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getAllTasks();
      setTasks(data);
      setError('');
    } catch (error) {
      setError('Error al cargar las tareas');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      setError('Error al eliminar la tarea');
      console.error(error);
    }
  };

  const handleUpdate = async (id, updatedTask) => {
    try {
      const result = await updateTask(id, updatedTask);
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, ...result } : task
      ));
    } catch (error) {
      setError('Error al actualizar la tarea');
      console.error(error);
    }
  };

  return (
    <div className="task-list-page">
      <div className="header">
        <h1>Lista de Tareas</h1>
        <Link to="/new" className="add-button">+ Nueva Tarea</Link>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Cargando tareas...</div>
      ) : tasks.length === 0 ? (
        <div className="empty-list">
          No hay tareas disponibles. ¡Crea una nueva!
        </div>
      ) : (
        <div className="task-list">
          {tasks.map(task => (
            <TaskItem 
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskListPage;