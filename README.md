# FactoryMind AI

FactoryMind AI is a portfolio-ready smart manufacturing operations dashboard. It is designed to simulate an enterprise system that monitors machine sensor data, stores operational history, streams realtime updates, detects anomalies, generates AI-assisted reports, and later integrates with a legacy maintenance ticket system.

This repository follows `PLAN.md` for architecture and milestone scope, and `DESIGN.md` for the Apple-inspired visual system.

## Current Milestone

Milestone 1 sets up the project foundation only:

- pnpm monorepo workspace
- Next.js frontend app skeleton
- Node.js/Express API skeleton
- Shared TypeScript package
- Prisma/database package placeholder
- MySQL Docker Compose service
- Initial documentation and environment template

MQTT, AI/ML, Laravel, auth, realtime dashboard features, and full database models are intentionally left for later milestones.

## Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend API: Node.js, Express, TypeScript
- Shared contracts: TypeScript workspace package
- Database foundation: MySQL with Prisma planned
- Package manager: pnpm only

## Repository Layout

```txt
factorymind-ai/
├── apps/
│   ├── web/        # Next.js frontend
│   └── api/        # Node.js/Express backend API
├── packages/
│   ├── shared/     # Shared TypeScript types and contracts
│   └── database/   # Prisma and database migration foundation
├── docs/           # Architecture, API, deployment, and design notes
├── screenshots/    # Future portfolio screenshots
├── docker-compose.yml
├── .env.example
├── DESIGN.md
├── PLAN.md
└── README.md
```

## Local Setup

Prerequisites:

- Node.js 24.14.0 or newer
- pnpm 11.7.0 or newer
- Docker Desktop or Docker Engine

Install dependencies:

```bash
pnpm install
```

If the install times out while downloading large packages such as Next.js or Prisma, run the same command again. The project config in `pnpm-workspace.yaml` increases fetch timeouts and retries, and pnpm will reuse packages that were already downloaded.

Create a local environment file:

```bash
cp .env.example .env
```

Start MySQL:

```bash
pnpm db:up
```

Run the frontend and backend together:

```bash
pnpm dev
```

Or run them separately:

```bash
pnpm dev:web
pnpm dev:api
```

Default local URLs:

- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:4000/health`
- API health: `http://localhost:4000/api/health`
- MySQL: `localhost:3306`

## Environment Variables

Use `.env.example` as the source template. Demo mode is enabled by default so future AI features can run without paid API calls:

```env
DEMO_MODE=true
AI_PROVIDER=mock
```

## Development Notes

- Keep implementation milestone-based.
- Keep UI work aligned with `DESIGN.md`.
- Keep architecture and feature scope aligned with `PLAN.md`.
- Do not add MQTT, AI providers, Laravel, or dashboard feature code before their milestones.
- Do not mix package managers; use pnpm only.

## Next Milestone

Milestone 2 should build the static dashboard UI with dummy machine data, responsive layout, machine status cards, charts, alert table, and sidebar navigation.
