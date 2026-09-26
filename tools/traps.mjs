// Do fighters play around what is on the floor? Runs fights with spikes switched on and sorts every spike
// hit by why it happened. Knowing where a spike is should keep you off it: the only fair ways onto one are
// finding it the first time and being knocked onto it.
//   node tools/traps.mjs [fights]      (CHROMIUM_PATH to use an existing Chromium)
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

const N = Number(process.argv[2] || 120);
const src = readFileSync(new URL('../index.html', import.meta.url), 'utf8').replace(/^const SPIKES_ON = false;/m, 'const SPIKES_ON = true;');
const file = join(mkdtempSync(join(tmpdir(), 'traps-')), 'index.html');
writeFileSync(file, src);

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const p = await browser.newPage();
const errors = [];
p.on('pageerror', (e) => errors.push(e.message));
await p.goto('file://' + file);
const out = await p.evaluate((N) => {
  const H = window.__homeTurf, T = H.templates, W = ['sword', 'daggers', 'spear', 'hammer', 'bow', 'stars'];
  const kinds = { first: 0, knocked: 0, walked: 0, attack: 0 }, own = { walked: 0, attack: 0 };
  let wins = [0, 0];
  for (let s = 1; s <= N; s++) {
    const r = H.fight(s, { weapon: W[s % 6], acro: s % 5, pieces: T[s % T.length] }, { weapon: W[(s * 5 + 1) % 6], acro: (s * 3) % 5, pieces: T[(s + 3) % T.length] });
    if (r.winner >= 0) wins[r.winner]++;
    for (const line of r.trace) {
      const m = line.match(/(\w) hit (\w) spike c\d+ known=(\w+) st=(\w+).*knocked=(\w+)/);
      if (!m) continue;
      const k = m[3] === 'false' ? 'first' : m[4] === 'stun' || m[5] === 'true' ? 'knocked' : m[4] === 'atk' ? 'attack' : 'walked';
      kinds[k]++;
      if (m[1] === m[2] && own[k] !== undefined) own[k]++;
    }
  }
  // Placement: the same fighter on three halves that cost the same. If where the spikes go matters, the
  // half with spikes across the way in should win more than the one with them up on a ledge nobody crosses.
  const blocks = [{ t: 'block', c: 4, r: 8 }, { t: 'block', c: 5, r: 8 }];
  const halves = {
    'spikes across the way in': [...blocks, { t: 'spikes', c: 6, r: 10 }, { t: 'spikes', c: 7, r: 10 }],
    'spikes up on a ledge': [...blocks, { t: 'spikes', c: 4, r: 7 }, { t: 'spikes', c: 5, r: 7 }],
    'no spikes': blocks,
  };
  const place = {};
  for (const [name, pieces] of Object.entries(halves)) {
    let w = 0, n = 0, trap = 0, held = 0;
    for (let s = 1; s <= N; s++) {
      const r = H.fight(5000 + s, { weapon: W[s % 6], acro: s % 5, pieces }, { weapon: W[(s * 7 + 2) % 6], acro: (s * 3) % 5, pieces: [] });
      n++; if (r.winner === 0) w++; trap += r.stats[0].trap; held += r.stats[0].held || 0;
    }
    place[name] = { 'owner wins': `${Math.round(100 * w / n)}%`, 'trap damage a fight': (trap / n).toFixed(1), 'seconds held behind spikes': (held / n / 60).toFixed(1) };
  }
  return { kinds, own, place };
}, N);
const total = Object.values(out.kinds).reduce((a, b) => a + b, 0);
console.log(`${N} fights, ${total} spike hits (${(total / N).toFixed(1)} a fight)`);
console.table({
  'found it the first time': { hits: out.kinds.first, note: 'fair: nobody knew it was there' },
  'knocked onto it': { hits: out.kinds.knocked, note: 'fair: the other fighter put it there' },
  'walked onto a known spike': { hits: out.kinds.walked, note: `should be ~0 (${out.own.walked} on its own spikes)` },
  'attacked onto a known spike': { hits: out.kinds.attack, note: `should be ~0 (${out.own.attack} on its own spikes)` },
});
console.log('Placement: the same fighter on three halves that cost the same');
console.table(out.place);
console.log(errors.length ? errors.join('\n') : 'No page errors.');
await browser.close();
