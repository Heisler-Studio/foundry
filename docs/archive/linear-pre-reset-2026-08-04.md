# Linear archive — pre-reset backlog (2026-08-04)

The Linear workspace was cleared to a clean slate alongside the foundry monorepo reset.
This is a verbatim capture of all 63 issues that existed beforehand, taken immediately
before deletion.

Most of it describes the pre-reset monorepo and is obsolete. Some is not — the
administrative-account, CI, observability, and testing items describe work that a code
rewrite does not invalidate. Mine this file when planning; do not assume it is all dead.

Projects: 12 · Issues: 63


## Account preferences

### ENG-25 — user-service package
`Backlog` · labels: package

Vendor grouping (i.e. aws)

### ENG-26 — profile API
`Backlog` · labels: package

Name, email

### ENG-52 — Preferences sheet
`Done`

Move login to link within prefs

Output app version data

Dark mode toggle

### ENG-53 — Dark mode toggle
`Done`


## Authentication

### ENG-9 — [package] init auth package
`Done` · labels: package

### ENG-10 — [package] authenticate with Google
`Backlog` · labels: package

### ENG-11 — [base-app] structure authenticated and public routes
`Done` · labels: base-app

### ENG-12 — [base-app] login screen
`Done` · labels: base-app

### ENG-13 — [base-app] sign out
`Backlog` · labels: base-app

### ENG-41 — Add /health-check endpoint
`Done`

### ENG-45 — Init better-auth following setup guide
`Backlog`


## CI

### ENG-61 — Lint, Test PRs
`Backlog`

### ENG-62 — Deploy OTA
`Backlog`

### ENG-63 — Setup Sentry Seer
`Backlog`


## Codebase

### ENG-39 — fix `require` rule to not apply to JS files
`Done`

### ENG-40 — convert app.json to app.config.ts
`Done`

### ENG-42 — Add startup script
`Canceled`

Start 'data' in watch mode

### ENG-44 — Lint rules for using primitives directly
`Backlog`

Only the primitives folder should be allowed to import directly from components package.

### ENG-46 — Convert to turborepo, bun
`Todo`

### ENG-54 — Setup reusable header config
`Backlog`

### ENG-55 — Extract shared page container
`Done`

Translucent header config, spacing

Scroll view

Keyboard handling

### ENG-56 — mv RNR components to sub-directory
`Done` · labels: package, configuration

Allow to add others, like reacticx

### ENG-57 — Fix prettier in packages
`Done` · labels: configuration, package

The native-components package is using different formatting.

### ENG-58 — Agents do not respect linting rules
`Done`

### ENG-59 — Rewrite documentation
`Backlog`

- [ ]  README should describe architecture, "Getting Started", and table of contents to runbooks
- [ ] Runbooks for Deployment, Logging

### ENG-66 — Translate existing text and add eslint rule
`Todo`


## Configure administrative accounts

### ENG-18 — apple developer account
`Backlog` · labels: admin

### ENG-19 — google play store account
`Backlog` · labels: admin

### ENG-20 — EAS account
`Backlog` · labels: admin

### ENG-21 — EAS build pipeline
`Backlog` · labels: configuration

### ENG-22 — OTA updates
`Backlog` · labels: configuration

### ENG-23 — multiple app builds for dev/canary, prod
`Backlog` · labels: configuration

Considerations:

* multiple builds means installs are separate, easier to test
* in-app switcher can target different environments


## Content Creation

### ENG-48 — Hero section for Foundry
`Backlog`

### ENG-49 — Horizontal cards for work experience
`Backlog`

Include detail view (sheet?)

Use new animated transition?

todo: images come from CDN (S3)

### ENG-50 — About section
`Backlog`

### ENG-51 — Contact info action button
`Backlog`

Init NativeTabs

### ENG-65 — Add Notion as data source
`Backlog` · labels: package


## file management

### ENG-14 — [package] init package
`Backlog` · labels: package

### ENG-15 — [package] connect to S3
`Backlog` · labels: package

### ENG-16 — [package] API for uploads
`Backlog` · labels: package

### ENG-17 — useFiles hook
`Backlog` · labels: base-app


## native-components

### ENG-6 — init package with react-native reusables
`Done` · labels: package

### ENG-7 — [base-app] setup primitives to import from @native-components
`Done` · labels: base-app

### ENG-8 — Move primitives into "themed" components
`Done` · labels: base-app

Move primitives into "themed" components

### ENG-43 — Default to using i18n for all text
`Done`


## Observability

### ENG-30 — configure logging package
`Backlog` · labels: package

Grafana?

Pino

LogLayer

### ENG-31 — Configure analytics
`Backlog`

PostHog?

### ENG-47 — Use expo-router middleware for logging
`Backlog`

Leverage new middleware pattern for server side requests involving auth check and logging

### ENG-64 — Setup Sentry
`Backlog` · labels: configuration


## Profile management

### ENG-27 — profile route
`Backlog` · labels: base-app

### ENG-28 — app version, metadata
`Backlog` · labels: base-app

### ENG-29 — modify avatar, name, email
`Backlog` · labels: base-app


## Testing

### ENG-34 — visual regression testing
`Backlog`

percy.io appears to have a generous free tier. Run only before OTA's?

### ENG-35 — E2E testing
`Backlog`

Probably use Maestro, but not going to pay for it.

### ENG-36 — integration testing framework
`Backlog`

Default to integration testing over unit testing. Need a strategy like using MSW?

### ENG-60 — Validate MMKV & app build
`Backlog`


## (no project)

### ENG-1 — Get familiar with Linear
`Done`

Welcome to Linear! 

Watch an introductory video and access a list of resources below.

[LinearH264Version_1.mp4](https://uploads.linear.app/fe63b3e2-bf87-46c0-8784-cd7d639287c8/a044fb03-9b84-470c-ab6f-8eae613e2529/98d7274d-de7f-4910-b3f3-f72e8e286a98)

### **Choose your setup guide** based on your company stage:

* [Small teams](<https://linear.app/docs/how-to-use-linear-small-teams>)
  For early-stage startups and projects
* [Startups & mid-size companies](<https://linear.app/docs/how-to-use-linear-startups-mid-size-companies>)
  For growing teams with cross-functional needs
* [Large & scaling companies](<https://linear.app/docs/how-to-use-linear-large-scaling-companies>)
  For enterprise and high-growth teams with complex workflows

### **Need help getting started?**

* [Join our Slack community](<https://linear.app/join-slack>)
  Connect with other Linear users and get tips
* [Join a live ](<https://lu.ma/welcome-to-linear?utm_source=docs>)[onboarding](<https://lu.ma/welcome-to-linear?utm_source=onboarding>)[ ](<https://lu.ma/welcome-to-linear?utm_source=docs>)[session](<https://lu.ma/welcome-to-linear?utm_source=onboarding>)
  Learn the essentials and see demos of core workflows

---

If you have any questions hit `?` in the bottom left > Contact us.

![contactlinear (1).gif](https://uploads.linear.app/fe63b3e2-bf87-46c0-8784-cd7d639287c8/bc9bbf62-4192-411f-88f6-c89c9150503e/4df0346e-803b-4f58-8527-4aeb30d88411)

### ENG-2 — Set up your teams
`Done`

This workspace is a container for your organization’s work. 

* [Learn more about Workspaces](<https://linear.app/docs/workspaces>)
  How to configure settings and workflows 

Teams are how you organize people and work in Linear.

* [Learn about Teams](<https://linear.app/docs/teams>)
  How to structure teams and configure workflows

Teams are made of members with defined roles (Admin, Member, Guest).

* [Learn more about Members](<https://linear.app/docs/invite-members>)
  Add your team and assign roles

---

Ready to add your team? Invite via CSV or a unique link in [settings](<http://linear.app/settings/members>).

### ENG-3 — Connect your tools
`Done`

Integrations turn Linear into your source of truth around product development. Keep data in sync, and eliminate manual updates between tools.

![connect-your-tools.png](https://uploads.linear.app/fe63b3e2-bf87-46c0-8784-cd7d639287c8/c2eae035-37e2-4754-adcb-b8305431aa1f/c92d70c7-e6d0-4fa2-a0fd-78f6e780993a)

### **Key integrations**

* [**Slack**](<https://linear.app/settings/integrations/slack>)
  Create issues from Slack messages and sync threads
* [**GitHub**](<https://linear.app/settings/integrations/github>)** / **[**GitLab**](<https://linear.app/settings/integrations/gitlab>)
  Automate your pull request, commit workflows, and keep issues synced both ways
* [**Agents**](<https://linear.app/integrations/agents>)
  Deploy AI agents that work alongside you as teammates

### **Browse all integrations**

Discover 150+ available connections in our [integration directory](<https://linear.app/integrations>) – from bug creation via support tools (Intercom, Zendesk), to issues created from design explorations (Figma).

### **Linear API**

If you need something more custom, you can build directly on the Linear API (built on GraphQL). [See our Dev Docs to learn more](<https://linear.app/developers>).

### ENG-4 — Import your data
`Done`

Sync data between Linear and your other tools.

![import-your-data.png](https://uploads.linear.app/fe63b3e2-bf87-46c0-8784-cd7d639287c8/80d7e050-dd1f-4d4f-8257-b29c16087017/65c16454-30f3-4f4a-8f25-c2428d64ff57)

Whether you're exploring Linear, running a pilot, or ready for full migration, we’ve got you covered. 

### **Exploring Linear:**

* [**Pitch Linear**](<https://linear.app/switch/pitch-guide>)
  Build your business case and get organizational buy-in
* [**Run a pilot**](<https://linear.app/switch/pilot-guide>)
  Test Linear with a small team before rolling out company-wide

### **Ready to migrate:**

* [**Migration guide**](<https://linear.app/switch/migration-guide>) 
  Step-by-step process for importing data and rolling out Linear

---

If you have any questions hit `?` in the bottom left > Contact us.

![contactlinear (1).gif](https://uploads.linear.app/fe63b3e2-bf87-46c0-8784-cd7d639287c8/191f6985-8562-4f62-9482-a094b69c4756/0e4ff63b-3da2-4699-912b-04afb68511e8)

### ENG-5 — [package] native-components
`In Progress`

Setup a new package which pulls in react native reusables. 

Installing these as a standalone package allows for leaving the base components unmodified and the complexity abstracted away. 

Installing these the app code, import as "primitives" and apply custom styling and business logic.

### ENG-37 — fix react multi install
`Done` · labels: base-app, Bug

### ENG-38 — base template style
`Done` · labels: base-app

