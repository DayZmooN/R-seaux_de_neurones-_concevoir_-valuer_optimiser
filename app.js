/* ===== À MODIFIER : ta liste de cours =====
   type : "tp" ou "brief" | theme : nom du thème | files : liens (chemins relatifs dans le repo) */
const COURS = [
  {type:"tp",theme:"Deep Learning",title:"TP1 · Régression",desc:"Premier réseau de neurones pour prédire une valeur continue.",tags:["Keras","régression"],files:[{l:"Notebook",u:"cours/tp1_regression.ipynb"}]},
  {type:"tp",theme:"Deep Learning",title:"TP2 · Classification binaire",desc:"Classer deux classes, accuracy et matrice de confusion.",tags:["Keras","classification"],files:[{l:"Notebook",u:"cours/tp2_classification_binaire.ipynb"}]},
  {type:"tp",theme:"Deep Learning",title:"TP3 · Multiclasses",desc:"Classification à plus de deux classes avec softmax.",tags:["Keras","softmax"],files:[{l:"Notebook",u:"cours/tp3_multiclasses.ipynb"}]},
  {type:"tp",theme:"Deep Learning",title:"TP4 · CNN",desc:"Réseaux convolutifs appliqués aux images.",tags:["CNN","images"],files:[{l:"Notebook",u:"cours/tp4_cnn.ipynb"}]},
  {type:"tp",theme:"Deep Learning",title:"TP5 · Régularisation",desc:"Dropout, arrêt précoce et marge de bruit du test.",tags:["dropout","early stopping"],files:[{l:"Notebook",u:"cours/tp5_regularisation.ipynb"}]},
  {type:"tp",theme:"Deep Learning",title:"TP6 · Hyperparamètres et compression",desc:"Recherche d'hyperparamètres avec Keras Tuner et compression du modèle.",tags:["keras-tuner","compression"],files:[{l:"Notebook",u:"cours/tp6_hyperparametres_compression.ipynb"}]},
  {type:"tp",theme:"Deep Learning",title:"TP7 · Texte et NLP",desc:"Classer des textes de films d'horreur et de comédie.",tags:["NLP","spaCy"],files:[{l:"Notebook",u:"cours/tp7_texte_nlp.ipynb"},{l:"Données CSV",u:"cours/textes_films_horreur_comedie.csv"}]},
  {type:"tp",theme:"Deep Learning",title:"TP · Optimiser votre réseau",desc:"Compte rendu de 1 à 2 pages avec tableau de synthèse et interprétation.",tags:["Keras","optimisation"],files:[]},
  {type:"brief",theme:"Deep Learning",title:"Défi d'adaptation · Moons",desc:"Réseau de neurones contre régression logistique, avec marge de bruit.",tags:["défi","make_moons"],files:[{l:"Notebook",u:"cours/defi_moons_karim.ipynb"},{l:"Énoncé PDF",u:"cours/enonce-defi-adaptation.pdf"}]},
  {type:"brief",theme:"Data Engineering",title:"TradeCorp Data Platform · Jalon 3",desc:"Orchestration des pipelines avec Airflow.",tags:["Airflow","orchestration"],files:[]},
  {type:"brief",theme:"Data Engineering",title:"StreamVault · Rapport technique Brief 2",desc:"Coûts, DCT, sécurité et schéma final (Jalon 3).",tags:["architecture","sécurité"],files:[]},
  {type:"brief",theme:"Gestion de projet",title:"StreamVault · Appel d'offres",desc:"Dossier de réponse en 14 parties, projet d'équipe.",tags:["appel d'offres","équipe"],files:[]},
  {type:"brief",theme:"Gestion de projet",title:"Veille · Compétences stratégiques",desc:"Pilotage, stratégie, gouvernance et relation client.",tags:["veille","gouvernance"],files:[]}
];

const $ = s => document.querySelector(s);
const state = {theme:"Tous", type:"all", q:""};
const themes = ["Tous", ...new Set(COURS.map(c => c.theme))];
const esc = s => s.replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function renderThemes(){
  $("#themes").innerHTML = themes.map(t => {
    const n = t === "Tous" ? COURS.length : COURS.filter(c => c.theme === t).length;
    return `<button type="button" data-theme="${esc(t)}" aria-pressed="${t === state.theme}">${esc(t)}<span class="n">${n}</span></button>`;
  }).join("");
}

function links(files){
  if(!files.length) return `<span class="soon">Bientôt disponible</span>`;
  return files.map(f => f.u.endsWith(".ipynb")
    ? `<a href="${esc(f.u.replace(".ipynb",".html"))}">Lire</a><a href="${esc(f.u)}" download>Télécharger .ipynb</a>`
    : `<a href="${esc(f.u)}">${esc(f.l)}</a>`).join("");
}

function render(){
  const q = norm(state.q);
  const list = COURS.filter(c =>
    (state.theme === "Tous" || c.theme === state.theme) &&
    (state.type === "all" || c.type === state.type) &&
    (!q || norm([c.title, c.desc, c.theme, ...c.tags].join(" ")).includes(q)));
  const groups = [...new Set(list.map(c => c.theme))];
  $("#liste").innerHTML = list.length ? groups.map(g => `
    <section class="group"><h2>${esc(g)}</h2>
    ${list.filter(c => c.theme === g).map(c => `
      <article class="item ${c.type}"><div class="bar"></div><div class="body">
        <span class="kind">${c.type === "tp" ? "TP" : "Brief"}</span>
        <h3>${esc(c.title)}</h3><p>${esc(c.desc)}</p>
        <div class="tags">${c.tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>
        <div class="links">${links(c.files)}</div>
      </div></article>`).join("")}
    </section>`).join("")
    : `<p class="empty">Aucun résultat. Essaie un autre mot-clé ou choisis « Tous » dans les thèmes.</p>`;
}

const nTp = COURS.filter(c => c.type === "tp").length;
$("#stats").textContent = `${nTp} TP et ${COURS.length - nTp} briefs, classés par thème.`;

$("#themes").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  state.theme = b.dataset.theme; renderThemes(); render();
});
$("#types").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  state.type = b.dataset.type;
  document.querySelectorAll("#types button").forEach(x => x.setAttribute("aria-pressed", x === b));
  render();
});
$("#q").addEventListener("input", e => { state.q = e.target.value; render(); });

/* Mode clair / sombre (mémorisé dans le navigateur) */
const root = document.documentElement;
function setMode(m){
  root.dataset.theme = m;
  $("#mode").textContent = m === "dark" ? "Mode clair" : "Mode sombre";
  try { localStorage.setItem("mode", m); } catch(e){}
}
let saved = null; try { saved = localStorage.getItem("mode"); } catch(e){}
setMode(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
$("#mode").addEventListener("click", () => setMode(root.dataset.theme === "dark" ? "light" : "dark"));

renderThemes(); render();
