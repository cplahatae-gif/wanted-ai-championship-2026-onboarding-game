# Contest research — design best practices

Sources: public case studies, itch.io releases, L&D vendor pages (Sep 2026 desk research). Scoped to **2D exploration**, **dialogue**, **quests/missions**, and **corporate onboarding / serious games** relevant to **First Quest** (HR-driven GamePack → playable 2D RPG).

---

## B1 Onboarding & serious games

### Candidate inventory (17)

| name | URL | screenshot note | one-line why for First Quest |
| --- | --- | --- | --- |
| **Induction** ★ | https://diegoaz.itch.io/induction | itch capsule: retro top-down office tiles; page shows dialogue-first “first day” pitch | Closest **Godot** reference for modular corporate dialogue + workplace exploration—direct template for generated onboarding episodes. |
| **IT Onboarding Simulator** ★ | https://fakimasafaki.itch.io/it-onboarding-simulator-2026 | Pixel-art office screenshots; HUD callouts for role/XP on store page | **Quest + XP HUD + E-to-interact** loop mirrors First Quest demo mechanics (intern tasks, promotion arc). |
| **Hemofarm onboarding game** ★ | https://www.codeit.rs/projects/hemofarm/ | Case-study UI: department map, avatar hosts, timed quiz modal | Proven **department-by-department quest chain** with guide NPC and scored checks—maps cleanly to GamePack “zones + verify” structure. |
| **Dior Immersive Onboarding** ★ | https://www.emraude.com/case-study/dior-onboarding | Case study stills: 2D illustrated chapters + 3D quiz finale | Gold-standard **chapter unlock + recap quiz** at global scale (19 langs)—validates multi-chapter onboarding without combat. |
| **Nykredit “THINK NEW”** ★ | https://www.seriousgames.net/en/portfolio/management-training-for-recruitment/ | Portfolio stills: narrative frames + mini-game montage | **Optional pre-boarding narrative + mini-games** with high completion—shows story wrapper beats slide decks for finance/enterprise tone. |
| JetQuest | https://jetsoftpro.com/success-stories/jetquest-transforming-onboarding-through-gamification-and-ai-integration/ | Success-story art: isometric/virtual office mission map | Sequential **office missions** in a virtual workspace—useful for “walk the floor” quest design and ambient mood hooks. |
| Versuni onboarding game | https://gamestudio.frisseblikken.com/en/case/international-onboarding-with-an-online-game/ | Agency case: branded online game + companion booklet | **Scalable web onboarding game + persistent booklet**—pairing play with reference material matches HR doc + play dual deliverable. |
| Softtek × Seppo | https://seppo.io/customer-stories/how-softtek-went-from-static-corporate-induction-to-an-engaging-experience/ | Seppo UI: mission board, mobile cards, progress meter | Mission-based induction cut **3h → 35m**—evidence that short quest chains beat long PDF/webinar onboarding. |
| Seppo onboarding platform | https://seppo.io/solutions/gamified-onboarding/ | Product shots: template board, GPS/360 optional layers | Authoring **mission templates** and progress analytics—pattern for HR-authored quest lists without building a full engine. |
| Teach on Mars onboarding | https://www.teachonmars.com/en/use-cases/revolutionise-your-onboarding/ | Marketing visuals: phased module unlock timeline | **Time-gated module unlock** and blended sync moments—fits “week 1 / month 1” onboarding pacing in generated packs. |
| STADA Connect4Values | https://www.greenhatgames.com/blog/stada-connect4values-making-culture-and-values-fun-and-engaging/ | Dashboard: global leaderboard + team mission cards | **Values dilemmas + team leaderboard**—quest design for culture/policy beats when combat is absent. |
| Office Odyssey | https://blueedgewater.com/office-odyssey-game/ | Portfolio: branching choice UI, relationship meters | **Consequence-first branching dialogue** (no early “wrong” labels)—strong pattern for compliance/DEI-style onboarding choices. |
| Scenario Studio / Northern Light | https://bojansavic.com/work/scenario-studio/ · https://svartdraak.itch.io/northern-light | Studio editor + play: portrait dialogue, explorable room hotspots | **Data-driven `.tres` scenarios + SCORM**—closest analog to “generate structured narrative content, ship playable build.” |
| Alpha (security awareness) | https://jagaco.com/games/alpha/ | Product: top-down office sim, dynamic incident pop-ups | **Living workplace with quest-like incidents**—reference for optional “policy event” side quests in office maps. |
| HackProof Office | https://stefanocardella.itch.io/hackproof-office | itch screenshots: 3D office walk, smartphone UI overlay | **Explore + inspect + dialogue** security training—interaction affordances (E interact, phone journal) portable to 2D. |
| Officebound | https://lighthazard.itch.io/officebound | Isometric startup office demo shots | **Department reputation + choice consequences** across office jobs—quest graph inspiration for cross-team onboarding stories. |
| OFFICE (OX125X) | https://office-6f832.web.app/ | Landing: zone map (Workspace, Lounge, Meeting, Cafeteria) + dual mood/stress bars | **Zone-based skill quests + resource HUD**—useful if First Quest adds soft-skill vs policy quest categories. |

★ = **Top 5** selected for First Quest (see summary below).

### Top 5 rationale (short)

1. **Induction** — Same stack genre (Godot, dialogue module, workplace RPG); lowest friction to copy interaction patterns.
2. **IT Onboarding Simulator** — Validates intern-first-day quest loop, pixel office aesthetic, and explicit quest/XP HUD for HR-visible progress.
3. **Hemofarm** — Enterprise proof for multi-department tours, host NPCs, and timed knowledge checks tied to org structure.
4. **Dior** — Proof that **2D chapter exploration + finale assessment** scales to hundreds of thousands of hires globally.
5. **Nykredit THINK NEW** — Narrative + mini-game preboarding with voluntary but near-universal completion; good model for “play before day one.”

### Patterns to steal (non-visual)

- **Quest structure:** hub department → host dialogue → objective → verify (quiz/interaction) → unlock next zone (Hemofarm, Dior, IT Simulator).
- **Dialogue:** modular trees with real job vocabulary; avoid quiz-before-context (Office Odyssey).
- **Progress signaling:** role/XP or chapter checklist always visible (IT Simulator, Teach on Mars phased unlock).
- **Dual artifact:** playable game + searchable HR booklet (Versuni).
- **LMS readiness:** SCORM/export path for IT/L&D buyers (Northern Light / Scenario Studio).

---

## B2 AI wizard & publish UX

Sources: product docs, help centers, and UX pattern literature (Sep 2026). Scoped to **wizard → preview → publish** flows in **AI-generated content/apps**, **HR / onboarding tech**, and **document-to-app** pipelines relevant to **First Quest** (HR describes or uploads material → generated GamePack → playable preview → publish/share).

### Candidate inventory (20)

| name | URL | flow snapshot | one-line why for First Quest |
| --- | --- | --- | --- |
| **ROSI Journey Builder (Rival)** ★ | https://workflow-help.rival-hr.com/topics/ROSIJourneyBuilder.htm · https://www.rival-hr.com/resources/blog/introducing-rosi-journey-builder-from-rival | NL + spreadsheet → ROSI drafts journey → chat refine → **Save Draft** / **Publish** / **Publish & Launch** | Closest **HR-native** co-pilot: AI never ships without explicit publish; draft vs live is first-class—mirror for GamePack drafts. |
| **Learnster Content Creation Wizard** ★ | https://helpcenter.learnster.com/en/articles/317005-content-creation-wizard | Guided type → AI outline → edit structure → generate pages → **transfer to LMS** for polish | **PDF/doc → structured experience** with human review gates before generation completes—same trust model as doc → GamePack. |
| **OutSystems Mentor (ODC Portal)** ★ | https://success.outsystems.com/documentation/outsystems_developer_cloud/agentic_development/ai_app_generation_in_mentor_web/create_an_app_with_ai_in_odc_portal/ | Prompt + optional requirements file → **blueprint review** → Generate → editor refine → **Preview** / stage publish | Named **Employee Onboarding** walkthrough: blueprint iteration before codegen maps to “preview GamePack JSON before Phaser build.” |
| **Lovable Publish** ★ | https://docs.lovable.dev/features/publish · https://docs.lovable.dev/features/projects/preview | Live **preview** (staging) vs **published snapshot**; guided publish dialog (URL, access, SEO, security scan) | Industry-leading separation of **work-in-progress preview** and **explicit ship**—direct pattern for demo vs production GamePack URLs. |
| **Edwiser AI Course Creator** ★ | https://edwiser.org/documentation/edwiser-ai-course-creator/course-creator/ | Horizontal steps: **Select AI Mode → Create & Preview → Publish to LMS**; auto-draft throughout | Clean **step indicator + preview gate before LMS publish**—minimal template for HR wizard chrome. |
| v0 Deployments | https://v0.app/docs/deployments · https://api2.v0.dev/docs/deployments | Chat build → preview branch → **Publish** wizard (project, visibility, domain, commerce) → production URL | Strong **preview deployment vs production promote**; branch/PR menu before publish fits “review build then go live.” |
| Replit Agent + Publishing | https://docs.replit.com/build/your-first-app · https://docs.replit.com/features/publishing/overview | Plan mode → build → **Preview** test checklist → inline **Publish** card or Publishing pane | **Plan approval before build** + preview test script before publish—good for multi-step GamePack generation. |
| Bolt.new HR use case | https://bolt.new/use-cases/custom-hr-management-system | Prompt → real-time gen → instant preview → deploy URL | Fast **prompt-to-live** loop for HR portals; less wizard structure but strong “see it before URL” expectation. |
| Jotform AI App Builder | https://www.jotform.com/ai/app-generator/ | Chat spec → build → **preview web/mobile** → share | Explicit **HR onboarding app** positioning; preview on multiple form factors before share. |
| Softr AI HR software | https://www.softr.io/create/ai-hr-software | Describe → AI generates portal/DB/workflows → visual iterate → **ship same day** | **Co-build + permissions** emphasis—HR keeps control of roles while AI scaffolds. |
| Microsoft AI Builder (document processing) | https://learn.microsoft.com/en-us/ai-builder/create-form-processing-model | Multi-step wizard: doc type → fields → upload/tag → train → **Quick test** → **Publish** to Power Apps | Canonical **document-in → model-out → test → publish**; step gating and “review before publish” for extracted HR forms. |
| Gamma presentations / sites | https://gamma.app/products/presentations · https://gamma.app/explore/content/guides/how-to-generate-an-ai-website-using-gamma | Prompt/doc → **editable card outline** → generate → edit → share link / **Publish to Site** | **Outline approval before generation** + one-way publish to public site—good for marketing/onboarding collateral beside the game. |
| Canva Magic Design + Content Publisher | https://www.canva.com/help/using-magic-design/ · https://www.canva.dev/docs/apps/design-guidelines/content-publisher/ | Prompt/media → template grid → preview/customize → share; apps: **settings → preview → publish → post-publish URL** | Platform pattern for **configure → preview destination → confirm publish** with success deep-link. |
| Anything App | https://docs.anythingapp.ai/quickstart | Describe app → **preview pane** test flows → **Review & publish** (visibility) | Short checklist before publish (workflow, empty states, responsive)—portable QA gate for generated onboarding mini-apps. |
| Notion Sites | https://www.notion.com/help/public-pages-and-web-publishing | Doc/page (+ AI assist) → **Share → Publish** → Site Builder (SEO, domain) | **Document-to-live-site** with publish panel—not a game, but HR handbook + game dual deliverable pairing. |
| Workday Journeys Workspace | https://doc.workday.com/admin-guide/en-us/manage-workday/user-experience/people-experience/journeys/steps--create-a-journey-in-the-journeys-workspace.html | Template/blank → drag-drop steps → **Check errors → Preview as persona → Distribute** | Enterprise **validate → preview as role → distribute**—no AI wizard, but gold HR journey admin UX. |
| Mini Course Generator (AI Course Creator) | https://www.aiwizard.ai/ai-course-creator | Topic/doc → **outline review/edit** → per-page AI blocks → publish/gate/SCORM | Same **outline-first** discipline as GamePack quest graph authoring. |
| Newly.app | https://docs.newly.app/quickstart | Prompt → build progress → live preview → chat refine → **Deploy App** menu | Mobile-first **watch build → preview → deploy** with visible build phases. |
| Wizard UX Pattern (reference) | https://uxpatternsguide.com/patterns/wizard/ | Step state, prerequisites, **Generate preview / Run test**, review before Finish | Cross-product checklist: gate Finish on preview/test, preserve draft on Back, safe Cancel. |
| Moltiversity creator publish | https://moltiversity.org/help/creators | Edit with **live preview**; draft vs published lesson; **Submit for Review** before public | **Draft/published split + admin review** before learners see content—optional gate if Wanted demo needs “HR approves GamePack.” |

★ = **Top 5** (see summary below).

### Top 5 rationale (short)

1. **ROSI Journey Builder** — Only audited flow where AI drafts HR journeys from **language + spreadsheet**, conversational refinement, and **mandatory explicit Publish** (with Publish-only vs Publish & Launch). Best semantic match to “HR uploads doc → AI proposes onboarding journey → human ships.”
2. **Learnster Content Creation Wizard** — End-to-end **document-to-learning-app** with guided steps, editable outline before bulk generation, and handoff to authoring/LMS—closest analog to PDF/policy doc → GamePack → tweak in editor.
3. **OutSystems Mentor (Employee Onboarding)** — Documented **requirements upload + blueprint loop** before app generation and **Preview** on sample data; mirrors technical “schema/GamePack preview before runtime.”
4. **Lovable** — Clearest **preview ≠ published** mental model, guided publish (URL, access, security), and changelog-evidenced **multi-step publish UI**—sets user expectation that AI edits are private until Publish.
5. **Edwiser Course Creator** — Minimal, legible **three-step wizard** (mode → create & preview → publish) with persistent draft—easy to copy for First Quest HR console stepper without overbuilding.

### UX principles (wizard → preview → publish)

| Principle | Evidence | First Quest implication |
| --- | --- | --- |
| **Explicit ship action** | ROSI: AI never publishes without click; Lovable: snapshot only updates on Publish | “Generate GamePack” ≠ “Go live”; separate **Preview play** and **Publish** (or export JSON) buttons. |
| **Outline / blueprint before heavy gen** | Gamma card outline; Mentor blueprint; Learnster outline; Mini Course outline edit | Show **quest graph + zones** for HR edit before Phaser build or long AI runs. |
| **Preview as staging environment** | Lovable preview docs; v0 preview deployments; Replit Preview vs published URL | `/create` preview route or embedded Phaser with **draft** GamePack; published URL uses immutable pack version. |
| **Step-specific actions, not generic Next** | Wizard UX Pattern: Run test / Generate preview unlocks Review | Steps like **Upload → Configure tone → Review outline → Preview game → Publish** with disabled Continue until validation passes. |
| **Document-in pipelines** | AI Builder upload/tag; Learnster PDF; ROSI spreadsheet; Mentor requirements file | Support **HR file upload** (handbook, checklist) as first-class input beside free-text prompt. |
| **Review checklist before publish** | Anything quickstart; Moltiversity creator checklist; Replit preview test list | Pre-publish modal: fictional employer only, quest count, PII scan, playable smoke test link. |
| **Draft persistence & version history** | Edwiser auto-draft; Lovable version history; ROSI Save Draft | Auto-save GamePack drafts; warn on navigate-away (ROSI pattern). |
| **Post-publish deep link** | Canva Content Publisher post-publish URL; Bolt/Lovable live link confirmation | Success state: copy **play URL**, QR, and optional SCORM/export—not just “done.” |
| **Role / persona preview** | Workday Preview as user type | “Preview as new hire / manager” if GamePack has role-specific dialogue flags. |
| **Security / compliance scan at publish** | Lovable security scan in publish dialog; Replit Security Agent | Lightweight lint on generated JSON (forbidden real company names, external URLs) before publish. |

### Anti-patterns to avoid

- **Single-button “AI magic”** with no intermediate review (contrast: ROSI, Learnster, Gamma outline).
- **Live site updates on every AI edit** without draft boundary (contrast: Lovable, Moltiversity draft/published).
- **Unbounded wizard steps** without progress indicator (contrast: Edwiser horizontal stepper).
- **Publish without preview on real device** (contrast: Jotform mobile preview, Replit resize Preview).
- **HR journey tools that skip validation** (contrast: Workday Check for Errors before Preview/Distribute).

### Patterns to steal (non-visual)

- **Two-phase commit:** draft GamePack → preview session → publish version id (ROSI Save Draft / Publish; Lovable snapshot).
- **Conversational refine on same artifact:** ROSI chat after initial gen; Softr “iterate with AI or visually.”
- **Transfer handoff:** Learnster “transfer to LMS for manual refinement” → export GamePack JSON for engineer/authoring tool.
- **Publish variants:** ROSI “Publish only” vs “Publish & Launch” → “Save pack” vs “Publish playable link.”
- **First-run publish wizard:** v0/Lovable collect URL, visibility, metadata once, then “Publish changes” for updates.

---

## B3 Contest & demo patterns

Sources: official contest pages, Devpost/MLH organizer docs, winning “Try it out” submissions, and championship event landings (Sep 2026 desk research). Scoped to **working public URL**, **≤3-minute demo**, **public-vote hooks**, and **championship / award landing pages** relevant to **Wanted AI Championship 2026** (예선 80% judge + 20% vote; 인기상 100% vote among TOP20; Demo Day 10/17; dead service link can be excluded).

### Candidate inventory (18)

| name | URL | pattern | one-line why for First Quest |
| --- | --- | --- | --- |
| **Wanted AI Championship 2026** ★ | https://event.wanted.co.kr/ai-championship/2026 · rules recap https://www.venturesquare.net/1109725/ · listing https://www.univ20.com/ContestCalendar/Detail/1922 | Contest SSOT: deploy a **working service link**; prelims 9/21–10/5; TOP20 10/7; Demo Day 10/17; 인기상 = TOP20 max votes | Hard gate for this repo: URL must stay up through voting + Demo Day; 20% of prelim score and 100% of Popularity Award are votes. |
| **Devpost 3-min demo playbook** ★ | https://info.devpost.com/blog/6-tips-for-making-a-hackathon-demo-video · https://help.devpost.com/article/84-video-making-best-practices · https://info.devpost.com/blog/how-to-present-a-successful-hackathon-demo | Elevator in first seconds; **screencast of the app**, not a deck; public YouTube; script the 3 minutes; skip login flows | Canonical judge-facing tape for 10/17: problem → working play → impact. Backup recording if live Phaser dies. |
| **The AI Champion Ship (LiquidMetal)** ★ | https://liquidmetal.devpost.com/ | Championship event page: **Live Deployed App** + public **≤3 min** video + Audience Favourite vote track; “Vibe. Code. Ship.” | Closest peer contest: working URL is a required artifact; vote is a named prize; submission quality (description + video) is an explicit criterion. |
| **Wingspan / Finch landing** ★ | https://devpost.com/software/wingspan | Product landing *is* the hack: animated hero + **in-hero autofill mock** so value lands without a video | Steal for `/`: one interactive loop (new hire walks / quest HUD) instead of a wall of screenshots. |
| **GreenBorrow (Try it out + Demo Login)** ★ | https://devpost.com/software/greenborrow · live https://green-borrow.vercel.app | Devpost “Try it out” block: live Vercel URL + **Demo Login** that skips auth | Pattern for Wanted voters: one click from listing → playable `/demo` with no account. |
| Reskilll 3-minute pitch clock | https://reskilll.com/blogs/hackathon-demo-presentation-tips-pitch-3-minutes-win-2026/ | Timed script: 0:20 hook → 0:40 solution → **0:40–2:30 live demo** → 20s tech/impact → 10s close; backup video on crash | Concrete Demo Day rundown that maps onto the existing 30s Korean script (expand, do not replace). |
| MLH standard rules + judging plan | https://github.com/MLH/mlh-policies/blob/main/standard-hackathon-rules.md · https://guide.mlh.io/general-information/judging-and-submissions/judging-plan | Public ≤2 min demo video; **show the hack, not a pitch**; video must stay public or prizes can be revoked | Reinforces Wanted’s “작동하는 서비스” rule: judges score what they can operate, not slides. |
| TellMe (Champion Ship submit) | https://devpost.com/software/tellme-defpqh · live https://tell-me-raindrop.vercel.app | Championship entry: live URL first, one-sentence hook (“Click. Listen. Understand.”), track badges | Proof that a Champion Ship page + one public URL is enough for judges to start; copy the “one verb” hook. |
| Conceptry | https://devpost.com/software/conceptry-ia7vft · live https://conceptry.vercel.app/ | Hero screenshot + YouTube + GitHub + **Site Link** in one Demo block | Submission surface First Quest should match: landing + `/demo` + short video + stack list. |
| TripMates (HackUPC 2025 1st) | https://github.com/adriablancafort/tripmates-hackupc2025 · live https://tripmates-hackupc2025.vercel.app | Winner homepage field = **live Vercel**, demo video linked from README | Winning teams treat the public URL as the trophy case, not an afterthought. |
| TreeHacks championship landing | https://treehacks.com/ · live ops https://live.treehacks.com/ | Event hero: date, one-line mission, track wheel, FAQ, **Devpost →** on the live site | Visual language for “championship,” not a generic SaaS splash—useful for `/` prize/track chrome during voting. |
| PennApps XXIV | https://2024f.pennapps.com/ | Apply-now hero + FAQ clusters + track/prize deep links | Secondary championship-landing reference: one primary CTA, logistics below the fold. |
| HackHQ audience voting / gallery | https://hackhq.io/docs/participant-voting · https://hackhq.io/docs/events/project-gallery · https://hackhq.io/judging/top-picks | Shareable vote link, **no account**, gallery cards with demo + GitHub, QR on event links | How voters actually browse: card → embedded demo. First Quest landing must look good as a thumbnail + deep link. |
| ScoreJudge audience vote | https://scorejudge.com/docs/audience-voting/ · https://scorejudge.com/audience-voting/ | One shared URL + **QR on the big screen**; phone browser, no app | Demo Day and social-share pattern: QR on `/` and on slides so Wanted users vote in <10s. |
| Since AI 2026 rules | https://sinceai2026.devpost.com/rules | Working prototype + public vote as **qualifier** (top 5 votes → finals); inaccessible = exclude | Confirms the Wanted-style rule: dead URL is a disqualifier, not a style issue. |
| DEV Comfort Food — Perfect Landing (Mâm Cơm) | https://dev.to/devteam/congrats-to-the-frontend-challenge-comfort-food-edition-winners-1l8 | Award for an **interactive landing** (spin the tray; keyboard + ARIA), not a brochure | Landing can *be* the demo. First Quest `/` should invite play, not only describe it. |
| Doable.AI | https://devpost.com/software/doable-ai | Gamified productivity winner; product metaphor in the first line | Hook copy pattern: name the feeling (“onboarding as a game”) before the stack. |
| Navattic / SaaS video-hero pattern | https://www.navattic.com/blog/interactive-demos · video-hero survey https://saaslandingpage.com/articles/25-brilliant-video-landing-page-examples-to-spark-your-inspiration/ · split-video block https://www.shadcn-ui-blocks.com/blocks/marketing/hero-sections/split-with-video | Hero = outcome headline + **Watch demo / Try** pair; interactive tour in-fold; demos ≤90s for cold traffic | Visual system for `/` after Sprint 0: playable right column, 3-min tape as secondary CTA. |

★ = **Top 5** selected for First Quest (see summary below).

### Top 5 rationale (short)

1. **Wanted AI Championship 2026** — The only source that sets *this* scoring math. Working URL is a participation condition (VentureSquare: if the service is down during review, the entry can be dropped). Prelim mix is 80% internal judges / 20% online votes; 인기상 is 100% votes among TOP20. Design the public URL for **two audiences at once**: Wanted voters (9/21–10/5) and Demo Day judges (10/17).
2. **Devpost 3-min demo playbook** — Cross-hackathon standard: open with the elevator, **show the product running**, keep the tape public, script the clock, upload early. Devpost Help explicitly prefers a narrated screencast over a marketing montage. This is the 10/17 Demo Day tape and the backup if Phaser fails live.
3. **The AI Champion Ship (LiquidMetal)** — Championship-branded peer contest that *requires* a live deployed app, a public ≤3 min video that matches the live app, and runs a named **Audience Favourite** vote. Submission quality (description + video) is a judging criterion, not decoration.
4. **Wingspan / Finch** — Winning-grade landing where the **hero interaction is the demo** (live autofill mock, With/Without comparison). First Quest `/` should sell “play the first day” in one motion, not a feature grid.
5. **GreenBorrow** — Smallest complete “working URL” kit: live Vercel, Devpost **Try it out** block, **Demo Login** so judges never bounce on auth. Maps 1:1 to First Quest `/demo` (Neulbom, no login) as the vote/judge entry.

### Patterns to steal (non-visual)

- **URL is the submission.** Wanted, LiquidMetal, Since AI, MLH: if the link 404s or needs a private login, the project is unevaluable. Keep `https://first-quest-iota.vercel.app` (and `/demo`, `/create`) green through 10/17; no “it works on localhost.”
- **Guest path in one click.** GreenBorrow Demo Login; Devpost “skip mundane credential flows.” First Quest already has this: primary CTA = **Neulbom 데모 플레이**, not “Sign in.”
- **3-minute clock (Reskilll + Devpost + LiquidMetal).** 0:00–0:20 problem (PDF onboarding forgets), 0:20–0:40 name the product, 0:40–2:30 **one complete play** (open `/` → `/demo` → core action E-interact → Day 0 result), 2:30–2:50 stack + AI usage + scale, 2:50–3:00 close. Do not open a code editor. Record a backup before Demo Day.
- **Vote hook is a shareable artifact, not a speech.** HackHQ/ScoreJudge: gallery card + QR + no-account vote. Landing needs a **copy-link / QR / one-sentence hook** so Wanted users can vote after 30 seconds of play. LiquidMetal and Wanted both run a popularity track in parallel with judges.
- **Online page = second pitch.** Devpost: problem, what it does, impact, screenshots, video, tech, teammates. Wanted form already asks problem / AI usage / stack—mirror that on `/` so a voter who never opens the form still gets the story.
- **Championship landing language.** TreeHacks / LiquidMetal / Wanted: date, prize, one mission line, primary CTA. Avoid generic “AI platform” hero; say the outcome (playable first day) and the proof (public demo, fictional employer only).
- **Interactive hero beats screenshot dump.** Wingspan autofill; Mâm Cơm spin-the-tray; Navattic in-fold tour. First Quest: looped Phaser slice or GIF of quest HUD in the hero, with **Play** as the only filled button.
- **Tape must match the live app.** LiquidMetal: “Application must function consistently as demonstrated in your video.” Do not demo half-built `/create` paths; show `/demo` perfectly.
- **Keep updating after submit.** Devpost: fans (voters) return to the live URL. A changelog or “what judges will click” strip on `/` reduces bounce during the 9/21–10/5 window.

### Anti-patterns to avoid

- **Private or unlisted demo video** (Devpost/MLH: judges cannot watch; MLH can revoke prizes).
- **Auth wall before the wow** (Devpost present-a-demo: skip signup; GreenBorrow exists because of this).
- **Slide-first Demo Day** (MLH: pitches are discouraged; Reskilll: code editor / terminal is debugging, not presenting).
- **Apologizing for broken features** or showing WIP (Reskilll). Show the one path that always works.
- **Championship landing with three equal CTAs** (SaaS CRO: one primary). `/` should not compete Play vs Create vs Vote at the same weight—Play first, vote affordance second, Create third.
- **Dead production alias during voting** (Wanted/VentureSquare exclusion risk). Treat uptime as a contest rule, not infra nicety.

### First Quest mapping (contest clock)

| Window | What voters/judges do | What `/` and the tape must do |
| --- | --- | --- |
| Submit ~9/20 | Paste working URL + problem + AI + stack | URL 200 on `/`, `/demo`, `/create`; guest play; no real employer data |
| Prelim + vote 9/21–10/5 | Internal review 80% + public vote 20% | Share/QR/hook; 30s self-serve play; page states the problem in one screen |
| TOP20 → Demo Day 10/17 | 3-min live + backup video; 인기상 still vote-based | Reskilll clock; screencast backup; tape matches `/demo` |

Existing 30s Korean script in `docs/submit-2026-09-20.md` is the **vote-loop** core (landing → play → E-interact → ending → optional Create). Expand that same path to 3:00 for Demo Day; do not invent a second story.
