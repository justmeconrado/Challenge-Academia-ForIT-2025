/**
 * Servidor API para la aplicación de tareas (Todo App)
 * Este servidor proporciona endpoints para gestionar tareas (CRUD)
 */

// Importación de dependencias
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Inicialización de la aplicación Express
const app = express();
const PORT = process.env.PORT || 5000;

/**
 * Configuración de middleware
 */
// Habilitar CORS para permitir peticiones desde el frontend
app.use(cors());
// Parsear solicitudes con formato JSON
app.use(express.json());

/**
 * Almacenamiento temporal de tareas
 * En un entorno de producción, esto se reemplazaría por una base de datos
 */
let tasks = [
  { id: 1, title: 'Tarea de ejemplo', description: 'Esta es una tarea de ejemplo', completed: false }
];

/**
 * Rutas para la gestión de tareas (CRUD)
 */

/**
 * @route   GET /api/tasks
 * @desc    Obtener todas las tareas
 * @access  Público
 */
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

/**
 * @route   POST /api/tasks
 * @desc    Crear una nueva tarea
 * @access  Público
 * @body    {title, description}
 */
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  
  // Validación: el título es obligatorio
  if (!title) {
    return res.status(400).json({ error: 'El título es requerido' });
  }
  
  // Crear nueva tarea con ID autoincrementable
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
    title,
    description: description || '',
    completed: false
  };
  
  // Guardar la tarea y enviar respuesta
  tasks.push(newTask);
  res.status(201).json(newTask);
});

/**
 * @route   PUT /api/tasks/:id
 * @desc    Actualizar una tarea existente
 * @access  Público
 * @params  id - ID de la tarea a actualizar
 * @body    {title, description, completed}
 */
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, completed } = req.body;
  
  // Buscar la tarea por ID
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  // Verificar si la tarea existe
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  
  // Actualizar la tarea manteniendo los valores existentes si no se proporcionan nuevos
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description !== undefined ? description : tasks[taskIndex].description,
    completed: completed !== undefined ? completed : tasks[taskIndex].completed
  };
  
  // Enviar la tarea actualizada como respuesta
  res.json(tasks[taskIndex]);
});

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Eliminar una tarea
 * @access  Público
 * @params  id - ID de la tarea a eliminar
 */
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const initialLength = tasks.length;
  
  // Filtrar la tarea a eliminar
  tasks = tasks.filter(task => task.id !== taskId);
  
  // Verificar si la tarea existía
  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  
  // Enviar confirmación de eliminación
  res.json({ message: 'Tarea eliminada con éxito' });
});

/**
 * Middleware para manejo de rutas no encontradas
 */
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

/**
 * Middleware para manejo global de errores
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

/**
 * Iniciar el servidor
 */
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});