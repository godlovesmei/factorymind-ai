# FactoryMind AI

FactoryMind AI is a portfolio-ready smart manufacturing operations dashboard. It is designed to simulate an enterprise system that monitors machine sensor data, stores operational history, streams realtime updates, detects anomalies, generates AI-assisted reports, and later integrates with a legacy maintenance ticket system.

This repository follows `PLAN.md` for architecture and milestone scope, and `DESIGN.md` for the Apple-inspired visual system.

## Current Implementation

Milestone 1 sets up the project foundation:

- pnpm monorepo workspace
- Next.js frontend app skeleton
- Node.js/Express API skeleton
- Shared TypeScript package
- Prisma/database package placeholder
- MySQL Docker Compose service
- Initial documentation and environment template

Milestone 2 adds the static dashboard UI:

- `/dashboard` route
- Sidebar navigation and dashboard shell
- Machine summary cards
- Machine status cards with dummy sensor data
- Static sensor trend chart
- Latest alerts table
- Production summary
- Mock AI insight card

MQTT, API-backed data, Socket.IO realtime updates, AI/ML services, Laravel, auth, and full database models are intentionally left for later milestones.

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

Run migrations and seed data:

```bash
pnpm db:migrate
pnpm db:seed
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
- Dashboard: `http://localhost:3000/dashboard`
- Backend health: `http://localhost:4000/health`
- API health: `http://localhost:4000/api/health`
- MySQL: `localhost:3306`

### Prisma Shadow Database

Prisma Migrate uses a shadow database during `pnpm db:migrate`. The local Docker setup creates `factorymind_shadow` through `docker/mysql/init/01-shadow-database.sql` for fresh volumes.

If you created the MySQL volume before that init script existed and see `P3014`, run:

```bash
docker compose exec -T mysql mysql -uroot -pfactorymind-root -e "CREATE DATABASE IF NOT EXISTS factorymind_shadow"
docker compose exec -T mysql mysql -uroot -pfactorymind-root -e "GRANT ALL PRIVILEGES ON factorymind_shadow.* TO 'factorymind'@'%'"
```

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

Milestone 3 should create the database schema, REST API endpoints, and connect the dashboard to backend data.
