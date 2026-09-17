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
