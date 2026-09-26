# Where this left off

Everything is committed on `claude/slime-tome-caster-gig9kp` (branched from `claude/game-weapons-skills-prototype-sq26a7`). The game is the single file
`index.html`; the playable copy is published as a claude.ai artifact.

## Last done
- **Schools instead of sets.** About 30 families, each with its own 2- and 4-piece set, were too many to
  build around, and a 4-piece set out of 7 slots hardly ever happened. Every family now belongs to one of
  7 schools (`SCHOOLS`, `SCHOOL_OF`, `SCHOOL_FAMS`) with a rule each at 2, 4 and 6 pieces, applied in
  `runBuild` (shields and heals scale with the school's pieces). UI: `schoolChip`, `schoolBar` under the
  day, `schoolSheet`, `schoolShift` for "Shock 4!" and "Breaks Shock 4" on loot, school on hunt, path and
  item cards. The build loot card now comes from your top school.
- **Crests**: each duel won deals 3 (`crestChoices`, `takeCrest`, screen `crest`), counting as a piece of
  a school (`boons.crests`). Ghosts build a main school and carry crests too.
- Paths are schools; new keystones `cinder_heart` (The Pyre, Burn) and `duelist_eye` (The Edge).
  Perks never repeat their item's own trick (`sameTrick`).
- Tuning: `mobPower` growth 0.42 → 0.5, ghosts one more slot. Run bot (`tools/runbot.mjs N careful
  score|focus|random`): careful 16/30 crowns with either score or focus loot picking, random picks 1/20.
  So picking well matters a lot.

## Before that (combat)
- **More moves, less repetition.** An audit of attack counts showed the spear and hammer each had
  essentially one move and blade exchanges started about twice a fight. Now:
  - Spear **javelin** (`tryJavelin`, `SHOT.javelin`): thrown to finish or at a far shooter. A kill
    skewers the body and pins it where the spear sticks (`rag.pin`).
  - **Loose weapons** (`world.loose`, `dropWeapon`, `javelinDown`, `stepLoose`, `fetchWeapon`,
    `takeWeapon`, `drawLoose`): the owner fights unarmed (`punch`, `kick`, fists up), walks or jumps to
    it, or it's recalled after `LOOSE_RECALL` frames. `u.unarmed` hides the weapon (`S.unarmed`) and
    keeps it out of exchanges.
  - Hammer **whirl** (`hspin`, a `multi` hit that flips facing every 5 frames) and **meteor** (`meteorStep`,
    `landMeteor`, `crater` floor cracks as part `'k'`).
  - Sword **launcher** (`upper`) as a combo branch, jumping after the rival for an air slash.
  - Exchanges: `DUEL_REST` 420 frames and `DUEL_MAX` 3 (was 75 frames, uncapped). New strikes
    `rising` and `pommel`; new endings `disarm` and `throw`.
  - Sim: spear 46%, hammer 48%, sword 43% (slash1/2 damage 8 → 9 to make up for fewer exchanges).
    All entries 43–57%. Run bot: no errors.

## Before that (sound and fixes)
- **Sound effects** (`sfx`, `SFX`): quiet Web Audio sounds for swings, hits, clangs, shots, spells,
  landings, spikes, KOs and UI ticks. Master level `SFX_VOL` 0.2 through a limiter; they follow the speaker button.
- **Music carries on** between fights: a KO sinks it, then `music.duck` keeps it quiet and muffled under
  every menu until the next fight swells it back up.
- **Ghost Walk wraps the page:** out one side wall and in at the other, or down through the floor and
  in from the top to drop on them (`ghostRoute`, `EV_WRAP`). Sim: 2 uses a fight, 51% win rate.
- **Shield** is a honeycomb barrier (`drawShield`): it swells in, a glint sweeps across it, cells light
  where it's struck, it gutters when nearly spent, and it bursts into shards (`shieldBreak`, part `'x'`).
- Fixes: equipping or bagging a loot pick now goes on to the next round (`closeSheet` re-rendered a
  loot screen that no longer had loot and threw). Epic twins now merge (into a Legendary grade), the
  Echo Shrine won't copy a Legendary, and bag items with a twin show ⇈.

## Before that (animation)
- **Battle animation.** Knockdowns use a ragdoll (`startKrag`, `stepKrag`, `spinRag`, `shownSkel`):
  it's tied loosely to the body box, starts with a backwards turn, lies with some tone (knees and head
  lifted), and gets up in three beats that blend out of the heap (`GETUP` frames, with a kip-up for
  acro 3+). Down plus get-up still takes 42 frames, so the timing is unchanged. The knockout ragdoll
  continues from it. Landings throw dust both ways and a skid mark.
- **Blade exchanges:** someone wins the lock (grinding sparks, then a break), plus new `overhead` and
  `sweep` strikes, `riposte` answers, and a `kick` ending that knocks the loser down.
- Test hooks: `__homeTurf.knock(u, atkName)` lands a hit on u, and `__homeTurf.duel()` starts an
  exchange. Both are for filming animations frame by frame.

## Before that (run choices)
- **The run's choices got stakes.** Hunt, loot and duel screens were rows of names, so picking was a
  shrug. Now:
  - **Odds:** `simFight` runs a fight unseen (`setupFight` is the fight without its screen) and puts
    everything back. `wantOdds`/`oddsTick` run 8 of them per card between frames, so the bars fill in,
    with results kept in `oddsCache`. Hunt cards show odds, likely HP after, gold, rarity odds, best
    power gain from its drops (`upgradesIn`, from `buildPower`) and a ★ for a keystone. Duels show the
    ghost's build, odds and a counter tip (`DUEL_TIP`). Results recall the odds you took (`runOddsAt`).
  - **Pick 1 of 3** (`Run.lootFor`): the creature's drop, one from a family you wear (or your path's),
    and a wildcard with a rarity bump. Verdicts come from `lootVerdict`. Tapping a card tries it on
    (`tryOn`: the stage fighter wears it and its doll slot lights up).
  - **Stage previews** (`stageExtras`): the hunt's creatures, or the duel ghost, stand beside you.
  - Ghosts are geared like a player who picks from three (one slot ahead, better of two rarities).
  - Run bot, 30 runs: careful play crowns 12 of 30 and random play 0 (before: 9 and 1). Duels 64%.

## Before that
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
   the rival and where its owner wants to stand, so `dangerAt` and `holdHome` handle it. Spikes back on
   needs a balance fix for blades first (see below).
   Odds on the hunt cards also show where hunt tiers are off (a Mantis Queen at 88% next to a Normal
   Fire Serpent at 50%).
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
