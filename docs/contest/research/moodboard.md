# Contest research — visual moodboard

Visual and UX patterns distilled from onboarding games and 2D RPG dialogue/quest references (Sep 2026).

---

## B1 Visual patterns

- **HUD — role & progression strip:** IT Onboarding Simulator–style top bar (current title/role + XP or chapter index) keeps onboarding goals legible without pausing; pair with a small objective reminder (“Talk to HR / Fix ticket #3”) so generated GamePacks always show *where* the hire is in the arc.
- **HUD — lightweight status, not RPG clutter:** OFFICE-style dual meters (mood/stress or “confidence / overload”) optional for Neulbom demo; default to **one** primary progress channel (quest step counter or % chapters) so HR-facing builds stay readable on mobile landscape.
- **Dialogue — bottom WRPG panel for choices:** Stardew/FF-style fixed bottom box with speaker name plate + optional portrait for branching HR/policy lines; reserve **overhead bubbles** for ambient coworker barks so main quest dialogue stays high-contrast and accessible (per common 2D RPG UX guidance).
- **Dialogue — typewriter + continue affordance:** Nine-slice frame, paging for long policy text, bouncing arrow or “▼” continue glyph; support skip-to-end on second tap for repeat playthroughs (training context).
- **Quest log — tracker + journal split:** Pin **one active quest** on-screen (title + 2–3 checkbox objectives); full log uses active/completed tabs, strikethrough on done steps, and group headings by department (“Engineering”, “People Ops”) matching Hemofarm/Dior chapter structure—avoid modal-heavy quest UI during movement.

---

## B2 Wizard & progress UI

Patterns from AI app builders, HR journey tools, and document-to-course wizards (Sep 2026). Apply to **First Quest HR console** (create GamePack) rather than in-game Phaser HUD unless noted.

- **Horizontal stepper (3–5 steps max):** Edwiser-style **Select input → Create & preview → Publish** with numbered steps and current step emphasized; avoid nested sub-wizards—ROSI/Learnster keep “refine” inside one step via side panel chat.
- **Step states:** Wizard UX Pattern—show **complete / current / locked / error** on step labels; lock “Publish” until preview smoke test passes (Replit “confirm in Preview” checklist).
- **Progress within long AI jobs:** Newly/Bolt-style **phase labels** (“Analyzing doc → Structuring quests → Building preview”) with indeterminate then determinate bar; allow cancel that preserves partial draft (ROSI Save Draft).
- **Split layout — config left, preview right:** Lovable/v0/Anything: **chat or form on left, live preview iframe on right**; for First Quest, left = upload + tone sliders, right = **mini Phaser preview** or static map thumbnail updating on outline commit.
- **Blueprint / outline panel before codegen:** Gamma card list, Mentor blueprint, Learnster outline tree—use **collapsible quest nodes** (department → quest → dialogue stub) with drag reorder; primary CTA **“Generate playable preview”** not “Publish.”
- **Draft vs live badge:** Lovable mental model—persistent **“Draft”** pill on preview chrome; published URL shows **“Live v3”** version chip; color: amber draft, green live (avoid red for non-error states).
- **Publish entry — header primary:** ROSI **purple Publish** in header; Lovable **Publish** top-right; cluster secondary actions (Save draft, Share preview link) as outline buttons—never two equally weighted primaries.
- **Guided publish sheet (single scroll or stepped modal):** Lovable changelog **guided flow**: URL/slug → who can access → title/description → security review → confirm; show **search/social preview card** mock on final step.
- **Publish outcome screen:** Canva post-publish pattern—success illustration + **primary “Open live game”** + secondary “Copy link”; include QR for mobile play test in contest demo.
- **Conversational refine strip:** ROSI/Softr—fixed bottom or right **“Ask to change…”** input attached to current draft; show typing indicator on AI; edits highlight diff on outline panel (subtle yellow flash on changed quest nodes).
- **Document upload dropzone as step 1 hero:** Learnster/ROSI/Mentor—large dropzone for **PDF/XLSX** with “or describe in text” below; file chip row with remove + re-parse action.
- **Persona preview toggle:** Workday **Preview as** dropdown (new hire / manager / HR admin)—small toolbar above preview iframe to swap GamePack viewpoint without re-running AI.
- **Mobile preview toggle in toolbar:** Jotform/Lovable device icons above preview; default landscape for Phaser demo, portrait optional for HR review on phone.
- **Error / validation inline on steps:** Workday **Check for errors** before preview—inline list under stepper (“Missing spawn point”, “Quest 2 has no verify step”); block Publish until cleared.
- **Accessibility:** Stepper steps as `<nav aria-label="Create game">` with `aria-current="step"`; publish dialog traps focus; progress phases exposed to screen readers as `role="status"`.

---

## B3 Hook & landing

Visual system for the **contest URL** (`/`) and Demo Day tape. Distilled from Wanted / LiquidMetal championship pages, Devpost 3-min screencasts, Wingspan-style in-hero demos, GreenBorrow “Try it out,” and gallery/QR vote UIs (Sep 2026). Cite this section on any later landing polish PR.

- **Championship hero, not a SaaS splash:** TreeHacks / LiquidMetal / Wanted pattern — one mission line (“PDF 온보딩을 첫날 RPG로”), date or prize chip, **one filled CTA**. Avoid generic “AI platform” wordmarks and gradient meshes that do not show the office tile world.
- **Primary CTA = Play (guest):** GreenBorrow **Demo Login** energy. Label like **Neulbom 데모 플레이** as the only solid button. Create is outline/ghost. Vote/share is a slim secondary strip, never a third equal pill.
- **In-hero product motion:** Wingspan autofill mock + Navattic/shadcn split-with-video. Right (or below on mobile): looped Phaser slice, muted autoplay GIF of walk + E-interact + quest HUD, or a framed “Watch 3-min” poster. Static screenshot grids lose Wanted voters in the gallery thumbnail.
- **Hook copy in one breath:** TellMe “Click. Listen. Understand.” / Doable.AI metaphor-first. Korean one-liner on the first screen; stack and AI tools live below the fold (Wanted form already collects them).
- **With / without proof row:** Wingspan inbox comparison. Two tiles: “슬라이드 온보딩” (forgotten PDF) vs “First Quest Day 0” (quest complete). High contrast, no more than one stat callout.
- **Vote hook strip:** HackHQ gallery + ScoreJudge QR. Persistent compact bar: **링크 복사** · **QR** · one-sentence share text. Design the Open Graph / card image as an office-RPG still with the Play CTA visible — that is what voters see in Wanted feeds.
- **Guest / fictional-employer badge:** Small chip near the hero (“Neulbom Labs · 가상 회사 · 로그인 불필요”). Signals safety for public vote traffic and matches submit-doc constraints.
- **3-min tape chrome:** Devpost Help screencast look — full-bleed product UI, burnt-in captions optional, no slide title cards after 0:20. Poster frame = the same hero still as `/`. “Watch demo” is text or play-icon on the product frame, not a second primary button.
- **Demo Day slide = the live URL:** ScoreJudge “QR on the big screen.” If a slide exists at all, it is the hero + QR + `first-quest-iota.vercel.app` — MLH/Reskilll: do not open VS Code or a terminal on stage.
- **Gallery-card thumbnail:** HackHQ project card. 16:9 crop of the office map + HUD, title “First Quest”, subtitle the one-liner. Test at 320px wide; championship landings fail when the CTA vanishes in the card.
- **Uptime / working-URL honesty:** A quiet “서비스 상태” or last-deploy note is optional; the visual requirement is that `/`, `/demo`, `/create` never show a framework error page during 9/21–10/17 (Wanted exclusion risk).
- **CTA hierarchy reminder:** Play (filled) → vote/share (icon row) → Create (outline). Three equally bright buttons is the anti-pattern from SaaS CRO notes and from First Quest’s current Sprint 0 two-link nav if both are styled the same.
- **Accessibility:** Hero CTA is a real `<a href="/demo">`; QR has a text alternative (copy URL); autoplay motion respects `prefers-reduced-motion` (swap to a still + Play). Mâm Cơm reminder: keyboard path into the demo.
