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