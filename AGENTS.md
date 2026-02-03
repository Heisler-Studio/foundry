# Agent Instructions

This document provides essential context and guidelines for working with this monorepo codebase.

**ALWAYS use pnpm** for all package management operations. This is a pnpm workspace monorepo.

### Critical Commands

- Install dependencies: `pnpm install`
- Add dependency: `pnpm add <package>`
- Add dev dependency: `pnpm add -D <package>`
- Add workspace dependency: `pnpm add @foundry/<package> --workspace` or use `workspace:*` protocol
- Run script: `pnpm run <script>`
- Run across workspace: `pnpm -r run <script>`
- Run in specific package: `pnpm --filter <package-name> run <script>`

```bash
# Adding a workspace package to an app
pnpm add @foundry/hello-world --filter example-app-web --workspace
```

## Project Structure

This is a **pnpm workspace** hub for developing multiple applications and shared packages.

```
foundry/
├── apps/                    # Applications
│   └── example-app-web/     # Next.js web application
│   └── [expo-mobile-app]/   # Expo React Native app (future)
│   └── [storybook]/         # Storybook for component documentation (future)
├── packages/                # Shared packages organized by domain
│   ├── config/              # Shared configuration (ESLint, Prettier, TypeScript)
│   ├── hello-world/         # Example package
│   └── [auth]/              # Authentication utilities (future)
│   └── [observability]/     # Monitoring and logging (future)
├── pnpm-workspace.yaml      # Workspace configuration
└── .tool-versions           # asdf version management
```

### Packages

Organized by **domain** for maintainability:

- **config**: Shared ESLint, Prettier, TypeScript configurations
- **hello-world**: Example shared library
- Future domains: auth, observability, ui-components, utilities, etc.

## Development Workflow

### Build Commands

```bash
# Build all packages
pnpm -r run build

# Build specific package
pnpm --filter @foundry/hello-world run build

# Build specific app
pnpm --filter example-app-web run build
```

## Code Style & Architecture Principles

### Core Principles

1. **Maintainability**: Code should be easy to understand, test, and modify
2. **Scalability**: Design for growth without major refactoring
3. **Observability**: Include proper logging, error handling, and metrics

### File Organization

- **Favor small files over large ones**: Keep files under 200-300 lines when possible
- **Single responsibility**: Each file should have one clear purpose
- **Co-location**: Keep related files close together

### Programming Paradigm

- **Use functional programming**: Prefer pure functions, immutability, and function composition
- **NO classes**: Do not use ES6 classes or OOP patterns. Use functions and closures instead
- **Abstractions**: Create small, composable abstractions that can be reused across the codebase

Example:

```typescript
// ✅ Good - functional approach
export const createGreeting = (name: string) => {
  return `Hello, ${name}!`;
};

// ❌ Bad - class-based approach
export class Greeter {
  greet(name: string): string {
    return `Hello, ${name}!`;
  }
}
```

### TypeScript Conventions

- Use strict TypeScript settings (enforced via @foundry/config)
- Prefer `type` over `interface` for object shapes
- Use explicit return types on exported functions
- Avoid `any` - use `unknown` with type guards when necessary
- Avoid explicit return types unless necessary

## AI Assistant Tools

### Skills

**Use `/skills` when possible** to leverage specialized knowledge:

Always check if a skill exists before attempting complex tasks from scratch.

### Documentation

**Use context7 MCP for documentation** when needed

## Common Tasks

### Adding a New Package

1. Create directory in `packages/<domain-name>/`
2. Add `package.json` with:
   - `"type": "module"`
   - `"private": true` if internal-only
   - `"@foundry/config": "workspace:*"` as devDependency
3. Create `tsconfig.json` extending `@foundry/config/tsconfig.base.json`
4. Create `src/index.ts` entry point
5. Add exports to `package.json`

### Adding a New App

1. Create directory in `apps/<app-name>/`
2. Follow framework-specific setup (Next.js, Expo, etc.)
3. Add `@foundry/config` as devDependency
4. Update root README with app description

## Notes

- Always check existing code patterns before implementing new features
- Follow the established functional programming style
- Keep packages domain-focused and small
- Ask the user when unsure about architectural decisions
- Never commit secrets or sensitive data
