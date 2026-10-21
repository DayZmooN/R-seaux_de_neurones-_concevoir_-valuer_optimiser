/* ===== À MODIFIER : tes quiz =====
   q : question | o : choix | a : index de la bonne réponse (0 = premier) | e : explication */
const QUIZ = [
 {id:"reg",title:"Régression",from:"TP1",qs:[
  {q:"Quelle fonction de perte utilise-t-on pour prédire une valeur continue ?",o:["Entropie croisée binaire","Erreur quadratique moyenne (MSE)","Accuracy","Softmax"],a:1,e:"La MSE mesure l'écart moyen au carré entre prédiction et valeur réelle. L'accuracy et l'entropie croisée servent à la classification."},
  {q:"Quelle activation met-on sur la couche de sortie pour une régression ?",o:["Sigmoïde","Softmax","Aucune (linéaire)","ReLU"],a:2,e:"La sortie doit pouvoir prendre n'importe quelle valeur réelle, donc pas d'activation qui la borne."},
  {q:"Pourquoi met-on les variables à l'échelle avant l'entraînement ?",o:["Pour qu'aucune variable ne domine à cause de son ordre de grandeur","Pour supprimer les valeurs manquantes","Pour augmenter le nombre de lignes","Pour éviter d'avoir un jeu de test"],a:0,e:"Des échelles très différentes rendent l'apprentissage instable et plus lent."}]},
 {id:"clf",title:"Classification",from:"TP2 et TP3",qs:[
  {q:"Pour une classification binaire, quelle sortie et quelle perte choisir ?",o:["1 neurone softmax et MSE","2 neurones ReLU et MSE","1 neurone sigmoïde et binary_crossentropy","1 neurone linéaire et accuracy"],a:2,e:"La sigmoïde donne une probabilité entre 0 et 1, et l'entropie croisée binaire la compare à la classe réelle."},
  {q:"Pour 10 classes avec des étiquettes entières (0 à 9), que choisir ?",o:["10 neurones softmax et sparse_categorical_crossentropy","10 neurones sigmoïde et MSE","1 neurone softmax et binary_crossentropy","10 neurones linéaires et MSE"],a:0,e:"Softmax donne une probabilité par classe, et la version « sparse » accepte des étiquettes entières."},
  {q:"Que montre une matrice de confusion ?",o:["L'évolution de la perte par epoch","Les classes que le modèle confond entre elles","Le nombre de paramètres","La vitesse d'entraînement"],a:1,e:"Chaque case croise la vraie classe et la classe prédite, ce qui révèle les erreurs par classe."}]},
 {id:"cnn",title:"Réseaux convolutifs",from:"TP4",qs:[
  {q:"Que fait une couche de convolution ?",o:["Elle mélange tous les pixels en un seul vecteur","Elle applique des filtres pour détecter des motifs locaux","Elle supprime des neurones au hasard","Elle normalise les étiquettes"],a:1,e:"Un filtre glisse sur l'image et repère un motif (bord, texture…), avec les mêmes poids partout."},
  {q:"À quoi sert le MaxPooling ?",o:["Réduire la taille de l'image en gardant la valeur max de chaque zone","Augmenter le nombre de filtres","Calculer la perte","Convertir l'image en niveaux de gris"],a:0,e:"Il réduit les dimensions, donc le calcul, et rend le réseau moins sensible à de petits décalages."},
  {q:"Pourquoi un CNN convient-il mieux aux images qu'un réseau tout dense ?",o:["Il n'a pas besoin de données","Il exploite la structure spatiale avec bien moins de paramètres","Il ne se trompe jamais","Il n'utilise pas de fonction d'activation"],a:1,e:"Les poids partagés des filtres réduisent fortement le nombre de paramètres et gardent l'information de voisinage."}]},
 {id:"reg2",title:"Régularisation et réglages",from:"TP5 et TP6",qs:[
  {q:"Que fait Dropout pendant l'entraînement ?",o:["Il supprime les lignes mal classées","Il désactive au hasard une part des neurones à chaque étape","Il double le taux d'apprentissage","Il fige les poids de la première couche"],a:1,e:"Le réseau ne peut plus compter sur quelques neurones, ce qui réduit le surapprentissage. Dropout est inactif à l'inférence."},
  {q:"Que fait EarlyStopping avec restore_best_weights=True ?",o:["Il arrête quand la validation ne s'améliore plus et reprend les meilleurs poids","Il arrête dès la première epoch","Il choisit le meilleur taux d'apprentissage","Il augmente le nombre d'epochs"],a:0,e:"Il évite de continuer à surapprendre et rend le modèle de la meilleure epoch."},
  {q:"À quoi sert Keras Tuner ?",o:["À compresser un modèle déjà entraîné","À explorer automatiquement des combinaisons d'hyperparamètres","À convertir un notebook en HTML","À créer des étiquettes"],a:1,e:"Il teste plusieurs essais (taille de couche, taux d'apprentissage…) et garde les meilleurs réglages."}]},
 {id:"nlp",title:"Texte et NLP",from:"TP7",qs:[
  {q:"Qu'est-ce que la tokenisation ?",o:["Chiffrer un texte","Découper un texte en unités (mots, ponctuation)","Traduire un texte","Compter les lignes d'un fichier"],a:1,e:"C'est la première étape : on obtient des unités que l'on peut ensuite filtrer, ramener à leur base ou compter."},
  {q:"Que fait la lemmatisation ?",o:["Elle supprime la ponctuation","Elle ramène un mot à sa forme de base (« mangeaient » → « manger »)","Elle compte les occurrences","Elle détecte la langue"],a:1,e:"Les différentes formes d'un même mot sont regroupées, ce qui réduit le vocabulaire."},
  {q:"Que pondère TF-IDF ?",o:["Les mots fréquents dans un document mais rares dans l'ensemble du corpus","Les mots les plus longs","Uniquement les mots vides","Les phrases selon leur position"],a:0,e:"Un mot très répandu partout apporte peu d'information. TF-IDF met en avant les mots caractéristiques d'un texte."}]},
 {id:"eval",title:"Évaluer et comparer",from:"Défi Moons",qs:[
  {q:"Pourquoi ajuster le StandardScaler sur l'apprentissage seulement ?",o:["Pour aller plus vite","Pour éviter une fuite d'information du test vers l'entraînement","Parce que le test n'a pas de variables","Pour équilibrer les classes"],a:1,e:"Si le scaler voit le test, la moyenne et l'écart-type contiennent de l'information qui n'aurait pas dû être connue."},
  {q:"Que garantit l'argument stratify dans train_test_split ?",o:["Que le test est plus grand","Que les proportions de classes sont conservées dans chaque partie","Que les données sont triées","Que le modèle converge"],a:1,e:"Utile sur de petits jeux de données pour que train et test aient la même répartition de classes."},
  {q:"Le F1 macro, c'est…",o:["Le F1 de la classe majoritaire","La moyenne des F1 de chaque classe, sans les pondérer","Le F1 du test moins celui du train","L'accuracy multipliée par 100"],a:1,e:"Chaque classe compte autant, même si elle est rare."},
  {q:"L'écart entre le réseau et la référence est plus petit que la marge de bruit 1,96 × √(p(1−p)/n). Que conclure ?",o:["Le réseau est clairement meilleur","On ne peut pas affirmer que l'écart est réel : il est compatible avec du hasard","La référence est clairement meilleure","Il faut supprimer le jeu de test"],a:1,e:"Avec un test de taille n, l'accuracy varie de cette marge sans que le modèle change. En dessous, la différence n'est pas démontrée."}]}
];

const root = $("#quiz-root");
const bestGet = () => { try { return JSON.parse(localStorage.getItem("quizBest") || "{}"); } catch(e){ return {}; } };
const bestSet = (id, n) => { const b = bestGet(); if ((b[id] ?? -1) < n) { b[id] = n; try { localStorage.setItem("quizBest", JSON.stringify(b)); } catch(e){} } };

function quizHome(){
  const b = bestGet();
  root.innerHTML = `<div class="qcards">${QUIZ.map(s => `
    <button type="button" class="qcard" data-id="${s.id}">
      <span class="kind">${esc(s.from)}</span>
      <h3>${esc(s.title)}</h3>
      <span class="qmeta">${s.qs.length} questions${b[s.id] != null ? ` · meilleur score ${b[s.id]}/${s.qs.length}` : ""}</span>
    </button>`).join("")}</div>`;
}

function play(set){
  let i = 0, score = 0;
  const step = () => {
    const q = set.qs[i];
    root.innerHTML = `
      <div class="qtop"><button type="button" class="ghost" id="qback">Tous les quiz</button><span>${esc(set.title)} · ${i + 1}/${set.qs.length}</span></div>
      <div class="bartrack"><div style="width:${(i / set.qs.length) * 100}%"></div></div>
      <h2 class="qq">${esc(q.q)}</h2>
      <div class="opts">${q.o.map((t, k) => `<button type="button" class="opt" data-k="${k}">${esc(t)}</button>`).join("")}</div>
      <div id="fb"></div>`;
    $("#qback").onclick = quizHome;
    root.querySelectorAll(".opt").forEach(btn => btn.onclick = () => {
      const k = +btn.dataset.k, ok = k === q.a;
      if (ok) score++;
      root.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (+x.dataset.k === q.a) x.classList.add("ok"); });
      if (!ok) btn.classList.add("ko");
      const last = i === set.qs.length - 1;
      $("#fb").innerHTML = `<p class="expl ${ok ? "good" : "bad"}"><strong>${ok ? "Bonne réponse." : "Pas tout à fait."}</strong> ${esc(q.e)}</p>
        <button type="button" class="next" id="nx">${last ? "Voir mon score" : "Question suivante"}</button>`;
      $("#nx").focus();
      $("#nx").onclick = () => { i++; last ? end() : step(); };
    });
  };
  const end = () => {
    bestSet(set.id, score);
    const n = set.qs.length;
    root.innerHTML = `<div class="result"><h2>${score}/${n}</h2>
      <p>${score === n ? "Sans faute." : score >= n / 2 ? "Bien joué, il reste quelques points à revoir." : "Relis le TP correspondant puis réessaie."}</p>
      <div class="links"><a href="#quiz" id="again">Rejouer</a><a href="#quiz" id="all">Tous les quiz</a></div></div>`;
    $("#again").onclick = e => { e.preventDefault(); play(set); };
    $("#all").onclick = e => { e.preventDefault(); quizHome(); };
  };
  step();
}

root.addEventListener("click", e => {
  const c = e.target.closest(".qcard"); if (c) play(QUIZ.find(s => s.id === c.dataset.id));
});

function route(){
  const v = location.hash === "#quiz" ? "quiz" : "cours";
  $("#view-cours").hidden = v !== "cours";
  $("#view-quiz").hidden = v !== "quiz";
  $("#themes").hidden = v !== "cours";
  document.querySelectorAll(".sections a").forEach(a => a.setAttribute("aria-current", a.dataset.view === v ? "page" : "false"));
  if (v === "quiz") quizHome();
  window.scrollTo(0, 0);
}
addEventListener("hashchange", route);
route();
