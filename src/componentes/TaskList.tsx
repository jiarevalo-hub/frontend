import React, { useState } from 'react';
import TaskItem from './TaskItem';
import type { Task } from '../App';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
const [searchTerm, setSearchTerm] = useState<string>('');

  // Filtrado de tareas ignorando mayúsculas/minúsculas
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="lista-seccion">
      {/* Encabezado dinámico usando la nueva clase CSS */}
      <div className="lista-header-flex">
        <h3>Lista de Tareas ({filteredTasks.length})</h3>
      </div>

      {/* Caja del buscador usando clases de tareas.css */}
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Buscar tarea por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      {/* Condicionales con clases limpias */}
      {filteredTasks.length === 0 ? (
        <p className="lista-vacia-mensaje">
          {tasks.length === 0 
            ? "No hay tareas pendientes. ¡Buen trabajo!" 
            : "No se encontraron tareas que coincidan con tu búsqueda."}
        </p>
      ) : (
        <ul className="lista-tareas-reset">
          {filteredTasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={onToggle} 
              onDelete={onDelete} 
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default TaskList;