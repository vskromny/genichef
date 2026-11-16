/* Recipe-from-link tool (recipe-from-link.html, rezept-von-link.html).
   Privacy rules (dec 714, legal L2/L8, CTO 1g/5): the URL travels only in the POST body, the result is
   rendered with textContent only and lives in memory (no storage, no history, no URL hash), and the page
   never reads ?url= or any other prefill. No retries, so a third-party site gets at most one request per click. */
(function () {
  var API = 'https://genichef-openaiproxy.vercel.app/api/webtool';
  var TIMEOUT_MS = 20000;
  var MAX_ITEMS = 60, MAX_FIELD = 500, MAX_TITLE = 200;
  var LOCALE = window.__WT.LOCALE, M = window.__WT.M;

  function $(id) { return document.getElementById(id); }
  var form = $('wt-form'), input = $('wt-url'), btn = $('wt-go'), msg = $('wt-msg'), card = $('wt-result');

  function clean(v, max) {
    if (v === null || v === undefined) return '';
    if (typeof v === 'object') v = v.text || v.name || '';
    var s = String(v).replace(/[\u0000-\u001F\u007F]+/g, ' ').replace(/\s+/g, ' ').trim();
    return s.length > max ? s.slice(0, max - 1) + '…' : s;
  }

  function list(v) {
    if (!Array.isArray(v)) return [];
    var out = [];
    for (var i = 0; i < v.length && out.length < MAX_ITEMS; i++) {
      var s = clean(v[i], MAX_FIELD);
      if (s) out.push(s);
    }
    return out;
  }

  // "PT1H30M" -> "1 h 30 min"; anything else is shown as published.
  function duration(v) {
    var s = clean(v, 40);
    var m = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:\d+(?:\.\d+)?S)?)?$/i.exec(s);
    if (!m || s === 'P' || s === 'PT') return s;
    var h = (parseInt(m[1] || '0', 10) * 24) + parseInt(m[2] || '0', 10);
    var min = parseInt(m[3] || '0', 10);
    if (!h && !min) return '';
    return (h ? h + ' ' + M.h : '') + (h && min ? ' ' : '') + (min ? min + ' ' + M.min : '');
  }

  // Only an https sourceUrl built by our server becomes a link.
  function safeHref(v) {
    try {
      var u = new URL(String(v));
      return u.protocol === 'https:' ? u.href : null;
    } catch (e) { return null; }
  }

  function sourceLine(el, name, href) {
    el.textContent = '';
    el.appendChild(document.createTextNode(M.source));
    if (href) {
      var a = document.createElement('a');
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer nofollow';
      a.textContent = name + M.open;
      el.appendChild(a);
    } else {
      el.appendChild(document.createTextNode(name));
    }
  }

  function fill(listEl, items) {
    listEl.textContent = '';
    items.forEach(function (t) {
      var li = document.createElement('li');
      li.textContent = t;
      listEl.appendChild(li);
    });
  }

  function render(data) {
    var r = data && typeof data.recipe === 'object' && data.recipe ? data.recipe : data;
    var title = clean(r.title || r.name, MAX_TITLE);
    var ing = list(r.ingredients);
    var steps = list(r.steps || r.instructions);
    if (!title && !ing.length && !steps.length) return false;

    var href = safeHref(r.sourceUrl || data.sourceUrl);
    var host = '';
    if (href) { try { host = new URL(href).hostname.replace(/^www\./, ''); } catch (e) {} }
    var name = clean(r.siteName || data.siteName, 80) || host || '?';
    sourceLine($('wt-src-top'), name, href);
    sourceLine($('wt-src-bottom'), name, href);

    var author = clean(r.author, 120);
    $('wt-by').textContent = author ? M.by + author : '';
    $('wt-by').hidden = !author;

    $('wt-title').textContent = title || name;

    var t = r.times && typeof r.times === 'object' ? r.times : {};
    var facts = [
      [M.prep, duration(t.prep || r.prepTime)],
      [M.cook, duration(t.cook || r.cookTime)],
      [M.total, duration(t.total || r.totalTime)],
      [M.yield, clean(Array.isArray(r.yield) ? r.yield[0] : (r.yield || r.recipeYield), 60)]
    ].filter(function (f) { return f[1]; }).map(function (f) { return f[0] + ': ' + f[1]; });
    fill($('wt-facts'), facts);
    $('wt-facts').hidden = !facts.length;

    fill($('wt-ing'), ing);
    $('wt-ing').hidden = $('wt-h-ing').hidden = !ing.length;
    fill($('wt-steps'), steps);
    $('wt-steps').hidden = $('wt-h-steps').hidden = !steps.length;

    card.hidden = false;
    return true;
  }

  function show(text, warn) {
    msg.textContent = text;
    msg.className = warn ? 'msg warn' : 'msg';
  }

  function normalise(raw) {
    var s = raw.trim();
    if (!s) return '';
    if (/^http:\/\//i.test(s)) s = 'https://' + s.slice(7);
    else if (!/^[a-z][a-z0-9+.-]*:/i.test(s)) s = 'https://' + s;
    try {
      var u = new URL(s);
      if (u.protocol !== 'https:' || u.hostname.indexOf('.') < 0 || s.length > 2048) return null;
      return u.href;
    } catch (e) { return null; }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (btn.disabled) return;
    card.hidden = true;
    var url = normalise(input.value);
    if (url === '') { show(M.empty, false); return; }
    if (url === null) { show(M.invalid, false); return; }

    btn.disabled = true;
    btn.textContent = M.busy;
    show(M.loading, false);
    var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, TIMEOUT_MS);
    var status = 0;

    fetch(API, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({url: url, locale: LOCALE}),
      credentials: 'omit',
      cache: 'no-store',
      referrerPolicy: 'no-referrer',
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (res) {
      status = res.status;
      return res.json().catch(function () { return {}; });
    }).then(function (data) {
      var s = data && data.status;
      if (status === 429 || s === 'limited') return show(M.limited, true);
      if (status === 503) return show(M.unavailable, true);
      if (s === 'blocked') return show(M.blocked, true);
      if (s === 'unsupported') return show(M.unsupported, true);
      if (status >= 200 && status < 300 && s === 'ok') {
        if (render(data)) { show('', false); card.scrollIntoView({behavior: 'smooth', block: 'start'}); return; }
        return show(M.unsupported, true);
      }
      show(M.unavailable, true);
    }).catch(function () {
      show(M.unavailable, true);
    }).then(function () {
      clearTimeout(timer);
      btn.disabled = false;
      btn.textContent = M.go;
    });
  });
})();
