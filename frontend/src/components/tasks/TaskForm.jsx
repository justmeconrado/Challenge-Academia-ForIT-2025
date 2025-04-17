import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createTask, updateTask } from '../../services/taskService';
import './TaskForm.css';

function TaskForm({ tasks, setTasks }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [error, setError] = useState('');

  // Si hay un ID, estamos editando una tarea existente
  useEffect(() => {
    if (id) {
      const taskToEdit = tasks.find(task => task.id === parseInt(id));
      if (taskToEdit) {
        setFormData({
          title: taskToEdit.title,
          description: taskToEdit.description || ''
        });
      } else {
        setError('Tarea no encontrada');
      }
    }
  }, [id, tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('El título es obligatorio');
      return;
    }

    try {
      if (id) {
        // Actualizar tarea existente
        const updatedTask = await updateTask(parseInt(id), formData);
        setTasks(tasks.map(task => 
          task.id === parseInt(id) ? { ...task, ...updatedTask } : task
        ));
      } else {
        // Crear nueva tarea
        const newTask = await createTask(formData);
        setTasks([...tasks, newTask]);
      }
      navigate('/');
    } catch (error) {
      setError('Ocurrió un error al guardar la tarea');
      console.error(error);
    }
  };

  return (
    <div className="task-form-container">
      <h2>{id ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Título *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ingresa el título de la tarea"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ingresa una descripción (opcional)"
            rows="4"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="primary-button">
            {id ? 'Actualizar Tarea' : 'Crear Tarea'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')}
            className="secondary-button"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;