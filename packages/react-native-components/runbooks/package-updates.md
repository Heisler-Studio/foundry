# Package Updates Runbook

This runbook provides procedures for updating dependencies and managing package changes.

## Table of Contents

1. [Updating react-native-reusables](#updating-react-native-reusables)
2. [Version Bumping](#version-bumping)
3. [Testing After Updates](#testing-after-updates)
4. [Rollback Procedures](#rollback-procedures)

## Updating react-native-reusables

react-native-reusables is the foundation of this component library. Follow these steps to update it.

### Before Updating

1. **Check the changelog** at https://github.com/mrzachnugent/react-native-reusables/releases
2. **Review breaking changes** - note any API changes that affect components
3. **Check peer dependencies** - see if React Native or other deps need updates

### Update Process

```bash
# 1. Navigate to the package directory
cd packages/react-native-components

# 2. Update react-native-reusables dependencies
pnpm add nativewind@latest tailwindcss@latest

# 3. Check for peer dependency updates
# Review if React Native version requirements changed

# 4. Install updated dependencies
pnpm install

# 5. Build the package
pnpm run build
```

### Handle Breaking Changes

If breaking changes are introduced:

1. **Create a branch** for the update
2. **Update component code** to match new API
3. **Update TypeScript types** if interfaces changed
4. **Test all components** in a consuming app
5. **Update documentation** with any API changes

## Version Bumping

This package uses semantic versioning (MAJOR.MINOR.PATCH).

### When to Bump Versions

- **MAJOR**: Breaking changes to component APIs
- **MINOR**: New components or features (backward compatible)
- **PATCH**: Bug fixes, documentation updates

### Version Bump Process

```bash
# 1. Update version in package.json
# Example: "version": "1.0.0" → "version": "1.1.0"

# 2. Add changelog entry
# Document what changed and why

# 3. Commit the version bump
git add package.json CHANGELOG.md
git commit -m "chore: bump version to 1.1.0"
```

### Version Format

```json
{
  "name": "@foundry/react-native-components",
  "version": "1.2.3"
}
```

- `1` - Major version (breaking changes)
- `2` - Minor version (new features)
- `3` - Patch version (bug fixes)

## Testing After Updates

Always test updates before committing.

### Build Testing

```bash
# Build the package
cd packages/react-native-components
pnpm run build

# Verify no TypeScript errors
# Check that dist/ folder is created with .js and .d.ts files
```

### Integration Testing

```bash
# 1. Update the package in a consuming app
cd apps/base-universal-app
pnpm add @foundry/react-native-components --workspace

# 2. Clear Metro bundler cache
pnpm start --reset-cache

# 3. Test the app
# - iOS: pnpm ios
# - Android: pnpm android
# - Web: pnpm web
```

### Component Testing Checklist

Test these scenarios after updates:

- [ ] All components render without errors
- [ ] Styling applies correctly (NativeWind classes)
- [ ] TypeScript types are correct
- [ ] No console warnings or errors
- [ ] Works on iOS, Android, and Web

## Rollback Procedures

If an update causes issues, follow these steps to rollback.

### Immediate Rollback (package.json)

```bash
# 1. Revert package.json changes
git checkout package.json

# 2. Reinstall previous versions
pnpm install

# 3. Verify build works
pnpm run build

# 4. Test in consuming app
```

### Full Rollback (with commit)

```bash
# 1. Revert the update commit
git revert <commit-hash>

# 2. Clean and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 3. Build and test
pnpm run build
```

### Communicating Rollbacks

If a rollback is needed:

1. **Notify the team** - Let others know about the issue
2. **Document the problem** - Add to troubleshooting guide
3. **Plan the fix** - Create an issue to address the underlying problem
4. **Update documentation** - Note the problematic version

## Emergency Contacts

If you encounter critical issues:

- **Package maintainer**: [Add contact]
- **Team lead**: [Add contact]
- **Slack channel**: [Add channel]

## Related Runbooks

- [Component Development](./component-development.md)
- [Troubleshooting](./troubleshooting.md)
