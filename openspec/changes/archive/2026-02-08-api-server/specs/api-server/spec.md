## ADDED Requirements

### Requirement: API Routes Structure

The api-server SHALL expose endpoints using Expo Router's API routes convention with the `+api.ts` suffix.

#### Scenario: API route file creates endpoint at correct path

- **WHEN** a file is created at `apps/base-universal-app/app/api/health-check+api.ts`
- **THEN** the endpoint SHALL be accessible at `https://{domain}/api/health-check`

#### Scenario: Nested routes create nested paths

- **WHEN** a file is created at `apps/base-universal-app/app/api/users/[id]+api.ts`
- **THEN** the endpoint SHALL be accessible at `https://{domain}/api/users/{id}`

### Requirement: HTTP Method Handlers

The api-server SHALL support standard HTTP methods through exported functions.

#### Scenario: GET requests invoke exported GET function

- **WHEN** a GET request is made to `/api/health-check`
- **THEN** the server SHALL invoke the exported `GET` function from `+api.ts`

#### Scenario: POST requests invoke exported POST function

- **WHEN** a POST request is made to `/api/users`
- **THEN** the server SHALL invoke the exported `POST` function from `+api.ts`

#### Scenario: PUT requests invoke exported PUT function

- **WHEN** a PUT request is made to `/api/users/{id}`
- **THEN** the server SHALL invoke the exported `PUT` function from `+api.ts`

#### Scenario: DELETE requests invoke exported DELETE function

- **WHEN** a DELETE request is made to `/api/users/{id}`
- **THEN** the server SHALL invoke the exported `DELETE` function from `+api.ts`

### Requirement: Handler Reusability

The api-server SHALL reuse handler functions from the `@foundry/data` package.

#### Scenario: Handler imported from data package

- **WHEN** the health-check API route is implemented
- **THEN** it SHALL import and use the handler from `@foundry/data/health`

#### Scenario: Handler response types match client expectations

- **WHEN** a handler returns `{ status: 'ok' }`
- **THEN** the client using `@foundry/data` SHALL receive the identical type signature

### Requirement: Health Check Endpoint

The api-server SHALL provide a health check endpoint at `/api/health-check`.

#### Scenario: Health check returns ok status

- **WHEN** a GET request is made to `/api/health-check`
- **THEN** the server SHALL return `{ status: 'ok' }`

### Requirement: Cloudflare Workers Compatibility

The api-server SHALL follow Cloudflare Workers runtime limitations.

#### Scenario: No filesystem operations

- **WHEN** an API route is executed
- **THEN** it SHALL NOT use `fs.readFile`, `fs.writeFile`, or similar Node.js filesystem APIs

#### Scenario: Web APIs used instead of Node.js modules

- **WHEN** cryptographic operations are needed
- **THEN** it SHALL use `crypto.subtle` instead of Node `crypto` module

#### Scenario: Fetch available for HTTP requests

- **WHEN** making outgoing HTTP requests
- **THEN** it SHALL use the standard `fetch` API
