# Sticks

Stick-figure fighting games. The first one is **Home Turf**.

## Home Turf

An autobattler prototype built for phones. Each player builds their half of a
small arena and picks a weapon, a skill, a trinket and an acrobatics level.
Then two stick figures fight it out on their own.

- **Roguelike run** (the run bar at the top of the rival page), built on
  ZereshkStory's structure with this game's fights:
  - Seven days, each three hunts and then a duel. Win five duels for the Crown;
    lose three and the run is over. Losing a hunt only costs its drop.
  - Each hunt offers three creatures, Easy, Normal and Elite. A card shows the
    creature, its difficulty, the rarity odds of its drops and an icon for each
    drop (keystones rimmed in bronze, relics in gold). Win, then pick one of
    three drops, with one reroll a day. Harder creatures and variants turn up on
    later days, and creatures grow a little faster than gear does.
  - Gear works like ZereshkStory's. Weapons roll a damage range and carry
    their type's pace and signature. The Sword gets +8% Crit, Daggers ×1.5
    status chances, the Spear Pierce 3, the Hammer a 10% Stun, the Bow +30%
    Crit damage and Stars +5% Evasion. The stats are HP, Atk (flat damage per
    hit), Def, Crit, Crit damage, Haste (attack speed), Evasion, Resist,
    Lifesteal, Regen, Thorns, Pierce, run speed and skill haste. Pieces can
    carry statuses on hit.
  - Trinkets have triggers: at battle start, on hit, on crit, every nth hit,
    when hit, when you dodge, every few seconds, or once below some HP. For
    example Metronome (every 3rd hit: Stun) and Last Stand Locket (below 40%
    HP: 30 Shield). There are two trinket slots.
  - **Keystones** (10, from Normal and Elite hunts) and **relics** (12, from
    Elite hunts only) bend a rule rather than add numbers. Examples: Juggernaut
    Plate (gain Atk equal to half your Def), Tesla Coil (max Shock bursts for 8
    per stack), Echo Conch (statuses land twice 30% of the time), Phoenix
    Feather (rise once at 25% HP) and Gilded Hourglass (turn to gold below 40%
    HP).
  - Items are Common, Rare or Epic. Rarer items are stronger, roll affixes, and
    roll perks such as "On crit: 2 Shock", "+25% damage vs Poisoned" or "When
    you dodge: 10 Shield". Two pieces of a family give its set stats. Four
    bend a rule, often the one a keystone bends, so the two can double down.
    A six-slot bag holds spares, and they sell for gold.
  - Duels are against another build for that day. Entering a duel saves yours,
    so later runs can meet your old builds. The run saves as you go, and the
    run bar continues it.
  - 131 items: 37 weapons, 38 head, core and feet pieces, 25 trinkets, 9 skill
    items, 10 keystones and 12 relics, in 12 families, one per creature.
    There are 12 creatures at three tiers. `tools/runbot.mjs` plays whole
    runs headless.
- **Weapons:**
  - **Sword:** 7-frame windup, 3-hit combo, a dash slash from just out of
    reach, and it knocks arrows and stars out of the air.
  - **Daggers:** 4-frame flurry and the fastest feet, with the shortest reach.
  - **Spear:** longest reach, keeps you at the tip, and stabs up at jumpers.
  - **Hammer:** 17-frame windup that hits can't interrupt, and it launches on
    hit. Its swing sends a shockwave along the floor that a roll can't get under.
  - **Bow:** lobs arrows over walls, and fires from the top of a jump.
  - **Stars:** throws stars in flat, fast pairs, on the ground or mid-air, but
    needs a clear line.
  - **In the air**, Sword, Daggers and Spear plunge onto anyone below, and the
    Hammer slams down with a shockwave.
- **Skills** (the AI decides when to use them):
  - **Blink:** teleport up to 3 tiles, even through walls. Blade fighters save
    it to blink straight through an incoming shot. Shooters use it to kite
    away from blades. It also dodges swings by crossing behind the attacker.
  - **Dark Sight:** a vanish. Cast into an incoming hit or shot, the smoke takes
    it, and the fighter is invisible for 3.5 s while the rival searches where it
    last saw it. The attack that ends it crits, and the victim can't react to it.
  - **Parry:** a short guard that catches a swing, a shot or a hook. Shots
    bounce back, and attackers are left stunned and open.
  - **Hook:** a chain that drags the rival across the arena to your feet.
- **Trinkets and statuses:** a trinket puts a status on the rival when a hit
  lands, more often on heavier hits. Statuses change the fight, never how anyone
  runs or jumps, and each one reads from a single mark on the figure plus a chip
  under the HP bar:
  - **Ember Charm, Burn:** damage every half second that no guard stops.
    Small flames lick off the figure.
  - **Viper Fang, Poison:** stacks up to six, each stack ticking, and wears off
    one stack at a time. A green vein runs down the limbs.
  - **Barbed Charm, Bleed:** every attack the bleeder starts costs it a cut of
    that attack's damage. Ink drips on every swing.
  - **Frost Bell, Chill:** each stack slows wind-ups. Three stacks freeze the
    fighter in an ice box. The next hit shatters it for extra damage, and a
    fighter who just thawed can't be chilled again for a moment.
  - **Static Charm, Shock:** every hit taken lands harder per stack. Five stacks
    discharge for a burst of damage and a short stun.
- **Damage breakdown:** after each fight, a donut shows where your damage came
  from, with a toggle to see what you took instead. Plain hits, blade or shot,
  are one grey slice, so the colours pick out crits (violet), each status, and
  walls and traps (teal). Tap or hover a slice or legend row to read it out in the
  middle. Each type keeps one colour, and statuses use the same colour on the
  figure, on the HUD chip and in the chart.
- **Hunts:** the rival page also offers hunts against creatures on a hunting
  ground, at Easy, Normal or Elite. They have simple brains instead of the route
  planner, and their attacks go through the same hit code, so fighters dodge and
  parry them like any swing. Swings aim low enough to reach something small on
  the floor. Normal and Elite creatures have more HP, hit harder and attack
  sooner, and Elite hunts bring bigger packs or a boss form. Elites have red eyes.
  - **Slime:** a blob on springs that squashes, hops at you, and splits into two
    small slimes when it pops. A big slime can't be knocked out of its leap. The
    Elite is a Slime King that splits twice, into seven slimes.
  - **Bats:** bats with folded wings circle overhead and take turns to dive,
    with a "!" before each dive. A frozen bat drops out of the air. The Elite
    swarm dives two at a time.
  - **Serpent:** a chain of points that follows its head along the floor, with
    humps rolling down its back. It rears up, then lunges a long way, shrugs off
    hits quickly and strikes back. Normal and Elite hunts are a pair.
  - **Spiders:** hang from the ceiling on silk threads, slide along to line up
    over you, and drop. On the floor they walk on eight legs that plant one step
    at a time, pounce, and climb back up after a while.
  - **Jellyfish:** see-through bells with trailing tentacles and frilled arms.
    They swim above you in pulses and dive to sting. The tentacles turn green
    before a sting, and the sting poisons.
  - **Brute:** a hulking knuckle-walker with a shine along its back and ink
    dripping off it. Hits barely move it and never interrupt it. Up close it rears
    up and slams a shockwave along the floor, which fighters jump; past Easy it
    slams twice. From range it scoops ink off its back and lobs it.

  With random builds, Easy hunts are won about 95% of the time, Normal about
  55–90% and Elite about 15–45%. In a run, a bot that always takes Normal hunts
  wins about two thirds of them.
  - **Variants** appear from day 3 in a run: the same bodies with a status on
    their attacks and that status's colour on their eyes and markings. They
    are the Toxic Slime (poison), Frost Bats (chill), Storm Serpent (shock),
    Blood Spiders (bleed), Ember Jellyfish (burn) and Molten Brute (burn).
- **Acrobatics** (a stat from 0 to 4, meant to grow over a roguelike run). Each
  level unlocks a move, N+ style:
  1. **Roll:** a tumble that can't be hit for most of its length. Blades roll
     through shots on the way in and through swings to come up behind. Big drops
     end in a landing roll.
  2. **Wall jump:** slide down walls and kick off them, or climb a single wall
     by kicking back and forth.
  3. **Wall run:** run straight up a wall and flip over the ledge at the top.
  4. **Air flip:** a second jump in mid-air.

  The route planner simulates these moves with the same physics as the fight,
  so fighters find wall-jump and wall-run routes on their own. Shooters kite by
  picking the escape jump that lands farthest away, favouring high ground, and
  shoot from the top of it. Blades hop over low shots even at level 0.
- **Blade exchanges:** when two blades meet, in the air or on the ground, or a
  blade fighter catches a swing, the fight goes into a short choreographed
  exchange of strikes and blocks, with sparks on every contact. Most exchanges
  lock blades halfway through, crossed and pushing. The camera moves in, and an
  exchange that starts mid-air drifts slowly down to the floor. Each weapon has
  its own mix of strikes, including spinning cuts, feints and shoves. The
  defender blocks, ducks, hops or leans away, so no two exchanges look alike.
- **No trading hits:** a fighter who lands a hit keeps the initiative, and combos
  only continue when the next hit will connect. A fighter just shaken off a hit
  swings back, backs off, or puts its guard up. A swing into a guard becomes an
  exchange or a clean block.
- **Variety:** basic attacks have alternate swings, and idle fighters sometimes
  twirl their weapon. These looks come from a separate random stream, so they
  never change who wins, and a replay looks exactly the same. It ends one of three ways, decided by
  the fight's seed:
  - a fighter breaks it with a ready skill (Blink behind, a Parry riposte, a
    Dark Sight vanish or a Hook that trips);
  - one fighter wins it, where better acrobats win more often and may vault
    over the top;
  - both fighters are thrown apart.
- **Rivals:** eight named rivals, each with its own half, weapon, skill,
  trinket and acrobatics level. You
  scout each one before the fight and can change your build to counter it.
  Your record against each rival is kept in this browser.
- **Equip screen:** the build screen opens on a paper doll, like ZereshkStory's.
  The camera zooms in on your fighter, with seven slots: Head, Core, Feet
  (acrobatics) and Skill on the left, and Weapon and two Trinkets on the right.
  Head, Core and the second trinket are for the roguelike's gear. Tap a
  slot to pick for it below. A stat sheet shows speed, frames to the first hit,
  reach, skill cooldown, the status your hits carry, and acrobatic moves. The
  **Your half** tab is where you build.
- **Your half:** 10 points to spend on blocks (1) and pads (2). Columns 9 and
  10 are no-man's-land and stay open.
- **Home advantage:** pads launch only the fighter who built them, so they're
  moves only you can make. Fighters plan around their own pads by tracing the
  whole arc of every possible launch. Blades walk to a pad on purpose when a
  launch carries them over the rival, then plunge onto it. Shooters take a pad
  up to high ground or a shot from the top of the arc, and run onto one to
  escape a blade.
- **Spikes are switched off for now.** The code is still there: set
  `SPIKES_ON = true` in `index.html` to bring back the spikes tool and the
  spikes in the rival layouts. When they're on, your fighter knows where your
  spikes are, and the rival finds them by stepping on them.
- **No camping:** after 20 seconds the arena closes in from both walls.
- **Legal halves only:** a placement is refused if the rival couldn't reach
  your spawn, if it makes a pit someone can't climb out of, or if it would
  trap your own fighter.

### Running it

`index.html` is the whole game, with no build step and no dependencies. The one
extra files are the fight music in `Music/`. Open `index.html` in a browser, or
serve the folder (`npx serve .`) and open it on your phone. Serving it gives
the smooth fade-out under a KO's slow motion. Opened straight from disk, the
music still plays, it just cuts rather than fades.

Fights are deterministic from a seed, so **Replay** runs the same fight again.

### Music

Each fight plays a random track from five picked from the Wildfrost soundtrack
(Spirit Call, Winter's Wrath, Tundra Heart, March of the Pengoons and Luminice
Dance), never the same one twice in a row. The tracks are in `Music/` and listed in `MUSIC.tracks` in
`index.html`. A track carries on into a rematch if it's still playing. When your
fighter is KO'd it muffles and fades out through the slow motion; beating the
rival or clearing a hunt lets it play on, and it fades out on the
build and rival screens. The speaker button in the header mutes it, and that
choice is remembered. The soundtrack isn't ours, so swap it for something
licensed before shipping the game publicly.

### Testing the AI and balance

```sh
npm install
npm run sim
```

This runs the default build against every rival, then 1,200 fights with random
loadouts (random weapon, skill, trinket and acrobatics level). It prints the
win rate for each weapon, skill, trinket and acrobatics level, and a
weapon-against-weapon table. Use `-- --fights 3000` for tighter numbers and
`-- --seed 7` for a different sample. Set `CHROMIUM_PATH` to use an existing
Chromium.

In the browser console, `window.__homeTurf.fight(seed, blue, red)` runs one fight
without rendering and returns the result and event log. A build looks like
`{ weapon: 'spear', skill: 'hook', trinket: 'frost', acro: 3, pieces: [] }`. Pass a
hunt name instead of the red build to run a hunt, with a tier after a colon
(`'bats'`, `'brute:elite'`). Pass a fifth argument (for
example `60`) to sample both fighters' position and AI state every 60 frames.
`__homeTurf.play(seed, blue, red)` starts a rendered fight and
`__homeTurf.step(n)` advances it frame by frame.

### How it works

- **Movement and planning share one controller.** The AI finds routes by
  simulating scripted inputs (hold a direction, hold jump for n frames) with
  the same physics the fight uses, so every planned jump is one the fighter
  can make. Before jumping, it re-checks the jump from its actual speed and
  position.
- **Dark Sight works through perception.** Each fighter's AI reads its rival
  through `perceive()`. While the rival is hidden, that returns a stand-in parked
  where the rival was last seen. Planning, aiming and hooks all go after the
  stand-in, so a hidden fighter really is lost.
- **Animation:** a 12-joint skeleton posed with springs and two-bone inverse
  kinematics, with freeze frames on big hits, weapon motion trails, verlet
  scarves, and a ragdoll on KO.
- **Skill effects:** Blink leaves afterimages and a marching-ants selection box
  at both ends. Dark Sight draws the fighter as a transparency checkerboard.
  Parry and crits flash an inverted impact frame. Move names pop up over the
  fighters' heads.
- **Demos:** the rival page loops the rival's weapon combo and skill, and picking
  a weapon or skill on the build page makes your fighter show it off.
- **Juggle protection:** each extra hit on a fighter already sent flying does
  less damage, and the third lets it escape, so launches can't chain a fighter
  to death.
