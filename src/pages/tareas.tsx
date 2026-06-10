import React, { useState } from 'react';
import Navbar from '../componentes/Navbar';
import TaskForm from '../componentes/TaskForm';
import TaskList from '../componentes/TaskList';
import { createTask, updateTask, deleteTask, task } from '../services/Service';
import './styles/tareas.css';
import type { Task } from '../App';

interface TareasProps {
  tasks: Task[];
  recargar: () => Promise<void>;
}

const Tareas: React.FC<TareasProps> = ({ tasks, recargar }) => {
  const [procesando, setProcesando] = useState(false);

  const handleAgregar = async (title: string, priority: string) => {
  try {
    setProcesando(true);
    await createTask(task, { title, priority, completed: false }); // ← agrega completed
    await recargar();
  } catch (error) {
    console.error('Error al crear:', error);
    alert('No se pudo crear la tarea.');
  } finally {
    setProcesando(false);
  }
};

  const handleToggle = async (id: number) => {
    const tarea = tasks.find(t => t.id === id);
    if (!tarea) return;
    try {
      await updateTask(`${task}/${id}`, { arg: { completed: !tarea.completed } });
      await recargar();
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('No se pudo actualizar la tarea.');
    }
  };

  const handleEliminar = async (id: number) => {
    if (!window.confirm('¿Eliminar esta tarea?')) return;
    try {
      await deleteTask(`${task}/${id}`, { arg: {} });
      await recargar();
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('No se pudo eliminar la tarea.');
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      <main className="home-main tareas-main-layout">
        <header className="home-header">
          <h1 className="home-title">Gestión de Tareas</h1>
          <p className="home-welcome">Crea, organiza y marca tus pendientes diarios.</p>
        </header>

        {procesando && <p style={{ color: '#646cff' }}>Sincronizando...</p>}

        <div className="tareas-grid">
          <TaskForm onAddTask={handleAgregar} />
          <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleEliminar} />
        </div>
      </main>
    </div>
  );
};

export default Tareas;