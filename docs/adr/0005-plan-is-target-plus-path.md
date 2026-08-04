# A Plan is a Target plus a generated Path

The app's central object had to satisfy two requirements that pull in opposite directions:
comparing candidate strategies against each other wants a declarative end state, while coaching
someone through a multi-step reallocation wants an ordered sequence of dated actions. A Plan is
both, layered — a **Target** (weights, rules, margin policy) and a **Path** (the ordered Steps
that get from today's holdings to that Target, generated from the difference between them).

Exactly one Plan is **active** at a time. Every other Plan is a candidate. Accepting a Plan is the
single write that converts a proposal into a commitment.

## Considered options

**Target only** — the app diffs current against target and derives actions live. Rejected: it can
say "you are 5% over your growth allocation" and nothing more. That is a dashboard, and it is
precisely the failure mode this app exists to avoid.

**Path only** — a checklist of accepted steps, no end state. Rejected: changing strategy means
hand-editing a checklist, and comparing two strategies is impossible because there is nothing to
compare.

## Consequences

Targets are cheap and disposable; Paths are generated, so revising a strategy costs nothing but a
regeneration. This is what makes "what if I bought the index and trimmed instead" a two-minute
question rather than a project.

Because the app holds both the destination and the progress along the way, it can answer *am I on
track* — which neither a spreadsheet nor a chat conversation can. Checklists, todos, and progress
reports all fall out of Steps rather than being three separate features.

Drift detection comes free: when the market moves enough that the Path no longer reaches the
Target, the app flags it and the coach regenerates.

A Step's destination is a **sink**, not necessarily a security. Paying down margin and holding cash
compete with buying for every dollar freed — early in a transition, retiring debt at the margin
rate may beat any purchase. A model where Steps only buy and sell cannot express that, so it is
wrong.
