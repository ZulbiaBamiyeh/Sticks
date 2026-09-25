# Bestiary and items: getting to ZereshkStory's scale

Builds only matter in async PvP when there are enough pieces for them to be
different. ZereshkStory gets there with this much content:

| | ZereshkStory | Home Turf today |
| --- | --- | --- |
| Monsters | 65 (22 Easy, 23 Normal, 20 Elite) in 29 families | 29 creatures (12 bodies, 17 variants) in 29 families, × 3 tiers = 87 |
| Biomes | 10 | 1 hunting ground |
| Items | 150: 34 weapons, 57 armour, 36 trinkets, 10 keystones, 13 relics | 314: 98 weapons, 96 armour, 103 trinkets, 17 skill items; 12 keystones, 21 relics, 20 legendaries |
| Statuses | 14 | 5 |

## Creatures: bodies × variants × tiers

Each creature body is expensive: it needs its own drawing, animation and
brain, and it has to look polished. So the count should come from a moderate
number of bodies, each with variants.

- **Bodies (target 12):** the six built so far (slime, bats, serpent, spiders,
  jellyfish, brute), plus about six more, each built to play differently:
  - **Hound:** a fast runner that circles, then pounces; packs flank from both sides.
  - **Crows:** a flock that shoots from range, so it counters shooters.
  - **Crab:** armoured from the front, so it has to be hit from above or behind.
  - **Mantis:** a blade creature that can lock into exchanges like a sword.
  - **Wraith:** fades in and out, which tests Dark Sight and target switching.
  - **Toad:** its tongue grabs and reels you in, a creature's Hook.
- **Variants (about 5 per body):** the same body with a different status and
  one accent colour in the eyes and markings, in that status's colour, which
  follows the one-accent rule. Examples: frost bats (Chill on hit), venom
  spiders (Poison), storm jellyfish (Shock), a molten brute (Burn on the
  shockwave). Variants can also change a behaviour: a spitting slime, a
  web-shooting spider.
- **Tiers:** Easy, Normal and Elite already exist and scale HP, damage and
  cooldowns. Elites also get bigger packs or a boss form, and red eyes.

12 bodies × 5 variants gives about 60 creatures, and tiers multiply how many
distinct fights that makes. Mixed packs, such as a brute escorted by bats, add
more without new art.

## Families and items

As in ZereshkStory, each variant family drops its own gear, and wearing
several pieces of a family unlocks a set bonus that bends a rule (see
`docs/gear.md`). Across 6 slots that works out to roughly:

| Slot | Target | How |
| --- | --- | --- |
| Weapon | ~30 | 6 weapon types × family versions, with affixes and perks |
| Head, Core, Feet | ~50 | the AI, staying power and acrobatics slots |
| Trinket | ~35 | about 25 passive trinkets plus the skill trinkets |
| Keystones | ~10 | one per biome, each changing a rule |
| Relics | ~13 | from Elite hunts |

## Where it stands

The run loop is built (see the README): days, three hunt offers, loot, gear and
bag, set bonuses, duels against generated and saved builds, and saving. There
are six bodies, each with a status variant, and a family of gear for each.

Items now work like ZereshkStory's:
- weapon damage ranges with a pace and a signature per type;
- flat Atk, Def with Pierce, Crit and Crit damage, Haste, Evasion, Resist,
  Lifesteal, Regen and Thorns;
- trigger trinkets in two trinket slots;
- ten keystones and twelve relics that bend rules;
- perks on rare and epic items;
- 2-piece set stats and 4-piece set rules.

Creatures in a run grow 35% a day on top of gear's day scaling
(`mobPower`), because gear multiplies.

Since then:
- Hounds, Crows and the Crab are built, each with a variant and a family.
- ZereshkStory's random events and merging are built.
- Every item has its own drawing, and worn gear shows on the fighter.

Also built since: the Mantis, Wraith and Toad with variants; second variants
for five bodies; and ZereshkStory's shop.

Next, in order:
1. **A final-day boss** for the last duel slot, or a boss hunt per biome.
2. **Biomes:** arenas themed to their creatures, like ZereshkStory's ten.
