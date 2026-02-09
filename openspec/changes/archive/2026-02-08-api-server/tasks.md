## 1. Health Module Handler

- [x] 1.1 Update `healthCheck` in `packages/data/src/health/api.ts` to return `{ status: 'ok' }`
- [x] 1.2 Export `healthCheck` from `packages/data/src/health/index.ts`

## 2. API Route Implementation

- [x] 2.1 Create `apps/base-universal-app/app/api/` directory
- [x] 2.2 Create `apps/base-universal-app/app/api/health-check+api.ts` importing from `@foundry/data/health`
- [x] 2.3 Export GET function returning healthCheck() response

## 3. Configuration

- [x] 3.1 Verify `"web": { "output": "server" }` in `apps/base-universal-app/app.json`

## 4. Documentation

- [ ] 4.1 Document API route structure in `apps/base-universal-app/README.md`
- [ ] 4.2 Document handler pattern in `packages/data/README.md`
- [ ] 4.3 Document deployment steps in project documentation
