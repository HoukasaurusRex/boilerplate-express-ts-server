-- Runs once on first container start (docker-entrypoint-initdb.d).
-- Prisma manages the schema — this file only sets up databases and extensions.

-- Create the test database
CREATE DATABASE app_test;

-- Enable UUID generation in the dev database (app)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Switch to test database and enable the same extension
\connect app_test
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Switch back to dev database and insert seed data
-- Note: tables must exist first — run `yarn migrate:dev` or `yarn migrate` before `yarn seed`
\connect app
