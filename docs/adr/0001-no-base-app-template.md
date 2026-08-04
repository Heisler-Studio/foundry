# No base app template — new apps start from a recipe

Foundry hosts several Expo apps, so an obvious move is to keep a maintained "base app" that new
apps fork from. We are deliberately not doing that. A forked app copies `app.config.ts`, the
Metro/Babel/Tailwind config, and the native dependency set — all of which track the Expo SDK — so
every fork rots independently and every SDK upgrade gets paid N times. This already happened: the
existing base app sat 3 SDK majors behind (54 → 57) within six months, because nothing shipped
from it and nobody had a reason to upgrade it.

Instead, a new app is created from `create-expo-app` plus a written recipe: install the
`@foundry/*` packages, run the component/style init, copy the handful of files worth copying.
Nothing to keep current between apps, and the SDK upgrade path for each app is the one Expo
already supports.

The recipe is written when the first real app is created, not before — it is a record of what was
actually done, not a speculative template.

## Consequences

- Deciding what belongs in a shared package uses one test: **if app B diverges from app A here, is
  that a feature or a bug?** Divergent theme values are a feature and stay in the app. A `Button`
  fix that fails to reach app B is a bug, so components are a package. Most app plumbing — i18n
  bootstrap, providers, storage keys, theme values, screens — is the first kind and is not shared.
- Shared packages need at least one real consumer in the workspace, or they break silently. That
  consumer is a real app, not a template.
