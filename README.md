# Sticks

Stick-figure fighting games. The first one is **Home Turf**.

## Home Turf

An autobattler prototype built for phones. Each player builds their half of a
small arena and picks a weapon. Then two stick figures fight it out on their own.

- **Weapons:** Sword (7-frame windup, 3-hit combo, knocks arrows away), Hammer
  (17-frame windup that hits won't interrupt, launches on hit), Bow (aims
  with gravity, lobs over walls).
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

This runs 45 fights headless (every weapon pairing across the five rival
layouts) and prints who won, how long it took, and how much damage came from
weapons, traps and the closing arena. Set `CHROMIUM_PATH` to use an existing
Chromium.

From the browser console, `window.__homeTurf.fight(seed, blueBuild, redBuild)`
runs a single fight without rendering and returns the result and event log.
Pass a fifth argument (for example `60`) to sample both fighters' position and
AI state every 60 frames.

### How it works

- **Movement and planning share one controller.** The AI finds routes by
  simulating scripted inputs (hold a direction, hold jump for n frames) with
  the same physics the fight uses, so every planned jump is one the fighter
  can make. Before jumping, it re-checks the jump from its actual speed and
  position.
- **Animation:** a 12-joint skeleton posed with springs and two-bone inverse
  kinematics, with freeze frames on big hits, weapon motion trails, verlet
  scarves, and a ragdoll on KO.
