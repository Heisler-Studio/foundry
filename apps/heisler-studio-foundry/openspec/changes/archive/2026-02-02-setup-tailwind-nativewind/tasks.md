## 1. Install Dependencies

- [x] 1.1 Install Tailwind CSS v3 with `pnpm add -D tailwindcss@^3.4.0`
- [x] 1.2 Install NativeWind v4 with `pnpm add nativewind@^4.1.0`
- [x] 1.3 Install react-native-css-interop explicitly
  - **CRITICAL**: Must install `pnpm add react-native-css-interop@0.1.22`
  - **Why**: pnpm doesn't hoist this dependency properly in workspaces
  - **Note**: nativewind requires exactly version 0.1.22
- [x] 1.4 Verify all dependencies are in package.json with correct versions
  - tailwindcss: ^3.4.19
  - nativewind: 4.1.23
- [x] 1.5 Run `pnpm install` to ensure workspace dependencies are linked

## 2. Configure Metro Bundler

- [x] 2.1 Create or update `metro.config.js` with NativeWind Metro plugin
- [x] 2.2 Import and configure the NativeWind CSS transformer
- [x] 2.3 Ensure Metro config handles `.css` file extensions
- [x] 2.4 Test Metro bundler starts without errors

## 3. Configure Babel

- [x] 3.1 Update `babel.config.js` with NativeWind babel preset
- [x] 3.2 Ensure babel-preset-expo compatibility
- [x] 3.3 Verify JSX, TypeScript, and CSS imports are supported
- [x] 3.4 Test Babel compilation without errors
  - **Fix applied**: Removed `{ jsxImportSource: "nativewind" }` from babel-preset-expo config

## 4. Create Global CSS Entry Point

- [x] 4.1 Create `tailwind.config.js` with NativeWind preset
- [x] 4.2 Create `global.css` file with Tailwind directives
- [x] 4.3 Configure custom design tokens (colors, spacing, borderRadius)
- [x] 4.4 Define primary color (#007AFF) and secondary color (#5856D6)
- [x] 4.5 Configure spacing scale (4px base unit up to 64px)
- [x] 4.6 Configure border radius tokens (sm, md, lg, xl, full)
- [ ] 4.7 Add dark mode variant configuration (optional enhancement)
- [x] 4.8 Verify CSS file compiles without errors

## 5. Import CSS in App Root

- [x] 5.1 Update `app/_layout.tsx` to import `../global.css`
- [x] 5.2 Ensure CSS import is at the very top of the file
- [x] 5.3 Verify the import path is correct relative to the layout file
- [x] 5.4 Test that CSS is loaded on app startup

## 6. Configure TypeScript Types

- [x] 6.1 Update `tsconfig.json` with NativeWind types
- [x] 6.2 Add `nativewind/types` to types array in compilerOptions
- [x] 6.3 Create `nativewind.d.ts` file for type declarations
- [x] 6.4 Verify TypeScript recognizes NativeWind className prop types
- [ ] 6.5 Test IDE autocomplete works for Tailwind classes

## 7. Create Example Component

- [x] 7.1 Create directory `components/example/`
- [x] 7.2 Create `StyledExample.tsx` component file
- [x] 7.3 Import React and required NativeWind types
- [x] 7.4 Create component with basic styling using utility classes (flex, padding, colors)
- [x] 7.5 Add responsive design examples (flex-col sm:flex-row)
- [x] 7.6 Add custom design token examples (bg-primary, bg-secondary)
- [x] 7.7 Add dark mode examples (color classes work with system theme)
- [x] 7.8 Export component as default export
- [x] 7.9 Add component to `app/index.tsx` to test rendering
- [x] 7.10 Verify component renders with correct styles on iOS, Android, and web

## 8. Verify Hot Reloading ✓

- [x] 8.1 Start development server with `pnpm start --clear`
- [x] 8.2 Metro bundler starts successfully (765 modules bundled)
- [x] 8.3 Web server running on http://localhost:8081
- [x] 8.4 No module resolution errors

## 9. Final Verification

- [x] 9.1 Run `pnpm lint` - No errors found
- [x] 9.2 Run TypeScript check (`npx tsc --noEmit`) - No errors found
- [x] 9.3 Run `pnpm test` - No test script defined (skipped)
- [x] 9.4 Build for development - Metro bundler works, app starts successfully
- [x] 9.5 Document the setup in README
- [x] 9.6 Create a simple usage guide for the team
