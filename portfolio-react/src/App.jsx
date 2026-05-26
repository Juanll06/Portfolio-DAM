import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProyectoCard from './components/ProyectoCard';
import './index.css';

function App() {
  const [modoOscuro, setModoOscuro] = useState(() => {
    const temaGuardado = localStorage.getItem('tema');
    return temaGuardado === 'oscuro';
  });

  const [proyectos, setProyectos] = useState([]);
  const [perfil, setPerfil] = useState(null); 
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (modoOscuro) {
      document.body.classList.add('modo-oscuro');
      localStorage.setItem('tema', 'oscuro');
    } else {
      document.body.classList.remove('modo-oscuro');
      localStorage.setItem('tema', 'claro');
    }
  }, [modoOscuro]);


  useEffect(() => {
    const obtenerDatosGithub = async () => {
      try {
        // 1. Petición para los datos del perfil personal
        const respuestaPerfil = await fetch('https://api.github.com/users/Juanll06');
        const datosPerfil = await respuestaPerfil.json();
        setPerfil(datosPerfil);

        // 2. Petición para los repositorios públicos
        const respuestaRepos = await fetch('https://api.github.com/users/Juanll06/repos');
        const datosRepos = await respuestaRepos.json();
        setProyectos(datosRepos);

        setCargando(false);
      } catch (error) {
        console.error("Error al conectar con la API de GitHub:", error);
        setCargando(false);
      }
    };

    obtenerDatosGithub();
  }, []);

  const cambiarTema = () => {
    setModoOscuro(!modoOscuro);
  };

  return (
    <>
      <button onClick={cambiarTema} className="btn-tema">
        {modoOscuro ? 'Modo Claro' : 'Modo Oscuro'}
      </button>

      <Navbar />

      <header>
        {cargando ? (
          <p>Cargando cabecera...</p>
        ) : (
          perfil && (
            <>
              <img src={perfil.avatar_url} alt={`Foto de ${perfil.name}`} className="foto-perfil" width="150" />
              <h1>{perfil.name || perfil.login}</h1>
              <p className="subtitulo">@{perfil.login} | Estudiante de Desarrollo de Aplicaciones Multiplataforma</p>
              {perfil.bio && <p className="bio-github"><em>{perfil.bio}</em></p>}
            </>
          )
        )}
      </header>

      <main>
        <section id="sobre-mi">
          <h2>Sobre Mí</h2>
          <p>
            Me llamo Juan López Lara, tengo 20 años. Actualmente estudio un grado superior de desarrollo de
            aplicaciones multiplataforma en el Gregorio Prieto en Valdepeñas. Soy una persona con iniciativa, cuento
            con nivel B1 de inglés y coche propio para poder desplazarme.
          </p>
        </section>

        <section id="proyectos">
          <h2>Mis Proyectos (Desde GitHub API)</h2>
          
          {cargando ? (
            <p>Cargando tus repositorios de GitHub...</p>
          ) : (
            <div className="contenedor-proyectos">
              {proyectos.map((repo) => (
                <ProyectoCard 
                  key={repo.id}
                  titulo={repo.name} 
                  descripcion={repo.description || "Sin descripción disponible en GitHub."}
                  enlace={repo.html_url}
                />
              ))}
            </div>
          )}
        </section>

        <section id="estudios">
          <h2>Estudios</h2>
          <ul>
            <li>
              <strong>Grado Superior de Desarrollo de Aplicaciones Multiplataforma</strong><br />
              Instituto Gregorio Prieto, Valdepeñas (En curso).
            </li>
            <li>
              <strong>Bachillerato de Letras</strong><br />
              Instituto Clara Campoamor, La Solana (2022-2024).
            </li>
          </ul>
        </section>

        <section id="habilidades">
          <h2>Habilidades Laborales</h2>
          <ul className="lista-habilidades">
            <li>Desarrollo de aplicaciones multiplataforma (Java).</li>
            <li>Gestión de bases de datos y persistencia de datos.</li>
            <li>Control de versiones con Git y GitHub.</li>
            <li>Inglés: Nivel B1 Cambridge.</li>
          </ul>
        </section>

        <section id="contacto">
          <h2>Contacto y Sugerencias</h2>
          <form className="formulario-contacto" onSubmit={(e) => e.preventDefault()}>
            <div className="campo">
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required />
            </div>

            <div className="campo">
              <label htmlFor="email">Correo electrónico:</label>
              <input type="email" id="email" name="email" placeholder="tu@email.com" required />
            </div>

            <div className="campo">
              <label htmlFor="descripcion">Descripción / Sugerencia:</label>
              <textarea id="descripcion" name="descripcion" rows="4" placeholder="Escribe aquí tu mensaje..." required></textarea>
            </div>

            <button type="submit">Enviar Mensaje</button>
          </form>

          <div className="enlaces-externos">
            <p>También puedes encontrarme en:</p>
            <a href="https://github.com/Juanll06" target="_blank" rel="noopener noreferrer">GitHub</a> | 
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=juanloopezl06@gmail.com" target="_blank" rel="noopener noreferrer">Email Directo</a>
          </div>
        </section>
      </main>

      <footer>
        <p>{new Date().getFullYear()} Juan López Lara - Todos los derechos reservados</p>
      </footer>
    </>
  );
}

export default App;