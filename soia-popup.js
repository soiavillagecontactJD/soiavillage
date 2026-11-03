/* POP-UP « TARIF EARLY MAMA » — SOÏA VILLAGE
   Chargé par : <script src="/soia-popup.js" defer></script> avant </body>
*/
(function () {
  function demarrer() {
    var style = document.createElement('style');
    style.textContent = "\n  .soia-pop {\n    --soia-beige: #F5EEDC;\n    --soia-bordeaux: #6D213B;\n    --soia-rose: #FFB7BA;\n    --soia-orange: #FC440E;\n    --soia-jaune: #FFD93D;\n    --soia-bleu: #8FA4D1;\n    position: fixed; inset: 0; z-index: 9999;\n    display: flex; align-items: center; justify-content: center;\n    padding: 16px;\n  }\n  .soia-pop[hidden] { display: none; }\n  /* Reprend la police du site : les boutons ne l'héritent pas d'eux-mêmes */\n  .soia-pop, .soia-pop button, .soia-pop a {\n    font-family: inherit;\n  }\n  .soia-pop__overlay {\n    position: absolute; inset: 0;\n    background: rgba(109, 33, 59, 0.45);\n    animation: soiaFade .3s ease;\n  }\n  .soia-pop__card {\n    position: relative;\n    width: 100%; max-width: 440px;\n    max-height: calc(100vh - 32px); overflow-y: auto;\n    background: var(--soia-beige);\n    color: var(--soia-bordeaux);\n    border-radius: 20px;\n    padding: 32px 28px 24px;\n    text-align: center;\n    box-shadow: 0 20px 50px rgba(109, 33, 59, 0.25);\n    font-family: inherit;\n    animation: soiaRise .35s ease;\n  }\n  .soia-pop__close {\n    position: absolute; top: 10px; right: 12px;\n    width: 40px; height: 40px;\n    border: none; background: transparent;\n    color: var(--soia-bordeaux); font-size: 28px; line-height: 1;\n    cursor: pointer; border-radius: 50%;\n  }\n  .soia-pop__close:hover { background: rgba(109, 33, 59, 0.08); }\n  .soia-pop__badge {\n    display: inline-block;\n    background: var(--soia-jaune); color: var(--soia-bordeaux);\n    font-size: 13px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;\n    padding: 6px 14px; border-radius: 999px;\n    margin-bottom: 14px;\n  }\n  .soia-pop__title {\n    font-size: 24px; line-height: 1.25; margin: 0 0 12px;\n    color: var(--soia-bordeaux);\n  }\n  .soia-pop__text { font-size: 15px; line-height: 1.55; margin: 0 0 20px; }\n  .soia-pop__price {\n    background: var(--soia-bleu); color: #fff;\n    border-radius: 14px; padding: 16px;\n    display: flex; flex-direction: column; gap: 2px;\n    margin-bottom: 16px;\n  }\n  .soia-pop__amount { font-size: 38px; font-weight: 700; color: #fff; line-height: 1.1; }\n  .soia-pop__price-label { font-size: 15px; font-weight: 600; }\n  .soia-pop__installments {\n    display: inline-block; align-self: center;\n    font-size: 13px; font-weight: 600;\n    background: rgba(255, 255, 255, 0.22); color: #fff;\n    padding: 4px 12px; border-radius: 999px; margin-top: 6px;\n  }\n  .soia-pop__regular { font-size: 13px; font-weight: 600; margin-top: 8px; }\n  .soia-pop__deal { font-size: 14px; line-height: 1.55; margin: 0 0 14px; }\n  .soia-pop__places {\n    font-size: 14px; font-weight: 700; color: var(--soia-bordeaux);\n    margin: 0 0 18px;\n  }\n  .soia-pop__cta {\n    display: block;\n    background: var(--soia-bordeaux); color: var(--soia-beige);\n    font-size: 17px; font-weight: 700; text-decoration: none;\n    padding: 15px 20px; border-radius: 999px;\n    transition: transform .15s ease, background .15s ease;\n  }\n  .soia-pop__cta:hover { background: #521829; transform: translateY(-1px); }\n  .soia-pop__later {\n    margin-top: 10px; border: none; background: none;\n    color: var(--soia-bordeaux); opacity: .7;\n    font-size: 14px; text-decoration: underline; cursor: pointer;\n    padding: 8px;\n  }\n  @media (max-width: 600px) {\n    .soia-pop { align-items: flex-end; padding: 0; }\n    .soia-pop__card {\n      max-width: none; border-radius: 20px 20px 0 0;\n      max-height: 88vh; padding: 28px 20px 20px;\n      animation: soiaSlide .35s ease;\n    }\n    .soia-pop__title { font-size: 21px; }\n    .soia-pop__amount { font-size: 34px; }\n  }\n  .soia-prix-early__note {\n    display: block; font-size: .55em; font-weight: 600;\n    letter-spacing: .02em; margin-top: 4px;\n  }\n  .soia-pop__form[hidden], .soia-pop__offre[hidden] { display: none; }\n  .soia-pop__form-slot { text-align: left; }\n  .soia-pop__form-slot form { margin: 0; }\n  .soia-pop__form-slot input, .soia-pop__form-slot select, .soia-pop__form-slot textarea {\n    max-width: 100%; box-sizing: border-box;\n  }\n  @keyframes soiaFade { from { opacity: 0; } to { opacity: 1; } }\n  @keyframes soiaRise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }\n  @keyframes soiaSlide { from { transform: translateY(100%); } to { transform: none; } }\n  @media (prefers-reduced-motion: reduce) {\n    .soia-pop__overlay, .soia-pop__card { animation: none; }\n  }\n";
    document.head.appendChild(style);
    var conteneur = document.createElement('div');
    conteneur.innerHTML = "<div id=\"soia-popup\" class=\"soia-pop\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"soia-pop-title\" hidden>\n  <div class=\"soia-pop__overlay\" data-soia-close></div>\n  <div class=\"soia-pop__card\">\n    <button class=\"soia-pop__close\" type=\"button\" aria-label=\"Fermer\" data-soia-close>&times;</button>\n\n    <div class=\"soia-pop__offre\">\n    <span class=\"soia-pop__badge\">Tarif Early Mama</span>\n\n    <h2 id=\"soia-pop-title\" class=\"soia-pop__title\">Le premier village Soïa ouvre en décembre</h2>\n\n    <p class=\"soia-pop__text\">\n      Pour les bébés prévus en mai ou juin 2027.<br>\n      Six mois d'accompagnement avec deux doulas jusqu'à ta naissance, dans un petit groupe de femmes qui vivent la même chose que toi.\n    </p>\n\n    <div class=\"soia-pop__price\">\n      <span class=\"soia-pop__amount\">250 €</span>\n      <span class=\"soia-pop__price-label\">pour ce premier groupe</span>\n      <span class=\"soia-pop__installments\">Paiement possible en 6 fois (environ 42 € par mois)</span>\n      <span class=\"soia-pop__regular\">Tarif habituel à partir du prochain groupe : 490 €</span>\n    </div>\n\n    <p class=\"soia-pop__deal\">\n      Tu reçois exactement le même accompagnement que les groupes suivants.\n      En échange, tu nous donnes ton avis en cours de route et à la fin, pour nous aider à faire grandir le village.\n    </p>\n\n    <p class=\"soia-pop__places\">10 places &middot; Inscriptions jusqu'au 27 novembre</p>\n\n    <a class=\"soia-pop__cta\" href=\"https://soiavillage.com/\" data-soia-cta>C'est pour moi</a>\n    <button class=\"soia-pop__later\" type=\"button\" data-soia-close>Non merci</button>\n    </div>\n\n    <div class=\"soia-pop__form\" hidden>\n      <span class=\"soia-pop__badge\">Tarif Early Mama</span>\n      <h2 class=\"soia-pop__title\">Je m'inscris</h2>\n      <p class=\"soia-pop__text\">250 € pour le premier groupe, paiement possible en 6 fois. Nous te recontactons pour la suite.</p>\n      <div class=\"soia-pop__form-slot\"></div>\n    </div>\n  </div>\n</div>";
    document.body.appendChild(conteneur.firstElementChild);

  (function () {
    var STORAGE_KEY = 'soia-early-mama-vu';
    var DATE_FIN = new Date('2026-11-28T00:00:00+01:00'); // plus affiché à partir du 28 novembre
    var DELAI_MS = 5000;

    // Après le 27 novembre : plus rien ne change, la page garde 490 €
    if (new Date() >= DATE_FIN) return;

    // Jusqu'au 27 novembre : remplace « 490 € » sur la page par le tarif Early Mama
    (function afficherTarifEarly() {
      var pop = document.getElementById('soia-popup');
      var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      var cibles = [], n;
      while ((n = walker.nextNode())) {
        if (pop && pop.contains(n)) continue;
        var parent = n.parentElement;
        if (!parent || /^(SCRIPT|STYLE|TEXTAREA|OPTION)$/.test(parent.tagName)) continue;
        if (/490\s*(€|euros?)/i.test(n.nodeValue)) cibles.push(n);
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

    try { if (localStorage.getItem(STORAGE_KEY)) return; } catch (e) {}

    var popup = document.getElementById('soia-popup');
    if (!popup) return;

    function retenir() {
      try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
    }
    function fermer() {
      popup.hidden = true;
      if (typeof remettreFormulaire === 'function') remettreFormulaire();
      document.removeEventListener('keydown', surTouche);
      retenir();
    }
    function surTouche(e) { if (e.key === 'Escape') fermer(); }

    popup.querySelectorAll('[data-soia-close]').forEach(function (el) {
      el.addEventListener('click', fermer);
    });
    // Trouve le formulaire Bump sur la page (sinon le premier formulaire)
    function trouverFormulaire() {
      var forms = Array.prototype.slice.call(document.querySelectorAll('form'))
        .filter(function (f) { return !popup.contains(f); });
      if (!forms.length) return null;
      var bump = forms.filter(function (f) {
        var bloc = f.closest('section, article, div') || f;
        var t = (bloc.textContent || '').toLowerCase();
        return t.indexOf('bump') !== -1 && t.indexOf('bloom') === -1;
      });
      return bump[0] || forms[0];
    }

    // « C'est pour moi » : le formulaire Bump du site s'ouvre directement dans le pop-up
    var offre = popup.querySelector('.soia-pop__offre');
    var zoneForm = popup.querySelector('.soia-pop__form');
    var slot = popup.querySelector('.soia-pop__form-slot');
    var formDeplace = null, placeOrigine = null;

    function remettreFormulaire() {
      if (formDeplace && placeOrigine) {
        placeOrigine.parentNode.insertBefore(formDeplace, placeOrigine);
        placeOrigine.parentNode.removeChild(placeOrigine);
      }
      formDeplace = null; placeOrigine = null;
      offre.hidden = false; zoneForm.hidden = true;
    }

    popup.querySelector('[data-soia-cta]').addEventListener('click', function (e) {
      retenir();
      var form = trouverFormulaire();
      if (!form) return; // pas de formulaire sur cette page : le lien mène au site
      e.preventDefault();
      placeOrigine = document.createComment('soia-form');
      form.parentNode.insertBefore(placeOrigine, form);
      slot.appendChild(form);
      formDeplace = form;
      offre.hidden = true; zoneForm.hidden = false;
      popup.querySelector('.soia-pop__card').scrollTop = 0;
      var champ = form.querySelector('input:not([type=hidden]), textarea, select');
      if (champ) setTimeout(function () { champ.focus({ preventScroll: true }); }, 50);
    });

    setTimeout(function () {
      popup.hidden = false;
      document.addEventListener('keydown', surTouche);
      var cta = popup.querySelector('[data-soia-cta]');
      if (cta) cta.focus({ preventScroll: true });
    }, DELAI_MS);
  })();

  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer);
  else demarrer();
})();
