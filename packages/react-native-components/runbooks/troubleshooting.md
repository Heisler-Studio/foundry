# Troubleshooting Runbook

Common issues and their solutions when working with the `@foundry/react-native-components` package.

## Table of Contents

1. [Build Errors](#build-errors)
2. [Metro Bundler Issues](#metro-bundler-issues)
3. [TypeScript Configuration](#typescript-configuration)
4. [Workspace Linking](#workspace-linking)
5. [Styling Issues](#styling-issues)

## Build Errors

### TypeScript Compilation Errors

**Error**: `Property 'className' does not exist on type '...'`

**Solution**:

1. Ensure `nativewind-env.d.ts` exists in the package root
2. Check that `tsconfig.json` includes `"nativewind/types"` in types array
3. Verify the file is included: `"include": ["src", "nativewind-env.d.ts"]`

```typescript
// nativewind-env.d.ts
/// <reference types="nativewind/types" />
```

**Error**: `Cannot find module '@foundry/react-native-components'`

**Solution**:

1. Build the package: `cd packages/react-native-components && pnpm run build`
2. Check that `dist/` folder exists with compiled files
3. Verify the package is in `pnpm-workspace.yaml`

### Module Resolution Errors

**Error**: `Cannot resolve '@foundry/react-native-components'`

**Solution**:

1. Add as workspace dependency: `pnpm add @foundry/react-native-components --workspace`
2. Check `package.json` has correct exports configuration
3. Run `pnpm install` from root

## Metro Bundler Issues

### Invalid Hook Call Error

**Error**: `Invalid hook call. Hooks can only be called inside of the body of a function component.`

**Cause**: Multiple copies of React being bundled - one from the app's node_modules and one from the workspace package's node_modules.

**Solution**:

1. Ensure package.json exports point to built files, not source:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "default": "./dist/index.js"
    }
  }
}
```

2. Add to consuming app's `metro.config.js`:

```javascript
const path = require('path');

// Ensure React is resolved from the root only
config.resolver.extraNodeModules = {
  react: path.resolve(__dirname, '../../node_modules/react'),
  'react-native': path.resolve(__dirname, '../../node_modules/react-native'),
};

// Resolve workspace packages correctly
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '../../node_modules'),
];
```

3. Clear Metro cache: `pnpm start --reset-cache`

### Cache Issues

**Symptom**: Changes not reflecting, old code being used

**Solution**:

```bash
# Clear Metro cache
pnpm start --reset-cache

# Or manually clear
rm -rf $TMPDIR/metro-*
```

### Module Resolution

**Error**: `Unable to resolve module '@foundry/react-native-components'`

**Solution**:

1. Add to `metro.config.js` in consuming app:

```javascript
const config = getDefaultConfig(__dirname);

// Watch local packages
config.watchFolders = [path.resolve(__dirname, '../..')];

// Resolve workspace packages
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '../../node_modules'),
];
```

### Symlink Issues

**Error**: Metro doesn't follow symlinks

**Solution**:
Ensure `metro.config.js` has symlink support:

```javascript
config.resolver.disableHierarchicalLookup = false;
config.resolver.unstable_enableSymlinks = true;
```

## TypeScript Configuration

### Type Declarations Not Found

**Error**: `Could not find a declaration file for module '@foundry/react-native-components'`

**Solution**:

1. Ensure package is built: `pnpm run build`
2. Check `package.json` exports point to dist files:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "default": "./dist/index.js"
    }
  }
}
```

**Important**: Never point exports to `./src/` files in a workspace package as this causes Metro to bundle duplicate dependencies.

### Strict Mode Errors

**Error**: Strict TypeScript errors in consuming app

**Solution**:
Ensure component props extend appropriate base types:

```typescript
// Good - extends PressableProps
export interface ButtonProps extends PressableProps {
  variant?: ButtonVariant;
}

// Avoid - doesn't inherit base props
export interface ButtonProps {
  onPress?: () => void; // Duplicating base prop
}
```

## Workspace Linking

### Package Not Linking

**Symptom**: Changes to package not reflected in consuming app

**Solution**:

1. Verify workspace configuration in root `pnpm-workspace.yaml`:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

2. Check package is properly installed:

```bash
cd apps/base-universal-app
ls -la node_modules/@foundry/react-native-components
# Should be a symlink
```

3. Reinstall if needed:

```bash
cd apps/base-universal-app
pnpm remove @foundry/react-native-components
pnpm add @foundry/react-native-components --workspace
```

### Version Conflicts

**Error**: Multiple versions of package in dependency tree

**Solution**:

```bash
# Check for duplicates
pnpm why @foundry/react-native-components

# If duplicates exist, force single version
pnpm install --force
```

## Styling Issues

### NativeWind Classes Not Applied

**Symptom**: Components render but styles don't apply

**Solution**:

1. Ensure NativeWind is configured in consuming app
2. Check that `tailwind.config.js` includes the package:

```javascript
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    '../../packages/react-native-components/src/**/*.{js,jsx,ts,tsx}',
  ],
  // ...
};
```

3. Verify CSS import in app entry:

```typescript
import '../global.css'; // or wherever your CSS is
```

### Platform-Specific Issues

**iOS**: Styles not applying

- Ensure `react-native-reanimated` is properly linked
- Run `cd ios && pod install`

**Android**: Styles not applying

- Clear Gradle cache: `cd android && ./gradlew clean`
- Rebuild: `pnpm android`

**Web**: Styles not applying

- Check that Tailwind CSS is processing the classes
- Verify `postcss.config.js` is set up correctly

## Still Having Issues?

If none of these solutions work:

1. **Check the logs** - Look for the full error message
2. **Try a clean build**:
   ```bash
   pnpm clean
   rm -rf node_modules
   pnpm install
   pnpm run build
   ```
3. **Ask for help** - Reach out to the team with:
   - Full error message
   - Steps to reproduce
   - What you've already tried

## Related Runbooks

- [Component Development](./component-development.md)
- [Package Updates](./package-updates.md)
