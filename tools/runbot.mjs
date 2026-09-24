// Whole roguelike runs played by a bot: crown rate, duel wins, hunt and duel win rates, where runs end.
//   node tools/runbot.mjs [runs] [easy|normal|elite]   (CHROMIUM_PATH to use an existing Chromium)
import { chromium } from 'playwright';
const [N = 10, strat = 'careful'] = process.argv.slice(2);
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const p = await browser.newPage();
const errs = []; p.on('pageerror', (e) => errs.push(e.message));
await p.goto(new URL('../index.html', import.meta.url).href);
const out = await p.evaluate(([N, strat]) => {
  localStorage.clear();
  const H = window.__homeTurf, R = H.run;
  // a rough worth for a build: damage per hit times how often, times how long it lasts
  const score = (b) => {
    const st = b.stats, w = st.wpn || { min: 6, max: 10, base: 8 };
    const off = ((w.min + w.max) / 2 + st.atk) / w.base * (1 + st.crit * (0.6 + st.critDmg)) * (1 + st.haste) * (1 + st.ls * 2) * (1 + 0.06 * st.onHit.length + 0.05 * st.trig.length);
    const tough = (100 + st.hp) * (1 + st.def / 26) / (1 - Math.min(0.4, st.evasion)) * (1 + st.regen * 0.03) * (1 + st.resist * 0.2) * (1 + st.thorns * 0.02);
    return off * tough * (1 + b.acro * 0.03) * (b.skill ? 1.08 : 1) * (1 + 0.08 * Object.keys(st.flags).length);
  };
  const res = { crowns: 0, duelWins: [], endDay: [], huntWin: { easy: [0, 0], normal: [0, 0], elite: [0, 0] }, duel: [0, 0] };
  for (let k = 0; k < N; k++) {
    const run = new R.Run(1000 + k);
    let guard = 0;
    while (!run.over && guard++ < 60) {
      const b = run.build(R.TEMPLATES[0]);
      if (run.isDuel) {
        const g = run.ghost, red = { ...R.runBuild(g.equip, R.TEMPLATES[g.t]), name: g.name };
        const r = H.fight(run.seed * 7 + run.round, b, red);
        res.duel[1]++; if (r.winner === 0) res.duel[0]++;
        run.resolve(r.winner === 0);
      } else {
        const pick = strat === 'easy' ? 0 : strat === 'normal' ? 1 : strat === 'elite' ? 2 : (run.day <= 1 ? 1 : 1);
        const o = run.offers[pick];
        const r = H.fight(run.seed * 7 + run.round, b, `${o.hunt}:${o.tier}:${R.mobPower(run.day)}`);
        const won = r.winner === 0;
        res.huntWin[o.card][1]++; if (won) res.huntWin[o.card][0]++;
        run.resolve(won, o);
        if (run.loot) {
          // take whichever drop raises the score most, else bag it
          let best = -1, bestAct = 'wear', bs = score(b);
          run.loot.items.forEach((inst, i) => {
            const k = R.ITEM[inst.item].slot, targets = k === 'trinket' ? ['trinket1', 'trinket2'] : [k];
            for (const t of targets) { const s = score(R.runBuild({ ...run.equip, [t]: inst })); if (s > bs) { bs = s; best = i; bestAct = k === 'trinket' ? t : 'wear'; } }
          });
          run.takeLoot(Math.max(0, best), best >= 0 ? bestAct : 'bag');
        }
      }
      run.next();
    }
    if (run.crown) res.crowns++;
    res.duelWins.push(run.wins); res.endDay.push(run.day);
  }
  return res;
}, [+N, strat]);
const pct = ([a, b]) => (b ? `${Math.round(100 * a / b)}% of ${b}` : '-');
console.log(`crowns ${out.crowns}/${N}  duel wins ${out.duelWins.join(',')}  ended on day ${out.endDay.join(',')}`);
console.log('hunts', Object.fromEntries(Object.entries(out.huntWin).map(([k, v]) => [k, pct(v)])), 'duels', pct(out.duel));
console.log(errs.slice(0, 3).join('\n') || 'no errors');
await browser.close();
