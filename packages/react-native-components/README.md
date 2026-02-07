# @foundry/react-native-components

Shared React Native components based on [react-native-reusables](https://reactnativereusables.com/). Provides accessible, customizable UI primitives for Expo universal apps.

## Installation

This package is available as a workspace dependency within the Foundry monorepo.

```bash
pnpm add @foundry/react-native-components --workspace
```

## Adding React Native Reusables components (CLI)

This package is set up to work with the React Native Reusables CLI so you can install upstream components into the package (instead of an app) and then export/wrap them for consumption.

Example (adds `card` and its dependency `text`):

```bash
pnpm dlx @react-native-reusables/cli@latest add -y --overwrite --cwd packages/react-native-components card
```

Notes:

- Options MUST come before the component names (e.g. `add -y --cwd ... card`).
- The CLI uses `packages/react-native-components/components.json` to decide where files go.
- Installed files land under `packages/react-native-components/src/registry/new-york/`.

After installing, export (or wrap) the new components from `packages/react-native-components/src/registry/new-york/components/ui/index.ts` and they will be available from `@foundry/react-native-components`.

Note: This package intentionally does not use `src/components/*` as an authoring location. The default workflow is CLI installs into `src/registry/...`.

## Runbooks

See the `/runbooks` directory for detailed guides:

- [Component Development](./runbooks/component-development.md) - How to add new components
- [Package Updates](./runbooks/package-updates.md) - How to update dependencies
- [Troubleshooting](./runbooks/troubleshooting.md) - Common issues and solutions

## Contributing

See the runbooks for guidelines on adding new components or modifying existing ones.

## License

Private - Internal use only
