# No LLM in the app; Claude coaches over MCP

Evergreen BBD has to reason about strategy — propose portfolio targets, argue tradeoffs, explain
why one approach beats another — but it must never be wrong about a number attached to a real
half-million-dollar account. We split those two jobs across the process boundary: the app owns
state, arithmetic, and workflow, and exposes them over an MCP server; Claude runs outside the app,
reaches it through MCP, and does the judgment. There is no model call, no API key, and no prompt
inside the product.

## Considered options

**LLM embedded in the app** — a chat surface with an API key. Rejected: it puts per-token cost into
a single-user local tool, requires guardrails to keep the model from inventing figures, and makes
every answer non-reproducible. "The model said your LTV is 22%" is not something you can act on.

**Fully deterministic** — encoded strategy templates and an optimizer, no model anywhere.
Rejected: every new idea becomes a code change. The question that prompted this design — covered-call
ETFs versus holding the index and trimming gains — is a reasoning question, and a rules engine can
only answer questions someone already anticipated.

## Consequences

The MCP surface is the product's real API, not a convenience wrapper. It is two-way: Claude reads
portfolio state and writes proposed Plans back for acceptance. Design it as the primary interface
and let the UI be a second consumer of the same operations.

Anything a user needs to trust — valuations, drift, LTV, scorecard columns — is computed in the
service. If a number can only be produced by a model, it does not ship.

The coaching conversation is ephemeral and lives in Claude. That is why the app persists the
accepted Plan and its execution state: a conversation cannot remember that you are one tranche
behind schedule, and it will happily propose the same reallocation twice.
