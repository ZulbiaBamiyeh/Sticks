# Sticks

Stick-figure fighting games. The first one is **Inkfall**.

## Inkfall

An autobattler roguelike built for phones. A run is seven days of hunting ink
creatures for gear and duelling another player's build every night; the
fights run themselves. **Start a run** is the front door, and everything else
— the rival ladder, free build and every hunt — sits behind **Dev mode**.

- **Roguelike run** (the run bar at the top of the rival page), built on
  ZereshkStory's structure with this game's fights:
  - Seven days, each three hunts and then a duel. Win five duels for the Crown;
    lose three and the run is over.
  - **A run opens on a path.** Three of six, each a keystone you keep from the
    first hunt and the families it draws out of the ink: The Rot (Alchemist's
    Coil), The Storm (Tesla Coil), The Anvil (Juggernaut Plate), The Blood
    (Bloodletter), The Frost (Frostbite Charm), The Wing (Dervish Slippers).
    From then on one of the three hunts on offer leans your way whenever the
    day has a creature of yours in it.
  - **Wounds carry from hunt to hunt.** You start each day whole. What a hunt
    takes out of you, you take into the next one: you get some of it back
    afterwards depending on how hard the hunt was (Easy +25%, Normal +12%,
    Elite +4%), never dropping below 30%, and the duel that ends the day
    patches you up by half, not to full. Leaving a drop where it lies is a
    rest worth +35%. Losing a hunt costs its drop, not a life.
  - Each hunt offers three creatures, Easy, Normal and Elite. A card shows the
    creature, how hard it is, and two words on what its gear is for, under its
    status's own mark: "Bleed gear", "Chill gear". Win, then pick one of
    three drops. Harder creatures and variants turn up on later days, and
    creatures grow a little faster than gear does.
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
  - **A creature drops one thing.** No picking from three: what it drops is
    what you get, with two rerolls a day to change your mind — and a free one
    whenever the drop is for a slot you have already filled. Elite hunts can
    turn up a **legendary** instead, the only place they come from: nineteen
    rule-breaking items like the Gambler's Die (every hit is half or double),
    Pacifist's Vow (your hits do nothing, your statuses deal triple) and
    Thousand Cuts (every hit deals exactly 6, and you swing 60% faster).
  - **Three of them turn you into something else.** For a few seconds you stop
    being a stick figure: the Batskin Cowl makes you a bat every 9s (you barely
    fall, you are far harder to hit, your hits open cuts), Slimeskin makes you a
    slime the first time you drop below half HP (heavy armour, nothing can shift
    you, every hit feeds you), and the Wraith Veil turns using your skill into a
    wraith (you drift, most things miss, every hit drains). The creature is drawn
    in your own ink, and you keep your weapon and skills underneath.
  - **Builds compound.** Engine pieces turn one stat into another — HP into
    Atk, Def into Crit, Crit into status damage, every completed set into
    both — and payoff pieces multiply per status stack on the foe. The gear
    screen lists every synergy you have working, with its live value.
  - Items are Common, Rare, Epic or Legendary. Rarer items are stronger, roll affixes, and
    roll perks such as "On crit: 2 Shock", "+25% damage vs Poisoned" or "When
    you dodge: 10 Shield". Two pieces of a family give its set stats. Four
    bend a rule, often the one a keystone bends, so the two can double down.
    A six-slot bag holds spares, and they sell for gold.
  - Duels are against another build for that day. Entering a duel saves yours,
    so later runs can meet your old builds. The run saves as you go, and the
    run bar continues it.
  - Many items tie into how this game fights, with effects on rolls, wall
    jumps and air flips, using your skill, parries, winning a blade exchange,
    pad launches, air attacks, launching a foe, and kills in a hunt. Examples:
    Silk Vest (after a roll, your next hit crits), Hide Plate (knockback taken
    −50%) and Kite String (wall jumps carry you higher). Every item has a line
    of flavour and its own ink drawing, and what you wear shows on your
    fighter.
  - **Random events,** four a run, as in ZereshkStory: the Gremlin Trader,
    the Crimson Bargain, the Ghostly Tailor, the Dwarf Smith, a Suspicious
    Chest, the Echo Shrine, the Fortune Well, and an Old Sensei who trains
    your shoes' acrobatics. Each character is drawn beside your fighter.
    Two of the same item at the same rarity merge into one a rarity up.
  - **The shop is off for now** (`SHOP_ON`), so a day opens straight on the
    hunts. Gold still buys the gremlin's junk, the smith's hone, the well's
    toss and the sensei's lesson.
  - **Tap a trait to read it.** Set chips, keystones, relics, legendaries and
    the status icons on the gear screen all open a card explaining what they
    do for this build and where they came from.
  - Hunt cards show how many pieces of that family you wear. Item cards say
    when a piece completes a 2- or 4-piece bonus. The end of a run shows your
    final build, hunts won, Elites felled and gold earned.
  - 314 items: 98 weapons, 96 head, core and feet pieces, 103 trinkets and 17
    skill items; 12 of them are keystones, 21 relics and 20 legendaries, in 29 families,
    one per creature. There are 29 creatures at three tiers, as many families as
    ZereshkStory has. `tools/runbot.mjs` plays whole runs headless. A bot that
    always takes the Normal hunt wins the Crown in about a third of its runs
    and reaches day 5 or later in nearly all of them.
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
  - **Tome:** two tomes for now, the **Slime Tome** and the **Ice Tome**. The
    other books, both staves and all six puppets are shelved while each tome
    is rebuilt to fight its own way; their code is still in the file, and
    `versions/inkfall-v4-schools-puppets.html` is the game with all of them in
    it. A caster **looks like a caster**: a long robe with your colour round
    the hem and at the collar, wide sleeves, and no headband or scarf. It never
    runs, rolls, wall-runs, double jumps or flips away. When a blade comes it
    backs off. In dev mode the weapon page has a **Tome** button that picks
    between the two.
  - **The tome looks like a tome.** A thick book floats in front of the caster,
    bound in ink with pale metal corners, a drop of gel set into the cover that
    blinks, your strap buckled round it, and gel dripping off the page ends. At
    rest it lies shut with light leaking out. For a page the cover swings over
    on the spine, the pages glow, and bubbles boil up off them.
  - **It fights through what it grows.** Its pages:
    - **Pour a slime** (up to three at a time): gel runs out of the pages to
      the floor and a slime swells up out of the puddle. Slimes are small,
      see-through, and wear a sprout in your colour so you can tell whose they
      are. They stay near the book, hop at anything that comes close (and hunt
      down anything shooting at it), glue what they bite, and get in the way:
      a fighter has to go through them or walk round them to reach the book.
      After 16 seconds a slime runs back into the tome and heals it a little.
    - **Call them home** when it is hurt: every slime still out there flies
      back into the book as a gob of gel and heals it for what was left of it.
    - **Gob:** a lobbed gob of gel that hardly hurts but snares.
    - **Splash:** anything that gets inside is thrown back and glued where it
      lands.
    - **Regrowth** when it is hurt and has no slimes to call.
  - **The melt: a caster that can't be stunlocked.** Hit twice in a breath, or
    about to be hit again while already hurt, the caster slumps into a puddle
    that nothing can touch. The puddle slides out from under the blade, away if
    there is floor behind it and straight under the attacker if not, with the
    hat riding on top, the tome floating along above and two eyes peering out
    the front. It leaves a slick where it was standing, then pulls itself back
    together a few tiles off, pushing off and snaring whatever is standing on
    it. It comes back every 7 seconds.
  - **Slime Tome matchups:** the melt eats combos, so the sword, daggers,
    spear and stars struggle against it. A hammer's single heavy hit gives it
    nothing to melt from, and a bow kites the slimes, so those two are its
    counters.
- **The Ice Tome** builds a fortress where the Slime Tome grows an army. The
  slime caster floats in a pointed hat; the ice caster **skates**, low and
  leaning, pushing off one foot and gliding on the other with an arm out for
  balance, scoring a line of frost on the floor behind it. It wears a **hood**
  with a frosted rim and two pale eyes in it, and rime grows up its hem. Its
  tome is bound in frozen blue with a snowflake cut into the cover, icicles
  hanging off it, and cold breathing off the page ends. When it reads, flakes
  rise off the pages instead of bubbles.
  - **Ice wall:** a column of real ice, three tiles tall, raised across the
    floor between the caster and the rival. Nothing walks through it and
    nothing thrown gets past it (the caster's own lances go straight through
    its own ice). A blade in the way has to hack it down, and a wall that is
    broken goes off in shards at whoever broke it. Unbroken, it melts after six
    and a half seconds. Everybody's pathing is rebuilt when a wall goes up or
    comes down.
  - **Glaze:** a sheet of ice laid on the floor under the rival. Anything
    standing on it loses its grip: it slides wherever it was going, can't stop
    or turn, throws its arms out, and gets colder the longer it stays on it.
  - **Frost lance:** a flat, fast lance that chills. Three Chill freezes.
  - **Shatter:** when something cold gets close, the caster breaks the ice.
    It hits harder for every Chill on the target, and harder again on
    anything frozen.
  - **Ice block: the ice answer to stunlock.** The slime caster runs; the ice
    caster refuses to move. Pinned by a blade, it seals itself in a six-sided
    crystal for a second. Blades ring off it and come away chilled, shots
    shatter on it, and when it breaks open it throws everything next to it
    back and chills it. It comes back every nine seconds.
  - **Matchups:** roughly even against everything, where the Slime Tome
    swings wildly. It does best against blades and slime, and worst against
    shooters.
- **Balance** (`tools/sim.mjs --fights 2000`, each tome counted as its own
  entry): every entry wins between 44% and 57%. The Slime Tome wins 52% and
  the Ice Tome 54%.
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
  - **Ghost Walk:** for three quarters of a second nothing on the page is
    solid. You drift through blocks, through the floor and through the walls
    at the edge, nothing can touch you, and you cannot attack. You come out
    wherever you stopped — pushed clear if that happens to be inside a wall.
- **Trinkets and statuses:** a trinket puts a status on the rival when a hit
  lands, more often on heavier hits. **Statuses scale with the fighter that
  applied them**, so a burn from a day-seven maul is not the same burn as a
  day-one sword's: every tick reads that fighter's weapon damage and Atk. For a
  burn build, Burn holds at about 40% of its damage from day one to day seven,
  where it used to fade from 23% to 7%. Statuses change the fight, never how
  anyone runs or jumps, and each one reads from a single mark on the figure plus
  a chip under the HP bar:
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
  - **Hounds:** a lean, fast pack. Some of them leap clean over you to bite
    from behind.
  - **Crows:** hang back in the air and spit ink quills on an arc, then
    swoop in. Shooters beware.
  - **Crab:** its big claw guards its face, and hits from the front clank
    off. Hit it from above, from behind, or while it snaps.
  - **Mantis:** reads your swings. Now and then it parries one on its blades
    and answers at once with a double scythe.
  - **Wraith:** fades out, slips round behind you unseen and untouchable,
    reappears to reap, and heals on every hit it lands.
  - **Toad:** keeps its distance, swells its throat and shoots its tongue out
    to reel you in, then bites.
  - **Variants** appear from day 3 in a run: the same bodies with a status on
    their attacks and that status's colour on their eyes and markings. They
    are the Toxic Slime (poison), Frost Bats (chill), Storm Serpent (shock),
    Blood Spiders (bleed), Ember Jellyfish (burn), Molten Brute (burn),
    Ember Hounds (burn), Plague Crows (poison), Frost Crab (chill), Blood
    Mantis (bleed), Frost Wraith (chill), Poison Toad (poison), Vampire Bats
    (bleed), Thunder Jellyfish (shock), Ice Slime (chill), Venom Spiders
    (poison) and Fire Serpent (burn).
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

### Nothing scrolls

Every screen fits the window, on a 320-wide phone as much as on a tablet.
Lists are compact rows, and a piece's full card and its choices open in a
sheet over the top. The arena gives up height first; below that, short
screens drop flavour text and thin the type. `node tools/fit.mjs` walks
every screen at six sizes and fails if anything overflows.

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
