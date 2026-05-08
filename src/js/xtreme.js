const SPLASH_BASE = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash';
const LOADING_BASE = 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading';

const miembros = [
  {
    id: 'kurume',
    nick: 'Xt Kurume',
    rol: 'ADC',
    champ: 'Jinx',
    splash: `${SPLASH_BASE}/Jinx_0.jpg`,
    loading: `${LOADING_BASE}/Jinx_0.jpg`,
    descripcion: 'Cada vez que se conecta, el grupo activa el modo plegaria. Si no es por feedeo, es por trolleo. Nunca se sabe cuál de los dos será.',
    frase: '"Confíen en mí, esta sí la cargamos."',
    rasgos: [
      { icono: 'fa-skull-crossbones', label: 'Especialidad', valor: 'Perder partidas decisivas' },
      { icono: 'fa-face-grin-tongue-squint', label: 'Modo predilecto', valor: 'Trollear cuando se aburre' },
      { icono: 'fa-explosion', label: 'Daño al equipo', valor: 'Mayor que el enemigo' },
    ],
  },
  {
    id: 'report',
    nick: 'Xt Report',
    rol: 'Mid (o lo que caiga)',
    champ: 'Yasuo',
    splash: `${SPLASH_BASE}/Yasuo_0.jpg`,
    loading: `${LOADING_BASE}/Yasuo_0.jpg`,
    descripcion: 'Migajero universal: se adapta a cualquier línea que le dejen. Si le dan mid, el equipo no sobrevive. Si no le dan mid, el chat tampoco.',
    frase: '"Si me dejan mid lo carrieo, lo prometo."',
    rasgos: [
      { icono: 'fa-wind', label: 'Estado civil', valor: 'Mandarineado por Xt China' },
      { icono: 'fa-route', label: 'Línea preferida', valor: 'La que nadie quiera' },
      { icono: 'fa-flag', label: 'Reportes recibidos', valor: 'Más que su KDA combinada' },
    ],
  },
  {
    id: 'hastalapolla',
    nick: 'Xt Hastalapolla',
    rol: 'Top / Carry emocional',
    champ: 'Sett',
    splash: `${SPLASH_BASE}/Sett_0.jpg`,
    loading: `${LOADING_BASE}/Sett_0.jpg`,
    descripcion: 'El pro del clan. Aparece en cada team fight como si tuviera teletransporte propio. El único que ve el minimapa.',
    frase: '"Tranquilos, voy yo."',
    rasgos: [
      { icono: 'fa-medal', label: 'Estatus', valor: 'Pro confirmado' },
      { icono: 'fa-people-group', label: 'Asistencia a TF', valor: '100%, siempre primero' },
      { icono: 'fa-hand-fist', label: 'Carga al gremio', valor: 'Más de lo que debería' },
    ],
  },
  {
    id: 'china',
    nick: 'Xt China',
    rol: 'Mid',
    champ: 'Zyra',
    splash: `${SPLASH_BASE}/Zyra_0.jpg`,
    loading: `${LOADING_BASE}/Zyra_0.jpg`,
    descripcion: 'No rota, no farmea jungla, no aparece en TF. Vive en su línea y administra el permiso de juego de su novio Xt Report.',
    frase: '"Report, ya deja de jugar."',
    rasgos: [
      { icono: 'fa-heart', label: 'Cargo extra', valor: 'Ministra de permisos de Report' },
      { icono: 'fa-map-pin', label: 'Movilidad', valor: 'Cero. Vive en mid.' },
      { icono: 'fa-seedling', label: 'Plantitas', valor: 'Más que warding del equipo' },
    ],
  },
  {
    id: 'chema',
    nick: 'Xt Chema',
    rol: 'ADC',
    champ: 'Twitch',
    splash: `${SPLASH_BASE}/Twitch_0.jpg`,
    loading: `${LOADING_BASE}/Twitch_0.jpg`,
    descripcion: 'La rata de ADC. Gana 1, pierde 6. Tiene una racha de derrotas tan estable que se podría usar de calendario.',
    frase: '"Esta vez sí remontamos, lo siento."',
    rasgos: [
      { icono: 'fa-chart-line', label: 'Win rate', valor: '~14% (récord histórico)' },
      { icono: 'fa-mask', label: 'Estilo', valor: 'Invisible hasta cuando le matan' },
      { icono: 'fa-virus', label: 'Daño venenoso', valor: 'Solo a sus propias estadísticas' },
    ],
  },
  {
    id: 'arkanao',
    nick: 'Xt Arkanao',
    rol: 'ADC',
    champ: 'Jhin',
    splash: `${SPLASH_BASE}/Jhin_0.jpg`,
    loading: `${LOADING_BASE}/Jhin_0.jpg`,
    descripcion: 'MIA. Desaparecido en combate. La última vez que se le vio fue tirando una ult de cuatro tiros. Si lo encuentras, repórtalo al gremio.',
    frase: '"Mañana sí me conecto, lo juro."',
    rasgos: [
      { icono: 'fa-ghost', label: 'Estado', valor: 'Desconectado eternamente' },
      { icono: 'fa-hourglass-end', label: 'Última conexión', valor: 'Hace tantas patches que ya no importa' },
      { icono: 'fa-magnifying-glass', label: 'Recompensa', valor: 'Quien lo logge avisa al clan' },
    ],
  },
];

const rankings = [
  {
    id: 'manco',
    titulo: 'Top 3 Más Manco',
    icono: 'fa-skull',
    descripcion: 'Quienes hacen que perder se sienta inevitable. Cada partida con ellos es una clase magistral de cómo NO jugar.',
    color: 'manco',
    puestos: [
      { miembroId: 'kurume', razon: 'Sin contexto. Si pickea ADC, perdimos.', stat: '0.6 KDA promedio' },
      { miembroId: 'chema', razon: 'Gana 1 partida cada 7. Las matemáticas no mienten.', stat: '14% WR' },
      { miembroId: 'report', razon: 'Si le dejan mid, autodestrucción confirmada.', stat: '0/12/2 con Yasuo' },
    ],
  },
  {
    id: 'toxico',
    titulo: 'Top 3 Más Tóxico',
    icono: 'fa-fire',
    descripcion: 'El chat se prende solo. Maestros del flame, capacitados para hacer rage quit a tu jungla en 3 mensajes.',
    color: 'toxico',
    puestos: [
      { miembroId: 'report', razon: 'Yasuo + flame en el chat = combo legendario.', stat: '99 mensajes/min' },
      { miembroId: 'china', razon: 'No flamea al equipo. Flamea a Report. Eso cuenta el doble.', stat: 'Permisos denegados x100' },
      { miembroId: 'kurume', razon: 'Cuando pierde culpa al jungla, al support, al patch y al wifi.', stat: '7 excusas/partida' },
    ],
  },
  {
    id: 'afk',
    titulo: 'Top 3 Más AFK',
    icono: 'fa-user-slash',
    descripcion: 'Los maestros del "ya vuelvo". Si los buscas en el lobby, no están. Si los buscas en TF, tampoco.',
    color: 'afk',
    puestos: [
      { miembroId: 'hastalapolla', razon: 'Sí, el pro. Llega a TF pero llega 5 segundos tarde porque estaba haciendo otra cosa.', stat: '"voy" x infinito' },
      { miembroId: 'arkanao', razon: 'Literal desaparecido. Sin login desde hace eras.', stat: '∞ días sin conectar' },
      { miembroId: 'china', razon: 'Está conectada pero AFK en mid. Cuenta.', stat: '0 rotaciones/partida' },
    ],
  },
];

const miembrosPorId = Object.fromEntries(miembros.map((m) => [m.id, m]));

const renderMiembroCard = (miembro) => `
  <article class="miembro-card" data-miembro-id="${miembro.id}">
    <div class="miembro-card-img">
      <img src="${miembro.splash}" alt="Splash de ${miembro.champ}" loading="lazy">
      <span class="miembro-rol-badge">${miembro.rol}</span>
    </div>
    <div class="miembro-card-info">
      <h3>${miembro.nick}</h3>
      <p class="miembro-champ"><i class="fa-solid fa-star"></i> Main: ${miembro.champ}</p>
      <p class="miembro-descripcion">${miembro.descripcion}</p>
      <button type="button" class="btn btn-ver-miembro">Ver ficha completa</button>
    </div>
  </article>
`;

const renderRankingPuesto = (puesto, indice) => {
  const miembro = miembrosPorId[puesto.miembroId];
  if (!miembro) return '';
  const medallas = ['fa-trophy', 'fa-medal', 'fa-award'];
  const lugares = ['1', '2', '3'];
  return `
    <li class="ranking-puesto puesto-${indice + 1}">
      <div class="ranking-medalla"><i class="fa-solid ${medallas[indice]}"></i></div>
      <div class="ranking-puesto-num">#${lugares[indice]}</div>
      <div class="ranking-avatar">
        <img src="${miembro.loading}" alt="${miembro.champ}" loading="lazy">
      </div>
      <div class="ranking-puesto-info">
        <h4>${miembro.nick}</h4>
        <p class="ranking-razon">${puesto.razon}</p>
        <span class="ranking-stat"><i class="fa-solid fa-chart-simple"></i> ${puesto.stat}</span>
      </div>
    </li>
  `;
};

const renderRanking = (ranking) => `
  <article class="ranking-card ranking-${ranking.color}">
    <header class="ranking-header">
      <i class="fa-solid ${ranking.icono}"></i>
      <h3>${ranking.titulo}</h3>
      <p>${ranking.descripcion}</p>
    </header>
    <ol class="ranking-lista">
      ${ranking.puestos.map(renderRankingPuesto).join('')}
    </ol>
  </article>
`;

const renderMiembroDetalle = (miembro) => `
  <div class="detalle-header miembro-detalle-header">
    <img src="${miembro.loading}" alt="${miembro.champ}">
    <div class="detalle-titulo">
      <span class="miembro-rol-badge">${miembro.rol}</span>
      <h2>${miembro.nick}</h2>
      <p class="miembro-champ"><i class="fa-solid fa-star"></i> Main: ${miembro.champ}</p>
    </div>
  </div>
  <div class="detalle-body">
    <p class="detalle-descripcion">${miembro.descripcion}</p>
    <p class="miembro-frase">${miembro.frase}</p>
    <h4>Datos del miembro</h4>
    <div class="detalle-info-grid miembro-rasgos">
      ${miembro.rasgos
        .map(
          (rasgo) => `
        <div class="detalle-info-item">
          <i class="fa-solid ${rasgo.icono}"></i>
          <strong>${rasgo.label}</strong>
          <span>${rasgo.valor}</span>
        </div>
      `,
        )
        .join('')}
    </div>
  </div>
`;

const abrirDetalle = (miembro) => {
  const overlay = document.getElementById('miembro-overlay');
  const contenido = document.getElementById('miembro-contenido');
  if (!overlay || !contenido) return;
  contenido.innerHTML = renderMiembroDetalle(miembro);
  overlay.classList.add('activo');
};

const cerrarDetalle = () => {
  const overlay = document.getElementById('miembro-overlay');
  if (!overlay) return;
  overlay.classList.remove('activo');
};

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('miembros-grid');
  if (grid) {
    grid.innerHTML = miembros.map(renderMiembroCard).join('');
    grid.addEventListener('click', (event) => {
      const card = event.target.closest('.miembro-card');
      if (!card) return;
      const miembro = miembrosPorId[card.dataset.miembroId];
      if (miembro) abrirDetalle(miembro);
    });
  }

  const rankingsZona = document.getElementById('rankings-zona');
  if (rankingsZona) {
    rankingsZona.innerHTML = rankings.map(renderRanking).join('');
  }

  const overlay = document.getElementById('miembro-overlay');
  const cerrar = document.getElementById('miembro-cerrar');
  if (cerrar) cerrar.addEventListener('click', cerrarDetalle);
  if (overlay) {
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) cerrarDetalle();
    });
  }
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') cerrarDetalle();
  });
});
