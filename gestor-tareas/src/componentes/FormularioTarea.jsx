    import React, { useState, useEffect } from 'react';

    function FormularioTarea({ onGuardar, tareaParaEditar, cancelarEdicion }) {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [prioridad, setPrioridad] = useState('Media');
    const [estado, setEstado] = useState('Pendiente');
    const [fechaLimite, setFechaLimite] = useState('');

    // Si nos pasan una tarea para editar, rellenamos el formulario automáticamente
    useEffect(() => {
        if (tareaParaEditar) {
        setTitulo(tareaParaEditar.titulo);
        setDescripcion(tareaParaEditar.descripcion);
        setPrioridad(tareaParaEditar.prioridad);
        setEstado(tareaParaEditar.estado);
        setFechaLimite(tareaParaEditar.fechaLimite || '');
        } else {
        limpiarFormulario();
        }
    }, [tareaParaEditar]);

    const limpiarFormulario = () => {
        setTitulo('');
        setDescripcion('');
        setPrioridad('Media');
        setEstado('Pendiente');
        setFechaLimite('');
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        if (!titulo.trim()) return alert('El título es completamente obligatorio.');

        // Enviamos los datos ordenados al App.jsx
        onGuardar({ titulo, descripcion, prioridad, estado, fechaLimite });
        limpiarFormulario();
        alert(tareaParaEditar ? '¡Tarea actualizada correctamente!' : '¡Tarea creada con éxito!');
    };

    return (
        <form onSubmit={manejarEnvio} className="formulario-tarea">
        <div className="grupo-formulario">
            <label>Título * (máx 100 caracteres)</label>
            <input 
            type="text" 
            maxLength="100" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
            placeholder="Ej: Estudiar para el examen de DAM"
            required 
            />
        </div>

        <div className="grupo-formulario">
            <label>Descripción (máx 500 caracteres)</label>
            <textarea 
            maxLength="500" 
            rows="4" 
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
            placeholder="Añade detalles adicionales de la tarea aquí..."
            />
        </div>

        <div className="fila-formulario">
            <div className="grupo-formulario">
            <label>Prioridad</label>
            <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                <option value="Alta"> Alta</option>
                <option value="Media"> Media</option>
                <option value="Baja"> Baja</option>
            </select>
            </div>

            <div className="grupo-formulario">
            <label>Estado</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="Pendiente"> Pendiente</option>
                <option value="En Progreso"> En Progreso</option>
                <option value="Completada"> Completada</option>
            </select>
            </div>
        </div>

        <div className="grupo-formulario">
            <label>Fecha Límite</label>
            <input 
            type="date" 
            value={fechaLimite} 
            onChange={(e) => setFechaLimite(e.target.value)} 
            />
        </div>

        <div className="botones-formulario">
            <button type="submit" className="btn-guardar">
            {tareaParaEditar ? 'Guardar Cambios' : 'Crear Tarea'}
            </button>
            {tareaParaEditar && (
            <button type="button" className="btn-cancelar" onClick={cancelarEdicion}>
                Cancelar
            </button>
            )}
        </div>
        </form>
    );
    }

    export default FormularioTarea;