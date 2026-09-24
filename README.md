# Sticks

Stick-figure fighting games. The first one is **Home Turf**.

## Home Turf

An autobattler prototype built for phones. Each player builds their half of a
small arena and picks a weapon and a skill. Then two stick figures fight it out
on their own.

- **Weapons:**
  - **Sword:** 7-frame windup, 3-hit combo, knocks arrows and stars out of the air.
  - **Daggers:** 4-frame flurry and the fastest feet, with the shortest reach.
  - **Spear:** longest reach, keeps you at the tip, and stabs up at jumpers.
  - **Hammer:** 17-frame windup that hits can't interrupt, and it launches on hit.
  - **Bow:** lobs arrows over walls.
  - **Stars:** throws stars in flat, fast pairs, but needs a clear line.
- **Skills** (the AI decides when to use them):
  - **Blink:** teleport up to 3 tiles, even through walls. It dodges swings and
    shots, crosses behind melee fighters, closes on shooters, and escapes blades.
  - **Dark Sight:** invisible for 3.5 s. The rival loses track and searches
    where it last saw you. The attack that ends it crits, and the victim can't
    react to it.
  - **Parry:** a short guard that catches a swing, a shot or a hook. Shots
    bounce back, and attackers are left stunned and open.
  - **Hook:** a chain that drags the rival across the arena to your feet.
- **Rivals:** eight named rivals, each with its own half, weapon and skill. You
  scout each one before the fight and can change your build to counter it.
  Your record against each rival is kept in this browser.
- **Your half:** 10 points to spend on blocks (1), spikes (2) and pads (2).
  Columns 9 and 10 are no-man's-land and stay open.
- **Home advantage:** your fighter knows where your spikes are. The rival
  finds them by stepping on them, then avoids them. Pads launch only the
  fighter who built them.
- **No camping:** after 20 seconds the arena closes in from both walls.
- **Legal halves only:** a placement is refused if the rival couldn't reach
  your spawn, if it makes a pit someone can't climb out of, or if it would
  trap your own fighter.

### Running it

`index.html` is the whole game: no build step, no dependencies. Open it in a
browser, or serve the folder (`npx serve .`) and open it on your phone.

Fights are deterministic from a seed, so **Replay** runs the same fight again.

### Testing the AI and balance

```sh
npm install
npm run sim
```

This runs the default build against every rival, then 1,200 fights with random
loadouts. It prints the win rate for each weapon and skill and a
weapon-against-weapon table. Use `-- --fights 3000` for tighter numbers and
`-- --seed 7` for a different sample. Set `CHROMIUM_PATH` to use an existing
Chromium.

In the browser console, `window.__homeTurf.fight(seed, blue, red)` runs one fight
without rendering and returns the result and event log. A build looks like
`{ weapon: 'spear', skill: 'hook', pieces: [] }`. Pass a fifth argument (for
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
  less damage, and the third lets it escape. Spikes and hammers can't chain a
  fighter to death.
