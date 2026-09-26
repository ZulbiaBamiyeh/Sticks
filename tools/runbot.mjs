// Whole roguelike runs played by a bot: crown rate, duel wins, hunt and duel win rates, where runs end.
//   node tools/runbot.mjs [runs] [careful|easy|normal|elite] [score|focus|random]   (CHROMIUM_PATH to use an existing Chromium)
// The third word is how it takes loot: by raw worth (score), building one school on purpose (focus: a
// tier reached counts for a lot, and the school it has most of is the one it sticks to), or at random.
import { chromium } from 'playwright';
const [N = 10, strat = 'careful', loot = 'score'] = process.argv.slice(2);
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const p = await browser.newPage();
const errs = []; p.on('pageerror', (e) => errs.push(e.message));
await p.goto(new URL('../index.html', import.meta.url).href);
const out = await p.evaluate(([N, strat, loot]) => {
  localStorage.clear();
  const H = window.__homeTurf, R = H.run;
  // a rough worth for a build: damage per hit times how often, times how long it lasts
  const score = (b) => {
    const st = b.stats, w = st.wpn || { min: 6, max: 10, base: 8 };
    const off = ((w.min + w.max) / 2 + st.atk) / w.base * (1 + st.crit * (0.6 + st.critDmg)) * (1 + st.haste) * (1 + st.ls * 2) * (1 + 0.06 * st.onHit.length + 0.05 * st.trig.length);
    const tough = (100 + st.hp) * (1 + st.def / 26) / (1 - Math.min(0.4, st.evasion)) * (1 + st.regen * 0.03) * (1 + st.resist * 0.2) * (1 + st.thorns * 0.02);
    const raw = off * tough * (1 + b.acro * 0.03) * (b.skill ? 1.08 : 1) * (1 + 0.08 * Object.keys(st.flags).length);
    if (loot !== 'focus') return raw;
    // focus: every tier reached is worth a lot, the top school's pieces a little each on the way there
    const n = Object.values(b.sets || {}), tiers = n.reduce((a, x) => a + (x >= 6 ? 3 : x >= 4 ? 2 : x >= 2 ? 1 : 0), 0);
    return raw * (1 + 0.25 * tiers + 0.04 * Math.max(0, ...n));
  };
  // where a path's keystone would sit, so the bot can weigh the three offers
  const slotFor = (R, id) => { const key = R.PATHS[id].key, k = R.ITEM[key].slot; return { [k === 'trinket' ? 'trinket1' : k]: { uid: 'p', item: key, rarity: 'rare', day: 1, affixes: [], perks: [] } }; };
  const res = { crowns: 0, paths: {}, duelWins: [], endDay: [], huntWin: { easy: [0, 0], normal: [0, 0], elite: [0, 0] }, duel: [0, 0], rerolls: 0, free: 0, rests: 0, legends: 0, lowHp: [], topSchool: [] };
  for (let k = 0; k < N; k++) {
    const run = new R.Run(1000 + k);
    // the path: take the one whose keystone scores best in the build it starts from
    let bp = null, bpS = -1;
    for (const id of run.pathOffers()) { const s = score(R.runBuild({ ...run.equip, ...slotFor(R, id) })); if (s > bpS) { bpS = s; bp = id; } }
    run.takePath(bp); res.paths[bp] = (res.paths[bp] || 0) + 1;
    let guard = 0;
    while (!run.over && guard++ < 60) {
      const b = { ...run.build(R.TEMPLATES[0]), hp0: run.hp };
      if (run.isDuel) {
        const g = run.ghost, red = { ...R.runBuild(g.equip, R.TEMPLATES[g.t], g.boons), name: g.name };
        const r = H.fight(run.seed * 7 + run.round, b, red);
        res.duel[1]++; if (r.winner === 0) res.duel[0]++;
        run.resolve(r.winner === 0);
        if (run.crestOffer) {   // a crest: the one that scores best (random: any)
          const ks = run.crestOffer, sc = (k) => score(R.runBuild(run.equip, R.TEMPLATES[0], { ...run.boons, crests: { ...(run.boons.crests || {}), [k]: ((run.boons.crests || {})[k] || 0) + 1 } }));
          const k = loot === 'random' ? ks[Math.floor(Math.random() * ks.length)] : ks.reduce((a, b) => (sc(b) > sc(a) ? b : a));
          run.takeCrest(k); res.crests = (res.crests || 0) + 1;
        }
      } else {
        // careful: drop to an Easy hunt while the wounds from the last one are still open
        const pick = strat === 'easy' ? 0 : strat === 'normal' ? 1 : strat === 'elite' ? 2 : run.hp < 0.55 ? 0 : 1;
        const o = run.offers[pick];
        const r = H.fight(run.seed * 7 + run.round, b, `${o.hunt}:${o.tier}:${R.mobPower(run.day)}`);
        const won = r.winner === 0;
        res.huntWin[o.card][1]++; if (won) res.huntWin[o.card][0]++;
        run.resolve(won, o, r.hpFrac);
        if (run.loot) {
          // three to choose from: wear the one that helps most, else bag the best of them, else rest
          const best = () => {
            let pick = null, bs = score(b);
            run.loot.items.forEach((inst, i) => {
              const k = R.ITEM[inst.item].slot;
              for (const t of k === 'trinket' ? ['trinket1', 'trinket2'] : [k]) { const s = score(R.runBuild({ ...run.equip, [t]: inst })); if (s > bs) { bs = s; pick = { i, act: k === 'trinket' ? t : 'wear' }; } }
            });
            return pick;
          };
          let pick = loot === 'random' ? (() => { const i = Math.floor(Math.random() * run.loot.items.length), k = R.ITEM[run.loot.items[i].item].slot; return { i, act: k === 'trinket' ? (run.equip.trinket1 ? 'trinket2' : 'trinket1') : 'wear' }; })() : best();
          // nothing worth wearing is worth a reroll: free when all three are for filled slots, else one of the day's two
          const wasFree = run.freeReroll();
          if (!pick && (wasFree || run.rerolls > 0) && run.rerollLoot()) { res.rerolls++; if (wasFree) res.free++; pick = best(); }
          // badly hurt with nothing worth wearing: walk away and rest instead
          if (!pick && (run.hp < 0.55 || run.bagFull())) { run.skipLoot(); res.rests++; }
          else if (pick) run.takeLoot(pick.i, pick.act);
          else run.takeLoot(0, 'bag');
        }
      }
      run.next();
      if (run.event) run.endEvent();   // walk past events
    }
    if (run.crown) res.crowns++;
    res.duelWins.push(run.wins); res.endDay.push(run.day);
    const sc = Object.values(R.runBuild(run.equip, [], run.boons).sets || {}); res.topSchool.push(Math.max(0, ...sc));
    res.legends += [...run.bag, ...Object.values(run.equip)].filter((i) => i && R.ITEM[i.item].legend).length;
  }
  return res;
}, [+N, strat, loot]);
const pct = ([a, b]) => (b ? `${Math.round(100 * a / b)}% of ${b}` : '-');
console.log(`crowns ${out.crowns}/${N}  duel wins ${out.duelWins.join(',')}  ended on day ${out.endDay.join(',')}`);
console.log(`${out.rerolls} rerolls (${out.free} free) · ${out.rests} rests · ${out.legends} legendaries found`);
console.log('paths', out.paths, '· biggest school at the end', out.topSchool.join(','));
console.log('hunts', Object.fromEntries(Object.entries(out.huntWin).map(([k, v]) => [k, pct(v)])), 'duels', pct(out.duel));
console.log(errs.slice(0, 3).join('\n') || 'no errors');
await browser.close();
