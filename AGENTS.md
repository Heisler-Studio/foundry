# Agent Instructions

This document provides essential context and guidelines for working with this monorepo codebase.

**ALWAYS use pnpm** for all package management operations. This is a pnpm workspace monorepo.

```bash
# Adding a workspace package to an app
pnpm add @foundry/hello-world --filter base-web --workspace
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
- Avoid explicit return types unless necessary
- Avoid `any` - use `unknown` with type guards when necessary

## AI Assistant Tools

### Skills

**Use `/skills` when possible** to leverage specialized knowledge:

Always check if a skill exists before attempting complex tasks from scratch.

### Documentation

When you need to search docs, use `context7` tools.

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

## Notes

- Always check existing code patterns before implementing new features
- Follow the established functional programming style
- Keep packages domain-focused and small
- Ask the user when unsure about architectural decisions
- Never commit secrets or sensitive data
