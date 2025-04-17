import { useState } from 'react';
import './TaskItem.css';

/**
 * Componente TaskItem
 * 
 * Este componente representa un elemento individual de tarea en la lista.
 * Permite visualizar, editar, marcar como completada y eliminar una tarea.
 * 
 * @param {Object} task - Objeto que contiene los datos de la tarea
 * @param {Function} onDelete - Función para eliminar la tarea
 * @param {Function} onUpdate - Función para actualizar la tarea
 */
function TaskItem({ task, onDelete, onUpdate }) {
  // Estado para controlar si la tarea está en modo edición
  const [isEditing, setIsEditing] = useState(false);
  // Estado para almacenar los valores editados de la tarea
  const [editedTask, setEditedTask] = useState({ ...task });

  /**
   * Maneja el cambio de estado de completado de la tarea
   */
  const handleToggleComplete = () => {
    onUpdate(task.id, { ...task, completed: !task.completed });
  };

  /**
   * Activa el modo de edición de la tarea
   */
  const handleEdit = () => {
    setIsEditing(true);
  };

  /**
   * Cancela la edición y restaura los valores originales
   */
  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask({ ...task });
  };

  /**
   * Guarda los cambios realizados en la tarea
   */
  const handleSave = () => {
    onUpdate(task.id, editedTask);
    setIsEditing(false);
  };

  /**
   * Actualiza el estado de la tarea mientras se edita
   * @param {Event} e - Evento del cambio en el input
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        // Formulario de edición de tarea
        <div className="task-edit-form">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            placeholder="Título de la tarea"
            required
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            placeholder="Descripción (opcional)"
          />
          <div className="task-actions">
            <button onClick={handleSave}>Guardar</button>
            <button onClick={handleCancel}>Cancelar</button>
          </div>
        </div>
      ) : (
        // Vista normal de la tarea
        <>
          <div className="task-content">
            <div className="task-header">
              {/* Checkbox para marcar como completada */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggleComplete}
              />
              <h3>{task.title}</h3>
            </div>
            {/* Mostrar descripción solo si existe */}
            {task.description && <p>{task.description}</p>}
          </div>
          <div className="task-actions">
            <button onClick={handleEdit}>Editar</button>
            <button onClick={() => onDelete(task.id)}>Eliminar</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;