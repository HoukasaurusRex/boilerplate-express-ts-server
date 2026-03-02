# The Perfect Express-TS Server

[![CI][ci-shield]][ci-url]
[![Contributors][contributors-shield]][contributors-url]
[![License: MIT][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

A highly opinionated, production-ready Express + TypeScript server template built on modern Node.js primitives — no build step, no legacy tooling.

## Tech Stack

- **Runtime:** Node.js 24+ with native TypeScript via `--experimental-transform-types`
- **Framework:** Express 4, Socket.IO 4
- **ORM:** Prisma 7 (PostgreSQL via `@prisma/adapter-pg`)
- **Testing:** `node:test` + `node:assert` + Supertest
- **Process Manager:** PM2 (clustered)
- **Package Manager:** Yarn Berry 4

## Getting Started

```bash
# Requires Node 24+ (see .nvmrc)
nvm use

# Install dependencies
yarn install

# Start local database
docker compose up -d

# Apply schema and seed dev data
yarn migrate:dev
yarn seed

# Start dev server
yarn start:dev
```

## Overview

```text
src/
  config/       — env, express, and socket.io configuration
  controllers/  — mounts validators + providers as middleware chains
  providers/    — business logic and JSend responses
  validators/   — express-validator rule sets
  models/       — Prisma-backed helper functions (soft deletes, password hashing)
  services/     — shared utilities (logger, validator result handler)
  app.ts        — Express setup (middleware, routes, error handler)
  db.ts         — PrismaClient singleton with pg driver adapter
  io.ts         — Socket.IO server
  server.ts     — HTTP server entry point
test/
  unit/         — unit tests
  integration/  — API integration tests (Supertest)
```

## Features

- CORS configuration
- Multipart form parsing (Multer)
- HTTP security headers (Helmet)
- GZip compression
- JSend response standard
- UUID primary keys
- Soft deletes
- Password hashing (bcrypt)
- Structured logging (Winston)
- PM2 clustering
- Docker Compose local database

## Database

Prisma 7 manages the schema. The `url` field is configured via `prisma.config.ts` rather than inside the schema file.

```bash
yarn migrate:dev     # create and apply a new migration
yarn migrate         # deploy migrations (production)
yarn generate        # regenerate Prisma Client after schema changes
yarn seed            # insert dev seed data (run after migrate:dev)
```

### Local Database (Docker)

`docker compose up -d` starts a PostgreSQL 17 instance. On first start, `db/seed.sql` creates:

- `app` database (dev)
- `app_test` database (tests)
- `uuid-ossp` extension in both

Copy `.env.example` to `.env` and update credentials as needed.

## Testing

```bash
# First time or after schema changes — push schema to app_test
yarn test:setup

# Run all tests
yarn test
```

Tests use `node:test` (built into Node 24). Each test suite connects to `app_test` via `DATABASE_URL` in `.env.test`. The `before()` hook in each suite calls `prisma.user.deleteMany()` to reset state.

## Express Server

The app follows a **Route → Controller → Validator → Provider → Model** pipeline. All routes, controllers, providers, and validators are versioned under `v1/`. Add a `v2/` directory following the same pattern.

Responses use `res.jsend.success()`, `res.jsend.fail()`, and `res.jsend.error()` — JSend is configured globally in `app.ts`.

## Socket.IO

Socket events are defined in `src/controllers/v1/sockets.ts` and follow the same provider pattern as REST routes. The Socket.IO server is instantiated in `src/io.ts` and attached to the HTTP server in `src/server.ts`.

## PM2 Clustering

```bash
yarn start    # launches PM2 with max CPU instances
```

Be aware of stateful sticky session requirements if mixing horizontal and vertical scaling. PM2 keymetrics monitoring is supported via `KEYMETRICS_PUBLIC` and `KEYMETRICS_SECRET` env vars.

## Contributing

Contributions and suggestions are welcome. Open an issue or pull request on GitHub.

[ci-shield]: https://github.com/HoukasaurusRex/boilerplate-express-ts-server/actions/workflows/ci.yml/badge.svg
[ci-url]: https://github.com/HoukasaurusRex/boilerplate-express-ts-server/actions/workflows/ci.yml
[contributors-shield]: https://img.shields.io/github/contributors/HoukasaurusRex/boilerplate-express-ts-server.svg?style=flat-square
[contributors-url]: https://github.com/HoukasaurusRex/boilerplate-express-ts-server/graphs/contributors
[license-shield]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square
[license-url]: ./LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/jt-houk/
