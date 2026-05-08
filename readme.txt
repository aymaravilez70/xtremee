=====================================
Bloque Zero — Website Project UEES
=====================================

Asignatura: UCOM351 — Desarrollo de Aplicaciones Web
Actividad: N.° 3 — JS/DOM + Validación de Formularios
Universidad: Universidad de Especialidades Espíritu Santo (UEES)
Ciclo: 2025–2026 | Periodo en Línea 2

-------------------------------------
Integrantes:
-------------------------------------
- Aymar Marconis Aviles Ronquillo

-------------------------------------
Descripción del Proyecto:
-------------------------------------
Bloque Zero es un sitio web para un estudio creativo y tecnológico 
que ofrece servicios de transformación digital, incluyendo APIs de 
E-commerce, Soluciones con IA y Sistemas de Gestión.

En esta actividad se implementó interactividad con JavaScript, 
manipulación del DOM y validación de formularios con expresiones 
regulares en la página de contacto del proyecto.

-------------------------------------
Funcionalidades Implementadas:
-------------------------------------

Bloque 1 — Conexión de Eventos:
  - Captura del formulario con addEventListener('submit')
  - Implementación de event.preventDefault()
  - Uso de querySelector para obtener valores
  - Manejo de eventos 'submit' e 'input'

Bloque 2 — Validación con Regex:
  - Campo Nombre: mínimo 3 caracteres, solo letras
  - Campo Email: formato usuario@dominio.com con regex
  - Campo Teléfono: solo dígitos, entre 7-15 números
  - Campo URL: formato https://dominio.com con regex
  - Validación en tiempo real (evento 'input')
  - Mensajes de error específicos debajo de cada campo
  - Botón de envío deshabilitado mientras haya errores

Bloque 3 — Manipulación del DOM:
  - Estado Inicial: mensaje de bienvenida con instrucciones
  - Estado Buscando: spinner + "Buscando información de [nombre]..."
  - Estado Resultado: tarjeta con datos simulados del cliente
  - Transiciones con classList.add() y classList.remove()
  - Función de limpieza con .reset() que regresa al estado inicial

Bloque 4 — Calidad del Código:
  - script.js organizado con secciones comentadas
  - Funciones con responsabilidad única (validar, renderizar, manejar submit)
  - Uso exclusivo de const y let (sin var)
  - Sin errores en consola del navegador
  - Sin atributos onclick en el HTML

Extra:
  - Persistencia del último término buscado con localStorage
  - Al recargar la página se restaura el nombre del último envío

-------------------------------------
Tecnologías Utilizadas:
-------------------------------------
  - HTML5
  - CSS3 (variables CSS, animaciones, responsive)
  - JavaScript (ES6+, módulos)
  - Vite (bundler/servidor de desarrollo)
  - Font Awesome (iconos)

-------------------------------------
Cómo Ejecutar:
-------------------------------------
  1. npm install
  2. npm run dev
  3. Abrir http://localhost:5173 en el navegador
  4. Navegar a la página "Contacto"
