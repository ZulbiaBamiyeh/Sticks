// Runs a batch of headless fights (every weapon pairing across every rival layout)
// and prints a table: winner, time, HP left, and where the damage came from.
//   npm install && npm run sim
// Set CHROMIUM_PATH to use an existing Chromium instead of Playwright's download.
import { chromium } from 'playwright';

const page = new URL('../index.html', import.meta.url);
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const p = await browser.newPage();
const errors = [];
p.on('pageerror', (e) => errors.push(e.message));
await p.goto(page.href);

const out = await p.evaluate(() => {
  const H = window.__homeTurf, W = ['sword', 'hammer', 'bow'];
  const invalid = [];
  H.templates.forEach((t, i) => W.forEach((w) => { const v = H.validate({ weapon: w, pieces: t }); if (!v.ok) invalid.push(`T${i} ${w}: ${v.msg}`); }));
  const rows = [];
  let seed = 1;
  for (const bw of W) for (const rw of W) for (let ti = 0; ti < H.templates.length; ti++) {
    const r = H.fight(seed++, { weapon: bw, pieces: H.templates[0] }, { weapon: rw, pieces: H.templates[ti] });
    const s = r.stats, pair = (k) => `${Math.round(s[0][k])}/${Math.round(s[1][k])}`;
    rows.push({ match: `${bw} vs ${rw} T${ti}`, winner: ['blue', 'red'][r.winner] ?? 'draw', ko: r.ko, secs: (r.t / 60).toFixed(1), hp: r.hp.join('/'), weapon: pair('dealt'), traps: pair('trap'), squeeze: pair('zone'), pads: pair('pads'), found: pair('found') });
  }
  return { invalid, rows };
});

console.log(out.invalid.length ? out.invalid.join('\n') : `All ${3 * 5} template/weapon builds validate.`);
console.table(out.rows);
console.log(errors.length ? errors.join('\n') : 'No page errors.');
await browser.close();

