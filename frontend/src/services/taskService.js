const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getAllTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) {
      throw new Error("Error al obtener las tareas");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getAllTasks:", error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error("Error al crear la tarea");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en createTask:", error);
    throw error;
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar la tarea");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en updateTask:", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar la tarea");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en deleteTask:", error);
    throw error;
  }
};
