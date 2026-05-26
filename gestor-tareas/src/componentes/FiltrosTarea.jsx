    import React from 'react';

    function FiltrosTarea({ 
    busqueda, setBusqueda, 
    filtroEstado, setFiltroEstado, 
    filtroPrioridad, setFiltroPrioridad, 
    ordenarPor, setOrdenarPor 
    }) {
    return (
        <div className="contenedor-filtros">
        <input 
            type="text" 
            className="input-buscar"
            placeholder=" Buscar tarea por su título..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
        />

        <div className="selectores-filtros">
            <div>
            <label>Estado: </label>
            <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                <option value="Todas">Todas</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Completada">Completada</option>
            </select>
            </div>

            <div>
            <label>Prioridad: </label>
            <select value={filtroPrioridad} onChange={(e) => setFiltroPrioridad(e.target.value)}>
                <option value="Todas">Todas</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
            </select>
            </div>

            <div>
            <label>Ordenar por: </label>
            <select value={ordenarPor} onChange={(e) => setOrdenarPor(e.target.value)}>
                <option value="fecha"> Fecha Límite</option>
                <option value="prioridad"> Mayor Prioridad</option>
            </select>
            </div>
        </div>
        </div>
    );
    }

    export default FiltrosTarea;