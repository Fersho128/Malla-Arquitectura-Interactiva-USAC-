// script.js

const cursos = [
  {
    nombre: "Teoría de la Comunicación",
    id: "tc",
    desbloquea: ["tmd1"],
    creditos: 3,
    prerequisitos: []
  },
  {
    nombre: "Teoría y Métodos del Diseño 1",
    id: "tmd1",
    desbloquea: ["haa1", "da2"],
    creditos: 3,
    prerequisitos: ["tc", "mt", "fd"]
  },
  // Agrega el resto de los cursos aquí siguiendo el mismo patrón...
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
