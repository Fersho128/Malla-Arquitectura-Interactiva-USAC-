// script.js

const cursos = [
  // Primer Año - Primer Semestre
  { nombre: "Teoría de la Comunicación", id: "tc", desbloquea: ["tmd1"], creditos: 3, prerequisitos: [] },
  { nombre: "Métodos y Técnicas de Investigación", id: "mt", desbloquea: ["sydh", "tmd1", "da1"], creditos: 3, prerequisitos: [] },
  { nombre: "Fundamentos del Diseño", id: "fd", desbloquea: ["tmd1", "da1"], creditos: 5, prerequisitos: [] },
  { nombre: "Medios de Expresión", id: "me", desbloquea: ["da1", "dn"], creditos: 4, prerequisitos: [] },
  { nombre: "Dibujo Geométrico", id: "dg", desbloquea: ["da1", "dt", "dp"], creditos: 4, prerequisitos: [] },
  { nombre: "Geometria", id: "g", desbloquea: ["da1", "dt", "dp"], creditos: 4, prerequisitos: [] },
  { nombre: "Matemática 1", id: "m1", desbloquea: ["m2"], creditos: 4, prerequisitos: [] },

  // Primer Año - Segundo Semestre
  { nombre: "Sociología y Desarrollo Humano", id: "sydh", desbloquea: ["eh"], creditos: 3, prerequisitos: ["mt"] },
  { nombre: "Teoría y Métodos del Diseño 1", id: "tmd1", desbloquea: ["haa1", "da2"], creditos: 3, prerequisitos: ["tc", "mt", "fd"] },
  { nombre: "Diseño Arquitectónico 1", id: "da1", desbloquea: ["da2"], creditos: 6, prerequisitos: ["mt", "fd", "me", "dg", "g"] },
  { nombre: "Dibujo Natural", id: "dn", desbloquea: ["da2", "p1"], creditos: 4, prerequisitos: ["me"] },
  { nombre: "Dibujo Técnico", id: "dt", desbloquea: ["da2", "p1", "hd1", "topo"], creditos: 5, prerequisitos: ["dg"] },
  { nombre: "Dibujo Proyectual", id: "dp", desbloquea: ["da2", "p1", "hd1", "topo"], creditos: 4, prerequisitos: ["dg", "g"] },
  { nombre: "Matemática 2", id: "m2", desbloquea: ["topo", "f1"], creditos: 4, prerequisitos: ["m1"] },

  // Segundo Año - Tercer Semestre
  { nombre: "Historia de la Arquitectura y el Arte 1", id: "haa1", desbloquea: ["haa2", "da3"], creditos: 4, prerequisitos: ["tmd1"] },
  { nombre: "Ecología Humana", id: "eh", desbloquea: ["eat"], creditos: 3, prerequisitos: ["sydh"] },
  { nombre: "Diseño Arquitectónico 2", id: "da2", desbloquea: ["da3"], creditos: 6, prerequisitos: ["tmd1", "da1", "dn", "dt", "dp"] },
  { nombre: "Presentación 1", id: "p1", desbloquea: ["da3", "ma1"], creditos: 5, prerequisitos: ["dn", "dt", "dp"] },
  { nombre: "Herramientas Digitales 1", id: "hd1", desbloquea: ["da3", "hd2"], creditos: 5, prerequisitos: ["dt", "dp"] },
  { nombre: "Topografía", id: "topo", desbloquea: ["da3", "ma1"], creditos: 4, prerequisitos: ["dt", "dp", "m2"] },
  { nombre: "Física 1", id: "f1", desbloquea: ["ic", "mc"], creditos: 4, prerequisitos: ["m2"] },

  // Segundo Año - Cuarto Semestre
  { nombre: "Historia de la Arquitectura y el Arte 2", id: "haa2", desbloquea: ["haa3", "ta1", "da4"], creditos: 4, prerequisitos: ["haa1"] },
  { nombre: "Elementos del Análisis Territorial", id: "eat", desbloquea: ["haa3", "eau", "mda1", "da4"], creditos: 3, prerequisitos: ["eh"] },
  { nombre: "Diseño Arquitectónico 3", id: "da3", desbloquea: ["da4"], creditos: 7, prerequisitos: ["haa1", "da2", "p1", "hd1", "topo"] },
  { nombre: "Modelos Arquitectónicos 1", id: "ma1", desbloquea: ["da4", "ma2", "dc", "hd3"], creditos: 5, prerequisitos: ["p1", "topo"] },
  { nombre: "Herramientas Digitales 2", id: "hd2", desbloquea: ["da4", "hd3"], creditos: 5, prerequisitos: ["hd1"] },
  { nombre: "Introducción a la Construcción", id: "ic", desbloquea: ["da4", "c1"], creditos: 4, prerequisitos: ["f1"] },
  { nombre: "Materiales de Construcción", id: "mc", desbloquea: ["da4", "c1"], creditos: 4, prerequisitos: ["f1"] },

  // Continúa con los semestres 5 a 10 siguiendo el mismo patrón...
];

const malla = document.getElementById("malla");

cursos.forEach(curso => {
  const div = document.createElement("div");
  div.classList.add("course", "locked");
  div.id = curso.id;
  div.innerHTML = `
    <h2>${curso.nombre}</h2>
    <p><strong>Créditos:</strong> ${curso.creditos}</p>
    <p><strong>Requisitos:</strong> ${curso.prerequisitos.length > 0 ? curso.prerequisitos.join(", ") : "Ninguno"}</p>
    <button onclick="aprobarCurso('${curso.id}')">Aprobar</button>
  `;
  malla.appendChild(div);
});

function aprobarCurso(id) {
  const curso = cursos.find(c => c.id === id);
  document.getElementById(id).dataset.approved = true;
  document.getElementById(id).classList.remove("locked");
  document.getElementById(id).classList.add("unlocked");

  cursos.forEach(c => {
    if (c.prerequisitos.includes(id)) {
      const prereqsCompletos = c.prerequisitos.every(pr =>
        document.getElementById(pr)?.dataset.approved === "true"
      );
      if (prereqsCompletos) {
        document.getElementById(c.id).classList.remove("locked");
        document.getElementById(c.id).classList.add("unlocked");
      }
    }
  });
}

window.onload = () => {
  cursos.forEach(c => {
    if (c.prerequisitos.length === 0) {
      const div = document.getElementById(c.id);
      div.classList.remove("locked");
      div.classList.add("unlocked");
    }
  });
};
