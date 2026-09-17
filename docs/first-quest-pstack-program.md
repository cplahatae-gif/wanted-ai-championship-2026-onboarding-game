# First Quest program plan

First Quest is a web onboarding game generator for Wanted AI Championship 2026 and beyond.
HR runs an interview, uploads docs and optional office photos or an industry preset, then publishes a playable 2D RPG from a validated GamePack JSON.
Neulbom Labs is the public demo with no company secrets.
This program enforces one PR per verifiable unit, browser proof via control-ui, and Orchestrate coordination until Demo Day 2026-10-17.
PR order is PR-00 through PR-09.
The operator merges each PR after a clean swarm verdict at merge-ready head SHA.

## How to read this

One box is one unit of work. Every box names the evidence that checks it. A nested box is a sub-step of the box above it. Check a box only when its evidence exists, a file, a log line, a screenshot, a test run, or a SHA. The body is a how-to. The appendices explain and record.

The program runs `pstack/skills/poteto-mode/playbooks/orchestrate.md`. The operator merges every PR after merge-ready swarm PASS. PR-03 and PR-08 are review-gated before merge.

Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

## Program checklist

### Arm the program

- [ ] State the protocol and this plan to the operator, then stop. Start execution only on the operator's explicit go.
- [ ] On the operator's go, arm a `/goal` with this exact text. "Plan docs/first-quest-pstack-program.md. PR-00 through PR-09 in order with stack where noted. Verification rule. Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked. Operator merges after swarm PASS. Done when PR-03 is live on Vercel for Wanted 2026-09-20 submit and PR-08 is live before Demo Day 2026-10-17."
- [ ] Read these from trunk at program start. Re-read them at every tick.
  - [ ] `git show origin/main:pstack/skills/poteto-mode/playbooks/orchestrate.md`
  - [ ] `git show origin/main:pstack/skills/swarm/SKILL.md`
  - [ ] `git show origin/main:cursor-team-kit` control-ui skill path when published in repo
  - [ ] `git show origin/main:pstack/skills/poteto-mode/playbooks/opening-a-pr.md`
  - [ ] `git show origin/main:pstack/skills/show-me-your-work/SKILL.md`
- [ ] Arm the 30-minute audit tick. In a local session, a real terminal `/loop`. In a cloud root, a cloud-sleeper wake chain. Never leave the cadence to memory.
- [ ] Use this tick prompt, verbatim. "Re-read the execution playbook from trunk and the armed /goal. Audit the operation against both and fix drift in this tick. Probe every active lane and judge progress by side effects only. Stand down a stuck lane and dispatch its replacement now. Then post a status message to the operator in chat, whether or not anything changed, with the queue table of PR, owner, state, and head SHA, the verdicts since the last tick, what merged, open operator gates, and blockers."
- [ ] On the operator's hold or stand-down, send every owner a zero-writes order at once.

### Spawn owners

- [ ] Spawn one owner per PR with the full lifecycle the execution playbook names.
- [ ] Follow this dependency graph. Start dependent work only after its parent merges, or base it on the parent branch when the execution playbook stacks.
  - [ ] PR-00 branches from `main` alone.
  - [ ] PR-01 after PR-00 merges, or stacks on PR-00 branch until Sprint 0 land.
  - [ ] PR-02 after PR-01.
  - [ ] PR-03 stacks on PR-02 for Sprint 0 submit.
  - [ ] PR-04 after PR-03 merges.
  - [ ] PR-05 after PR-04.
  - [ ] PR-06 after PR-05.
  - [ ] PR-07 after PR-02 and may parallel PR-05 after PR-02 merges.
  - [ ] PR-08 after PR-06 and PR-07.
  - [ ] PR-09 after PR-08, optional before Demo Day.
- [ ] Hold the file boundaries. PR-00 touches only `apps/web/package.json`, `.cursor/skills/verify-first-quest/**`, `docs/**`, root config. PR-01 only `packages/gamepack-schema/**`. PR-02 only `apps/web/game/**`, `apps/web/public/game/**`. PR-03 only `apps/web/app/create/**`, `apps/web/app/demo/**`, landing. PR-04 only `apps/web/app/api/generate/**`, job types. PR-05 only `apps/web/lib/ingest/**`. PR-06 only `apps/web/app/review/**`. PR-07 only `apps/web/lib/visual/**`, assets presets. PR-08 only polish paths under `apps/web/game/**` and shared UI. PR-09 only `apps/web/game-3d/**`.
- [ ] Hold the review gate. PR-03 and PR-08 change primary user interaction. They wait for operator review in chat with screenshots and a video before merge.

### PR mechanics, for every PR

- [ ] Resolve the forge once. Default to `gh`. If `command -v origin` succeeds and Origin can resolve the repository, use `origin pr` for every PR operation. Record any fallback to `gh`. Never require `gt`.
- [ ] Open the PR ready, never draft, with `gh pr create --base <base-branch>`. Stack children target their parent branch during Sprint 0.
- [ ] Run the repo lint and typecheck once before the PR-facing push. Push with hooks on.
- [ ] Run `/deslop` before each commit and `/no-comments` before review.
- [ ] Triage every Bugbot and security-reviewer comment per `../references/bugbot-triage.md`.
- [ ] Rebase onto current trunk before babysit and again before the merge-ready report.

### Verdict and merge, for every PR

- [ ] At the merge-ready head SHA, run the swarm per `pstack/skills/swarm/SKILL.md`. One gates lane. The ten live lanes from the PR's **Verify, live** block. The perf lane from its **Verify, perf** block. One audit lane that reads the diff and the receipts and distrusts the PR body.
- [ ] Clean only when every lane is `PASS`. Findings go back to the owner. A new head gets a fresh swarm and a fresh verdict.
- [ ] Operator squash-merges after clean verdict. Shipping playbook patch-id rule applies when landing stacks.

### Boot recipe, for every live lane

Each live lane runs on its own cloud VM at the PR head. Drive through `control-ui` from `cursor-team-kit`.

- [ ] `git fetch origin <head-branch> && git checkout <head SHA>`.
- [ ] Run `pnpm install` in `apps/web` if present, then `pnpm dev` and wait for localhost ready or open deployed preview URL from PR description.
- [ ] Deliver input only through control-ui navigation and keyboard. Read-only diagnostics are browser devtools console errors only when a lane fails.
- [ ] Save every screenshot to `/tmp/swarm-<pr-id>/worker-<n>/<slug>.png` and return the paths with the report.

## Scaffold the monorepo and verification skill (PR-00)

**Depends on.** None.

**Files.**

- [ ] Create `apps/web/package.json` with Next.js App Router and Phaser dependency.
- [ ] Create `.cursor/skills/verify-first-quest/SKILL.md` with control-ui steps for `/demo` smoke.
- [ ] Create `docs/first-quest-pstack-program.md` link from `README.md`.

**Build.**

- [ ] Add verify skill that documents base URL, demo route, and pass predicates for movement and interact key.

**You see.**

- [ ] Local dev server starts and `/demo` returns HTTP 200 with a canvas or placeholder shell.

**Verify, unit.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] Add `packages/gamepack-schema` placeholder export if needed for workspace graph. Run `pnpm exec tsc --noEmit` when tsconfig exists.

**Verify, live.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked. Ten lanes on `grok-4.6-fast-xhigh` at the PR head, per the boot recipe.

- [ ] Lane 1. Regression lane against trunk. Trunk lacks the app. Record that and gate HTTP 200 on `/demo` and visible canvas or placeholder. Save `demo-shell.png`. Pass when both hold.
- [ ] Lane 2. Open `/`. Save `landing.png`. Pass when page loads without console error severity error.
- [ ] Lane 3. Open `/demo`. Save `demo-route.png`. Pass when route loads.
- [ ] Lane 4. Resize viewport to mobile width 390px. Save `demo-mobile.png`. Pass when layout does not overflow horizontally.
- [ ] Lane 5. Reload `/demo` twice. Save `demo-reload.png`. Pass when second load matches first visually.
- [ ] Lane 6. Open invalid route `/nope`. Save `demo-404.png`. Pass when app shows not-found without crash.
- [ ] Lane 7. Disable JavaScript in devtools then enable and reload `/demo`. Save `demo-js-recover.png`. Pass when recover succeeds.
- [ ] Lane 8. Navigate `/demo` from `/` via link if present else direct URL. Save `demo-nav.png`. Pass when navigation succeeds.
- [ ] Lane 9. Check favicon and title tag on `/demo`. Save `demo-meta.png`. Pass when title contains First Quest or Neulbom placeholder.
- [ ] Lane 10. Run verify skill documented steps end to end once. Save `demo-verify-skill.png`. Pass when skill predicates match.

**Verify, perf.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] Metric. Time to first byte for `/demo` on localhost after dev ready.
- [ ] Probe. `curl -o /dev/null -s -w '%{time_starttransfer}\n' http://localhost:3000/demo` three times interleaved on trunk baseline N/A and head.
- [ ] Baseline. Record N/A trunk. Head median of three samples.
- [ ] Rule. Head median must be under 2.0 seconds on localhost dev after server ready.

**Review gate.** None. PR-00 is not review-gated.

**Merge.**

- [ ] Root clean verdict at exact head SHA.
- [ ] Bugbot triage done.
- [ ] Rebased onto current trunk after verdict, patch-id unchanged.
- [ ] Operator squash-merges PR-00.

## Define the GamePack schema and Neulbom fixture (PR-01)

**Depends on.** PR-00.

**Files.**

- [ ] Create `packages/gamepack-schema/src/gamepack.ts` with Zod schema.
- [ ] Create `packages/gamepack-schema/fixtures/neulbom-labs.json`.
- [ ] Create `packages/gamepack-schema/src/gamepack.test.ts`.

**Build.**

- [ ] Model quests, npcs, dialogues, map, visual, and meta with illegal states rejected by Zod.

**You see.**

- [ ] `pnpm test` in package parses fixture and rejects a deliberately broken pack.

**Verify, unit.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] Run `pnpm --filter gamepack-schema test`. Pass when all cases green.

**Verify, live.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked. Ten lanes on `grok-4.6-fast-xhigh` at the PR head, per the boot recipe.

- [ ] Lane 1. Regression. Trunk lacks schema. Gate fixture parse via a tiny `/api/health/gamepack` or static import page if exposed. Save `schema-regression.png`. Pass when Neulbom fixture validates.
- [ ] Lane 2. Load demo if wired to fixture import only. Save `schema-demo-import.png`. Pass when no runtime Zod error.
- [ ] Lane 3. Break fixture in dev-only query flag if exists else skip with recorded skip. Save `schema-invalid.png`. Pass when invalid pack surfaces friendly error.
- [ ] Lane 4. Open `/demo`. Save `schema-demo-stable.png`. Pass when unchanged from PR-00 baseline behavior.
- [ ] Lane 5. Repeat lane 4 on mobile width. Save `schema-demo-mobile.png`. Pass when stable.
- [ ] Lane 6. Console clean on `/demo`. Save `schema-console.png`. Pass when no Zod error logged.
- [ ] Lane 7. Reload `/demo`. Save `schema-reload.png`. Pass when stable.
- [ ] Lane 8. Navigate home and back. Save `schema-nav.png`. Pass when stable.
- [ ] Lane 9. Open README or docs page if added. Save `schema-docs.png`. Pass when documents GamePack fields.
- [ ] Lane 10. Export JSON download link if added for fixture. Save `schema-export.png`. Pass when downloaded JSON validates offline test.

**Verify, perf.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] Metric. Zod parse time for Neulbom fixture in unit test average.
- [ ] Probe. Run package test with `--reporter=verbose` and read parse benchmark if instrumented else use test wall time for schema test file only.
- [ ] Baseline. N/A trunk.
- [ ] Rule. Parse test file completes under 5 seconds total on CI runner class used by repo.

**Review gate.** None. PR-01 is not review-gated.

**Merge.**

- [ ] Root clean verdict at exact head SHA.
- [ ] Bugbot triage done.
- [ ] Rebased onto current trunk after verdict, patch-id unchanged.
- [ ] Operator squash-merges PR-01.

## Ship the Neulbom Phaser runtime with seven missions (PR-02)

**Depends on.** PR-01.

**Files.**

- [ ] Create `apps/web/game/` Phaser boot, scenes, quest FSM consuming GamePack.
- [ ] Wire `apps/web/app/demo/page.tsx` to load Neulbom fixture.

**Build.**

- [ ] Implement movement, interact key, quest HUD, localStorage progress, seven missions through ending.

**You see.**

- [ ] Operator completes seven missions on `/demo` without soft-lock.

**Verify, unit.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] Add quest FSM unit tests for prerequisite unlocking. Run `pnpm test` scoped to game logic.

**Verify, live.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked. Ten lanes on `grok-4.6-fast-xhigh` at the PR head, per the boot recipe.

- [ ] Lane 1. Regression on trunk without missions. Gate mission 1 accept and complete. Save `game-m1.png`. Pass when objective clears.
- [ ] Lane 2. Complete missions 1 through 3. Save `game-m3.png`. Pass when quest log shows three done.
- [ ] Lane 3. Complete all seven missions and ending. Save `game-ending.png`. Pass when ending screen shows.
- [ ] Lane 4. Reload mid-run mission 4. Save `game-resume.png`. Pass when progress restores from localStorage.
- [ ] Lane 5. Mobile touch controls if present. Save `game-touch.png`. Pass when movement works at 390px width.
- [ ] Lane 6. Open dialogue and choose branch. Save `game-dialogue.png`. Pass when flags update quest.
- [ ] Lane 7. Fail objective once then succeed with hint if implemented else succeed. Save `game-retry.png`. Pass when no soft-lock.
- [ ] Lane 8. Idle two minutes then interact. Save `game-idle.png`. Pass when still responsive.
- [ ] Lane 9. Complete run under fifteen minutes wall clock. Save `game-time.png`. Pass when ending before cap.
- [ ] Lane 10. Verify skill full demo path. Save `game-verify-skill.png`. Pass when skill doc matches behavior.

**Verify, perf.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] Metric. Phaser scene time-to-interactive after `/demo` load on preview URL.
- [ ] Probe. Performance API navigation timing or control-ui scripted reload five times interleaved.
- [ ] Baseline. Trunk N/A or PR-01 head if stacked.
- [ ] Rule. Median time-to-interactive under 4 seconds on preview hardware class documented in PR.

**Review gate.** None. PR-02 is not review-gated unless operator requests UX review early.

**Merge.**

- [ ] Root clean verdict at exact head SHA.
- [ ] Bugbot triage done.
- [ ] Rebased onto current trunk after verdict, patch-id unchanged.
- [ ] Operator squash-merges PR-02 or keeps stacked for PR-03.

## Add the Create wizard and sample document preview (PR-03)

**Depends on.** PR-02.

**Files.**

- [ ] Create `apps/web/app/create/**` interview steps and sample MD upload.
- [ ] Create `apps/web/app/page.tsx` landing with Demo and Create CTAs.

**Build.**

- [ ] Wire sample onboarding MD to canned or LLM GamePack preview with generating UI states.

**You see.**

- [ ] Create flow finishes with playable preview of at least three missions within ninety seconds using sample doc.

**Verify, unit.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] Test interview answer merge into draft GamePack object. Run unit tests in create lib.

**Verify, live.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked. Ten lanes on `grok-4.6-fast-xhigh` at the PR head, per the boot recipe.

- [ ] Lane 1. Regression `/demo` seven mission path still passes. Save `create-regression-demo.png`. Pass when unchanged.
- [ ] Lane 2. Start Create from landing. Save `create-step1.png`. Pass when step one renders.
- [ ] Lane 3. Complete interview steps. Save `create-interview-done.png`. Pass when advance to upload.
- [ ] Lane 4. Upload bundled sample MD. Save `create-upload.png`. Pass when accepted.
- [ ] Lane 5. Observe generating states. Save `create-generating.png`. Pass when progress labels advance.
- [ ] Lane 6. Open preview play. Save `create-preview.png`. Pass when three missions playable.
- [ ] Lane 7. Mobile Create flow. Save `create-mobile.png`. Pass when usable at 390px.
- [ ] Lane 8. Cancel mid-generate and restart. Save `create-cancel.png`. Pass when no corrupt state.
- [ ] Lane 9. Demo button from landing. Save `create-demo-cta.png`. Pass when routes to `/demo`.
- [ ] Lane 10. Vercel production URL repeat lanes 2 through 6. Save `create-prod.png`. Pass when production matches preview behavior.

**Verify, perf.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] Metric. Sample doc path wall time from upload click to preview ready.
- [ ] Probe. Control-ui timed run three times on preview URL.
- [ ] Baseline. Trunk lacks create. Record head median only.
- [ ] Rule. Median under 90 seconds for sample doc on preview with documented API keys or canned fallback.

**Review gate.** The operator reviews before merge.

- [ ] Copy lane 6 and lane 10 screenshots into `docs/media/PR-03-review-preview.png`.
- [ ] Record a 30 to 60 second video of Create flow on preview. Save as `docs/media/PR-03-review.mp4`.
- [ ] Post screenshots and video in chat. Stop at merge-ready. Wait for operator click.

**Merge.**

- [ ] Root clean verdict at exact head SHA.
- [ ] Bugbot triage done.
- [ ] Rebased onto current trunk after verdict, patch-id unchanged.
- [ ] Operator squash-merges PR-03 before 2026-09-20 Wanted submit.

## Add async generate jobs with idempotent lifecycle (PR-04)

**Depends on.** PR-03 merged.

**Files.**

- [ ] Create `apps/web/app/api/generate/**` routes and job store interface.
- [ ] Create job state machine types colocated with gamepack job meta.

**Build.**

- [ ] Implement Parsing through Ready steps with retry and idempotent job id.

**You see.**

- [ ] Same job id retry returns same final GamePack version without duplicate side effects.

**Verify, unit.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] Unit test job transitions and idempotent completion handler. Run targeted tests.

**Verify, live.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked. Ten lanes on `grok-4.6-fast-xhigh` at the PR head, per the boot recipe.

- [ ] Lane 1. Regression Create sample path. Save `job-regression-create.png`. Pass when still works.
- [ ] Lane 2. Start job via API or UI. Save `job-started.png`. Pass when status Parsing appears.
- [ ] Lane 3. Poll until Ready. Save `job-ready.png`. Pass when Ready with pack id.
- [ ] Lane 4. Retry same client token. Save `job-idempotent.png`. Pass when single published pack.
- [ ] Lane 5. Force error with invalid upload. Save `job-error.png`. Pass when friendly failure and retry offered.
- [ ] Lane 6. Demo unaffected. Save `job-demo.png`. Pass when `/demo` seven missions.
- [ ] Lane 7. Concurrent two jobs different ids. Save `job-concurrent.png`. Pass when both complete.
- [ ] Lane 8. Reload during job. Save `job-reload.png`. Pass when status recovers.
- [ ] Lane 9. Mobile job UI. Save `job-mobile.png`. Pass when readable progress.
- [ ] Lane 10. Production URL job happy path. Save `job-prod.png`. Pass when Ready on prod.

**Verify, perf.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] Metric. Server time from job accept to Ready for sample doc.
- [ ] Probe. Logged timestamps in job record or API metrics three samples.
- [ ] Baseline. PR-03 head median if comparable else N/A.
- [ ] Rule. p95 under 120 seconds for sample doc on prod tier documented in PR.

**Review gate.** None. PR-04 is not review-gated unless UI changes materially.

**Merge.**

- [ ] Root clean verdict at exact head SHA.
- [ ] Bugbot triage done.
- [ ] Rebased onto current trunk after verdict, patch-id unchanged.
- [ ] Operator squash-merges PR-04.

## Ingest PDF and markdown with source references (PR-05)

**Depends on.** PR-04.

**Files.**

- [ ] Create `apps/web/lib/ingest/**` chunking and sourceRefs mapping.
- [ ] Extend GamePack quests with sourceRefs to chunk ids.

**Build.**

- [ ] Parse md and pdf text into chunks then structured quest draft via schema-bound LLM step.

**You see.**

- [ ] HR preview shows each quest linked to at least one source chunk for sample uploads.

**Verify, unit.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] Fixture ingest files produce expected chunk count and refs. Run ingest unit tests.

**Verify, live.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked. Ten lanes on `grok-4.6-fast-xhigh` at the PR head, per the boot recipe.

- [ ] Lane 1. Regression job happy path. Save `ingest-regression.png`. Pass when sample still works.
- [ ] Lane 2. Upload fictional MD doc. Save `ingest-md.png`. Pass when quests cite sources.
- [ ] Lane 3. Upload fictional PDF doc. Save `ingest-pdf.png`. Pass when text extracted and cited.
- [ ] Lane 4. Empty file rejection. Save `ingest-empty.png`. Pass when validation error.
- [ ] Lane 5. Oversize file rejection. Save `ingest-large.png`. Pass when limit message.
- [ ] Lane 6. PII warning display on upload screen. Save `ingest-pii-banner.png`. Pass when banner visible.
- [ ] Lane 7. Demo still seven missions. Save `ingest-demo.png`. Pass when demo ok.
- [ ] Lane 8. Mobile upload. Save `ingest-mobile.png`. Pass when upload works.
- [ ] Lane 9. Corrupt pdf handling. Save `ingest-corrupt.png`. Pass when graceful error.
- [ ] Lane 10. End to end ingest on prod with fictional doc only. Save `ingest-prod.png`. Pass when citations visible.

**Verify, perf.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] Metric. Ingest CPU time for ten page pdf fixture in unit test.
- [ ] Probe. Run ingest benchmark test three times.
- [ ] Baseline. N/A trunk feature.
- [ ] Rule. Under 30 seconds for ten page fixture on CI class.

**Review gate.** None. PR-05 is not review-gated.

**Merge.**

- [ ] Root clean verdict at exact head SHA.
- [ ] Bugbot triage done.
- [ ] Rebased onto current trunk after verdict, patch-id unchanged.
- [ ] Operator squash-merges PR-05.

## Ship the HR review editor and publish gate (PR-06)

**Depends on.** PR-05.

**Files.**

- [ ] Create `apps/web/app/review/**` editor UI.
- [ ] Enforce publish only after explicit HR confirm with no auto-publish.

**Build.**

- [ ] Inline edit quests, dialogues, reorder, delete, then publish slug.

**You see.**

- [ ] Unreviewed pack cannot publish. Reviewed pack yields `/play/[slug]`.

**Verify, unit.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] Test publish gate rejects draft. Run review unit tests.

**Verify, live.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked. Ten lanes on `grok-4.6-fast-xhigh` at the PR head, per the boot recipe.

- [ ] Lane 1. Regression ingest path. Save `review-regression.png`. Pass when ingest ok.
- [ ] Lane 2. Open review screen for draft job. Save `review-open.png`. Pass when quests listed.
- [ ] Lane 3. Edit quest title and save draft. Save `review-edit.png`. Pass when persisted.
- [ ] Lane 4. Attempt publish without confirm. Save `review-block.png`. Pass when blocked.
- [ ] Lane 5. Confirm publish. Save `review-publish.png`. Pass when slug live.
- [ ] Lane 6. Play published slug mission 1. Save `review-play.png`. Pass when playable.
- [ ] Lane 7. Demo unaffected. Save `review-demo.png`. Pass when demo ok.
- [ ] Lane 8. Mobile review list. Save `review-mobile.png`. Pass when usable.
- [ ] Lane 9. Delete quest and publish new version. Save `review-version.png`. Pass when v2 live.
- [ ] Lane 10. Prod publish fictional company pack. Save `review-prod.png`. Pass when play link works.

**Verify, perf.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] Metric. Time to save draft edit roundtrip API.
- [ ] Probe. Three save operations measured via network panel or logs.
- [ ] Baseline. N/A.
- [ ] Rule. p95 save under 1.5 seconds on prod tier.

**Review gate.** None. PR-06 is not review-gated unless operator requests.

**Merge.**

- [ ] Root clean verdict at exact head SHA.
- [ ] Bugbot triage done.
- [ ] Rebased onto current trunk after verdict, patch-id unchanged.
- [ ] Operator squash-merges PR-06.

## Add industry presets and photo-derived visual theming (PR-07)

**Depends on.** PR-02 merged. May proceed in parallel with PR-05 after PR-02.

**Files.**

- [ ] Create `apps/web/lib/visual/**` preset registry and photo palette extractor.
- [ ] Map visual section of GamePack to Phaser theme loader.

**Build.**

- [ ] Six industry presets and photo path that sets palette, background layers, and layout template id.

**You see.**

- [ ] Same quest pack renders visibly different themes for two presets in preview.

**Verify, unit.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] Test palette extraction on fixed sample image bytes. Run visual unit tests.

**Verify, live.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked. Ten lanes on `grok-4.6-fast-xhigh` at the PR head, per the boot recipe.

- [ ] Lane 1. Regression demo Neulbom default theme. Save `visual-regression.png`. Pass when unchanged default demo.
- [ ] Lane 2. Select IT preset in Create. Save `visual-it.png`. Pass when theme applies in preview.
- [ ] Lane 3. Select manufacturing preset. Save `visual-mfg.png`. Pass when different palette.
- [ ] Lane 4. Upload stock office photo fictional. Save `visual-photo.png`. Pass when stylized background visible.
- [ ] Lane 5. Photo plus preset combined. Save `visual-combo.png`. Pass when preset base with photo palette overlay.
- [ ] Lane 6. Invalid image rejected. Save `visual-bad.png`. Pass when error message.
- [ ] Lane 7. Demo still completable. Save `visual-demo.png`. Pass when seven missions.
- [ ] Lane 8. Mobile preview theme. Save `visual-mobile.png`. Pass when backgrounds fit.
- [ ] Lane 9. Published slug retains theme. Save `visual-play.png`. Pass when `/play/slug` themed.
- [ ] Lane 10. Prod preset switch. Save `visual-prod.png`. Pass when lanes 2 through 4 on prod.

**Verify, perf.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] Metric. Additional load time for photo background assets on preview.
- [ ] Probe. Compare `/demo` load to themed preview load five interleaved runs.
- [ ] Baseline. Demo median from PR-02 measurement method.
- [ ] Rule. Themed preview median under demo median plus 1.5 seconds absolute budget.

**Review gate.** None. PR-07 is not review-gated.

**Merge.**

- [ ] Root clean verdict at exact head SHA.
- [ ] Bugbot triage done.
- [ ] Rebased onto current trunk after verdict, patch-id unchanged.
- [ ] Operator squash-merges PR-07.

## Polish ten missions, quizzes, audio, and ending report (PR-08)

**Depends on.** PR-06 and PR-07.

**Files.**

- [ ] Extend Neulbom and generator output to ten missions where applicable.
- [ ] Add quiz nodes, BGM, SFX, ending report export.

**Build.**

- [ ] Tutorial scene, adaptive hint rule, completion report page or modal.

**You see.**

- [ ] Demo ten missions complete with report showing checklist and quiz score.

**Verify, unit.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] Quiz scoring unit tests. Run game and report tests.

**Verify, live.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked. Ten lanes on `grok-4.6-fast-xhigh` at the PR head, per the boot recipe.

- [ ] Lane 1. Regression publish flow. Save `polish-regression.png`. Pass when publish still works.
- [ ] Lane 2. Tutorial completes. Save `polish-tutorial.png`. Pass when HUD explains controls.
- [ ] Lane 3. Ten mission demo complete. Save `polish-ten.png`. Pass when all ten done.
- [ ] Lane 4. Fail quiz once then pass. Save `polish-quiz.png`. Pass when report reflects score.
- [ ] Lane 5. Ending report download or share image. Save `polish-report.png`. Pass when artifact generated.
- [ ] Lane 6. Audio toggles if present. Save `polish-audio.png`. Pass when mute works.
- [ ] Lane 7. Hint triggers after three fails if implemented. Save `polish-hint.png`. Pass when hint appears.
- [ ] Lane 8. Mobile ten mission run abbreviated if timeboxed else first three missions. Save `polish-mobile.png`. Pass when no soft-lock.
- [ ] Lane 9. Custom published pack ten missions fictional. Save `polish-custom.png`. Pass when playable.
- [ ] Lane 10. Prod demo ten missions. Save `polish-prod.png`. Pass when ending report on prod.

**Verify, perf.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] Metric. Total JS bundle size for demo route compared to PR-02 head if measurable.
- [ ] Probe. Lighthouse or build output comparison documented in PR.
- [ ] Baseline. PR-02 bundle size recorded from build log.
- [ ] Rule. Bundle growth under 250 KB gzip absolute increase unless operator waives in chat.

**Review gate.** The operator reviews before merge.

- [ ] Copy lane 3 and lane 5 screenshots into `docs/media/PR-08-review-polish.png`.
- [ ] Record 30 to 60 second video of ten mission run ending report. Save as `docs/media/PR-08-review.mp4`.
- [ ] Post screenshots and video in chat. Stop at merge-ready. Wait for operator click.

**Merge.**

- [ ] Root clean verdict at exact head SHA.
- [ ] Bugbot triage done.
- [ ] Rebased onto current trunk after verdict, patch-id unchanged.
- [ ] Operator squash-merges PR-08 before Demo Day 2026-10-17.

## Optional Three.js POC scene from GamePack POIs (PR-09)

**Depends on.** PR-08.

**Files.**

- [ ] Create `apps/web/game-3d/**` single office scene loader.
- [ ] Map GamePack POI list to interact hotspots.

**Build.**

- [ ] Add optional `/demo-3d` route sharing quest state read-only or parallel stub.

**You see.**

- [ ] User walks one room and triggers one POI interaction tied to a quest id.

**Verify, unit.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] POI mapping unit test from fixture. Run game-3d tests if present else skip documented.

**Verify, live.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked. Ten lanes on `grok-4.6-fast-xhigh` at the PR head, per the boot recipe.

- [ ] Lane 1. Regression `/demo` ten missions still pass. Save `3d-regression.png`. Pass when 2D demo ok.
- [ ] Lane 2. Open `/demo-3d`. Save `3d-load.png`. Pass when WebGL canvas renders.
- [ ] Lane 3. Move character to POI. Save `3d-poi.png`. Pass when prompt opens.
- [ ] Lane 4. Complete one 3D interaction. Save `3d-interact.png`. Pass when quest flag sets if wired.
- [ ] Lane 5. Low WebGL fallback message on unsupported browser emulated if possible else skip recorded. Save `3d-fallback.png`. Pass when graceful message or skip recorded.
- [ ] Lane 6. Mobile 3d degraded mode. Save `3d-mobile.png`. Pass when does not crash.
- [ ] Lane 7. Reload 3d scene. Save `3d-reload.png`. Pass when stable.
- [ ] Lane 8. Navigate back to 2d demo. Save `3d-switch.png`. Pass when state sane.
- [ ] Lane 9. Prod `/demo-3d` load. Save `3d-prod.png`. Pass when renders on prod.
- [ ] Lane 10. Performance acceptable no tab freeze ten seconds. Save `3d-perf-feel.png`. Pass when operator scripted walk completes.

**Verify, perf.** Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.

- [ ] Metric. WebGL frame time average over ten second walk if instrumented else time to POI interaction.
- [ ] Probe. Browser performance recording or logged rAF samples three runs.
- [ ] Baseline. N/A feature.
- [ ] Rule. Average frame time under 33ms on reference GPU class documented or interaction under 8 seconds walk time.

**Review gate.** None. PR-09 is not review-gated.

**Merge.**

- [ ] Root clean verdict at exact head SHA.
- [ ] Bugbot triage done.
- [ ] Rebased onto current trunk after verdict, patch-id unchanged.
- [ ] Operator squash-merges PR-09 if Demo Day narrative needs 3D else skip with operator waiver recorded in decisions.tsv.

## Close the program

- [ ] Every box above is checked with its evidence.
- [ ] Reply to the operator with Orchestrate closing report, Wanted submit confirmation for PR-03, Demo Day checklist for PR-08 and optional PR-09, and decisions.tsv summary.

## Appendix A. Prototype evidence

Phaser top-down eight-direction versus four-direction movement. Not run before this plan. Schedule throwaway under `scratch/movement-prototype/` in PR-02 step zero. Pass predicate is operator prefers feel on lane video.

Create flow layout density for interview steps. Not run. Schedule Prototype playbook comparing two wizard layouts in PR-03 before UI lock. Pass predicate is faster completion on lane timed Create run.

LLM single-shot versus two-pass GamePack generation quality. Not run. Schedule arena in PR-04 before pipeline lock. Pass predicate is fewer Zod rejections on ten fictional docs fixture.

## Appendix B. Alternatives rejected

Full photogrammetry office map from photos. Rejected for one month budget. Photo informs palette and background only per product plan.

Real-time multiplayer onboarding. Rejected for Wanted submit scope and verification cost.

Native mobile app store submit for championship. Rejected per Wanted web URL requirement.

## Appendix C. Risks

LLM hallucination in quests lands in PR-05 and PR-06. Owner watches sourceRefs coverage and blocks publish without HR confirm.

Vercel link down during judging lands in PR-03. Owner watches uptime and env vars from 2026-09-21 through 2026-10-17.

API cost overrun lands in PR-04. Owner watches rate limits and canned fallback for public demo paths.

Contest PII in uploads lands in PR-05. Owner watches client warnings and reject logs.

## Appendix D. Links and reading list

For GamePack FSM read `pstack/skills/how/SKILL.md` on PR-01 and PR-02.

Run `pstack/skills/interrogate/SKILL.md` before merge of PR-05 and PR-06 for hallucination and secret leakage.

Decision trail per `pstack/skills/show-me-your-work/SKILL.md` in orchestrate store `decisions.tsv` for every overnight and Orchestrate tick.

Product context in workspace plan file Plan-54216246.plan.md and Wanted AI Championship 2026 rules captured in gongmojeon context rules when created.

Gongmojeon contest folder `gongmojeon-harness/contests/wanted-ai-championship-2026/` when created for JUDGING and TOPIC-BRIEF.
