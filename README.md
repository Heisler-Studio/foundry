# Foundry Monorepo

The central hub for developing Heisler Studio

## 🏗 Project Structure

- `apps/`: Web and Native applications.
- `packages/`: Shared libraries organized by domain (e.g., `auth`, `hello-world`).

## 🛠 Prerequisites

- **pnpm v10+**: Required for workspace protocol enforcement.
- **Node.js 24+**.

---

## 📦 Dependency Management

### Adding Workspace Packages (Internal)

To link a local package to an app or another package, **always** use the `--workspace` flag. This prevents pnpm from attempting to fetch the package from the public npm registry.

**Run from the root:**

```bash
pnpm add @foundry/hello-world --filter example-app-web --workspace
```

## 🚀 Development Workflow

```bash
# Build a specific package
pnpm --filter @foundry/hello-world run build

# Build all packages in the workspace
pnpm -r run build
```
