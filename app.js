/* ===================== הגדרות (הסרטונים נמצאים בקובץ videos.js) ===================== */
const CONFIG = {
  reviewDays: [1, 3, 7],      // חזרה מרווחת: אחרי כמה ימים טעות חוזרת
  masteredAfter: 2,           // כמה תשובות נכונות ברצף כדי שטעות תסומן "הובנה"
};

const LVL = { 1: 'בסיסי', 2: 'בינוני', 3: 'רמה אקדמית' };
const REASONS = ['טעות אלגברית', 'לא זכרתי את הנוסחה', 'טעות חישוב או סימן', 'לא הבנתי את השאלה', 'לא הבנתי את החומר', 'ניחשתי'];
const COLORS = ['#1F5FA8', '#E0A100', '#2A9D8F', '#C8364A', '#7B4FB0', '#3C8D2F', '#D9661F', '#0E7C9C', '#B23A7A', '#6B7A8F', '#9C7A3C', '#4655C9'];
const TOPIC = Object.fromEntries(TOPICS.map((t, i) => [t.id, Object.assign(t, { color: COLORS[i] })]));
const HEB = ['א', 'ב', 'ג', 'ד'];

/* ===================== שמירה מקומית ===================== */
const STORE_KEY = 'psm_v1';
const fresh = () => ({ a: [], m: {}, st: {}, ai: {}, set: { topics: [], lvls: [1, 2, 3], mode: 'new' } });
let storageOK = true;
function readCookie() { const m = document.cookie.match(new RegExp('(?:^|; )' + STORE_KEY + '=([^;]*)')); return m ? decodeURIComponent(m[1]) : null; }
function load() {
  let raw = null;
  try { raw = localStorage.getItem(STORE_KEY); } catch (e) { storageOK = false; }
  if (!raw) raw = readCookie();
  try { if (raw) { const s = JSON.parse(raw), f = fresh(); const o = Object.assign(f, s, { set: Object.assign(f.set, s.set || {}) }); if (!['new', 'solved', 'wrong'].includes(o.set.mode)) o.set.mode = 'new'; return o; } } catch (e) {}
  return fresh();
}
function save() {
  if (S.a.length > 4000) S.a = S.a.slice(-4000);
  const aiKeys = Object.keys(S.ai); if (aiKeys.length > 40) aiKeys.slice(0, aiKeys.length - 40).forEach(k => { delete S.ai[k]; delete S.m['ai:' + k]; });
  const s = JSON.stringify(S);
  try { localStorage.setItem(STORE_KEY, s); storageOK = true; }
  catch (e) {
    storageOK = false;
    if (s.length < 3800) document.cookie = `${STORE_KEY}=${encodeURIComponent(s)}; max-age=31536000; path=/; SameSite=Lax`;
  }
}
let S = load();
const now = () => Math.floor(Date.now() / 60000);   // דקות — חוסך מקום

/* ===================== עזרי תצוגה ===================== */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function tex(t, display) {
  if (!window.katex) return `<code dir="ltr">${esc(t)}</code>`;
  try { return katex.renderToString(t, { displayMode: display, throwOnError: false }); } catch (e) { return `<code dir="ltr">${esc(t)}</code>`; }
}
function textLine(s) { return s.split(/\$([^$]+)\$/).map((p, i) => i % 2 ? `<bdi dir="ltr" class="im">${tex(p, false)}</bdi>` : esc(p)).join(''); }
function lines(arr, cls = '') { return arr.map(l => l.startsWith('$$') ? `<div class="eq ${cls}" dir="ltr">${tex(l.slice(2), true)}</div>` : `<p>${textLine(l)}</p>`).join(''); }
function opt(o) { return o.startsWith('#') ? `<span class="opt-text">${esc(o.slice(1))}</span>` : `<span class="opt-math" dir="ltr">${tex(o, false)}</span>`; }
function plain(t) {
  if (t.startsWith('#')) return t.slice(1);
  let s = t;
  for (let i = 0; i < 4; i++) s = s.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1)/($2)').replace(/\\sqrt\{([^{}]*)\}/g, '√($1)');
  const map = { '\\cdot': '·', '\\pi': 'π', '\\infty': '∞', '\\leq': '≤', '\\le': '≤', '\\geq': '≥', '\\ge': '≥', '\\neq': '≠', '\\pm': '±', '\\equiv': '≡', '\\alpha': 'α', '\\beta': 'β', '\\theta': 'θ', '\\in': '∈', '\\cup': '∪', '\\Rightarrow': '⇒', '\\to': '→', '\\mathbb{R}': 'ℝ', '\\mathbb{N}': 'ℕ', '\\int': '∫', '\\sup': 'sup', '\\inf': 'inf', '\\lim': 'lim', '\\operatorname{cis}': 'cis', '\\vec': '', '\\\\': ' ; ' };
  for (const k of Object.keys(map).sort((a, b) => b.length - a.length)) s = s.split(k).join(map[k]);
  s = s.replace(/\\mathbb\{Z\}_\{(\d+)\}/g, 'Z$1').replace(/\\pmod\{(\d+)\}/g, '(mod $1)').replace(/\\begin\{[a-z]+\}(\{[^}]*\})?|\\end\{[a-z]+\}/g, '')
    .replace(/\\(left|right|middle|qquad|quad|displaystyle|hline)/g, ' ').replace(/\\[;,:! ]/g, ' ').replace(/\\([a-zA-Z]+)/g, '$1')
    .replace(/\^\{([^{}]*)\}/g, '^($1)').replace(/_\{([^{}]*)\}/g, '_$1').replace(/[{}]/g, '').replace(/&/g, ' ').replace(/\s+/g, ' ').trim();
  return s;
}
function plainLines(arr) { return arr.map(l => l.startsWith('$$') ? plain(l.slice(2)) : l.replace(/\$([^$]+)\$/g, (_, m) => plain(m))).join(' '); }
function fmtDate(min) { const d = new Date(min * 60000); return d.toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric', year: '2-digit' }); }

/* ===================== שאלות ===================== */
function getQ(key) {
  if (key.startsWith('ai:')) { const a = S.ai[key.slice(3)]; return a ? Object.assign({ key, topic: a.t, lvl: a.l, sub: a.sub || 'שאלת AI', ai: true }, a) : null; }
  const [id, seed] = key.split(':'); return buildQ(id, +seed);
}
function topicOfKey(key) { if (key.startsWith('ai:')) return S.ai[key.slice(3)]?.t; return GENS_BY_ID[key.split(':')[0]]?.t; }
function selTopics() { return S.set.topics.length ? S.set.topics : TOPICS.map(t => t.id); }
function eligible(g) { return selTopics().includes(g.t) && S.set.lvls.includes(g.l); }

function isDue(m) { const d = CONFIG.reviewDays[Math.min(m.n, CONFIG.reviewDays.length - 1)]; return now() - m.lt >= d * 1440; }
function openMistakes() { return Object.entries(S.m).filter(([, m]) => !m.f); }

let cur = null, answered = false, lastKey = null;

function pickNext() {
  const mode = S.set.mode, topics = selTopics(), lv = S.set.lvls;
  if (mode === 'new') {
    const pool = GENS.filter(eligible); if (!pool.length) return null;
    // נושאים בהסתברות שווה, ואז תבנית בתוך הנושא
    const ts = [...new Set(pool.map(g => g.t))], t = ts[Math.floor(Math.random() * ts.length)], inT = pool.filter(g => g.t === t);
    const g = inT[Math.floor(Math.random() * inT.length)];
    return buildQ(g.id, 1 + Math.floor(Math.random() * 2e9));
  }
  if (mode === 'solved') {
    const keys = [...new Set(S.a.filter(x => !x[0].startsWith('ai:')).map(x => x[0]))].filter(k => { const q = GENS_BY_ID[k.split(':')[0]]; return q && topics.includes(q.t) && lv.includes(q.l); });
    const c = keys.length > 1 ? keys.filter(k => k !== lastKey) : keys; if (!c.length) return null;
    return getQ(c[Math.floor(Math.random() * c.length)]);
  }
  if (mode === 'wrong') {
    const list = openMistakes().filter(([k]) => { const q = getQ(k); return q && topics.includes(q.topic) && lv.includes(q.lvl); });
    if (!list.length) return null;
    list.sort((a, b) => (isDue(b[1]) - isDue(a[1])) || (a[1].lt - b[1].lt));
    const c = list.length > 1 ? list.filter(([k]) => k !== lastKey) : list;
    return getQ(c[0][0]);
  }
  return null;
}

/* ===================== דף תרגול ===================== */
function renderFilters() {
  const sel = S.set.topics;
  $('#topicChips').innerHTML = `<button class="chip ${sel.length ? '' : 'on'}" data-t="*" aria-pressed="${!sel.length}">כל הנושאים</button>` +
    TOPICS.map(t => `<button class="chip ${sel.includes(t.id) ? 'on' : ''}" data-t="${t.id}" aria-pressed="${sel.includes(t.id)}"><i style="background:${t.color}"></i>${esc(t.name)}</button>`).join('');
  $('#lvlChips').innerHTML = [1, 2, 3].map(l => `<button class="chip ${S.set.lvls.includes(l) ? 'on' : ''}" data-l="${l}" aria-pressed="${S.set.lvls.includes(l)}">${LVL[l]}</button>`).join('');
  document.querySelectorAll('#modeSeg button').forEach(b => { const on = b.dataset.m === S.set.mode; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
}
function nextQuestion() {
  answered = false;
  cur = pickNext(); if (cur) lastKey = cur.key; renderQ();
}
function metaRow(q) {
  const t = TOPIC[q.topic];
  return `<div class="qmeta"><span class="tdot" style="background:${t.color}"></span><span>${esc(t.name)}</span><span class="sep">/</span><span>${esc(q.sub)}</span>
    <span class="lvl lvl${q.lvl}">${LVL[q.lvl]}</span>${q.ai ? '<span class="lvl ai">נוצרה ב-AI</span>' : ''}${S.m[q.key] && !S.m[q.key].f ? '<span class="lvl redo">טעיתם בה בעבר</span>' : ''}</div>`;
}
function renderQ() {
  const box = $('#qcard');
  if (!cur) {
    const msg = { solved: ['עוד לא פתרתם שאלות בנושאים וברמות שבחרתם.', 'עברו לשאלות חדשות', 'new'], wrong: ['אין טעויות פתוחות בנושאים וברמות שבחרתם. יפה מאוד!', 'עברו לשאלות חדשות', 'new'], new: ['לא נבחרה אף רמה.', 'בחרו את כל הרמות', 'lv'] }[S.set.mode] || ['אין שאלות להצגה.', 'שאלות חדשות', 'new'];
    box.innerHTML = `<div class="empty"><p>${msg[0]}</p><button class="btn primary" id="emptyGo">${msg[1]}</button></div>`;
    $('#emptyGo').onclick = () => { if (msg[2] === 'lv') S.set.lvls = [1, 2, 3]; else S.set.mode = 'new'; save(); renderFilters(); nextQuestion(); };
    return;
  }
  const q = cur;
  box.innerHTML = `${metaRow(q)}
    ${q.lvl === 3 ? `<div class="academic"><strong>שאלה בסגנון שנה א'.</strong> היא נראית מאיימת יותר ממה שהיא. ${q.calm ? `<button class="linkbtn" id="calmBtn" aria-expanded="false">מה צריך כדי לפתור אותה?</button><span id="calmTxt" hidden> ${esc(q.calm)}</span>` : ''}${q.src ? `<div class="src">מקור הסגנון: ${esc(q.src)}</div>` : ''}</div>` : ''}
    <div class="qbody">${lines(q.q)}</div>
    <div class="opts" role="group" aria-label="תשובות">${q.opts.map((o, i) => `<button class="optbtn" data-i="${i}"><span class="let">${HEB[i]}</span>${opt(o)}</button>`).join('')}</div>
    <div id="after"></div>`;
  box.querySelectorAll('.optbtn').forEach(b => b.onclick = () => answer(+b.dataset.i));
  const cb = $('#calmBtn'); if (cb) cb.onclick = () => { const t = $('#calmTxt'); t.hidden = !t.hidden; cb.setAttribute('aria-expanded', !t.hidden); };
}
function answer(i) {
  if (answered || !cur) return; answered = true;
  const q = cur, ok = i === q.ans, t = now();
  S.a.push([q.key, ok ? 1 : 0, t, q.topic]);
  if (q.ai && !ok) S.ai[q.key.slice(3)] = { t: q.topic, l: q.lvl, sub: q.sub, q: q.q, opts: q.opts, ans: q.ans, ex: q.ex, calm: q.calm || null };
  const m = S.m[q.key];
  if (!ok) { S.m[q.key] = Object.assign(m || { r: '', t, w: 0 }, { c: i, lt: t, n: 0, f: 0, w: (m?.w || 0) + 1 }); }
  else if (m && !m.f) { m.n++; m.lt = t; if (m.n >= CONFIG.masteredAfter) m.f = 1; }
  save(); updateBadge();
  document.querySelectorAll('.optbtn').forEach((b, j) => { b.disabled = true; if (j === q.ans) b.classList.add('correct'); else if (j === i) b.classList.add('wrong'); });
  const mm = S.m[q.key];
  $('#after').innerHTML = `
    <div class="verdict ${ok ? 'ok' : 'bad'}" role="status">${ok ? (m && mm.f ? 'נכון! הטעות הזו סומנה כמובנת.' : 'נכון!') : 'לא נכון. התשובה הנכונה מסומנת בירוק.'}</div>
    ${!ok ? reasonPanel(q.key) : ''}
    <details class="expl" ${ok ? '' : 'open'}><summary>הסבר מלא</summary>${lines(q.ex, 'soft')}</details>
    ${!ok ? resourceRow(q.topic, q.sub) : ''}
    <div class="nextrow"><button class="btn primary" id="nextBtn">לשאלה הבאה</button>${ok ? `<button class="btn ghost" data-more="${q.topic}">עוד שאלות בנושא הזה</button>` : ''}</div>`;
  if (q.calm && q.lvl === 3) { const t2 = $('#calmTxt'); if (t2) t2.hidden = false; }
  bindAfter(q.key);
  $('#nextBtn').focus();
}
function reasonPanel(key) {
  const r = S.m[key]?.r || '';
  return `<div class="reason"><label for="reasonTxt">למה טעיתם? זה יעזור לכם לזהות דפוסים.</label>
    <div class="chips small">${REASONS.map(x => `<button class="chip" data-reason="${esc(x)}">${esc(x)}</button>`).join('')}</div>
    <textarea id="reasonTxt" rows="2" placeholder="אפשר לבחור מהרשימה או לכתוב בחופשיות...">${esc(r)}</textarea>
    <div class="savedline" id="savedLine" aria-live="polite"></div></div>`;
}
function resourceRow(t, sub) {
  const T = TOPIC[t], v = videoFor(t, sub);
  return `<div class="resources"><span class="rlabel">מה עכשיו?</span>
    <button class="btn" data-more="${t}">תרגלו עוד ${esc(T.name)}</button>
    <button class="btn" data-sheet="${t}">קראו על הנושא</button>
    <a class="btn" target="_blank" rel="noopener" href="${esc(v.url)}">${esc(v.label)}</a></div>`;
}
function videoFor(t, sub) {
  const V = (typeof VIDEOS !== 'undefined' && VIDEOS[t]) || {}, list = (V.videos || []).filter(v => v && v.url);
  const match = list.filter(v => v.sub && sub && v.sub === sub), pool = match.length ? match : list;
  if (pool.length) { const v = pool[Math.floor(Math.random() * pool.length)]; return { url: v.url, label: v.title ? 'צפו: ' + v.title : 'צפו בסרטון' }; }
  if (V.playlist) return { url: V.playlist, label: 'לפלייליסט של הנושא' };
  return { url: ytSearch(t), label: 'מצאו סרטון ביוטיוב' };
}
function ytSearch(t) { return 'https://www.youtube.com/results?search_query=' + encodeURIComponent('פשוט מתמטיקה אביב צנזור ' + TOPIC[t].yt); }
function bindAfter(key) {
  $('#nextBtn').onclick = nextQuestion;
  document.querySelectorAll('[data-more]').forEach(b => b.onclick = () => practiceTopic(b.dataset.more));
  document.querySelectorAll('[data-sheet]').forEach(b => b.onclick = () => openSheet(b.dataset.sheet));
  const ta = $('#reasonTxt'); if (!ta) return;
  const store = () => { S.m[key].r = ta.value.trim(); save(); $('#savedLine').textContent = ta.value.trim() ? 'הסיבה נשמרה בדף הטעויות.' : ''; };
  ta.addEventListener('input', store);
  document.querySelectorAll('[data-reason]').forEach(b => b.onclick = () => { const v = b.dataset.reason; if (!ta.value.includes(v)) ta.value = ta.value.trim() ? ta.value.trim() + ', ' + v : v; store(); });
}
function practiceTopic(t) { S.set.topics = [t]; if (S.set.mode === 'solved' || S.set.mode === 'wrong') S.set.mode = 'new'; save(); go('practice'); renderFilters(); nextQuestion(); }

/* ===================== דף נוסחאות ===================== */
function openSheet(t) {
  const T = TOPIC[t], d = $('#sheetDlg'), v = videoFor(t);
  $('#sheetBody').innerHTML = `<h2>${esc(T.name)}</h2><div class="sheet">${lines(SHEETS[t], 'soft')}</div>
    <div class="resources"><a class="btn primary" target="_blank" rel="noopener" href="${T.url}">לקורס "${esc(T.course)}" בקמפוס IL</a>
    <a class="btn" target="_blank" rel="noopener" href="${esc(v.url)}">${esc(v.label)}</a>
    ${typeof MAIN_PLAYLIST !== 'undefined' && MAIN_PLAYLIST ? `<a class="btn" target="_blank" rel="noopener" href="${esc(MAIN_PLAYLIST)}">לפלייליסט הכללי</a>` : ''}</div>`;
  d.showModal();
}

/* ===================== סטטיסטיקה ===================== */
function stats() {
  const o = Object.fromEntries(TOPICS.map(t => [t.id, { n: 0, ok: 0, bad: 0, open: 0 }]));
  for (const [k, ok, , tp] of S.a) { const t = tp || topicOfKey(k); if (!o[t]) continue; o[t].n++; ok ? o[t].ok++ : o[t].bad++; }
  for (const [k, m] of Object.entries(S.m)) { const t = topicOfKey(k); if (o[t] && !m.f) o[t].open++; }
  return o;
}
function recommendations() {
  const st = stats(), out = [];
  TOPICS.filter(t => !S.st[t.id]).forEach(t => out.push({ kind: 'study', t: t.id }));
  const weak = TOPICS.filter(t => S.st[t.id] || st[t.id].n).map(t => ({ t: t.id, n: st[t.id].n, acc: st[t.id].n ? st[t.id].ok / st[t.id].n : null }));
  weak.filter(w => w.n >= 3 && w.acc < 0.85).sort((a, b) => a.acc - b.acc).forEach(w => out.push({ kind: 'weak', ...w }));
  weak.filter(w => w.n < 3 && S.st[w.t]).forEach(w => out.push({ kind: 'untested', ...w }));
  const due = openMistakes().filter(([, m]) => isDue(m));
  if (due.length) out.push({ kind: 'review', count: due.length, topics: [...new Set(due.map(([k]) => topicOfKey(k)))] });
  return out;
}
function updateBadge() { const n = openMistakes().length; const b = $('#mistakeBadge'); b.textContent = n; b.hidden = !n; }

/* ===================== דף טעויות ===================== */
function renderMistakes() {
  const tf = $('#mTopic').value, sf = $('#mStatus').value;
  if ($('#mTopic').options.length === 1) TOPICS.forEach(t => $('#mTopic').insertAdjacentHTML('beforeend', `<option value="${t.id}">${esc(t.name)}</option>`));
  let list = Object.entries(S.m).map(([k, m]) => ({ k, m, q: getQ(k) })).filter(x => x.q);
  if (tf) list = list.filter(x => x.q.topic === tf);
  if (sf === 'open') list = list.filter(x => !x.m.f); else if (sf === 'done') list = list.filter(x => x.m.f);
  list.sort((a, b) => b.m.lt - a.m.lt);
  const box = $('#mList');
  if (!list.length) { box.innerHTML = `<div class="empty"><p>${Object.keys(S.m).length ? 'אין טעויות שמתאימות לסינון.' : 'עוד אין כאן טעויות. כל שאלה שתטעו בה תגיע לכאן, יחד עם הסיבה שכתבתם.'}</p><a class="btn primary" href="#practice">לתרגול</a></div>`; return; }
  box.innerHTML = list.map(({ k, m, q }) => `
    <article class="mcard ${m.f ? 'done' : ''}" data-k="${esc(k)}">
      ${metaRow(q)}
      <div class="mdates">טעות ראשונה ${fmtDate(m.t)} · טעיתם ${m.w} ${m.w === 1 ? 'פעם' : 'פעמים'}${m.f ? ' · <strong>הובנה</strong>' : isDue(m) ? ' · <strong class="due">מחכה לחזרה</strong>' : ''}</div>
      <div class="qbody">${lines(q.q)}</div>
      <div class="ans-compare"><div class="yours"><span>התשובה שלכם</span>${opt(q.opts[m.c])}</div><div class="right"><span>התשובה הנכונה</span>${opt(q.opts[q.ans])}</div></div>
      <details class="expl"><summary>הסבר מלא</summary>${lines(q.ex, 'soft')}</details>
      <label class="rlab">סיבת הטעות<textarea rows="2" data-reason-for="${esc(k)}" placeholder="למה טעיתם?">${esc(m.r || '')}</textarea></label>
      <div class="nextrow"><button class="btn primary" data-retry="${esc(k)}">פתרו שוב</button>
        <button class="btn" data-toggle="${esc(k)}">${m.f ? 'החזירו לטעויות פתוחות' : 'סמנו שהבנתי'}</button>
        <button class="btn" data-sheet="${q.topic}">קראו על הנושא</button>
        <button class="btn ghost danger" data-del="${esc(k)}">מחקו</button></div>
    </article>`).join('');
  box.querySelectorAll('[data-reason-for]').forEach(t => t.oninput = () => { S.m[t.dataset.reasonFor].r = t.value.trim(); save(); });
  box.querySelectorAll('[data-retry]').forEach(b => b.onclick = () => { cur = getQ(b.dataset.retry); lastKey = cur.key; answered = false; go('practice'); renderQ(); });
  box.querySelectorAll('[data-toggle]').forEach(b => b.onclick = () => { const m = S.m[b.dataset.toggle]; m.f = m.f ? 0 : 1; if (!m.f) m.n = 0; save(); updateBadge(); renderMistakes(); });
  box.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { if (confirm('למחוק את הטעות הזו לגמרי?')) { delete S.m[b.dataset.del]; save(); updateBadge(); renderMistakes(); } });
  box.querySelectorAll('[data-sheet]').forEach(b => b.onclick = () => openSheet(b.dataset.sheet));
}

/* ===================== דף התקדמות ===================== */
function renderProgress() {
  const st = stats(), tot = Object.values(st).reduce((a, s) => ({ n: a.n + s.n, ok: a.ok + s.ok }), { n: 0, ok: 0 }), open = openMistakes().length, studied = TOPICS.filter(t => S.st[t.id]).length;
  const rec = recommendations()[0];
  $('#pSummary').innerHTML = `
    <p class="lead">${tot.n ? `ענית על <strong>${tot.n}</strong> שאלות, <strong>${Math.round(100 * tot.ok / tot.n)}%</strong> מהן נכון. ` : 'עוד לא תרגלת. '}סימנת <strong>${studied}</strong> מתוך 12 נושאים כנלמדים${open ? `, ויש לך <strong>${open}</strong> טעויות פתוחות` : ''}.</p>
    ${rec ? `<div class="nowcard"><span class="nowlabel">מה כדאי לעשות עכשיו</span>${recHTML(rec, true)}</div>` : ''}`;
  bindRecs($('#pSummary'));
  $('#syllabus').innerHTML = TOPICS.map(t => {
    const s = st[t.id], acc = s.n ? Math.round(100 * s.ok / s.n) : null, subs = [...new Set(GENS.filter(g => g.t === t.id).map(g => g.sub))];
    return `<li class="srow">
      <label class="studied"><input type="checkbox" data-study="${t.id}" ${S.st[t.id] ? 'checked' : ''}><span>למדתי</span></label>
      <div class="sname"><span class="tdot" style="background:${t.color}"></span><a href="${t.url}" target="_blank" rel="noopener">${esc(t.name)}</a><div class="subs">${subs.map(esc).join(' · ')}</div></div>
      <div class="snums"><span title="שאלות שתורגלו">${s.n} תורגלו</span><span class="okc">${s.ok} נכון</span><span class="badc">${s.bad} שגוי</span></div>
      <div class="sbar" role="img" aria-label="${acc === null ? 'אין נתונים' : acc + '% הצלחה'}"><div class="fill" style="width:${acc || 0}%;background:${acc === null ? 'transparent' : acc >= 80 ? 'var(--ok)' : acc >= 55 ? 'var(--warn)' : 'var(--bad)'}"></div><span>${acc === null ? '—' : acc + '%'}</span></div>
      <button class="btn small" data-more="${t.id}">תרגול</button>
    </li>`;
  }).join('');
  $('#syllabus').querySelectorAll('[data-study]').forEach(c => c.onchange = () => { S.st[c.dataset.study] = c.checked ? 1 : 0; if (!c.checked) delete S.st[c.dataset.study]; save(); renderProgress(); });
  $('#syllabus').querySelectorAll('[data-more]').forEach(b => b.onclick = () => practiceTopic(b.dataset.more));
  drawPie($('#pie1'), TOPICS.map(t => ({ label: t.name, v: st[t.id].n, c: t.color })), 'שאלות שתורגלו לפי נושא');
  drawPie($('#pie2'), TOPICS.map(t => ({ label: t.name, v: st[t.id].bad, c: t.color })), 'טעויות לפי נושא');
}

/* ===================== המלצות ===================== */
function recHTML(r, compact) {
  if (r.kind === 'review') return `<div class="rec"><div><h3>חזרה על ${r.count} ${r.count === 1 ? 'טעות' : 'טעויות'} מהימים האחרונים</h3><p>אלה שאלות שטעיתם בהן, ועכשיו זה הזמן הנכון לנסות שוב — מספיק זמן עבר כדי לבדוק שבאמת זכרתם. נושאים: ${r.topics.map(t => esc(TOPIC[t].name)).join(', ')}.</p></div><div class="recact"><button class="btn primary" data-review="1">התחילו חזרה</button></div></div>`;
  const T = TOPIC[r.t], v = videoFor(r.t);
  const head = { study: `עוד לא סימנתם שלמדתם את "${esc(T.name)}"`, weak: `${esc(T.name)}: ${Math.round(r.acc * 100)}% הצלחה ב-${r.n} שאלות`, untested: `${esc(T.name)}: למדתם, אבל עוד כמעט לא תרגלתם` }[r.kind];
  const body = { study: 'צפו בקורס בקמפוס IL או בסרטון, ואז סמנו שלמדתם. אפשר גם לנסות כמה שאלות בסיסיות כדי לבדוק מה אתם כבר יודעים.', weak: 'זה אחד הנושאים החלשים שלכם כרגע. כדאי לקרוא שוב את הנוסחאות ולתרגל עוד כמה שאלות.', untested: 'כמה שאלות יראו לכם אם החומר באמת נקלט.' }[r.kind];
  return `<div class="rec"><span class="tdot big" style="background:${T.color}"></span><div><h3>${head}</h3>${compact ? '' : `<p>${body}</p>`}</div>
    <div class="recact">${r.kind === 'study' ? `<a class="btn primary" href="${T.url}" target="_blank" rel="noopener">לקורס בקמפוס IL</a><a class="btn" href="${esc(v.url)}" target="_blank" rel="noopener">${esc(v.label)}</a><button class="btn" data-mark="${r.t}">סמנו שלמדתי</button>`
      : `<button class="btn primary" data-more="${r.t}">תרגלו עכשיו</button><button class="btn" data-sheet="${r.t}">קראו על הנושא</button>${r.kind === 'weak' ? `<a class="btn" href="${esc(v.url)}" target="_blank" rel="noopener">${esc(v.label)}</a>` : ''}`}</div></div>`;
}
function bindRecs(root) {
  root.querySelectorAll('[data-more]').forEach(b => b.onclick = () => practiceTopic(b.dataset.more));
  root.querySelectorAll('[data-sheet]').forEach(b => b.onclick = () => openSheet(b.dataset.sheet));
  root.querySelectorAll('[data-mark]').forEach(b => b.onclick = () => { S.st[b.dataset.mark] = 1; save(); route(); });
  root.querySelectorAll('[data-review]').forEach(b => b.onclick = () => { S.set.mode = 'wrong'; S.set.topics = []; S.set.lvls = [1, 2, 3]; save(); go('practice'); renderFilters(); nextQuestion(); });
}
function renderRecs() {
  const all = recommendations(), groups = [
    ['study', 'נושאים שעוד לא למדתם', 'לפי סדר הסילבוס. כשתסיימו ללמוד נושא — בקורס או בסרטונים — סמנו אותו כנלמד.'],
    ['weak', 'הנושאים החלשים שלכם', 'מהחלש ביותר, לפי אחוז התשובות הנכונות.'],
    ['untested', 'למדתם, עכשיו כדאי לתרגל', ''],
    ['review', 'חזרה מרווחת', `טעויות חוזרות אליכם אחרי ${CONFIG.reviewDays.join(', ')} ימים, עד שתענו עליהן נכון ${CONFIG.masteredAfter} פעמים ברצף.`]];
  const upcoming = openMistakes().filter(([, m]) => !isDue(m)).length;
  $('#recList').innerHTML = groups.map(([k, h, sub]) => {
    const items = all.filter(r => r.kind === k);
    if (!items.length && k !== 'review') return '';
    return `<section class="recgroup"><h2>${h}</h2>${sub ? `<p class="sub">${sub}</p>` : ''}${items.map(r => recHTML(r)).join('') || `<p class="muted">${upcoming ? `אין טעויות לחזרה היום. ${upcoming} ${upcoming === 1 ? 'טעות תחזור' : 'טעויות יחזרו'} בימים הקרובים.` : 'אין כרגע טעויות לחזרה.'}</p>`}</section>`;
  }).join('') || '<div class="empty"><p>אין המלצות כרגע — סימנתם את כל הנושאים, אין נושאים חלשים ואין טעויות לחזרה. כל הכבוד!</p></div>';
  bindRecs($('#recList'));
}

/* ===================== גרף עוגה (לדף ולאקסל) ===================== */
function drawPie(cv, data, title, W = 520, H = 330) {
  const dpr = 2, ctx = cv.getContext('2d'); cv.width = W * dpr; cv.height = H * dpr; cv.style.aspectRatio = `${W}/${H}`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
  const font = "'Assistant', 'Arial Hebrew', Arial, sans-serif";
  ctx.direction = 'rtl'; ctx.textAlign = 'right'; ctx.fillStyle = '#13233F'; ctx.font = `700 17px ${font}`; ctx.fillText(title, W - 16, 28);
  const items = data.filter(d => d.v > 0), total = items.reduce((s, d) => s + d.v, 0);
  const cx = W - 125, cy = 180, r = 105;
  if (!total) { ctx.fillStyle = '#E6ECF2'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 2 * Math.PI); ctx.fill(); ctx.fillStyle = '#5B6B82'; ctx.textAlign = 'center'; ctx.font = `15px ${font}`; ctx.fillText('אין עדיין נתונים', cx, cy + 5); cv.setAttribute('aria-label', title + ': אין עדיין נתונים'); return; }
  let a = -Math.PI / 2;
  for (const d of items) { const s = 2 * Math.PI * d.v / total; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, a, a + s); ctx.closePath(); ctx.fillStyle = d.c; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    if (d.v / total > 0.07) { const m = a + s / 2; ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.font = `700 13px ${font}`; ctx.fillText(Math.round(100 * d.v / total) + '%', cx + Math.cos(m) * r * 0.66, cy + Math.sin(m) * r * 0.66 + 4); }
    a += s; }
  ctx.textAlign = 'right'; ctx.font = `14px ${font}`; let y = 62; const lx = W - 260;
  for (const d of items.slice(0, 12)) { ctx.fillStyle = d.c; ctx.fillRect(lx - 12, y - 10, 11, 11); ctx.fillStyle = '#13233F'; ctx.fillText(`${d.label} (${d.v})`, lx - 20, y); y += 21; }
  cv.setAttribute('aria-label', title + ': ' + items.map(d => `${d.label} ${d.v}`).join(', '));
}

/* ===================== ייצוא לאקסל ===================== */
async function exportExcel() {
  if (!window.ExcelJS) { alert('ספריית האקסל לא נטענה. בדקו את החיבור לאינטרנט ונסו שוב.'); return; }
  const wb = new ExcelJS.Workbook(); wb.creator = 'פשוט לתרגל';
  const head = { font: { bold: true, color: { argb: 'FFFFFFFF' } }, fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF13233F' } }, alignment: { vertical: 'middle', horizontal: 'right' } };
  const ws = wb.addWorksheet('הטעויות שלי', { views: [{ rightToLeft: true, state: 'frozen', ySplit: 1 }] });
  ws.columns = [{ header: 'תאריך', key: 'd', width: 11 }, { header: 'נושא', key: 't', width: 24 }, { header: 'תת-נושא', key: 's', width: 20 }, { header: 'רמה', key: 'l', width: 11 },
    { header: 'השאלה', key: 'q', width: 60 }, { header: 'התשובה שלי', key: 'y', width: 26 }, { header: 'התשובה הנכונה', key: 'c', width: 26 }, { header: 'סיבת הטעות', key: 'r', width: 30 }, { header: 'כמה פעמים טעיתי', key: 'w', width: 14 }, { header: 'סטטוס', key: 'f', width: 12 }];
  ws.getRow(1).eachCell(c => Object.assign(c, head));
  Object.entries(S.m).map(([k, m]) => ({ m, q: getQ(k) })).filter(x => x.q).sort((a, b) => a.m.t - b.m.t).forEach(({ m, q }) => {
    const row = ws.addRow({ d: new Date(m.t * 60000), t: TOPIC[q.topic].name, s: q.sub, l: LVL[q.lvl], q: plainLines(q.q), y: plain(q.opts[m.c]), c: plain(q.opts[q.ans]), r: m.r || '', w: m.w, f: m.f ? 'הובנה' : 'פתוחה' });
    row.getCell('d').numFmt = 'dd/mm/yy'; row.alignment = { wrapText: true, vertical: 'top', horizontal: 'right' };
  });
  const st = stats(), ws2 = wb.addWorksheet('סיכום לפי נושא', { views: [{ rightToLeft: true }] });
  ws2.columns = [{ header: 'נושא', key: 't', width: 28 }, { header: 'למדתי', key: 's', width: 9 }, { header: 'שאלות שתורגלו', key: 'n', width: 14 }, { header: 'נכון', key: 'ok', width: 9 }, { header: 'טעויות', key: 'bad', width: 9 }, { header: 'אחוז הצלחה', key: 'acc', width: 12 }, { header: 'טעויות פתוחות', key: 'open', width: 14 }];
  ws2.getRow(1).eachCell(c => Object.assign(c, head));
  TOPICS.forEach(t => { const s = st[t.id]; const r = ws2.addRow({ t: t.name, s: S.st[t.id] ? '✓' : '', n: s.n, ok: s.ok, bad: s.bad, acc: s.n ? s.ok / s.n : null, open: s.open }); r.getCell('acc').numFmt = '0%'; });
  const tr = ws2.addRow({ t: 'סה"כ', n: { formula: 'SUM(C2:C13)' }, ok: { formula: 'SUM(D2:D13)' }, bad: { formula: 'SUM(E2:E13)' }, acc: { formula: 'IF(C14=0,"",D14/C14)' }, open: { formula: 'SUM(G2:G13)' } });
  tr.font = { bold: true }; tr.getCell('acc').numFmt = '0%';
  const c = document.createElement('canvas');
  drawPie(c, TOPICS.map(t => ({ label: t.name, v: st[t.id].n, c: t.color })), 'שאלות שתורגלו לפי נושא');
  const img1 = wb.addImage({ base64: c.toDataURL('image/png'), extension: 'png' });
  drawPie(c, TOPICS.map(t => ({ label: t.name, v: st[t.id].bad, c: t.color })), 'טעויות לפי נושא');
  const img2 = wb.addImage({ base64: c.toDataURL('image/png'), extension: 'png' });
  ws2.addImage(img1, { tl: { col: 0, row: 15 }, ext: { width: 520, height: 330 } });
  ws2.addImage(img2, { tl: { col: 4, row: 15 }, ext: { width: 520, height: 330 } });
  const buf = await wb.xlsx.writeBuffer(), a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
  a.download = `הטעויות-שלי-${new Date().toISOString().slice(0, 10)}.xlsx`; document.body.appendChild(a); a.click(); a.remove();
}

/* ===================== ניווט והגדרות ===================== */
const PAGES = ['practice', 'mistakes', 'progress', 'recs'];
function go(p) { if (location.hash !== '#' + p) history.pushState(null, '', '#' + p); route(); }
function route() {
  const p = PAGES.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'practice';
  PAGES.forEach(x => { $('#page-' + x).hidden = x !== p; const t = $(`[data-page="${x}"]`); t.classList.toggle('on', x === p); t.setAttribute('aria-current', x === p ? 'page' : 'false'); });
  if (p === 'mistakes') renderMistakes(); if (p === 'progress') renderProgress(); if (p === 'recs') renderRecs();
  if (p === 'practice' && !cur && !$('#qcard').innerHTML.trim()) nextQuestion();
  window.scrollTo(0, 0);
}
function openSettings() {
  const kb = (new Blob([JSON.stringify(S)]).size / 1024).toFixed(1);
  $('#storeInfo').textContent = storageOK ? `ההתקדמות שלכם תופסת ${kb} KB בדפדפן הזה בלבד.` : 'הדפדפן חוסם שמירה מקומית, ולכן ההתקדמות עלולה לא להישמר.';
  $('#setDlg').showModal();
}

document.addEventListener('DOMContentLoaded', () => {
  renderFilters(); updateBadge();
  $('#topicChips').onclick = e => { const b = e.target.closest('[data-t]'); if (!b) return; const t = b.dataset.t;
    if (t === '*') S.set.topics = []; else { const s = new Set(S.set.topics); s.has(t) ? s.delete(t) : s.add(t); S.set.topics = s.size === TOPICS.length ? [] : [...s]; }
    save(); renderFilters(); nextQuestion(); };
  $('#lvlChips').onclick = e => { const b = e.target.closest('[data-l]'); if (!b) return; const l = +b.dataset.l, s = new Set(S.set.lvls); s.has(l) ? s.delete(l) : s.add(l); S.set.lvls = [...s].sort(); save(); renderFilters(); nextQuestion(); };
  $('#modeSeg').onclick = e => { const b = e.target.closest('[data-m]'); if (!b) return; S.set.mode = b.dataset.m; save(); renderFilters(); nextQuestion(); };
  document.querySelectorAll('[data-page]').forEach(a => a.onclick = e => { e.preventDefault(); go(a.dataset.page); });
  window.addEventListener('popstate', route); window.addEventListener('hashchange', route);
  $('#mTopic').onchange = renderMistakes; $('#mStatus').onchange = renderMistakes;
  document.querySelectorAll('.exportBtn').forEach(b => b.onclick = exportExcel);
  $('#setBtn').onclick = openSettings;
  $('#resetAll').onclick = () => { if (confirm('למחוק את כל ההתקדמות, הטעויות והסימונים? אי אפשר לבטל את זה.')) { S = fresh(); save(); cur = null; $('#qcard').innerHTML = ''; updateBadge(); $('#setDlg').close(); renderFilters(); route(); } };
  document.querySelectorAll('dialog .closeDlg').forEach(b => b.onclick = () => b.closest('dialog').close());
  document.addEventListener('keydown', e => {
    if ($('#page-practice').hidden || document.querySelector('dialog[open]') || /TEXTAREA|INPUT|SELECT/.test(document.activeElement.tagName)) return;
    if (!answered && ['1', '2', '3', '4'].includes(e.key)) answer(+e.key - 1);
  });
  if (!window.katex) $('#netWarn').hidden = false;
  route();
});
