// === POKÉDEX — Actividad 4: Consumo de API y Renderizado Dinámico ===

// === CONSTANTES ===

const API_BASE = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_LIMIT = 150;

// === SELECCIÓN DE ELEMENTOS ===

const pokemonInput = document.querySelector('#pokemon-input');
const btnBuscar = document.querySelector('#btn-buscar');
const btnListar = document.querySelector('#btn-listar');
const btnReintentar = document.querySelector('#btn-reintentar');
const pokemonGrid = document.querySelector('#pokemon-grid');
const mensajeVacio = document.querySelector('#mensaje-vacio');
const mensajeError = document.querySelector('#mensaje-error');

// Estados del DOM
const estadoInicial = document.querySelector('#estado-inicial');
const estadoCargando = document.querySelector('#estado-cargando');
const estadoResultados = document.querySelector('#estado-resultados');
const estadoVacio = document.querySelector('#estado-vacio');
const estadoError = document.querySelector('#estado-error');

// Modal de detalle
const detalleOverlay = document.querySelector('#detalle-overlay');
const detalleCerrar = document.querySelector('#detalle-cerrar');
const detalleContenido = document.querySelector('#detalle-contenido');

// Autocompletado
const sugerenciasLista = document.querySelector('#sugerencias-lista');
let listaNombresPokemon = [];

// Variable para guardar la última búsqueda (para Reintentar)
let ultimaBusqueda = null;

// === FUNCIONES DE ESTADO ===

/**
 * Muestra un estado específico y oculta los demás.
 * Usa classList.add() y classList.remove().
 */
const mostrarEstado = (estado) => {
    const estados = [estadoInicial, estadoCargando, estadoResultados, estadoVacio, estadoError];
    estados.forEach((el) => el.classList.remove('activo'));

    if (estado === 'inicial') estadoInicial.classList.add('activo');
    else if (estado === 'cargando') estadoCargando.classList.add('activo');
    else if (estado === 'resultados') estadoResultados.classList.add('activo');
    else if (estado === 'vacio') estadoVacio.classList.add('activo');
    else if (estado === 'error') estadoError.classList.add('activo');
};

// === BLOQUE 1: CONSUMO DE API CON ASYNC/AWAIT ===

/**
 * Busca un Pokémon por nombre o ID usando async/await.
 * Verifica response.ok antes de parsear JSON.
 * Maneja errores 404, 5xx y sin conexión con try...catch.
 */
const buscarPokemon = async (nombre) => {
    const url = `${API_BASE}/${nombre.toLowerCase().trim()}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                mostrarEstado('vacio');
                mensajeVacio.textContent = `No se encontró ningún Pokémon llamado "${nombre}".`;
                return null;
            }
            if (response.status >= 500) {
                throw new Error(`Error del servidor (${response.status}). Intenta más tarde.`);
            }
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.name === 'TypeError') {
            mensajeError.textContent = 'Sin conexión a internet. Verifica tu red e intenta de nuevo.';
        } else if (error.message.includes('Error del servidor')) {
            mensajeError.textContent = error.message;
        } else if (!error.message.includes('No se encontró')) {
            mensajeError.textContent = `Error: ${error.message}`;
        }

        if (!error.message.includes('No se encontró')) {
            mostrarEstado('error');
        }
        return null;
    }
};

/**
 * Obtiene una lista de Pokémon desde la API.
 * Retorna un array con datos básicos de cada Pokémon.
 */
const listarPokemon = async () => {
    const url = `${API_BASE}?limit=${POKEMON_LIMIT}&offset=0`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status >= 500) {
                throw new Error(`Error del servidor (${response.status}). Intenta más tarde.`);
            }
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        // Hacer fetch individual para obtener detalles de cada Pokémon
        const detalles = await Promise.all(
            data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                if (!res.ok) return null;
                const detalle = await res.json();
                return detalle;
            })
        );

        return detalles.filter((p) => p !== null);
    } catch (error) {
        if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
            mensajeError.textContent = 'Sin conexión a internet. Verifica tu red e intenta de nuevo.';
        } else {
            mensajeError.textContent = `Error: ${error.message}`;
        }
        mostrarEstado('error');
        return [];
    }
};

/**
 * Obtiene los detalles completos de un Pokémon por ID (segundo fetch).
 * Incluye datos de la especie para la descripción.
 */
const obtenerDetalle = async (id) => {
    try {
        const [pokemonRes, especieRes] = await Promise.all([
            fetch(`${API_BASE}/${id}`),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        ]);

        if (!pokemonRes.ok || !especieRes.ok) {
            throw new Error('No se pudo obtener el detalle.');
        }

        const pokemon = await pokemonRes.json();
        const especie = await especieRes.json();

        return { pokemon, especie };
    } catch (error) {
        console.error('Error al obtener detalle:', error);
        return null;
    }
};

// === BLOQUE 2: RENDERIZADO DINÁMICO ===

/**
 * Obtiene el color de fondo según el tipo del Pokémon.
 */
const colorTipo = {
    fire: '#F08030', water: '#6890F0', grass: '#78C850', electric: '#F8D030',
    ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0', ground: '#E0C068',
    flying: '#A890F0', psychic: '#F85888', bug: '#A8B820', rock: '#B8A038',
    ghost: '#705898', dragon: '#7038F8', dark: '#705848', steel: '#B8B8D0',
    fairy: '#EE99AC', normal: '#A8A878'
};

/**
 * Renderiza las tarjetas de Pokémon usando createDocumentFragment().
 * Cada tarjeta muestra: imagen, nombre, tipos y número.
 */
const renderizarTarjetas = (pokemonList) => {
    // Limpiar contenedor antes de cada búsqueda
    pokemonGrid.innerHTML = '';

    if (pokemonList.length === 0) {
        mostrarEstado('vacio');
        return;
    }

    const fragment = document.createDocumentFragment();

    pokemonList.forEach((pokemon) => {
        const tipos = pokemon.types.map((t) => t.type.name);
        const colorPrincipal = colorTipo[tipos[0]] || '#A8A878';

        const card = document.createElement('article');
        card.classList.add('pokemon-card');
        card.dataset.id = pokemon.id;
        card.style.borderColor = colorPrincipal;

        card.innerHTML = `
            <div class="pokemon-card-img" style="background-color: ${colorPrincipal}20">
                <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" alt="${pokemon.name}" loading="lazy">
            </div>
            <div class="pokemon-card-info">
                <span class="pokemon-numero">#${String(pokemon.id).padStart(3, '0')}</span>
                <h3 class="pokemon-nombre">${pokemon.name}</h3>
                <div class="pokemon-tipos">
                    ${tipos.map((tipo) => `<span class="tipo-badge" style="background-color: ${colorTipo[tipo] || '#A8A878'}">${tipo}</span>`).join('')}
                </div>
            </div>
        `;

        // Click en tarjeta → segundo fetch con ID
        card.addEventListener('click', () => {
            abrirDetalle(pokemon.id);
        });

        fragment.appendChild(card);
    });

    pokemonGrid.appendChild(fragment);
    mostrarEstado('resultados');
};

/**
 * Abre el modal de detalle con información adicional del Pokémon.
 * Hace un segundo fetch con el ID del elemento seleccionado.
 */
const abrirDetalle = async (id) => {
    detalleContenido.innerHTML = '<div class="spinner"></div><p style="text-align:center;color:var(--primary-color);">Cargando detalle...</p>';
    detalleOverlay.classList.add('activo');

    const datos = await obtenerDetalle(id);

    if (!datos) {
        detalleContenido.innerHTML = '<p style="text-align:center;color:#f85149;">Error al cargar el detalle.</p>';
        return;
    }

    const { pokemon, especie } = datos;
    const tipos = pokemon.types.map((t) => t.type.name);
    const colorPrincipal = colorTipo[tipos[0]] || '#A8A878';

    // Buscar descripción en español, si no en inglés
    const descripcionEntry = especie.flavor_text_entries.find((e) => e.language.name === 'es')
        || especie.flavor_text_entries.find((e) => e.language.name === 'en');
    const descripcion = descripcionEntry ? descripcionEntry.flavor_text.replace(/\f|\n/g, ' ') : 'Sin descripción disponible.';

    // Habilidades
    const habilidades = pokemon.abilities.map((a) => a.ability.name).join(', ');

    // Stats
    const stats = pokemon.stats.map((s) => ({
        nombre: s.stat.name,
        valor: s.base_stat
    }));

    const statsHtml = stats.map((s) => `
        <div class="stat-row">
            <span class="stat-nombre">${s.nombre}</span>
            <div class="stat-barra-bg">
                <div class="stat-barra" style="width: ${Math.min(s.valor, 200) / 2}%; background-color: ${colorPrincipal}"></div>
            </div>
            <span class="stat-valor">${s.valor}</span>
        </div>
    `).join('');

    detalleContenido.innerHTML = `
        <div class="detalle-header" style="background-color: ${colorPrincipal}20">
            <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" alt="${pokemon.name}">
            <div class="detalle-titulo">
                <span class="pokemon-numero">#${String(pokemon.id).padStart(3, '0')}</span>
                <h2>${pokemon.name}</h2>
                <div class="pokemon-tipos">
                    ${tipos.map((tipo) => `<span class="tipo-badge" style="background-color: ${colorTipo[tipo] || '#A8A878'}">${tipo}</span>`).join('')}
                </div>
            </div>
        </div>
        <div class="detalle-body">
            <p class="detalle-descripcion">${descripcion}</p>
            <div class="detalle-info-grid">
                <div class="detalle-info-item">
                    <i class="fa-solid fa-ruler-vertical"></i>
                    <strong>Altura</strong>
                    <span>${(pokemon.height / 10).toFixed(1)} m</span>
                </div>
                <div class="detalle-info-item">
                    <i class="fa-solid fa-weight-hanging"></i>
                    <strong>Peso</strong>
                    <span>${(pokemon.weight / 10).toFixed(1)} kg</span>
                </div>
                <div class="detalle-info-item">
                    <i class="fa-solid fa-bolt"></i>
                    <strong>Exp. Base</strong>
                    <span>${pokemon.base_experience || 'N/A'}</span>
                </div>
                <div class="detalle-info-item">
                    <i class="fa-solid fa-star"></i>
                    <strong>Habilidades</strong>
                    <span>${habilidades}</span>
                </div>
            </div>
            <h4>Estadísticas Base</h4>
            <div class="detalle-stats">
                ${statsHtml}
            </div>
        </div>
    `;
};

// === ESCUCHADORES DE EVENTOS ===

// Buscar por nombre
btnBuscar.addEventListener('click', async () => {
    const valor = pokemonInput.value.trim();
    if (valor === '') return;

    ultimaBusqueda = { tipo: 'buscar', valor };
    mostrarEstado('cargando');

    const pokemon = await buscarPokemon(valor);
    if (pokemon) {
        renderizarTarjetas([pokemon]);
    }
});

// Buscar al presionar Enter
pokemonInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sugerenciasLista.classList.remove('visible');
        btnBuscar.click();
    }
});

// === AUTOCOMPLETADO EN TIEMPO REAL ===

const cargarNombresPokemon = async () => {
    try {
        const response = await fetch(`${API_BASE}?limit=1025&offset=0`);
        if (!response.ok) return;
        const data = await response.json();
        listaNombresPokemon = data.results.map((p) => p.name);
    } catch (error) {
        console.error('Error al cargar nombres para autocompletado:', error);
    }
};

const mostrarSugerencias = (texto) => {
    sugerenciasLista.innerHTML = '';
    if (texto.length < 2) {
        sugerenciasLista.classList.remove('visible');
        return;
    }

    const filtrados = listaNombresPokemon
        .filter((nombre) => nombre.includes(texto.toLowerCase()))
        .slice(0, 8);

    if (filtrados.length === 0) {
        sugerenciasLista.classList.remove('visible');
        return;
    }

    filtrados.forEach((nombre) => {
        const li = document.createElement('li');
        li.classList.add('sugerencia-item');
        const inicio = nombre.indexOf(texto.toLowerCase());
        const antes = nombre.slice(0, inicio);
        const coincidencia = nombre.slice(inicio, inicio + texto.length);
        const despues = nombre.slice(inicio + texto.length);
        li.innerHTML = `${antes}<strong>${coincidencia}</strong>${despues}`;
        li.addEventListener('click', () => {
            pokemonInput.value = nombre;
            sugerenciasLista.classList.remove('visible');
            btnBuscar.click();
        });
        sugerenciasLista.appendChild(li);
    });

    sugerenciasLista.classList.add('visible');
};

pokemonInput.addEventListener('input', () => {
    mostrarSugerencias(pokemonInput.value.trim());
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.buscador-input-wrap')) {
        sugerenciasLista.classList.remove('visible');
    }
});

cargarNombresPokemon();

// Listar todos
btnListar.addEventListener('click', async () => {
    ultimaBusqueda = { tipo: 'listar' };
    mostrarEstado('cargando');

    const lista = await listarPokemon();
    if (lista.length > 0) {
        renderizarTarjetas(lista);
    } else if (!estadoError.classList.contains('activo')) {
        mostrarEstado('vacio');
    }
});

// Reintentar última búsqueda
btnReintentar.addEventListener('click', () => {
    if (ultimaBusqueda) {
        if (ultimaBusqueda.tipo === 'buscar') {
            pokemonInput.value = ultimaBusqueda.valor;
            btnBuscar.click();
        } else if (ultimaBusqueda.tipo === 'listar') {
            btnListar.click();
        }
    }
});

// Cerrar modal de detalle
detalleCerrar.addEventListener('click', () => {
    detalleOverlay.classList.remove('activo');
});

detalleOverlay.addEventListener('click', (event) => {
    if (event.target === detalleOverlay) {
        detalleOverlay.classList.remove('activo');
    }
});
