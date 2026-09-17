# Judging — Wanted AI Championship 2026 (SSOT)

**Confirmation date:** 2026-09-18  
**Numeric weights and criteria:** use this file for program scoring. Update only after new **official** Wanted publication; until then, weights below come from VentureSquare press mirror of WantedLab announcement.

Official entry URL: https://event.wanted.co.kr/ai-championship/2026  
Press mirror (Korean + EN): https://www.venturesquare.net/1109725/

## Preliminary round (예선) — select TOP20

**Combined score**

| Component | Weight |
|-----------|--------|
| WantedLab internal judges | **80%** |
| Online public vote | **20%** |

**Internal judge criteria (four pillars)** — treat as equal sub-score within the 80% block unless official docs specify otherwise:

1. **기획력** — planning / problem framing / product story  
2. **실현 가능성** — feasibility; **working deployed service**  
3. **확장성** — scalability; path beyond demo  
4. **AI 활용의 적절성** — appropriate, credible AI use (not gimmick)

**Period:** 2026-09-21 – 2026-10-05  
**Outcome:** **20 teams** advance (announced **2026-10-07**)

## Final round (본선) — Demo Day 2026-10-17

**Weight:** expert panel **100%** (no public vote split stated for final rank)

**Criteria (four pillars):**

1. **기획력** — planning  
2. **확장성** — scalability  
3. **기술력** — technical depth / execution  
4. **발표 전달력** — presentation delivery  

**Stated final judges (roles as reported):**

- 강정구 — Liner AI strategy  
- 김호민 — SparkLabs co-CEO  
- 김덕중 — Firb AI research lab  
- 조정석 — Krafton AI agent engineer  
- 정기수 — WantedLab AI division head  

Source: VentureSquare 1109725 (*secondary*)

## Popularity prize (인기상)

- **100% online vote** among **TOP20 finalists** — highest vote count wins KRW 1,000,000  
- Distinct from prelim 20% vote contribution (same voter funnel likely; treat hook + shareability as first-class)

Source: UNIV20 calendar + VentureSquare (*secondary*, consistent)

## Submission requirements tied to judging

| Requirement | Judging impact |
|-------------|----------------|
| Live URL works during evaluation | **Disqualification risk** if broken (see DISQUALIFIERS.md) |
| Problem + AI usage + tools documented | Feasibility & AI appropriateness |
| Deployed service (not slides only) | Feasibility gate |

## First Quest — self-score template (prelim 80% block)

Use in judge loop (`docs/contest/JUDGE-LOOP.md`). Score each 1–25, sum = 100.

| # | Criterion | First Quest evidence lane |
|---|-----------|---------------------------|
| 1 | 기획력 | HR onboarding pain → playable RPG; Neulbom + Create story |
| 2 | 실현 가능성 | Vercel URL + `/demo` seven missions + `/create` preview |
| 3 | 확장성 | GamePack SSOT → generate pipeline PR-04+; multi-tenant play slug |
| 4 | AI 적절성 | Schema-bound generation, canned fallback, tool disclosure in submit doc |

**Target for Grand Prix program:** self-score **≥90/100** on this template at PR-03 submit head, plus vote-hook rehearsal ≥8/10.

## Conflicts / TBD

- Official site did not expose rubric text to automated fetch on 2026-09-18; operator should screenshot event FAQ before submit.
- If official docs give different weights, replace table above and re-run judge loop on latest submission snapshot.
