# Roguelike, async PvP, or both

A proposal for how Home Turf becomes a full game. It builds on
`docs/roguelike.md`, which covers the run's contents: pieces, upgrades, charms
and acrobatics.

## The short answer

Do both at once, the way Backpack Battles and Super Auto Pets do. The structure
is a roguelike run, and each fight is against a **ghost**: a saved snapshot of
another player's build from the same point in their own run. When there are no
ghosts to fight, generated rivals and the hand-made ones fill in, so the game
works on day one with nobody else playing.

Home Turf is unusually well suited to this, because the hard part is already
done:

- **Fights are deterministic.** A seed plus two builds always produce the same
  fight, frame for frame. A ghost is just a build: a few hundred bytes of JSON.
  Nobody has to be online, and nothing has to be streamed.
- **Fights run headless.** `__homeTurf.fight()` runs a full fight in well under a tenth of a second
  without drawing anything. A server, or the other player's device, can replay
  any fight to check a result.
- **Every half is checked for fairness already.** `validate()` rejects halves the
  rival can't get into or out of, so a ghost's half can't be an unwinnable
  fortress.
- **The rival page already exists.** Scouting an opponent before the fight is
  the natural screen for "here's the ghost you drew".

## The options

| | Pure roguelike (PvE) | Pure async PvP | Roguelike with ghosts (recommended) |
| --- | --- | --- | --- |
| Opponents | Hand-made and generated rivals | Other players' fixed builds on a ladder | Other players' builds from the same round of their runs |
| Content cost | High: someone has to design every enemy | Low: players are the content | Low, plus a fallback pool of rivals |
| Replay value | Depends on how much content exists | Depends on how varied the meta is | High: every run meets new builds |
| Needs a server | No | Yes | Only for the ghost pool; plays offline with rivals |
| Build variety | Tuned against the AI | Converges on whatever is strongest | Each round is a fresh draft, so builds stay varied |
| Fits Home Turf | Good | Good | Best: your half becomes something other people have to break into |

Pure PvE needs far more hand-made content than we have. Pure PvP with fixed
builds tends to settle on one best build, and the draft-per-run structure is
what keeps that from happening. The hybrid gets the benefits of both.

## A run, round by round

A run is about 12 rounds. You win the run with 10 wins, or lose it on your
5th loss, the Backpack Battles shape. Each round:

1. **Draft.** Spend ink on a pick of three: a piece, a weapon or skill upgrade,
   an acrobatics level, or a charm. Your weapon is fixed for the run once
   picked, so every run has an identity.
2. **Build.** Rearrange your half with your growing piece collection. The budget
   grows by round: 10, then 12, 14, up to 20.
3. **Scout.** The game draws a ghost: another player's snapshot from the same
   round, with a similar win-loss record. The rival page shows their name,
   loadout and half.
4. **Fight.** The fight is simulated with a fresh seed; your snapshot is
   uploaded with the result.
5. **Result.** Wins pay more ink, and style bonuses (parries, crits, pad plays,
   traps) pay a little extra.

Pacing: a fight runs 15–20 s, plus about 30 s to draft and build, so a run
takes 10–12 minutes. That's a good length for a phone session.

## The Home Turf twist: defense reports

Each fight here is two attacks at once: you go into their half while they come
into yours. That enables something other ghost games don't have. **Your half
keeps defending after you've moved on.** Every time someone draws your ghost,
their fight is also a defense of your half, and you get a report:

> 4 raiders came for your round 7 half. 3 fell. Your pad strike took down
> Quill; Pike found your spikes on the second try.

That gives the game a reason to come back between sessions, like a Clash of
Clans defense log, at almost no cost: ghost fights already happen, so we only
need to record their outcomes. It also rewards clever halves (pad routes, trap
placements), which is the thing Home Turf does that no other autobattler does.

## Matchmaking

- **Same round:** a round-7 player fights a round-7 ghost, so budgets and
  upgrade counts match.
- **Similar record:** 5–2 players meet 5–2 ghosts where possible, falling back
  to ±1 win.
- **Fresh ghosts first:** prefer snapshots from the current balance patch. Store
  a version number with every ghost and never match across versions where the
  rules changed.
- **Fallback:** if no ghost matches, draw a generated rival for that round's
  budget, then a hand-made one. Players never wait.

## Keeping it fair

- **Cheating.** A client could claim a win it didn't earn. Because fights are
  deterministic, the server can replay any submitted fight and reject a
  mismatch. Before that exists, the damage is limited: a fake result only
  inflates one player's own record, and ghosts are built from inputs (the build),
  not claimed results.
- **Impossible builds.** The server also runs `validate()` on every snapshot and
  checks it could be afforded at that round.
- **Stale balance.** Ghosts carry the version number of the rules they were built
  under, so a balance patch doesn't pit new rules against old builds.
- **One strongest build.** Watch the ghost pool's win rates. The sim tool
  (`npm run sim`) already reports win rates per weapon, skill and acrobatics
  level, and it can be pointed at real ghosts instead of random loadouts.

## Getting there in stages

Each stage is playable on its own.

1. **Local run (no server).** The roguelike run from `docs/roguelike.md` against
   generated and hand-made rivals. This proves the draft-build-fight loop is fun
   before any networking exists.
2. **Challenge links (no server).** Encode a build in the URL (base64url fits the
   characters an artifact link allows after `#`). Send the link to a friend; they
   fight your ghost, and the replay is exact because it's the same seed. This is
   also the cheapest possible test of whether people enjoy fighting each other's
   builds.
3. **Shared ghost pool in the artifact.** A published artifact can keep a small
   shared database. Snapshots written there by testers can be drawn by other
   testers from the same link. The limit: only signed-in people with access to
   the link can write, so this suits a closed playtest with friends, not a
   public launch.
4. **Real backend.** A small serverless API (for example a Cloudflare Worker with
   a key-value store) holding snapshots by round and record, defense reports,
   and replay verification. This needs the fight sim split out of `index.html`
   into a module that runs in Node, which is mostly mechanical, since the sim
   already runs without drawing.
5. **Seasons.** Weekly ghost pools, a leaderboard of full 10-win runs, and
   featured halves.

## Decisions for you

- **Hearts or wins-to-win?** The 10-wins / 5-losses shape suits async PvP better
  than 3 hearts over a fixed map, because every round is a fight.
- **Is the weapon locked for the run?** Locking gives each run an identity;
  allowing swaps gives more room to adapt.
- **Do defense reports count toward anything?** For example, ink for the next
  run, or a "best defender" leaderboard.
- **Names:** ghosts need a display name, whether player-chosen or generated like
  the current rivals.
