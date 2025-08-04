const questions = [
  "Wird der Ort seit mehr als 2 Wochen dauerhaft bewohnt?",
  "Gibt es feste bauliche Strukturen?",
  "Ist Privatsphäre erkennbar?",
  "Gibt es Anzeichen einer Wohnung?",
  "Liegt Gefahr im Verzug?",
  "Wurde Frist gesetzt & Unterbringung angeboten?",
  "Gibt es einen Räumungstitel?"
];

const app = document.getElementById("app");
const answers = new Array(questions.length);

function render() {
  app.innerHTML = "";
  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `
      <label>${q}</label><br/>
      <button onclick="choose(${i}, true)">Ja</button>
      <button onclick="choose(${i}, false)">Nein</button>
    `;
    app.appendChild(div);
  });
  const btn = document.createElement("button");
  btn.textContent = "Ergebnis anzeigen";
  btn.onclick = showResult;
  app.appendChild(btn);
  const res = document.createElement("div");
  res.id = "result";
  res.className = "result";
  app.appendChild(res);
}

function choose(index, yes) {
  answers[index] = yes;
  render();
}

function showResult() {
  const jaCount = answers.slice(0,4).filter(x => x).length;
  let text;
  if (answers[4]) text = "⚠️ Gefahr im Verzug – Sofortmaßnahme zulässig";
  else if (answers[6]) text = "✅ Räumung durch Gerichtsvollzieher möglich";
  else if (jaCount >= 3) text = "✅ Wohnungsschutz – gerichtliche Anordnung nötig";
  else if (!answers[5]) text = "❌ Räumung unzulässig – Sozialangebot fehlt";
  else text = "ℹ️ Weitere Prüfung erforderlich";
  document.getElementById("result").textContent = text;
}

render();
