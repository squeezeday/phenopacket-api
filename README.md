# Phenopacket API

Express + Typescript + MongoDB stack for storing Phenopackets.

## Getting started

.env settings

- DATABASE_URL="mongodb://localhost:27017/mongodb"

  URI to mongodb

- PORT="3000"

  Listen port

- ALLOWED_ORIGIN="http://localhost:5173"

  CORS allowed origin - frontend URI

- API_URL="http://localhost:3000"

  This API's URI (required for image uploads to work)

### Using Docker

1. `docker compose up -d`
1. Should be available on http://localhost:3000

### Local node js

1. `npm install`
1. `npm run build`
1. `npm start`
1. Should be available on http://localhost:3000

#### Development mode

1. `npm install`
1. `npm run dev`
1. Should be available on http://localhost:3000

## Generate Swagger apischema

`npm install -g protobuf2swagger`

`protobuf2swagger`
