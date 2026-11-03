/* TOAST « TARIF EARLY MAMA » — SOÏA VILLAGE
   Chargé par : <script src="/soia-popup.js?v=5" defer></script> avant </body>
   - Remplace « 490 € » par le tarif Early Mama sur la page jusqu'au 27 novembre
   - Affiche un petit toast en bas à droite (en bas de l'écran sur téléphone),
     après 15 secondes ou quand la visiteuse a lu 40 % de la page
   - « Plus tard » : revient à la prochaine visite ; × ou « C'est pour moi » : ne revient plus
*/
(function () {
  function demarrer() {
    var DATE_FIN = new Date('2026-11-28T00:00:00+01:00'); // plus rien à partir du 28 novembre
    var CLE_DEFINITIF = 'soia-early-mama-ferme';
    var CLE_VISITE = 'soia-early-mama-plus-tard';
    var DELAI_MS = 15000;
    var SEUIL_LECTURE = 0.4;

    // Après le 27 novembre : plus rien ne change, la page garde 490 €
    if (new Date() >= DATE_FIN) return;

    var style = document.createElement('style');
    style.textContent = [
      '.soia-toast{position:fixed;right:24px;bottom:24px;z-index:9999;width:380px;max-width:calc(100vw - 32px);box-sizing:border-box;',
      'background:#FFFFFF;color:#6D213B;border:1px solid rgba(109,33,59,.18);border-radius:16px;box-shadow:0 12px 32px rgba(109,33,59,.16);',
      'padding:18px 20px 20px;display:flex;flex-direction:column;gap:10px;font-family:inherit;opacity:0;transform:translateY(16px);',
      'transition:opacity .4s ease,transform .4s ease}',
      '.soia-toast[hidden]{display:none}',
      '.soia-toast.is-visible{opacity:1;transform:none}',
      '.soia-toast,.soia-toast button,.soia-toast a{font-family:inherit}',
      '.soia-toast__haut{display:flex;align-items:center;justify-content:space-between}',
      '.soia-toast__badge{background:#FFD93D;color:#6D213B;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;padding:4px 10px;border-radius:999px}',
      '.soia-toast__fermer{width:44px;height:44px;margin:-10px -12px -10px 0;border:0;background:transparent;color:#6D213B;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:50%}',
      '.soia-toast__fermer:hover{background:rgba(109,33,59,.08)}',
      '.soia-toast__titre{margin:0;font-weight:700;font-size:20px;line-height:1.25;color:#6D213B}',
      '.soia-toast__texte{margin:0;font-size:14px;line-height:1.5}',
      '.soia-toast__actions{display:flex;align-items:center;gap:16px;margin-top:6px}',
      '.soia-toast a.soia-toast__bouton,.soia-toast a.soia-toast__bouton:visited{background:var(--soia-bleu-action,#4A64A8)!important;color:#F5EEDC!important;',
      'text-decoration:none!important;font-weight:600;font-size:15px;padding:12px 20px;border-radius:999px;min-height:44px;box-sizing:border-box;display:inline-flex;align-items:center}',
      '.soia-toast a.soia-toast__bouton:hover{background:var(--soia-bleu-survol,#3D5490)!important}',
      '.soia-toast__plus-tard{border:0;background:transparent;color:#6D213B;font-size:15px;text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:12px 4px}',
      '.soia-prix-early__note{display:block;font-size:.55em;font-weight:600;letter-spacing:.02em;margin-top:4px}',
      '@media (max-width:600px){.soia-toast{left:16px;right:16px;bottom:16px;width:auto}}',
      '@media (prefers-reduced-motion:reduce){.soia-toast{transition:none}}'
    ].join('');
    document.head.appendChild(style);

    // Jusqu'au 27 novembre : remplace « 490 € » sur la page par le tarif Early Mama
    (function afficherTarifEarly() {
      var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      var cibles = [], n;
      while ((n = walker.nextNode())) {
        var parent = n.parentElement;
        if (!parent || /^(SCRIPT|STYLE|TEXTAREA|OPTION)$/.test(parent.tagName)) continue;
        if (/490\s*(€|euros?)/i.test(n.nodeValue)) cibles.push(n);
      }
      // Paiement en 6 fois : 6 × 81,67 € devient 6 × 41,67 €
      var w2 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), m2;
      while ((m2 = w2.nextNode())) {
        if (/81[,.]67/.test(m2.nodeValue)) m2.nodeValue = m2.nodeValue.replace(/81([,.])67/g, '41$167');
      }
      cibles.forEach(function (t) {
        var morceaux = t.nodeValue.split(/(490\s*(?:€|euros?))/i);
        var frag = document.createDocumentFragment();
        morceaux.forEach(function (m) {
          if (/^490\s*(€|euros?)$/i.test(m)) {
            var span = document.createElement('span');
            span.className = 'soia-prix-early';
            span.innerHTML = '<strong>250 €</strong>' +
              '<span class="soia-prix-early__note">Tarif Early Mama jusqu\'au 27 novembre, puis 490 €</span>';
            frag.appendChild(span);
          } else if (m) {
            frag.appendChild(document.createTextNode(m));
          }
        });
        t.parentNode.replaceChild(frag, t);
      });
    })();

    function lire(stockage, cle) {
      try { return window[stockage].getItem(cle); } catch (e) { return null; }
    }
    function ecrire(stockage, cle) {
      try { window[stockage].setItem(cle, '1'); } catch (e) {}
    }

    if (lire('localStorage', CLE_DEFINITIF) || lire('sessionStorage', CLE_VISITE)) return;

    var conteneur = document.createElement('div');
    conteneur.innerHTML =
      '<aside id="soia-toast" class="soia-toast" role="status" aria-label="Offre de lancement" hidden>' +
        '<div class="soia-toast__haut">' +
          '<span class="soia-toast__badge">Early Mama</span>' +
          '<button type="button" class="soia-toast__fermer" data-fermer aria-label="Fermer">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>' +
          '</button>' +
        '</div>' +
        '<p class="soia-toast__titre">Premier groupe en décembre</p>' +
        '<p class="soia-toast__texte">Tu attends ton bébé pour mai ou juin 2027 ? Rejoins le premier groupe Soïa : 6 mois avec deux doulas, un live toutes les deux semaines, et des femmes qui accouchent en même temps que toi.</p>' +
        '<p class="soia-toast__texte"><strong>250 €</strong> au lieu de 490 €, en échange de tes retours en cours de route. <strong>10 places, jusqu’au 27 novembre.</strong></p>' +
        '<div class="soia-toast__actions">' +
          '<a href="#inscription-bump" class="soia-toast__bouton" data-offre>C’est pour moi</a>' +
          '<button type="button" class="soia-toast__plus-tard" data-plus-tard>Plus tard</button>' +
        '</div>' +
      '</aside>';
    var toast = conteneur.firstElementChild;
    document.body.appendChild(toast);

    var affiche = false;

    function montrer() {
      if (affiche) return;
      affiche = true;
      window.removeEventListener('scroll', auDefilement);
      toast.hidden = false;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { toast.classList.add('is-visible'); });
      });
    }

    function cacher() {
      toast.classList.remove('is-visible');
      setTimeout(function () { toast.hidden = true; }, 400);
    }

    function auDefilement() {
      var doc = document.documentElement;
      if ((window.scrollY + window.innerHeight) / doc.scrollHeight > SEUIL_LECTURE) montrer();
    }

    window.addEventListener('scroll', auDefilement, { passive: true });
    setTimeout(montrer, DELAI_MS);

    toast.querySelector('[data-fermer]').addEventListener('click', function () {
      ecrire('localStorage', CLE_DEFINITIF);
      cacher();
    });
    toast.querySelector('[data-plus-tard]').addEventListener('click', function () {
      ecrire('sessionStorage', CLE_VISITE);
      cacher();
    });
    // Mène directement au formulaire Bump (section #inscription-bump)
    toast.querySelector('[data-offre]').addEventListener('click', function () {
      ecrire('localStorage', CLE_DEFINITIF);
      cacher();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer);
  else demarrer();
})();
