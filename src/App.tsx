import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tareas from './pages/tareas';
import Estadisticas from './pages/estadisticas';
import { getTasks, task } from './services/Service';
import './App.css';

export interface Task {
  id: number;
  title: string;
  priority: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const recargar = async () => {
    try {
      const data = await getTasks(task); // 'http://localhost:3000/task'
      setTasks(data);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    recargar();
  }, []);

  if (loading) return <div style={{ color: 'white', padding: '20px' }}>Cargando tareas...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tareas tasks={tasks} recargar={recargar} />} />
        <Route path="/stats" element={<Estadisticas tasks={tasks} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;