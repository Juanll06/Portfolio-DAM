    import React from 'react';
    import TarjetaTarea from './TarjetaTarea';

    function ListaTareas({ tareas, onEliminar, onEditar, onAlternarCompletada }) {
    if (tareas.length === 0) {
        return <p className="sin-tareas">No hay ninguna tarea que coincida con los filtros actuales.</p>;
    }

    return (
        <div className="lista-tareas-grid">
        {tareas.map(tarea => (
            <TarjetaTarea 
            key={tarea.id} 
            tarea={tarea} 
            onEliminar={onEliminar} 
            onEditar={onEditar} 
            onAlternarCompletada={onAlternarCompletada} 
            />
        ))}
        </div>
    );
    }

    export default ListaTareas;