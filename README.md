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

### Using Docker (production mode)

1. `docker compose -f docker-compose.yml up -d`
1. Should be available on http://localhost:3000

### Using Docker (development mode)

1. `docker compose up -d`
1. Should be available on http://localhost:3000

#### Local development mode

1. `npm install`
1. `npm run dev`
1. Should be available on http://localhost:3000

## Generate Swagger apischema

`npm install -g protobuf2swagger`

`protobuf2swagger`

## Version history

### 1.0.0

- Initial release

### 1.1.0

- Generate password for customformdata
- Backend status
