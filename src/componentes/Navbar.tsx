import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  // 1. Estado inicial: Revisa si ya había una preferencia guardada
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // 2. Efecto para aplicar el atributo en el HTML global
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <nav className="home-nav">
      <div className="nav-logo">
        TaskApp
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className={`nav-link-item ${location.pathname === '/' ? 'active' : ''}`}>
            <span>Inicio</span>
          </Link>
        </li>
        <li>
          <Link to="/tasks" className={`nav-link-item ${location.pathname === '/tasks' ? 'active' : ''}`}>
            <span>Tareas</span>
          </Link>
        </li>
        <li>
          <Link to="/stats" className={`nav-link-item ${location.pathname === '/stats' ? 'active' : ''}`}>
            <span>Estadísticas</span>
          </Link>
        </li>
        
        {/* Botón interactivo para cambiar de modo */}
        <li>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="btn-theme-toggle"
            title={darkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;