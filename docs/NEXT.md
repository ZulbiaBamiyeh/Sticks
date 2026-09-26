# Where this left off

Everything is committed on `claude/slime-tome-caster-gig9kp` (branched from `claude/game-weapons-skills-prototype-sq26a7`). The game is the single file
`index.html`; the playable copy is published as a claude.ai artifact.

## Last done
- **Casters rebuilt from one book.** Every other book, both staves and all puppets are shelved
  (`SHELVED` removes their items; `WEAP.puppet.shelved` drops the puppet from `WEAPONS`; the Marrow
  rival is gone). Their engine code stays. `versions/inkfall-v4-schools-puppets.html` is the full game
  from before.
- **The Slime Tome** (`slime_tome`, and the default book) is the only caster. Its pages come from
  `pickSpell`'s slime branch: `cast_bud` pours a slime (`MOB.bud`, a creature on your side, up to
  `BUD_MAX`), `cast_reabsorb` calls them home as gobs (`world.globs`) that heal, plus `cast_goo`,
  `cast_splash` and `cast_regrow`. The **melt** (`meltCheck`/`startMelt`/`meltStep`, state `'melt'`)
  is the answer to stunlock.
- Casters glide rather than walk (hover pose in `poseTarget`), wear a robe (`drawRobe`) and sleeves
  with no scarf or hat band, and don't jump-kite (`rangedEngage` backpedals). The tome floats and
  opens on its spine (`drawTome`, `u.tomeOpen`).
- Fighters prefer the caster to its slimes by 1.6 tiles when picking a target (`foe`).
- Save keys are now v3 (`homeTurf.run.v3`, `homeTurf.ghosts.v3`), because older saves may hold
  shelved items.

## Measured win rates (`tools/sim.mjs --fights 1500`)
Every weapon is between 46% and 57%, and the Tome is 53%. The Tome beats sword 73%, spear 69%,
stars 72% and daggers 59%, and loses to hammer 36% and bow 20%. On the ladder, Folio (the slime
caster) beats the default sword build every time.

## Next up
1. **Next tome.** Pick a school and give it its own verbs and its own answer to melee, the way the
   melt is slime's. The shelved schools are in the backup for reference.
2. The Slime Tome is lopsided against the bow (20%). Slimes chasing archers helped; something that
   eats or blocks arrows might be the fix.
3. **Edit your half of the map between fights in a run** (asked for, never started). Plan: `Run` keeps its
   own `pieces`; add a "Your half" entry on the run gear screen that reuses the turf editor (`#turfTab`,
   `applyTool`, `#tools`, `#budget`) and returns to the run.

## How to check work
All need `CHROMIUM_PATH=/opt/pw-browsers/chromium`:
- `node tools/fit.mjs` — nothing may scroll on any screen size (must print "Nothing scrolls.").
- `node tools/sim.mjs -- --fights 900` — weapon/skill balance tables.
- `node tools/runbot.mjs` — plays whole runs headless; must end "no errors".
Headless API for custom tests: `window.__homeTurf` (`fight`, `play`, `step`, `forceAtk`, `melt`, `ATK`, `SCHOOL`).

## Publishing
Copy the `<!-- artifact:start -->`…`<!-- artifact:end -->` span of index.html (drop the `</head>` and
`<body>` lines) to a file and republish it to https://claude.ai/artifact/MXu3BRTuWVmQQtx8inQEST.
