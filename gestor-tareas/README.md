#  Gestor de Tareas - React

Aplicación web interactiva desarrollada con **React** y **Vite** para la gestión de tareas diarias (CRUD), permitiendo organizar las obligaciones por prioridad, estados y fechas límite mediante una interfaz en modo oscuro.

##  Tecnologías Utilizadas

* **Framework:** React 18+ (Hooks: `useState`, `useEffect`)
* **Herramienta de Construcción:** Vite
* **Estilos:** CSS3 Puro (Custom Properties & Grid/Flexbox para diseño responsive)
* **Identificadores:** `crypto.randomUUID()` para claves únicas de tareas

##  Características Principales

* **Operaciones CRUD Completas:** Crear, visualizar, editar y eliminar tareas de forma permanente.
* **Persistencia Local:** Los datos se guardan de forma automática en el `localStorage` del navegador para no perder la información al recargar.
* **Sistema de Filtros Avanzado:** Filtrado en tiempo real por estado (Todas, Pendientes, Completadas) y nivel de prioridad (Alta, Media, Baja).
* **Ordenación:** Clasificación de tareas por orden de fecha límite o por relevancia de prioridad.
* **Diseño Responsive:** Interfaz adaptable optimizada para ordenadores, tablets y teléfonos móviles en un Modo Oscuro limpio.

##  Instrucciones de Instalación y Despliegue

Sigue estos pasos en la terminal para poner en marcha el proyecto localmente:

1. **Situarse en la carpeta del proyecto:**

Bash

cd gestor-tareas

2. **Instalar todas las dependencias del package.json:**

Bash

npm install

3. **Iniciar el servidor local en modo desarrollo:**

Bash

npm run dev

4. **Acceder a la aplicacion:**

Abre tu navegador e introduce la dirección web facilitada en la terminal
(habitualmente http://localhost5173).