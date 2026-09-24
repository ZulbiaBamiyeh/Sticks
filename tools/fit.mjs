// Nothing scrolls: walk every screen at a range of screen sizes and report any panel that overflows.
//   node tools/fit.mjs            (CHROMIUM_PATH to use an existing Chromium)
import { chromium } from 'playwright';
const SIZES = [[320, 568], [360, 640], [390, 844], [412, 915], [768, 1024], [1280, 800]];
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const bad = [];
for (const [W, H] of SIZES) {
  const p = await browser.newPage({ viewport: { width: W, height: H } });
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(new URL('../index.html', import.meta.url).href);
  await p.evaluate(() => { localStorage.clear(); return document.fonts.ready; });
  const rows = [];
  // How far past its box the visible panel (or the open sheet) runs.
  const over = async (name) => {
    await p.waitForTimeout(160);
    const m = await p.evaluate(() => {
      const el = document.querySelector('#sheet:not([hidden]) .sh-card') || document.querySelector('.panel:not([hidden])');
      if (!el) return { over: 0 };
      return { over: Math.max(0, el.scrollHeight - el.clientHeight), app: document.getElementById('app').scrollHeight - document.getElementById('app').clientHeight };
    });
    const px = Math.max(m.over, m.app || 0);
    rows.push([name, px]);
    if (px > 0) bad.push(`${W}x${H} ${name}: ${px}px`);
  };
  // the free-play pages
  await over('rival');
  await p.click('#rvHunt'); await over('rival-hunts');
  await p.click('[data-sheet="close"]');
  await p.click('#rvEdit'); await over('build-gear');
  for (const slot of ['weapon', 'skill', 'trinket1', 'feet']) { await p.click(`#doll .slot[data-slot="${slot}"]`); await over(`build-${slot}`); }
  await p.click('.tabs [data-tab="turf"]'); await over('build-turf');
  await p.click('#scoutBtn');
  // a run, mid-way, with a full bag and every screen reachable
  await p.evaluate(() => {
    const R = window.__homeTurf.run, run = new R.Run(21);
    const mk = (item, rarity = 'epic') => ({ uid: 'u' + item, item, rarity, day: 4, affixes: ['hp', 'crit'], perks: ['crit_heal', 'vs_poison'] });
    Object.assign(run.equip, { head: mk('plague_mask'), core: mk('wing_cloak'), feet: mk('web_boots'), skill: mk('night_wing'), trinket1: mk('metronome'), trinket2: mk('viper_fang') });
    run.bag = ['gel_cap', 'iron_sword', 'frost_bell', 'web_boots', 'toad_vial', 'brute_maul'].map((i) => mk(i));
    run.round = 8; run.next(); run.gold = 40;
    localStorage.setItem('homeTurf.run.v2', JSON.stringify(run));
  });
  await p.reload(); await p.evaluate(() => document.fonts.ready);
  await p.click('#runStart'); await over('run-shop');
  await p.click('.irow[data-ware]'); await over('run-shop-item');
  await p.click('[data-sheet="close"]');
  await p.click('[data-go="gear"]'); await over('run-gear');
  await p.click('.bag .bslot[data-bag]'); await over('run-gear-bag');
  await p.click('[data-sheet="close"]');
  await p.click('#doll .slot[data-slot="core"]'); await over('run-gear-worn');
  await p.click('[data-sheet="close"]');
  await p.click('[data-go="back"]');
  await p.click('[data-go="shopleave"]'); await over('run-pick');
  // an event and a duel
  for (const [name, setup] of [
    ['run-event', () => { const R = window.__homeTurf.run; const r = R.Run.load(); r.event = { id: 'gremlin', result: null }; r.save(); }],
    ['run-duel', () => { const R = window.__homeTurf.run; const r = R.Run.load(); r.event = null; r.round = 8; r.rollRound(); r.save(); }],
  ]) {
    await p.evaluate(setup);
    await p.reload(); await p.evaluate(() => document.fonts.ready);
    await p.click('#runStart'); await over(name);
  }
  // the end of a run, set up from inside so the saved run isn't restarted
  await p.evaluate(() => {
    const H = window.__homeTurf;
    H.runState.over = true; H.runState.crown = true; H.runState.wins = 5; H.runState.gold = 84; H.runState.earned = 120;
    H.runState.history = Array.from({ length: 24 }, (_, i) => ({ round: i + 1, duel: (i + 1) % 4 === 0, card: 'elite', label: 'Bats', result: i % 3 ? 'W' : 'L' }));
    H.showRun('over');
  });
  await over('run-over');
  // loot, straight after a won hunt
  await p.evaluate(() => {
    const R = window.__homeTurf.run, r = R.Run.load() || new R.Run(3);
    r.over = false; r.crown = false; r.event = null; r.shop = null; r.round = 9; r.rollRound();
    r.lootFor({ ...r.offers[2] }, 0); r.save();
  });
  await p.reload(); await p.evaluate(() => document.fonts.ready);
  await p.click('#runStart'); await over('run-loot');
  if (await p.$('.irow[data-lootrow]')) { await p.click('.irow[data-lootrow]'); await over('run-loot-item'); }
  // a fight, and the result sheet with its damage donut
  await p.evaluate(() => { const H = window.__homeTurf; H.runState.loot = null; H.showRun('pick'); });
  await p.click('[data-offer="0"]');
  await over('fight');
  for (let i = 0; i < 120; i++) { const done = await p.evaluate(() => { window.__homeTurf.step(120); return !document.getElementById('result').hidden; }); if (done) break; }
  await over('fight-result');
  await p.click('#runNext').catch(() => {});
  await over('after-fight');
  console.log(`${W}x${H}  ` + rows.map(([n, v]) => `${n} ${v ? `\x1b[31m${v}\x1b[0m` : 'ok'}`).join(' · '));
  if (errs.length) { bad.push(`${W}x${H} page error: ${errs[0]}`); console.log('  errors:', errs.slice(0, 2).join(' | ')); }
  await p.close();
}
await browser.close();
console.log(bad.length ? `\n${bad.length} overflowing:\n` + bad.join('\n') : '\nNothing scrolls.');
process.exit(bad.length ? 1 : 0);
