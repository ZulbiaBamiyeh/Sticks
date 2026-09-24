# Gear, trinkets and statuses: design notes

A proposal for the roguelike's loot layer, borrowing from ZereshkStory (the
Maple repo, `character-art-equipped-items-xaj1jf` branch) and translated to a
game where fights are physics, not attack timers. It sits under
`docs/roguelike.md` (the run) and `docs/async-pvp.md` (ghosts and duels).

## Two rules

1. **Movement comes only from what you choose.** Your feet slot (acrobatics)
   and your skill trinkets change how you move. Statuses and passives never
   slow running or change jumps. This keeps fights readable, and it keeps the
   route planner honest: nav graphs are built from each fighter's speed and
   jump height, so a status that changes them would make the AI mispredict.
2. **Every item is one mark.** Gear is drawn as a single stroke in the limbs'
   line weight: a headband with two tails, a scarf, hand wraps, shoe tips.
   Rarity changes only the accent (plain, then the school's colour, then an
   animated trail). No new palette colours, and nothing drawn *on* the body.

## The equip screen

Same shape as ZereshkStory's: three slots each side of the idling fighter.

```
   HEAD  ┐            ┌  WEAPON
   CORE  ├  (fighter  ├  TRINKET
   FEET  ┘    idles)  └  TRINKET
      [ relic ] [ set ◐ ] [ set ◑ ]   ← passives row
      [ bag · 6 ]            TURF ▸   ← second tab: your half
```

| Slot | Owns | Examples |
| --- | --- | --- |
| Head | The AI itself | *Read* (faster reactions), *Nerve* (dodge and parry timing), *Cunning* (spike memory, pad plays, exchange breaks) |
| Core | Staying power | HP, poise (knockback and juggle resistance) |
| Feet | Movement | Acrobatics level (roll, wall jump, wall run, flip), run speed |
| Weapon | Weapon type | Sword, daggers, spear, hammer, bow, stars, plus affixes |
| Trinket ×2 | A skill **or** a passive | Two skills, one of each, or two passives |

## Trinkets

**Skill trinkets.** Rarity adds perks.

| Trinket | Skill | Perks |
| --- | --- | --- |
| Paper Crane | Blink | Blink Strike · two charges · resets on a wall jump |
| Ink Vial | Dark Sight | Leaves a smoke cloud · crits ×2.5 from hiding |
| Tuning Fork | Parry | Wider window · reflected stars crit |
| Fish Hook | Hook | Swap places · barbed |
| Kite String | Grapple | (new) |
| Paper Doll | Decoy | (new) |
| Stopwatch | Freeze Frame | (new) |
| Pencil | Sketch: draw a temporary ledge | (new) |

**Passive trinkets.** A trigger plus an effect, as in ZereshkStory. Triggers:
battle start, on hit, on crit, when hit, every Nth hit, below X% HP, plus
movement triggers (on roll, on wall jump, on pad, on landing, on blink,
on parry). Movement may *trigger* an effect; the effect is always combat.

- **Viper Fang, Ember Charm:** a chance on hit to Poison or Burn.
- **Frost Bell:** the rival starts the fight with Chill.
- **Metronome:** every third hit launches the rival into a juggle.
- **Thorn Ring:** a clean guard or parry deals damage back.
- **Last Stand Locket:** a Shield below 40% HP.
- **Cinder Soles:** rolls leave fire on the floor.
- **Frost Spurs:** wall jumps Chill whoever is below.
- **Storm Kite:** pad landings Shock the rival nearby.

**Relics (one slot, rule-benders):** Phoenix Feather (revive once), Echo
Conch (statuses land twice), Cursed Mirror (reflects statuses), Gilded
Hourglass (below 40% HP you turn to a solid gold silhouette, untouchable
for 3 s), Glass Heart (+50% dealt, +25% taken).

## Statuses

Each changes combat, never movement, and reads from one mark.

| Status | Effect | Mark |
| --- | --- | --- |
| Burn | Damage over time that ignores guard | Smoke curl |
| Poison | Stacking damage over time | Green tint on the line |
| Bleed | Hurts each time the bleeder attacks | Ink drip on each swing |
| Chill → Freeze | Chill slows wind-ups; at 3 stacks, a short freeze (a stun in an ice box) | Frost ticks, then a crisp box |
| Shock | Hits taken deal extra per stack; a full bar discharges | Zigzag jitter |
| Sunder | Weaker guard and parry; loses more blade exchanges | Crack mark |
| Shield · Regen · Frenzy | Self-buffs; Frenzy is faster attacks | Outline · pulse · longer afterimage |

The AI makes choices around statuses without its movement changing: it
avoids exchanges while Sundered and presses a frozen rival.

## Sets (schools)

Hunt rivals and mobs belong to schools, and wearing two or four pieces of a
school's gear gives a bonus that bends a rule:

- **Crane:** 2: +1 acrobatics. 4: a hit resets your air flip.
- **Wasp:** 2: stars ricochet off one wall. 4: every third volley throws three.
- **Mantis:** 2: win tied exchanges. 4: a won exchange gives a free riposte.
- **Spring:** 2: your pads throw the rival away too. 4: pad landings send a shockwave.
- **Moth:** 4: every vanish leaves a decoy.

## Hunts against mobs

Hunts are fights against line-drawn creatures in themed arenas; duels stay on
the halves, so your turf is the PvP stage. Creatures animate from physics,
which is cheaper than drawn frames and keeps the clean stroke:

- **Ink slime:** one closed curve on springs; squashes, hops, splits in two.
- **Paper bats:** two wing strokes on a sine path; dive at the fighter.
- **Serpent:** a chain of points.
- **Crawler:** legs that walk walls and ceilings.
- **Golem:** stacked blocks; a slam shockwave (reuses the hammer's).

Mobs use simple behaviours (hop, fly, patrol, dive), not the route planner.
The main engineering cost is that fight code assumes exactly one opponent,
so the fighter AI needs target choice before mobs can come in groups.

## First prototype slice (built)

1. Five passive trinkets carrying Burn, Poison, Bleed, Chill and Shock. In
   random-loadout sims each trinket wins 50–56% against a different one, and
   fighting without one wins 35%, so trinkets play like loot, the way skills do.
2. Two hunts: the Ink Slime (splits in two) and the Paper Bats (three bats that
   take turns to dive). Fighters pick the nearest creature as their target.
3. The PvP numbers from `npm run sim` didn't move when hunts went in.

Still to do: the AI's choices around statuses (pressing a frozen rival,
avoiding exchanges while Sundered), Sunder itself, skill trinkets, and hunt
difficulty tiers.
