// Runs batches of headless fights and prints balance tables:
//   1. the ladder: a default build against every rival,
//   2. random loadouts on shared layouts: win rate per weapon, per skill, per trinket, per acrobatics level, and weapon against weapon.
//   npm install && npm run sim            (-- --fights 3000 for tighter numbers, -- --seed 7 for a different sample)
// Set CHROMIUM_PATH to use an existing Chromium instead of Playwright's download.
import { chromium } from 'playwright';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? Number(process.argv[i + 1]) : d; };
const FIGHTS = arg('fights', 1200), SEED = arg('seed', 12345);

const page = new URL('../index.html', import.meta.url);
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const p = await browser.newPage();
const errors = [];
p.on('pageerror', (e) => errors.push(e.message));
await p.goto(page.href);

const out = await p.evaluate(([FIGHTS, SEED]) => {
  const H = window.__homeTurf, W = [...H.weapons.filter((w) => w !== 'spellbook'), ...Object.values(H.run.ITEM).filter((it) => it.weapon === 'spellbook').map((it) => it.id)], K = [...H.skills, null], TR = [...H.trinkets, null], T = H.templates;
  const invalid = [];
  // a tome is its own entry in the tables: the weapon is the book, and the book is how it fights
  const gear = (w) => (H.run.ITEM[w] ? { weapon: 'spellbook', book: w } : { weapon: w });
  T.forEach((t, i) => W.forEach((w) => { const v = H.validate({ ...gear(w), pieces: t }); if (!v.ok) invalid.push(`T${i} ${w}: ${v.msg}`); }));
  const pct = (w, n) => (n ? `${Math.round(100 * w / n)}%` : '-');

  // 1. the ladder
  const me = { weapon: 'sword', skill: 'blink', trinket: 'ember', acro: 2, pieces: T[0] }, N = 8;
  const ladder = H.rivals.map((rv, i) => {
    let w = 0, l = 0, secs = 0;
    for (let s = 0; s < N; s++) {
      const r = H.fight(100 * i + s + 1, me, { name: rv.name, weapon: rv.weapon, book: rv.book, skill: rv.skill, trinket: rv.trinket, acro: rv.acro, pieces: T[rv.t] });
      if (r.winner === 0) w++; else if (r.winner === 1) l++;
      secs += r.t / 60;
    }
    return { rival: `${rv.name} (${rv.book || rv.weapon} · ${rv.skill} · ${rv.trinket || '-'} · acro ${rv.acro})`, 'you win': pct(w, N), 'rival wins': pct(l, N), 'avg secs': (secs / N).toFixed(1) };
  });

  // 2. random loadouts, both fighters on the same layout
  let s = SEED;
  const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
  const pick = (a) => a[Math.floor(rnd() * a.length)];
  const ws = {}, ks = {}, ts = {}, as = {}, m = {}, uses = {};
  let draws = 0, secs = 0;
  const add = (o, k, won) => { o[k] = o[k] || [0, 0]; o[k][0] += won; o[k][1]++; };
  for (let i = 0; i < FIGHTS; i++) {
    const t = T[Math.floor(rnd() * T.length)];
    const lv = () => Math.floor(rnd() * 5);
    const wa = pick(W), wb = pick(W);
    const a = { ...gear(wa), skill: pick(K), acro: lv(), pieces: t }, b = { ...gear(wb), skill: pick(K), acro: lv(), pieces: t };
    a.key = wa; b.key = wb;
    a.trinket = pick(TR); b.trinket = pick(TR);
    const r = H.fight(SEED + i, a, b);
    secs += r.t / 60;
    [a, b].forEach((x, side) => { if (x.skill) add(uses, x.skill, r.stats[side].skill); });
    if (r.winner < 0) { draws++; continue; }
    [a, b].forEach((x, side) => {
      const won = r.winner === side ? 1 : 0, y = side ? a : b;
      if (x.key !== y.key) { add(ws, x.key, won); add(m, `${x.key}>${y.key}`, won); }
      if (x.skill !== y.skill) add(ks, x.skill || 'none', won);
      if (x.trinket !== y.trinket) add(ts, x.trinket || 'no trinket', won);
      if (x.acro !== y.acro) add(as, `acrobatics ${x.acro}`, won);
    });
  }
  const rate = (o) => Object.fromEntries(Object.entries(o).map(([k, [w, n]]) => [k, { 'win rate': pct(w, n), fights: n }]));
  const mat = {};
  for (const x of W) { mat[x] = {}; for (const y of W) mat[x][y] = x === y ? '' : pct(...(m[`${x}>${y}`] || [0, 0])); }
  const perFight = Object.fromEntries(Object.entries(uses).map(([k, [u, n]]) => [k, (u / n).toFixed(1)]));
  return { invalid, ladder, weapons: rate(ws), skills: rate(ks), trinkets: rate(ts), acro: rate(as), mat, perFight, draws, avg: (secs / FIGHTS).toFixed(1) };
}, [FIGHTS, SEED]);

console.log(out.invalid.length ? out.invalid.join('\n') : 'Every layout validates with every weapon.');
console.log('\nThe ladder: sword + blink + Ember Charm + acrobatics 2 on layout 0 against each rival');
console.table(out.ladder);
console.log(`\n${FIGHTS} fights with random loadouts (seed ${SEED}). Win rate against a different weapon or skill:`);
console.table(out.weapons);
console.table(out.skills);
console.table(out.trinkets);
console.table(Object.fromEntries(Object.entries(out.acro).sort()));
console.log('Weapon against weapon (row beats column):');
console.table(out.mat);
console.log('Skill uses per fight:', out.perFight, `· draws ${out.draws} · average fight ${out.avg}s`);
console.log(errors.length ? errors.join('\n') : 'No page errors.');
await browser.close();
