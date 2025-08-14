// 40 equipos con nombre, logo local y puntaje inicial
const equipos = [
  { id: 1, nombre: 'EPET 1', logo: 'img/epet1.avif', puntos: 250 },
  { id: 2, nombre: 'EPET 2', logo: 'img/epet2.avif', puntos: 320 },
  { id: 3, nombre: 'EPES 10', logo: 'img/epes10.jpg', puntos: 180 },
  { id: 4, nombre: 'EPES 51', logo: 'img/epes51.jpg', puntos: 207 },
  { id: 5, nombre: 'EPES 52', logo: 'img/epes52.jpg', puntos: 290 },
  { id: 6, nombre: 'EPES 54', logo: 'img/epes54.jpg', puntos: 210 },
  { id: 7, nombre: 'EPES 33', logo: 'img/epes33.jpg', puntos: 230 },
  { id: 8, nombre: 'EPETP 10', logo: 'img/epetp10.jpeg', puntos: 2200 },
  { id: 9, nombre: 'Toros', logo: 'img/toros.png', puntos: 24 },
  { id: 10, nombre: 'Pumas', logo: 'img/pumas.png', puntos: 20 },
  { id: 11, nombre: 'Rinocerontes', logo: 'img/rinocerontes.png', puntos: 19 },
  { id: 12, nombre: 'Cóndores', logo: 'img/condores.png', puntos: 15 },
  { id: 13, nombre: 'Buitres', logo: 'img/buitres.png', puntos: 12 },
  { id: 14, nombre: 'Zorros', logo: 'img/zorros.png', puntos: 13 },
  { id: 15, nombre: 'Osos', logo: 'img/osos.png', puntos: 11 },
  { id: 16, nombre: 'Gacelas', logo: 'img/gacelas.png', puntos: 10 },
  { id: 17, nombre: 'Venados', logo: 'img/venados.png', puntos: 9 },
  { id: 18, nombre: 'Ciervos', logo: 'img/ciervos.png', puntos: 8 },
  { id: 19, nombre: 'Jaguares', logo: 'img/jaguares.png', puntos: 7 },
  { id: 20, nombre: 'Mapaches', logo: 'img/mapaches.png', puntos: 6 },
  { id: 21, nombre: 'Linces', logo: 'img/linces.png', puntos: 5 },
  { id: 22, nombre: 'Cocodrilos', logo: 'img/cocodrilos.png', puntos: 4 },
  { id: 23, nombre: 'Pájaros', logo: 'img/pajaros.png', puntos: 3 },
  { id: 24, nombre: 'Elefantes', logo: 'img/elefantes.png', puntos: 2 },
  { id: 25, nombre: 'Ballenas', logo: 'img/ballenas.png', puntos: 1 },
  { id: 26, nombre: 'Delfines', logo: 'img/delfines.png', puntos: 0 },
  { id: 27, nombre: 'Canguros', logo: 'img/canguros.png', puntos: 0 },
  { id: 28, nombre: 'Suricatas', logo: 'img/suricatas.png', puntos: 0 },
  { id: 29, nombre: 'Hormigas', logo: 'img/hormigas.png', puntos: 0 },
  { id: 30, nombre: 'Caracoles', logo: 'img/caracoles.png', puntos: 0 },
  { id: 31, nombre: 'Perros', logo: 'img/perros.png', puntos: 0 },
  { id: 32, nombre: 'Gatos', logo: 'img/gatos.png', puntos: 0 },
  { id: 33, nombre: 'Caballos', logo: 'img/caballos.png', puntos: 0 },
  { id: 34, nombre: 'Gallos', logo: 'img/gallos.png', puntos: 0 },
  { id: 35, nombre: 'Monos', logo: 'img/monos.png', puntos: 0 },
  { id: 36, nombre: 'Patos', logo: 'img/patos.png', puntos: 0 },
  { id: 37, nombre: 'Gansos', logo: 'img/gansos.png', puntos: 0 },
  { id: 38, nombre: 'Búhos', logo: 'img/buhos.png', puntos: 0 },
  { id: 39, nombre: 'Serpientes', logo: 'img/serpientes.png', puntos: 0 },
  { id: 40, nombre: 'Tiburones', logo: 'img/tiburones.png', puntos: 0 }
];

let equiposActuales = equipos.map(eq => ({ ...eq }));

function renderTablas() {
  equiposActuales.sort((a, b) => b.puntos - a.puntos || a.nombre.localeCompare(b.nombre));
  // Divide equipos en 3 grupos lo más parejos posible
  const grupos = [];
  let start = 0;
  for (let i = 0; i < 3; i++) {
    let count = Math.floor(equipos.length / 3) + (i < equipos.length % 3 ? 1 : 0);
    grupos.push(equiposActuales.slice(start, start + count));
    start += count;
  }

  grupos.forEach((grupo, grupoIdx) => {
    const bodyId = `scoreboard-body-${grupoIdx + 1}`;
    const scoreboardBody = document.getElementById(bodyId);
    if (!scoreboardBody) return;
    scoreboardBody.innerHTML = '';

    grupo.forEach((equipo, idx) => {
      const tr = document.createElement('tr');
      tr.setAttribute('data-id', equipo.id);

      // Posición global
      const posGlobal = equiposActuales.indexOf(equipo) + 1;

      // Posición global
      const posTd = document.createElement('td');
      posTd.textContent = posGlobal + '°';
      tr.appendChild(posTd);

      // Nombre
      const nombreTd = document.createElement('td');
      nombreTd.className = 'nombre-cell';
      nombreTd.textContent = equipo.nombre;
      tr.appendChild(nombreTd);

      // Logo
      const logoTd = document.createElement('td');
      logoTd.className = 'logo-cell';
      const img = document.createElement('img');
      img.src = equipo.logo;
      img.alt = equipo.nombre;
      logoTd.appendChild(img);
      tr.appendChild(logoTd);

      // Puntos (input editable y grande)
      const puntosTd = document.createElement('td');
      puntosTd.className = 'puntos-cell';
      const puntosInput = document.createElement('input');
      puntosInput.type = 'number';
      puntosInput.min = '0';
      puntosInput.value = equipo.puntos;
      puntosInput.className = 'puntos-input';
      puntosInput.title = 'Editar puntaje';
      puntosInput.addEventListener('blur', () => actualizarPuntosInput(equipo.id, puntosInput.value));
      puntosInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') puntosInput.blur();
      });
      puntosTd.appendChild(puntosInput);
      tr.appendChild(puntosTd);

      scoreboardBody.appendChild(tr);
    });
  });
}

function actualizarPuntosInput(id, nuevoValor) {
  const equipo = equiposActuales.find(eq => eq.id === id);
  if (!equipo) return;
  let puntos = parseInt(nuevoValor, 10);
  if (isNaN(puntos) || puntos < 0) puntos = 0;
  equipo.puntos = puntos;
  renderTablas();
}

document.addEventListener('DOMContentLoaded', renderTablas);