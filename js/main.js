/**
 * Portafolio de Sergio García: idioma, vista por rol y demo en vivo del clasificador de Supplier Radar.
 * Sin dependencias. Todo lo que se pinta usa textContent (nunca innerHTML).
 */
(function () {
  'use strict';

  var html = document.documentElement;
  var body = document.body;
  var params = new URLSearchParams(location.search);

  var ROLES = ['automatizacion', 'datos', 'ia', 'contenido', 'todos'];
  var ROLE_NAMES = {
    es: { automatizacion: 'Automatización de procesos', datos: 'Compras y datos', ia: 'Operaciones con IA', contenido: 'Contenido con IA', todos: 'todo' },
    en: { automatizacion: 'Process automation', datos: 'Procurement & data', ia: 'AI operations', contenido: 'AI content & video', todos: 'everything' }
  };
  var TITLES = {
    es: 'Sergio García · Automatización de procesos e IA aplicada',
    en: 'Sergio García · Process automation and applied AI'
  };

  var state = { lang: 'es', rol: 'todos', scenario: 0, edited: false };

  function readStore(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function writeStore(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* modo privado: no pasa nada */ } }
  function $(sel) { return document.querySelector(sel); }
  function $all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  function t(es, en) { return state.lang === 'en' ? en : es; }

  /* ---------------- Enlace a la vista actual ---------------- */
  function viewUrl() {
    var url = new URL(location.href);
    url.hash = '';
    url.search = '';
    if (state.rol !== 'todos') url.searchParams.set('rol', state.rol);
    if (state.lang === 'en') url.searchParams.set('lang', 'en');
    return url.toString();
  }
  function syncUrl() {
    try { history.replaceState(null, '', viewUrl()); } catch (e) { /* file:// en algunos navegadores */ }
  }

  /* ---------------- Idioma ---------------- */
  /* Textos alternativos y etiquetas para lectores de pantalla: el español está en el atributo, el inglés en data-en-* */
  var I18N_ATTRS = ['alt', 'aria-label', 'text'];
  function translateAttributes() {
    I18N_ATTRS.forEach(function (attr) {
      $all('[data-en-' + attr + ']').forEach(function (el) {
        var esKey = 'data-es-' + attr;
        if (!el.hasAttribute(esKey)) el.setAttribute(esKey, attr === 'text' ? el.textContent : el.getAttribute(attr));
        var value = el.getAttribute(state.lang === 'en' ? 'data-en-' + attr : esKey);
        if (attr === 'text') el.textContent = value;
        else el.setAttribute(attr, value);
      });
    });
  }

  function setLang(lang, fromUser) {
    state.lang = lang === 'en' ? 'en' : 'es';
    html.lang = state.lang;
    html.className = state.lang;
    document.title = TITLES[state.lang];
    translateAttributes();
    $all('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === state.lang));
    });
    if (fromUser) { writeStore('lang', state.lang); syncUrl(); }
    if (!state.edited) loadScenario(state.scenario);
    else render();
  }

  /* ---------------- Vista por rol ---------------- */
  function setRol(rol, fromUser) {
    state.rol = ROLES.indexOf(rol) >= 0 ? rol : 'todos';
    body.setAttribute('data-rol', state.rol);
    $all('.chip').forEach(function (c) {
      c.setAttribute('aria-pressed', String(c.getAttribute('data-rol') === state.rol));
    });
    $('#copiar-estado').textContent = '';
    if (fromUser) {
      syncUrl();
      $('#copiar-estado').textContent = state.rol === 'todos'
        ? t('Mostrando todo.', 'Showing everything.')
        : t('La página ahora empieza por lo más útil para ', 'The page now leads with what matters for ') + ROLE_NAMES[state.lang][state.rol] + '.';
    }
  }

  function copyLink() {
    var url = viewUrl();
    var status = $('#copiar-estado');
    var done = function () { status.textContent = t('Enlace copiado: ', 'Link copied: ') + url; };
    var fail = function () { status.textContent = t('Copia este enlace: ', 'Copy this link: ') + url; };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, fail);
    } else {
      fail();
    }
  }

  /* ---------------- Demo: datos 100 % ficticios (los mismos de Supplier Radar) ---------------- */
  var SUPPLIERS = [
    { id: 'S01', name: 'Papelería Andina SAS', domain: 'papeleriaandina.example', emails: ['compras@papeleriaandina.example'], contractId: 'CT-2026-014' },
    { id: 'S02', name: 'Logística del Caribe Ltda', domain: 'logcaribe.example', emails: ['ops@logcaribe.example'], contractId: 'CT-2026-021' },
    { id: 'S03', name: 'TecnoSoluciones Integrales', domain: 'tecnosol.example', emails: ['soporte@tecnosol.example'], contractId: 'CT-2025-088' },
    { id: 'S04', name: 'Café Origen Export', domain: 'cafeorigen.example', emails: ['contratos@cafeorigen.example'], contractId: 'CT-2026-031' },
    { id: 'S05', name: 'Impresiones Ruiz', domain: '', emails: ['impresionesruiz.demo@gmail.com'], contractId: 'CT-2026-040' },
    { id: 'S06', name: 'Nova Seguridad Privada', domain: 'novagrupo.example', emails: ['seguridad@novagrupo.example'], contractId: 'CT-2026-044' },
    { id: 'S07', name: 'Nova Limpieza Industrial', domain: 'novagrupo.example', emails: ['limpieza@novagrupo.example'], contractId: 'CT-2026-045' },
    { id: 'S08', name: 'Mobiliario Bogotá', domain: 'mobibog.example', emails: ['ventas@mobibog.example'], contractId: 'CT-2026-050' },
    { id: 'S09', name: 'Transportes Sabana', domain: 'transabana.example', emails: ['despachos@transabana.example'], contractId: 'CT-2026-052' }
  ];

  var SCENARIOS = [
    { from: 'Compras Papelería Andina <compras@papeleriaandina.example>', verified: true,
      es: ['RE: Documentos contrato CT-2026-014', 'Buenos días, adjuntamos RUT y cámara de comercio actualizados.'],
      en: ['RE: Documents for contract CT-2026-014', 'Good morning, attached are our updated tax ID and chamber of commerce certificate.'] },
    { from: 'Laura Méndez <laura.mendez@cafeorigen.example>', verified: true,
      es: ['Documentos solicitados', 'Te comparto lo que pidieron desde compras.'],
      en: ['Requested documents', 'Sharing what the procurement team asked for.'] },
    { from: 'Facturación <facturacion@novagrupo.example>', verified: true,
      es: ['Adjuntamos cámara de comercio', 'Cordial saludo, enviamos el documento del grupo.'],
      en: ['Chamber of commerce certificate attached', 'Kind regards, we are sending the group document.'] },
    { from: 'juan.perez.demo@hotmail.com', verified: true,
      es: ['Consulta contrato CT-2026-050', '¿Me confirman la fecha de la próxima entrega?'],
      en: ['Question about contract CT-2026-050', 'Could you confirm the date of the next delivery?'] },
    { from: 'Compras Papelería Andina <compras@papeleriaandina.example>', verified: false,
      es: ['URGENTE: cambio de cuenta bancaria CT-2026-014', 'Por favor actualicen nuestra cuenta para el próximo pago.'],
      en: ['URGENT: bank account change CT-2026-014', 'Please update our account details before the next payment.'] }
  ];

  var VERDICTS = {
    confirmed: ['✔ CONFIRMADO AUTOMÁTICAMENTE', '✔ CONFIRMED AUTOMATICALLY'],
    review: ['➜ A REVISIÓN HUMANA', '➜ SENT TO HUMAN REVIEW'],
    unmatched: ['· SIN COINCIDENCIA: SE IGNORA', '· NO MATCH: IGNORED']
  };

  var fields = {};

  function supplierName(id) {
    for (var i = 0; i < SUPPLIERS.length; i++) if (SUPPLIERS[i].id === id) return SUPPLIERS[i].name;
    return id;
  }
  function capitalize(text) { return text ? text.charAt(0).toUpperCase() + text.slice(1) : text; }

  function loadScenario(index) {
    var s = SCENARIOS[index];
    if (!s) return;
    state.scenario = index;
    state.edited = false;
    fields.from.value = s.from;
    fields.subject.value = s[state.lang][0];
    fields.body.value = s[state.lang][1];
    fields.verified.checked = s.verified;
    $all('.scn').forEach(function (b) {
      b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-scn')) === index));
    });
    render();
  }

  function render() {
    if (!window.Classifier || !window.Messages) return;
    var email = {
      from: fields.from.value,
      subject: fields.subject.value,
      body: fields.body.value,
      senderVerified: fields.verified.checked
    };
    var r = window.Classifier.classifyEmail(email, SUPPLIERS);
    var verdict = $('#r-verdict');
    verdict.setAttribute('data-d', r.decision);
    verdict.textContent = t(VERDICTS[r.decision][0], VERDICTS[r.decision][1]);

    $all('#r-meter li').forEach(function (li) {
      li.classList.toggle('on', li.getAttribute('data-tier') === r.tier);
    });

    var who;
    if (r.supplierId) {
      who = supplierName(r.supplierId);
    } else if (r.reason && r.reason.code === 'tie') {
      var names = r.candidates.filter(function (c) { return c.tier === r.tier; })
        .map(function (c) { return supplierName(c.supplierId); });
      who = t('Empate entre ', 'Tie between ') + names.join(t(' y ', ' and ')) + t(': decide una persona', ': a person decides');
    } else {
      who = t('Ninguno', 'None');
    }
    $('#r-supplier').textContent = who;
    $('#r-why').textContent = capitalize(window.Messages.explain(r, state.lang)) + '.';
    $('#r-alert').hidden = !(r.reason && r.reason.code === 'unverified-sender');
  }

  function renderSupplierList() {
    var list = $('#r-list');
    SUPPLIERS.forEach(function (s) {
      var li = document.createElement('li');
      li.textContent = s.name + ' · ' + s.emails[0] + ' · ' + s.contractId;
      list.appendChild(li);
    });
  }

  /* ---------------- Arranque ---------------- */
  function init() {
    fields = {
      from: $('#m-from'), subject: $('#m-subject'), body: $('#m-body'), verified: $('#m-verified')
    };

    $all('.lang button').forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-lang'), true); });
    });
    $all('.chip').forEach(function (c) {
      c.addEventListener('click', function () { setRol(c.getAttribute('data-rol'), true); });
    });
    $('#copiar-enlace').addEventListener('click', copyLink);
    $all('.scn').forEach(function (b) {
      b.addEventListener('click', function () { loadScenario(Number(b.getAttribute('data-scn'))); });
    });
    ['from', 'subject', 'body'].forEach(function (k) {
      fields[k].addEventListener('input', function () {
        state.edited = true;
        $all('.scn').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        render();
      });
    });
    fields.verified.addEventListener('change', function () { state.edited = true; render(); });
    $('#mail').addEventListener('submit', function (e) { e.preventDefault(); });

    renderSupplierList();

    var lang = params.get('lang') || readStore('lang') ||
      ((navigator.language || 'es').toLowerCase().indexOf('es') === 0 ? 'es' : 'en');
    setRol(params.get('rol') || 'todos', false);
    setLang(lang, false);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
