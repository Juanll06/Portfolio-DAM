const botonTema = document.getElementById('cambiar-tema');
const body = document.body;

const temaGuardado = localStorage.getItem('tema');

if (temaGuardado === 'oscuro') {
    body.classList.add('modo-oscuro');
}

// Función que se ejecuta al hacer clic en el botón
botonTema.addEventListener('click', () => {
    body.classList.toggle('modo-oscuro');
    
    if (body.classList.contains('modo-oscuro')) {
        localStorage.setItem('tema', 'oscuro');
    } else {
        localStorage.setItem('tema', 'claro');
    }
});

// 1. Definimos los elementos iniciales usando Objetos (Clean Code)
let misEstudios = [
    { titulo: "Grado Superior de DAM", centro: "Gregorio Prieto", anio: "En curso" },
    { titulo: "Bachillerato de Letras", centro: "Clara Campoamor", anio: "2022-2024" }
];

const contenedorEstudios = document.getElementById('lista-estudios');
const formulario = document.getElementById('formulario-estudios');
const btnMostrar = document.getElementById('btn-mostrar-formulario');

// 2. Función para pintar los estudios en el HTML
function renderizarEstudios() {
    contenedorEstudios.innerHTML = ""; // Limpiamos antes de pintar
    
    misEstudios.forEach((estudio) => {
        const div = document.createElement('div');
        div.className = "estudio-item";
        div.innerHTML = `
            <strong>${estudio.titulo}</strong><br>
            ${estudio.centro} (${estudio.anio})
            <hr>
        `;
        contenedorEstudios.appendChild(div);
    });
}

// Mostrar/ocultar el formulario
btnMostrar.addEventListener('click', () => {
    formulario.classList.toggle('oculto');
});

// Capturar el nuevo estudio del formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Creamos el nuevo objeto
    const nuevoEstudio = {
        titulo: document.getElementById('nuevo-titulo').value,
        centro: document.getElementById('nuevo-centro').value,
        anio: document.getElementById('nuevo-anio').value
    };

    // Añadimos al array, limpiamos formulario y refrescamos interfaz
    misEstudios.push(nuevoEstudio);
    formulario.reset();
    formulario.classList.add('oculto');
    renderizarEstudios();
});

renderizarEstudios();