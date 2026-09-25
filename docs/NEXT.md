# Where this left off

Everything is committed on `claude/game-weapons-skills-prototype-sq26a7`. The game is the single file
`index.html`; the playable copy is published as a claude.ai artifact.

## Last done
- Spellbooks: no shared spells. Each book is a school (`SCHOOL` in index.html): frost (plain book, Rime
  Codex), flame (Ember Codex), storm (Storm Codex), slime (Gel Grimoire, Spore Codex). Tomes cast
  fear / curse / drain / rupture; the Blood Codex is now the Tome of Blood (its Bleed ticks over time).
- New states: snared (`snareT`), fear (`fearT`), heal over time (`hot`), retaliating shell (`retal`),
  gel bubble (`bubble`), tether. Floor hazards live in `world.fires` (kinds: fire, slick, rod).
- The open book is redrawn (`weaponGeom` spellbook branch + `drawWeapon`); pages glow and turn while casting.
- Six puppet forms (`PUPFORM`); puppeteers never duel (this fixed a NaN freeze).

## Measured win rates (60 mixed loadouts × 7 weapons)
frost 52, flame 55, storm 57, gel 48, spore 59, Tome of Rot 44, Tome of Blood 45.
Whole game (`tools/sim.mjs`): every weapon 42–58%.

## Next up
1. **Edit your half of the map between fights in a run** (asked for, never started). Plan: `Run` keeps its
   own `pieces`; add a "Your half" entry on the run gear screen that reuses the turf editor (`#turfTab`,
   `applyTool`, `#tools`, `#budget`) and returns to the run.
2. Gel Grimoire swings hard by matchup (66% vs hammer, 23% vs bow): its membrane only eats two shots.
3. The plain spellbook (frost) is 45% in the whole-game sim; could use a small lift.

## How to check work
All need `CHROMIUM_PATH=/opt/pw-browsers/chromium`:
- `node tools/fit.mjs` — nothing may scroll on any screen size (must print "Nothing scrolls.").
- `node tools/sim.mjs -- --fights 900` — weapon/skill balance tables.
- `node tools/runbot.mjs` — plays whole runs headless; must end "no errors".
Headless API for custom tests: `window.__homeTurf` (`fight`, `play`, `step`, `forceAtk`, `ATK`, `SCHOOL`).

## Publishing
Copy the `<!-- artifact:start -->`…`<!-- artifact:end -->` span of index.html (drop the `</head>` and
`<body>` lines) to a file and republish it to https://claude.ai/artifact/MXu3BRTuWVmQQtx8inQEST.
