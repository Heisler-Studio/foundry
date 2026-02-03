## Context

We are adding Tailwind CSS v4 with NativeWind v5 to the heisler-studio-foundry Expo app to enable utility-first styling. This integrates Tailwind's CSS utility classes with React Native via a CSS-to-StyleSheet transformer (react-native-css). The setup needs to work with Expo SDK 54 and our existing monorepo structure.

Key constraints:

- Must work with Expo SDK 54 and Expo Router
- Must support iOS, Android, and web (Expo Web)
- Must integrate with our pnpm workspace monorepo
- Must support custom design tokens from our design system
- Must maintain type safety with TypeScript

## Goals / Non-Goals

**Goals:**

- Install and configure Tailwind CSS v4 in the Expo app
- Install and configure NativeWind v5 for React Native
- Set up react-native-css for CSS processing
- Configure Metro bundler with CSS plugin
- Configure Babel for CSS support
- Create global.css with custom design tokens
- Set up TypeScript types for NativeWind classes
- Create example component demonstrating usage
- Ensure hot reloading works during development

**Non-Goals:**

- Complete migration of all existing components to NativeWind (can be done incrementally)
- Server-side rendering configuration
- Advanced animation utilities (not needed for initial setup)
- Full design system implementation (just the infrastructure)
- E2E testing of styling system

## Decisions

### Decision 1: Use Tailwind CSS v4 with new configuration system

**Choice:** Use Tailwind CSS v4 instead of v3

**Rationale:**

- Tailwind v4 uses a new configuration system based on CSS-first approach
- Better performance with built-in PostCSS (no separate PostCSS config needed)
- Simplified configuration via `global.css` instead of `tailwind.config.js`
- Future-proof for upcoming Tailwind features

**Alternative considered:** Tailwind v3 with traditional tailwind.config.js - Rejected because v4 is the latest and has better tooling support for React Native

### Decision 2: Use react-native-css as the CSS processor

**Choice:** Use react-native-css package alongside NativeWind v5

**Rationale:**

- Required by NativeWind v5 for CSS processing
- Transforms CSS into React Native StyleSheet objects
- Handles media queries, pseudo-classes, and complex CSS
- Better performance than runtime CSS-in-JS solutions

### Decision 3: Configure via app.json for Expo SDK 54

**Choice:** Use app.json plugin configuration instead of manual Metro config

**Rationale:**

- Expo SDK 54 supports plugins in app.json for cleaner configuration
- Reduces manual Metro configuration complexity
- Easier to maintain and upgrade Expo versions
- Follows Expo best practices

### Decision 4: CSS variable-based design tokens in global.css

**Choice:** Define design tokens as CSS custom properties in global.css

**Rationale:**

- Tailwind v4 supports CSS variables natively
- Allows runtime theme switching (light/dark mode)
- Consistent with web-first design systems
- Can be extended with @theme directive in v4

**Example structure:**

```css
@theme {
  --color-primary: #007aff;
  --color-secondary: #5856d6;
  --spacing-unit: 4px;
}
```

### Decision 5: Single global.css entry point

**Choice:** One global.css file imported at app root instead of per-component CSS

**Rationale:**

- Simplifies configuration
- All Tailwind utilities available everywhere
- Consistent with NativeWind best practices
- Easier to manage design tokens centrally

## Risks / Trade-offs

### [Risk] Tailwind v4 is newer with less community adoption

**Mitigation:** NativeWind v5 specifically supports Tailwind v4; we'll monitor for issues and can downgrade to v3 if needed.

### [Risk] Metro bundler CSS plugin configuration complexity

**Mitigation:** Using NativeWind's official Metro plugin; tested setup with example component.

### [Risk] Design token changes require app reload

**Mitigation:** This is expected behavior; design tokens are compile-time constants in production.

### [Risk] CSS variables not supported on older React Native versions

**Mitigation:** react-native-css handles this transparently; we require modern Expo SDK 54.

### [Trade-off] Learning curve for utility-first CSS

**Impact:** Team needs to learn Tailwind class naming conventions.
**Mitigation:** Provide documentation and examples; gradual adoption allowed.

### [Trade-off] Bundle size increase

**Impact:** Additional dependencies increase app size (~200KB).
**Acceptance:** Justified by developer productivity gains.

## Migration Plan

Not applicable - this is a new feature, not a migration. Existing code continues to work.

## Open Questions

- Should we enable Just-In-Time (JIT) mode for faster development builds? (Already default in v4)
- Do we need custom breakpoints for tablet support? (Can add later)
- Should we include common component utilities (e.g., `card`, `button` classes)? (Defer to design system implementation)
