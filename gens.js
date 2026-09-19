/* ===== מנוע שאלות: כל שאלה נוצרת מתבנית + זרע (seed), כך שאפשר לשחזר אותה בדיוק ===== */

const TOPICS = [
  { id: 'eq',   name: 'משוואות',                      course: 'פשוט משוואות',                           url: 'https://campus.gov.il/course/v1iit-acd-rfp4-simplyequations/',        yt: 'משוואות' },
  { id: 'fn',   name: 'פונקציות',                     course: 'פשוט פונקציות',                          url: 'https://campus.gov.il/course/v1iit-acd-rfp4-simplyfunctions/',        yt: 'פונקציות' },
  { id: 'poly', name: 'לינאריות, ריבועיות ופולינומים', course: 'פשוט לינאריות, ריבועיות ופולינומים',     url: 'https://campus.gov.il/course/v1iit-acd-rfp4-simplylinear/',           yt: 'פולינומים' },
  { id: 'exp',  name: 'שורשים, מעריכיות ולוגריתמים',   course: 'פשוט שורשים, רציונליות, מעריכיות ולוגריתמיות', url: 'https://campus.gov.il/course/v1iit-acd-rfp4-simplyroot/',       yt: 'לוגריתמים' },
  { id: 'trig', name: 'טריגונומטריה',                  course: 'פשוט טריגו',                             url: 'https://campus.gov.il/course/v1iit-acd-rfp4-simplytrig/',             yt: 'טריגונומטריה' },
  { id: 'vec',  name: 'וקטורים',                       course: 'פשוט וקטורים',                           url: 'https://campus.gov.il/course/v1iit-acd-rfp4-simplyvectors/',          yt: 'וקטורים' },
  { id: 'geo',  name: 'גאומטריה אנליטית',              course: 'פשוט אנליטית',                           url: 'https://campus.gov.il/course/v1iit-acd-rfp4-simplyanalyticgeometry/', yt: 'גאומטריה אנליטית' },
  { id: 'cx',   name: 'מספרים מרוכבים',                course: 'פשוט מרוכבים',                           url: 'https://campus.gov.il/course/v1iit-acd-rfp4-simplycomplex/',          yt: 'מספרים מרוכבים' },
  { id: 'lim',  name: 'גבולות, רציפות ונגזרות',        course: 'פשוט גבולות, רציפות ונגזרות',            url: 'https://campus.gov.il/course/v1iit-acd-rfp4-simplylimits/',           yt: 'גבולות נגזרות' },
  { id: 'crv',  name: 'חקירת פונקציות',                course: 'פשוט חקירת פונקציות',                    url: 'https://campus.gov.il/course/v1iit-acd-rfp4-simplycurvesketching/',   yt: 'חקירת פונקציות' },
  { id: 'int',  name: 'אינטגרלים',                     course: 'פשוט אינטגרלים',                         url: 'https://campus.gov.il/course/v1iit-acd-rfp4-simplyintegrals/',        yt: 'אינטגרלים' },
  { id: 'seq',  name: 'סדרות ואינדוקציה',              course: 'פשוט סדרות ואינדוקציה',                  url: 'https://campus.gov.il/course/v1iit-acd-rfp4-simplysequences/',        yt: 'סדרות אינדוקציה' },
];

/* ---------- אקראיות עם זרע ---------- */
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
class Rng {
  constructor(seed) { this.r = mulberry32(seed); }
  i(a, b) { return a + Math.floor(this.r() * (b - a + 1)); }
  nz(a, b) { let x; do { x = this.i(a, b); } while (x === 0); return x; }
  pick(arr) { return arr[Math.floor(this.r() * arr.length)]; }
  shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(this.r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
}

/* ---------- עזרי כתיבה מתמטית ---------- */
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; }
function fr(n, d = 1) { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d); n /= g; d /= g; if (d === 1) return String(n); return (n < 0 ? '-' : '') + `\\frac{${Math.abs(n)}}{${d}}`; }
function pm(n) { return n < 0 ? `- ${-n}` : `+ ${n}`; }
function par(n) { return n < 0 ? `(${n})` : `${n}`; }
function poly(terms) {
  let s = '';
  for (const [c, v] of terms) {
    if (c === 0) continue;
    const neg = c < 0, a = Math.abs(c);
    const body = v ? (a === 1 ? v : a + v) : String(a);
    s += s ? (neg ? ' - ' : ' + ') + body : (neg ? '-' : '') + body;
  }
  return s || '0';
}
function xp(e, v = 'x') { return e === 0 ? '' : e === 1 ? v : `${v}^{${e}}`; }
function xm(a) { return a === 0 ? 'x' : `x ${pm(-a)}`; }            // x - a
function sqSplit(n) { let k = 1, m = n; for (let i = 2; i * i <= m; i++) while (m % (i * i) === 0) { m /= i * i; k *= i; } return { k, m }; }
function sqrtTex(n) { if (n === 0) return '0'; const { k, m } = sqSplit(n); if (m === 1) return String(k); return (k === 1 ? '' : k) + `\\sqrt{${m}}`; }
function piTex(n, d = 1) { if (n === 0) return '0'; if (d < 0) { n = -n; d = -d; } const g = gcd(n, d); n /= g; d /= g; const s = n < 0 ? '-' : ''; const a = Math.abs(n); const num = a === 1 ? '\\pi' : a + '\\pi'; return d === 1 ? s + num : s + `\\frac{${num}}{${d}}`; }
function vec(a) { return `(${a.join(', ')})`; }
function cx(a, b) { if (b === 0) return String(a); const bi = (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'i'; if (a === 0) return (b < 0 ? '-' : '') + bi; return `${a} ${b < 0 ? '-' : '+'} ${bi}`; }
function cmul([a, b], [c, d]) { return [a * c - b * d, a * d + b * c]; }
function aPow(e) { return e === 0 ? '1' : e === 1 ? 'a' : `a^{${e}}`; }
function P2(u, v) { const [p, q] = [u, v].sort((x, y) => x - y); return `x = ${p}, \\; x = ${q}`; }
function mc(r, correct, ds, fb) {
  const set = [correct];
  for (const d of ds) { if (d != null && !set.includes(d)) set.push(d); if (set.length === 4) break; }
  let k = 1; while (set.length < 4 && k < 80) { const f = fb ? fb(k) : null; k++; if (f != null && !set.includes(f)) set.push(f); }
  const order = r.shuffle(set.map((_, i) => i));
  return { opts: order.map(i => set[i]), ans: order.indexOf(0) };
}

/* ---------- טריגו: זוויות סטנדרטיות ---------- */
const STD = (() => { const seen = new Set(), out = []; for (const d of [6, 4]) for (let n = 0; n < 2 * d; n++) { const g = gcd(n, d), nn = n / g, dd = d / g; const k = nn + '/' + dd; if (!seen.has(k)) { seen.add(k); out.push([nn, dd]); } } return out.sort((a, b) => a[0] / a[1] - b[0] / b[1]); })();
const VALS = [[0, '0'], [0.5, '\\frac{1}{2}'], [Math.SQRT2 / 2, '\\frac{\\sqrt{2}}{2}'], [Math.sqrt(3) / 2, '\\frac{\\sqrt{3}}{2}'], [1, '1']];
function valTex(v) { for (const [x, t] of VALS) { if (Math.abs(Math.abs(v) - x) < 1e-9) return (v < -1e-9 ? '-' : '') + t; } return String(v); }
function fval(f, [n, d]) { const a = n * Math.PI / d; return f === 'sin' ? Math.sin(a) : f === 'cos' ? Math.cos(a) : Math.tan(a); }
function solsOf(f, v) { return STD.filter(a => Math.abs(fval(f, a) - v) < 1e-9); }
function angList(list) { return list.length ? list.map(a => `x = ${piTex(a[0], a[1])}`).join(', \\; ') : null; }

/* ---------- התבניות ---------- */
// l: 1 בסיסי, 2 בינוני, 3 רמה אקדמית (שנה א')
const GENS = [
/* ===== משוואות ===== */
{ id: 'eq1', t: 'eq', sub: 'משוואה לינארית', l: 1, g(r) {
  const x0 = r.nz(-9, 9), a = r.i(2, 6), b = r.nz(-5, 5); let c; do { c = r.nz(-5, 5); } while (c === a);
  const d = a * (x0 + b) - c * x0, rhs = poly([[c, 'x'], [d, '']]);
  return { q: ['פתרו את המשוואה:', `$$${a}(x ${pm(b)}) = ${rhs}`],
    ...mc(r, `x = ${x0}`, [`x = ${-x0}`, `x = ${fr(d - b, a - c)}`, `x = ${x0 + 1}`], k => `x = ${x0 + k + 1}`),
    ex: ['פותחים סוגריים:', `$$${poly([[a, 'x'], [a * b, '']])} = ${rhs}`, 'מעבירים את כל ה-x לאגף אחד ואת המספרים לאגף השני:', `$$${poly([[a - c, 'x']])} = ${d - a * b}`, `$$x = ${x0}`] };
} },
{ id: 'eq2', t: 'eq', sub: 'מערכת משוואות', l: 1, g(r) {
  const x0 = r.i(-6, 6), y0 = r.i(-6, 6); let a1, b1, a2, b2;
  do { a1 = r.nz(-5, 5); b1 = r.nz(-5, 5); a2 = r.nz(-5, 5); b2 = r.nz(-5, 5); } while (a1 * b2 - a2 * b1 === 0);
  const c1 = a1 * x0 + b1 * y0, c2 = a2 * x0 + b2 * y0, P = (x, y) => `x = ${x}, \\; y = ${y}`;
  return { q: ['פתרו את מערכת המשוואות:', `$$\\begin{cases} ${poly([[a1, 'x'], [b1, 'y']])} = ${c1} \\\\ ${poly([[a2, 'x'], [b2, 'y']])} = ${c2} \\end{cases}`],
    ...mc(r, P(x0, y0), [P(y0, x0), P(-x0, y0), P(x0, -y0), P(x0 + 1, y0 - 1)], k => P(x0 + k, y0)),
    ex: ['מבודדים משתנה אחד מאחת המשוואות ומציבים בשנייה (או מחברים/מחסרים משוואות כדי לבטל משתנה). בדיקה — מציבים את הפתרון בשתי המשוואות:',
      `$$${a1}\\cdot${par(x0)} + ${par(b1)}\\cdot${par(y0)} = ${c1}`, `$$${a2}\\cdot${par(x0)} + ${par(b2)}\\cdot${par(y0)} = ${c2}`] };
} },
{ id: 'eq3', t: 'eq', sub: 'משוואה עם שברים', l: 2, g(r) {
  const x0 = r.nz(-6, 6); let b, d; do { b = r.nz(-6, 6); d = r.nz(-6, 6); } while (b === d || x0 + b === 0 || x0 + d === 0);
  const a = x0 + b, c = x0 + d;
  return { q: ['פתרו את המשוואה:', `$$\\frac{${a}}{${xm(-b)}} = \\frac{${c}}{${xm(-d)}}`],
    ...mc(r, `x = ${x0}`, [`x = ${-b}`, `x = ${-x0}`, `x = ${x0 + 1}`], k => `x = ${x0 - k - 1}`),
    ex: ['כופלים בהצלבה, בתנאי שהמכנים אינם מתאפסים:', `$$${a}(${xm(-d)}) = ${c}(${xm(-b)})`, `$$${poly([[a - c, 'x']])} = ${c * b - a * d}`, `$$x = ${x0}`,
      'ובודקים שהפתרון לא מאפס אף מכנה:', `$$x \\neq ${-b}, \\qquad x \\neq ${-d}`] };
} },
{ id: 'eq4', t: 'eq', sub: 'ערך מוחלט', l: 1, g(r) {
  const a = r.nz(-6, 6), b = r.i(1, 7);
  return { q: ['פתרו את המשוואה:', `$$\\left|${xm(a)}\\right| = ${b}`],
    ...mc(r, P2(a - b, a + b), [P2(-a - b, -a + b), `x = ${a + b}`, P2(-(a + b), a + b)], k => P2(a - b - k, a + b + k)),
    ex: ['ערך מוחלט של ביטוי שווה למספר חיובי כאשר הביטוי שווה למספר או לנגדי שלו:', `$$${xm(a)} = ${b} \\;\\Rightarrow\\; x = ${a + b}`, `$$${xm(a)} = ${-b} \\;\\Rightarrow\\; x = ${a - b}`] };
} },
{ id: 'eq5', t: 'eq', sub: 'אי-שוויון לינארי', l: 1, g(r) {
  const a = r.i(-5, -2), x0 = r.nz(-6, 6), b = r.nz(-8, 8), c = a * x0 + b;
  return { q: ['פתרו את אי-השוויון:', `$$${poly([[a, 'x'], [b, '']])} > ${c}`],
    ...mc(r, `x < ${x0}`, [`x > ${x0}`, `x < ${-x0}`, `x > ${-x0}`]),
    ex: ['מעבירים אגפים:', `$$${a}x > ${c - b}`, 'מחלקים במספר שלילי — ולכן הופכים את כיוון אי-השוויון:', `$$x < ${x0}`] };
} },
{ id: 'eq6', t: 'eq', sub: 'משוואה עם פרמטר', l: 3, calm: 'זה רק ניתוח מקרים של משוואה מהצורה ax = b — בדיוק מה שעושים באלגברה לינארית כשפותרים מערכת עם פרמטר.', g(r) {
  const k = r.i(2, 5);
  return { q: ['עבור איזה ערך של הפרמטר $a$ אין למשוואה פתרון?', `$$(a^2 - ${k * k})x = a - ${k}`],
    ...mc(r, `a = ${-k}`, [`a = ${k}`, 'a = 0', '#אין ערך כזה']),
    ex: ['כשהמקדם של x שונה מאפס יש פתרון יחיד. המקדם מתאפס כאשר:', `$$a^2 - ${k * k} = 0 \\;\\Rightarrow\\; a = \\pm ${k}`,
      `עבור $a = ${k}$ מתקבל:`, '$$0\\cdot x = 0', 'כל x הוא פתרון — אינסוף פתרונות.', `עבור $a = ${-k}$ מתקבל:`, `$$0\\cdot x = ${-2 * k}`, 'זו סתירה — אין פתרון.'] };
} },
{ id: 'eq7', t: 'eq', sub: 'משוואה מודולו p', l: 3, src: 'אלגברה לינארית, שבוע 1: שדות וקונגרואנציה', calm: 'זו משוואה לינארית ax = b רגילה. ההבדל היחיד: במקום לחלק ב-a כופלים בהופכי שלו מודולו p.', g(r) {
  const p = r.pick([5, 7, 11]), a = r.i(2, p - 1), b = r.i(1, p - 1);
  let inv = 1; while ((a * inv) % p !== 1) inv++;
  const x = (b * inv) % p, X = v => `x \\equiv ${((v % p) + p) % p} \\pmod{${p}}`;
  return { q: [`פתרו את המשוואה בשדה $\\mathbb{Z}_{${p}}$, כלומר מודולו ${p}:`, `$$${a}x \\equiv ${b} \\pmod{${p}}`],
    ...mc(r, X(x), [X(b), X(a * b), X(x + 1)], k => X(x + k + 1)),
    ex: ['במקום לחלק, כופלים בהופכי של המקדם:', `$$${a}\\cdot ${inv} = ${a * inv} \\equiv 1 \\pmod{${p}} \\;\\Rightarrow\\; ${a}^{-1} \\equiv ${inv}`, 'לכן:', `$$x \\equiv ${b}\\cdot ${inv} = ${b * inv} \\equiv ${x} \\pmod{${p}}`] };
} },

/* ===== פונקציות ===== */
{ id: 'fn1', t: 'fn', sub: 'הרכבת פונקציות', l: 1, g(r) {
  const a = r.nz(-4, 4), b = r.nz(-5, 5), c = r.nz(-5, 5), k = r.nz(-3, 3);
  const gk = k * k + c, res = a * gk + b, fk = a * k + b;
  return { q: ['נתון:', `$$f(x) = ${poly([[a, 'x'], [b, '']])}, \\qquad g(x) = ${poly([[1, 'x^2'], [c, '']])}`, 'חשבו:', `$$f(g(${k}))`],
    ...mc(r, `${res}`, [`${fk * fk + c}`, `${fk + gk}`, `${fk * gk}`], j => `${res + j}`),
    ex: ['קודם מחשבים את הפונקציה הפנימית:', `$$g(${k}) = ${par(k)}^2 ${pm(c)} = ${gk}`, 'ואת התוצאה מציבים ב-f:', `$$f(${gk}) = ${a}\\cdot ${par(gk)} ${pm(b)} = ${res}`] };
} },
{ id: 'fn2', t: 'fn', sub: 'תחום הגדרה', l: 1, g(r) {
  const a = r.nz(-6, 6), ty = r.i(0, 2);
  const expr = [`\\sqrt{${xm(a)}}`, `\\frac{1}{\\sqrt{${xm(a)}}}`, `\\frac{1}{${xm(a)}}`][ty];
  const all = [`x \\geq ${a}`, `x > ${a}`, `x \\neq ${a}`, `x \\leq ${a}`];
  const why = ['מתחת לשורש (ריבועי) צריך ביטוי אי-שלילי:', 'שורש במכנה: הביטוי צריך להיות חיובי ממש — אי-שלילי בגלל השורש, ושונה מאפס בגלל המכנה:', 'אסור שהמכנה יתאפס:'][ty];
  return { q: ['מהו תחום ההגדרה של הפונקציה?', `$$f(x) = ${expr}`], ...mc(r, all[ty], all.filter((_, i) => i !== ty)), ex: [why, `$$${all[ty]}`] };
} },
{ id: 'fn3', t: 'fn', sub: 'פונקציה הפוכה', l: 2, g(r) {
  const a = r.i(2, 6), b = r.nz(-7, 7), F = s => `f^{-1}(x) = ${s}`;
  return { q: ['מצאו את הפונקציה ההפוכה של:', `$$f(x) = ${poly([[a, 'x'], [b, '']])}`],
    ...mc(r, F(`\\frac{${xm(b)}}{${a}}`), [F(`\\frac{${xm(-b)}}{${a}}`), F(poly([[a, 'x'], [-b, '']])), F(`\\frac{1}{${poly([[a, 'x'], [b, '']])}}`)]),
    ex: ['כותבים y = f(x) ומבודדים את x:', `$$y = ${poly([[a, 'x'], [b, '']])} \\;\\Rightarrow\\; x = \\frac{${poly([[1, 'y'], [-b, '']])}}{${a}}`, 'ומחליפים את שמות המשתנים:', `$$${F(`\\frac{${xm(b)}}{${a}}`)}`] };
} },
{ id: 'fn4', t: 'fn', sub: 'זוגיות', l: 2, g(r) {
  const k = r.i(2, 5), ask = r.pick(['even', 'odd']);
  const E = [`x^4 - ${k}x^2`, `\\cos x + ${k}`, `|x| + x^2`, `\\frac{${k}}{x^2 + 1}`];
  const O = [`x^3 - ${k}x`, `\\sin(${k}x)`, `x^5 + x`, `\\frac{x}{x^2 + ${k}}`];
  const N = [`x^2 + x`, `e^x`, `x^3 + ${k}`, `(x - ${k})^2`];
  const [good, other] = ask === 'even' ? [E, O] : [O, E];
  const F = s => `f(x) = ${s}`, rn = r.shuffle(N), c = F(r.pick(good));
  return { q: [`איזו מהפונקציות הבאות ${ask === 'even' ? 'זוגית' : 'אי-זוגית'}?`], ...mc(r, c, [F(r.pick(other)), F(rn[0]), F(rn[1])]),
    ex: ['פונקציה זוגית מקיימת:', '$$f(-x) = f(x)', 'פונקציה אי-זוגית מקיימת:', '$$f(-x) = -f(x)', 'מציבים −x בכל אפשרות ובודקים. הפונקציה שמקיימת את התנאי:', `$$${c}`] };
} },
{ id: 'fn5', t: 'fn', sub: 'הזזות של גרפים', l: 1, g(r) {
  const a = r.nz(-5, 5), b = r.nz(-5, 5);
  const D = (a, b) => `#הזזה של ${Math.abs(a)} ${a > 0 ? 'ימינה' : 'שמאלה'} ו-${Math.abs(b)} ${b > 0 ? 'למעלה' : 'למטה'}`;
  return { q: ['הגרף של g מתקבל מהגרף של f על ידי:', `$$g(x) = f(${xm(a)}) ${pm(b)}`], ...mc(r, D(a, b), [D(-a, b), D(a, -b), D(-a, -b)]),
    ex: ['החלפת x ב-$x - a$ מזיזה את הגרף a יחידות ימינה — הפוך מהסימן שבסוגריים! הוספת קבוע מחוץ לפונקציה מזיזה למעלה (חיובי) או למטה (שלילי).'] };
} },
{ id: 'fn6', t: 'fn', sub: 'פונקציה הפוכה', l: 3, calm: 'אותה טכניקה בדיוק כמו בפונקציה לינארית: מחליפים x ו-y ומבודדים. רק קצת יותר אלגברה.', g(r) {
  let a, b, c, d; do { a = r.nz(-4, 4); b = r.nz(-5, 5); c = r.nz(-3, 3); d = r.nz(-5, 5); } while (a * d - b * c === 0);
  const Fr = (n, m) => `f^{-1}(x) = \\frac{${n}}{${m}}`;
  const cor = Fr(poly([[-d, 'x'], [b, '']]), poly([[c, 'x'], [-a, '']]));
  return { q: ['מצאו את הפונקציה ההפוכה של:', `$$f(x) = \\frac{${poly([[a, 'x'], [b, '']])}}{${poly([[c, 'x'], [d, '']])}}`],
    ...mc(r, cor, [Fr(poly([[c, 'x'], [d, '']]), poly([[a, 'x'], [b, '']])), Fr(poly([[d, 'x'], [b, '']]), poly([[c, 'x'], [-a, '']])), Fr(poly([[-d, 'x'], [b, '']]), poly([[c, 'x'], [a, '']]))],
      k => Fr(poly([[-d, 'x'], [b + k, '']]), poly([[c, 'x'], [-a, '']]))),
    ex: ['כותבים y = f(x) וכופלים במכנה:', `$$y(${poly([[c, 'x'], [d, '']])}) = ${poly([[a, 'x'], [b, '']])}`, 'מכנסים את האיברים עם x לאגף אחד:', `$$x(${poly([[c, 'y'], [-a, '']])}) = ${poly([[-d, 'y'], [b, '']])}`,
      `$$x = \\frac{${poly([[-d, 'y'], [b, '']])}}{${poly([[c, 'y'], [-a, '']])}}`, 'ומחליפים y ב-x.'] };
} },
{ id: 'fn7', t: 'fn', sub: 'חד-חד-ערכיות', l: 3, calm: 'חח"ע זה בסך הכל "מבחן הקו האופקי" מהתיכון, בשם רשמי.', g(r) {
  const k = r.i(1, 5);
  return { q: ['איזו מהפונקציות הבאות היא חד-חד-ערכית (חח"ע) על כל $\\mathbb{R}$?'],
    ...mc(r, `f(x) = x^3 + ${k}x`, [`f(x) = x^2 + ${k}`, `f(x) = \\sin x`, `f(x) = |x - ${k}|`, `f(x) = x^4 - x`]),
    ex: ['פונקציה חח"ע אם כל ערך y מתקבל לכל היותר פעם אחת. לפונקציה הנכונה נגזרת חיובית תמיד, לכן היא עולה ממש:', `$$f'(x) = 3x^2 + ${k} > 0`, 'בכל אחת מהאפשרויות האחרות אפשר למצוא שני ערכי x שונים עם אותו y.'] };
} },

/* ===== לינאריות, ריבועיות, פולינומים ===== */
{ id: 'po1', t: 'poly', sub: 'שיפוע ישר', l: 1, g(r) {
  let x1, x2, y1, y2; do { x1 = r.i(-8, 8); x2 = r.i(-8, 8); y1 = r.i(-8, 8); y2 = r.i(-8, 8); } while (x1 === x2 || y1 === y2);
  const m = fr(y2 - y1, x2 - x1), M = s => `m = ${s}`;
  return { q: ['מהו שיפוע הישר העובר דרך הנקודות?', `$$A${vec([x1, y1])}, \\qquad B${vec([x2, y2])}`],
    ...mc(r, M(m), [M(fr(y1 - y2, x2 - x1)), M(fr(x2 - x1, y2 - y1)), x1 + x2 !== 0 ? M(fr(y1 + y2, x1 + x2)) : null], k => M(fr(y2 - y1 + k, x2 - x1))),
    ex: [`$$m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{${y2} - ${par(y1)}}{${x2} - ${par(x1)}} = ${m}`] };
} },
{ id: 'po2', t: 'poly', sub: 'משוואה ריבועית', l: 1, g(r) {
  const r1 = r.i(-7, 7); let r2; do { r2 = r.i(-7, 7); } while (r2 === r1 || r2 === -r1);
  const f = v => v === 0 ? 'x' : `(x ${pm(-v)})`;
  return { q: ['פתרו את המשוואה:', `$$${poly([[1, 'x^2'], [-(r1 + r2), 'x'], [r1 * r2, '']])} = 0`],
    ...mc(r, P2(r1, r2), [P2(-r1, -r2), P2(r1, -r2), P2(-r1, r2)], k => P2(r1 + k, r2 - k)),
    ex: ['מפרקים לגורמים — מחפשים שני מספרים שסכומם ' + (r1 + r2) + ' ומכפלתם ' + (r1 * r2) + ':', `$$${f(r1)}${f(r2)} = 0`, `$$${P2(r1, r2)}`] };
} },
{ id: 'po3', t: 'poly', sub: 'קודקוד פרבולה', l: 2, g(r) {
  const a = r.nz(-3, 3), h = r.nz(-5, 5), k = r.nz(-6, 6);
  return { q: ['מהו קודקוד הפרבולה?', `$$y = ${poly([[a, 'x^2'], [-2 * a * h, 'x'], [a * h * h + k, '']])}`],
    ...mc(r, `(${h}, ${k})`, [`(${-h}, ${k})`, `(${h}, ${-k})`, `(${k}, ${h})`], j => `(${h}, ${k + j})`),
    ex: [`$$x_v = \\frac{-b}{2a} = \\frac{${2 * a * h}}{${2 * a}} = ${h}`, 'ומציבים בפונקציה:', `$$y_v = y(${h}) = ${k}`] };
} },
{ id: 'po4', t: 'poly', sub: 'דיסקרימיננטה', l: 2, g(r) {
  const s = r.i(1, 6);
  return { q: ['עבור אילו ערכים של $m$ יש למשוואה פתרון יחיד?', `$$x^2 + mx + ${s * s} = 0`],
    ...mc(r, `m = \\pm ${2 * s}`, [`m = ${2 * s}`, `m = \\pm ${s}`, `m = \\pm ${s * s}`], k => `m = \\pm ${2 * s + 2 * k}`),
    ex: ['פתרון יחיד — כשהדיסקרימיננטה מתאפסת:', `$$\\Delta = m^2 - 4\\cdot ${s * s} = 0`, `$$m^2 = ${4 * s * s} \\;\\Rightarrow\\; m = \\pm ${2 * s}`] };
} },
{ id: 'po5', t: 'poly', sub: 'משפט השארית', l: 2, g(r) {
  const a = r.i(-4, 4), b = r.i(-4, 4), c = r.nz(-6, 6), k = r.nz(-3, 3), P = x => x ** 3 + a * x * x + b * x + c;
  return { q: ['מהי השארית בחלוקת הפולינום', `$$P(x) = ${poly([[1, 'x^3'], [a, 'x^2'], [b, 'x'], [c, '']])}`, 'בביטוי', `$$${xm(k)}`],
    ...mc(r, `${P(k)}`, [`${P(-k)}`, `${c}`, `${P(k) + k}`], j => `${P(k) + 2 * j}`),
    ex: ['לפי משפט השארית, השארית בחלוקה ב-$x - a$ היא $P(a)$:', `$$P(${k}) = ${par(k)}^3 ${a ? `+ ${par(a)}\\cdot${par(k)}^2` : ''} ${b ? `+ ${par(b)}\\cdot${par(k)}` : ''} ${pm(c)} = ${P(k)}`] };
} },
{ id: 'po6', t: 'poly', sub: 'נוסחאות וייטה', l: 3, calm: 'וייטה + נוסחת כפל מקוצר מהתיכון. באוניברסיטה משתמשים בזה כדי לדבר על שורשים בלי למצוא אותם.', g(r) {
  let s, p; do { s = r.nz(-7, 7); p = r.nz(-9, 9); } while (s * s - 4 * p < 0);
  return { q: ['יהיו $x_1, x_2$ שורשי המשוואה', `$$${poly([[1, 'x^2'], [-s, 'x'], [p, '']])} = 0`, 'בלי לפתור את המשוואה, חשבו:', '$$x_1^2 + x_2^2'],
    ...mc(r, `${s * s - 2 * p}`, [`${s * s + 2 * p}`, `${s * s - p}`, `${s * s}`], k => `${s * s - 2 * p + k}`),
    ex: ['לפי וייטה:', `$$x_1 + x_2 = ${s}, \\qquad x_1 x_2 = ${p}`, 'ומזהות הריבוע:', `$$x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2 = ${s * s} - ${par(2 * p)} = ${s * s - 2 * p}`] };
} },
{ id: 'po7', t: 'poly', sub: 'פולינומים מעל שדה סופי', l: 3, src: 'אלגברה לינארית, שבוע 2: שדות סופיים ופולינומים', calm: 'אין כאן נוסחה מסובכת: מציבים את כל הערכים 0 עד p−1 ובודקים מתי יוצא 0.', g(r) {
  const p = r.pick([5, 7, 11, 13]), a = r.i(1, p - 1), vals = [...Array(p).keys()].map(x => (x * x + a) % p), roots = vals.flatMap((v, x) => v === 0 ? [x] : []);
  return { q: [`כמה שורשים יש לפולינום הבא מעל השדה $\\mathbb{Z}_{${p}}$?`, `$$x^2 + ${a}`], ...mc(r, `${roots.length}`, ['0', '1', '2', '3'].filter(v => v !== `${roots.length}`)),
    ex: ['מציבים את כל איברי השדה (החישוב מודולו ' + p + '):', `$$\\begin{array}{c|${'c'.repeat(p)}} x & ${[...Array(p).keys()].join(' & ')} \\\\ \\hline x^2 + ${a} & ${vals.join(' & ')} \\end{array}`,
      roots.length ? `השורשים: ${roots.map(x => `$x = ${x}$`).join(' ו-')}, כלומר ${roots.length} שורשים.` : 'אף ערך לא נותן 0, כלומר אין שורשים.'] };
} },

/* ===== שורשים, מעריכיות, לוגריתמים ===== */
{ id: 'ex1', t: 'exp', sub: 'חוקי חזקות', l: 1, g(r) {
  const m = r.i(2, 9), n = r.i(2, 9), k = r.i(2, 9);
  return { q: ['פשטו את הביטוי:', `$$\\frac{a^{${m}} \\cdot a^{${n}}}{a^{${k}}}`], ...mc(r, aPow(m + n - k), [aPow(m * n - k), aPow(m + n + k), aPow(m - n - k)], j => aPow(m + n - k + j)),
    ex: ['בכפל חזקות עם אותו בסיס מחברים מעריכים, ובחילוק מחסירים:', `$$a^{${m} + ${n} - ${k}} = ${aPow(m + n - k)}`] };
} },
{ id: 'ex2', t: 'exp', sub: 'משוואה מעריכית', l: 1, g(r) {
  const [B, nmax] = r.pick([[2, 7], [3, 5], [5, 3]]), n = r.i(2, nmax), c = r.nz(-3, 3);
  return { q: ['פתרו את המשוואה:', `$$${B}^{x ${pm(c)}} = ${B ** n}`], ...mc(r, `x = ${n - c}`, [`x = ${n}`, `x = ${n + c}`, `x = ${n - c + 1}`], k => `x = ${n - c - k - 1}`),
    ex: ['כותבים את שני האגפים עם אותו בסיס ומשווים מעריכים:', `$$${B}^{x ${pm(c)}} = ${B}^{${n}}`, `$$x ${pm(c)} = ${n} \\;\\Rightarrow\\; x = ${n - c}`] };
} },
{ id: 'ex3', t: 'exp', sub: 'חישוב לוגריתמים', l: 1, g(r) {
  const n = r.i(2, 6), m = r.i(1, 3);
  return { q: ['חשבו:', `$$\\log_2 ${2 ** n} + \\log_3 \\frac{1}{${3 ** m}}`], ...mc(r, `${n - m}`, [`${n + m}`, `${-(n + m)}`, `${n * m}`], k => `${n - m + k}`),
    ex: [`$$\\log_2 ${2 ** n} = ${n}`, `$$\\log_3 \\frac{1}{${3 ** m}} = \\log_3 3^{-${m}} = -${m}`, `$$${n} - ${m} = ${n - m}`] };
} },
{ id: 'ex4', t: 'exp', sub: 'חוקי לוגריתמים', l: 1, g(r) {
  const v = r.i(0, 2), k = r.i(2, 5);
  const V = [
    ['\\log_a x + \\log_a y', '\\log_a (xy)', ['\\log_a (x + y)', '\\log_a x \\cdot \\log_a y', '\\log_{2a} (xy)'], 'סכום לוגריתמים = לוגריתם של מכפלה.'],
    ['\\log_a x - \\log_a y', '\\log_a \\frac{x}{y}', ['\\frac{\\log_a x}{\\log_a y}', '\\log_a (x - y)', '\\log_a (xy)'], 'הפרש לוגריתמים = לוגריתם של מנה.'],
    [`${k}\\log_a x`, `\\log_a x^{${k}}`, [`(\\log_a x)^{${k}}`, `\\log_a (${k}x)`, `\\log_{a^{${k}}} x`], 'מקדם לפני לוגריתם נכנס כחזקה.'],
  ][v];
  return { q: ['לאיזה ביטוי שווה (עבור x, y חיוביים):', `$$${V[0]}`], ...mc(r, V[1], V[2]), ex: [V[3], `$$${V[0]} = ${V[1]}`] };
} },
{ id: 'ex5', t: 'exp', sub: 'פישוט שורשים', l: 1, g(r) {
  const k = r.i(2, 7), s = r.pick([2, 3, 5, 6, 7]);
  return { q: ['פשטו:', `$$\\sqrt{${k * k * s}}`], ...mc(r, `${k}\\sqrt{${s}}`, [`${s}\\sqrt{${k}}`, `${k * k}\\sqrt{${s}}`, `${k * s}`, `${k}\\sqrt{${k * s}}`]),
    ex: ['מפרקים לגורם שהוא ריבוע שלם:', `$$\\sqrt{${k * k * s}} = \\sqrt{${k * k}\\cdot ${s}} = \\sqrt{${k * k}}\\cdot\\sqrt{${s}} = ${k}\\sqrt{${s}}`] };
} },
{ id: 'ex6', t: 'exp', sub: 'אי-שוויון רציונלי', l: 2, g(r) {
  const a = r.i(-6, 6); let b; do { b = r.i(-6, 6); } while (b === a);
  const lo = Math.min(a, b), hi = Math.max(a, b), I = s => `x \\in ${s}`;
  return { q: ['פתרו את אי-השוויון:', `$$\\frac{${xm(a)}}{${xm(b)}} < 0`],
    ...mc(r, I(`(${lo}, ${hi})`), [I(`(-\\infty, ${lo}) \\cup (${hi}, \\infty)`), I(`[${lo}, ${hi}]`), I(`(${lo}, ${hi}]`)]),
    ex: ['שבר שלילי כשהמונה והמכנה בסימנים הפוכים. נקודות האפס:', `$$x = ${a}, \\qquad x = ${b}`, 'בדיקת סימנים מראה שהביטוי שלילי רק בין הנקודות. הקצוות לא נכללים: במונה כי 0 אינו שלילי, ובמכנה כי אסור לחלק ב-0.', `$$${I(`(${lo}, ${hi})`)}`] };
} },
{ id: 'ex7', t: 'exp', sub: 'משוואה לוגריתמית', l: 3, calm: 'שני כלים מהתיכון: חוק המכפלה של לוג ובדיקת תחום הגדרה. בשנה א\' בדיקת התחום הופכת להרגל חובה.', g(r) {
  const a = r.i(1, 4), b = r.i(1, 4), x0 = r.i(b + 1, b + 6), K = (x0 + a) * (x0 - b), x1 = b - a - x0;
  return { q: ['פתרו את המשוואה:', `$$\\log_2(x ${pm(a)}) + \\log_2(x ${pm(-b)}) = \\log_2 ${K}`],
    ...mc(r, `x = ${x0}`, [P2(x0, x1), `x = ${x1}`, '#אין פתרון']),
    ex: ['לפי חוק המכפלה משווים את מה שבתוך הלוגריתמים:', `$$(x ${pm(a)})(x ${pm(-b)}) = ${K}`, `$$${poly([[1, 'x^2'], [a - b, 'x'], [-a * b - K, '']])} = 0`, `$$${P2(x0, x1)}`,
      'בודקים תחום הגדרה — כל לוגריתם צריך ארגומנט חיובי:', `$$x > ${b}`, 'הפתרון השני נפסל, ולכן:', `$$x = ${x0}`] };
} },

/* ===== טריגונומטריה ===== */
{ id: 'tr1', t: 'trig', sub: 'ערכים מדויקים', l: 1, g(r) {
  const ang = r.pick(STD.filter(a => a[0] !== 0)), f = r.pick(['sin', 'cos']), v = fval(f, ang), o = fval(f === 'sin' ? 'cos' : 'sin', ang);
  const cor = valTex(v);
  return { q: ['מהו הערך המדויק?', `$$\\${f}\\left(${piTex(...ang)}\\right)`],
    ...mc(r, cor, [valTex(-v), valTex(o), valTex(-o)], k => r.pick(VALS.map(x => x[1]).concat(VALS.slice(1).map(x => '-' + x[1])))),
    ex: [`$$\\${f}\\left(${piTex(...ang)}\\right) = ${cor}`, 'טיפ: מקמו את הזווית על מעגל היחידה. הקואורדינטה האופקית היא cos והאנכית היא sin; הסימן נקבע לפי הרביע.'] };
} },
{ id: 'tr2', t: 'trig', sub: 'זהויות', l: 2, g(r) {
  const V = r.pick([
    ['\\frac{1 - \\cos^2 x}{\\sin x}', '\\sin x', ['\\cos x', '1', '\\tan x'], ['$$1 - \\cos^2 x = \\sin^2 x', '$$\\frac{\\sin^2 x}{\\sin x} = \\sin x']],
    ['\\frac{\\sin 2x}{2\\cos x}', '\\sin x', ['\\sin x \\cos x', '\\tan x', '\\cos x'], ['$$\\sin 2x = 2\\sin x\\cos x', '$$\\frac{2\\sin x\\cos x}{2\\cos x} = \\sin x']],
    ['(\\sin x + \\cos x)^2', '1 + \\sin 2x', ['1', '1 + \\cos 2x', '2\\sin x \\cos x'], ['$$\\sin^2 x + 2\\sin x\\cos x + \\cos^2 x', '$$= 1 + \\sin 2x']],
    ['\\cos^2 x - \\sin^2 x', '\\cos 2x', ['1', '\\sin 2x', '-1'], ['זו בדיוק נוסחת הקוסינוס של זווית כפולה:', '$$\\cos 2x = \\cos^2 x - \\sin^2 x']],
    ['\\tan x \\cdot \\cos x', '\\sin x', ['1', '\\cos^2 x', '\\frac{1}{\\sin x}'], ['$$\\frac{\\sin x}{\\cos x}\\cdot\\cos x = \\sin x']],
  ]);
  return { q: ['פשטו את הביטוי:', `$$${V[0]}`], ...mc(r, V[1], V[2]), ex: V[3] };
} },
{ id: 'tr3', t: 'trig', sub: 'משוואות טריגונומטריות', l: 2, g(r) {
  const f = r.pick(['sin', 'cos']); let ang, v;
  do { ang = r.pick(STD); v = fval(f, ang); } while (Math.abs(v) < 1e-9 || Math.abs(Math.abs(v) - 1) < 1e-9);
  const sols = solsOf(f, v), other = solsOf(f === 'sin' ? 'cos' : 'sin', v), neg = solsOf(f, -v);
  return { q: ['פתרו בתחום הנתון:', `$$\\${f} x = ${valTex(v)}, \\qquad 0 \\le x < 2\\pi`],
    ...mc(r, angList(sols), [angList(other), angList(neg), `x = ${piTex(...sols[0])}`]),
    ex: ['יש שתי זוויות בסיבוב אחד עם אותו ערך:', `$$${angList(sols)}`, f === 'sin' ? 'לסינוס: הזווית השנייה היא π פחות הראשונה (סימטריה סביב הציר האנכי).' : 'לקוסינוס: הזווית השנייה היא 2π פחות הראשונה (סימטריה סביב הציר האופקי).'] };
} },
{ id: 'tr4', t: 'trig', sub: 'מחזוריות', l: 1, g(r) {
  const k = r.i(2, 6), f = r.pick(['sin', 'cos', 'tan']), cor = f === 'tan' ? piTex(1, k) : piTex(2, k);
  return { q: ['מהו המחזור של הפונקציה?', `$$f(x) = \\${f}(${k}x)`], ...mc(r, `T = ${cor}`, [`T = ${piTex(2 * k)}`, `T = ${piTex(1, k)}`, `T = ${piTex(2, k)}`, `T = ${piTex(k)}`, `T = ${piTex(2)}`]),
    ex: [`המחזור הבסיסי של ${f} הוא ${f === 'tan' ? 'π' : '2π'}. כפל ב-${k} בתוך הפונקציה מקצר אותו פי ${k}:`, `$$T = \\frac{${f === 'tan' ? '\\pi' : '2\\pi'}}{${k}} = ${cor}`] };
} },
{ id: 'tr5', t: 'trig', sub: 'זווית כפולה', l: 2, g(r) {
  let [a, b, c] = r.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]); if (r.i(0, 1)) [a, b] = [b, a];
  return { q: ['נתון:', `$$\\sin x = ${fr(a, c)}, \\qquad 0 < x < \\frac{\\pi}{2}`, 'חשבו:', '$$\\sin 2x'],
    ...mc(r, fr(2 * a * b, c * c), [fr(2 * a, c), fr(b * b - a * a, c * c), fr(2 * a * b, c)]),
    ex: ['ברביע הראשון הקוסינוס חיובי:', `$$\\cos x = \\sqrt{1 - \\sin^2 x} = ${fr(b, c)}`, `$$\\sin 2x = 2\\sin x\\cos x = 2\\cdot ${fr(a, c)}\\cdot ${fr(b, c)} = ${fr(2 * a * b, c * c)}`] };
} },
{ id: 'tr6', t: 'trig', sub: 'משוואות טריגונומטריות', l: 3, calm: 'זו משוואה ריבועית רגילה — פשוט עם t במקום x, כש-t הוא sin x או cos x.', g(r) {
  const f = r.pick(['sin', 'cos']), [bb, cc, R] = r.pick([[-1, -1, [[1, 1], [-1, 2]]], [1, -1, [[1, 2], [-1, 1]]], [-3, 1, [[1, 1], [1, 2]]], [3, 1, [[-1, 1], [-1, 2]]]]);
  const S = roots => STD.filter(a => roots.some(([n, d]) => Math.abs(fval(f, a) - n / d) < 1e-9));
  const g = f === 'sin' ? 'cos' : 'sin', Sg = roots => STD.filter(a => roots.some(([n, d]) => Math.abs(fval(g, a) - n / d) < 1e-9));
  const cor = angList(S(R));
  return { q: ['פתרו בתחום הנתון:', `$$${poly([[2, `\\${f}^2 x`], [bb, `\\${f} x`], [cc, '']])} = 0, \\qquad 0 \\le x < 2\\pi`],
    ...mc(r, cor, [angList(S(R.map(([n, d]) => [-n, d]))), angList(S([R[0]])), angList(S([R[1]])), angList(Sg(R))]),
    ex: ['מציבים', `$$t = \\${f} x`, `$$${poly([[2, 't^2'], [bb, 't'], [cc, '']])} = 0 \\;\\Rightarrow\\; t = ${fr(...R[0])}, \\; t = ${fr(...R[1])}`, 'ופותרים כל משוואה בנפרד בתחום הנתון:', `$$${cor}`] };
} },
{ id: 'tr7', t: 'trig', sub: 'פתרון כללי', l: 3, calm: 'מחלקים ב-cos ומקבלים tan x = מספר. הפתרון הכללי הוא רק "עוד מחזור, ועוד מחזור..." כתוב בקיצור.', g(r) {
  const [eq, t, base] = r.pick([['\\sin x = \\cos x', '1', [1, 4]], ['\\sin x = -\\cos x', '-1', [3, 4]], ['\\sin x = \\sqrt{3}\\cos x', '\\sqrt{3}', [1, 3]], ['\\sqrt{3}\\sin x = \\cos x', '\\frac{1}{\\sqrt{3}}', [1, 6]]]);
  const B = piTex(...base), X = s => `x = ${s}`;
  return { q: ['מצאו את כל הפתרונות של המשוואה ($k$ מספר שלם):', `$$${eq}`],
    ...mc(r, X(`${B} + \\pi k`), [X(`${B} + 2\\pi k`), X(`\\pm ${B} + 2\\pi k`), X(`${B} + \\frac{\\pi k}{2}`)]),
    ex: ['מחלקים ב-cos x (בפתרונות הוא לא מתאפס — אחרת גם sin x היה 0, וזה בלתי אפשרי):', `$$\\tan x = ${t}`, 'לטנגנס מחזור π, לכן:', `$$${X(`${B} + \\pi k`)}`] };
} },

/* ===== וקטורים ===== */
{ id: 'vc1', t: 'vec', sub: 'פעולות על וקטורים', l: 1, g(r) {
  const n = r.i(2, 3), u = [...Array(n)].map(() => r.i(-5, 5)), v = [...Array(n)].map(() => r.i(-5, 5));
  const L = (p, q) => vec(u.map((x, i) => p * x + q * v[i]));
  return { q: ['נתונים הווקטורים:', `$$\\vec{u} = ${vec(u)}, \\qquad \\vec{v} = ${vec(v)}`, 'חשבו:', '$$2\\vec{u} - \\vec{v}'],
    ...mc(r, L(2, -1), [L(2, 1), L(1, -1), L(2, -2), L(-2, 1)], k => vec(u.map((x, i) => 2 * x - v[i] + k))),
    ex: ['מכפילים כל רכיב ב-2 ומחסירים רכיב-רכיב:', `$$2${vec(u)} - ${vec(v)} = ${L(2, -1)}`] };
} },
{ id: 'vc2', t: 'vec', sub: 'אורך וקטור', l: 1, g(r) {
  let u; do { u = [r.i(-6, 6), r.i(-6, 6), r.i(-6, 6)]; } while (u.filter(x => x).length < 2);
  const n = u.reduce((s, x) => s + x * x, 0), ab = u.reduce((s, x) => s + Math.abs(x), 0);
  return { q: ['מהו אורך הווקטור?', `$$\\vec{u} = ${vec(u)}`], ...mc(r, sqrtTex(n), [`${n}`, `${ab}`, sqrtTex(ab)], k => sqrtTex(n + k)),
    ex: [`$$|\\vec{u}| = \\sqrt{${u.map(x => par(x) + '^2').join(' + ')}} = \\sqrt{${n}} = ${sqrtTex(n)}`] };
} },
{ id: 'vc3', t: 'vec', sub: 'מכפלה סקלרית', l: 1, g(r) {
  const u = [r.nz(-5, 5), r.i(-5, 5), r.nz(-5, 5)], v = [r.nz(-5, 5), r.i(-5, 5), r.i(-5, 5)], pr = u.map((x, i) => x * v[i]), d = pr.reduce((a, b) => a + b, 0);
  return { q: ['חשבו את המכפלה הסקלרית:', `$$\\vec{u} = ${vec(u)}, \\qquad \\vec{v} = ${vec(v)}`], ...mc(r, `${d}`, [`${d - 2 * pr[0]}`, vec(pr), `${u.concat(v).reduce((a, b) => a + b, 0)}`], k => `${d + k}`),
    ex: ['כופלים רכיב ברכיב ומחברים — התוצאה היא מספר, לא וקטור:', `$$\\vec{u}\\cdot\\vec{v} = ${u.map((x, i) => `${par(x)}\\cdot${par(v[i])}`).join(' + ')} = ${d}`] };
} },
{ id: 'vc4', t: 'vec', sub: 'ניצבות', l: 2, g(r) {
  const a = r.nz(-5, 5), c = r.nz(-4, 4), m = r.nz(-3, 3), k = a * m, b = -m * c;
  return { q: ['עבור איזה ערך של $k$ הווקטורים מאונכים זה לזה?', `$$\\vec{u} = (${a}, k), \\qquad \\vec{v} = (${b}, ${c})`], ...mc(r, `k = ${k}`, [`k = ${-k}`, `k = ${fr(c, a)}`, `k = ${b}`], j => `k = ${k + j}`),
    ex: ['וקטורים מאונכים אם ורק אם המכפלה הסקלרית שלהם אפס:', `$$${a}\\cdot${par(b)} + k\\cdot${par(c)} = 0`, `$$${poly([[c, 'k']])} = ${-a * b} \\;\\Rightarrow\\; k = ${k}`] };
} },
{ id: 'vc5', t: 'vec', sub: 'זווית בין וקטורים', l: 3, calm: 'אותה מכפלה סקלרית מהתיכון. באלגברה לינארית עושים בדיוק את זה — רק לפעמים עם יותר רכיבים.', g(r) {
  let [u, v, ang] = r.pick([[[1, 1, 0], [0, 1, 1], [1, 3]], [[1, 0, 0], [1, 1, 0], [1, 4]], [[1, 0, 1], [-1, 1, 0], [2, 3]], [[1, 2, 3], [3, 0, -1], [1, 2]], [[1, 0, 0], [-1, 1, 0], [3, 4]], [[1, -1, 0], [0, 1, -1], [2, 3]], [[1, 1, 1], [1, 1, -2], [1, 2]]]);
  const s1 = r.i(1, 3), s2 = r.i(1, 2), perm = r.shuffle([0, 1, 2]);
  u = perm.map(i => u[i] * s1); v = perm.map(i => v[i] * s2);
  const d = u.reduce((s, x, i) => s + x * v[i], 0), nu = u.reduce((s, x) => s + x * x, 0), nv = v.reduce((s, x) => s + x * x, 0);
  const T = a => `\\theta = ${piTex(...a)}`, pool = [[1, 6], [1, 4], [1, 3], [1, 2], [2, 3], [3, 4], [5, 6]].filter(a => a[0] / a[1] !== ang[0] / ang[1]);
  return { q: ['מהי הזווית בין הווקטורים?', `$$\\vec{u} = ${vec(u)}, \\qquad \\vec{v} = ${vec(v)}`], ...mc(r, T(ang), r.shuffle(pool).map(T)),
    ex: [`$$\\cos\\theta = \\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|} = \\frac{${d}}{${sqrtTex(nu)}\\cdot ${sqrtTex(nv)}} = ${valTex(d / Math.sqrt(nu * nv))}`, `$$${T(ang)}`] };
} },
{ id: 'vc6', t: 'vec', sub: 'צירוף לינארי', l: 3, src: 'אלגברה לינארית', calm: '"צירוף לינארי" נשמע מפחיד, אבל זו מערכת של שתי משוואות בשני נעלמים — חומר של כיתה ט\'.', g(r) {
  let u, v; do { u = [r.i(-4, 4), r.i(-4, 4)]; v = [r.i(-4, 4), r.i(-4, 4)]; } while (u[0] * v[1] - u[1] * v[0] === 0);
  const al = r.nz(-4, 4), be = r.nz(-4, 4), w = [al * u[0] + be * v[0], al * u[1] + be * v[1]], A = (x, y) => `\\alpha = ${x}, \\; \\beta = ${y}`;
  return { q: ['מצאו מקדמים $\\alpha, \\beta$ כך ש:', `$$\\alpha${vec(u)} + \\beta${vec(v)} = ${vec(w)}`],
    ...mc(r, A(al, be), [A(be, al), A(-al, be), A(al, -be)], k => A(al + k, be)),
    ex: ['משווים רכיב-רכיב ומקבלים מערכת:', `$$\\begin{cases} ${poly([[u[0], '\\alpha'], [v[0], '\\beta']])} = ${w[0]} \\\\ ${poly([[u[1], '\\alpha'], [v[1], '\\beta']])} = ${w[1]} \\end{cases}`, 'פותרים כמו כל מערכת 2×2:', `$$${A(al, be)}`] };
} },

/* ===== גאומטריה אנליטית ===== */
{ id: 'ge1', t: 'geo', sub: 'מרחק בין נקודות', l: 1, g(r) {
  let x1, y1, x2, y2; do { x1 = r.i(-6, 6); y1 = r.i(-6, 6); x2 = r.i(-6, 6); y2 = r.i(-6, 6); } while (x1 === x2 || y1 === y2);
  const dx = x2 - x1, dy = y2 - y1, n = dx * dx + dy * dy;
  return { q: ['מהו המרחק בין הנקודות?', `$$A${vec([x1, y1])}, \\qquad B${vec([x2, y2])}`], ...mc(r, sqrtTex(n), [`${Math.abs(dx) + Math.abs(dy)}`, `${n}`, dx * dx !== dy * dy ? sqrtTex(Math.abs(dx * dx - dy * dy)) : null], k => sqrtTex(n + k)),
    ex: [`$$d = \\sqrt{(${x2} - ${par(x1)})^2 + (${y2} - ${par(y1)})^2} = \\sqrt{${dx * dx} + ${dy * dy}} = ${sqrtTex(n)}`] };
} },
{ id: 'ge2', t: 'geo', sub: 'אמצע קטע', l: 1, g(r) {
  const x1 = r.i(-8, 8), y1 = r.i(-8, 8), x2 = x1 + 2 * r.nz(-4, 4), y2 = y1 + 2 * r.nz(-4, 4), mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  return { q: ['מהי נקודת האמצע של הקטע AB?', `$$A${vec([x1, y1])}, \\qquad B${vec([x2, y2])}`],
    ...mc(r, vec([mx, my]), [vec([(x2 - x1) / 2, (y2 - y1) / 2]), vec([x1 + x2, y1 + y2]), vec([my, mx])], k => vec([mx + k, my])),
    ex: ['ממוצע של השיעורים:', `$$M = \\left(\\frac{${x1} + ${par(x2)}}{2}, \\frac{${y1} + ${par(y2)}}{2}\\right) = ${vec([mx, my])}`] };
} },
{ id: 'ge3', t: 'geo', sub: 'משוואת ישר', l: 1, g(r) {
  const m = r.nz(-4, 4), b = r.nz(-6, 6), x1 = r.i(-4, 4), x2 = x1 + r.i(1, 4), y1 = m * x1 + b, y2 = m * x2 + b, Y = (p, q) => `y = ${poly([[p, 'x'], [q, '']])}`;
  return { q: ['מהי משוואת הישר העובר דרך הנקודות?', `$$A${vec([x1, y1])}, \\qquad B${vec([x2, y2])}`], ...mc(r, Y(m, b), [Y(-m, b), Y(m, -b), Y(m, y1)], k => Y(m, b + k)),
    ex: [`$$m = \\frac{${y2} - ${par(y1)}}{${x2} - ${par(x1)}} = ${m}`, 'מציבים נקודה אחת:', `$$y - ${par(y1)} = ${m}(x - ${par(x1)})`, `$$${Y(m, b)}`] };
} },
{ id: 'ge4', t: 'geo', sub: 'מעגל', l: 2, g(r) {
  let a, b; do { a = r.i(-5, 5); b = r.i(-5, 5); } while (a === 0 && b === 0);
  const R = r.i(2, 6), c = a * a + b * b - R * R, C = (p, q, s) => `(${p}, ${q}), \\; R = ${s}`, sq = (v, n) => v === 0 ? `${n}^2` : `(${n} ${pm(-v)})^2`;
  return { q: ['מהם המרכז והרדיוס של המעגל?', `$$${poly([[1, 'x^2'], [1, 'y^2'], [-2 * a, 'x'], [-2 * b, 'y'], [c, '']])} = 0`],
    ...mc(r, C(a, b, R), [C(-a, -b, R), C(a, b, R * R), C(-a, -b, R * R)], k => C(a, b, R + k)),
    ex: ['משלימים לריבוע בכל משתנה:', `$$${sq(a, 'x')} + ${sq(b, 'y')} = ${R * R}`, 'המרכז והרדיוס:', `$$(${a}, ${b}), \\qquad R = \\sqrt{${R * R}} = ${R}`] };
} },
{ id: 'ge5', t: 'geo', sub: 'מרחק נקודה מישר', l: 3, calm: 'נוסחה אחת מהתיכון. בשנה א\' מכלילים אותה למרחק של נקודה ממישור במרחב — באותה צורה בדיוק.', g(r) {
  let [A, B] = r.pick([[3, 4], [4, 3], [5, 12], [12, 5], [6, 8]]); A *= r.pick([1, -1]); B *= r.pick([1, -1]);
  const C = r.nz(-10, 10), x0 = r.i(-5, 5), y0 = r.i(-5, 5), n = Math.round(Math.hypot(A, B)), N = A * x0 + B * y0 + C;
  if (N === 0) return GENS_BY_ID.ge5.g(r);
  return { q: ['מהו המרחק של הנקודה מהישר?', `$$P${vec([x0, y0])}, \\qquad ${poly([[A, 'x'], [B, 'y'], [C, '']])} = 0`],
    ...mc(r, fr(Math.abs(N), n), [fr(Math.abs(N), n * n), `${Math.abs(N)}`, fr(Math.abs(A * x0 + B * y0), n)], k => fr(Math.abs(N) + k, n)),
    ex: [`$$d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}} = \\frac{|${A}\\cdot${par(x0)} + ${par(B)}\\cdot${par(y0)} + ${par(C)}|}{\\sqrt{${A * A} + ${B * B}}} = \\frac{${Math.abs(N)}}{${n}}`] };
} },
{ id: 'ge6', t: 'geo', sub: 'משיק למעגל', l: 3, calm: 'הרעיון היחיד: הרדיוס ניצב למשיק. מזה יוצאת המשוואה בשורה אחת.', g(r) {
  let [x0, y0, R] = r.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [6, 8, 10], [8, 6, 10]]); x0 *= r.pick([1, -1]); y0 *= r.pick([1, -1]);
  const L = (p, q, s) => `${poly([[p, 'x'], [q, 'y']])} = ${s}`;
  return { q: ['מהי משוואת המשיק למעגל בנקודה P?', `$$x^2 + y^2 = ${R * R}, \\qquad P${vec([x0, y0])}`], ...mc(r, L(x0, y0, R * R), [L(x0, -y0, R * R), L(y0, x0, R * R), L(x0, y0, R)]),
    ex: ['הרדיוס לנקודת ההשקה ניצב למשיק, ולכן הווקטור', `$$${vec([x0, y0])}`, 'הוא נורמל למשיק:', `$$${x0}(${xm(x0).replace('x', 'x')}) ${y0 < 0 ? '-' : '+'} ${Math.abs(y0)}(${xm(y0).replace('x', 'y')}) = 0`, `$$${L(x0, y0, R * R)}`] };
} },

/* ===== מספרים מרוכבים ===== */
{ id: 'cx1', t: 'cx', sub: 'כפל מרוכבים', l: 1, g(r) {
  const a = r.nz(-5, 5), b = r.nz(-5, 5), c = r.nz(-5, 5), d = r.nz(-5, 5), [re, im] = cmul([a, b], [c, d]);
  return { q: ['חשבו:', `$$(${cx(a, b)})(${cx(c, d)})`], ...mc(r, cx(re, im), [cx(a * c + b * d, im), cx(a * c, b * d), cx(re, a * d - b * c)], k => cx(re + k, im)),
    ex: ['פותחים סוגריים:', `$$${a * c} + ${par(a * d)}i + ${par(b * c)}i + ${par(b * d)}i^2`, 'ומכיוון ש-$i^2 = -1$:', `$$= ${cx(re, im)}`] };
} },
{ id: 'cx2', t: 'cx', sub: 'ערך מוחלט', l: 1, g(r) {
  const a = r.nz(-8, 8), b = r.nz(-8, 8), n = a * a + b * b;
  return { q: ['מהו הערך המוחלט של המספר?', `$$z = ${cx(a, b)}`], ...mc(r, `|z| = ${sqrtTex(n)}`, [`|z| = ${Math.abs(a) + Math.abs(b)}`, `|z| = ${n}`, a * a !== b * b ? `|z| = ${sqrtTex(Math.abs(a * a - b * b))}` : null], k => `|z| = ${sqrtTex(n + k)}`),
    ex: [`$$|z| = \\sqrt{${par(a)}^2 + ${par(b)}^2} = \\sqrt{${n}} = ${sqrtTex(n)}`] };
} },
{ id: 'cx3', t: 'cx', sub: 'חילוק מרוכבים', l: 2, g(r) {
  const p = r.nz(-5, 5), q = r.nz(-5, 5), c = r.nz(-4, 4), d = r.nz(-4, 4), num = cmul([p, q], [c, d]), N = c * c + d * d;
  return { q: ['חשבו:', `$$\\frac{${cx(...num)}}{${cx(c, d)}}`], ...mc(r, cx(p, q), [cx(p, -q), cx(-p, q), cx(q, p)], k => cx(p + k, q)),
    ex: ['כופלים מונה ומכנה בצמוד של המכנה:', `$$\\frac{${cx(...num)}}{${cx(c, d)}}\\cdot\\frac{${cx(c, -d)}}{${cx(c, -d)}} = \\frac{${cx(p * N, q * N)}}{${N}} = ${cx(p, q)}`] };
} },
{ id: 'cx4', t: 'cx', sub: 'חזקות של i', l: 1, g(r) {
  const n = r.i(5, 99), all = ['1', 'i', '-1', '-i'];
  return { q: ['חשבו:', `$$i^{${n}}`], ...mc(r, all[n % 4], all.filter((_, j) => j !== n % 4)),
    ex: ['החזקות של i חוזרות במחזור של 4:', '$$i^1 = i, \\; i^2 = -1, \\; i^3 = -i, \\; i^4 = 1', `$$${n} = 4\\cdot ${Math.floor(n / 4)} + ${n % 4} \\;\\Rightarrow\\; i^{${n}} = i^{${n % 4}} = ${all[n % 4]}`] };
} },
{ id: 'cx5', t: 'cx', sub: 'דה-מואבר', l: 3, src: 'אלגברה לינארית, שבוע 2: מספרים מרוכבים', calm: 'במקום לפתוח סוגריים פעמים רבות, עוברים להצגה קוטבית ומשתמשים בדה-מואבר: החזקה פשוט כופלת את הזווית.', g(r) {
  const n = r.pick([4, 6, 8, 10, 12]), s = r.pick([1, -1]); let z = [1, 0]; for (let k = 0; k < n; k++) z = cmul(z, [1, s]);
  const base = s === 1 ? '1 + i' : '1 - i';
  return { q: ['חשבו:', `$$(${base})^{${n}}`], ...mc(r, cx(...z), [cx(-z[0], -z[1]), `${2 ** (n / 2)}`, cx(0, 2 ** n), cx(z[1], z[0])], k => cx(z[0] + k, z[1])),
    ex: ['בהצגה קוטבית:', `$$${base} = \\sqrt{2}\\,\\operatorname{cis}\\left(${piTex(s, 4)}\\right)`, 'לפי דה-מואבר:', `$$(${base})^{${n}} = (\\sqrt{2})^{${n}}\\operatorname{cis}\\left(${piTex(s * n, 4)}\\right) = ${2 ** (n / 2)}\\operatorname{cis}\\left(${piTex(s * n, 4)}\\right) = ${cx(...z)}`] };
} },
{ id: 'cx6', t: 'cx', sub: 'משוואה ריבועית מרוכבת', l: 3, calm: 'אותה נוסחת שורשים מהתיכון. ההבדל: כשהדיסקרימיננטה שלילית, לא עוצרים — כותבים את השורש שלה עם i.', g(r) {
  const a = r.nz(-5, 5), b = r.i(1, 5), Z = (re, im) => `z = ${re === 0 ? '' : re + ' '}\\pm ${im === 1 ? '' : im}i`;
  return { q: ['פתרו מעל המרוכבים:', `$$${poly([[1, 'z^2'], [2 * a, 'z'], [a * a + b * b, '']])} = 0`],
    ...mc(r, Z(-a, b), [Z(a, b), `z = ${-a} \\pm ${b}`, Z(-b, Math.abs(a))], k => Z(-a, b + k)),
    ex: [`$$\\Delta = ${4 * a * a} - ${4 * (a * a + b * b)} = ${-4 * b * b}, \\qquad \\sqrt{\\Delta} = ${2 * b}i`, `$$z = \\frac{${-2 * a} \\pm ${2 * b}i}{2}`, `$$${Z(-a, b)}`] };
} },
{ id: 'cx7', t: 'cx', sub: 'הצגה קוטבית', l: 3, calm: 'הצגה קוטבית = אורך + זווית, בדיוק כמו וקטור במישור. את הזווית מוצאים ממעגל היחידה.', g(r) {
  const ang = r.pick(STD.filter(([n, d]) => d !== 1 && d !== 2)), R = r.i(1, 4);
  const cs = fval('cos', ang), sn = fval('sin', ang);
  const part = v => { const a = Math.abs(v); const [n, d, q] = Math.abs(a - .5) < 1e-9 ? [1, 2, 1] : Math.abs(a - Math.SQRT2 / 2) < 1e-9 ? [1, 2, 2] : Math.abs(a - Math.sqrt(3) / 2) < 1e-9 ? [1, 2, 3] : [1, 1, 1];
    const g = gcd(R * n, d), N = R * n / g, D = d / g; const c = N === 1 ? '' : N;
    const tex = q === 1 ? fr(N, D) : D === 1 ? `${c}\\sqrt{${q}}` : `\\frac{${c}\\sqrt{${q}}}{${D}}`; return { neg: v < 0, tex }; };
  const re = part(cs), im = part(sn);
  const z = `${re.neg ? '-' : ''}${re.tex} ${im.neg ? '-' : '+'} ${im.tex === '1' ? '' : im.tex + '\\,'}i`;
  const C = a => `${R === 1 ? '' : R}\\operatorname{cis}\\left(${piTex(...a)}\\right)`;
  const neg = [(2 * ang[1] - ang[0]) % (2 * ang[1]), ang[1]], sup = [ang[1] - ang[0] + 2 * ang[1], ang[1]].map((x, i) => i ? x : x % (2 * ang[1])), opp = [(ang[0] + ang[1]) % (2 * ang[1]), ang[1]];
  return { q: ['כתבו בהצגה קוטבית:', `$$z = ${z}`], ...mc(r, C(ang), [C(neg), C(sup), C(opp)]),
    ex: [`$$|z| = ${R}`, 'הזווית נקבעת לפי הרביע שבו נמצא z:', `$$\\cos\\theta = ${valTex(cs)}, \\quad \\sin\\theta = ${valTex(sn)} \\;\\Rightarrow\\; \\theta = ${piTex(...ang)}`, `$$z = ${C(ang)}`, 'תזכורת: cis θ = cos θ + i sin θ.'] };
} },

/* ===== גבולות ונגזרות ===== */
{ id: 'li1', t: 'lim', sub: 'גבול באינסוף', l: 1, g(r) {
  const ty = r.i(0, 2), a = r.nz(-6, 6), d = r.i(1, 5), b = r.nz(-5, 5), e = r.nz(-5, 5);
  const num = [poly([[a, 'x^2'], [b, 'x'], [e, '']]), poly([[a, 'x'], [b, '']]), poly([[a, 'x^3'], [b, '']])][ty], den = poly([[d, 'x^2'], [e, '']]);
  const cor = [fr(a, d), '0', a > 0 ? '\\infty' : '-\\infty'][ty];
  return { q: ['חשבו:', `$$\\lim_{x\\to\\infty} \\frac{${num}}{${den}}`], ...mc(r, cor, [fr(a, d), '0', '\\infty', '-\\infty', fr(d, a), fr(b, e)]),
    ex: ['מחלקים מונה ומכנה בחזקה הגבוהה ביותר של x במכנה, כלומר ב-x²:', ['המעלות שוות, ולכן הגבול הוא מנת המקדמים המובילים:', 'מעלת המונה קטנה ממעלת המכנה, ולכן הגבול 0:', 'מעלת המונה גדולה ממעלת המכנה, ולכן הביטוי שואף לאינסוף בסימן של מנת המקדמים המובילים:'][ty], `$$${cor}`] };
} },
{ id: 'li2', t: 'lim', sub: 'גבול מסוג 0/0', l: 2, g(r) {
  const k = r.nz(-5, 5); let m; do { m = r.i(-6, 6); } while (m === k);
  return { q: ['חשבו:', `$$\\lim_{x\\to ${k}} \\frac{${poly([[1, 'x^2'], [-(k + m), 'x'], [k * m, '']])}}{${xm(k)}}`], ...mc(r, `${k - m}`, ['0', '#הגבול לא קיים', `${k + m}`], j => `${k - m + j}`),
    ex: ['הצבה ישירה נותנת 0/0, לכן מפרקים את המונה ומצמצמים:', `$$\\frac{(${xm(k)})(${xm(m)})}{${xm(k)}} = ${xm(m)}`, `$$\\lim_{x\\to ${k}} (${xm(m)}) = ${k - m}`] };
} },
{ id: 'li3', t: 'lim', sub: 'נגזרת של פולינום', l: 1, g(r) {
  const a = r.nz(-6, 6), n = r.i(3, 6), b = r.nz(-6, 6), m = r.i(1, 2), c = r.nz(-9, 9), F = s => `f'(x) = ${s}`;
  return { q: ['גזרו:', `$$f(x) = ${poly([[a, xp(n)], [b, xp(m)], [c, '']])}`],
    ...mc(r, F(poly([[a * n, xp(n - 1)], [b * m, xp(m - 1)]])), [F(poly([[a * n, xp(n)], [b * m, xp(m)]])), F(poly([[a * n, xp(n - 1)], [b * m, xp(m - 1)], [c, '']])), F(poly([[a, xp(n - 1)], [b, xp(m - 1)]]))]),
    ex: ['גוזרים כל איבר לפי כלל החזקה, ונגזרת של קבוע היא 0:', '$$(x^n)\' = n x^{n-1}', `$$${F(poly([[a * n, xp(n - 1)], [b * m, xp(m - 1)]]))}`] };
} },
{ id: 'li4', t: 'lim', sub: 'כלל השרשרת', l: 2, g(r) {
  const a = r.i(2, 5), b = r.nz(-6, 6), n = r.i(2, 6), inner = poly([[a, 'x'], [b, '']]), P = e => e === 1 ? `(${inner})` : `(${inner})^{${e}}`, F = s => `f'(x) = ${s}`;
  return { q: ['גזרו:', `$$f(x) = ${P(n)}`], ...mc(r, F(`${n * a}${P(n - 1)}`), [F(`${n}${P(n - 1)}`), F(`${n * a}${P(n)}`), F(`${a}${P(n - 1)}`)], k => F(`${n * a + k}${P(n - 1)}`)),
    ex: ['כלל השרשרת: נגזרת חיצונית כפול נגזרת פנימית:', `$$f'(x) = ${n}${P(n - 1)}\\cdot ${a} = ${n * a}${P(n - 1)}`] };
} },
{ id: 'li5', t: 'lim', sub: 'משוואת משיק', l: 2, g(r) {
  const b = r.i(-5, 5), c = r.i(-5, 5), x0 = r.nz(-3, 3), m = 2 * x0 + b, y0 = x0 * x0 + b * x0 + c, n = y0 - m * x0, Y = (p, q) => `y = ${poly([[p, 'x'], [q, '']])}`;
  return { q: [`מהי משוואת המשיק לגרף הפונקציה בנקודה שבה $x = ${x0}$?`, `$$f(x) = ${poly([[1, 'x^2'], [b, 'x'], [c, '']])}`],
    ...mc(r, Y(m, n), [Y(m, y0), Y(-m, y0 + m * x0), Y(y0, n)], k => Y(m, n + k)),
    ex: [`$$f'(x) = ${poly([[2, 'x'], [b, '']])} \\;\\Rightarrow\\; m = f'(${x0}) = ${m}`, `$$f(${x0}) = ${y0}`, `$$y - ${par(y0)} = ${m}(x - ${par(x0)}) \\;\\Rightarrow\\; ${Y(m, n)}`] };
} },
{ id: 'li6', t: 'lim', sub: 'גבול טריגונומטרי', l: 3, calm: 'הגבול המפורסם sin t / t → 1. כל מה שצריך הוא לסדר את הביטוי כך שיופיע בדיוק בצורה הזו.', g(r) {
  const a = r.i(2, 7); let b; do { b = r.i(2, 7); } while (b === a);
  return { q: ['חשבו:', `$$\\lim_{x\\to 0} \\frac{\\sin(${a}x)}{${b}x}`], ...mc(r, fr(a, b), [fr(b, a), '1', '0']),
    ex: [`$$\\frac{\\sin(${a}x)}{${b}x} = \\frac{${a}}{${b}}\\cdot\\frac{\\sin(${a}x)}{${a}x}`, 'וכאשר x שואף ל-0:', `$$\\frac{\\sin(${a}x)}{${a}x} \\to 1 \\;\\Rightarrow\\; \\lim = ${fr(a, b)}`] };
} },
{ id: 'li7', t: 'lim', sub: 'הגדרת הנגזרת', l: 3, src: 'אינפי 1', calm: 'זו ההגדרה של הנגזרת. אפשר לחשב ישירות, או פשוט לזהות שזו f\'(a) ולגזור עם כללי הגזירה מהתיכון.', g(r) {
  const k = r.nz(-4, 4), v = r.i(0, 2), c = r.nz(-5, 5);
  const V = [['x^3', 3 * k * k, [k ** 3, 3 * k, 0]], [poly([[1, 'x^2'], [c, 'x']]), 2 * k + c, [k * k + c * k, 2 * k, c]], ['\\frac{1}{x}', null, null]][v];
  if (v === 2) return { q: ['נתון:', '$$f(x) = \\frac{1}{x}', 'חשבו:', `$$\\lim_{h\\to 0} \\frac{f(${k} + h) - f(${k})}{h}`], ...mc(r, fr(-1, k * k), [fr(1, k * k), fr(-1, k), '0'], j => fr(-1 - j, k * k)),
    ex: ['זו בדיוק ההגדרה של הנגזרת בנקודה:', `$$f'(x) = -\\frac{1}{x^2} \\;\\Rightarrow\\; f'(${k}) = ${fr(-1, k * k)}`] };
  return { q: ['נתון:', `$$f(x) = ${V[0]}`, 'חשבו:', `$$\\lim_{h\\to 0} \\frac{f(${k} + h) - f(${k})}{h}`], ...mc(r, `${V[1]}`, V[2].map(String), j => `${V[1] + j}`),
    ex: ['זו בדיוק ההגדרה של הנגזרת בנקודה, לכן:', `$$f'(x) = ${v === 0 ? '3x^2' : poly([[2, 'x'], [c, '']])} \\;\\Rightarrow\\; f'(${k}) = ${V[1]}`] };
} },
{ id: 'li8', t: 'lim', sub: 'גבול של e', l: 3, src: 'אינפי 1: גבול של סדרה', calm: 'גבול יסודי אחד, שמופיע בכל קורס אינפי. מזהים אותו ומסיימים.', g(r) {
  const k = r.i(2, 5), v = r.i(0, 1), expr = v ? `\\left(1 + \\frac{${k}}{n}\\right)^{n}` : `\\left(1 + \\frac{1}{n}\\right)^{${k}n}`;
  return { q: ['חשבו:', `$$\\lim_{n\\to\\infty} ${expr}`], ...mc(r, `e^{${k}}`, ['1', '\\infty', 'e', `e^{\\frac{1}{${k}}}`]),
    ex: ['הגבול היסודי:', '$$\\lim_{n\\to\\infty}\\left(1 + \\frac{1}{n}\\right)^{n} = e', v ? 'ובאופן כללי:' : 'ולכן:', v ? `$$\\left(1 + \\frac{${k}}{n}\\right)^{n} \\to e^{${k}}` : `$$\\left[\\left(1 + \\frac{1}{n}\\right)^{n}\\right]^{${k}} \\to e^{${k}}`, 'שימו לב: התשובה אינה 1. הבסיס שואף ל-1 אבל המעריך שואף לאינסוף — זו צורה לא מוגדרת.'] };
} },

/* ===== חקירת פונקציות ===== */
{ id: 'cv1', t: 'crv', sub: 'נקודות קיצון', l: 2, g(r) {
  const a = r.i(1, 4), s = r.pick([1, -1]), M = (mx, mn) => `\\max:\\ x = ${mx}, \\quad \\min:\\ x = ${mn}`;
  const [mx, mn] = s === 1 ? [-a, a] : [a, -a];
  return { q: ['מצאו את נקודות הקיצון של הפונקציה:', `$$f(x) = ${poly([[s, 'x^3'], [-3 * s * a * a, 'x']])}`], ...mc(r, M(mx, mn), [M(mn, mx), M(-a * a, a * a), M(0, mn)], k => M(mx * (k + 1), mn * (k + 1))),
    ex: [`$$f'(x) = ${poly([[3 * s, 'x^2'], [-3 * s * a * a, '']])} = 0 \\;\\Rightarrow\\; x = \\pm ${a}`, 'בודקים סימן של הנגזרת (או את הנגזרת השנייה):', `$$f''(x) = ${poly([[6 * s, 'x']])}`, `$$${M(mx, mn)}`] };
} },
{ id: 'cv2', t: 'crv', sub: 'תחומי עלייה וירידה', l: 1, g(r) {
  const h = r.nz(-5, 5), k = r.i(-5, 5), s = r.pick([1, -1]);
  return { q: ['באיזה תחום הפונקציה עולה?', `$$f(x) = ${s < 0 ? '-' : ''}(${xm(h)})^2 ${k ? pm(k) : ''}`], ...mc(r, s < 0 ? `x < ${h}` : `x > ${h}`, [s < 0 ? `x > ${h}` : `x < ${h}`, `x < ${-h}`, `x > ${-h}`]),
    ex: [`זו פרבולה ${s < 0 ? 'בוכה (מקסימום)' : 'מחייכת (מינימום)'} שהקודקוד שלה ב-$x = ${h}$.`, s < 0 ? 'היא עולה עד הקודקוד ויורדת אחריו:' : 'היא יורדת עד הקודקוד ועולה אחריו:', `$$${s < 0 ? `x < ${h}` : `x > ${h}`}`] };
} },
{ id: 'cv3', t: 'crv', sub: 'אסימפטוטות', l: 2, g(r) {
  let a, b, c; do { a = r.nz(-5, 5); b = r.nz(-6, 6); c = r.nz(-5, 5); } while (a * c + b === 0 || a === c);
  const A = (v, h) => `x = ${v}, \\; y = ${h}`;
  return { q: ['מהן האסימפטוטות של הפונקציה?', `$$f(x) = \\frac{${poly([[a, 'x'], [b, '']])}}{${xm(c)}}`], ...mc(r, A(c, a), [A(-c, a), A(c, fr(-b, c)), A(a, c)], k => A(c, a + k)),
    ex: ['אנכית: היכן שהמכנה מתאפס (והמונה לא):', `$$x = ${c}`, 'אופקית: המעלות שוות, לכן מנת המקדמים המובילים:', `$$y = \\frac{${a}}{1} = ${a}`] };
} },
{ id: 'cv4', t: 'crv', sub: 'נקודת פיתול', l: 2, g(r) {
  const t = r.nz(-3, 3), b = 3 * t, d = r.i(-6, 6), e = r.i(-6, 6);
  return { q: ['מהי נקודת הפיתול (שיעור x) של הפונקציה?', `$$f(x) = ${poly([[1, 'x^3'], [b, 'x^2'], [d, 'x'], [e, '']])}`], ...mc(r, `x = ${-t}`, [`x = ${t}`, `x = ${-b}`, `x = ${fr(-2 * b, 3)}`], k => `x = ${-t + k}`),
    ex: [`$$f''(x) = ${poly([[6, 'x'], [2 * b, '']])} = 0 \\;\\Rightarrow\\; x = ${-t}`, 'והנגזרת השנייה מחליפה שם סימן, לכן זו נקודת פיתול.'] };
} },
{ id: 'cv5', t: 'crv', sub: 'מספר פתרונות', l: 3, calm: 'מספר פתרונות = מספר נקודות חיתוך של הגרף עם קו אופקי. חקירה רגילה וציור קטן — וזהו.', g(r) {
  const a = r.i(1, 2), M = 2 * a ** 3, m = r.pick([0, M - 1, -(M - 1), M, -M, M + 1, -(M + 1), M + 3]), cnt = Math.abs(m) < M ? 3 : Math.abs(m) === M ? 2 : 1;
  return { q: ['כמה פתרונות ממשיים יש למשוואה?', `$$${poly([[1, 'x^3'], [-3 * a * a, 'x']])} = ${m}`], ...mc(r, `${cnt}`, ['0', '1', '2', '3'].filter(v => v !== `${cnt}`)),
    ex: ['חוקרים את הפונקציה:', `$$f(x) = ${poly([[1, 'x^3'], [-3 * a * a, 'x']])}`, `$$f'(x) = 3x^2 - ${3 * a * a} = 0 \\;\\Rightarrow\\; x = \\pm ${a}`, `$$f(${-a}) = ${M} \\;(\\max), \\qquad f(${a}) = ${-M} \\;(\\min)`,
      `הקו האופקי $y = ${m}$ חותך את הגרף ${cnt === 1 ? 'פעם אחת' : cnt + ' פעמים'} — ${cnt === 3 ? 'הוא עובר בין המקסימום למינימום.' : cnt === 2 ? 'הוא משיק לגרף באחת מנקודות הקיצון.' : 'הוא מעל המקסימום או מתחת למינימום.'}`] };
} },
{ id: 'cv6', t: 'crv', sub: 'קיצון בקטע סגור', l: 3, src: 'אינפי 1: משפט ויירשטראס', calm: 'משפט ויירשטראס רק מבטיח שהמקסימום קיים. את הערך מוצאים בדיוק כמו בתיכון: נקודות קיצון + קצוות הקטע.', g(r) {
  const a = r.i(1, 3), M = 2 * a ** 3, X = (mx, mn) => `\\max = ${mx}, \\; \\min = ${mn}`;
  return { q: ['מצאו את הערך המקסימלי והמינימלי של הפונקציה בקטע הנתון:', `$$f(x) = ${poly([[1, 'x^3'], [-3 * a * a, 'x']])}, \\qquad [0, ${2 * a}]`], ...mc(r, X(M, -M), [X(0, -M), X(M, 0), X(a ** 3 * 8, -M)]),
    ex: ['הפונקציה רציפה בקטע סגור, ולכן מקבלת בו מקסימום ומינימום. בודקים נקודות קיצון שבתוך הקטע ואת הקצוות:', `$$f(0) = 0, \\qquad f(${a}) = ${-M}, \\qquad f(${2 * a}) = ${M}`, `$$${X(M, -M)}`] };
} },

/* ===== אינטגרלים ===== */
{ id: 'in1', t: 'int', sub: 'אינטגרל לא מסוים', l: 1, g(r) {
  const n = r.i(1, 4), a = (n + 1) * r.nz(-3, 3), b = r.nz(-6, 6), I = s => `${s} + C`;
  return { q: ['חשבו:', `$$\\int (${poly([[a, xp(n)], [b, '']])})\\,dx`],
    ...mc(r, I(poly([[a / (n + 1), xp(n + 1)], [b, 'x']])), [I(poly([[a, xp(n + 1)], [b, 'x']])), I(poly([[a * n, xp(n - 1)]])), I(poly([[a / (n + 1), xp(n + 1)], [b, '']]))]),
    ex: ['מעלים חזקה באחד ומחלקים בחזקה החדשה:', '$$\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C', `$$${I(poly([[a / (n + 1), xp(n + 1)], [b, 'x']]))}`] };
} },
{ id: 'in2', t: 'int', sub: 'אינטגרל מסוים', l: 1, g(r) {
  const k = r.i(1, 4), b = r.nz(-4, 5);
  return { q: ['חשבו:', `$$\\int_0^{${k}} (${poly([[2, 'x'], [b, '']])})\\,dx`], ...mc(r, `${k * k + b * k}`, [`${2 * k + b}`, `${k * k}`, `${k * k + b}`], j => `${k * k + b * k + j}`),
    ex: [`$$\\left[${poly([[1, 'x^2'], [b, 'x']])}\\right]_0^{${k}} = ${k * k} + ${par(b * k)} - 0 = ${k * k + b * k}`] };
} },
{ id: 'in3', t: 'int', sub: 'שטח בין גרפים', l: 2, g(r) {
  const k = r.i(1, 6);
  return { q: ['מהו השטח הכלוא בין הגרפים?', `$$y = x^2, \\qquad y = ${k === 1 ? '' : k}x`], ...mc(r, fr(k ** 3, 6), [fr(k ** 3, 3), fr(k ** 3, 2), fr(k * k, 2)], j => fr(k ** 3 + j, 6)),
    ex: ['נקודות החיתוך:', `$$x^2 = ${k === 1 ? '' : k}x \\;\\Rightarrow\\; x = 0, \\; x = ${k}`, 'בקטע הזה הישר מעל הפרבולה:', `$$\\int_0^{${k}} (${k === 1 ? '' : k}x - x^2)\\,dx = ${fr(k ** 3, 2)} - ${fr(k ** 3, 3)} = ${fr(k ** 3, 6)}`] };
} },
{ id: 'in4', t: 'int', sub: 'שיטת ההצבה', l: 2, g(r) {
  const n = r.i(2, 5), c = r.i(1, 5), B = `(x^2 + ${c})`;
  return { q: ['חשבו:', `$$\\int 2x${B}^{${n}}\\,dx`], ...mc(r, `\\frac{${B}^{${n + 1}}}{${n + 1}} + C`, [`${B}^{${n + 1}} + C`, `\\frac{${B}^{${n}}}{${n}} + C`, `\\frac{x^2${B}^{${n + 1}}}{${n + 1}} + C`]),
    ex: ['מציבים:', `$$t = x^2 + ${c}, \\qquad dt = 2x\\,dx`, `$$\\int t^{${n}}\\,dt = \\frac{t^{${n + 1}}}{${n + 1}} + C = \\frac{${B}^{${n + 1}}}{${n + 1}} + C`] };
} },
{ id: 'in5', t: 'int', sub: 'אינטגרציה בחלקים', l: 3, calm: 'אינטגרציה בחלקים היא כלל המכפלה של הנגזרת, רק הפוך. הבחירה החשובה היחידה: מה לגזור ומה לעשות לו אינטגרל.', g(r) {
  const V = r.pick([
    ['x e^x', '(x - 1)e^x + C', ['xe^x + C', '\\frac{x^2}{2}e^x + C', '(x + 1)e^x + C'], ['u = x', 'dv = e^x\\,dx', 'xe^x - \\int e^x\\,dx = xe^x - e^x + C']],
    ['x\\cos x', 'x\\sin x + \\cos x + C', ['x\\sin x - \\cos x + C', '\\frac{x^2}{2}\\sin x + C', '-x\\sin x + \\cos x + C'], ['u = x', 'dv = \\cos x\\,dx', 'x\\sin x - \\int \\sin x\\,dx = x\\sin x + \\cos x + C']],
    ['x\\sin x', '-x\\cos x + \\sin x + C', ['x\\cos x + \\sin x + C', '-x\\cos x - \\sin x + C', '\\frac{x^2}{2}\\cos x + C'], ['u = x', 'dv = \\sin x\\,dx', '-x\\cos x + \\int \\cos x\\,dx = -x\\cos x + \\sin x + C']],
    ['\\ln x', 'x\\ln x - x + C', ['\\frac{1}{x} + C', 'x\\ln x + C', '\\frac{(\\ln x)^2}{2} + C'], ['u = \\ln x', 'dv = dx', 'x\\ln x - \\int x\\cdot\\frac{1}{x}\\,dx = x\\ln x - x + C']],
  ]);
  return { q: ['חשבו:', `$$\\int ${V[0]}\\,dx`], ...mc(r, V[1], V[2]),
    ex: ['הנוסחה:', '$$\\int u\\,dv = uv - \\int v\\,du', 'בוחרים:', `$$${V[3][0]}, \\qquad ${V[3][1]}`, `$$${V[3][2]}`] };
} },
{ id: 'in6', t: 'int', sub: 'אינטגרל לא אמיתי', l: 3, src: 'אינפי 2', calm: 'אינטגרל רגיל עד גבול b, ואז גבול כש-b שואף לאינסוף. שני דברים מהתיכון, אחד אחרי השני.', g(r) {
  const p = r.i(2, 5);
  return { q: ['חשבו:', `$$\\int_1^{\\infty} \\frac{1}{x^{${p}}}\\,dx`], ...mc(r, fr(1, p - 1), ['#האינטגרל מתבדר', fr(1, p), `${p - 1}`, fr(1, p + 1)]),
    ex: ['מחשבים עד גבול b ואז שולחים את b לאינסוף:', `$$\\int_1^{b} x^{-${p}}\\,dx = \\left[\\frac{x^{-${p - 1}}}{-${p - 1}}\\right]_1^b = ${fr(1, p - 1)}\\left(1 - \\frac{1}{b^{${p - 1}}}\\right)`, `$$\\xrightarrow{\\,b\\to\\infty\\,} ${fr(1, p - 1)}`] };
} },

/* ===== סדרות ואינדוקציה ===== */
{ id: 'sq1', t: 'seq', sub: 'סדרה חשבונית', l: 1, g(r) {
  const a = r.i(-10, 10), d = r.nz(-5, 5), n = r.i(8, 30);
  return { q: ['בסדרה חשבונית:', `$$a_1 = ${a}, \\qquad d = ${d}`, `מהו האיבר ה-${n}?`], ...mc(r, `a_{${n}} = ${a + (n - 1) * d}`, [`a_{${n}} = ${a + n * d}`, `a_{${n}} = ${n * d}`, `a_{${n}} = ${a + (n - 2) * d}`], k => `a_{${n}} = ${a + (n - 1) * d + k}`),
    ex: [`$$a_n = a_1 + (n-1)d = ${a} + ${n - 1}\\cdot${par(d)} = ${a + (n - 1) * d}`] };
} },
{ id: 'sq2', t: 'seq', sub: 'סכום סדרה חשבונית', l: 1, g(r) {
  const a = r.i(-5, 10), d = r.nz(-3, 4), n = r.i(6, 20), an = a + (n - 1) * d, S = n * (a + an) / 2;
  return { q: ['חשבו את סכום', `${n} האיברים הראשונים של הסדרה החשבונית:`, `$$${a}, \\; ${a + d}, \\; ${a + 2 * d}, \\; \\dots`], ...mc(r, `${S}`, [`${n * (a + an)}`, `${S + n}`, `${an}`], k => `${S + k * n}`),
    ex: [`$$a_{${n}} = ${a} + ${n - 1}\\cdot${par(d)} = ${an}`, `$$S_{${n}} = \\frac{n(a_1 + a_n)}{2} = \\frac{${n}\\cdot(${a} + ${par(an)})}{2} = ${S}`] };
} },
{ id: 'sq3', t: 'seq', sub: 'סדרה הנדסית', l: 1, g(r) {
  const a = r.nz(-4, 5), q = r.pick([2, 3, -2]), n = r.i(4, 7);
  return { q: ['בסדרה הנדסית:', `$$a_1 = ${a}, \\qquad q = ${q}`, `מהו האיבר ה-${n}?`], ...mc(r, `${a * q ** (n - 1)}`, [`${a * q ** n}`, `${(a * q) ** (n - 1)}`, `${a * q * (n - 1)}`], k => `${a * q ** (n - 1) + k}`),
    ex: [`$$a_n = a_1 q^{n-1} = ${a}\\cdot${par(q)}^{${n - 1}} = ${a * q ** (n - 1)}`] };
} },
{ id: 'sq4', t: 'seq', sub: 'טור הנדסי אינסופי', l: 2, g(r) {
  const a = r.i(1, 9), [p, d] = r.pick([[1, 2], [1, 3], [-1, 2], [2, 3], [1, 4], [-1, 3]]);
  const t1 = fr(a * p, d), t2 = fr(a * p * p, d * d), series = `${a} ${t1.startsWith('-') ? '- ' + t1.slice(1) : '+ ' + t1} ${t2.startsWith('-') ? '- ' + t2.slice(1) : '+ ' + t2} + \\dots`.replace('+ \\dots', p < 0 ? '- \\dots' : '+ \\dots');
  return { q: ['חשבו את סכום הטור:', `$$${series}`], ...mc(r, fr(a * d, d - p), [fr(a * d, d + p), fr(a * p, d - p), '#הטור מתבדר', fr(a * d, p === 1 ? d + 1 : d)]),
    ex: [`המנה $q = ${fr(p, d)}$, ו-$|q| < 1$ ולכן הטור מתכנס:`, `$$S = \\frac{a_1}{1 - q} = \\frac{${a}}{1 - ${p < 0 ? `\\left(${fr(p, d)}\\right)` : fr(p, d)}} = ${fr(a * d, d - p)}`] };
} },
{ id: 'sq5', t: 'seq', sub: 'אינדוקציה', l: 2, g(r) {
  const V = r.pick([
    ['1 + 2 + \\dots + n = \\frac{n(n+1)}{2}', '\\frac{n(n+1)}{2} + (n+1) = \\frac{(n+1)(n+2)}{2}', ['\\frac{n(n+1)}{2} + n = \\frac{(n+1)(n+2)}{2}', '\\frac{n(n+1)}{2} + (n+1) = \\frac{n(n+1)}{2}', '\\frac{n(n+1)}{2} + (n+1) = \\frac{(n+1)^2}{2}'], 'n + 1'],
    ['1 + 3 + 5 + \\dots + (2n-1) = n^2', 'n^2 + (2n+1) = (n+1)^2', ['n^2 + (2n-1) = (n+1)^2', 'n^2 + (2n+1) = n^2 + 1', 'n^2 + 2n = (n+1)^2'], '2(n+1) - 1 = 2n + 1'],
    ['1 + 2 + 4 + \\dots + 2^n = 2^{n+1} - 1', '2^{n+1} - 1 + 2^{n+1} = 2^{n+2} - 1', ['2^{n+1} - 1 + 2^{n} = 2^{n+2} - 1', '2^{n+1} - 1 + 2^{n+2} = 2^{n+2} - 1', '2^{n+1} - 1 + 2^{n+1} = 2^{n+1}'], '2^{n+1}'],
  ]);
  return { q: ['מוכיחים באינדוקציה את הטענה:', `$$${V[0]}`, 'בשלב המעבר מניחים שהטענה נכונה עבור $n$. מה צריך להראות?'], ...mc(r, V[1], V[2]),
    ex: ['מוסיפים לסכום של n האיברים (שלפי ההנחה ידוע) את האיבר הבא:', `$$${V[3]}`, 'ומראים שהתוצאה שווה לנוסחה עם n+1 במקום n:', `$$${V[1]}`] };
} },
{ id: 'sq6', t: 'seq', sub: 'סופרמום ואינפימום', l: 3, src: 'אינפי 1, הרצאה 4: סופרמום ואינפימום', calm: 'סופרמום = "התקרה הכי נמוכה". מציירים כמה איברים על ציר המספרים ורואים לאן הם מתקרבים.', g(r) {
  const V = r.pick([
    ['1 - \\frac{1}{n}', '0, \\; \\frac{1}{2}, \\; \\frac{2}{3}, \\; \\frac{3}{4}, \\; \\dots', ['1', '0'], [['0', '1'], ['1', '\\frac{1}{2}'], ['\\infty', '0']], 'האיברים עולים ומתקרבים ל-1 בלי להגיע אליו; הקטן ביותר הוא 0 (עבור n = 1).'],
    ['\\frac{n}{n+1}', '\\frac{1}{2}, \\; \\frac{2}{3}, \\; \\frac{3}{4}, \\; \\dots', ['1', '\\frac{1}{2}'], [['\\frac{1}{2}', '0'], ['1', '0'], ['\\infty', '\\frac{1}{2}']], 'האיברים עולים ומתקרבים ל-1 בלי להגיע אליו; הקטן ביותר הוא 1/2.'],
    ['\\frac{(-1)^n}{n}', '-1, \\; \\frac{1}{2}, \\; -\\frac{1}{3}, \\; \\frac{1}{4}, \\; \\dots', ['\\frac{1}{2}', '-1'], [['1', '-1'], ['0', '-1'], ['\\frac{1}{2}', '0']], 'הערכים מתקרבים ל-0 משני הצדדים; הגדול ביותר הוא 1/2 (עבור n = 2) והקטן ביותר הוא −1 (עבור n = 1).'],
    ['(-1)^n + \\frac{1}{n}', '0, \\; \\frac{3}{2}, \\; -\\frac{2}{3}, \\; \\frac{5}{4}, \\; \\dots', ['\\frac{3}{2}', '-1'], [['1', '-1'], ['\\frac{3}{2}', '0'], ['2', '-1']], 'האיברים הזוגיים יורדים מ-3/2 לכיוון 1, והאי-זוגיים מתקרבים ל-(−1) מלמעלה בלי להגיע.'],
  ]);
  const F = ([s, i]) => `\\sup A = ${s}, \\; \\inf A = ${i}`;
  return { q: ['מהם הסופרמום והאינפימום של הקבוצה?', `$$A = \\left\\{ ${V[0]} \\;\\middle|\\; n \\in \\mathbb{N} \\right\\}`], ...mc(r, F(V[2]), V[3].map(F)),
    ex: ['כותבים את האיברים הראשונים:', `$$A = \\left\\{ ${V[1]} \\right\\}`, V[4], `$$${F(V[2])}`] };
} },
{ id: 'sq7', t: 'seq', sub: 'גבול של סדרה', l: 3, src: 'אינפי 1: גבול של סדרה', calm: 'כפל בצמוד — אותו טריק מהתיכון שמשתמשים בו כדי להיפטר משורש במכנה.', g(r) {
  const k = r.i(1, 8);
  return { q: ['חשבו:', `$$\\lim_{n\\to\\infty} \\left(\\sqrt{n^2 + ${k === 1 ? '' : k}n} - n\\right)`], ...mc(r, fr(k, 2), ['0', `${k}`, '\\infty', fr(k, 4)]),
    ex: ['כופלים ומחלקים בצמוד:', `$$\\frac{(n^2 + ${k === 1 ? '' : k}n) - n^2}{\\sqrt{n^2 + ${k === 1 ? '' : k}n} + n} = \\frac{${k === 1 ? '' : k}n}{\\sqrt{n^2 + ${k === 1 ? '' : k}n} + n}`, 'מחלקים מונה ומכנה ב-n:', `$$\\frac{${k}}{\\sqrt{1 + \\frac{${k}}{n}} + 1} \\to \\frac{${k}}{2}`, 'שימו לב: "אינסוף פחות אינסוף" אינו 0 — זו צורה לא מוגדרת.'] };
} },
/* ===== תבניות נוספות ===== */
{ id: 'eq8', t: 'eq', sub: 'משוואה דו-ריבועית', l: 2, g(r) {
  const a = r.i(1, 4); let b; do { b = r.i(1, 5); } while (b === a); const [p, q] = [a, b].sort((x, y) => x - y);
  return { q: ['פתרו את המשוואה:', `$$${poly([[1, 'x^4'], [-(a * a + b * b), 'x^2'], [a * a * b * b, '']])} = 0`],
    ...mc(r, `x = \\pm ${p}, \\; x = \\pm ${q}`, [`x = ${p * p}, \\; x = ${q * q}`, `x = ${p}, \\; x = ${q}`, `x = \\pm ${p * p}, \\; x = \\pm ${q * q}`]),
    ex: ['מציבים', '$$t = x^2', `$$${poly([[1, 't^2'], [-(a * a + b * b), 't'], [a * a * b * b, '']])} = 0 \\;\\Rightarrow\\; t = ${p * p}, \\; t = ${q * q}`, 'וחוזרים ל-x — לכל ערך חיובי של t יש שני פתרונות:', `$$x = \\pm ${p}, \\; x = \\pm ${q}`] };
} },
{ id: 'eq9', t: 'eq', sub: 'מערכת בשלושה נעלמים', l: 3, src: 'אלגברה לינארית: מערכות משוואות לינאריות', calm: 'אותה שיטת חיסור משוואות כמו בשני נעלמים — פשוט עם עוד שלב אחד. באלגברה לינארית קוראים לזה "שיטת גאוס".', g(r) {
  const X = [r.i(-4, 4), r.i(-4, 4), r.i(-4, 4)]; let M, det;
  do { M = [0, 1, 2].map(() => [r.i(-3, 3), r.i(-3, 3), r.i(-3, 3)]); det = M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]); } while (det === 0 || M.some(row => row.filter(v => v).length < 2));
  const B = M.map(row => row[0] * X[0] + row[1] * X[1] + row[2] * X[2]), T = v => `(x, y, z) = ${vec(v)}`;
  return { q: ['פתרו את המערכת:', `$$\\begin{cases} ${M.map((row, i) => `${poly([[row[0], 'x'], [row[1], 'y'], [row[2], 'z']])} = ${B[i]}`).join(' \\\\ ')} \\end{cases}`],
    ...mc(r, T(X), [T([X[1], X[0], X[2]]), T([-X[0], X[1], X[2]]), T([X[0], X[1], -X[2]]), T([X[2], X[1], X[0]])], k => T([X[0] + k, X[1], X[2]])),
    ex: ['מבטלים משתנה אחד בעזרת חיסור משוואות, מקבלים מערכת בשני נעלמים, ופותרים כרגיל. בדיקה — מציבים בכל שלוש המשוואות:', ...M.map((row, i) => `$$${row.map((c, j) => `${par(c)}\\cdot${par(X[j])}`).join(' + ')} = ${B[i]}`)] };
} },
{ id: 'eq10', t: 'eq', sub: 'בעיה מילולית', l: 1, g(r) {
  const x = r.i(5, 40), y = r.i(1, x - 1), S = x + y, D = x - y, P = (a, b) => `${a}, \\; ${b}`;
  return { q: [`סכומם של שני מספרים הוא ${S}, וההפרש ביניהם הוא ${D}. מהם המספרים?`], ...mc(r, P(x, y), [P(x + 1, y - 1), P(S, D), P(D, y)], k => P(x + k, y + k)),
    ex: ['מסמנים את המספרים x ו-y:', `$$\\begin{cases} x + y = ${S} \\\\ x - y = ${D} \\end{cases}`, 'מחברים את המשוואות:', `$$2x = ${S + D} \\;\\Rightarrow\\; x = ${x}, \\qquad y = ${y}`] };
} },
{ id: 'eq11', t: 'eq', sub: 'אי-שוויון עם ערך מוחלט', l: 3, src: 'אינפי 1, הרצאה 2: ערך מוחלט', calm: 'ערך מוחלט הוא מרחק. |x − a| < ε פירושו "x רחוק מ-a פחות מ-ε" — כך מגדירים גבול באינפי.', g(r) {
  const a = r.nz(-5, 5), e = r.i(1, 6), I = s => `x \\in ${s}`;
  return { q: ['פתרו את אי-השוויון:', `$$\\left|${xm(a)}\\right| < ${e}`], ...mc(r, I(`(${a - e}, ${a + e})`), [I(`(-\\infty, ${a - e}) \\cup (${a + e}, \\infty)`), I(`(${-a - e}, ${-a + e})`), I(`[${a - e}, ${a + e}]`)]),
    ex: ['המרחק של x מ-' + a + ' קטן מ-' + e + ', כלומר:', `$$${-e} < ${xm(a)} < ${e}`, `$$${a - e} < x < ${a + e}`] };
} },
{ id: 'fn8', t: 'fn', sub: 'הצבה בפונקציה', l: 1, g(r) {
  const b = r.nz(-6, 6), c = r.nz(-6, 6), k = r.i(2, 5), v = k * k - b * k + c;
  return { q: ['נתון:', `$$f(x) = ${poly([[1, 'x^2'], [b, 'x'], [c, '']])}`, 'חשבו:', `$$f(${-k})`], ...mc(r, `${v}`, [`${-k * k - b * k + c}`, `${k * k + b * k + c}`, `${-k * k + b * k + c}`], j => `${v + j}`),
    ex: ['מציבים עם סוגריים — ריבוע של מספר שלילי הוא חיובי:', `$$f(${-k}) = (${-k})^2 + ${par(b)}\\cdot(${-k}) ${pm(c)} = ${k * k} ${pm(-b * k)} ${pm(c)} = ${v}`] };
} },
{ id: 'fn9', t: 'fn', sub: 'תמונה (טווח)', l: 2, g(r) {
  const a = r.pick([1, 2, -1, -2]), h = r.nz(-5, 5), k = r.nz(-6, 6);
  return { q: ['מהי התמונה (קבוצת הערכים) של הפונקציה?', `$$f(x) = ${a === 1 ? '' : a === -1 ? '-' : a}(${xm(h)})^2 ${pm(k)}`],
    ...mc(r, a > 0 ? `y \\geq ${k}` : `y \\leq ${k}`, [a > 0 ? `y \\leq ${k}` : `y \\geq ${k}`, `y \\geq ${h}`, 'y \\in \\mathbb{R}'], j => `y \\geq ${k + j}`),
    ex: ['הריבוע תמיד אי-שלילי:', `$$(${xm(h)})^2 \\geq 0`, a > 0 ? 'המקדם חיובי, ולכן הערך הקטן ביותר מתקבל בקודקוד:' : 'המקדם שלילי, ולכן הערך הגדול ביותר מתקבל בקודקוד:', `$$${a > 0 ? `y \\geq ${k}` : `y \\leq ${k}`}`] };
} },
{ id: 'fn10', t: 'fn', sub: 'הפיכות בתחום מוגבל', l: 3, calm: 'השלמה לריבוע מהתיכון. הסיבה לבחור בשורש החיובי ולא בשלילי היא התחום x ≥ a — זה כל ה"טריק".', g(r) {
  const a = r.nz(-4, 4), F = s => `f^{-1}(x) = ${s}`;
  return { q: ['הפונקציה הבאה הפיכה בתחום הנתון. מצאו את ההפוכה שלה:', `$$f(x) = ${poly([[1, 'x^2'], [-2 * a, 'x']])}, \\qquad x \\geq ${a}`],
    ...mc(r, F(`${a} + \\sqrt{x + ${a * a}}`), [F(`${a} - \\sqrt{x + ${a * a}}`), F(`\\sqrt{x} ${pm(a)}`), F(`${a} + \\sqrt{x - ${a * a}}`)]),
    ex: ['משלימים לריבוע:', `$$y = (${xm(a)})^2 - ${a * a}`, `$$(${xm(a)})^2 = y + ${a * a}`, 'בתחום הנתון מתקיים x − a ≥ 0, ולכן לוקחים את השורש החיובי:', `$$x = ${a} + \\sqrt{y + ${a * a}}`] };
} },
{ id: 'fn11', t: 'fn', sub: 'פונקציה הפוכה', l: 2, g(r) {
  const c = r.nz(-5, 5), F = s => `f^{-1}(x) = ${s}`;
  return { q: ['מצאו את הפונקציה ההפוכה של:', `$$f(x) = e^{x} ${pm(c)}`], ...mc(r, F(`\\ln(${xm(c)})`), [F(`\\ln x ${pm(-c)}`), F(`\\ln(${xm(-c)})`), F(`e^{-x} ${pm(-c)}`)]),
    ex: ['מבודדים את החזקה ולוקחים ln:', `$$y = e^{x} ${pm(c)} \\;\\Rightarrow\\; e^{x} = y ${pm(-c)} \\;\\Rightarrow\\; x = \\ln(y ${pm(-c)})`, `$$${F(`\\ln(${xm(c)})`)}`] };
} },
{ id: 'po8', t: 'poly', sub: 'פירוק לגורמים', l: 1, g(r) {
  const a = r.i(1, 4), b = r.i(1, 9), A = a === 1 ? '' : a;
  return { q: ['פרקו לגורמים:', `$$${poly([[a * a, 'x^2'], [-b * b, '']])}`], ...mc(r, `(${A}x - ${b})(${A}x + ${b})`, [`(${A}x - ${b})^2`, `(${A}x + ${b})^2`, `(${A}x - ${b * b})(${A}x + ${b * b})`], j => `(${A}x - ${b + j})(${A}x + ${b + j})`),
    ex: ['הפרש ריבועים:', '$$A^2 - B^2 = (A - B)(A + B)', `$$${poly([[a * a, 'x^2'], [-b * b, '']])} = (${A}x)^2 - ${b}^2 = (${A}x - ${b})(${A}x + ${b})`] };
} },
{ id: 'po9', t: 'poly', sub: 'חילוק פולינומים', l: 2, g(r) {
  const k = r.nz(-5, 5), s = r.nz(-6, 6), X = v => `${xm(v)}`;
  return { q: ['חלקו:', `$$\\frac{${poly([[1, 'x^2'], [-(k + s), 'x'], [k * s, '']])}}{${xm(k)}}`], ...mc(r, X(s), [X(-s), X(k), `x ${pm(-(k + s))}`], j => X(s + j)),
    ex: ['מפרקים את המונה — אחד הגורמים הוא בדיוק המכנה:', `$$\\frac{(${xm(k)})(${xm(s)})}{${xm(k)}} = ${xm(s)}`] };
} },
{ id: 'po10', t: 'poly', sub: 'שורשים של פולינום ממעלה 3', l: 3, calm: 'כשיודעים שורש אחד, מחלקים ב-(x − r) ומקבלים משוואה ריבועית רגילה.', g(r) {
  const t0 = r.nz(-4, 4); let s, t; do { s = r.i(-4, 4); t = r.i(-4, 4); } while (s === t || s === t0 || t === t0);
  const S1 = t0 + s + t, S2 = t0 * s + t0 * t + s * t, S3 = t0 * s * t;
  return { q: [`ידוע ש-$x = ${t0}$ הוא שורש של הפולינום. מצאו את שני השורשים האחרים:`, `$$P(x) = ${poly([[1, 'x^3'], [-S1, 'x^2'], [S2, 'x'], [-S3, '']])}`],
    ...mc(r, P2(s, t), [P2(-s, -t), P2(s, -t), P2(-s, t)], k => P2(s + k, t)),
    ex: ['מחלקים (חילוק ארוך או שיטת הורנר):', `$$P(x) = (${xm(t0)})(${poly([[1, 'x^2'], [-(s + t), 'x'], [s * t, '']])})`, 'ופותרים את המשוואה הריבועית:', `$$${P2(s, t)}`] };
} },
{ id: 'po11', t: 'poly', sub: 'אי-שוויון ריבועי', l: 2, g(r) {
  const a = r.i(-6, 5), b = r.i(a + 1, 7), I = s => `x \\in ${s}`;
  return { q: ['פתרו את אי-השוויון:', `$$${poly([[1, 'x^2'], [-(a + b), 'x'], [a * b, '']])} < 0`], ...mc(r, I(`(${a}, ${b})`), [I(`(-\\infty, ${a}) \\cup (${b}, \\infty)`), I(`[${a}, ${b}]`), I(`(${-b}, ${-a})`)], j => I(`(${a + j}, ${b})`)),
    ex: ['השורשים:', `$$x = ${a}, \\qquad x = ${b}`, 'זו פרבולה מחייכת, ולכן היא שלילית בין השורשים:', `$$${I(`(${a}, ${b})`)}`] };
} },
{ id: 'ex8', t: 'exp', sub: 'משוואה לוגריתמית', l: 1, g(r) {
  const [B, nm] = r.pick([[2, 5], [3, 4], [5, 3]]), n = r.i(1, nm), c = r.nz(-5, 5);
  return { q: ['פתרו את המשוואה:', `$$\\log_{${B}}(${xm(c)}) = ${n}`], ...mc(r, `x = ${B ** n + c}`, [`x = ${B ** n}`, `x = ${n + c}`, `x = ${B * n + c}`], k => `x = ${B ** n + c + k}`),
    ex: ['לפי הגדרת הלוגריתם:', `$$${xm(c)} = ${B}^{${n}} = ${B ** n}`, `$$x = ${B ** n + c}`] };
} },
{ id: 'ex9', t: 'exp', sub: 'משוואה מעריכית עם הצבה', l: 2, g(r) {
  const m = r.i(0, 4); let n; do { n = r.i(0, 4); } while (n === m); const p = 2 ** m, q = 2 ** n;
  return { q: ['פתרו את המשוואה:', `$$4^x - ${p + q}\\cdot 2^x + ${p * q} = 0`], ...mc(r, P2(m, n), [P2(p, q), P2(-m, -n), `x = ${Math.max(m, n)}`], k => P2(m + k, n)),
    ex: ['מציבים — ושמים לב ש-4 בחזקת x הוא t בריבוע:', '$$t = 2^x', `$$t^2 - ${p + q}t + ${p * q} = 0 \\;\\Rightarrow\\; t = ${p}, \\; t = ${q}`, `$$2^x = ${p} \\Rightarrow x = ${m}, \\qquad 2^x = ${q} \\Rightarrow x = ${n}`] };
} },
{ id: 'ex10', t: 'exp', sub: 'לוגריתם בבסיס חזקה', l: 2, g(r) {
  const a = r.pick([2, 3, 5]), m = r.i(2, 3); let n; do { n = r.i(1, 5); } while (n === m);
  return { q: ['חשבו:', `$$\\log_{${a ** m}} ${a ** n}`], ...mc(r, fr(n, m), [fr(m, n), `${n - m}`, `${n * m}`], k => fr(n + k, m)),
    ex: ['כותבים את שני המספרים כחזקות של ' + a + ':', `$$\\log_{${a}^{${m}}} ${a}^{${n}} = \\frac{${n}}{${m}}`, 'כי', `$$\\left(${a}^{${m}}\\right)^{${fr(n, m)}} = ${a}^{${n}}`] };
} },
{ id: 'ex11', t: 'exp', sub: 'החלפת בסיס', l: 3, calm: 'נוסחת החלפת בסיס מהתיכון: כותבים הכל עם ln ורואים שהכל מצטמצם.', g(r) {
  const p = r.pick([2, 3, 5]); let q; do { q = r.pick([3, 5, 7]); } while (q === p); const k = r.i(2, 4);
  return { q: ['חשבו בלי מחשבון:', `$$\\log_{${p}} ${q} \\cdot \\log_{${q}} ${p ** k}`], ...mc(r, `${k}`, [fr(1, k), `${p * k}`, '#אי אפשר לחשב בלי מחשבון']),
    ex: ['לפי החלפת בסיס:', `$$\\frac{\\ln ${q}}{\\ln ${p}} \\cdot \\frac{\\ln ${p}^{${k}}}{\\ln ${q}} = \\frac{${k}\\ln ${p}}{\\ln ${p}} = ${k}`] };
} },
{ id: 'tr8', t: 'trig', sub: 'מעלות ורדיאנים', l: 1, g(r) {
  const ang = r.pick(STD.filter(a => a[0] !== 0)), deg = ang[0] * 180 / ang[1];
  return { q: ['המירו לרדיאנים:', `$$${deg}^\\circ`], ...mc(r, piTex(...ang), [piTex(ang[0], ang[1] * 2), piTex(ang[0] * 2, ang[1]), `${deg}\\pi`], k => piTex(ang[0] + k, ang[1])),
    ex: ['180 מעלות שוות ל-π רדיאנים:', `$$${deg}^\\circ = ${deg}\\cdot\\frac{\\pi}{180} = ${piTex(...ang)}`] };
} },
{ id: 'tr9', t: 'trig', sub: 'סכום והפרש זוויות', l: 2, g(r) {
  const A = '\\frac{\\sqrt{6} + \\sqrt{2}}{4}', B = '\\frac{\\sqrt{6} - \\sqrt{2}}{4}';
  const [e, cor, how] = r.pick([['\\sin 75^\\circ', A, '\\sin(45^\\circ + 30^\\circ) = \\sin 45^\\circ\\cos 30^\\circ + \\cos 45^\\circ \\sin 30^\\circ'], ['\\cos 75^\\circ', B, '\\cos(45^\\circ + 30^\\circ) = \\cos 45^\\circ\\cos 30^\\circ - \\sin 45^\\circ \\sin 30^\\circ'],
    ['\\sin 15^\\circ', B, '\\sin(45^\\circ - 30^\\circ) = \\sin 45^\\circ\\cos 30^\\circ - \\cos 45^\\circ \\sin 30^\\circ'], ['\\cos 15^\\circ', A, '\\cos(45^\\circ - 30^\\circ) = \\cos 45^\\circ\\cos 30^\\circ + \\sin 45^\\circ \\sin 30^\\circ']]);
  return { q: ['חשבו ערך מדויק:', `$$${e}`], ...mc(r, cor, [cor === A ? B : A, '\\frac{\\sqrt{3} + 1}{2}', '\\frac{\\sqrt{2}}{2}']),
    ex: ['כותבים את הזווית כסכום או הפרש של זוויות מוכרות:', `$$${how}`, `$$= ${cor}`] };
} },
{ id: 'tr10', t: 'trig', sub: 'אי-שוויון טריגונומטרי', l: 3, calm: 'פותרים את המשוואה (שוויון), ואז מסתכלים על מעגל היחידה: איפה הגרף מעל הקו?', g(r) {
  const f = r.pick(['sin', 'cos']), [vt, sa, ca] = r.pick([['\\frac{1}{2}', [1, 6], [1, 3]], ['\\frac{\\sqrt{2}}{2}', [1, 4], [1, 4]], ['\\frac{\\sqrt{3}}{2}', [1, 3], [1, 6]]]);
  const al = f === 'sin' ? sa : ca, [n, d] = al, A = piTex(n, d), PmA = piTex(d - n, d), TmA = piTex(2 * d - n, d), I = s => `x \\in ${s}`;
  const cor = f === 'sin' ? I(`\\left(${A}, ${PmA}\\right)`) : I(`\\left[0, ${A}\\right) \\cup \\left(${TmA}, 2\\pi\\right)`);
  const ds = f === 'sin' ? [I(`\\left[0, ${A}\\right) \\cup \\left(${PmA}, 2\\pi\\right)`), I(`\\left[${A}, ${PmA}\\right]`), I(`\\left(${A}, ${TmA}\\right)`)] : [I(`\\left(${A}, ${TmA}\\right)`), I(`\\left(${A}, ${PmA}\\right)`), I(`\\left[0, ${A}\\right]`)];
  return { q: ['פתרו בתחום הנתון:', `$$\\${f} x > ${vt}, \\qquad 0 \\le x < 2\\pi`], ...mc(r, cor, ds),
    ex: ['קודם פותרים את השוויון:', `$$\\${f} x = ${vt} \\;\\Rightarrow\\; x = ${A}, \\; x = ${f === 'sin' ? PmA : TmA}`, f === 'sin' ? 'הסינוס (הגובה על מעגל היחידה) גדול מהערך הזה בין שתי הזוויות:' : 'הקוסינוס (המרחק האופקי) גדול מהערך הזה ליד הזווית 0 — כלומר לפני הזווית הראשונה ואחרי השנייה:', `$$${cor}`] };
} },
{ id: 'tr11', t: 'trig', sub: 'טנגנס', l: 2, g(r) {
  const ang = r.pick(STD.filter(a => Math.abs(Math.cos(a[0] * Math.PI / a[1])) > 1e-9)), v = Math.tan(ang[0] * Math.PI / ang[1]);
  const T = x => { const a = Math.abs(x); const s = x < -1e-9 ? '-' : ''; if (a < 1e-9) return '0'; if (Math.abs(a - 1) < 1e-9) return s + '1'; if (Math.abs(a - Math.sqrt(3)) < 1e-9) return s + '\\sqrt{3}'; return s + '\\frac{\\sqrt{3}}{3}'; };
  const cor = T(v), recip = Math.abs(v) < 1e-9 ? '1' : T(1 / v);
  return { q: ['מהו הערך המדויק?', `$$\\tan\\left(${piTex(...ang)}\\right)`], ...mc(r, cor, [T(-v), recip, '0', '1', '-1', '\\sqrt{3}']),
    ex: ['טנגנס הוא סינוס חלקי קוסינוס:', `$$\\tan\\left(${piTex(...ang)}\\right) = \\frac{${valTex(fval('sin', ang))}}{${valTex(fval('cos', ang))}} = ${cor}`] };
} },
{ id: 'vc7', t: 'vec', sub: 'וקטור בין נקודות', l: 1, g(r) {
  const A = [r.i(-5, 5), r.i(-5, 5), r.i(-5, 5)], B = [r.i(-5, 5), r.i(-5, 5), r.i(-5, 5)], D = B.map((b, i) => b - A[i]);
  return { q: ['מצאו את הווקטור מ-A ל-B:', `$$A${vec(A)}, \\qquad B${vec(B)}`], ...mc(r, `\\vec{AB} = ${vec(D)}`, [`\\vec{AB} = ${vec(D.map(x => -x))}`, `\\vec{AB} = ${vec(B.map((b, i) => b + A[i]))}`, `\\vec{AB} = ${vec([D[0], -D[1], D[2]])}`], k => `\\vec{AB} = ${vec([D[0] + k, D[1], D[2]])}`),
    ex: ['"סוף פחות התחלה":', `$$\\vec{AB} = B - A = ${vec(D)}`] };
} },
{ id: 'vc8', t: 'vec', sub: 'וקטור יחידה', l: 2, g(r) {
  let [a, b, c] = r.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [8, 15, 17], [6, 8, 10]]); a *= r.pick([1, -1]); b *= r.pick([1, -1]);
  const U = (x, y) => `\\left(${x}, ${y}\\right)`;
  return { q: ['מהו וקטור היחידה בכיוון של הווקטור?', `$$\\vec{u} = (${a}, ${b})`], ...mc(r, U(fr(a, c), fr(b, c)), [U(fr(a, c * c), fr(b, c * c)), U(fr(b, c), fr(a, c)), U(fr(-a, c), fr(-b, c))]),
    ex: ['מחלקים את הווקטור באורך שלו:', `$$|\\vec{u}| = \\sqrt{${a * a} + ${b * b}} = ${c}`, `$$\\hat{u} = \\frac{1}{${c}}(${a}, ${b}) = ${U(fr(a, c), fr(b, c))}`] };
} },
{ id: 'vc9', t: 'vec', sub: 'מכפלה וקטורית', l: 3, src: 'אלגברה לינארית / פיזיקה 1', calm: 'חישוב עם דטרמיננטה 3×3 — כפל ופחות בתבנית קבועה. אין כאן רעיון חדש, רק סדר.', g(r) {
  let u, v, c; do { u = [r.i(-3, 3), r.i(-3, 3), r.i(-3, 3)]; v = [r.i(-3, 3), r.i(-3, 3), r.i(-3, 3)]; c = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]; } while (c.filter(x => x).length < 2);
  const C = w => `\\vec{u}\\times\\vec{v} = ${vec(w)}`;
  return { q: ['חשבו את המכפלה הווקטורית:', `$$\\vec{u} = ${vec(u)}, \\qquad \\vec{v} = ${vec(v)}`], ...mc(r, C(c), [C(c.map(x => -x)), C([c[0], -c[1], c[2]]), C(u.map((x, i) => x * v[i]))], k => C([c[0] + k, c[1], c[2]])),
    ex: ['בעזרת דטרמיננטה:', `$$\\vec{u}\\times\\vec{v} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ ${u.join(' & ')} \\\\ ${v.join(' & ')} \\end{vmatrix}`, `$$= \\left(${par(u[1])}\\cdot${par(v[2])} - ${par(u[2])}\\cdot${par(v[1])},\\; ${par(u[2])}\\cdot${par(v[0])} - ${par(u[0])}\\cdot${par(v[2])},\\; ${par(u[0])}\\cdot${par(v[1])} - ${par(u[1])}\\cdot${par(v[0])}\\right) = ${vec(c)}`, 'שימו לב לסימן של הרכיב האמצעי.'] };
} },
{ id: 'vc10', t: 'vec', sub: 'תלות לינארית', l: 3, src: 'אלגברה לינארית: תלות לינארית', calm: '"תלויים לינארית" פירושו שאחד הווקטורים הוא צירוף של האחרים. שני הרכיבים הראשונים כבר מגלים לכם את המקדמים.', g(r) {
  const a = r.nz(-3, 3), b = r.nz(-3, 3), c = r.nz(-3, 3), d = r.nz(-3, 3), t = a * c + b * d;
  return { q: ['עבור איזה ערך של $t$ הווקטורים תלויים לינארית?', `$$\\vec{u} = (1, 0, ${a}), \\qquad \\vec{v} = (0, 1, ${b}), \\qquad \\vec{w} = (${c}, ${d}, t)`], ...mc(r, `t = ${t}`, [`t = ${a * c - b * d}`, `t = ${-t}`, 't = 0'], k => `t = ${t + k}`),
    ex: ['u ו-v בלתי תלויים, ולכן w צריך להיות צירוף שלהם. משני הרכיבים הראשונים:', `$$\\vec{w} = ${c}\\,\\vec{u} + ${par(d)}\\,\\vec{v}`, 'ומהרכיב השלישי:', `$$t = ${c}\\cdot${par(a)} + ${par(d)}\\cdot${par(b)} = ${t}`] };
} },
{ id: 'ge7', t: 'geo', sub: 'ישרים מאונכים', l: 1, g(r) {
  const p = r.nz(-5, 5), q = r.i(1, 4), b = r.nz(-6, 6), M = fr(p, q), coef = M === '1' ? '' : M === '-1' ? '-' : M;
  return { q: ['מהו השיפוע של ישר המאונך לישר:', `$$y = ${coef}x ${pm(b)}`], ...mc(r, `m = ${fr(-q, p)}`, [`m = ${fr(q, p)}`, `m = ${fr(-p, q)}`, `m = ${M}`], k => `m = ${fr(-q - k, p)}`),
    ex: ['מכפלת השיפועים של ישרים מאונכים היא −1:', `$$m = -\\frac{1}{${M}} = ${fr(-q, p)}`] };
} },
{ id: 'ge8', t: 'geo', sub: 'חיתוך ישרים', l: 2, g(r) {
  const x0 = r.i(-5, 5), y0 = r.i(-5, 5), m1 = r.nz(-4, 4); let m2; do { m2 = r.nz(-4, 4); } while (m2 === m1);
  const b1 = y0 - m1 * x0, b2 = y0 - m2 * x0;
  return { q: ['מהי נקודת החיתוך של הישרים?', `$$y = ${poly([[m1, 'x'], [b1, '']])}, \\qquad y = ${poly([[m2, 'x'], [b2, '']])}`], ...mc(r, vec([x0, y0]), [vec([y0, x0]), vec([-x0, y0]), vec([x0, -y0])], k => vec([x0 + k, y0])),
    ex: ['משווים את שני הביטויים ל-y:', `$$${poly([[m1, 'x'], [b1, '']])} = ${poly([[m2, 'x'], [b2, '']])} \\;\\Rightarrow\\; ${poly([[m1 - m2, 'x']])} = ${b2 - b1} \\;\\Rightarrow\\; x = ${x0}`, `$$y = ${y0}`] };
} },
{ id: 'ge9', t: 'geo', sub: 'אליפסה', l: 2, g(r) {
  const a = r.i(2, 6); let b; do { b = r.i(2, 6); } while (b === a);
  return { q: ['מהן נקודות החיתוך של האליפסה עם ציר ה-x?', `$$\\frac{x^2}{${a * a}} + \\frac{y^2}{${b * b}} = 1`], ...mc(r, `(\\pm ${a}, 0)`, [`(\\pm ${a * a}, 0)`, `(\\pm ${b}, 0)`, `(0, \\pm ${a})`], j => `(\\pm ${a + j}, 0)`),
    ex: ['על ציר ה-x מתקיים y = 0:', `$$\\frac{x^2}{${a * a}} = 1 \\;\\Rightarrow\\; x = \\pm ${a}`] };
} },
{ id: 'ge10', t: 'geo', sub: 'מקום גאומטרי', l: 3, calm: 'אוסף הנקודות שנמצאות באותו מרחק מ-A ומ-B הוא האנך האמצעי. הווקטור AB הוא הנורמל שלו — וזהו.', g(r) {
  const x1 = r.i(-4, 4), y1 = r.i(-4, 4), p = r.nz(-3, 3), q = r.nz(-3, 3), Mx = x1 + p, My = y1 + q;
  const L = (a, b, c) => { const g = gcd(gcd(a, b), c); a /= g; b /= g; c /= g; if (a < 0 || (a === 0 && b < 0)) { a = -a; b = -b; c = -c; } return `${poly([[a, 'x'], [b, 'y']])} = ${c}`; };
  return { q: ['מצאו את המקום הגאומטרי של כל הנקודות שנמצאות במרחק שווה מ-A ומ-B:', `$$A${vec([x1, y1])}, \\qquad B${vec([x1 + 2 * p, y1 + 2 * q])}`],
    ...mc(r, L(p, q, p * Mx + q * My), [L(q, -p, q * Mx - p * My), L(p, q, p * x1 + q * y1), L(p, -q, p * Mx - q * My)], k => L(p, q, p * Mx + q * My + k)),
    ex: ['האנך האמצעי עובר דרך אמצע הקטע, ו-AB ניצב לו:', `$$M = ${vec([Mx, My])}, \\qquad \\vec{AB} = ${vec([2 * p, 2 * q])}`, `$$${2 * p}(${xm(Mx)}) ${2 * q < 0 ? '-' : '+'} ${Math.abs(2 * q)}(${xm(My).replace('x', 'y')}) = 0`, `$$${L(p, q, p * Mx + q * My)}`] };
} },
{ id: 'cx8', t: 'cx', sub: 'ריבוע של מרוכב', l: 2, g(r) {
  const a = r.nz(-5, 5), b = r.nz(-5, 5);
  return { q: ['חשבו:', `$$(${cx(a, b)})^2`], ...mc(r, cx(a * a - b * b, 2 * a * b), [cx(a * a + b * b, 2 * a * b), cx(a * a - b * b, a * b), cx(a * a, b * b)], k => cx(a * a - b * b + k, 2 * a * b)),
    ex: [`$$(${cx(a, b)})^2 = ${a * a} + 2\\cdot${par(a)}\\cdot${par(b)}i + ${par(b)}^2 i^2 = ${cx(a * a - b * b, 2 * a * b)}`] };
} },
{ id: 'cx9', t: 'cx', sub: 'משוואה עם צמוד', l: 2, g(r) {
  const x0 = r.nz(-4, 4), y0 = r.nz(-4, 4), c = 3 * x0, d = -y0;
  return { q: ['מצאו את $z$:', `$$z + 2\\bar{z} = ${cx(c, d)}`], ...mc(r, `z = ${cx(x0, y0)}`, [`z = ${cx(x0, -y0)}`, `z = ${cx(c, d)}`, `z = ${cx(-x0, y0)}`], k => `z = ${cx(x0 + k, y0)}`),
    ex: ['כותבים z = x + iy, כך שהצמוד הוא x − iy:', `$$(x + iy) + 2(x - iy) = 3x - iy = ${cx(c, d)}`, 'משווים חלק ממשי וחלק מדומה:', `$$3x = ${c}, \\qquad -y = ${d} \\;\\Rightarrow\\; z = ${cx(x0, y0)}`] };
} },
{ id: 'cx10', t: 'cx', sub: 'שורשי מרוכבים', l: 3, src: 'אלגברה לינארית, שבוע 2: מספרים מרוכבים', calm: 'לא צריך לפתור כלום — רק להעלות כל אפשרות בחזקה ולבדוק. בהצגה קוטבית זה לוקח שורה.', g(r) {
  const V = r.pick([
    ['z^4 = -16', '\\sqrt{2} + \\sqrt{2}\\,i', ['2i', '-2', '2 + 2i'], ['$$\\sqrt{2} + \\sqrt{2}\\,i = 2\\operatorname{cis}\\frac{\\pi}{4}', '$$\\left(2\\operatorname{cis}\\frac{\\pi}{4}\\right)^4 = 16\\operatorname{cis}\\pi = -16']],
    ['z^3 = -8', '1 + \\sqrt{3}\\,i', ['2', '-1 + \\sqrt{3}\\,i', '2i'], ['$$1 + \\sqrt{3}\\,i = 2\\operatorname{cis}\\frac{\\pi}{3}', '$$\\left(2\\operatorname{cis}\\frac{\\pi}{3}\\right)^3 = 8\\operatorname{cis}\\pi = -8']],
    ['z^2 = 2i', '1 + i', ['i', '1 - i', '\\sqrt{2}\\,i'], ['$$(1 + i)^2 = 1 + 2i + i^2 = 2i']],
    ['z^6 = -1', '\\frac{\\sqrt{3}}{2} + \\frac{1}{2}i', ['i\\sqrt{2}', '\\frac{1}{2} + \\frac{\\sqrt{3}}{2}i', '-1'], ['$$\\frac{\\sqrt{3}}{2} + \\frac{1}{2}i = \\operatorname{cis}\\frac{\\pi}{6}', '$$\\left(\\operatorname{cis}\\frac{\\pi}{6}\\right)^6 = \\operatorname{cis}\\pi = -1']],
  ]);
  return { q: ['איזה מהמספרים הבאים הוא פתרון של המשוואה?', `$$${V[0]}`], ...mc(r, `z = ${V[1]}`, V[2].map(s => `z = ${s}`)), ex: ['בודקים בהצגה קוטבית, לפי דה-מואבר:', ...V[3]] };
} },
{ id: 'cx11', t: 'cx', sub: 'כפל ב-i', l: 1, g(r) {
  const a = r.nz(-6, 6), b = r.nz(-6, 6);
  return { q: ['חשבו:', `$$i(${cx(a, b)})`], ...mc(r, cx(-b, a), [cx(b, -a), cx(b, a), cx(-b, -a)], k => cx(-b + k, a)),
    ex: [`$$i\\cdot ${a} + i\\cdot${par(b)}i = ${a}i + ${par(b)}i^2 = ${cx(-b, a)}`, 'גאומטרית: כפל ב-i מסובב את המספר ב-90 מעלות.'] };
} },
{ id: 'li9', t: 'lim', sub: 'גבול בהצבה', l: 1, g(r) {
  const k = r.nz(-4, 4), b = r.nz(-5, 5), c = r.i(-6, 6), v = k * k + b * k + c;
  return { q: ['חשבו:', `$$\\lim_{x\\to ${k}} (${poly([[1, 'x^2'], [b, 'x'], [c, '']])})`], ...mc(r, `${v}`, [`${-k * k + b * k + c}`, `${k * k - b * k + c}`, '#הגבול לא קיים'], j => `${v + j}`),
    ex: ['פולינום הוא פונקציה רציפה, ולכן פשוט מציבים:', `$$${par(k)}^2 + ${par(b)}\\cdot${par(k)} ${pm(c)} = ${v}`] };
} },
{ id: 'li10', t: 'lim', sub: 'נגזרת של מנה', l: 2, g(r) {
  let a, b, c, d; do { a = r.nz(-4, 4); b = r.nz(-5, 5); c = r.nz(-3, 3); d = r.nz(-5, 5); } while (a * d - b * c === 0);
  const den = poly([[c, 'x'], [d, '']]), F = s => `f'(x) = ${s}`;
  return { q: ['גזרו:', `$$f(x) = \\frac{${poly([[a, 'x'], [b, '']])}}{${den}}`], ...mc(r, F(`\\frac{${a * d - b * c}}{(${den})^2}`), [F(`\\frac{${b * c - a * d}}{(${den})^2}`), F(fr(a, c)), F(`\\frac{${a * d - b * c}}{${den}}`)]),
    ex: ['כלל המנה:', "$$\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}", `$$f'(x) = \\frac{${a}(${den}) - ${par(c)}(${poly([[a, 'x'], [b, '']])})}{(${den})^2} = \\frac{${a * d - b * c}}{(${den})^2}`] };
} },
{ id: 'li11', t: 'lim', sub: 'כלל המכפלה', l: 2, g(r) {
  const k = r.nz(-3, 3), K = poly([[k, 'x']]), F = s => `f'(x) = ${s}`;
  return { q: ['גזרו:', `$$f(x) = x^2 e^{${K}}`], ...mc(r, F(`e^{${K}}(${poly([[k, 'x^2'], [2, 'x']])})`), [F(`2xe^{${K}}`), F(`${2 * k}xe^{${K}}`), F(`e^{${K}}(${poly([[k, 'x^2'], [-2, 'x']])})`)], j => F(`e^{${K}}(${poly([[k + j, 'x^2'], [2, 'x']])})`)),
    ex: ['כלל המכפלה, ונגזרת של האקספוננט לפי כלל השרשרת:', `$$f'(x) = 2x\\,e^{${K}} + x^2\\cdot ${k}e^{${K}} = e^{${K}}(${poly([[k, 'x^2'], [2, 'x']])})`] };
} },
{ id: 'li12', t: 'lim', sub: 'רציפות', l: 3, src: 'אינפי 1: רציפות', calm: 'רציפות בנקודת החיבור = שני הגבולות החד-צדדיים שווים. מציבים את הנקודה בשני הביטויים ומשווים.', g(r) {
  const k = r.nz(-3, 3), b = r.nz(-4, 4), c = r.i(-5, 5), A = b * k + c - k * k;
  return { q: ['עבור איזה ערך של $a$ הפונקציה רציפה?', `$$f(x) = \\begin{cases} x^2 + a, & x < ${k} \\\\ ${poly([[b, 'x'], [c, '']])}, & x \\geq ${k} \\end{cases}`], ...mc(r, `a = ${A}`, [`a = ${b * k + c}`, `a = ${-A}`, `a = ${A + 2 * k * k}`], j => `a = ${A + j}`),
    ex: [`הבעיה היחידה היא בנקודה $x = ${k}$. הגבול משמאל צריך להיות שווה לערך:`, `$$${par(k)}^2 + a = ${b}\\cdot${par(k)} ${pm(c)}`, `$$${k * k} + a = ${b * k + c} \\;\\Rightarrow\\; a = ${A}`] };
} },
{ id: 'li13', t: 'lim', sub: 'גבולות חד-צדדיים', l: 3, src: 'אינפי 1: גבול של פונקציה', calm: 'מפרקים את הערך המוחלט לשני מקרים — בדיוק כמו בפתרון משוואה עם ערך מוחלט.', g(r) {
  const k = r.nz(-4, 4), side = r.pick(['', '+', '-']), cor = side === '+' ? '1' : side === '-' ? '-1' : '#הגבול לא קיים';
  return { q: ['חשבו:', `$$\\lim_{x\\to ${k}${side ? '^' + side : ''}} \\frac{\\left|${xm(k)}\\right|}{${xm(k)}}`], ...mc(r, cor, ['1', '-1', '0', '#הגבול לא קיים'].filter(o => o !== cor)),
    ex: [`כאשר $x > ${k}$ הביטוי שווה ל-1, וכאשר $x < ${k}$ הוא שווה ל-(−1):`, `$$\\lim_{x\\to ${k}^+} = 1, \\qquad \\lim_{x\\to ${k}^-} = -1`, side ? 'ולכן הגבול החד-צדדי המבוקש הוא ' + (side === '+' ? '1.' : '−1.') : 'הגבולות החד-צדדיים שונים, ולכן הגבול (הדו-צדדי) לא קיים.'] };
} },
{ id: 'cv7', t: 'crv', sub: 'קיצון עם אקספוננט', l: 2, g(r) {
  const k = r.i(1, 4), K = k === 1 ? '' : k, val = `\\frac{1}{${K}e}`, P = (x, y) => `\\left(${x}, ${y}\\right)`;
  return { q: ['מהי נקודת המקסימום של הפונקציה?', `$$f(x) = xe^{-${K}x}`], ...mc(r, P(fr(1, k), val), [P(`${k}`, `${k}e^{-${k * k}}`), P(fr(1, k), '\\frac{1}{e}'), P(fr(-1, k), `-${k === 1 ? '' : k}e`), P('0', '0')]),
    ex: [`$$f'(x) = e^{-${K}x} - ${K}xe^{-${K}x} = e^{-${K}x}(1 - ${K}x) = 0 \\;\\Rightarrow\\; x = ${fr(1, k)}`, 'הנגזרת עוברת מחיובית לשלילית — מקסימום. מציבים:', `$$f\\left(${fr(1, k)}\\right) = ${fr(1, k)}\\cdot e^{-1} = ${val}`] };
} },
{ id: 'cv8', t: 'crv', sub: 'אסימפטוטה של לוגריתם', l: 2, g(r) {
  const a = r.nz(-5, 5), b = r.nz(-5, 5);
  return { q: ['מהי האסימפטוטה האנכית של הפונקציה?', `$$f(x) = \\ln(${xm(a)}) ${pm(b)}`], ...mc(r, `x = ${a}`, [`x = ${-a}`, `y = ${b}`, `x = ${a + 1}`]),
    ex: ['תחום ההגדרה:', `$$x > ${a}`, 'כאשר x שואף ל-' + a + ' מימין, ה-ln שואף למינוס אינסוף:', `$$x = ${a}`] };
} },
{ id: 'cv9', t: 'crv', sub: 'בעיית קיצון', l: 3, calm: 'בעיית קיצון = לכתוב את מה שרוצים למקסם כפונקציה של משתנה אחד, ואז נגזרת שווה 0. כמו כל חקירה.', g(r) {
  const s = r.i(3, 10);
  if (r.i(0, 1)) return { q: [`מלבן בעל היקף ${4 * s} ס"מ. מהו השטח המקסימלי האפשרי שלו (בסמ"ר)?`], ...mc(r, `${s * s}`, [`${2 * s * s}`, `${4 * s * s}`, `${s * (s + 1)}`]),
    ex: ['אם אורך צלע אחת הוא x, אז הצלע השנייה היא:', `$$${2 * s} - x`, `$$S(x) = x(${2 * s} - x), \\qquad S'(x) = ${2 * s} - 2x = 0 \\;\\Rightarrow\\; x = ${s}`, 'כלומר ריבוע, והשטח:', `$$S = ${s}^2 = ${s * s}`] };
  const L = 4 * s;
  return { q: [`רוצים לגדר שטח מלבני לאורך נהר, כך שהצד שליד הנהר לא צריך גדר. יש ${L} מטר גדר. מהו השטח המקסימלי (במ"ר)?`], ...mc(r, `${2 * s * s}`, [`${s * s}`, `${4 * s * s}`, `${3 * s * s}`]),
    ex: ['שתי צלעות ניצבות לנהר באורך x, והצלע המקבילה לנהר:', `$$${L} - 2x`, `$$S(x) = x(${L} - 2x), \\qquad S'(x) = ${L} - 4x = 0 \\;\\Rightarrow\\; x = ${s}`, `$$S = ${s}\\cdot ${L - 2 * s} = ${2 * s * s}`] };
} },
{ id: 'cv10', t: 'crv', sub: 'קיצון לפי נגזרת', l: 3, calm: 'קיצון יש רק איפה שהנגזרת מחליפה סימן. שורש "כפול" (בריבוע) לא מחליף סימן — זו כל המלכודת.', g(r) {
  const a = r.i(-4, 4); let b, c; do { b = r.i(-4, 4); c = r.i(-4, 4); } while (b === a || c === a || c === b);
  const f = v => v === 0 ? 'x' : `(${xm(v)})`, [e, n] = r.pick([[`${f(a)}^2${f(b)}`, 1], [`${f(a)}${f(b)}^2`, 1], [`${f(a)}${f(b)}${f(c)}`, 3], [`${f(a)}^2${f(b)}^2`, 0]]);
  return { q: ['נתונה הנגזרת של פונקציה f. כמה נקודות קיצון יש ל-f?', `$$f'(x) = ${e}`], ...mc(r, `${n}`, ['0', '1', '2', '3'].filter(v => v !== `${n}`)),
    ex: ['בודקים באילו אפסים של הנגזרת היא מחליפה סימן. גורם בחזקה 1 מחליף סימן; גורם בריבוע — לא.', `לכן מספר נקודות הקיצון הוא ${n}.`] };
} },
{ id: 'in7', t: 'int', sub: 'אינטגרלים מיידיים', l: 1, g(r) {
  const k = r.i(2, 5), a = r.nz(-5, 5), v = r.i(0, 2), I = s => `${s} + C`;
  const V = [[`e^{${k}x}`, I(`\\frac{1}{${k}}e^{${k}x}`), [I(`${k}e^{${k}x}`), I(`e^{${k}x}`), I(`\\frac{e^{${k + 1}x}}{${k + 1}}`)], 'גוזרים את התשובה ובודקים — הנגזרת של המעריך (' + k + ') יוצאת החוצה, ולכן מחלקים בה.'],
    [`\\cos(${k}x)`, I(`\\frac{1}{${k}}\\sin(${k}x)`), [I(`${k}\\sin(${k}x)`), I(`-\\frac{1}{${k}}\\sin(${k}x)`), I(`\\frac{1}{${k}}\\cos(${k}x)`)], 'הנגזרת של sin היא cos, ומחלקים בנגזרת הפנימית (' + k + ').'],
    [`\\frac{1}{${xm(-a)}}`, I(`\\ln|${xm(-a)}|`), [I(`-\\frac{1}{(${xm(-a)})^2}`), I(`\\ln|x| ${pm(a)}`), I(`(${xm(-a)})\\ln|${xm(-a)}|`)], 'האינטגרל של 1 חלקי ביטוי לינארי (עם מקדם 1 ל-x) הוא ln של הערך המוחלט שלו.']][v];
  return { q: ['חשבו:', `$$\\int ${V[0]}\\,dx`], ...mc(r, V[1], V[2]), ex: [V[3], `$$\\int ${V[0]}\\,dx = ${V[1]}`] };
} },
{ id: 'in8', t: 'int', sub: 'סימטריה באינטגרל', l: 2, g(r) {
  const a = r.i(1, 4), b = r.nz(-4, 4), c = r.nz(-5, 5);
  return { q: ['חשבו:', `$$\\int_{-${a}}^{${a}} (${poly([[b, 'x^3'], [c, '']])})\\,dx`], ...mc(r, `${2 * a * c}`, ['0', `${a * c}`, `${4 * a * c}`], k => `${2 * a * c + k}`),
    ex: ['החלק האי-זוגי מתבטל בקטע סימטרי:', `$$\\int_{-${a}}^{${a}} ${poly([[b, 'x^3']])}\\,dx = 0`, 'ונשאר רק הקבוע:', `$$\\int_{-${a}}^{${a}} ${par(c)}\\,dx = ${c}\\cdot ${2 * a} = ${2 * a * c}`] };
} },
{ id: 'in9', t: 'int', sub: 'אינטגרל שנותן ln', l: 2, g(r) {
  const a = r.i(1, 5), k = r.i(2, 6), up = a * (k - 1);
  return { q: ['חשבו:', `$$\\int_0^{${up}} \\frac{1}{x + ${a}}\\,dx`], ...mc(r, `\\ln ${k}`, [`\\ln ${up}`, `\\ln ${a * k}`, fr(1, k), `\\ln ${k + 1}`]),
    ex: [`$$\\left[\\ln(x + ${a})\\right]_0^{${up}} = \\ln ${a * k} - \\ln ${a} = \\ln\\frac{${a * k}}{${a}} = \\ln ${k}`] };
} },
{ id: 'in10', t: 'int', sub: 'המשפט היסודי', l: 3, src: 'אינפי 1: המשפט היסודי של החדו"א', calm: 'גוזרים אינטגרל → מקבלים את הפונקציה שבפנים. הגבול העליון הוא x², אז מוסיפים כלל שרשרת. שני כלים מוכרים.', g(r) {
  const [ft, fx2, fx] = r.pick([['\\sin t', '\\sin(x^2)', '\\sin x'], ['e^{t}', 'e^{x^2}', 'e^{x}'], ['\\cos t', '\\cos(x^2)', '\\cos x'], ['\\ln(1 + t)', '\\ln(1 + x^2)', '\\ln(1 + x)']]), F = s => `F'(x) = ${s}`;
  return { q: ['נתון:', `$$F(x) = \\int_0^{x^2} ${ft}\\,dt`, 'חשבו:', "$$F'(x)"], ...mc(r, F(`2x\\,${fx2}`), [F(fx2), F(`2x\\,${fx}`), F(fx)]),
    ex: ['לפי המשפט היסודי, הנגזרת של אינטגרל לפי הגבול העליון היא הפונקציה שבפנים, מוצבת בגבול. כאן הגבול הוא x², ולכן כופלים גם בנגזרת שלו:', `$$F'(x) = ${fx2}\\cdot (x^2)' = 2x\\,${fx2}`] };
} },
{ id: 'in11', t: 'int', sub: 'סכומי רימן', l: 3, src: 'אינפי 1: האינטגרל המסוים', calm: 'זו ההגדרה של האינטגרל: סכום של מלבנים דקים. מזהים את הפונקציה (x בחזקה) ואת הקטע [0, 1], ומחשבים אינטגרל רגיל.', g(r) {
  const p = r.i(1, 4), pw = p === 1 ? '' : `^{${p}}`;
  return { q: ['חשבו:', `$$\\lim_{n\\to\\infty} \\frac{1}{n}\\sum_{k=1}^{n} \\left(\\frac{k}{n}\\right)${pw}`], ...mc(r, fr(1, p + 1), [fr(1, p), '1', '\\infty', '0']),
    ex: ['זה סכום רימן של הפונקציה בקטע [0, 1]:', `$$\\int_0^1 x${pw}\\,dx = \\left[\\frac{x^{${p + 1}}}{${p + 1}}\\right]_0^1 = ${fr(1, p + 1)}`] };
} },
{ id: 'sq8', t: 'seq', sub: 'סדרה חשבונית', l: 1, g(r) {
  const a = r.i(-10, 10), d = r.nz(-5, 5), m = r.i(2, 5), k = r.i(m + 2, 12), am = a + (m - 1) * d, ak = a + (k - 1) * d;
  return { q: ['בסדרה חשבונית:', `$$a_{${m}} = ${am}, \\qquad a_{${k}} = ${ak}`, 'מהו ההפרש של הסדרה?'], ...mc(r, `d = ${d}`, [`d = ${-d}`, `d = ${ak - am}`, `d = ${fr(ak - am, k - m + 1)}`], j => `d = ${d + j}`),
    ex: [`בין האיבר ה-${m} לאיבר ה-${k} יש ${k - m} הפרשים:`, `$$d = \\frac{${ak} - ${par(am)}}{${k} - ${m}} = ${d}`] };
} },
{ id: 'sq9', t: 'seq', sub: 'סדרה הנדסית', l: 2, g(r) {
  const a = r.nz(-3, 5), q = r.pick([2, 3, -2, -3]), a4 = a * q ** 3;
  return { q: ['בסדרה הנדסית:', `$$a_1 = ${a}, \\qquad a_4 = ${a4}`, 'מהי המנה?'], ...mc(r, `q = ${q}`, [`q = ${-q}`, `q = ${q ** 3}`, `q = ${fr(a4, 3 * a)}`]),
    ex: [`$$a_4 = a_1 q^3 \\;\\Rightarrow\\; q^3 = \\frac{${a4}}{${a}} = ${q ** 3} \\;\\Rightarrow\\; q = ${q}`] };
} },
{ id: 'sq10', t: 'seq', sub: 'נוסחת נסיגה', l: 2, g(r) {
  const p = r.pick([2, 3, -1]), s = r.nz(-3, 3), c = r.i(-3, 4), t = [c]; for (let i = 0; i < 4; i++) t.push(p * t[i] + s);
  return { q: ['נתונה סדרה:', `$$a_1 = ${c}, \\qquad a_{n+1} = ${poly([[p, 'a_n'], [s, '']])}`, 'מהו $a_4$?'], ...mc(r, `${t[3]}`, [`${t[2]}`, `${t[4]}`, `${t[3] + s}`], k => `${t[3] + k}`),
    ex: ['מחשבים איבר אחרי איבר:', `$$a_2 = ${t[1]}, \\quad a_3 = ${t[2]}, \\quad a_4 = ${t[3]}`] };
} },
{ id: 'sq11', t: 'seq', sub: 'גבול של סדרת נסיגה', l: 3, src: 'אינפי 1: סדרות מונוטוניות וחסומות', calm: 'אם הגבול קיים, מציבים L בשני הצדדים ומקבלים משוואה ריבועית מהתיכון. בוחרים את הפתרון שמתאים לסימן.', g(r) {
  const m = r.i(2, 4), k = m * (m - 1);
  return { q: ['ידוע שהסדרה הבאה מתכנסת. מהו הגבול שלה?', `$$a_1 = 0, \\qquad a_{n+1} = \\sqrt{${k} + a_n}`], ...mc(r, `${m}`, [`${-(m - 1)}`, sqrtTex(k), '\\infty']),
    ex: ['אם הגבול הוא L, אז גם האיבר הבא שואף ל-L:', `$$L = \\sqrt{${k} + L} \\;\\Rightarrow\\; L^2 - L - ${k} = 0 \\;\\Rightarrow\\; L = ${m}, \\; L = ${-(m - 1)}`, 'כל האיברים אי-שליליים (שורש), ולכן:', `$$L = ${m}`] };
} },
{ id: 'sq12', t: 'seq', sub: 'טור טלסקופי', l: 3, src: 'אינפי 1: טורים', calm: 'מפרקים לשברים חלקיים (כמו מכנה משותף — רק הפוך), ורואים שכמעט הכל מתבטל.', g(r) {
  const k = r.i(0, 3), term = k === 0 ? '\\frac{1}{n(n+1)}' : `\\frac{1}{(n + ${k})(n + ${k + 1})}`;
  return { q: ['חשבו את סכום הטור:', `$$\\sum_{n=1}^{\\infty} ${term}`], ...mc(r, fr(1, k + 1), [fr(1, k + 2), '\\infty', fr(1, 2 * (k + 1)), '1'], j => fr(1, k + 3 + j)),
    ex: ['מפרקים:', `$$${term} = \\frac{1}{n ${k ? '+ ' + k : ''}} - \\frac{1}{n + ${k + 1}}`, 'בסכום החלקי כמעט הכל מתבטל, ונשאר האיבר הראשון:', `$$S = \\frac{1}{${k + 1}}${k === 0 ? ' = 1' : ''}`] };
} },
];

const GENS_BY_ID = Object.fromEntries(GENS.map(g => [g.id, g]));

function buildQ(id, seed) {
  const T = GENS_BY_ID[id]; if (!T) return null;
  const q = T.g(new Rng(seed));
  return Object.assign(q, { id, seed, key: id + ':' + seed, topic: T.t, sub: T.sub, lvl: T.l, calm: T.calm || null, src: T.src || null });
}

/* ---------- דפי נוסחאות קצרים לכל נושא ---------- */
const SHEETS = {
  eq: ['משוואה לינארית: מעבירים אגפים, ומחלקים במקדם של x.', 'מערכת: הצבה או חיבור/חיסור משוואות.', 'אי-שוויון: כשכופלים או מחלקים במספר שלילי — הופכים את הכיוון.', 'ערך מוחלט:', '$$|A| = b \\;(b>0) \\;\\Rightarrow\\; A = b \\;\\;,\\;\\; A = -b', 'מודולו p: מחלקים = כופלים בהופכי.', '$$a\\cdot a^{-1} \\equiv 1 \\pmod{p}'],
  fn: ['הרכבה: קודם הפנימית, אחר כך החיצונית.', '$$(f\\circ g)(x) = f(g(x))', 'זוגית / אי-זוגית:', '$$f(-x) = f(x) \\qquad f(-x) = -f(x)', 'הזזות:', '$$f(x - a) + b', 'הזזה a ימינה ו-b למעלה. פונקציה הפוכה: מחליפים x↔y ומבודדים.'],
  poly: ['שיפוע וישר:', '$$m = \\frac{y_2 - y_1}{x_2 - x_1}, \\qquad y - y_1 = m(x - x_1)', 'נוסחת השורשים ודיסקרימיננטה:', '$$x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}', 'קודקוד:', '$$x_v = -\\frac{b}{2a}', 'וייטה:', '$$x_1 + x_2 = -\\frac{b}{a}, \\qquad x_1 x_2 = \\frac{c}{a}', 'משפט השארית: השארית בחלוקה ב-$x-a$ היא $P(a)$.'],
  exp: ['חוקי חזקות:', '$$a^m a^n = a^{m+n}, \\quad \\frac{a^m}{a^n} = a^{m-n}, \\quad (a^m)^n = a^{mn}', 'חוקי לוגריתמים:', '$$\\log_a(xy) = \\log_a x + \\log_a y, \\quad \\log_a x^k = k\\log_a x', '$$\\log_a b = c \\iff a^c = b', 'תמיד לבדוק תחום הגדרה: ארגומנט של לוג חיובי, מתחת לשורש זוגי — אי-שלילי.'],
  trig: ['$$\\sin^2 x + \\cos^2 x = 1', '$$\\sin 2x = 2\\sin x\\cos x, \\qquad \\cos 2x = \\cos^2 x - \\sin^2 x', 'פתרון כללי:', '$$\\sin x = \\sin\\alpha \\;\\Rightarrow\\; x = \\alpha + 2\\pi k \\;\\;,\\;\\; x = \\pi - \\alpha + 2\\pi k', '$$\\cos x = \\cos\\alpha \\iff x = \\pm\\alpha + 2\\pi k', 'מחזור של sin(kx) ו-cos(kx) הוא 2π/k, ושל tan(kx) הוא π/k.'],
  vec: ['$$|\\vec{u}| = \\sqrt{u_1^2 + u_2^2 + u_3^2}', 'מכפלה סקלרית:', '$$\\vec{u}\\cdot\\vec{v} = u_1v_1 + u_2v_2 + u_3v_3 = |\\vec{u}||\\vec{v}|\\cos\\theta', 'ניצבות: המכפלה הסקלרית שווה ל-0.', 'צירוף לינארי: פותרים מערכת משוואות על המקדמים.'],
  geo: ['מרחק ואמצע:', '$$d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}, \\qquad M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)', 'מעגל:', '$$(x-a)^2 + (y-b)^2 = R^2', 'מרחק נקודה מישר:', '$$d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}', 'משיק למעגל: הרדיוס ניצב למשיק.'],
  cx: ['$$i^2 = -1, \\qquad \\bar{z} = a - bi, \\qquad |z| = \\sqrt{a^2 + b^2}', 'חילוק: כופלים בצמוד של המכנה.', 'הצגה קוטבית ודה-מואבר:', '$$z = r\\operatorname{cis}\\theta = r(\\cos\\theta + i\\sin\\theta)', '$$z^n = r^n\\operatorname{cis}(n\\theta)'],
  lim: ['גבולות חשובים:', '$$\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\qquad \\lim_{n\\to\\infty}\\left(1+\\frac{1}{n}\\right)^n = e', 'הגדרת הנגזרת:', '$$f\'(a) = \\lim_{h\\to 0}\\frac{f(a+h) - f(a)}{h}', 'כללי גזירה:', '$$(x^n)\' = nx^{n-1}, \\quad (fg)\' = f\'g + fg\', \\quad (f(g(x)))\' = f\'(g(x))\\,g\'(x)', 'משיק:', '$$y - f(a) = f\'(a)(x - a)'],
  crv: ['קיצון: נגזרת מתאפסת ומחליפה סימן.', 'פיתול: נגזרת שנייה מתאפסת ומחליפה סימן.', 'אסימפטוטה אנכית: המכנה מתאפס. אופקית: הגבול באינסוף.', 'קיצון בקטע סגור: בודקים נקודות קיצון בתוך הקטע + שני הקצוות.'],
  int: ['$$\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)', '$$\\int_a^b f(x)\\,dx = F(b) - F(a)', 'הצבה: מחפשים פונקציה ונגזרת שלה בתוך האינטגרל.', 'אינטגרציה בחלקים:', '$$\\int u\\,dv = uv - \\int v\\,du', 'שטח בין גרפים: אינטגרל של (עליונה − תחתונה).'],
  seq: ['חשבונית:', '$$a_n = a_1 + (n-1)d, \\qquad S_n = \\frac{n(a_1 + a_n)}{2}', 'הנדסית:', '$$a_n = a_1 q^{n-1}, \\qquad S_\\infty = \\frac{a_1}{1-q} \\;\\; (|q|<1)', 'אינדוקציה: בסיס (n=1), הנחה (נכון ל-n), מעבר (מוכיחים ל-n+1).', 'סופרמום: החסם העליון הקטן ביותר. לא חייב להיות איבר בקבוצה.'],
};

if (typeof module !== 'undefined') module.exports = { TOPICS, GENS, GENS_BY_ID, buildQ, SHEETS };
