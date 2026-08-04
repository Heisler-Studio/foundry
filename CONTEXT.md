# Context

Vocabulary for the Foundry monorepo and the apps in it. This is a glossary, not a spec — no
implementation details. Design decisions live in `docs/adr/`, procedures in `docs/recipes/`.

Use these words in code, issues, and conversation. When a term here conflicts with how something
is named in the code, the code is wrong.

## Evergreen BBD

The app in `apps/evergreen-bbd`. Its full design lives in `docs/design/evergreen-bbd-poc.md`.

### Strategy

**BBD** — Buy, Borrow, Die. Hold appreciating assets, generate income from them, and borrow
against them rather than selling. The strategy the app exists to operate.

**Coverage** — the fraction of monthly expenses met by portfolio income. Coverage ≥ 1 is the
goal state: the portfolio pays for life without selling principal.

**Income engine** — the part of the portfolio held primarily to produce distributions rather
than appreciation.

**Growth core** — the part held for appreciation, typically carrying embedded gains that make
selling expensive.

### Portfolio state

**Account** — a brokerage account. One account is in scope: the Robinhood Individual/Margin
account. Retirement accounts are explicitly out of scope.

**Security** — a tradeable instrument identified by ticker. Not a holding; the app knows about
securities it does not hold.

**Holding** — a quantity of one Security in one Account, right now.

**Lot** — a specific acquisition of shares: quantity, acquisition date, price paid. A Holding is
made of Lots. Lots are what make "which shares do I sell" answerable; average cost is not.

**Margin balance** — money borrowed against the Account. A liability, not negative cash.

**LTV** — loan-to-value. Margin balance ÷ total value. The number that says how leveraged you
are.

**Equity %** — (total value − margin balance) ÷ total value. The inverse view of LTV, and the
one that reads as "how much of this is actually mine."

**Snapshot** — portfolio state captured at a point in time, kept so change over time is
measurable.

**Staleness** — how long ago an Account's data was last refreshed from the brokerage. A first-class
fact, because a plan computed against old holdings is worse than no plan.

### Planning

**Plan** — a candidate strategy. Made of a Target and a Path. Plans are cheap to create and
cheap to discard; that is the point.

**Target** — the declarative half of a Plan: what the portfolio should look like. Weights, rules,
margin policy. Two Targets can be scored against each other without either being executed.

**Path** — the imperative half of a Plan: the ordered, dated Steps that get from today's holdings
to the Target. Generated from the difference between the two, not hand-authored.

**Step** — one action on a Path. Individually dated, individually checkable, and possibly gated on
another Step or on a calendar condition.

**Sink** — a destination for a dollar. Buying a security is one sink; paying down margin and
holding cash are others, and they compete. A Plan allocates across sinks, so "what do I buy" is
the wrong question when "pay down the loan" may win.

**Active plan** — the single accepted Plan currently being executed. All other Plans are
candidates. Accepting a Plan is the moment a proposal becomes a commitment.

**Drift** — divergence between current holdings and the Active Plan's Target. Drift is expected;
enough of it means the Path no longer reaches the Target and should be regenerated.

**Scorecard** — the fixed set of computed consequences used to compare Targets. Every Target is
scored the same way, so comparison is honest.

### Roles

**The app** — owns state, arithmetic, and workflow. Every number a user sees was computed here
and is reproducible.

**The coach** — Claude, running outside the app and reaching it over MCP. Owns judgment: proposing
Targets, arguing tradeoffs, explaining. Never the source of a number.
