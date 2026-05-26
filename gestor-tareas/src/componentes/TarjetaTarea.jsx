import React from 'react';

function TarjetaTarea({ tarea, onEliminar, onEditar, onAlternarCompletada }) {
  // Generamos una clase CSS dinámica basada en la prioridad (alta, media, baja)
const clasePrioridad = `prioridad-${tarea.prioridad.toLowerCase()}`;

return (
    <div className={`tarjeta-tarea ${clasePrioridad} ${tarea.estado === 'Completada' ? 'tarea-completada' : ''}`}>
    <div className="contenido-tarjeta">
        <div className="zona-titulo-tarjeta">
        <span className="etiqueta-prioridad">{tarea.prioridad}</span>
        <h3>{tarea.titulo}</h3>
        </div>
        
        {tarea.descripcion && <p className="descripcion-tarjeta">{tarea.descripcion}</p>}
        
        <div className="metadatos-tarjeta">
        <span className="etiqueta-estado">{tarea.estado}</span>
        {tarea.fechaLimite && <span className="etiqueta-fecha"> {tarea.fechaLimite}</span>}
        </div>
    </div>

    <div className="acciones-tarjeta">
        <button className="btn-accion btn-completar" onClick={() => onAlternarCompletada(tarea.id)}>
        {tarea.estado === 'Completada' ? ' Reabrir' : ' Completar'}
        </button>
        <button className="btn-action btn-editar" onClick={() => onEditar(tarea)}> Editar</button>
        <button className="btn-action btn-eliminar" onClick={() => onEliminar(tarea.id)}> Borrar</button>
    </div>
    </div>
);
}

export default TarjetaTarea;