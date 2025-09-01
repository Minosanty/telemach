// 40 equipos con nombre, logo local y puntaje inicial
const equipos = [
  { id: 1, nombre: 'EPES N° 10 ',  puntos: 0 },
  { id: 2, nombre: 'EPES Nº 27 ',  puntos: 0 },
  { id: 3, nombre: 'EPES Nº 30',  puntos: 0 },
  { id: 4, nombre: 'EPES Nº 31',  puntos: 0 },
  { id: 5, nombre: 'EPES Nº 33',  puntos: 0 },
  { id: 6, nombre: 'EPES Nº 35', puntos: 0 },
  { id: 7, nombre: 'EPES Nº 41 ', puntos: 0 },
  { id: 8, nombre: 'EPES Nº 42 ',  puntos: 0 },
  { id: 9, nombre: 'EPES Nº 46 ',  puntos: 0 },
  { id: 10, nombre: 'EPES Nº 51 ',  puntos: 0 },
  { id: 11, nombre: 'EPES Nº 52', puntos: 0 },
  { id: 12, nombre: 'EPES Nº 54', puntos: 0  },
  { id: 13, nombre: 'EPES Nº 56',  puntos: 0  },
  { id: 14, nombre: 'EPES Nº 57',  puntos: 0  },
  { id: 15, nombre: 'EPES Nº 59',puntos: 0  },
  { id: 16, nombre: 'EPES Nº 60 ',  puntos: 0  },
  { id: 17, nombre: 'EPES Nº 61 ',  puntos: 0  },
  { id: 18, nombre: 'EPES Nº 67 ',  puntos: 0  },
  { id: 19, nombre: 'EPES Nº 68 ',  puntos: 0  },
  { id: 20, nombre: 'EPES Nº 72 ',  puntos: 0  },
  { id: 21, nombre: 'EPES Nº 73',  puntos: 0  },
  { id: 22, nombre: 'EPES Nº 77',  puntos: 0  },
  { id: 23, nombre: 'EPES Nº 80',  puntos: 0  },
  { id: 24, nombre: 'EPES Nº 84',  puntos: 0  },
  { id: 25, nombre: 'EPES Nº 87',  puntos: 0  },
  { id: 26, nombre: 'EPES Nº 91', puntos: 0 },
  { id: 27, nombre: 'EPES Nº 93',  puntos: 0 },
  { id: 28, nombre: 'EPES Nº 95',  puntos: 0 },
  { id: 29, nombre: 'EPES Nº 96',  puntos: 0 },
  { id: 30, nombre: 'EPES Nº 99',  puntos: 0 },
  { id: 31, nombre: 'ISFDCYT',  puntos: 0 },
  { id: 32, nombre: 'ESCUELA NORMAL ', puntos: 0 },
  { id: 33, nombre: 'E.P.E.S. Nº 1', puntos: 0 },
  { id: 34, nombre: 'EPET N°1 ', puntos: 0 },
  { id: 35, nombre: 'EPET N°2 ',  puntos: 0 },
  { id: 36, nombre: 'EPET N°5 ',  puntos: 0 },
  { id: 37, nombre: 'EPET N°7 ',  puntos: 0 },
  { id: 38, nombre: 'EPETP N°10 ',  puntos: 0 },
  { id: 39, nombre: 'LA RIBERA',  puntos: 0 },
  { id: 40, nombre: 'DON BOSCO', puntos: 0 },
  { id: 41, nombre: 'SANTA ISABEL', puntos: 0 },
  { id: 42, nombre: 'SAN FRANCISCO DE ASIS', puntos: 0 },
  { id: 43, nombre: ' DRING', puntos: 0 },  
  { id: 44, nombre: 'SAN MARTIN', puntos: 0 },
  { id: 45, nombre: 'SAN JOSE OBRERO', puntos: 0 },
  { id: 46, nombre: 'ADVENTISTA', puntos: 0 },
  { id: 47, nombre: ' DOMINGO SAVIO', puntos: 0 },
  { id: 48, nombre: 'MARADONA', puntos: 0 },
  { id: 49, nombre: 'ALAS', puntos: 0 }
]

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