# Where this left off

Everything is committed on `claude/slime-tome-caster-gig9kp` (branched from `claude/game-weapons-skills-prototype-sq26a7`). The game is the single file
`index.html`; the playable copy is published as a claude.ai artifact.

## Last done
- **The Ice Tome** (`ice_tome`, `SCHOOL.ice`), built to feel unlike the Slime Tome: a fortress, not an
  army. Pages: `cast_rampart` (a real, solid, breakable ice wall: `world.ice`, `A.ice`, `rampartSpot`,
  `reNav`, `hitIce`, `iceGone`), `cast_glaze` (a slippery floor: `world.fires` kind `glaze`, `u.slipT`,
  `b.grip` in `physStep`), `cast_lance` and `cast_shatter`. Its answer to stunlock is the **ice block**
  (`startIceBlock`, state `'iceblock'`); the slime caster's is the melt. The two share `meltCheck`.
- The ice caster skates (`flags.skate`: lower grip, 15% faster, a skating pose and a frost trail) and
  wears a hood (`drawHood`). The tome is drawn by the same `drawTome` with an ice cover (`S.ice`).
- Blades hack at an ice wall in their way (`tryBreakIce`). Shots break against ice, apart from the
  caster's own lances, which pass through its own walls (`ownIceOpen` for aiming).
- The weapon is "Tome", with a picker for Slime or Ice (`bookOf`; a free build with no book is the
  Slime Tome). The rival Hoar holds the Ice Tome. `tools/sim.mjs` counts each tome as its own entry.

## Before that
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

## Measured win rates (`tools/sim.mjs --fights 2000`)
Every entry is between 44% and 57%: Slime Tome 52%, Ice Tome 54%. The Slime Tome swings hard by
matchup (sword 77%, daggers 70%, bow 13%). The Ice Tome is flatter (daggers 65%, sword 56%, bow 37%,
stars 42%).

## Next up
1. **Next tome** (flame or storm). Give it its own verbs, its own way of moving, and its own answer to
   melee: slime melts away, ice seals itself in. The shelved schools are in the backup for reference.
2. The Slime Tome is lopsided against the bow (13%). Slimes chasing archers helped; something that
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
`<body>` lines) to a file and republish it to https://claude.ai/artifact/VG7ZugxConEAPifdQn9Hgh. The music files are not published with it, so the artifact plays without music.
