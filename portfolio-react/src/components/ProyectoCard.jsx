import React from 'react';

function ProyectoCard({ titulo, descripcion, enlace }) {
return (
    <article className="proyecto-card">
    <h3>{titulo}</h3>
    <p>{descripcion}</p>
    <a href={enlace} target="_blank" rel="noopener noreferrer" className="boton-proyecto">
        Ver en GitHub
    </a>
    </article>
);
}

export default ProyectoCard;