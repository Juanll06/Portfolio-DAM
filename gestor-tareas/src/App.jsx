import React, { useState, useEffect } from 'react';
import FormularioTarea from './componentes/FormularioTarea';
import ListaTareas from './componentes/ListaTareas';
import FiltrosTarea from './componentes/FiltrosTarea';
import './index.css';

function App() {
  // Estado principal con la lista de tareas guardadas en el navegador
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem('mis-tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });

  // Estados para controlar la búsqueda, filtrado y ordenación
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todas');
  const [filtroPrioridad, setFiltroPrioridad] = useState('Todas');
  const [ordenarPor, setOrdenarPor] = useState('fecha'); 

  // Estado para saber si estamos editando una tarea actualmente
  const [tareaParaEditar, setTareaParaEditar] = useState(null);

  // Guardar en LocalStorage automáticamente cada vez que cambien las tareas
  useEffect(() => {
    localStorage.setItem('mis-tareas', JSON.stringify(tareas));
  }, [tareas]);

  // --- LOGICA DEL CRUD ---

  // Función para guardar (crear una nueva o actualizar una existente)
  const guardarTarea = (datosTarea) => {
    if (tareaParaEditar) {
      // Si estábamos editando, modificamos el elemento correspondiente del array
      setTareas(tareas.map(t => t.id === tareaParaEditar.id ? { ...t, ...datosTarea } : t));
      setTareaParaEditar(null); // Limpiamos el modo edición
    } else {
      // Si es una tarea nueva, le creamos un ID único y la añadimos al array
      const nuevaTarea = {
        id: crypto.randomUUID(),
        ...datosTarea
      };
      setTareas([...tareas, nuevaTarea]);
    }
  };

  // Función para borrar una tarea pidiendo confirmación al usuario
  const eliminarTarea = (id) => {
    if (window.confirm('¿Seguro que quieres eliminar esta tarea por completo?')) {
      setTareas(tareas.filter(t => t.id !== id));
    }
  };

  // Función rápida para cambiar el estado de Completada / Pendiente al pulsar el botón verde
  const alternarCompletada = (id) => {
    setTareas(tareas.map(t => t.id === id ? { ...t, estado: t.estado === 'Completada' ? 'Pendiente' : 'Completada' } : t));
  };

  // --- FILTRADO Y ORDENACIÓN DE LAS TAREAS EN TIEMPO REAL ---
  const tareasFiltradasYOrdenadas = tareas
    .filter(t => t.titulo.toLowerCase().includes(busqueda.toLowerCase()))
    .filter(t => filtroEstado === 'Todas' ? true : t.estado === filtroEstado)
    .filter(t => filtroPrioridad === 'Todas' ? true : t.prioridad === filtroPrioridad)
    .sort((a, b) => {
      if (ordenarPor === 'fecha') {
        if (!a.fechaLimite) return 1;
        if (!b.fechaLimite) return -1;
        return new Date(a.fechaLimite) - new Date(b.fechaLimite);
      }
      if (ordenarPor === 'prioridad') {
        const pesoPrioridad = { 'Alta': 3, 'Media': 2, 'Baja': 1 };
        return pesoPrioridad[b.prioridad] - pesoPrioridad[a.prioridad];
      }
      return 0;
    });

  // Cálculos para el panel superior de estadísticas
  const totalTareas = tareas.length;
  const completadas = tareas.filter(t => t.estado === 'Completada').length;
  const pendientes = tareas.filter(t => t.estado === 'Pendiente').length;

  return (
    <div className="contenedor-app">
      <header className="cabecera-app">
        <h1> Gestor de Tareas</h1>
        <div className="barra-estadisticas">
          <span>Totales: {totalTareas}</span> | 
          <span className="texto-pendiente"> Pendientes: {pendientes}</span> | 
          <span className="texto-completada"> Completadas: {completadas}</span>
        </div>
      </header>

      <main className="contenido-app">
        {/* Columna izquierda: Formulario */}
        <section className="columna-izquierda">
          <h2>{tareaParaEditar ? ' Editar Tarea' : ' Nueva Tarea'}</h2>
          <FormularioTarea 
            onGuardar={guardarTarea} 
            tareaParaEditar={tareaParaEditar} 
            cancelarEdicion={() => setTareaParaEditar(null)} 
          />
        </section>

        {/* Columna derecha: Filtros y Tarjetas */}
        <section className="columna-derecha">
          <h2> Filtros y Listado</h2>
          <FiltrosTarea 
            busqueda={busqueda} setBusqueda={setBusqueda}
            filtroEstado={filtroEstado} setFiltroEstado={setFiltroEstado}
            filtroPrioridad={filtroPrioridad} setFiltroPrioridad={setFiltroPrioridad}
            ordenarPor={ordenarPor} setOrdenarPor={setOrdenarPor}
          />
          <ListaTareas 
            tareas={tareasFiltradasYOrdenadas} 
            onEliminar={eliminarTarea} 
            onEditar={setTareaParaEditar} 
            onAlternarCompletada={alternarCompletada} 
          />
        </section>
      </main>
    </div>
  );
}

export default App;