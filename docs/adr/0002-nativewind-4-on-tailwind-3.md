# Styling is NativeWind 4 on Tailwind 3

Tailwind 4 has been out for a while, so pinning `tailwindcss@^3.4.19` looks like neglect. It
isn't. NativeWind 4 — the current stable release — is built against Tailwind 3 and does not work
with 4. The Tailwind 4 story on React Native is NativeWind 5, still pre-release, and **uniwind**,
which react-native-reusables now ships an alternative template for. Neither is something to build a
product on today.

We chose stable over current here, and only here, because the styling layer is the one place where
being early costs real debugging time. Everything else in this repo tracks the newest release.

## Consequences

- Tailwind 3 syntax and plugin compatibility, not Tailwind 4. Check plugin support against v3.
- This is the repo's most likely near-term migration. Keep styling shallow: use utility classes at
  the call site and the CSS variables in `src/global.css`, and avoid building abstractions over
  NativeWind's internals that a migration would have to unwind.
- Revisit when NativeWind 5 reaches stable or uniwind's template stops being labelled experimental.
