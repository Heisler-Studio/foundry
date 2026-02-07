## 1. Baseline and repository configuration

- [x] 1.1 Identify the consuming app(s) used for verification (native + web) and document them in the change notes
- [x] 1.2 Capture the current failing behavior (what breaks today) with a minimal repro screen importing from `@foundry/react-native-components`
- [x] 1.3 Inventory current NativeWind/Tailwind config locations across apps (where `tailwind.config.*` lives and how NativeWind is wired)

## 2. Shared Tailwind configuration for monorepo scanning

- [x] 2.1 Create a shared Tailwind preset/config module that centralizes monorepo `content` globs (including `@foundry/react-native-components` sources)
- [x] 2.2 Update each in-scope app to consume the shared preset/config as its standard NativeWind setup
- [x] 2.3 Verify Tailwind generates classes used by components living in the workspace package (no missing styles)

## 3. Package entrypoints and exports

- [x] 3.1 Ensure `@foundry/react-native-components` exports all public APIs from a single entrypoint (no deep import requirement)
- [x] 3.2 Validate Metro can resolve and transpile the package via pnpm workspace linking (no app-specific alias hacks)
- [x] 3.3 Validate the web bundler can resolve the package and TypeScript types in the consuming app

## 4. Raw component installation workflow

- [x] 4.1 Define the target directory/layout under `packages/react-native-components/src/` for installed raw components
- [x] 4.2 Add or document the installation procedure for raw components per NativeWind's monorepo guidance (targeting the package source tree)
- [x] 4.3 Re-export installed components via `packages/react-native-components/src/index.ts`

## 5. Theming and override extension points

- [x] 5.1 Introduce/standardize a minimal semantic token set used by base components (e.g., `surface`, `foreground`, `border`)
- [x] 5.2 Ensure exported primitives accept `className` and merge overrides last
- [x] 5.3 For at least one composed component, add slot-level override props and verify they work in a consuming app

## 6. Integration verification

- [x] 6.1 Add a verification screen in the chosen consuming app that imports a representative set of components from the package root
- [x] 6.2 Include verification examples for: base styling, `className` override, and token-based theme change
- [x] 6.3 Run verification on iOS, Android, and Web and document results
