# Where this left off

Everything is committed on `claude/slime-tome-caster-gig9kp` (branched from `claude/game-weapons-skills-prototype-sq26a7`). The game is the single file
`index.html`; the playable copy is published as a claude.ai artifact.

## Last done
- **Fighters play around what is on the floor.** Spikes were switched off because fighters kept walking
  into them. The cause wasn't knowledge: about two-thirds of hits were on spikes the fighter already
  knew about, including 95 walk-ins on its own. The route planner priced spikes in, but the small moves
  never checked: lining up for a jump, braking, lunges and dives, falls, the ledge-climb jump, and the
  roll after a big landing. There is now one danger check (`dangerAt`: known spikes and the closing
  walls) used by a step guard on every free step (`stepGuard`, which also steers falls with `airGuard`
  and gets a fighter off a spike it is standing on), and by every attack that moves you (`atkSafe`
  simulates the lunge, hop or dive first). Pad launches won't land on a known spike for a strike.
- **Owners use their half:** with its own spikes between it and a blade coming in, a fighter waits
  2.6 tiles behind them instead of walking out over them (`holdHome`). It holds for 4 s at a time,
  never against shooters, and not once the walls close.
- `tools/traps.mjs` measures both: every spike hit sorted by why (first find, knocked on, walked on a
  known spike, attacked onto one), and a placement test (the same fighter on three equal-cost halves).

  | | before | after |
  | --- | --- | --- |
  | walked or attacked onto a known spike, per fight | 2.1 | 0.33 |
  | owner wins, spikes across the way in / up on a ledge / none | 46 / 39 / 40% | 45 / 39 / 40% |
  | trap damage a fight, spikes across the way in | 26 | 32 |

- **Spikes are still off** (`SPIKES_ON = false`). With them on, blades fall to 33–44% and bows and
  tomes rise to 57–65%, because the fighter who has to cross the floor pays for them. That needs a
  balance pass before they come back.

## Before that
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
1. **Placed items for the run** (Brazier, Totem, Mirror block): each declares where it is dangerous to
   the rival and where its owner wants to stand, so `dangerAt` and `holdHome` handle it. Pick 1 of 3 loot
   first. Spikes back on needs a balance fix for blades first (see above).
2. **Next tome** (flame or storm). Give it its own verbs, its own way of moving, and its own answer to
   melee: slime melts away, ice seals itself in. The shelved schools are in the backup for reference.
3. The Slime Tome is lopsided against the bow (13%). Slimes chasing archers helped; something that
   eats or blocks arrows might be the fix.
4. **Edit your half of the map between fights in a run** (asked for, never started). Plan: `Run` keeps its
   own `pieces`; add a "Your half" entry on the run gear screen that reuses the turf editor (`#turfTab`,
   `applyTool`, `#tools`, `#budget`) and returns to the run.

## How to check work
All need `CHROMIUM_PATH=/opt/pw-browsers/chromium`:
- `node tools/fit.mjs` — nothing may scroll on any screen size (must print "Nothing scrolls.").
- `node tools/sim.mjs -- --fights 900` — weapon/skill balance tables.
- `node tools/runbot.mjs` — plays whole runs headless; must end "no errors".
- `node tools/traps.mjs` — do fighters play around spikes; walked/attacked onto known spikes should stay near 0.
Headless API for custom tests: `window.__homeTurf` (`fight`, `play`, `step`, `forceAtk`, `melt`, `ATK`, `SCHOOL`).

## Publishing
Copy the `<!-- artifact:start -->`…`<!-- artifact:end -->` span of index.html (drop the `</head>` and
`<body>` lines) to a file and republish it to https://claude.ai/artifact/VG7ZugxConEAPifdQn9Hgh, with the five `Music/*.mp3` tracks as supporting files at the same `Music/...` paths (the page loads them by relative URL).
