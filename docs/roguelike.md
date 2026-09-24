# Home Turf as a roguelike: design notes

This is a proposal, not a plan of record. The backup of the game before any of
this is in `versions/home-turf-v2-rivals.html`. For how the run could meet
other players' builds (async PvP), see `docs/async-pvp.md`.

## The pitch in one line

Your half of the arena is your deck. Over a run you grow it, trap it and tune
the fighter who knows it, then take it into other people's halves.

Most autobattler roguelikes grow a team. Home Turf can grow a *place*, and the
place is already what makes this game different: home advantage, hidden
spikes, pads only you can use. The roguelike layer should lean on that before
anything else.

## The run

- **Three acts, about six stops each,** on a branching map like Slay the Spire's.
  Each stop is one of:
  - **Rival:** a normal fight.
  - **Champion:** a harder rival with a bigger half. It pays better.
  - **Workshop:** spend ink on pieces, or upgrade a piece you own.
  - **Armory:** swap or upgrade your weapon or skill.
  - **Event:** a small choice with a catch. Example: "A rival offers to trade
    halves for one fight."
  - **Rest:** get back a life, or rebuild your half for free.
  - **Boss:** at the end of each act. The hardest hand-made rivals work as bosses.
- **Lives, not carried-over HP:** 3 hearts, and a loss costs one. Fights are
  noisy (one seed can swing a matchup 20 points), so a single bad fight
  shouldn't end a run. Carried-over HP makes every fight after an unlucky one
  worse. Hearts keep each fight clean.
- **Ink** is the currency. You earn it for winning, with bonuses for style that
  the sim already counts: traps that landed, parries, crits, and spikes the
  rival never found.
- **After each win, pick one of three:** a piece, an upgrade, a charm, or ink.
  This is the heartbeat of the run.
- **The build budget grows:** 10 points in act 1, 14 in act 2, 18 in act 3.
  Rivals scale the same way, so later halves get genuinely nasty.

## More for your half

These are the most valuable additions because they're unique to this game.
Each one should use the home-advantage rule (your fighter knows your half).

| Piece | Cost | What it does | Why it's interesting |
| --- | --- | --- | --- |
| Crumble block | 1 | Falls away half a second after the rival stands on it. | A trapdoor. It turns into a pit only the owner expects. |
| Portal pair | 3 | Walk in one, come out the other. Owner only, like pads. | N+ movement. Your fighter gets routes the rival doesn't have. |
| Turret | 3 | Fires an arrow at the rival every 3 s while it's on your half. | A defender that makes camping at home a real strategy. |
| Mine | 2 | A hidden spike that throws the rival straight up. | Hidden like spikes, but it launches into juggles. |
| Glue floor | 1 | Halves the rival's run speed. | Slows the rival down in your kill zone, with no damage. |
| Wall-jump wall | 1 | A block both fighters can wall-jump off. | Opens up vertical layouts. It needs the planner to learn wall jumps. |
| Saw | 3 | Moves along a track you draw. | The only piece that moves, and it shows off the animation. |

Piece upgrades are the "card upgrades" of this game: spikes that also slow,
pads that also launch the owner's attack, turrets that fire stars.

The navigation planner already simulates real physics for every jump. Portals,
crumble blocks and wall jumps are new edge types in `buildNav`, and `validate`
keeps every half fair automatically. That's the payoff of the existing
architecture.

## Acrobatics: the first run stat (in the prototype now)

Acrobatics runs from 0 to 4, and each level unlocks a move: roll, wall jump,
wall run, air flip. In a run it's a natural level-up reward. Each level visibly
changes how your fighter moves, and the sim shows a steady edge: about 44% at
level 0, up to about 55% at level 4. That's enough to matter without deciding
the fight.

Ideas for later levels:
- Ledge hang.
- A slide under low gaps.
- Wall-run attacks.
- Charms that change a move, for example a Blink that resets on a wall jump.

Blade exchanges also take acrobatics into account: better acrobats win more of
them and can vault out over the top.

## Weapons that would add something

Each one should change *how the fight moves*, not just the numbers.

| Weapon | Idea |
| --- | --- |
| Chain sickle | Middle reach. The second hit pulls the rival toward you. |
| Staff | Pole-vault on command, the movement weapon. Strong on vertical halves. |
| Chakram | A thrown blade that comes back, so it can hit twice and it catches people behind walls. |
| Shield and short sword | Blocks shots from the front while walking. The hard counter to Bow and Stars. |
| Gauntlets | Grabs and throws: throw the rival into your own spikes. Makes your half a weapon. |
| Scythe | A wide sweep that hits in front and behind, which punishes Blink cross-ups. |

## Skills that would add something

| Skill | Idea |
| --- | --- |
| Grapple | Swing to a ceiling or ledge. The N+ skill, and it opens up high ground. |
| Decoy | Leaves a copy the rival goes after. It reuses the Dark Sight perception system almost for free. |
| Rewind | Snap back to where you were 2 s ago, with the HP you had then. Once per fight. |
| Freeze frame | Everything else pauses for 0.75 s. An animator's power, and it looks great with the impact frames. |
| Sketch | Draw a temporary platform or wall mid-fight. The Animator vs Animation fantasy. |
| Dash | A short dash you can't be hit during. Simple, readable, and a good starting skill. |

A second skill slot is a good mid-run reward: an upgrade, not a starting option.

## Upgrades: two choices per weapon and skill

This gives depth without new systems.

- **Sword:** *Fourth hit* (extends the combo) or *Riposte* (a clash becomes a free counter).
- **Bow:** *Split shot* (three weak arrows) or *Heavy draw* (slower, pierces blocks).
- **Blink:** *Blink strike* (hits whoever is at the landing spot) or *Two charges*.
- **Dark Sight:** *Smoke bomb* (the rival can't see inside a cloud) or *Assassin* (crit ×2.5).
- **Parry:** *Wide guard* (a longer window) or *Mirror* (reflected shots crit).
- **Hook:** *Swap* (trade places instead of pulling) or *Barbed* (bleeds).

## Charms (relics)

Charms bend the rules for the rest of the run. There's an optional theme that
fits the Animator vs Animation look: name them after editor tools.

- **Undo:** once per run, a KO becomes 30 HP instead.
- **Magic wand:** your fighter knows where the rival's spikes are before the fight.
- **Clone stamp:** copy one piece from the last rival's half into yours, for free.
- **Eraser:** delete one of the next rival's pieces before the fight.
- **Layers:** your first hit each fight crits.
- **Onion skin:** afterimages trail your fighter, and each one blocks one shot.
- **Lasso:** the Hook pulls in shots too.

Keep charms to effects the spectator can *see*. An autobattler lives or dies on
the fight being readable, and "+5% damage" is invisible.

## Rivals at run scale

- **Generated rivals:** a name, weapon and skill, plus a generated half that
  passes `validate` within the act's budget, plus a *temperament*:
  aggressive, turtle, or trickster. Temperament is just AI knobs: dodge rate,
  preferred range, and when it uses its skill. That makes rivals feel
  different without new code.
- **Hand-made rivals as bosses and champions:** the eight existing ones.
- **Rivals that learn:** if you beat a rival with the same weapon twice, it
  counters next time. It's cheap to do and gives the run a story.

## What *not* to do yet

- **Health that carries between fights:** see the section on lives.
- **Terrain destruction:** the hammer breaking blocks is fun, but it breaks the
  planner's cached navigation. Save it for later.
- **Stat inflation:** keep numbers flat and grow options instead. The sim's
  45–55% band is the guardrail: every new item should go through
  `npm run sim` before it ships.

## Code shape before content

The fight code checks weapon names directly in many places, for example
`u.w === 'sword'`. Before adding lots of items, it's worth a small refactor so
content plugs in through hooks instead of `if` statements:

- Weapon and skill definitions carry their own AI hooks: `engage`, `tryAttack`
  and `trySkill`. The existing functions become the defaults.
- Charms and upgrades are data plus event hooks: `onFightStart`, `onHit`,
  `onHurt`, `onSkill` and `onKO`. The combat code fires them.
- Keep one file for as long as it's comfortable, but split out `content.js`
  once charms arrive.

## A suggested first slice

This is small enough to finish and big enough to feel like a run:

1. Map with 1 act, 6 stops, and one of the eight hand-made rivals as the boss. 3 hearts.
2. Pick-one-of-three after each win.
3. Four new pieces: crumble block, portal pair, mine and turret.
4. Two upgrades each for the six weapons and four skills.
5. Eight charms.
6. Generated rivals with temperaments for the normal stops.

The next steps after that would be the second skill slot, Grapple and Decoy,
then acts 2 and 3.
