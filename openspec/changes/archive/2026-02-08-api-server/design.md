## Context

The monorepo has a `@foundry/data` package that encapsulates HTTP requests, hooks, and response types for consumption by apps. Currently, there's no API server implementation - only the client-side code that expects endpoints at a configurable URL (`EXPO_PUBLIC_API_URL`).

**Current state:**

- `@foundry/data` package exports `api` client (axios instance) with auth interceptor
- Health check feature defined with `healthCheck()` function and `useHealthCheck` hook
- Apps (`base-universal-app`, `base-web`) consume `@foundry/data` but lack server implementations
- Environment variable `EXPO_PUBLIC_API_URL` points to undefined endpoint

**Architectural principles to follow:**

- Business logic lives in apps, dependencies are agnostic
- Abstract internals through packages (data package abstracts HTTP details)
- Functional programming patterns (no classes)
- Single responsibility files under 200-300 lines
- Co-location of related files
- DRY: Avoid duplicate code between client and server

## Goals / Non-Goals

**Goals:**

- Establish a standardized approach for serving `@foundry/data` package endpoints
- Create a template that future API capabilities can follow
- Support both Expo/React Native and web clients
- Enable server-side secrets and operations not safe for clients
- Provide clear decision criteria for when to use each approach

**Non-Goals:**

- Implementing specific business logic endpoints (deferred to future changes)
- Migration of existing apps to use the new API
- Authentication/authorization implementation (separate capability)
- Database schema design (depends on selected approach)

## Decisions

### Decision 1: API Server Implementation Approach

**Chosen: Expo API Routes with EAS Hosting**

**Rationale:**

| Criterion                  | Independent App                                                      | Expo API Routes + EAS                       |
| -------------------------- | -------------------------------------------------------------------- | ------------------------------------------- |
| **Monorepo alignment**     | Creates new `apps/api-server` directory, follows established pattern | Integrates with existing Expo app structure |
| **Code sharing**           | Requires duplicating types/endpoints between packages                | Reuses `@foundry/data` package directly     |
| **Deployment**             | Independent pipeline, more complex                                   | Single `eas deploy` command                 |
| **Cold starts**            | May be faster depending on hosting                                   | Cloudflare Workers (30s timeout)            |
| **Scaling**                | Requires explicit configuration                                      | Automatic with Cloudflare Workers           |
| **Development experience** | Full server framework (Express/Fastify)                              | Expo-native, minimal new concepts           |

**Key factors favoring Expo API Routes:**

1. **Reuses `@foundry/data` package** - The data package already defines types and API functions. With API routes, these can be imported and re-exported, ensuring type consistency between client and server.
2. **Consistent developer experience** - Team already familiar with Expo; no new framework to learn.
3. **Simpler deployment** - `eas deploy` vs. configuring a separate hosting solution.
4. **Template for future** - Establishes pattern: define types/API in package → create `+api.ts` routes that reuse package code.

**Alternative considered: Independent API App**

Would create `apps/api-server` with Express/Fastify. Rejected because:

- Duplication of type definitions (DRY violation)
- Additional deployment complexity
- Less aligned with "dependencies agnostic" principle

### Decision 2: Where to Add API Routes

**Chosen: `apps/base-universal-app/app/api/` (extend existing Expo app)**

**Rationale:**

- Existing Expo app already has the `@foundry/data` dependency
- Keeps API code co-located with the app that owns it
- Enables unified deployment: app + API routes together
- Follows "favor small files" - no new app directory needed initially

**Alternative: Create new Expo API-only app**

Rejected because:

- Premature abstraction - no need for separate deployment yet
- Adds complexity without immediate benefit
- Can always split later if base app grows too large

### Decision 3: Handler Location

**Chosen: Export handlers from `@foundry/data/health` module**

**Structure:**

```
packages/data/src/health/
  api.ts              → exports healthCheck (used by client AND server)
  types.ts            → Shared types (HealthCheckResponse)
  hooks/
    use-health-check.ts  → React Query hook (client only)
  index.ts            → barrel file

apps/base-universal-app/app/api/
  health-check+api.ts  → API route importing from @foundry/data/health
```

**Rationale:**

- **DRY principle**: Single `healthCheck` function serves both client (axios call) and server (direct return)
- **Simplicity**: No parallel `/server` directory needed
- **Single source of truth**: Handler logic lives in one place
- **Export pattern**: Reuse existing module structure instead of creating new `/server` subpath

**Why not `/server` subpath:**

- Creates unnecessary parallel structure
- Requires additional package.json exports configuration
- Duplicates the same handlers in two locations
- Over-engineering for the current scope

## Risks / Trade-offs

| Risk                               | Severity | Mitigation                                                                            |
| ---------------------------------- | -------- | ------------------------------------------------------------------------------------- |
| **Cloudflare Workers limitations** | Medium   | Use web-compatible databases (Turso, Neon, Supabase). Avoid Node.js-specific modules. |
| **Cold start latency**             | Low      | Cache commonly accessed data at edge. Consider warm-up pings.                         |
| **Cannot use filesystem**          | Medium   | Use cloud databases. Store uploads via presigned URLs to S3/R2.                       |
| **30-second timeout**              | Low      | Offload long-running tasks to async jobs. Use streaming for large responses.          |
| **Handler serves dual purpose**    | Low      | Clear separation of concerns - client makes HTTP calls, server returns direct values. |

**Trade-offs:**

- **Simplicity over separation**: Handlers serve both client and server, keeping code DRY
- **Ecosystem lock-in**: Tied to Expo/EAS for hosting but provides unified deployment
- **No CORS**: External domains should use EAS custom domains or proxy through same origin

## Migration Plan

**Phase 1: Setup (this change)**

1. Create `apps/base-universal-app/app/api/` directory
2. Add `health-check+api.ts` route importing from `@foundry/data/health`
3. Verify `"web": { "output": "server" }` in `app.json`
4. Test locally with `npx expo` and curl

**Phase 2: Verification**

1. Deploy to EAS staging
2. Update `EXPO_PUBLIC_API_URL` in apps to point to staging
3. Verify health check endpoint works from both apps

**Phase 3: Production**

1. Configure custom domain in EAS
2. Deploy to production
3. Update production environment variables

**Rollback:**

1. Revert `EXPO_PUBLIC_API_URL` to previous value
2. EAS maintains deployment history - can roll back via dashboard if needed
