# Phenopacket API

Express + Typescript + Prisma + Postgres stack for building a phenopackets API.

## Getting started

1. Set up Postgres DB
1. Set up .env
1. `npm install`
1. `cd phenopacket-schema; git submodule init; git submodule update`
1. `npx prisma migrate dev`
1. `npm run dev`

## Generate Swagger apischema

`npm install -g protobuf2swagger`

`protobuf2swagger`

## Prisma cheatsheet

After schema change, regenerate prisma client

`npx prisma generate`

Create migrations

`npx prisma migrate dev --name NAME`

Reset database (dev only!)

`npx prisma migrate reset`

Apply migrations in staging/production

`npx prisma migrate deploy`
